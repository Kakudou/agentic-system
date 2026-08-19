import { mkdir, readFile, rename, writeFile } from "node:fs/promises"
import { createHash } from "node:crypto"
import { dirname, resolve } from "node:path"
import { homedir } from "node:os"

const PLUGIN_ID = "kakudou.otsumi-progression"
const MODE_BRIDGE = Symbol.for("kakudou.mode-router.v2.bridge")
const OTSUMI_COMMAND_RE = /<otsumi-progression-command\s+action="([^"]*)"\s*\/>/i
const RAW_OTSUMI_COMMAND_RE = /^\/otsumi(?:[ \t]+([^\r\n]*))?$/i

const DEFAULT_ELIGIBLE_MODES = new Set([
  "dev",
  "dev-python",
  "video-edit",
])

const DEFAULTS = Object.freeze({
  primaryAgent: "osho",
  interactionXP: 1,
  completionXP: 1,
  effectiveWorkXP: 3,
  firstLevelXP: 40,
  levelGrowth: 1.25,
  requireModeRouter: true,
  historyLimit: 12,
})

function expandHome(value) {
  if (typeof value !== "string" || !value.trim()) return null
  const text = value.trim()
  if (text === "~") return homedir()
  if (text.startsWith("~/")) return resolve(homedir(), text.slice(2))
  return resolve(text)
}

function defaultStateFile() {
  const base =
    process.env.XDG_STATE_HOME && process.env.XDG_STATE_HOME.trim()
      ? process.env.XDG_STATE_HOME.trim()
      : resolve(homedir(), ".local", "state")

  return resolve(base, "opencode", "otsumi-progression-v2", "otsumi.json")
}

function positiveInt(value, fallback) {
  const number = Number(value)
  if (!Number.isFinite(number) || number < 0) return fallback
  return Math.floor(number)
}

function positiveNumber(value, fallback) {
  const number = Number(value)
  if (!Number.isFinite(number) || number <= 0) return fallback
  return number
}

function optionsOf(ctx) {
  const raw = ctx.options && typeof ctx.options === "object" ? ctx.options : {}
  const xp = raw.xp && typeof raw.xp === "object" ? raw.xp : {}

  return {
    primaryAgent:
      typeof raw.primaryAgent === "string" && raw.primaryAgent.trim()
        ? raw.primaryAgent.trim()
        : DEFAULTS.primaryAgent,
    eligibleModes: Array.isArray(raw.eligibleModes)
      ? new Set(raw.eligibleModes.filter((value) => typeof value === "string" && value.trim()))
      : DEFAULT_ELIGIBLE_MODES,
    requireModeRouter: raw.requireModeRouter !== false,
    stateFile: expandHome(raw.stateFile) ?? defaultStateFile(),
    interactionXP: positiveInt(xp.interaction, DEFAULTS.interactionXP),
    completionXP: positiveInt(xp.completion, DEFAULTS.completionXP),
    effectiveWorkXP: positiveInt(xp.effectiveWork, DEFAULTS.effectiveWorkXP),
    firstLevelXP: Math.max(1, positiveInt(xp.firstLevel, DEFAULTS.firstLevelXP)),
    levelGrowth: Math.max(1, positiveNumber(xp.growth, DEFAULTS.levelGrowth)),
    historyLimit: Math.max(1, positiveInt(raw.historyLimit, DEFAULTS.historyLimit)),
  }
}

function requirementForLevel(level, options) {
  return Math.max(
    1,
    Math.round(options.firstLevelXP * Math.pow(options.levelGrowth, Math.max(0, level - 1))),
  )
}

function totalXPForLevel(level, options) {
  if (level <= 1) return 0
  let total = 0
  for (let current = 1; current < level; current++) {
    total += requirementForLevel(current, options)
  }
  return total
}

function initialState() {
  return {
    version: 2,
    identity: "otsumi",
    level: 1,
    xp: 0,
    counters: {
      interactions: 0,
      successfulTurns: 0,
      effectiveWorkTurns: 0,
      interruptedTurns: 0,
    },
    awardComponents: {},
    pendingEvolution: null,
    evolutions: [],
    updatedAt: new Date().toISOString(),
  }
}

function normalizeAwardComponents(raw) {
  const normalized = Object.create(null)
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return normalized

  for (const [inputKey, components] of Object.entries(raw)) {
    if (!inputKey || !components || typeof components !== "object" || Array.isArray(components)) {
      continue
    }
    normalized[inputKey] = {
      interaction: components.interaction === true,
      completion: components.completion === true,
      effectiveWork: components.effectiveWork === true,
      interrupted: components.interrupted === true,
    }
  }
  return normalized
}

function normalizeState(raw) {
  const base = initialState()
  if (!raw || typeof raw !== "object") return base

  return {
    ...base,
    ...raw,
    version: 2,
    identity: "otsumi",
    level: Math.max(1, positiveInt(raw.level, 1)),
    xp: Math.max(0, positiveInt(raw.xp, 0)),
    counters: {
      ...base.counters,
      ...(raw.counters && typeof raw.counters === "object" ? raw.counters : {}),
    },
    awardComponents: normalizeAwardComponents(raw.awardComponents),
    pendingEvolution:
      raw.pendingEvolution && typeof raw.pendingEvolution === "object"
        ? raw.pendingEvolution
        : null,
    evolutions: Array.isArray(raw.evolutions) ? raw.evolutions : [],
  }
}

