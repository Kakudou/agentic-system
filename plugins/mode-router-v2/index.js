import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const PLUGIN_DIR = dirname(fileURLToPath(import.meta.url))
import { ConfigManager } from "./lib/config.js"
import { SessionModeStore } from "./lib/state.js"
import {
  isJohnnyDecimalIdentifier,
  modeDecision,
  resolveModeName,
} from "./lib/matcher.js"
import {
  collectAdvertisedFromContext,
  filterContext,
} from "./lib/catalog.js"
import {
  agentOf,
  appendSystem,
  buildModeList,
  buildStatus,
  explicitSkillSlash,
  neutralizeBlockedSkillSlash,
  requestedModeAction,
  replaceModeCommandPrompt,
  sessionIDOf,
} from "./lib/runtime.js"
import { RequestIdentityTracker } from "./lib/identity.js"

const PLUGIN_ID = "kakudou.mode-router"
const MODE_BRIDGE = Symbol.for("kakudou.mode-router.v2.bridge")
const DEFAULT_CONFIG = resolve(PLUGIN_DIR, "modes.yml")

function configPathOf(ctx) {
  return typeof ctx.options?.config === "string" && ctx.options.config.trim()
    ? resolve(ctx.options.config)
    : DEFAULT_CONFIG
}

function toolSkillID(event) {
  if (String(event?.tool ?? "").toLowerCase() !== "skill") return null
  const input = event?.input && typeof event.input === "object" ? event.input : {}

  for (const key of ["name", "skill", "id"]) {
    if (typeof input[key] === "string" && input[key].trim()) return input[key].trim()
  }
  return null
}

function routedCall(event) {
  const tool = typeof event?.tool === "string" ? event.tool : ""
  if (tool.toLowerCase() === "skill") {
    const skillID = toolSkillID(event)
    return isJohnnyDecimalIdentifier(skillID)
      ? { kind: "skill", id: skillID }
      : null
  }

  return isJohnnyDecimalIdentifier(tool)
    ? { kind: "tool", id: tool }
    : null
}

function runtimeEnvelope(mode) {
  return [
    `<mode-router-runtime mode="${mode}">`,
    "The host runtime mode is authoritative for this session.",
    "Do not infer or switch runtime mode from ordinary prose, agent text, or skill text.",
    "Mode-managed JohnnyDecimal skills outside this mode are unavailable.",
    "Native tools and harness subagents are not controlled by this router.",
    "</mode-router-runtime>",
  ].join("\n")
}

