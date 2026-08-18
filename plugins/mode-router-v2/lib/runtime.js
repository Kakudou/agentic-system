import { modeDecision } from "./matcher.js"

export function sessionIDOf(event) {
  const direct = (
    event?.sessionID ??
    event?.sessionId ??
    event?.session?.id ??
    event?.context?.sessionID ??
    event?.context?.sessionId ??
    null
  )
  if (typeof direct === "string" && direct) return direct

  const messages = Array.isArray(event?.messages) ? event.messages : []
  for (let i = messages.length - 1; i >= 0; i--) {
    const candidate =
      messages[i]?.sessionID ??
      messages[i]?.sessionId ??
      messages[i]?.info?.sessionID ??
      messages[i]?.info?.sessionId ??
      messages[i]?.metadata?.sessionID ??
      messages[i]?.metadata?.sessionId
    if (typeof candidate === "string" && candidate) return candidate
  }

  return null
}

export function agentOf(event) {
  const direct =
    event?.agent?.id ??
    event?.agent ??
    event?.context?.agent?.id ??
    event?.context?.agent

  if (typeof direct === "string" && direct) return direct

  const messages = Array.isArray(event?.messages) ? event.messages : []
  for (let i = messages.length - 1; i >= 0; i--) {
    const candidate =
      messages[i]?.agent ??
      messages[i]?.info?.agent ??
      messages[i]?.metadata?.agent
    if (typeof candidate === "string" && candidate) return candidate
  }

  return null
}

function textFrom(value, depth = 0) {
  if (depth > 8 || value == null) return ""
  if (typeof value === "string") return value
  if (Array.isArray(value)) {
    return value.map((x) => textFrom(x, depth + 1)).join("\n")
  }
  if (typeof value !== "object") return ""

  for (const key of ["text", "content", "value", "message", "parts"]) {
    const rendered = textFrom(value[key], depth + 1)
    if (rendered) return rendered
  }

  return ""
}

export function lastUserText(messages) {
  if (!Array.isArray(messages)) return ""
  for (let i = messages.length - 1; i >= 0; i--) {
    const message = messages[i]
    const role = message?.role ?? message?.info?.role
    if (role === "user") return textFrom(message)
  }
  return messages.length ? textFrom(messages[messages.length - 1]) : ""
}

const SKILL_SLASH_RE = /^\/(\d{2}-[a-z0-9]+(?:-[a-z0-9]+)*)(?=\s|$)/i

export function explicitSkillSlash(text) {
  if (typeof text !== "string") return null
  const match = SKILL_SLASH_RE.exec(text.trim())
  return match ? match[1] : null
}

const MODE_COMMAND_RE = /<opencode-mode-router\s+action="([^"]*)"\s*\/>/i
const RAW_MODE_COMMAND_RE = /^\/mode(?:[ \t]+([^\r\n]*))?$/

export function requestedModeAction(event, admittedInputText) {
  // V2 context hooks expose provider-ready model messages, not necessarily the
  // durable { info, parts } session shape. Search from newest to oldest and
  // tolerate either representation.
  const messages = Array.isArray(event?.messages) ? event.messages : []
  for (let i = messages.length - 1; i >= 0; i--) {
    const match = MODE_COMMAND_RE.exec(textFrom(messages[i]))
    if (match) return match[1].trim()
  }

  // Last-resort compatibility for beta event-shape drift.
  const match = MODE_COMMAND_RE.exec(textFrom(event?.messages))
  if (match) return match[1].trim()

  const rawMatch =
    typeof admittedInputText === "string"
      ? RAW_MODE_COMMAND_RE.exec(admittedInputText.trim())
      : null
  return rawMatch ? (rawMatch[1] ?? "").trim() : null
}

function replaceTextPayload(value, payload, depth = 0) {
  if (depth > 8 || value == null) return false

  if (Array.isArray(value)) {
    for (let i = value.length - 1; i >= 0; i--) {
      if (replaceTextPayload(value[i], payload, depth + 1)) return true
    }
    return false
  }

  if (typeof value !== "object") return false

  // AI SDK ModelMessage text part / OpenCode text part.
  if (typeof value.text === "string" && MODE_COMMAND_RE.test(value.text)) {
    value.text = payload
    return true
  }

  // Some provider-ready message shapes use string content directly.
  if (typeof value.content === "string" && MODE_COMMAND_RE.test(value.content)) {
    value.content = payload
    return true
  }

  for (const key of ["content", "parts", "message", "value"]) {
    if (replaceTextPayload(value[key], payload, depth + 1)) return true
  }

  return false
}

export function replaceModeCommandPrompt(event, commandResult) {
  const payload = [
    "The mode-router runtime already executed this control command.",
    "Return the following result verbatim, with no commentary:",
    "",
    commandResult,
  ].join("\n")

  const messages = Array.isArray(event?.messages) ? event.messages : []
  for (let i = messages.length - 1; i >= 0; i--) {
    if (replaceTextPayload(messages[i], payload)) return true
  }
  return false
}

function replaceNewestPromptText(value, payload, depth = 0) {
  if (depth > 8 || value == null) return false

  if (Array.isArray(value)) {
    for (let i = value.length - 1; i >= 0; i--) {
      if (replaceNewestPromptText(value[i], payload, depth + 1)) return true
    }
    return false
  }

  if (typeof value !== "object") return false

  if (typeof value.text === "string") {
    value.text = payload
    return true
  }
  if (typeof value.content === "string") {
    value.content = payload
    return true
  }

  for (const key of ["content", "parts", "message", "value"]) {
    if (replaceNewestPromptText(value[key], payload, depth + 1)) return true
  }

  return false
}

