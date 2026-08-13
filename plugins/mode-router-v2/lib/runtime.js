import { posix } from "node:path"
import { modeDecision, isManagedSkill } from "./matcher.js"
import { disableTools } from "./catalog.js"

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

const SKILL_SLASH_RE = /^\/([a-z0-9]+(?:-[a-z0-9]+)*)(?=\s|$)/

export function explicitSkillSlash(text) {
  if (typeof text !== "string") return null
  const match = SKILL_SLASH_RE.exec(text.trim())
  return match ? match[1] : null
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
  // request hook is the last authoritative model-dispatch boundary, so remove
  // the executable tool surface and replace the newest prompt payload we can
  // safely identify. The system block below remains authoritative even if a
  // beta build represents the injected skill message in an unfamiliar shape.
  disableTools(event)

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

export function enforceModeToolSurface(event, mode, config) {
  const rules = config.modes.get(mode)
  if (!rules || !event?.tools || typeof event.tools !== "object") return
  if (!rules.toolsDenied?.length) return

  const denied = new Set(rules.toolsDenied.map((name) => String(name).toLowerCase()))
  for (const key of Object.keys(event.tools)) {
    if (denied.has(key.toLowerCase())) delete event.tools[key]
  }
}

export function modeToolDenied(toolName, mode, config) {
  const rules = config.modes.get(mode)
  if (!rules || typeof toolName !== "string") return false
  const tool = toolName.toLowerCase()
  return rules.toolsDenied?.some((name) => String(name).toLowerCase() === tool) ?? false
}

export function subagentTarget(event) {
  const tool = String(event?.tool ?? "").toLowerCase()
  if (!["subagent", "task"].includes(tool)) return null
  const input = event?.input && typeof event.input === "object" ? event.input : {}
  for (const key of ["agent", "agentID", "agentId", "subagent", "type", "name"]) {
    if (typeof input[key] === "string" && input[key].trim()) return input[key].trim()
  }
  return null
}

export function modeAllowsSubagent(target, mode, config) {
  if (!target) return false
  const rules = config.modes.get(mode)
  if (!rules) return false
  if (!rules.agentsAllowed?.length) return true
  return rules.agentsAllowed.includes(target)
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

  const rules = config.modes.get(mode) ?? { allow: [], deny: [], agentsAllowed: [], toolsDenied: [] }
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
    `  SUBAGENTS ${rules.agentsAllowed?.length ? rules.agentsAllowed.join(", ") : "(unrestricted by mode)"}`,
    `  TOOLS DENIED ${rules.toolsDenied?.length ? rules.toolsDenied.join(", ") : "(none)"}`,
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
    "  mode tool surface .......... ACTIVE",
    "  mode subagent guard ........ ACTIVE",
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
    if (mode.agentsAllowed?.length) {
      lines.push(`    subagents: ${mode.agentsAllowed.join(", ")}`)
    }
    if (mode.toolsDenied?.length) {
      lines.push(`    tools denied: ${mode.toolsDenied.join(", ")}`)
    }
  }

  lines.push("")
  lines.push(`Default: ${config.defaultMode}`)
  lines.push(`Managed patterns: ${config.managedPatterns.join(", ")}`)
  return lines.join("\n")
}

// Protect normal OpenCode file-tool access to mode-managed skill sources.
// This is deliberately scoped to the read/glob/grep tool family; it is not a
// shell/filesystem sandbox and must not be described as one.
function skillPathScope(raw) {
  if (typeof raw !== "string") return null

  // Normalize before classifying so dot segments cannot disguise the real
  // skill directory (for example skills/x/../<inactive-skill>/SKILL.md). This is
  // lexical normalization only; symlink/filesystem containment remains a
  // host-permission concern, not something this router pretends to sandbox.
  const path = posix.normalize(raw.replaceAll("\\", "/"))

  if (path === "skills" || path.endsWith("/skills")) {
    return { broad: true, skillID: null }
  }

  // Accept both absolute (.../skills/<id>/...) and repository-relative
  // (skills/<id>/...) paths. Use the last skills/ component so a parent path
  // containing the word "skills" cannot confuse the resolver.
  const marker = "skills/"
  const pos = path.lastIndexOf(marker)
  if (pos < 0) return null

  const tail = path.slice(pos + marker.length)
  const parts = tail.split("/").filter(Boolean)
  if (!parts.length) return { broad: true, skillID: null }

  const first = parts[0]
  if (["*", "**"].includes(first) || first.includes("*") || first.includes("?")) {
    return { broad: true, skillID: null }
  }

  // Flat skill: skills/example-skill.md
  if (first.endsWith(".md")) {
    return { broad: false, skillID: first.slice(0, -3) }
  }

  return { broad: false, skillID: first }
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

  const candidatePaths = pathStringsFromInput(event?.input)
  if (tool === "glob" && typeof event?.input?.pattern === "string") {
    candidatePaths.push(event.input.pattern)
  }
  if (tool === "grep" && typeof event?.input?.include === "string") {
    candidatePaths.push(event.input.include)
  }

  for (const path of candidatePaths) {
    const scope = skillPathScope(path)
    if (!scope) continue

    // A broad glob/grep rooted at skills/ could reveal every inactive managed
    // skill. Block that source-level bypass whenever this mode excludes any
    // managed skill. Callers should use the already-filtered skill catalog or
    // address an allowed skill directory explicitly.
    if (scope.broad) {
      const deniedExists = config.managed.some(({ pattern, regex }) => {
        // Find one advertised/configured pattern that this mode does not
        // allow. Patterns are sufficient here: broad source access is denied
        // if the current mode does not own the complete managed universe.
        const candidate = pattern.replace(/[?*].*$/, "probe")
        const decision = modeDecision(candidate, mode, config)
        return regex.test(candidate) && decision.managed && !decision.allowed
      })
      if (deniedExists) {
        return {
          skillID: "<managed-skill-tree>",
          path,
          tool,
          decision: { managed: true, allowed: false, reason: "broad-skill-source-access" },
        }
      }
      continue
    }

    const skillID = scope.skillID
    if (!skillID || !isManagedSkill(skillID, config)) continue
    const decision = modeDecision(skillID, mode, config)
    if (!decision.allowed) return { skillID, path, tool, decision }
  }

  return null
}