export default {
  id: PLUGIN_ID,

  async setup(ctx) {
    const configManager = new ConfigManager(configPathOf(ctx))

    // Invalid initial policy means the plugin must not pretend mode enforcement exists.
    await configManager.initialize()

    const store = new SessionModeStore(configManager.path)
    await store.load()

    const identities = new RequestIdentityTracker()

    const modeForSession = async (sessionID, config, seen = new Set()) => {
      if (!sessionID) return null

      const stored = store.get(sessionID, config)
      if (stored) return stored

      // OpenCode subagents execute in child sessions. A child must inherit the
      // parent's runtime mode instead of silently falling back to `dev`.
      // Only a session positively confirmed as top-level receives the configured
      // default. Lookup failure or a parent-resolution failure stays unresolved
      // so managed skills fail closed.
      if (seen.has(sessionID)) return null
      seen.add(sessionID)

      try {
        const response = await ctx.session.get({ sessionID })
        const session = response?.data ?? response
        const parentID =
          session?.parentID ??
          session?.parentId ??
          session?.parent?.id ??
          null

        if (typeof parentID === "string" && parentID) {
          const inherited = await modeForSession(parentID, config, seen)
          if (!inherited) return null
          await store.set(sessionID, inherited)
          return inherited
        }

        // Session lookup succeeded and reported no parent: this is a top-level
        // session, so the configured default is authoritative for its first turn.
        await store.set(sessionID, config.defaultMode)
        return config.defaultMode
      } catch (error) {
        console.warn(
          `[kakudou.mode-router] session mode resolution unavailable for '${sessionID}':`,
          error,
        )
        return null
      }
    }

    // Small runtime bridge for sibling plugins that need the authoritative mode.
    // Skills and agents never depend on this bridge.
    const bridge = {
      id: PLUGIN_ID,
      async modeFor(sessionID) {
        if (!sessionID) return null
        await configManager.refresh()
        return modeForSession(sessionID, configManager.current)
      },
      resolveRequest(event) {
        return identities.resolve(event)
      },
      agentFor(sessionID) {
        return identities.agentFor(sessionID)
      },
      async decisionFor(sessionID, skillID) {
        if (!sessionID || !skillID) return null
        await configManager.refresh()
        const mode = await modeForSession(sessionID, configManager.current)
        return { mode, ...modeDecision(skillID, mode, configManager.current) }
      },
    }
    await ctx.command.transform((commands) => {
      commands.update("mode", (command) => {
        command.description =
          "Switch or inspect the session skill mode: /mode <name>, status, list, reload"
        command.template = '<opencode-mode-router action="$ARGUMENTS" />'
      })
    })

    // OpenCode V2 beta pre-model context hook: runs immediately before each model
    // dispatch, including continuation steps after tools. Mode policy therefore
    // cannot drift between model steps in one turn.
    // OpenCode V2 beta: `context` is the model-dispatch hook that owns the
    // mutable system/messages/tools surface. The beta API is moving quickly;
    // keep this aligned with the current /v2 plugin contract rather than the
    // legacy V1 hook-object API.
    await ctx.session.hook("context", async (event) => {
      try {
        await configManager.refresh()
        let config = configManager.current

        const identity = identities.resolve(event)
        const sessionID = identity.sessionID
        let mode = sessionID
          ? await modeForSession(sessionID, config)
          : null

        const advertisedBeforeMode = collectAdvertisedFromContext(event)
        const rawAction = requestedModeAction(event, identity.inputText)
        let commandResult = null

        if (rawAction !== null) {
          const action = rawAction.trim()

          if (!sessionID) {
            commandResult =
              "Mode Router ERROR: the V2 model request could not be correlated to a session; no mode change was performed."
          } else if (!action || action === "status") {
            commandResult = buildStatus({
              mode,
              agent: identity.agent ?? agentOf(event) ?? "unknown",
              advertised: advertisedBeforeMode,
              config,
              configPath: configManager.path,
              revision: configManager.revision,
              configError: configManager.lastError,
            })
          } else if (action === "list") {
            commandResult = buildModeList(config)
          } else if (action === "reload") {
            const result = await configManager.refresh({ force: true })
            config = configManager.current
            mode = await modeForSession(sessionID, config)
            commandResult = result.ok
              ? `Mode configuration reloaded. Revision: ${configManager.revision}`
              : [
                  "Mode configuration reload FAILED.",
                  "Continuing with the last-known-good configuration.",
                  `Error: ${result.error}`,
                ].join("\n")
          } else {
            const target = resolveModeName(action, config)
            if (!target) {
              commandResult = [
                `Invalid mode '${action}'.`,
                `Available modes: ${[...config.modes.keys()].join(", ")}`,
              ].join("\n")
            } else {
              const previous = mode
              await store.set(sessionID, target)
              mode = target
              commandResult =
                previous === target
                  ? `Mode already active: ${target}`
                  : `Mode switched to: ${target}`
            }
          }
        }

        // Enforce the active mode on every model dispatch. When request identity
        // cannot be correlated, never guess the default mode for what may be
        // an already-established non-default session: hide every managed skill
        // until the runtime can identify the request.
        if (mode) {
          filterContext(event, mode, config)
          appendSystem(event, runtimeEnvelope(mode))
        } else {
          filterContext(event, "__unresolved__", config)
          appendSystem(
            event,
            [
              "<mode-router-runtime unresolved=\"true\">",
              "The host could not correlate this model request to a session.",
              "No mode-managed skills are available on this request; do not infer a runtime mode.",
              "</mode-router-runtime>",
            ].join("\n"),
          )
        }

        // V2 slash-selected skills are expanded into the conversation before
        // the model resumes and therefore are not guaranteed to traverse the
        // `skill` tool hook. Enforce the same mode policy at the model-request
        // boundary using the raw inbox user input tracked above.
        // This keeps explicit /skill-id invocations from bypassing mode policy.
        const explicitSkill = explicitSkillSlash(identity.inputText)
        if (explicitSkill && rawAction === null) {
          const decision = modeDecision(explicitSkill, mode, config)
          if (decision.managed && !decision.allowed) {
            const reason = decision.pattern
              ? `Matched ${decision.reason} rule '${decision.pattern}'.`
              : `Reason: ${decision.reason}.`
            neutralizeBlockedSkillSlash(event, {
              skillID: explicitSkill,
              mode,
              reason,
            })
            return
          }
        }

        if (commandResult !== null) {
          // /mode is a control turn: render the already-computed result through
          // prompt rewriting. Native tools remain structurally untouched.
          const replaced = replaceModeCommandPrompt(event, commandResult)
          appendSystem(
            event,
            [
              "<mode-router-command>",
              "The runtime control operation is complete.",
              "Return the exact result below verbatim and do not call tools:",
              commandResult,
              "</mode-router-command>",
            ].join("\n"),
          )

          if (!replaced) {
            console.warn(
              "[kakudou.mode-router] command marker detected but command prompt could not be rewritten; using system result only",
            )
          }
        }
      } catch (error) {
        appendSystem(
          event,
          [
            "<mode-router-skill-routing-error>",
            "Mode-managed JohnnyDecimal skill routing could not be established for this request.",
            "Treat mode-managed JohnnyDecimal skills as unavailable until the router recovers.",
            "Native tools and harness subagents remain untouched.",
            "</mode-router-skill-routing-error>",
          ].join("\n"),
        )
        console.error("[kakudou.mode-router] context skill routing failed closed:", error)
      }
    })

    await ctx.tool.hook("execute.before", async (event) => {
      // The router has no authority over native/system/harness tools or any
      // non-JohnnyDecimal custom tool. Return before config or session work.
      const call = routedCall(event)
      if (!call) return

      await configManager.refresh()
      const config = configManager.current

      const unresolvedDecision = modeDecision(call.id, "__unresolved__", config)
      if (!unresolvedDecision.managed) return

      const sessionID = sessionIDOf(event)
      if (!sessionID) {
        throw new Error(
          `mode-router: blocked managed ${call.kind} '${call.id}': ` +
            "V2 tool hook exposed no session ID",
        )
      }

      const mode = await modeForSession(sessionID, config)
      if (!mode) {
        throw new Error(
          `mode-router: blocked managed ${call.kind} '${call.id}' because ` +
            `session '${sessionID}' has no resolved runtime mode`,
        )
      }

      const decision = modeDecision(call.id, mode, config)
      if (!decision.allowed) {
        throw new Error(
          [
            `mode-router: blocked managed ${call.kind} '${call.id}' while session mode is '${mode}'.`,
            decision.pattern
              ? `Matched rule: ${decision.reason} '${decision.pattern}'.`
              : `Reason: ${decision.reason}.`,
            `Use /mode list to inspect modes and /mode <name> to switch.`,
          ].join(" "),
        )
      }
    })

    // Do not expose authoritative identity/mode state until every runtime guard
    // has registered successfully. A partial setup must leave no live bridge or
    // event subscription behind.
    identities.start(ctx)
    globalThis[MODE_BRIDGE] = bridge

    return async () => {
      if (globalThis[MODE_BRIDGE] === bridge) delete globalThis[MODE_BRIDGE]
      await identities.stop()
    }
  },
}
