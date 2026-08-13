import { createHash } from "node:crypto"
import { agentOf, lastUserText, sessionIDOf } from "./runtime.js"

const SESSION_EVENT_TYPES = new Set([
  "session.input.admitted",
  "session.input.promoted",
])

const SESSION_END_TYPES = new Set([
  "session.deleted",
  "session.closed",
  "session.ended",
])

function asObject(value) {
  return value !== null && typeof value === "object" ? value : null
}

function normalizeEvent(raw) {
  if (raw?.payload?.type) return raw.payload
  if (raw?.event?.type) return raw.event
  return raw
}

function eventData(event) {
  return asObject(event?.data) ?? asObject(event?.properties) ?? event
}

function publicSessionID(value) {
  const data = eventData(value)
  const candidates = [
    data?.sessionID,
    data?.sessionId,
    data?.session_id,
    data?.session?.id,
    data?.session?.sessionID,
    data?.info?.sessionID,
    data?.message?.sessionID,
    value?.sessionID,
    value?.sessionId,
    value?.session_id,
    value?.session?.id,
  ]

  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate) return candidate
  }
  return null
}

function inputObject(event) {
  const data = eventData(event)
  return asObject(data?.input) ?? asObject(data?.message) ?? asObject(data?.info) ?? data
}

function inputAgent(event) {
  const data = eventData(event)
  const input = inputObject(event)
  const candidates = [
    input?.agent?.id,
    input?.agent,
    data?.agent?.id,
    data?.agent,
    data?.info?.agent,
  ]

  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim()) return candidate.trim()
  }
  return null
}

const METADATA_KEYS = new Set([
  "id",
  "inputID",
  "inputId",
  "sessionID",
  "sessionId",
  "session_id",
  "created",
  "updated",
  "agent",
  "model",
  "modelID",
  "providerID",
])

function textDeep(value, keyHint = "", depth = 0) {
  if (value == null || depth > 10) return ""
  if (typeof value === "string") {
    const text = value.trim()
    if (!text || METADATA_KEYS.has(keyHint)) return ""
    return text
  }
  if (Array.isArray(value)) {
    return value
      .map((item) => textDeep(item, keyHint, depth + 1))
      .filter(Boolean)
      .join("\n")
      .trim()
  }
  if (typeof value !== "object") return ""

  for (const key of ["text", "content", "value", "message", "parts", "prompt"]) {
    if (!(key in value)) continue
    const text = textDeep(value[key], key, depth + 1)
    if (text) return text
  }

  return Object.entries(value)
    .filter(([key]) => !METADATA_KEYS.has(key))
    .map(([key, child]) => textDeep(child, key, depth + 1))
    .filter(Boolean)
    .join("\n")
    .trim()
}

function inputText(event) {
  const data = eventData(event)
  return textDeep(data?.input ?? data?.message ?? data)
}

function digest(text) {
  return createHash("sha256").update(text.trim()).digest("hex").slice(0, 20)
}

/**
 * Correlates the public V2 lifecycle stream with model-request hooks.
 *
 * Current V2 docs guarantee that request hooks can mutate system/messages/tools,
 * but do not promise session/agent metadata on that hook event itself. The
 * public event stream does carry session-scoped input lifecycle records, so the
 * router uses those as a fallback. Ambiguous correlation fails closed.
 */
export class RequestIdentityTracker {
  constructor({ maxAgeMs = 10 * 60_000 } = {}) {
    this.maxAgeMs = maxAgeMs
    this.pending = new Map()
    this.agentBySession = new Map()
    this.iterator = null
    this.task = null
    this.stopped = false
  }

  prune(now = Date.now()) {
    for (const [sessionID, entry] of this.pending.entries()) {
      if (now - entry.at > this.maxAgeMs) this.pending.delete(sessionID)
    }
  }

  observe(raw) {
    const event = normalizeEvent(raw)
    if (!event || typeof event.type !== "string") return

    const sessionID = publicSessionID(event)
    if (!sessionID) return

    if (SESSION_END_TYPES.has(event.type)) {
      this.pending.delete(sessionID)
      this.agentBySession.delete(sessionID)
      return
    }

    const agent = inputAgent(event)
    if (agent) this.agentBySession.set(sessionID, agent)

    if (!SESSION_EVENT_TYPES.has(event.type)) return

    const text = inputText(event).trim()
    if (!text) return

    this.pending.set(sessionID, {
      sessionID,
      agent: agent ?? this.agentBySession.get(sessionID) ?? null,
      digest: digest(text),
      text,
      at: Date.now(),
    })
    this.prune()
  }

