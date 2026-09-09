import assert from "node:assert/strict"
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import test from "node:test"

import plugin from "../index.js"

const bridgeKey = Symbol.for("kakudou.mode-router.v2.bridge")
const PLUGIN_ID = "kakudou.otsumi-progression"
const DENIED = /OTSProgression_DISABLED_BY_MODE_POLICY/
const sleep = (ms = 80) => new Promise((resolve) => setTimeout(resolve, ms))

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

function stateFixture({ inFlightSessionID = null, proposal = null } = {}) {
  return {
    version: 2,
    identity: "otsumi",
    level: 2,
    xp: 42,
    counters: {
      interactions: 9,
      successfulTurns: 7,
      effectiveWorkTurns: 4,
      interruptedTurns: 2,
    },
    awardComponents: {
      "id:seed": {
        interaction: true,
        completion: true,
        effectiveWork: false,
        interrupted: false,
      },
    },
    pendingEvolution: {
      level: 2,
      unlockedAt: "2026-08-01T00:00:00.000Z",
      announcementDelivered: false,
      announcementInFlight: inFlightSessionID
        ? { sessionID: inFlightSessionID, at: "2026-08-02T00:00:00.000Z" }
        : null,
      proposal,
      rejections: [],
    },
    evolutions: [],
    updatedAt: "2026-08-02T00:00:00.000Z",
  }
}

const PROPOSAL_ARGS = {
  title: "Mode-aware progression",
  desire: "I want progression to respect the authoritative runtime mode.",
  rationale: "Progression effects must not leak into roleplay modes.",
  changes: "Guard progression surfaces with mode-router policy.",
  requiredEffects: "Local plugin behavior only.",
  risks: "A stale tool snapshot might otherwise bypass policy.",
  successEvidence: "Tests prove every effect surface fails closed.",
}

const COMPLETION_ARGS = {
  result: "Implemented the approved mode policy.",
  approvalEvidence: "The behavior contract explicitly approved this implementation.",
  verification: "The package tests pass against temporary state fixtures.",
}

function requestEvent(sessionID, text = "ordinary work") {
  return {
    sessionID,
    agent: "osho",
    system: [{ text: "base" }],
    messages: [{ id: `message-${sessionID}`, role: "user", content: text }],
    tools: {},
  }
}