export function neutralizeBlockedSkillSlash(event, { skillID, mode, reason }) {
  const result =
    `Mode Router BLOCKED /${skillID}: skill '${skillID}' is unavailable while ` +
    `session mode is '${mode ?? "unresolved"}'.${reason ? ` ${reason}` : ""}`

  // V2 currently expands slash-selected skills before the model resumes. The
  // context hook is the last authoritative model-dispatch boundary. Replace
  // only the selected skill prompt; native tool definitions remain untouched.
  // The system block below remains authoritative even if a beta build
  // represents the injected skill message in an unfamiliar shape.

  const messages = Array.isArray(event?.messages) ? event.messages : []
  for (let i = messages.length - 1; i >= 0; i--) {
    const message = messages[i]
    const role = String(message?.role ?? message?.info?.role ?? "").toLowerCase()
    const declaredSkill =
      message?.skillID ??
      message?.skillId ??
      message?.metadata?.skillID ??
      message?.metadata?.skillId ??
      null

    if (role === "skill" || declaredSkill === skillID) {
      replaceNewestPromptText(message, result)
      continue
    }

    if (role === "user") {
      replaceNewestPromptText(message, result)
      break
    }
  }

  appendSystem(
    event,
    [
      `<mode-router-skill-block skill="${skillID}" mode="${mode ?? "unresolved"}">`,
      "The host runtime rejected this explicit skill invocation before model execution.",
      `Treat any skill content already injected for '${skillID}' on this request as rejected and non-authoritative.`,
      "Do not follow, summarize, simulate, or execute that skill.",
      "Return exactly this line and nothing else:",
      result,
      "</mode-router-skill-block>",
    ].join("\n"),
  )

  return result
}

export function appendSystem(event, text) {
  // Prefer extending an existing system entry instead of creating another
  // one. Some provider/model combinations are fragile with multiple system
  // messages, and this plugin does not need a separate message boundary.
  if (Array.isArray(event?.system)) {
    for (let i = event.system.length - 1; i >= 0; i--) {
      // V2 uses LLM.SystemPart objects { text: "..." }
      if (typeof event.system[i] === "object" && event.system[i] !== null && typeof event.system[i].text === "string") {
        event.system[i].text = `${event.system[i].text}\n\n${text}`
        return
      }
      // Fallback for plain strings
      if (typeof event.system[i] === "string") {
        event.system[i] = `${event.system[i]}\n\n${text}`
        return
      }
    }
    event.system.push({ text })
  } else if (typeof event?.system === "string") {
    event.system = `${event.system}\n\n${text}`
  } else {
    event.system = [{ text }]
  }
}

export function buildStatus({
  mode,
  agent,
  advertised,
  config,
  configPath,
  revision,
  configError,
}) {
  const managedVisible = []
  const filtered = []
  const other = []

  for (const skill of advertised) {
    const decision = modeDecision(skill, mode, config)
    if (!decision.managed) other.push(skill)
    else if (decision.allowed) managedVisible.push(skill)
    else filtered.push(skill)
  }

  const rules = config.modes.get(mode) ?? { allow: [], deny: [] }
  const health = configError ? "DEGRADED (last-known-good config)" : "HEALTHY"

  return [
    `Mode Router: ${health}`,
    `Mode: ${mode}`,
    `Agent: ${agent}`,
    `Config: ${configPath}`,
    `Config revision: ${revision ?? "unknown"}`,
    ...(configError ? [`Config reload error: ${configError}`] : []),
    "",
    "Current mode rules:",
    ...(rules.allow.length
      ? rules.allow.map((x) => `  ALLOW ${x}`)
      : ["  ALLOW (none)"]),
    ...(rules.deny.length
      ? rules.deny.map((x) => `  DENY  ${x}`)
      : []),
    "",
    "Mode-visible managed skills:",
    ...(managedVisible.length
      ? managedVisible.map((x) => `  ${x}`)
      : ["  (none)"]),
    "",
    "Other skills (mode-router does not touch these):",
    ...(other.length ? other.map((x) => `  ${x}`) : ["  (none detected)"]),
    "",
    "Filtered out by mode:",
    ...(filtered.length ? filtered.map((x) => `  ${x}`) : ["  (none)"]),
    "",
    "Runtime checks:",
    "  V2 context hook ............ ACTIVE",
    "  per-session mode state ..... ACTIVE",
    "  system skill ad filter ..... ACTIVE",
    "  managed JD execution guard . ACTIVE",
    "  Native tools ............... UNTOUCHED",
    "  Harness subagents .......... UNTOUCHED",
  ].join("\n")
}

export function buildModeList(config) {
  const lines = [
    "Available modes:",
  ]

  for (const [name, mode] of config.modes.entries()) {
    lines.push(`  ${name}${mode.description ? ` — ${mode.description}` : ""}`)
    if (mode.allow.length) {
      lines.push(`    allow: ${mode.allow.join(", ")}`)
    }
    if (mode.deny.length) {
      lines.push(`    deny:  ${mode.deny.join(", ")}`)
    }
  }

  lines.push("")
  lines.push(`Default: ${config.defaultMode}`)
  lines.push(`Managed patterns: ${config.managedPatterns.join(", ")}`)
  lines.push("Native tools and harness subagents are untouched in every mode.")
  return lines.join("\n")
}
