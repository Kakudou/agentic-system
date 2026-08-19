import assert from "node:assert/strict"
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import test from "node:test"

import plugin from "../index.js"

const bridgeKey = Symbol.for("kakudou.mode-router.v2.bridge")
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

function inboxEvent(type, { sessionID, inboxID, item }) {
  return {
    type,
    data: {
      sessionID,
      inboxID,
      item,
    },
  }
}

function userInbox(text) {
  return {
    type: "user",
    payload: {
      text,
      agent: "osho",
    },
  }
}

function nonUserInbox(text) {
  return {
    type: "system",
    payload: {
      text,
      agent: "osho",
    },
  }
}

async function createRuntime(stateFile) {
  const stream = new AsyncQueue()
  const hooks = new Map()

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
    },
    tool: {
      async transform() {},
      async hook(name, callback) {
        hooks.set(name, callback)
      },
    },
  })

  return {
    cleanup,
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
  }
}

async function persistedAwardTotals(stateFile) {
  const state = JSON.parse(await readFile(stateFile, "utf8"))
  return {
    xp: state.xp,
    counters: state.counters,
  }
}

function installModeBridge() {
  globalThis[bridgeKey] = {
    async modeFor() {
      return "dev"
    },
    agentFor() {
      return "osho"
    },
  }
}

test("deduplicates inbox award components after cleanup and re-setup", { concurrency: false }, async (t) => {
  const root = await mkdtemp(join(tmpdir(), "otsumi-progression-restart-test-"))
  const stateFile = join(root, "state.json")
  const sessionID = "session-restart"
  const inboxID = "inbox-retried-after-restart"
  const item = userInbox("finish this after the interrupted attempt")
  let runtime = null

  installModeBridge()
  t.after(async () => {
    await runtime?.cleanup()
    delete globalThis[bridgeKey]
    await rm(root, { recursive: true, force: true })
  })

  runtime = await createRuntime(stateFile)
  runtime.emit(inboxEvent("session.inbox.enqueued", { sessionID, inboxID, item }))
  runtime.emit({ type: "session.execution.started", data: { sessionID } })
  runtime.emit(inboxEvent("session.inbox.delivered", { sessionID, inboxID, item }))
  runtime.emit({ type: "session.step.started", data: { sessionID, agent: "osho" } })
  runtime.emit({ type: "session.execution.interrupted", data: { sessionID } })
  await sleep()

  assert.deepEqual(await persistedAwardTotals(stateFile), {
    xp: 1,
    counters: {
      interactions: 1,
      successfulTurns: 0,
      effectiveWorkTurns: 0,
      interruptedTurns: 1,
    },
  })

  await runtime.cleanup()
  runtime = await createRuntime(stateFile)

  runtime.emit({ type: "session.execution.started", data: { sessionID } })
  runtime.emit(inboxEvent("session.inbox.delivered", { sessionID, inboxID, item }))
  runtime.emit({ type: "session.step.started", data: { sessionID, agent: "osho" } })
  await sleep(20)
  await runtime.meaningfulWork(sessionID)
  runtime.emit({ type: "session.execution.succeeded", data: { sessionID } })
  await sleep()

  assert.deepEqual(
    await persistedAwardTotals(stateFile),
    {
      xp: 5,
      counters: {
        interactions: 1,
        successfulTurns: 1,
        effectiveWorkTurns: 1,
        interruptedTurns: 1,
      },
    },
    "the retried inbox may gain only its missing completion and effective-work components",
  )
})

test("delivered non-user work disqualifies an interrupted user's award context", { concurrency: false }, async (t) => {
  const root = await mkdtemp(join(tmpdir(), "otsumi-progression-non-user-test-"))
  const stateFile = join(root, "state.json")
  const sessionID = "session-non-user"
  const userItem = userInbox("the user request that gets interrupted")
  const systemItem = nonUserInbox("internal continuation that is not a user interaction")
  let runtime = null

  installModeBridge()
  t.after(async () => {
    await runtime?.cleanup()
    delete globalThis[bridgeKey]
    await rm(root, { recursive: true, force: true })
  })

  runtime = await createRuntime(stateFile)
  runtime.emit(inboxEvent("session.inbox.enqueued", {
    sessionID,
    inboxID: "inbox-interrupted-user",
    item: userItem,
  }))
  runtime.emit({ type: "session.execution.started", data: { sessionID } })
  runtime.emit(inboxEvent("session.inbox.delivered", {
    sessionID,
    inboxID: "inbox-interrupted-user",
    item: userItem,
  }))
  runtime.emit({ type: "session.step.started", data: { sessionID, agent: "osho" } })
  runtime.emit({ type: "session.execution.interrupted", data: { sessionID } })
  await sleep()

  assert.deepEqual(await persistedAwardTotals(stateFile), {
    xp: 1,
    counters: {
      interactions: 1,
      successfulTurns: 0,
      effectiveWorkTurns: 0,
      interruptedTurns: 1,
    },
  })

  runtime.emit(inboxEvent("session.inbox.enqueued", {
    sessionID,
    inboxID: "inbox-delivered-system-work",
    item: systemItem,
  }))
  runtime.emit({ type: "session.execution.started", data: { sessionID } })
  runtime.emit(inboxEvent("session.inbox.delivered", {
    sessionID,
    inboxID: "inbox-delivered-system-work",
    item: systemItem,
  }))
  runtime.emit({ type: "session.step.started", data: { sessionID, agent: "osho" } })
  await sleep(20)
  await runtime.meaningfulWork(sessionID)
  runtime.emit({ type: "session.execution.succeeded", data: { sessionID } })
  await sleep()

  assert.deepEqual(
    await persistedAwardTotals(stateFile),
    {
      xp: 1,
      counters: {
        interactions: 1,
        successfulTurns: 0,
        effectiveWorkTurns: 0,
        interruptedTurns: 1,
      },
    },
    "a delivered non-user item must not complete the prior interrupted user award",
  )
})

