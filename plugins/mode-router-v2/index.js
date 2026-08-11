import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const PLUGIN_DIR = dirname(fileURLToPath(import.meta.url))
import { ConfigManager } from "./lib/config.js"
import { SessionModeStore } from "./lib/state.js"
import {
  modeDecision,
  resolveModeName,
} from "./lib/matcher.js"
import {
  collectAdvertisedFromContext,
  disableTools,
  filterContext,
} from "./lib/catalog.js"
import {
  agentOf,
  appendSystem,
  buildModeList,
  buildStatus,
  deniedManagedSkillFile,
  requestedModeAction,
  replaceModeCommandPrompt,
  sessionIDOf,
} from "./lib/runtime.js"

const PLUGIN_ID = "kakudou.mode-router"

const DEFAULT_CONFIG = resolve(PLUGIN_DIR, "modes.yml")
const DEFAULT_PROTECT = true

function optionsOf(ctx) {
  return {
    config: DEFAULT_CONFIG,
    protectManagedSkillFiles: DEFAULT_PROTECT
  }
}

function toolSkillID(event) {
  if (String(event?.tool ?? "").toLowerCase() !== "skill") return null
  const input =
    event?.input && typeof event.input === "object" ? event.input : {}

  for (const key of ["name", "skill", "id"]) {
    if (typeof input[key] === "string" && input[key]) return input[key]
  }
  return null
}

export default {
  id: PLUGIN_ID,

  async setup(ctx) {
    const options = optionsOf(ctx)
    const configManager = new ConfigManager(options.config)

    // Initial config must be valid. If it is not, setup fails loudly rather
    // than pretending the policy is active.
    await configManager.initialize()

    const store = new SessionModeStore(configManager.path)
    await store.load()

    // /mode <name>, /mode status, /mode list, /mode reload
    await ctx.command.transform((commands) => {
      commands.update("mode", (command) => {
        command.description =
          "Switch or inspect the session skill mode: /mode <name>, status, list, reload"

        command.template = '<opencode-mode-router action="$ARGUMENTS" />'
      })
    })

    await ctx.session.hook("context", async (event) => {
      try {
        await configManager.refresh()
        const config = configManager.current

        const sessionID = sessionIDOf(event)
        let mode = sessionID
          ? await store.ensureValid(sessionID, config)
          : config.defaultMode

        const advertisedBeforeMode = collectAdvertisedFromContext(event)
        const rawAction = requestedModeAction(event)

        let commandResult = null
        if (rawAction !== null) {
          const action = rawAction.trim()

          if (!sessionID) {
            commandResult =
              "Mode Router ERROR: V2 request hook exposed no session ID; no mode change was performed."
          } else if (!action || action === "status") {
            commandResult = buildStatus({
              mode,
              agent: agentOf(event),
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
            const fresh = configManager.current
            mode = await store.ensureValid(sessionID, fresh)
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

          // Filter context and disable tools for command turns
          filterContext(event, mode, configManager.current)
          // disableTools(event)
          const replaced = replaceModeCommandPrompt(event, commandResult)

          appendSystem(
            event,
            [
              `<mode-router-runtime mode="${mode}">`,
              `Managed patterns: ${configManager.current.managedPatterns.join(", ")}.`,
              "For managed skills, current-mode rules are enforced at execution time.",
              "Skills matching none of those patterns are outside this plugin's authority",
              "and retain normal OpenCode agent-permission behavior.",
              "</mode-router-runtime>",
              "<mode-router-command>",
              "The runtime operation is complete.",
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
        console.error(
          "[kakudou.mode-router] context hook failed open:",
          error,
        )
      }
    })

    await ctx.tool.hook("execute.before", async (event) => {
      await configManager.refresh()
      const config = configManager.current

      const sessionID = sessionIDOf(event)
      if (!sessionID) {
        // Fail closed only for mode-managed skill execution. Unrelated tools
        // are not this plugin's business.
        const requested = toolSkillID(event)
        if (requested && modeDecision(requested, "__invalid__", config).managed) {
          throw new Error(
            `mode-router: blocked managed skill '${requested}': V2 tool hook exposed no session ID`,
          )
        }
        return
      }

      const mode = await store.ensureValid(sessionID, config)

      const requestedSkill = toolSkillID(event)
      if (requestedSkill) {
        const decision = modeDecision(requestedSkill, mode, config)
        if (decision.managed && !decision.allowed) {
          throw new Error(
            [
              `mode-router: blocked managed skill '${requestedSkill}' while session mode is '${mode}'.`,
              decision.pattern
                ? `Matched rule: ${decision.reason} '${decision.pattern}'.`
                : `Reason: ${decision.reason}.`,
              `Use /mode list to inspect modes and /mode <name> to switch.`,
            ].join(" "),
          )
        }
        return
      }

      if (options.protectManagedSkillFiles) {
        const deniedFile = deniedManagedSkillFile(event, mode, config)
        if (deniedFile) {
          throw new Error(
            `mode-router: blocked ${deniedFile.tool} access to inactive managed skill ` +
              `'${deniedFile.skillID}' while mode is '${mode}'.`,
          )
        }
      }
    })
  },
}