  resolve(event) {
    const directSession = sessionIDOf(event)
    const directAgent = agentOf(event)

    if (directSession) {
      const pending = this.pending.get(directSession) ?? null
      const agent =
        directAgent ??
        this.agentBySession.get(directSession) ??
        pending?.agent ??
        null
      if (agent) this.agentBySession.set(directSession, agent)
      return {
        sessionID: directSession,
        agent,
        inputText: pending?.text ?? lastUserText(event?.messages).trim() ?? "",
        inputAt: pending?.at ?? null,
        source: "request",
      }
    }

    const text = lastUserText(event?.messages).trim()
    if (!text) {
      return {
        sessionID: null,
        agent: directAgent,
        inputText: "",
        inputAt: null,
        source: "unresolved",
      }
    }

    this.prune()
    const wanted = digest(text)
    const matches = [...this.pending.values()].filter((entry) => entry.digest === wanted && entry.text === text)

    if (matches.length === 0) {
      // V2 slash skill selection may replace the raw `/skill-id ...` user
      // input with the expanded skill body before the model-request hook. In
      // that case text equality is impossible. Correlate only when there is
      // exactly one fresh admitted slash input across all tracked sessions;
      // concurrent/ambiguous candidates remain unresolved and fail closed.
      const now = Date.now()
      const slashMatches = [...this.pending.values()].filter(
        (entry) =>
          now - entry.at <= 5_000 &&
          /^\/[a-z0-9]+(?:-[a-z0-9]+)*(?=\s|$)/.test(entry.text.trim()),
      )

      if (slashMatches.length === 1) {
        const match = slashMatches[0]
        const agent =
          directAgent ??
          match.agent ??
          this.agentBySession.get(match.sessionID) ??
          null
        if (agent) this.agentBySession.set(match.sessionID, agent)
        return {
          sessionID: match.sessionID,
          agent,
          inputText: match.text,
          inputAt: match.at,
          source: "event-slash-correlation",
        }
      }
    }

    if (matches.length !== 1) {
      return {
        sessionID: null,
        agent: directAgent,
        inputText: text,
        inputAt: null,
        source: matches.length > 1 ? "ambiguous-event-correlation" : "unresolved",
      }
    }

    const match = matches[0]
    const agent = directAgent ?? match.agent ?? this.agentBySession.get(match.sessionID) ?? null
    if (agent) this.agentBySession.set(match.sessionID, agent)
    return {
      sessionID: match.sessionID,
      agent,
      inputText: match.text,
      inputAt: match.at,
      source: "event-correlation",
    }
  }

  agentFor(sessionID) {
    return this.agentBySession.get(sessionID) ?? this.pending.get(sessionID)?.agent ?? null
  }

  start(ctx) {
    if (!ctx?.event?.subscribe || this.task) return
    this.stopped = false

    this.task = (async () => {
      try {
        const stream = ctx.event.subscribe()
        this.iterator = stream?.[Symbol.asyncIterator]?.() ?? stream
        if (!this.iterator?.next) return

        if (this.stopped) {
          await this.iterator.return?.()
          return
        }

        while (!this.stopped) {
          const item = await this.iterator.next()
          if (item?.done) break
          try {
            this.observe(item?.value)
          } catch (error) {
            console.warn("[kakudou.mode-router] identity event ignored:", error)
          }
        }
      } catch (error) {
        console.warn("[kakudou.mode-router] identity event stream unavailable:", error)
      }
    })()
  }

  async stop() {
    this.stopped = true
    try {
      await this.iterator?.return?.()
    } catch {
      // Cleanup is best-effort; OpenCode also scopes plugin registrations.
    }

    try {
      await this.task
    } catch {
      // start() already records subscription errors; cleanup should complete.
    }

    this.iterator = null
    this.task = null
    this.pending.clear()
    this.agentBySession.clear()
  }
}
