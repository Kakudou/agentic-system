import { createHash, randomInt } from "node:crypto"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { ConfigManager } from "./lib/config.js"
import {
  RNG_RANGE,
  RNG_TOOL,
  claimGadgetInvocation,
  directive,
  executeGadgetCommand,
  isControlTurn,
  isGadgetSkill,
  newTurnState,
  rememberTurn,
  selectGadgets,
  weightedSelection,
} from "../../claude_plugins/otsumi/core/gadgets.js"

// Selection, directive, command, and at-most-once logic is the host-free core
// shared with the Claude Code mod. This file keeps only the OpenCode V2
// adapter: mode-router bridge policy, setup-template suppression, and the
// `context` request shape.
export { weightedSelection }

const PLUGIN_ID = "kakudou.response-gadgets"
const MODE_BRIDGE = Symbol.for("kakudou.mode-router.v2.bridge")
const PLUGIN_DIR = dirname(fileURLToPath(import.meta.url))
const DEFAULT_CONFIG = resolve(PLUGIN_DIR, "config.yml")
const GADGET_COMMAND_RE = /<opencode-response-gadget\s+action="([^"]*)"\s*\/>/i
const RAW_GADGET_COMMAND_RE = /^\/gadget(?:[ \t]+([^\r\n]*))?$/
const POLICY_DENIAL = "response-gadgets: disabled by authoritative mode-router policy"
const BOOTSTRAP_DENIAL = "response-gadgets: disabled for trusted setup-template turn"
const SETUP_TEMPLATE_STEPS = new Set(["mode", "persona_setup", "introduction"])
const SHA256_HEX_RE = /^[0-9a-f]{64}$/

function configPathOf(ctx) {
  return typeof ctx.options?.config === "string" && ctx.options.config.trim()
    ? resolve(ctx.options.config)
    : DEFAULT_CONFIG
}

function textFrom(value, depth = 0) {
  if (depth > 8 || value == null) return ""
  if (typeof value === "string") return value
  if (Array.isArray(value)) {
    return value.map((item) => textFrom(item, depth + 1)).join("\n")
  }
  if (typeof value !== "object") return ""

  for (const key of ["text", "content", "value", "message", "parts"]) {
    const rendered = textFrom(value[key], depth + 1)
    if (rendered) return rendered
  }

  return ""
}

function latestUser(messages) {
  if (!Array.isArray(messages)) return null

  for (let index = messages.length - 1; index >= 0; index--) {
    const message = messages[index]
    const role = message?.role ?? message?.info?.role ?? message?.type
    if (role !== "user") continue

    const text = textFrom(message).trim()
    const id =
      message?.id ??
      message?.info?.id ??
      message?.messageID ??
      message?.messageId ??
      ""
    const digest = createHash("sha256").update(text).digest("hex").slice(0, 16)

    return {
      text,
      key: `${id || `index-${index}`}:${digest}`,
      message,
    }
  }

  return null
}

function trustedSetupTemplateMetadata(metadata) {
  return Boolean(
    metadata &&
    typeof metadata === "object" &&
    !Array.isArray(metadata) &&
    metadata.kind === "setup_template_step" &&
    metadata.templateSchemaVersion === 2 &&
    SETUP_TEMPLATE_STEPS.has(metadata.step) &&
    typeof metadata.fingerprint === "string" &&
    SHA256_HEX_RE.test(metadata.fingerprint),
  )
}

function ownMetadata(value) {
  if (!value || typeof value !== "object") return { present: false, value: null }
  if (Object.hasOwn(value, "metadata")) {
    return { present: true, value: value.metadata }
  }
  if (value.info && typeof value.info === "object" && Object.hasOwn(value.info, "metadata")) {
    return { present: true, value: value.info.metadata }
  }
  return { present: false, value: null }
}

function currentInputMetadata(event, providerUser, identity) {
  for (const candidate of [
    event,
    event?.input,
    event?.message,
    event?.item,
    event?.data?.item,
  ]) {
    const metadata = ownMetadata(candidate)
    if (metadata.present) return metadata
  }

  if (providerUser?.message) return ownMetadata(providerUser.message)

  const identityMetadata = ownMetadata(identity)
  if (identityMetadata.present) return identityMetadata

  return { present: false, value: null }
}

