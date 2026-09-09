import assert from "node:assert/strict"
import { mkdtemp, readFile, rm, stat, utimes, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import test from "node:test"

import plugin from "../index.js"

const bridgeKey = Symbol.for("kakudou.mode-router.v2.bridge")
const PLUGIN_ID = "kakudou.otsumi-progression"
const sleep = (ms = 80) => new Promise((resolve) => setTimeout(resolve, ms))

const TRUSTED_BOOTSTRAP_METADATA = Object.freeze({
  kind: "setup_template_step",
  templateSchemaVersion: 2,
  step: "mode",
  fingerprint: "a".repeat(64),
})

class AsyncQueue {
  constructor() {
    this.values = []
    this.waiters = []
    this.closed = false
  }

  push(value) {
    if (this.closed) return
    const waiter = this.waiters.shift()
    if (waiter) waiter({ value, done: false })
    else this.values.push(value)
  }

  next() {
    if (this.values.length) return Promise.resolve({ value: this.values.shift(), done: false })
    if (this.closed) return Promise.resolve({ done: true })
    return new Promise((resolve) => this.waiters.push(resolve))
  }

  return() {
    this.closed = true
    for (const waiter of this.waiters.splice(0)) waiter({ done: true })
    return Promise.resolve({ done: true })
  }

  [Symbol.asyncIterator]() {
    return this
  }
}

function stateFixture({ pending = true } = {}) {
  return {
    version: 2,
    identity: "otsumi",
    level: pending ? 2 : 1,
    xp: 0,
    counters: {
      interactions: 0,
      successfulTurns: 0,
      effectiveWorkTurns: 0,
      interruptedTurns: 0,
    },
    awardComponents: {},
    pendingEvolution: pending
      ? {
          level: 2,
          unlockedAt: "2026-09-01T00:00:00.000Z",
          announcementDelivered: false,
          announcedAt: null,
          announcementInFlight: null,
          proposal: null,
          rejections: [],
        }
      : null,
    evolutions: [],
    updatedAt: "2026-09-01T00:00:00.000Z",
  }
}

function textOfMessage(message) {
  if (typeof message?.content === "string") return message.content
  const parts = message?.parts ?? (Array.isArray(message?.content) ? message.content : [])
  return parts
    .filter((part) => part?.type === "text" && typeof part.text === "string")
    .map((part) => part.text)
    .join("\n")
}

function messageRole(message) {
  return message?.role ?? message?.info?.role ?? null
}

function messageID(message) {
  return message?.id ?? message?.info?.id ?? null
}

function providerUserMessage(id, text, part = {}) {
  return {
    info: { id, role: "user", agent: "osho" },
    parts: [{ id: `part-${id}`, type: "text", text, ...part }],
  }
}

function contextEvent(sessionID, messages) {
  return {
    sessionID,
    agent: "osho",
    messages,
    system: [{ text: "base" }],
    tools: {},
  }
}

function inboxItem(text, { type = "user", metadata } = {}) {
  return {
    type,
    payload: { text, agent: "osho" },
    ...(metadata === undefined ? {} : { metadata }),
  }
}

async function createRuntime(t, {
  initial = stateFixture(),
  policyFor = () => ({ mode: "dev", managed: true, enabled: true, reason: "allow" }),
} = {}) {
  const root = await mkdtemp(join(tmpdir(), "otsumi-progression-synthetic-"))
  const stateFile = join(root, "state.json")
  await writeFile(stateFile, JSON.stringify(initial, null, 2) + "\n")

  const stream = new AsyncQueue()
  const hooks = new Map()
  const tools = new Map()
  const sessionLookups = []

  globalThis[bridgeKey] = {
    async pluginDecisionFor(sessionID, pluginID) {
      assert.equal(pluginID, PLUGIN_ID)
      return policyFor(sessionID)
    },
    resolveRequest(event) {
      const latest = [...(event.messages ?? [])].reverse().find((message) => messageRole(message) === "user")
      return {
        sessionID: event.sessionID ?? null,
        agent: event.agent ?? latest?.info?.agent ?? null,
        inputText: textOfMessage(latest),
        messageID: messageID(latest),
      }
    },
    agentFor() {
      return "osho"
    },
  }

  const cleanup = await plugin.setup({
    options: {
      stateFile,
      xp: {
        interaction: 1,
        completion: 1,
        effectiveWork: 3,
        firstLevel: 1_000,
        growth: 1,
      },
    },
    event: {
      subscribe() {
        return stream
      },
    },
    command: {
      async transform() {},
    },
    session: {
      async hook(name, callback) {
        hooks.set(`session:${name}`, callback)
      },
      async get({ sessionID }) {
        sessionLookups.push(sessionID)
        return { data: {} }
      },
    },
    tool: {
      async transform(callback) {
        await callback({
          add(definition) {
            tools.set(definition.name, definition)
          },
        })
      },
      async hook(name, callback) {
        hooks.set(name, callback)
      },
    },
  })

  t.after(async () => {
    await cleanup()
    delete globalThis[bridgeKey]
    await rm(root, { recursive: true, force: true })
  })

  return {
    stateFile,
    sessionLookups,
    emit(event) {
      stream.push(event)
    },
    async context(event) {
      await hooks.get("session:context")(event)
    },
    async meaningfulWork(sessionID) {
      await hooks.get("execute.after")({
        tool: "subagent",
        sessionID,
        agent: "osho",
        result: { ok: true },
      })
    },
    async trackedSessions() {
      const status = await tools.get("otsumi_progression_status").execute(
        {},
        { sessionID: "session-diagnostics", agent: "osho" },
      )
      return Number(/Tracked runtime sessions: (\d+)/.exec(status.output)?.[1])
    },
  }
}

async function stateText(runtime) {
  return readFile(runtime.stateFile, "utf8")
}

async function stateJSON(runtime) {
  return JSON.parse(await stateText(runtime))
}

async function armStoreIOProbe(runtime) {
  const old = new Date("2001-01-01T00:00:00.000Z")
  await utimes(runtime.stateFile, old, old)
  const armed = await stat(runtime.stateFile)
  return { atimeMs: armed.atimeMs, mtimeMs: armed.mtimeMs }
}

async function assertNoStoreIO(runtime, armed) {
  const observed = await stat(runtime.stateFile)
  assert.deepEqual(
    { atimeMs: observed.atimeMs, mtimeMs: observed.mtimeMs },
    armed,
    "deny-only traffic must reach neither progression-store reads nor writes",
  )
}

function emitInbox(runtime, type, { sessionID, inboxID, item }) {
  runtime.emit({ type, data: { sessionID, inboxID, item } })
}

async function finishSucceeded(runtime, sessionID) {
  await runtime.meaningfulWork(sessionID)
  runtime.emit({ type: "session.execution.succeeded", data: { sessionID } })
  await sleep()
}

test("trusted setup-template bootstrap metadata is deny-only across every progression surface", { concurrency: false }, async (t) => {
  const runtime = await createRuntime(t)
  const sessionID = "session-bootstrap"
  const inboxID = "inbox-bootstrap"
  const text = "internal setup bootstrap"
  const item = inboxItem(text, { metadata: TRUSTED_BOOTSTRAP_METADATA })
  const before = await stateText(runtime)
  const storeIO = await armStoreIOProbe(runtime)

  emitInbox(runtime, "session.inbox.enqueued", { sessionID, inboxID, item })
  runtime.emit({ type: "session.execution.started", data: { sessionID } })
  emitInbox(runtime, "session.inbox.delivered", { sessionID, inboxID, item })
  runtime.emit({ type: "session.step.started", data: { sessionID, agent: "osho" } })
  await sleep(20)

  const request = contextEvent(sessionID, [providerUserMessage("message-bootstrap", text)])
  await runtime.context(request)
  assert.equal(request.system[0].text, "base", "bootstrap context must not receive an evolution directive")
  assert.deepEqual(runtime.sessionLookups, [], "bootstrap context must stop before announcement/store inspection")

  const command = contextEvent(sessionID, [
    providerUserMessage("message-bootstrap-command", '<otsumi-progression-command action="status" />'),
  ])
  await runtime.context(command)
  assert.equal(command.system[0].text, "base", "bootstrap text must not execute the progression command")
  assert.match(textOfMessage(command.messages[0]), /otsumi-progression-command action="status"/)

  await finishSucceeded(runtime, sessionID)

  await assertNoStoreIO(runtime, storeIO)
  assert.equal(await stateText(runtime), before, "bootstrap observations and terminal events must not read-write progression state")
  assert.equal(await runtime.trackedSessions(), 0, "bootstrap traffic must not allocate progression runtime state")
})

test("bootstrap denial is carried from inbox admission through a marker-free terminal event", { concurrency: false }, async (t) => {
  const runtime = await createRuntime(t, { initial: stateFixture({ pending: false }) })
  const sessionID = "session-bootstrap-carry"
  const inboxID = "inbox-bootstrap-carry"
  const item = inboxItem("carry the deny-only marker", { metadata: TRUSTED_BOOTSTRAP_METADATA })
  const before = await stateText(runtime)

  emitInbox(runtime, "session.inbox.enqueued", { sessionID, inboxID, item })
  runtime.emit({ type: "session.execution.started", data: { sessionID } })
  emitInbox(runtime, "session.inbox.delivered", { sessionID, inboxID, item })
  runtime.emit({ type: "session.step.started", data: { sessionID, agent: "osho" } })
  await sleep(20)
  await runtime.meaningfulWork(sessionID)

  // The terminal event intentionally has no metadata. Its denial must come
  // from the admitted inbox marker rather than from the terminal payload.
  runtime.emit({ type: "session.execution.succeeded", data: { sessionID } })
  await sleep()

  assert.equal(await stateText(runtime), before)
  assert.equal(await runtime.trackedSessions(), 0)
})

test("malformed setup-template markers do not suppress dev progression or enable an off-mode turn", { concurrency: false }, async (t) => {
  const malformedMarkers = [
    { ...TRUSTED_BOOTSTRAP_METADATA, templateSchemaVersion: 1 },
    { ...TRUSTED_BOOTSTRAP_METADATA, step: "not-an-allowed-step" },
    { ...TRUSTED_BOOTSTRAP_METADATA, fingerprint: "not-64-hex" },
    { ...TRUSTED_BOOTSTRAP_METADATA, fingerprint: "A".repeat(64) },
  ]

  for (const [index, metadata] of malformedMarkers.entries()) {
    await t.test(`malformed marker ${index + 1} remains ordinary input in dev`, async (t) => {
      const runtime = await createRuntime(t, { initial: stateFixture({ pending: false }) })
      const sessionID = `session-malformed-${index}`
      const inboxID = `inbox-malformed-${index}`
      const item = inboxItem("malformed internal setup step", { metadata })
      const before = await stateText(runtime)

      emitInbox(runtime, "session.inbox.enqueued", { sessionID, inboxID, item })
      runtime.emit({ type: "session.execution.started", data: { sessionID } })
      emitInbox(runtime, "session.inbox.delivered", { sessionID, inboxID, item })
      runtime.emit({ type: "session.step.started", data: { sessionID, agent: "osho" } })
      await sleep(20)
      await finishSucceeded(runtime, sessionID)

      const state = await stateJSON(runtime)
      assert.equal(state.xp, 5)
      assert.deepEqual(state.counters, {
        interactions: 1,
        successfulTurns: 1,
        effectiveWorkTurns: 1,
        interruptedTurns: 0,
      })
      assert.notEqual(await stateText(runtime), before)
      assert.equal(await runtime.trackedSessions(), 1)
    })
  }

  await t.test("malformed marker cannot enable progression outside dev", async (t) => {
    const runtime = await createRuntime(t, {
      initial: stateFixture({ pending: false }),
      policyFor: () => ({ mode: "chatbot", managed: true, enabled: false, reason: "not-enabled-in-mode" }),
    })
    const sessionID = "session-malformed-off-mode"
    const item = inboxItem("malformed off-mode setup step", {
      metadata: { ...TRUSTED_BOOTSTRAP_METADATA, fingerprint: "A".repeat(64) },
    })
    const before = await stateText(runtime)

    emitInbox(runtime, "session.inbox.enqueued", { sessionID, inboxID: "inbox-malformed-off-mode", item })
    runtime.emit({ type: "session.execution.started", data: { sessionID } })
    emitInbox(runtime, "session.inbox.delivered", { sessionID, inboxID: "inbox-malformed-off-mode", item })
    await finishSucceeded(runtime, sessionID)

    assert.equal(await stateText(runtime), before)
  })
})

test("OpenCode synthetic compaction, summary, inbox, and text shapes create zero progression", { concurrency: false }, async (t) => {
  const cases = [
    {
      name: "compaction part",
      run: async (runtime, sessionID) => {
        runtime.emit({ type: "session.execution.started", data: { sessionID } })
        await sleep(20)
        const request = contextEvent(sessionID, [{
          info: { id: "message-compaction", role: "user", agent: "osho" },
          parts: [{ id: "part-compaction", type: "compaction", auto: true }],
        }])
        await runtime.context(request)
        assert.equal(request.system[0].text, "base")
        await finishSucceeded(runtime, sessionID)
      },
    },
    {
      name: "assistant summary continuation",
      run: async (runtime, sessionID) => {
        runtime.emit({ type: "session.execution.started", data: { sessionID } })
        await sleep(20)
        const request = contextEvent(sessionID, [
          providerUserMessage("message-before-summary", "historical user work"),
          {
            info: { id: "message-summary", role: "assistant", summary: true, agent: "compaction" },
            parts: [{ id: "part-summary", type: "text", text: "## Objective\nSynthetic checkpoint" }],
          },
        ])
        await runtime.context(request)
        assert.equal(request.system[0].text, "base")
        await finishSucceeded(runtime, sessionID)
      },
    },
    {
      name: "non-user inbox item",
      run: async (runtime, sessionID) => {
        const item = inboxItem("internal continuation", { type: "system" })
        emitInbox(runtime, "session.inbox.enqueued", { sessionID, inboxID: "inbox-non-user", item })
        runtime.emit({ type: "session.execution.started", data: { sessionID } })
        emitInbox(runtime, "session.inbox.delivered", { sessionID, inboxID: "inbox-non-user", item })
        await finishSucceeded(runtime, sessionID)
      },
    },
    {
      name: "synthetic text part",
      run: async (runtime, sessionID) => {
        runtime.emit({ type: "session.execution.started", data: { sessionID } })
        await sleep(20)
        const request = contextEvent(sessionID, [
          providerUserMessage(
            "message-synthetic-text",
            "Continue if you have next steps, or stop and ask for clarification if you are unsure how to proceed.",
            { synthetic: true, metadata: { compaction_continue: true } },
          ),
        ])
        await runtime.context(request)
        assert.equal(request.system[0].text, "base")
        await finishSucceeded(runtime, sessionID)
      },
    },
  ]

  for (const item of cases) {
    await t.test(item.name, async (t) => {
      const runtime = await createRuntime(t)
      const before = await stateText(runtime)
      await item.run(runtime, `session-synthetic-${item.name.replaceAll(" ", "-")}`)

      assert.equal(await stateText(runtime), before, `${item.name} must not award XP or mutate announcements`)
      assert.equal(await runtime.trackedSessions(), 0, `${item.name} must not allocate progression runtime state`)
    })
  }
})

test("a genuine OpenCode user input still awards exactly once in dev", { concurrency: false }, async (t) => {
  const runtime = await createRuntime(t, { initial: stateFixture({ pending: false }) })
  const sessionID = "session-genuine-user"
  const request = contextEvent(sessionID, [
    providerUserMessage("message-genuine-user", "perform genuine user work"),
  ])

  runtime.emit({ type: "session.execution.started", data: { sessionID } })
  await sleep(20)
  await runtime.context(request)
  await runtime.context({ ...request, system: [{ text: "base" }] })
  await finishSucceeded(runtime, sessionID)
  runtime.emit({ type: "session.execution.succeeded", data: { sessionID } })
  await sleep()

  const state = await stateJSON(runtime)
  assert.equal(state.xp, 5)
  assert.deepEqual(state.counters, {
    interactions: 1,
    successfulTurns: 1,
    effectiveWorkTurns: 1,
    interruptedTurns: 0,
  })
  assert.deepEqual(state.awardComponents["id:message-genuine-user"], {
    interaction: true,
    completion: true,
    effectiveWork: true,
    interrupted: false,
  })
  assert.equal(Object.keys(state.awardComponents).length, 1)
})