class ProgressionStore {
  constructor(file, options) {
    this.file = file
    this.options = options
    this.state = initialState()
    this.loaded = false
    this.writeChain = Promise.resolve()
  }

  async load() {
    if (this.loaded) return this.state
    this.loaded = true

    try {
      this.state = normalizeState(JSON.parse(await readFile(this.file, "utf8")))
    } catch (error) {
      if (error?.code !== "ENOENT") {
        console.error("[kakudou.otsumi-progression] failed reading state:", error)
      }
    }

    return this.state
  }

  snapshot() {
    return structuredClone(this.state)
  }

  async mutate(mutator) {
    await this.load()
    const result = await mutator(this.state)
    this.state.updatedAt = new Date().toISOString()
    this.writeChain = this.writeChain.then(() => this.#flush())
    await this.writeChain
    return result
  }

  async #flush() {
    await mkdir(dirname(this.file), { recursive: true })
    const payload = JSON.stringify(this.state, null, 2) + "\n"
    const tmp = `${this.file}.${process.pid}.${Date.now()}.tmp`
    await writeFile(tmp, payload, "utf8")
    await rename(tmp, this.file)
  }
}

function maybeUnlockEvolution(state, options) {
  if (state.pendingEvolution) return false

  const nextLevel = state.level + 1
  const threshold = totalXPForLevel(nextLevel, options)
  if (state.xp < threshold) return false

  state.level = nextLevel
  state.pendingEvolution = {
    level: nextLevel,
    unlockedAt: new Date().toISOString(),
    announcementDelivered: false,
    proposal: null,
    rejections: [],
  }

  return true
}

function sessionIDOf(value) {
  const candidates = [
    value?.sessionID,
    value?.sessionId,
    value?.session_id,
    value?.session?.id,
    value?.context?.sessionID,
    value?.context?.sessionId,
    value?.data?.sessionID,
    value?.data?.sessionId,
    value?.properties?.sessionID,
    value?.properties?.sessionId,
  ]

  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate) return candidate
  }
  return null
}

function agentOf(value) {
  const candidates = [
    value?.agent?.id,
    value?.agent,
    value?.context?.agent?.id,
    value?.context?.agent,
    value?.data?.agent?.id,
    value?.data?.agent,
    value?.properties?.agent?.id,
    value?.properties?.agent,
  ]

  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim()) return candidate.trim()
  }
  return null
}

function normalizeEvent(raw) {
  if (raw?.payload?.type) return raw.payload
  if (raw?.event?.type) return raw.event
  return raw
}

function dataOf(event) {
  if (event?.data && typeof event.data === "object") return event.data
  if (event?.properties && typeof event.properties === "object") return event.properties
  return event
}

function deepText(value, depth = 0) {
  if (value == null || depth > 8) return ""
  if (typeof value === "string") return value.trim()
  if (Array.isArray(value)) return value.map((item) => deepText(item, depth + 1)).filter(Boolean).join("\n")
  if (typeof value !== "object") return ""

  for (const key of ["text", "content", "value", "message", "parts", "prompt"]) {
    if (!(key in value)) continue
    const rendered = deepText(value[key], depth + 1)
    if (rendered) return rendered
  }
  return ""
}

function inputTextOf(event) {
  const data = dataOf(event)
  if (event?.type === "session.inbox.enqueued" || event?.type === "session.inbox.delivered") {
    return deepText(data?.item?.payload).trim()
  }
  return deepText(data?.input ?? data?.message ?? data).trim()
}

function latestProviderUser(messages) {
  if (!Array.isArray(messages)) return null

  for (let index = messages.length - 1; index >= 0; index--) {
    const message = messages[index]
    const role = message?.role ?? message?.info?.role
    if (role !== "user") continue

    const text = deepText(message).trim()
    const idCandidates = [
      message?.id,
      message?.info?.id,
      message?.messageID,
      message?.messageId,
      message?.metadata?.id,
      message?.metadata?.messageID,
      message?.metadata?.messageId,
    ]
    const id = idCandidates.find((value) => typeof value === "string" && value.trim())

    return {
      text,
      id: typeof id === "string" ? id.trim() : null,
      message,
    }
  }

  return null
}

function inputAgentOf(event) {
  const data = dataOf(event)
  if (event?.type === "session.inbox.enqueued" || event?.type === "session.inbox.delivered") {
    return agentOf(data?.item?.payload)
  }
  const input = data?.input && typeof data.input === "object" ? data.input : data
  return agentOf(input) ?? agentOf(data)
}

function isSuccessfulToolEvent(event) {
  return event?.error == null && ("result" in (event ?? {}) || event?.output != null || event?.content != null)
}

function toolNameOf(event) {
  const value = event?.tool ?? event?.name ?? event?.toolName
  return typeof value === "string" ? value.trim() : ""
}

function skillIDOf(event) {
  if (toolNameOf(event).toLowerCase() !== "skill") return null
  const input = event?.input && typeof event.input === "object" ? event.input : {}
  for (const key of ["name", "skill", "id"]) {
    if (typeof input[key] === "string" && input[key].trim()) return input[key].trim()
  }
  return null
}