function turnKey(identity, providerUser, rawText) {
  const digest = createHash("sha256").update(rawText).digest("hex").slice(0, 16)
  if (providerUser?.key) return `${providerUser.key}:${digest}`
  if (Number.isFinite(identity?.inputAt)) return `admitted-${identity.inputAt}:${digest}`
  return `raw:${digest}`
}

function sessionIDOf(event) {
  return (
    event?.sessionID ??
    event?.sessionId ??
    event?.session?.id ??
    event?.context?.sessionID ??
    event?.context?.sessionId ??
    null
  )
}

function agentOf(event) {
  const value =
    event?.agent?.id ??
    event?.agent ??
    event?.context?.agent?.id ??
    event?.context?.agent
  return typeof value === "string" && value ? value : null
}

function trustedIdentity(event, bridge) {
  if (!bridge?.resolveRequest) return null
  try {
    const identity = bridge.resolveRequest(event)
    const sessionID = identity?.sessionID ?? sessionIDOf(event)
    if (typeof sessionID !== "string" || !sessionID) return null
    return { ...identity, sessionID }
  } catch {
    return null
  }
}

async function pluginAuthorization(event) {
  const bridge = globalThis[MODE_BRIDGE]
  if (!bridge?.resolveRequest || !bridge?.pluginDecisionFor) {
    return { allowed: false, bridge: null, identity: null, decision: null }
  }

  const identity = trustedIdentity(event, bridge)
  if (!identity?.sessionID) {
    return { allowed: false, bridge, identity: null, decision: null }
  }

  try {
    const decision = await bridge.pluginDecisionFor(identity.sessionID, PLUGIN_ID)
    const allowed =
      decision?.managed === true &&
      decision?.enabled === true &&
      typeof decision?.mode === "string" &&
      Boolean(decision.mode)
    return { allowed, bridge, identity, decision }
  } catch {
    return { allowed: false, bridge, identity, decision: null }
  }
}

async function requirePluginAuthorization(event) {
  const authorization = await pluginAuthorization(event)
  if (!authorization.allowed) throw new Error(POLICY_DENIAL)
  return authorization
}

async function requireGadgetSkillAuthorization(authorization, skill) {
  const { bridge, identity } = authorization
  if (bridge?.decisionFor) {
    try {
      const decision = await bridge.decisionFor(identity.sessionID, skill)
      if (decision?.allowed === true) return
    } catch {
      // Convert unavailable policy paths into one deterministic denial.
    }
  }
  throw new Error(
    `response-gadgets: blocked gadget skill '${skill}' by authoritative mode-router skill policy`,
  )
}

function appendSystem(event, text) {
  if (Array.isArray(event?.system)) {
    for (let index = event.system.length - 1; index >= 0; index--) {
      const part = event.system[index]
      if (typeof part === "object" && part !== null && typeof part.text === "string") {
        part.text = `${part.text}\n\n${text}`
        return
      }
      if (typeof part === "string") {
        event.system[index] = `${part}\n\n${text}`
        return
      }
    }
    event.system.push({ text })
    return
  }

  if (typeof event?.system === "string") {
    event.system = `${event.system}\n\n${text}`
    return
  }

  event.system = [{ text }]
}

function toolSkillID(event) {
  if (String(event?.tool ?? "").toLowerCase() !== "skill") return null
  const input = event?.input && typeof event.input === "object" ? event.input : {}
  for (const key of ["name", "skill", "id"]) {
    if (typeof input[key] === "string" && input[key]) return input[key]
  }
  return null
}

function requestedGadgetAction(event, admittedInputText) {
  const providerUser = latestUser(event?.messages)
  if (providerUser) {
    const markerMatch = GADGET_COMMAND_RE.exec(providerUser.text)
    if (markerMatch) return markerMatch[1].trim()

    const currentRawMatch = RAW_GADGET_COMMAND_RE.exec(providerUser.text)
    return currentRawMatch ? (currentRawMatch[1] ?? "").trim() : null
  }

  const rawMatch =
    typeof admittedInputText === "string"
      ? RAW_GADGET_COMMAND_RE.exec(admittedInputText.trim())
      : null
  return rawMatch ? (rawMatch[1] ?? "").trim() : null
}