test("context-only input awards once and remains deduplicated across continuation and reload", { concurrency: false }, async (t) => {
  const root = await mkdtemp(join(tmpdir(), "otsumi-progression-context-test-"))
  const stateFile = join(root, "state.json")
  const sessionID = "session-context-only"
  const request = {
    sessionID,
    agent: "osho",
    messages: [
      {
        id: "message-context-only",
        role: "user",
        content: "complete this context-only request",
      },
    ],
    system: [{ text: "base" }],
    tools: {},
  }
  let runtime = null

  installModeBridge()
  t.after(async () => {
    await runtime?.cleanup()
    delete globalThis[bridgeKey]
    await rm(root, { recursive: true, force: true })
  })

  runtime = await createRuntime(stateFile)
  runtime.emit({ type: "session.execution.started", data: { sessionID } })
  await sleep(20)
  await runtime.context(request)
  await runtime.meaningfulWork(sessionID)

  // A continuation dispatch contains the same latest provider user message.
  // Reconciliation must retain one input identity rather than creating a
  // second award-ledger entry.
  await runtime.context({
    ...request,
    messages: [
      ...request.messages,
      { role: "assistant", content: "continuing after a tool result" },
    ],
  })
  runtime.emit({ type: "session.execution.succeeded", data: { sessionID } })
  await sleep()

  let state = JSON.parse(await readFile(stateFile, "utf8"))
  assert.equal(state.xp, 5)
  assert.equal(Object.keys(state.awardComponents).length, 1)
  assert.deepEqual(state.awardComponents["id:message-context-only"], {
    interaction: true,
    completion: true,
    effectiveWork: true,
    interrupted: false,
  })
  assert.doesNotMatch(JSON.stringify(state), /complete this context-only request/)

  await runtime.cleanup()
  runtime = await createRuntime(stateFile)
  runtime.emit({ type: "session.execution.started", data: { sessionID } })
  await sleep(20)
  await runtime.context(request)
  runtime.emit({ type: "session.execution.succeeded", data: { sessionID } })
  await sleep()

  state = JSON.parse(await readFile(stateFile, "utf8"))
  assert.equal(state.xp, 5, "reloading the plugin must not re-award the same provider input")
  assert.equal(Object.keys(state.awardComponents).length, 1)
})

test("historical otsumi commands and stale raw tracking do not block ordinary XP", { concurrency: false }, async (t) => {
  const root = await mkdtemp(join(tmpdir(), "otsumi-progression-history-test-"))
  const stateFile = join(root, "state.json")
  const sessionID = "session-after-historical-command"
  let runtime = null

  await writeFile(stateFile, JSON.stringify({
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
    updatedAt: "2026-08-19T00:00:00.000Z",
  }, null, 2) + "\n")

  installModeBridge()
  globalThis[bridgeKey].resolveRequest = (event) => ({
    sessionID: event.sessionID,
    agent: "osho",
    inputText: "/otsumi status",
    inputAt: 1_723_000_000_000,
  })
  t.after(async () => {
    await runtime?.cleanup()
    delete globalThis[bridgeKey]
    await rm(root, { recursive: true, force: true })
  })

  runtime = await createRuntime(stateFile)
  runtime.emit({ type: "session.execution.started", data: { sessionID } })
  await sleep(20)

  const historicalMarker = '<otsumi-progression-command action="status" />'
  const request = {
    sessionID,
    agent: "osho",
    messages: [
      { id: "old-command-user", role: "user", content: historicalMarker },
      { role: "assistant", content: "# Ōtsumi — GameMaster / PNJ Character Sheet" },
      {
        id: "ordinary-user-after-otsumi-command",
        role: "user",
        content: "continue with ordinary processing",
      },
    ],
    system: [{ text: "base" }],
    tools: {},
  }

  await runtime.context(request)
  await runtime.meaningfulWork(sessionID)
  runtime.emit({ type: "session.execution.succeeded", data: { sessionID } })
  await sleep()

  const state = JSON.parse(await readFile(stateFile, "utf8"))
  assert.equal(request.messages[0].content, historicalMarker)
  assert.doesNotMatch(request.system[0].text, /otsumi-progression-command-result/)
  assert.equal(state.xp, 5)
  assert.deepEqual(state.awardComponents["id:ordinary-user-after-otsumi-command"], {
    interaction: true,
    completion: true,
    effectiveWork: true,
    interrupted: false,
  })
  assert.equal(Object.keys(state.awardComponents).length, 1)
})