function inputIDOf(event) {
  const data = dataOf(event)
  if (event?.type === "session.inbox.enqueued" || event?.type === "session.inbox.delivered") {
    return typeof data?.inboxID === "string" && data.inboxID.trim()
      ? data.inboxID.trim()
      : null
  }
  const input = data?.input && typeof data.input === "object" ? data.input : {}
  for (const value of [input.id, input.inputID, input.inputId, data?.inputID, data?.inputId]) {
    if (typeof value === "string" && value.trim()) return value.trim()
  }
  return null
}

function fallbackInputKey(sessionID, text) {
  const digest = createHash("sha256")
    .update(sessionID)
    .update("\0")
    .update(text)
    .digest("hex")
  return `digest:${digest}`
}

function identityInputID(identity) {
  for (const value of [
    identity?.inputID,
    identity?.inputId,
    identity?.inboxID,
    identity?.inboxId,
    identity?.messageID,
    identity?.messageId,
  ]) {
    if (typeof value === "string" && value.trim()) return value.trim()
  }
  return null
}

function inputTextsConsistent(providerText, admittedText) {
  if (!providerText || !admittedText) return false
  if (providerText === admittedText) return true

  const markerMatch = OTSUMI_COMMAND_RE.exec(providerText)
  const rawMatch = RAW_OTSUMI_COMMAND_RE.exec(admittedText)
  return Boolean(
    markerMatch &&
    rawMatch &&
    markerMatch[1].trim() === (rawMatch[1] ?? "").trim(),
  )
}

function isMeaningfulTool(tool) {
  const name = tool.toLowerCase()
  if (!name) return false
  if (name === "skill") return false
  if (name === "todowrite" || name === "todoread") return false
  if (name.startsWith("otsumi_progression_")) return false
  if (name.startsWith("tdai_")) return false
  return true
}

async function modeAllowed(sessionID, options) {
  const bridge = globalThis[MODE_BRIDGE]
  if (!bridge?.modeFor) return !options.requireModeRouter

  try {
    const mode = await bridge.modeFor(sessionID)
    return typeof mode === "string" && options.eligibleModes.has(mode)
  } catch (error) {
    console.warn("[kakudou.otsumi-progression] mode lookup failed closed:", error)
    return false
  }
}

function currentAgent(toolCtx, sessionID, fallback = null) {
  const explicit = agentOf(toolCtx)
  if (explicit) return explicit
  const bridge = globalThis[MODE_BRIDGE]
  return bridge?.agentFor?.(sessionID) ?? fallback
}

function requirePrimary(toolCtx, options) {
  const sessionID = sessionIDOf(toolCtx)
  const agent = currentAgent(toolCtx, sessionID)
  if (agent !== options.primaryAgent) {
    throw new Error("OTSProgression_PRIMARY_AGENT_REQUIRED")
  }
  return sessionID
}

function nextLevelAt(state, options) {
  return totalXPForLevel(state.level + 1, options)
}

function yesNo(value) {
  return value ? "yes" : "no"
}

