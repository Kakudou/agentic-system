import assert from "node:assert/strict"
import { mkdtemp, readFile, rm } from "node:fs/promises"
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
    session: {
      async hook() {},
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