function replaceTextPayload(value, payload, depth = 0) {
  if (depth > 8 || value == null) return false
  if (Array.isArray(value)) {
    for (let index = value.length - 1; index >= 0; index--) {
      if (replaceTextPayload(value[index], payload, depth + 1)) return true
    }
    return false
  }
  if (typeof value !== "object") return false

  if (
    typeof value.text === "string" &&
    (GADGET_COMMAND_RE.test(value.text) || RAW_GADGET_COMMAND_RE.test(value.text.trim()))
  ) {
    value.text = payload
    return true
  }
  if (
    typeof value.content === "string" &&
    (GADGET_COMMAND_RE.test(value.content) || RAW_GADGET_COMMAND_RE.test(value.content.trim()))
  ) {
    value.content = payload
    return true
  }
  for (const key of ["content", "parts", "message", "value"]) {
    if (replaceTextPayload(value[key], payload, depth + 1)) return true
  }
  return false
}

function replaceGadgetCommandPrompt(event, commandResult) {
  const payload = [
    "The response-gadgets runtime already executed this control command.",
    "Return the following result verbatim, with no commentary:",
    "",
    commandResult,
  ].join("\n")
  const providerUser = latestUser(event?.messages)
  return providerUser ? replaceTextPayload(providerUser.message, payload) : false
}