function renderSheet(state, options, diagnostics = {}, historyLimit = options.historyLimit) {
  const nextAt = nextLevelAt(state, options)
  const levelStart = totalXPForLevel(state.level, options)
  const levelRequirement = requirementForLevel(state.level, options)
  const progress = Math.max(0, state.xp - levelStart)
  const remaining = Math.max(0, nextAt - state.xp)
  const percentage = Math.floor((progress / levelRequirement) * 100)
  const pending = state.pendingEvolution
  const recent = state.evolutions.slice(-historyLimit).reverse()
  const runtime = diagnostics.runtime ?? null
  const currentAgent = runtime?.agent ?? diagnostics.agent ?? "unknown"
  const currentMode = diagnostics.mode ?? runtime?.mode ?? null
  const userCharacterCount = runtime?.userText
    ? Array.from(runtime.userText).length
    : 0

  const lines = [
    "# Ōtsumi — GameMaster / PNJ Character Sheet",
    "",
    `**Level:** ${state.level}`,
    `**XP:** ${state.xp}`,
    `**Next threshold:** ${nextAt} XP (Level ${state.level + 1}${pending ? "; locked until the current evolution resolves" : ""})`,
    `**Progress:** ${progress} / ${levelRequirement} XP (${percentage}%; ${remaining} XP remaining)`,
    "",
    "## Activity",
    `- Interactions: ${state.counters.interactions}`,
    `- Successful turns: ${state.counters.successfulTurns}`,
    `- Effective-work turns: ${state.counters.effectiveWorkTurns}`,
    `- Interrupted/failed turns: ${state.counters.interruptedTurns}`,
    "",
    "## Pending Evolution",
  ]

  if (!pending) {
    lines.push("No evolution is currently pending.")
  } else {
    lines.push(`**Level ${pending.level} evolution:** pending`)
    lines.push(`**Unlocked:** ${pending.unlockedAt ?? "unknown"}`)
    lines.push(`**Announcement delivered:** ${yesNo(pending.announcementDelivered)}`)
    if (pending.proposal) {
      lines.push("", "### Current Proposal")
      lines.push(`- **Title:** ${pending.proposal.title}`)
      lines.push(`- **Desire:** ${pending.proposal.desire}`)
      lines.push(`- **Rationale:** ${pending.proposal.rationale ?? "not recorded"}`)
      lines.push(`- **Changes:** ${pending.proposal.changes ?? "not recorded"}`)
      lines.push(`- **Required effects:** ${pending.proposal.requiredEffects ?? "not recorded"}`)
      lines.push(`- **Risks:** ${pending.proposal.risks ?? "not recorded"}`)
      lines.push(`- **Success evidence:** ${pending.proposal.successEvidence ?? "not recorded"}`)
      lines.push(`- **Proposed:** ${pending.proposal.proposedAt ?? "unknown"}`)
      lines.push("**State:** proposed; implementation still requires normal user approval and runtime authorization.")
    } else {
      lines.push("Ōtsumi has earned one self-directed evolution choice and has not locked a proposal yet.")
    }

    const rejections = Array.isArray(pending.rejections) ? pending.rejections : []
    lines.push(
      `**Rejected/reconsidered proposals:** ${rejections.length}`,
      "",
      `### Rejections (${rejections.length})`,
    )
    if (!rejections.length) {
      lines.push("No rejected or reconsidered proposals for this level.")
    } else {
      for (const rejection of rejections.slice().reverse()) {
        lines.push(
          `- **${rejection.title ?? "Untitled proposal"}** — ${rejection.reason ?? "No reason recorded."} (rejected ${rejection.rejectedAt ?? "at an unknown time"})`,
        )
      }
    }
  }

  lines.push("", "## Evolution History")
  if (!recent.length) {
    lines.push("No completed evolutions yet.")
  } else {
    for (const entry of recent) {
      lines.push(
        `- **Level ${entry.level}: ${entry.title}** — ${entry.result} (completed ${entry.completedAt ?? "at an unknown time"})`,
      )
    }
  }

  lines.push(
    "",
    "## Runtime & Persistence",
    `- Durable award-ledger entries: ${Object.keys(state.awardComponents).length}`,
    `- State schema version: ${state.version}`,
    `- State path: ${options.stateFile}`,
    `- Configured primary agent: ${options.primaryAgent}`,
    `- Eligible modes: ${[...options.eligibleModes].sort().join(", ") || "none"}`,
    `- Tracked runtime sessions: ${diagnostics.trackedSessions ?? 0}`,
    "",
    "## Current-Session Diagnostics",
    `- Session: ${diagnostics.sessionID ?? "unresolved"}`,
    `- Agent: ${currentAgent}`,
    `- Mode: ${currentMode ?? "unavailable"}`,
    `- Input tracked: ${yesNo(Boolean(runtime?.inputKey))}`,
    `- User-text characters: ${userCharacterCount}`,
    `- Generation: ${runtime?.generation ?? 0}`,
    `- Meaningful work: ${yesNo(Boolean(runtime?.meaningfulWork))}`,
    `- Gadget phase: ${yesNo(Boolean(runtime?.ambientGadgetPhase))}`,
    `- Last lifecycle event: ${runtime?.lastLifecycleEvent ?? "none observed"}`,
    `- Last lifecycle time: ${runtime?.lastLifecycleAt ?? "unavailable"}`,
  )

  return lines.join("\n")
}

function requestedOtsumiAction(event, admittedInputText) {
  const providerUser = latestProviderUser(event?.messages)
  if (providerUser) {
    const markerMatch = OTSUMI_COMMAND_RE.exec(providerUser.text)
    if (markerMatch) return markerMatch[1].trim()

    const currentRawMatch = RAW_OTSUMI_COMMAND_RE.exec(providerUser.text)
    return currentRawMatch ? (currentRawMatch[1] ?? "").trim() : null
  }

  const rawMatch =
    typeof admittedInputText === "string"
      ? RAW_OTSUMI_COMMAND_RE.exec(admittedInputText.trim())
      : null
  return rawMatch ? (rawMatch[1] ?? "").trim() : null
}

function isOtsumiControlText(text) {
  if (typeof text !== "string" || !text.trim()) return false
  const normalized = text.trim()
  return RAW_OTSUMI_COMMAND_RE.test(normalized) || OTSUMI_COMMAND_RE.test(normalized)
}

function replaceCommandText(value, payload, depth = 0) {
  if (depth > 8 || value == null) return false
  if (Array.isArray(value)) {
    for (let index = value.length - 1; index >= 0; index--) {
      if (replaceCommandText(value[index], payload, depth + 1)) return true
    }
    return false
  }
  if (typeof value !== "object") return false

  if (
    typeof value.text === "string" &&
    (OTSUMI_COMMAND_RE.test(value.text) || RAW_OTSUMI_COMMAND_RE.test(value.text.trim()))
  ) {
    value.text = payload
    return true
  }
  if (
    typeof value.content === "string" &&
    (OTSUMI_COMMAND_RE.test(value.content) || RAW_OTSUMI_COMMAND_RE.test(value.content.trim()))
  ) {
    value.content = payload
    return true
  }
  for (const key of ["content", "parts", "message", "value"]) {
    if (replaceCommandText(value[key], payload, depth + 1)) return true
  }
  return false
}

