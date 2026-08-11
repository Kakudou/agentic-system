import { modeDecision, isManagedSkill } from "./matcher.js"

export function sessionIDOf(event) {
  return (
    event?.sessionID ??
    event?.sessionId ??
    event?.session?.id ??
    event?.context?.sessionID ??
    event?.context?.sessionId ??
    null
  )
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

  return "unknown"
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

const MODE_COMMAND_RE = /<opencode-mode-router\s+action="([^"]*)"\s*\/>/i

export function requestedModeAction(event) {
  // V2 request hooks expose provider-ready model messages, not necessarily the
  // durable { info, parts } session shape. Search from newest to oldest and
  // tolerate either representation.
  const messages = Array.isArray(event?.messages) ? event.messages : []
  for (let i = messages.length - 1; i >= 0; i--) {
    const match = MODE_COMMAND_RE.exec(textFrom(messages[i]))
    if (match) return match[1].trim()
  }

  // Last-resort compatibility for beta event-shape drift.
  const match = MODE_COMMAND_RE.exec(textFrom(event?.messages))
  return match ? match[1].trim() : null
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

  const rules = config.modes.get(mode)
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
    "  V2 request hook ............ ACTIVE",
    "  per-session mode state ..... ACTIVE",
    "  model catalog filter ....... ACTIVE",
    "  skill execution guard ...... ACTIVE",
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
  return lines.join("\n")
}

// Best-effort protection against the common "just Read the inactive SKILL.md"
// bypass. This is not, and does not claim to be, a shell/filesystem sandbox.
function probableSkillIDFromPath(raw) {
  if (typeof raw !== "string") return null
  const path = raw.replaceAll("\\", "/")

  // Directory skill: .../skills[/nested]/skill-id/SKILL.md or supporting file.
  const marker = "/skills/"
  const pos = path.lastIndexOf(marker)
  if (pos >= 0) {
    const tail = path.slice(pos + marker.length)
    const parts = tail.split("/").filter(Boolean)
    if (!parts.length) return null

    if (parts.length >= 2) {
      // For .../<id>/SKILL.md and .../<id>/references/foo.md.
      // The first segment is correct for standard sources. For nested source
      // layouts, SKILL.md's direct parent is more accurate.
      const skillMdIndex = parts.lastIndexOf("SKILL.md")
      if (skillMdIndex > 0) return parts[skillMdIndex - 1]

      // Standard directory source.
      return parts[0]
    }

    // Flat skill: .../skills/dev-review.md
    if (parts[0].endsWith(".md")) {
      return parts[0].slice(0, -3)
    }
  }

  return null
}

function pathStringsFromInput(input) {
  if (!input || typeof input !== "object") return []
  const values = []

  for (const key of [
    "filePath",
    "filepath",
    "path",
    "directory",
    "dir",
    "root",
    "cwd",
  ]) {
    if (typeof input[key] === "string") values.push(input[key])
  }

  return values
}

export function deniedManagedSkillFile(event, mode, config) {
  const tool = String(event?.tool ?? "").toLowerCase()
  if (!["read", "glob", "grep"].includes(tool)) return null

  for (const path of pathStringsFromInput(event?.input)) {
    const skillID = probableSkillIDFromPath(path)
    if (!skillID || !isManagedSkill(skillID, config)) continue
    const decision = modeDecision(skillID, mode, config)
    if (!decision.allowed) return { skillID, path, tool, decision }
  }

  return null
}