export default {
  id: PLUGIN_ID,

  async setup(ctx) {
    const configManager = new ConfigManager(configPathOf(ctx))
    await configManager.initialize()
    const turns = new Map()
    const setupTemplateSessions = new Set()

    function rejectSetupTemplateExecution(event) {
      const bridge = globalThis[MODE_BRIDGE]
      const identity = trustedIdentity(event, bridge)
      if (!identity?.sessionID) return

      const providerUser = latestUser(event?.messages)
      const metadata = currentInputMetadata(event, providerUser, identity)
      if (metadata.present) {
        if (trustedSetupTemplateMetadata(metadata.value)) {
          setupTemplateSessions.add(identity.sessionID)
        } else {
          setupTemplateSessions.delete(identity.sessionID)
          return
        }
      } else if (providerUser) {
        setupTemplateSessions.delete(identity.sessionID)
        return
      }

      if (setupTemplateSessions.has(identity.sessionID)) {
        throw new Error(BOOTSTRAP_DENIAL)
      }
    }

    await ctx.command.transform((commands) => {
      // V2.0.16 command editor is add-only (no update(), no template field):
      // execute submits the marker as a user prompt and the context hook
      // below executes it, exactly as the old $ARGUMENTS template did.
      commands.add({
        name: "gadget",
        description:
          "Inspect or change global response-gadget probabilities: /gadget [status|reload|<name> <0..1>]",
        execute: async ({ sessionID, prompt, delivery }) => {
          if (!sessionID)
            throw new Error("response-gadgets: /gadget has no session context")
          const args =
            typeof prompt?.text === "string" ? prompt.text.replace(/"/g, "") : ""
          await ctx.session.prompt({
            ...prompt,
            sessionID,
            text: `<opencode-response-gadget action="${args}" />`,
            delivery,
          })
        },
      })
    })

    await ctx.tool.transform((tools) => {
      tools.add({
        name: RNG_TOOL.name,
        options: { codemode: false },
        description: RNG_TOOL.description,
        input: RNG_TOOL.inputSchema,
        output: { type: "string" },
        execute: async (args, toolContext) => {
          rejectSetupTemplateExecution(toolContext)
          await requirePluginAuthorization(toolContext)
          const selected = weightedSelection(args?.options, args?.weights, () => randomInt(RNG_RANGE))
          return { output: selected, content: selected }
        },
      })
    })

    // Selection happens before model dispatch so the gadget can execute
    // inside the same assistant turn. TencentDB therefore still observes one
    // ordinary completed turn rather than a synthetic follow-up turn.
    // OpenCode V2: ambient selection runs in the model `context` hook so
    // it can influence the same assistant turn without creating a synthetic
    // follow-up turn. This is intentionally not the legacy V1 plugin API.
    await ctx.session.hook("context", async (event) => {
      try {
        // The mode-router owns whether this plugin exists for the request.
        // Resolve and authorize before config refresh, command execution,
        // random gates, directives, or per-turn state allocation.
        const authorization = await pluginAuthorization(event)
        const { bridge, identity, decision: pluginDecision } = authorization
        const providerUser = latestUser(event?.messages)
        const currentMetadata = currentInputMetadata(event, providerUser, identity)

        if (identity?.sessionID) {
          if (trustedSetupTemplateMetadata(currentMetadata.value)) {
            setupTemplateSessions.add(identity.sessionID)
            turns.delete(identity.sessionID)
            return
          }
          if (providerUser || currentMetadata.present) {
            setupTemplateSessions.delete(identity.sessionID)
          }
        }

        const admittedInputText =
          typeof identity?.inputText === "string" ? identity.inputText.trim() : ""
        const commandAction = requestedGadgetAction(event, admittedInputText)

        if (!authorization.allowed) {
          if (commandAction !== null) {
            replaceGadgetCommandPrompt(event, POLICY_DENIAL)
            appendSystem(
              event,
              [
                "<response-gadget-command>",
                "The response-gadgets runtime control operation was denied.",
                "Return the exact result below verbatim and do not call tools:",
                POLICY_DENIAL,
                "</response-gadget-command>",
              ].join("\n"),
            )
          }
          return
        }

        // The file is authoritative for probability across plugin setups and
        // sessions. Refresh only after mode-router authorization, retaining the
        // last-known-good value if an external edit is missing or invalid.
        await configManager.refresh()
        const config = configManager.current

        if (commandAction !== null) {
          const commandResult = await executeGadgetCommand(
            commandAction.trim(),
            configManager,
          )
          const replaced = replaceGadgetCommandPrompt(event, commandResult)
          appendSystem(
            event,
            [
              "<response-gadget-command>",
              "The response-gadgets runtime control operation is complete.",
              "Return the exact result below verbatim and do not call tools:",
              commandResult,
              "</response-gadget-command>",
            ].join("\n"),
          )
          if (!replaced) {
            console.warn(
              "[kakudou.response-gadgets] command marker detected but prompt could not be rewritten; using system result only",
            )
          }
          // A /gadget control turn never participates in ambient selection.
          // In particular, leave event.tools structurally and deeply untouched.
          return
        }

        const sessionID = identity.sessionID

        // Ambient behavior belongs only to the primary user-facing agent.
        // The mode-router correlates the V2 public lifecycle stream when the
        // context event itself omits identity metadata. Unknown identity fails
        // safe by suppressing gadgets.
        const activeAgent =
          identity?.agent ??
          bridge?.agentFor?.(sessionID) ??
          agentOf(event)
        if (activeAgent !== config.primaryAgent) return

        const user = providerUser
        const rawUserText =
          user?.text?.trim() || admittedInputText
        if (!rawUserText || isControlTurn(rawUserText)) return
        const userTurnKey = turnKey(identity, user, rawUserText)

        const mode = pluginDecision.mode

        let state = turns.get(sessionID)
        if (!state || state.turnKey !== userTurnKey) {
          const chosen = await selectGadgets(config, {
            randomBelow: (bound) => randomInt(bound),
            skillAllowed: async (skill) =>
              bridge?.decisionFor
                ? (await bridge.decisionFor(sessionID, skill))?.allowed === true
                : false,
          })
          state = newTurnState(userTurnKey, mode, chosen)
          rememberTurn(turns, sessionID, state)
        }

        if (!state.selected.length) return
        appendSystem(event, directive(state.mode, state))
      } catch (error) {
        // Optional ambient behavior must never break the actual user response.
        console.error("[kakudou.response-gadgets] context hook failed closed:", error)
      }
    })

    // Enforce at-most-once execution for gadgets selected by the ambient gate.
    // Explicit/manual gadget invocations on turns with no random selection are untouched.
    await ctx.tool.hook("execute.before", async (event) => {
      const skill = toolSkillID(event)
      if (!isGadgetSkill(skill)) return

      rejectSetupTemplateExecution(event)
      const authorization = await requirePluginAuthorization(event)
      await requireGadgetSkillAuthorization(authorization, skill)

      const sessionID = authorization.identity.sessionID
      // Mark before execution. A failed gadget is terminal for this turn: no retry/reroll.
      const claim = claimGadgetInvocation(turns.get(sessionID), skill)
      if (!claim.ok) throw new Error(claim.reason)
    })
  },
}
