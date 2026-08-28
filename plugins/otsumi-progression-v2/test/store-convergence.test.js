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

const sessionInfo = new Map()

function sessionInfoFor(sessionID) {
  return sessionInfo.get(sessionID)
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
      async get({ sessionID }) {
        const info = sessionInfoFor(sessionID)
        if (info === "throw") throw new Error("lookup failed")
        return { data: info ?? {} }
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
    setSessionInfo(sessionID, info) {
      sessionInfo.set(sessionID, info)
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

test("two plugin instances sharing one state file converge instead of clobbering", { concurrency: false }, async (t) => {
  const root = await mkdtemp(join(tmpdir(), "otsumi-progression-convergence-test-"))
  const stateFile = join(root, "state.json")
  let runtimeA = null
  let runtimeB = null

  installModeBridge()
  t.after(async () => {
    await runtimeA?.cleanup()
    await runtimeB?.cleanup()
    delete globalThis[bridgeKey]
    await rm(root, { recursive: true, force: true })
  })

  // B is the stale long-lived instance: it loads the (absent) state first and
  // keeps that in-memory copy for the whole test.
  runtimeB = await createRuntime(stateFile)
  runtimeA = await createRuntime(stateFile)

  runtimeA.emit(inboxEvent("session.inbox.enqueued", {
    sessionID: "session-a",
    inboxID: "inbox-a",
    item: userInbox("work from instance a"),
  }))
  runtimeA.emit({ type: "session.execution.started", data: { sessionID: "session-a" } })
  runtimeA.emit(inboxEvent("session.inbox.delivered", {
    sessionID: "session-a",
    inboxID: "inbox-a",
    item: userInbox("work from instance a"),
  }))
  runtimeA.emit({ type: "session.step.started", data: { sessionID: "session-a", agent: "osho" } })
  await sleep(20)
  await runtimeA.meaningfulWork("session-a")
  runtimeA.emit({ type: "session.execution.succeeded", data: { sessionID: "session-a" } })
  await sleep()

  let state = JSON.parse(await readFile(stateFile, "utf8"))
  assert.equal(state.xp, 5, "instance A's completed work turn must be durably recorded")
  assert.equal(Object.keys(state.awardComponents).length, 1)

  // B's in-memory state predates A's write; B's award must converge with
  // A's grant instead of clobbering the shared file.
  runtimeB.emit(inboxEvent("session.inbox.enqueued", {
    sessionID: "session-b",
    inboxID: "inbox-b",
    item: userInbox("work from instance b"),
  }))
  runtimeB.emit({ type: "session.execution.started", data: { sessionID: "session-b" } })
  runtimeB.emit(inboxEvent("session.inbox.delivered", {
    sessionID: "session-b",
    inboxID: "inbox-b",
    item: userInbox("work from instance b"),
  }))
  runtimeB.emit({ type: "session.step.started", data: { sessionID: "session-b", agent: "osho" } })
  await sleep(20)
  await runtimeB.meaningfulWork("session-b")
  runtimeB.emit({ type: "session.execution.succeeded", data: { sessionID: "session-b" } })
  await sleep()

  state = JSON.parse(await readFile(stateFile, "utf8"))
  assert.equal(state.xp, 10)
  assert.deepEqual(state.awardComponents, {
    "id:inbox-a": {
      interaction: true,
      completion: true,
      effectiveWork: true,
      interrupted: false,
    },
    "id:inbox-b": {
      interaction: true,
      completion: true,
      effectiveWork: true,
      interrupted: false,
    },
  })
  assert.deepEqual(state.counters, {
    interactions: 2,
    successfulTurns: 2,
    effectiveWorkTurns: 2,
    interruptedTurns: 0,
  })
})

function announcementPendingFixture(overrides = {}) {
  return {
    level: 2,
    unlockedAt: "2026-08-01T00:00:00.000Z",
    announcementDelivered: false,
    proposal: null,
    rejections: [],
    ...overrides,
  }
}

function announcementStateFixture(pending, evolutions = []) {
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
    awardComponents: {},
    pendingEvolution: pending,
    evolutions,
    updatedAt: "2026-08-02T00:00:00.000Z",
  }
}

function bareRequest(sessionID) {
  return {
    sessionID,
    agent: "osho",
    system: [{ text: "base" }],
    // No tracked user input, so terminal lifecycle events stay XP-neutral.
    messages: [],
    tools: {},
  }
}

test("a stale instance's unconfirmed state must not clobber a confirmed announcement", { concurrency: false }, async (t) => {
  const root = await mkdtemp(join(tmpdir(), "otsumi-progression-announce-merge-"))
  const stateFile = join(root, "state.json")
  let runtimeA = null
  let runtimeB = null

  installModeBridge()
  t.after(async () => {
    await runtimeA?.cleanup()
    await runtimeB?.cleanup()
    delete globalThis[bridgeKey]
    await rm(root, { recursive: true, force: true })
  })

  await writeFile(stateFile, JSON.stringify(announcementStateFixture(announcementPendingFixture()), null, 2) + "\n")
  runtimeB = await createRuntime(stateFile)
  runtimeA = await createRuntime(stateFile)

  await runtimeA.context(bareRequest("s-merge-a"))
  let state = JSON.parse(await readFile(stateFile, "utf8"))
  assert.equal(state.pendingEvolution.announcementInFlight?.sessionID, "s-merge-a")
  assert.equal(state.pendingEvolution.announcementDelivered, false)

  runtimeA.emit({ type: "session.execution.succeeded", data: { sessionID: "s-merge-a" } })
  await sleep()
  state = JSON.parse(await readFile(stateFile, "utf8"))
  assert.equal(state.pendingEvolution.announcementDelivered, true)
  assert.equal(typeof state.pendingEvolution.announcedAt, "string")
  const announcedAt = state.pendingEvolution.announcedAt

  // B's in-memory state predates A's confirmation. B's stale
  // announcementDelivered=false must not clobber the confirmed disk state, and
  // the merged read must stay confirmed (forced lock, not a re-announce).
  const requestB = bareRequest("s-merge-b")
  await runtimeB.context(requestB)
  assert.match(requestB.system[0].text, /state="choice-unlocked"/, "the merged read must remain confirmed")
  state = JSON.parse(await readFile(stateFile, "utf8"))
  const pending = state.pendingEvolution
  assert.equal(pending.announcementDelivered, true, "announcementDelivered must merge as OR")
  assert.equal(pending.announcedAt, announcedAt, "announcedAt must survive the merge")
  assert.equal(pending.level, 2)
  assert.equal(state.xp, 42, "the merge must not touch XP")
})

test("announcementInFlight is advisory: the latest at wins across instances", { concurrency: false }, async (t) => {
  const root = await mkdtemp(join(tmpdir(), "otsumi-progression-announce-flight-"))
  const stateFile = join(root, "state.json")
  let runtimeA = null
  let runtimeB = null

  installModeBridge()
  t.after(async () => {
    await runtimeA?.cleanup()
    await runtimeB?.cleanup()
    delete globalThis[bridgeKey]
    await rm(root, { recursive: true, force: true })
  })

  await writeFile(stateFile, JSON.stringify(announcementStateFixture(announcementPendingFixture()), null, 2) + "\n")
  runtimeA = await createRuntime(stateFile)
  runtimeB = await createRuntime(stateFile)

  await runtimeA.context(bareRequest("s-flight-a"))
  await sleep(20)
  await runtimeB.context(bareRequest("s-flight-b"))
  let state = JSON.parse(await readFile(stateFile, "utf8"))
  assert.equal(state.pendingEvolution.announcementInFlight?.sessionID, "s-flight-b")
  const latest = state.pendingEvolution.announcementInFlight.at

  // A's in-memory copy still holds its older in-flight binding. A plain award
  // turn must merge the two advisory bindings by latest at, keeping B's.
  const item = { type: "user", payload: { text: "merge xp turn", agent: "osho" } }
  runtimeA.emit(inboxEvent("session.inbox.enqueued", { sessionID: "s-flight-xp", inboxID: "inbox-flight-xp", item }))
  runtimeA.emit({ type: "session.execution.started", data: { sessionID: "s-flight-xp" } })
  runtimeA.emit(inboxEvent("session.inbox.delivered", { sessionID: "s-flight-xp", inboxID: "inbox-flight-xp", item }))
  runtimeA.emit({ type: "session.step.started", data: { sessionID: "s-flight-xp", agent: "osho" } })
  await sleep(20)
  runtimeA.emit({ type: "session.execution.succeeded", data: { sessionID: "s-flight-xp" } })
  await sleep()

  state = JSON.parse(await readFile(stateFile, "utf8"))
  assert.equal(state.pendingEvolution.announcementInFlight?.sessionID, "s-flight-b", "the latest in-flight at must win the merge")
  assert.equal(state.pendingEvolution.announcementInFlight.at, latest)
  assert.equal(state.pendingEvolution.announcementDelivered, false)
  assert.equal(state.xp, 44)
  assert.ok(state.awardComponents["id:inbox-flight-xp"], "the award turn must still be recorded")
})

test("one-side-only pendingEvolution: disk pending survives a memory instance that predates it", { concurrency: false }, async (t) => {
  const root = await mkdtemp(join(tmpdir(), "otsumi-progression-announce-one-side-"))
  const stateFile = join(root, "state.json")
  let runtimeA = null
  let runtimeB = null

  installModeBridge()
  t.after(async () => {
    await runtimeA?.cleanup()
    await runtimeB?.cleanup()
    delete globalThis[bridgeKey]
    await rm(root, { recursive: true, force: true })
  })

  // B loads before any state exists, so its memory has no pendingEvolution.
  runtimeB = await createRuntime(stateFile)
  const pending = announcementPendingFixture()
  await writeFile(stateFile, JSON.stringify(announcementStateFixture(pending), null, 2) + "\n")
  runtimeA = await createRuntime(stateFile)

  const item = { type: "user", payload: { text: "late work from b", agent: "osho" } }
  runtimeB.emit(inboxEvent("session.inbox.enqueued", { sessionID: "s-one-side", inboxID: "inbox-one-side", item }))
  runtimeB.emit({ type: "session.execution.started", data: { sessionID: "s-one-side" } })
  runtimeB.emit(inboxEvent("session.inbox.delivered", { sessionID: "s-one-side", inboxID: "inbox-one-side", item }))
  runtimeB.emit({ type: "session.step.started", data: { sessionID: "s-one-side", agent: "osho" } })
  await sleep(20)
  runtimeB.emit({ type: "session.execution.succeeded", data: { sessionID: "s-one-side" } })
  await sleep()

  const state = JSON.parse(await readFile(stateFile, "utf8"))
  assert.deepEqual(state.pendingEvolution, pending, "the disk side's pendingEvolution must be used when memory has none")
  assert.equal(state.xp, 44)
  assert.ok(state.awardComponents["id:inbox-one-side"], "B's award must still be recorded")
})

test("one-side-only pendingEvolution: memory pending is discarded when disk already evolved that level", { concurrency: false }, async (t) => {
  const root = await mkdtemp(join(tmpdir(), "otsumi-progression-announce-discarded-"))
  const stateFile = join(root, "state.json")
  let runtimeB = null

  installModeBridge()
  t.after(async () => {
    await runtimeB?.cleanup()
    delete globalThis[bridgeKey]
    await rm(root, { recursive: true, force: true })
  })

  await writeFile(stateFile, JSON.stringify(announcementStateFixture(announcementPendingFixture()), null, 2) + "\n")
  runtimeB = await createRuntime(stateFile)

  // Disk now records the Level 2 evolution as completed and cleared; B's
  // memory still holds the stale pending for that same level.
  const completed = announcementStateFixture(null, [
    {
      level: 2,
      title: "Done evolution",
      result: "Completed and verified.",
      completedAt: "2026-08-03T00:00:00.000Z",
    },
  ])
  await writeFile(stateFile, JSON.stringify(completed, null, 2) + "\n")

  const item = { type: "user", payload: { text: "post-completion work", agent: "osho" } }
  runtimeB.emit(inboxEvent("session.inbox.enqueued", { sessionID: "s-discarded", inboxID: "inbox-discarded", item }))
  runtimeB.emit({ type: "session.execution.started", data: { sessionID: "s-discarded" } })
  runtimeB.emit(inboxEvent("session.inbox.delivered", { sessionID: "s-discarded", inboxID: "inbox-discarded", item }))
  runtimeB.emit({ type: "session.step.started", data: { sessionID: "s-discarded", agent: "osho" } })
  await sleep(20)
  runtimeB.emit({ type: "session.execution.succeeded", data: { sessionID: "s-discarded" } })
  await sleep()

  const state = JSON.parse(await readFile(stateFile, "utf8"))
  assert.equal(state.pendingEvolution, null, "stale memory pending must be discarded for an already-evolved level")
  assert.equal(state.evolutions.length, 1)
  assert.equal(state.evolutions[0].level, 2)
  assert.equal(state.xp, 44)
})

test("normalizeState passes unknown pendingEvolution keys through and tolerates malformed announcement fields", { concurrency: false }, async (t) => {
  const root = await mkdtemp(join(tmpdir(), "otsumi-progression-announce-malformed-"))
  const stateFile = join(root, "state.json")
  let runtime = null

  installModeBridge()
  t.after(async () => {
    await runtime?.cleanup()
    delete globalThis[bridgeKey]
    await rm(root, { recursive: true, force: true })
  })

  const pending = {
    level: 2,
    unlockedAt: "2026-08-01T00:00:00.000Z",
    announcementDelivered: true,
    announcedAt: 1_234,
    announcementInFlight: "bogus",
    proposal: null,
    rejections: [],
    customNote: "keep me",
  }
  await writeFile(stateFile, JSON.stringify(announcementStateFixture(pending), null, 2) + "\n")

  // Loading must tolerate the malformed fields instead of crashing or reading
  // them as confirmed.
  runtime = await createRuntime(stateFile)
  const request = bareRequest("s-malformed")
  await runtime.context(request)
  assert.match(request.system[0].text, /state="level-up-announcing"/, "malformed fields must read as unconfirmed")
  let state = JSON.parse(await readFile(stateFile, "utf8"))
  assert.equal(state.pendingEvolution.customNote, "keep me", "unknown pendingEvolution keys must pass through")
  assert.equal(
    state.pendingEvolution.announcementInFlight?.sessionID,
    "s-malformed",
    "a malformed in-flight marker must be treated as absent and rebound",
  )

  runtime.emit({ type: "session.execution.succeeded", data: { sessionID: "s-malformed" } })
  await sleep()
  state = JSON.parse(await readFile(stateFile, "utf8"))
  assert.equal(state.pendingEvolution.announcementDelivered, true)
  assert.equal(typeof state.pendingEvolution.announcedAt, "string", "confirmation must replace the malformed announcedAt")
  assert.ok(Number.isFinite(Date.parse(state.pendingEvolution.announcedAt)))
  assert.ok(state.pendingEvolution.announcementInFlight == null)
  assert.equal(state.pendingEvolution.customNote, "keep me")
})

test("an in-flight object without an at stamp is treated as absent", { concurrency: false }, async (t) => {
  const root = await mkdtemp(join(tmpdir(), "otsumi-progression-announce-flight-malformed-"))
  const stateFile = join(root, "state.json")
  let runtime = null

  installModeBridge()
  t.after(async () => {
    await runtime?.cleanup()
    delete globalThis[bridgeKey]
    await rm(root, { recursive: true, force: true })
  })

  const pending = {
    level: 2,
    unlockedAt: "2026-08-01T00:00:00.000Z",
    announcementDelivered: true,
    announcementInFlight: { sessionID: "s-ghost" },
    proposal: null,
    rejections: [],
  }
  await writeFile(stateFile, JSON.stringify(announcementStateFixture(pending), null, 2) + "\n")

  runtime = await createRuntime(stateFile)
  const request = bareRequest("s-flight-malformed")
  await runtime.context(request)
  assert.match(
    request.system[0].text,
    /state="level-up-announcing"/,
    "an at-less in-flight marker must not read as in-flight or confirmed",
  )
  const state = JSON.parse(await readFile(stateFile, "utf8"))
  assert.equal(state.pendingEvolution.announcementInFlight?.sessionID, "s-flight-malformed")
})

test("a stale instance skips the rollback for a binding it predates and rebinds the marker on its next eligible request", { concurrency: false }, async (t) => {
  const root = await mkdtemp(join(tmpdir(), "otsumi-progression-announce-rebind-"))
  const stateFile = join(root, "state.json")
  let runtimeA = null
  let runtimeB = null

  installModeBridge()
  t.after(async () => {
    await runtimeA?.cleanup()
    await runtimeB?.cleanup()
    delete globalThis[bridgeKey]
    await rm(root, { recursive: true, force: true })
  })

  // Unconfirmed Level-2 pending on disk before either instance exists.
  await writeFile(stateFile, JSON.stringify(announcementStateFixture(announcementPendingFixture()), null, 2) + "\n")

  // B loads first, so its in-memory state predates A's later in-flight binding.
  runtimeB = await createRuntime(stateFile)
  runtimeA = await createRuntime(stateFile)

  // A's eligible request binds the in-flight marker durably to A's session.
  await runtimeA.context(bareRequest("session-ka"))
  let state = JSON.parse(await readFile(stateFile, "utf8"))
  assert.equal(state.pendingEvolution.announcementInFlight?.sessionID, "session-ka")
  const afterBind = state

  // B's interrupted event for the bound session must be ignored: B's
  // in-memory snapshot predates the binding, so the lifecycle skip produces
  // no flush and the durable file stays identical (updatedAt included).
  runtimeB.emit({ type: "session.execution.interrupted", data: { sessionID: "session-ka" } })
  await sleep()
  state = JSON.parse(await readFile(stateFile, "utf8"))
  assert.deepEqual(state, afterBind, "B's snapshot-skip must not touch the durable file")

  // B's next eligible request rebinds the orphaned marker to B's own session,
  // overwriting A's stale binding with a later at.
  await runtimeB.context(bareRequest("session-kb"))
  state = JSON.parse(await readFile(stateFile, "utf8"))
  assert.equal(state.pendingEvolution.announcementInFlight?.sessionID, "session-kb", "B's orphan-rebind must overwrite A's stale marker")
  assert.ok(Number.isFinite(Date.parse(state.pendingEvolution.announcementInFlight.at)), "the rebind must carry a parseable at")
  assert.equal(state.pendingEvolution.announcementDelivered, false, "the rebind must not confirm the announcement")
})