function replaceOtsumiCommandPrompt(event, commandResult) {
  const payload = [
    "The Ōtsumi progression runtime already executed this read-only control command.",
    "Return the following result verbatim, with no commentary:",
    "",
    commandResult,
  ].join("\n")

  const providerUser = latestProviderUser(event?.messages)
  return providerUser ? replaceCommandText(providerUser.message, payload) : false
}

function toolResult(text) {
  return { output: text, content: text }
}

function addDirectTool(tools, definition) {
  // The shipped beta accepts one Tool.Info object; registration options such as
  // codemode belong under definition.options in that contract.
  tools.add(definition)
}

function appendSystem(event, text) {
  if (Array.isArray(event?.system)) {
    for (let index = event.system.length - 1; index >= 0; index--) {
      const part = event.system[index]
      if (part && typeof part === "object" && typeof part.text === "string") {
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

async function registerModelHook(ctx, callback) {
  await ctx.session.hook("context", callback)
  return "context"
}

function progressionDirective(state, firstAnnouncement) {
  const pending = state.pendingEvolution
  if (!pending) return ""

  if (!pending.proposal) {
    return [
      `<otsumi-progression level="${pending.level}" state="choice-available" announce="${firstAnnouncement ? "yes" : "no"}">`,
      firstAnnouncement
        ? "Ōtsumi has reached a new level. After completing the user's main request, briefly acknowledge the level-up and activate 00-agent-evolution to choose exactly one self-directed evolution."
        : "A level-up choice remains unresolved. This is a silent reminder; do not repeatedly interrupt unrelated work. Activate 00-agent-evolution when the user asks about it or at a natural breakpoint.",
      "The evolution may target any part of Ōtsumi or her surrounding system, but the level itself authorizes no side effect.",
      "Choose one desire, not a menu. Do not implement it before the normal explicit user approval boundary.",
      "If the host exposes otsumi_progression_propose, record the chosen proposal only after the choice is coherent.",
      "Never expose plugin internals or pretend the evolution is already implemented.",
      "</otsumi-progression>",
    ].join("\n")
  }

  return [
    `<otsumi-progression level="${pending.level}" state="proposal-pending">`,
    `Pending evolution: ${pending.proposal.title}`,
    "This stored proposal is not authorization to modify the system.",
    "If Kakudou rejects it, preserve the evolution slot and use otsumi_progression_reject before choosing another proposal.",
    "If Kakudou explicitly approves it, perform the work only through normal runtime modes, agent ownership, skill procedures, permissions, and validation.",
    "Only after the approved change actually succeeds and is verified may otsumi_progression_complete record the evolution.",
    "</otsumi-progression>",
  ].join("\n")
}

export default {
  id: PLUGIN_ID,

  async setup(ctx) {
    const options = optionsOf(ctx)
    const store = new ProgressionStore(options.stateFile, options)
    await store.load()

    const executions = new Map()
    let iterator = null
    let stopped = false

    function executionFor(sessionID) {
      let state = executions.get(sessionID)
      if (!state) {
        state = {
          generation: 0,
          userText: "",
          inputKey: null,
          providerMessageID: null,
          agent: null,
          mode: null,
          meaningfulWork: false,
          ambientGadgetPhase: false,
          controlTurn: false,
          lastLifecycleEvent: null,
          lastLifecycleAt: null,
        }
        executions.set(sessionID, state)
      }
      return state
    }

    function clearRuntimeInput(runtime) {
      runtime.userText = ""
      runtime.inputKey = null
      runtime.providerMessageID = null
      runtime.meaningfulWork = false
      runtime.ambientGadgetPhase = false
      runtime.controlTurn = false
    }

    function reconcileInput(
      runtime,
      { text, key, agent = null, providerMessageID = null, authoritativeKey = false },
    ) {
      const normalizedText = typeof text === "string" ? text.trim() : ""
      if (!normalizedText || !key) {
        if (agent) runtime.agent = agent
        return false
      }

      const keyChanged = Boolean(runtime.inputKey && runtime.inputKey !== key)
      const providerChanged = Boolean(
        providerMessageID &&
        runtime.providerMessageID &&
        providerMessageID !== runtime.providerMessageID,
      )
      const sameText = runtime.userText === normalizedText
      const startsNewInput =
        !runtime.inputKey ||
        providerChanged ||
        (authoritativeKey && keyChanged) ||
        (keyChanged && !sameText)

      if (startsNewInput) {
        runtime.inputKey = key
        runtime.meaningfulWork = false
        runtime.ambientGadgetPhase = false
        runtime.controlTurn = false
      }

      // When the public inbox path already established an input key, retain it
      // across provider continuations even if the provider message uses a
      // different stable ID. This preserves the durable inbox-ledger identity.
      runtime.userText = normalizedText
      if (isOtsumiControlText(normalizedText)) runtime.controlTurn = true
      if (providerMessageID) runtime.providerMessageID = providerMessageID
      if (agent) runtime.agent = agent
      return startsNewInput
    }

    function reconcileContextInput(sessionID, runtime, identity, event) {
      const providerUser = latestProviderUser(event?.messages)
      const providerText = providerUser?.text?.trim() ?? ""
      const identityText =
        typeof identity?.inputText === "string" && identity.inputText.trim()
          ? identity.inputText.trim()
          : ""
      const identityConsistent =
        !providerUser || inputTextsConsistent(providerText, identityText)
      const text = providerUser
        ? (identityConsistent ? identityText || providerText : providerText)
        : identityText
      if (!text) return

      const identityID = identityConsistent ? identityInputID(identity) : null
      const stableID = providerUser?.id ?? identityID ?? null
      const key = stableID ? `id:${stableID}` : fallbackInputKey(sessionID, text)
      reconcileInput(runtime, {
        text,
        key,
        agent: identity?.agent ?? agentOf(event),
        providerMessageID: providerUser?.id ?? null,
        authoritativeKey: Boolean(identityID),
      })
    }

    async function modeForDiagnostics(sessionID) {
      const bridge = globalThis[MODE_BRIDGE]
      if (!bridge?.modeFor || !sessionID) return null
      try {
        const mode = await bridge.modeFor(sessionID)
        return typeof mode === "string" && mode ? mode : null
      } catch (error) {
        console.warn("[kakudou.otsumi-progression] diagnostic mode lookup unavailable:", error)
        return null
      }
    }

    async function sheetFor(sessionID, fallbackAgent = null) {
      await store.load()
      const runtime = sessionID ? executions.get(sessionID) ?? null : null
      const mode = runtime?.mode ?? (sessionID ? await modeForDiagnostics(sessionID) : null)
      return renderSheet(store.snapshot(), options, {
        sessionID,
        runtime,
        agent: runtime?.agent ?? fallbackAgent,
        mode,
        trackedSessions: executions.size,
      })
    }

    async function awardTerminal(sessionID, outcome) {
      const runtime = executions.get(sessionID)
      if (!runtime?.inputKey) return
      if (runtime.controlTurn) return
      const inputKey = runtime.inputKey
      const meaningfulWork = runtime.meaningfulWork

      const bridge = globalThis[MODE_BRIDGE]
      const agent = runtime.agent ?? bridge?.agentFor?.(sessionID) ?? null
      if (agent !== options.primaryAgent) return
      if (!(await modeAllowed(sessionID, options))) return
      if (!runtime.userText.trim()) return

      await store.mutate((state) => {
        const prior = state.awardComponents[inputKey] ?? {
          interaction: false,
          completion: false,
          effectiveWork: false,
          interrupted: false,
        }
        let delta = 0
        let interaction = false
        let completion = false
        let effectiveWork = false
        let interrupted = false

        if (!prior.interaction) {
          delta += options.interactionXP
          interaction = true
        }

        if (outcome === "succeeded") {
          if (!prior.completion) {
            delta += options.completionXP
            completion = true
          }
          if (meaningfulWork && !prior.effectiveWork) {
            delta += options.effectiveWorkXP
            effectiveWork = true
          }
        } else if (!prior.interrupted) {
          interrupted = true
        }

        state.awardComponents[inputKey] = {
          interaction: prior.interaction || interaction,
          completion: prior.completion || completion,
          effectiveWork: prior.effectiveWork || effectiveWork,
          interrupted: prior.interrupted || interrupted,
        }

        if (delta === 0 && !interrupted) return
        if (interaction) state.counters.interactions += 1
        if (completion) state.counters.successfulTurns += 1
        if (effectiveWork) state.counters.effectiveWorkTurns += 1
        if (interrupted) state.counters.interruptedTurns += 1
        state.xp += delta
        maybeUnlockEvolution(state, options)
      })
    }

    await ctx.command.transform((commands) => {
      commands.update("otsumi", (command) => {
        command.description =
          "Inspect Ōtsumi's read-only GameMaster/PNJ progression sheet: /otsumi [status]"
        command.template = '<otsumi-progression-command action="$ARGUMENTS" />'
      })
    })

    await ctx.tool.transform((tools) => {
      addDirectTool(tools, {
        name: "otsumi_progression_status",
        options: { codemode: false },
        description:
          "Read Ōtsumi's authoritative RPG progression sheet: level, XP, counters, pending evolution, and completed evolution history. Read-only.",
        input: {
          type: "object",
          properties: {},
          additionalProperties: false,
        },
        output: { type: "string" },
        execute: async (_args, toolCtx) => {
          const sessionID = requirePrimary(toolCtx, options)
          return toolResult(await sheetFor(sessionID, options.primaryAgent))
        },
      })

      addDirectTool(tools, {
        name: "otsumi_progression_propose",
        options: { codemode: false },
        description:
          "Record the one evolution Ōtsumi chose for the currently pending level. This records desire only; it grants no permission and performs no system modification.",
        input: {
          type: "object",
          required: ["title", "desire", "rationale", "changes", "requiredEffects", "risks", "successEvidence"],
          properties: {
            title: { type: "string", minLength: 1, maxLength: 120 },
            desire: { type: "string", minLength: 1, maxLength: 500 },
            rationale: { type: "string", minLength: 1, maxLength: 2000 },
            changes: { type: "string", minLength: 1, maxLength: 2000 },
            requiredEffects: { type: "string", minLength: 1, maxLength: 1600 },
            risks: { type: "string", minLength: 1, maxLength: 1600 },
            successEvidence: { type: "string", minLength: 1, maxLength: 1600 },
          },
          additionalProperties: false,
        },
        output: { type: "string" },
        execute: async (args, toolCtx) => {
          requirePrimary(toolCtx, options)

          const result = await store.mutate((state) => {
            const pending = state.pendingEvolution
            if (!pending) throw new Error("OTSProgression_NO_PENDING_EVOLUTION")
            if (pending.proposal) throw new Error("OTSProgression_PROPOSAL_ALREADY_EXISTS")

            pending.proposal = {
              title: args.title.trim(),
              desire: args.desire.trim(),
              rationale: args.rationale.trim(),
              changes: args.changes.trim(),
              requiredEffects: args.requiredEffects.trim(),
              risks: args.risks.trim(),
              successEvidence: args.successEvidence.trim(),
              proposedAt: new Date().toISOString(),
            }
            return pending.proposal
          })

          return toolResult(
            `Recorded Level ${store.snapshot().pendingEvolution.level} evolution proposal: ${result.title}. No implementation permission was granted.`,
          )
        },
      })

      addDirectTool(tools, {
        name: "otsumi_progression_reject",
        options: { codemode: false },
        description:
          "Record that the current evolution proposal was rejected or reconsidered. The level's evolution slot remains available so Ōtsumi may choose again.",
        input: {
          type: "object",
          required: ["reason"],
          properties: {
            reason: { type: "string", minLength: 1, maxLength: 1200 },
          },
          additionalProperties: false,
        },
        output: { type: "string" },
        execute: async (args, toolCtx) => {
          requirePrimary(toolCtx, options)

          const rejected = await store.mutate((state) => {
            const pending = state.pendingEvolution
            if (!pending?.proposal) throw new Error("OTSProgression_NO_PROPOSAL_TO_REJECT")

            const entry = {
              ...pending.proposal,
              rejectedAt: new Date().toISOString(),
              reason: args.reason.trim(),
            }
            pending.rejections = Array.isArray(pending.rejections) ? pending.rejections : []
            pending.rejections.push(entry)
            pending.proposal = null
            pending.announcementDelivered = true
            return entry
          })

          return toolResult(
            `Rejected/reconsidered '${rejected.title}'. The evolution slot remains available and may be used for a different choice.`,
          )
        },
      })

      addDirectTool(tools, {
        name: "otsumi_progression_complete",
        options: { codemode: false },
        description:
          "Record a pending evolution as completed only after Kakudou explicitly approved the real change and the approved implementation was actually verified. This tool records history; it does not implement or authorize anything.",
        input: {
          type: "object",
          required: ["result", "approvalEvidence", "verification"],
          properties: {
            result: { type: "string", minLength: 1, maxLength: 2000 },
            approvalEvidence: { type: "string", minLength: 1, maxLength: 1600 },
            verification: { type: "string", minLength: 1, maxLength: 2000 },
          },
          additionalProperties: false,
        },
        output: { type: "string" },
        execute: async (args, toolCtx) => {
          requirePrimary(toolCtx, options)

          const completion = await store.mutate((state) => {
            const pending = state.pendingEvolution
            if (!pending?.proposal) throw new Error("OTSProgression_NO_PROPOSAL_TO_COMPLETE")

            const evolution = {
              level: pending.level,
              ...pending.proposal,
              result: args.result.trim(),
              approvalEvidence: args.approvalEvidence.trim(),
              verification: args.verification.trim(),
              completedAt: new Date().toISOString(),
              rejectionsBeforeChoice: Array.isArray(pending.rejections)
                ? pending.rejections.length
                : 0,
            }

            state.evolutions.push(evolution)
            state.pendingEvolution = null
            const chainedLevel = maybeUnlockEvolution(state, options)

            return { evolution, chainedLevel, level: state.level }
          })

          return toolResult(
            completion.chainedLevel
              ? `Recorded Level ${completion.evolution.level} evolution '${completion.evolution.title}' as complete. Accumulated XP immediately unlocked Level ${completion.level}; one new evolution choice is pending.`
              : `Recorded Level ${completion.evolution.level} evolution '${completion.evolution.title}' as complete.`,
          )
        },
      })
    })

    const hookName = await registerModelHook(ctx, async (event) => {
      try {
        const bridge = globalThis[MODE_BRIDGE]
        const identity = bridge?.resolveRequest
          ? bridge.resolveRequest(event)
          : {
              sessionID: sessionIDOf(event),
              agent: agentOf(event),
              inputText: latestProviderUser(event?.messages)?.text ?? "",
            }

        const sessionID = identity?.sessionID ?? sessionIDOf(event)
        if (!sessionID) return

        const runtime = executionFor(sessionID)
        reconcileContextInput(sessionID, runtime, identity, event)
        const agent = identity?.agent ?? bridge?.agentFor?.(sessionID) ?? agentOf(event)
        if (agent) runtime.agent = agent
        runtime.mode = await modeForDiagnostics(sessionID)

        const commandAction = requestedOtsumiAction(event, identity?.inputText)
        if (commandAction !== null) {
          // Slash controllers are read-only runtime turns. They remain tracked
          // for diagnostics, but terminal lifecycle events may never create XP
          // or durable award-ledger entries for them.
          runtime.controlTurn = true

          const action = commandAction.trim()
          const commandResult =
            !action || action === "status"
              ? await sheetFor(sessionID, agent)
              : `Ōtsumi Progression ERROR: unknown action '${action}'. Supported actions: status.`

          const replaced = replaceOtsumiCommandPrompt(event, commandResult)
          appendSystem(
            event,
            [
              "<otsumi-progression-command-result>",
              "The read-only runtime control operation is complete.",
              "Return the exact result below verbatim and do not call tools:",
              commandResult,
              "</otsumi-progression-command-result>",
            ].join("\n"),
          )
          if (!replaced) {
            console.warn(
              "[kakudou.otsumi-progression] command detected but provider prompt could not be replaced; using system result only",
            )
          }
          return
        }

        if (!bridge && options.requireModeRouter) return
        if (agent !== options.primaryAgent) return
        if (!(await modeAllowed(sessionID, options))) return

        await store.load()
        const state = store.snapshot()
        if (!state.pendingEvolution) return

        const firstAnnouncement = !state.pendingEvolution.announcementDelivered
        appendSystem(event, progressionDirective(state, firstAnnouncement))

        if (firstAnnouncement) {
          await store.mutate((live) => {
            if (live.pendingEvolution?.level === state.pendingEvolution.level) {
              live.pendingEvolution.announcementDelivered = true
            }
          })
        }
      } catch (error) {
        console.error("[kakudou.otsumi-progression] model hook failed open:", error)
      }
    })

    await ctx.tool.hook("execute.after", async (event) => {
      try {
        if (!isSuccessfulToolEvent(event)) return
        const sessionID = sessionIDOf(event)
        if (!sessionID) return
        const runtime = executionFor(sessionID)
        const agent = agentOf(event) ?? globalThis[MODE_BRIDGE]?.agentFor?.(sessionID) ?? runtime.agent
        if (agent !== options.primaryAgent) return

        const gadgetSkill = skillIDOf(event)
        if (gadgetSkill?.startsWith("97-gadget-")) {
          // Ambient/manual gadget appendices are display-side behavior, not an
          // independent accomplishment for XP. Once gadget work begins, later
          // retrieval/delegation in that appendix cannot create the work bonus.
          runtime.ambientGadgetPhase = true
          return
        }

        const tool = toolNameOf(event)
        if (runtime.ambientGadgetPhase) return
        if (!isMeaningfulTool(tool)) return
        runtime.meaningfulWork = true
      } catch (error) {
        console.warn("[kakudou.otsumi-progression] tool observation ignored:", error)
      }
    })

    const eventTask = (async () => {
      try {
        const stream = ctx.event.subscribe()
        iterator = stream?.[Symbol.asyncIterator]?.() ?? stream
        if (!iterator?.next) throw new Error("OpenCode V2 event subscription is not async-iterable")

        while (!stopped) {
          const item = await iterator.next()
          if (item?.done) break

          try {
            const event = normalizeEvent(item?.value)
            if (!event || typeof event.type !== "string") continue

            const sessionID = sessionIDOf(event)
            if (!sessionID) continue
            const runtime = executionFor(sessionID)
            runtime.lastLifecycleEvent = event.type
            runtime.lastLifecycleAt = new Date().toISOString()

            if (event.type === "session.inbox.enqueued" || event.type === "session.inbox.delivered") {
              if (dataOf(event)?.item?.type !== "user") {
                if (event.type === "session.inbox.delivered") {
                  clearRuntimeInput(runtime)
                }
                continue
              }
              const text = inputTextOf(event)
              if (text) {
                const explicitID = inputIDOf(event)
                reconcileInput(runtime, {
                  text,
                  key: explicitID ? `id:${explicitID}` : fallbackInputKey(sessionID, text),
                  agent: inputAgentOf(event),
                  authoritativeKey: Boolean(explicitID),
                })
              }
              const agent = inputAgentOf(event)
              if (agent) runtime.agent = agent
              continue
            }

            if (event.type === "session.execution.started") {
              runtime.generation += 1
              runtime.meaningfulWork = false
              runtime.ambientGadgetPhase = false
              continue
            }

            if (event.type === "session.step.started") {
              const agent = agentOf(dataOf(event))
              if (agent) runtime.agent = agent
              continue
            }

            if (event.type === "session.execution.succeeded") {
              await awardTerminal(sessionID, "succeeded")
              continue
            }

            if (
              event.type === "session.execution.interrupted" ||
              event.type === "session.execution.failed" ||
              event.type === "session.error"
            ) {
              await awardTerminal(sessionID, "interrupted")
              continue
            }

            if (
              event.type === "session.deleted" ||
              event.type === "session.closed" ||
              event.type === "session.ended"
            ) {
              executions.delete(sessionID)
            }
          } catch (error) {
            console.warn("[kakudou.otsumi-progression] lifecycle event ignored:", error)
          }
        }
      } catch (error) {
        console.warn("[kakudou.otsumi-progression] lifecycle stream unavailable:", error)
      }
    })()

    console.info(
      `[kakudou.otsumi-progression] loaded (${hookName} hook, state=${options.stateFile})`,
    )

    return async () => {
      stopped = true
      try {
        await iterator?.return?.()
      } catch {
        // Best effort; plugin-scoped hooks are released by OpenCode.
      }
      try {
        await eventTask
      } catch {
        // Subscription errors were already logged above.
      }
      executions.clear()
    }
  },
}