async function createRuntime(t, {
  initial = stateFixture(),
  policyFor = () => ({ mode: "dev", managed: true, enabled: true, reason: "allow" }),
  bridge = true,
  sessionInfo = new Map(),
} = {}) {
  const root = await mkdtemp(join(tmpdir(), "otsumi-progression-mode-policy-"))
  const stateFile = join(root, "state.json")
  await writeFile(stateFile, JSON.stringify(initial, null, 2) + "\n")

  const stream = new AsyncQueue()
  const hooks = new Map()
  const tools = new Map()
  const policyCalls = []
  const sessionLookups = []

  if (bridge) {
    globalThis[bridgeKey] = {
      async pluginDecisionFor(sessionID, pluginID) {
        policyCalls.push({ sessionID, pluginID })
        return policyFor(sessionID, pluginID)
      },
      resolveRequest(event) {
        const latestUser = [...(event.messages ?? [])].reverse().find((message) => message.role === "user")
        return {
          sessionID: event.sessionID ?? null,
          agent: event.agent ?? null,
          inputText: typeof latestUser?.content === "string" ? latestUser.content : "",
        }
      },
      agentFor() {
        return "osho"
      },
    }
  } else {
    delete globalThis[bridgeKey]
  }

  const cleanup = await plugin.setup({
    options: { stateFile },
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
        return { data: sessionInfo.get(sessionID) ?? {} }
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
    tools,
    policyCalls,
    sessionLookups,
    emit(event) {
      stream.push(event)
    },
    async context(event) {
      await hooks.get("session:context")(event)
    },
    async toolAfter(event) {
      await hooks.get("execute.after")(event)
    },
  }
}

async function fileText(path) {
  return readFile(path, "utf8")
}

test("authoritative plugin policy permits dev and dev-python context injection", { concurrency: false }, async (t) => {
  for (const mode of ["dev", "dev-python"]) {
    await t.test(mode, async (t) => {
      const runtime = await createRuntime(t, {
        policyFor: () => ({ mode, managed: true, enabled: true, reason: "allow" }),
      })
      const request = requestEvent(`session-${mode}`)

      await runtime.context(request)

      assert.match(request.system[0].text, /<otsumi-progression/)
      assert.deepEqual(runtime.policyCalls, [
        { sessionID: `session-${mode}`, pluginID: PLUGIN_ID },
      ])
    })
  }
})

test("chatbot and gamemaster context inject no evolution directive and allocate no runtime state", { concurrency: false }, async (t) => {
  const modes = new Map([
    ["session-chatbot", "chatbot"],
    ["session-gamemaster", "gamemaster"],
    ["session-status", "dev"],
  ])
  const runtime = await createRuntime(t, {
    policyFor(sessionID) {
      const mode = modes.get(sessionID) ?? null
      return {
        mode,
        managed: true,
        enabled: mode === "dev" || mode === "dev-python",
        reason: mode === "dev" || mode === "dev-python" ? "allow" : "not-enabled-in-mode",
      }
    },
  })
  const before = await fileText(runtime.stateFile)

  for (const mode of ["chatbot", "gamemaster"]) {
    const request = requestEvent(`session-${mode}`)
    await runtime.context(request)
    assert.equal(request.system[0].text, "base")
  }

  assert.equal(await fileText(runtime.stateFile), before)
  const status = await runtime.tools.get("otsumi_progression_status").execute(
    {},
    { sessionID: "session-status", agent: "osho" },
  )
  assert.match(status.output, /Tracked runtime sessions: 0/)
})

test("/otsumi is denied off-mode before reading or mutating progression state", { concurrency: false }, async (t) => {
  const modes = new Map([
    ["session-command", "chatbot"],
    ["session-status", "dev"],
  ])
  const runtime = await createRuntime(t, {
    policyFor(sessionID) {
      const mode = modes.get(sessionID) ?? null
      return { mode, managed: true, enabled: mode === "dev", reason: "test-policy" }
    },
  })
  const before = await fileText(runtime.stateFile)
  const request = requestEvent(
    "session-command",
    '<otsumi-progression-command action="status" />',
  )

  await runtime.context(request)

  assert.match(request.messages[0].content, DENIED)
  assert.doesNotMatch(request.messages[0].content, /GameMaster \/ PNJ Character Sheet/)
  assert.equal(await fileText(runtime.stateFile), before)
  assert.deepEqual(runtime.sessionLookups, [], "policy denial must happen before announcement/session inspection")

  const status = await runtime.tools.get("otsumi_progression_status").execute(
    {},
    { sessionID: "session-status", agent: "osho" },
  )
  assert.match(status.output, /Tracked runtime sessions: 0/)
})

test("all progression tool snapshots re-check policy and deny before store effects", { concurrency: false }, async (t) => {
  const modes = new Map([["session-tool", "dev"]])
  const runtime = await createRuntime(t, {
    initial: stateFixture({
      proposal: { ...PROPOSAL_ARGS, proposedAt: "2026-08-02T01:00:00.000Z" },
    }),
    policyFor(sessionID) {
      const mode = modes.get(sessionID) ?? null
      return { mode, managed: true, enabled: mode === "dev", reason: "test-policy" }
    },
  })
  const snapshots = new Map(runtime.tools)
  modes.set("session-tool", "chatbot")
  const before = await fileText(runtime.stateFile)
  const toolCtx = { sessionID: "session-tool", agent: "osho" }
  const attempts = [
    ["otsumi_progression_status", {}],
    ["otsumi_progression_propose", PROPOSAL_ARGS],
    ["otsumi_progression_reject", { reason: "Not now." }],
    ["otsumi_progression_complete", COMPLETION_ARGS],
  ]

  for (const [name, args] of attempts) {
    await assert.rejects(() => snapshots.get(name).execute(args, toolCtx), DENIED, name)
    assert.equal(await fileText(runtime.stateFile), before, `${name} must not mutate state`)
  }

  assert.equal(runtime.policyCalls.length, 4)
  assert.ok(runtime.policyCalls.every((call) => call.sessionID === "session-tool" && call.pluginID === PLUGIN_ID))
})

test("missing, unresolved, and throwing plugin policy fail closed", { concurrency: false }, async (t) => {
  const cases = [
    { name: "missing bridge", bridge: false },
    { name: "missing gate", bridge: true, policyFor: undefined, removeGate: true },
    { name: "unresolved decision", bridge: true, policyFor: () => null },
    { name: "throwing gate", bridge: true, policyFor: () => { throw new Error("policy unavailable") } },
  ]

  for (const item of cases) {
    await t.test(item.name, async (t) => {
      const runtime = await createRuntime(t, {
        bridge: item.bridge,
        policyFor: item.policyFor,
      })
      if (item.removeGate) delete globalThis[bridgeKey].pluginDecisionFor
      const before = await fileText(runtime.stateFile)

      await assert.rejects(
        () => runtime.tools.get("otsumi_progression_status").execute(
          {},
          { sessionID: `session-${item.name}`, agent: "osho" },
        ),
        DENIED,
      )
      assert.equal(await fileText(runtime.stateFile), before)
    })
  }
})

test("a stale successful tool observation in an off mode creates no meaningful-work runtime state", { concurrency: false }, async (t) => {
  const modes = new Map([
    ["session-stale-tool", "gamemaster"],
    ["session-status", "dev"],
  ])
  const runtime = await createRuntime(t, {
    policyFor(sessionID) {
      const mode = modes.get(sessionID) ?? null
      return { mode, managed: true, enabled: mode === "dev", reason: "test-policy" }
    },
  })
  const before = await fileText(runtime.stateFile)

  await runtime.toolAfter({
    tool: "subagent",
    sessionID: "session-stale-tool",
    agent: "osho",
    result: { ok: true },
  })

  assert.equal(await fileText(runtime.stateFile), before)
  const status = await runtime.tools.get("otsumi_progression_status").execute(
    {},
    { sessionID: "session-status", agent: "osho" },
  )
  assert.match(status.output, /Tracked runtime sessions: 0/)
})

test("off-mode lifecycle events award nothing, do not change announcements, and allocate no runtime state", { concurrency: false }, async (t) => {
  for (const terminal of [
    "session.execution.succeeded",
    "session.execution.interrupted",
    "session.execution.failed",
    "session.error",
  ]) {
    await t.test(terminal, async (t) => {
      const sessionID = `session-${terminal.split(".").at(-1)}`
      const modes = new Map([
        [sessionID, "chatbot"],
        ["session-status", "dev"],
      ])
      const runtime = await createRuntime(t, {
        initial: stateFixture({ inFlightSessionID: sessionID }),
        policyFor(id) {
          const mode = modes.get(id) ?? null
          return { mode, managed: true, enabled: mode === "dev", reason: "test-policy" }
        },
      })
      const before = await fileText(runtime.stateFile)
      const item = { type: "user", payload: { text: "off-mode work", agent: "osho" } }

      runtime.emit({
        type: "session.inbox.enqueued",
        data: { sessionID, inboxID: "inbox-off-mode", item },
      })
      runtime.emit({ type: "session.execution.started", data: { sessionID } })
      runtime.emit({
        type: "session.inbox.delivered",
        data: { sessionID, inboxID: "inbox-off-mode", item },
      })
      runtime.emit({ type: "session.step.started", data: { sessionID, agent: "osho" } })
      runtime.emit({ type: terminal, data: { sessionID } })
      await sleep()

      assert.equal(await fileText(runtime.stateFile), before)
      const status = await runtime.tools.get("otsumi_progression_status").execute(
        {},
        { sessionID: "session-status", agent: "osho" },
      )
      assert.match(status.output, /Tracked runtime sessions: 0/)
    })
  }
})

test("policy denial has no latest-session fallback across users", { concurrency: false }, async (t) => {
  const runtime = await createRuntime(t)
  await runtime.context(requestEvent("session-known"))
  const before = await fileText(runtime.stateFile)

  await assert.rejects(
    () => runtime.tools.get("otsumi_progression_status").execute({}, { agent: "osho" }),
    DENIED,
  )
  assert.equal(await fileText(runtime.stateFile), before)
  assert.ok(!runtime.policyCalls.some((call) => call.sessionID === null))
})

test("announcement child gate skips delegated children but not user-facing forks; policy denial still controls forks", { concurrency: false }, async (t) => {
  const modes = new Map([
    ["session-child", "dev"],
    ["session-fork", "dev"],
    ["session-doppel", "chatbot"],
  ])
  const sessionInfo = new Map([
    ["session-child", { parentID: "ses_parent" }],
    ["session-fork", { fork: { sessionID: "ses_origin", boundary: { type: "all" } } }],
    ["session-doppel", { fork: { sessionID: "ses_origin", boundary: { type: "all" } } }],
  ])
  const runtime = await createRuntime(t, {
    sessionInfo,
    policyFor(sessionID) {
      const mode = modes.get(sessionID) ?? null
      return { mode, managed: true, enabled: mode === "dev", reason: "test-policy" }
    },
  })

  const child = requestEvent("session-child")
  await runtime.context(child)
  assert.equal(child.system[0].text, "base")

  const fork = requestEvent("session-fork")
  await runtime.context(fork)
  assert.match(fork.system[0].text, /<otsumi-progression/)

  const doppel = requestEvent("session-doppel")
  await runtime.context(doppel)
  assert.equal(doppel.system[0].text, "base")
  assert.deepEqual(runtime.sessionLookups, ["session-child", "session-fork"])
})
