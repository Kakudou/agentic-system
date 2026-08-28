import assert from "node:assert/strict"
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import test from "node:test"

import plugin from "../index.js"

const bridgeKey = Symbol.for("kakudou.mode-router.v2.bridge")
const sleep = (ms = 80) => new Promise((resolve) => setTimeout(resolve, ms))
const TOOL_CTX = { sessionID: "s-tool", agent: "osho" }
const sessionInfo = new Map()

function sessionInfoFor(sessionID) {
  return sessionInfo.get(sessionID)
}

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

function pendingFixture(overrides = {}) {
  return {
    level: 2,
    unlockedAt: "2026-08-01T00:00:00.000Z",
    announcementDelivered: false,
    proposal: null,
    rejections: [],
    ...overrides,
  }
}

function stateFixture(pending) {
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
    pendingEvolution: pending,
    evolutions: [],
    updatedAt: "2026-08-02T00:00:00.000Z",
  }
}

async function createRuntime(stateFile, xpOptions) {
  const stream = new AsyncQueue()
  const hooks = new Map()
  const tools = new Map()

  const cleanup = await plugin.setup({
    options: {
      stateFile,
      xp:
        xpOptions ?? {
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

  return {
    cleanup,
    emit(event) {
      stream.push(event)
    },
    async context(requestEvent) {
      await hooks.get("session:context")(requestEvent)
    },
    setSessionInfo(sessionID, info) {
      sessionInfo.set(sessionID, info)
    },
    async work(sessionID) {
      await hooks.get("execute.after")({
        tool: "subagent",
        sessionID,
        agent: "osho",
        result: { ok: true },
      })
    },
    async status() {
      return tools.get("otsumi_progression_status").execute({}, TOOL_CTX)
    },
    async propose(args) {
      return tools.get("otsumi_progression_propose").execute(args, TOOL_CTX)
    },
    async reject(args) {
      return tools.get("otsumi_progression_reject").execute(args, TOOL_CTX)
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

function requestEvent(sessionID, { withUserMessage = true } = {}) {
  return {
    sessionID,
    agent: "osho",
    system: [{ text: "base" }],
    // withUserMessage=false leaves the session without a tracked input, so a
    // terminal lifecycle event for that session stays XP-neutral and isolates
    // the announcement mutation from awardTerminal's legitimate XP awards.
    messages: withUserMessage ? [{ role: "user", content: "ordinary user work" }] : [],
    tools: {},
  }
}

async function readState(stateFile) {
  return JSON.parse(await readFile(stateFile, "utf8"))
}

function directiveOf(request) {
  return request.system[0].text
}

const PROPOSAL_ARGS = {
  title: "Bounded ledger audits",
  desire: "I want a durable, bounded audit trail for every progression award.",
  rationale: "Award decisions are currently impossible to reconstruct after the fact.",
  changes: "Extend the plugin's award ledger with a bounded, redacted audit log.",
  requiredEffects: "Local plugin state changes only.",
  risks: "State file growth if the audit log becomes unbounded.",
  successEvidence: "Regression tests show awards stay deduplicated and remain auditable.",
}

test("first eligible request announces the level-up and binds an in-flight session without confirming", { concurrency: false }, async (t) => {
  const root = await mkdtemp(join(tmpdir(), "otsumi-announce-b1-"))
  const stateFile = join(root, "state.json")
  const fixture = stateFixture(pendingFixture())
  await writeFile(stateFile, JSON.stringify(fixture, null, 2) + "\n")
  let runtime = null

  installModeBridge()
  t.after(async () => {
    await runtime?.cleanup()
    delete globalThis[bridgeKey]
    await rm(root, { recursive: true, force: true })
  })

  runtime = await createRuntime(stateFile)
  const before = await readState(stateFile)

  const request = requestEvent("s-b1")
  await runtime.context(request)
  const directive = directiveOf(request)

  assert.match(directive, /<otsumi-progression level="2" state="level-up-announcing" announce="yes">/)
  assert.match(directive, /choose exactly one self-directed evolution/)
  assert.match(directive, /00-agent-evolution/)
  assert.match(directive, /otsumi_progression_propose/)
  assert.match(directive, /same turn|this turn/i)

  const after = await readState(stateFile)
  const pending = after.pendingEvolution
  assert.equal(pending.announcementDelivered, false, "injection must not confirm the announcement")
  assert.ok(!("announcedAt" in pending), "injection must not create announcedAt")
  assert.equal(pending.announcementInFlight?.sessionID, "s-b1", "injection must bind the announcing session as in-flight")
  assert.equal(typeof pending.announcementInFlight?.at, "string")
  assert.ok(Number.isFinite(Date.parse(pending.announcementInFlight.at)), "in-flight at must be an ISO timestamp")

  // The announcement mutation must leave XP, counters, the award ledger, and
  // every other pendingEvolution field untouched.
  assert.equal(after.xp, before.xp)
  assert.deepEqual(after.counters, before.counters)
  assert.deepEqual(after.awardComponents, before.awardComponents)
  assert.deepEqual(
    { level: pending.level, unlockedAt: pending.unlockedAt, proposal: pending.proposal, rejections: pending.rejections },
    {
      level: before.pendingEvolution.level,
      unlockedAt: before.pendingEvolution.unlockedAt,
      proposal: before.pendingEvolution.proposal,
      rejections: before.pendingEvolution.rejections,
    },
  )
})

test("an orphaned in-flight marker from a dead session is rebound by the next eligible request", { concurrency: false }, async (t) => {
  const root = await mkdtemp(join(tmpdir(), "otsumi-announce-orphan-"))
  const stateFile = join(root, "state.json")
  const fixture = stateFixture(
    pendingFixture({
      announcementInFlight: { sessionID: "s-ghost", at: "2026-08-03T00:00:00.000Z" },
    }),
  )
  await writeFile(stateFile, JSON.stringify(fixture, null, 2) + "\n")
  let runtime = null

  installModeBridge()
  t.after(async () => {
    await runtime?.cleanup()
    delete globalThis[bridgeKey]
    await rm(root, { recursive: true, force: true })
  })

  runtime = await createRuntime(stateFile)

  const request = requestEvent("s-orphan")
  await runtime.context(request)
  const directive = directiveOf(request)

  assert.match(directive, /<otsumi-progression level="2" state="level-up-announcing" announce="yes">/)
  assert.match(directive, /choose exactly one self-directed evolution/)

  const after = await readState(stateFile)
  const pending = after.pendingEvolution
  assert.equal(pending.announcementInFlight?.sessionID, "s-orphan", "the live session must rebind the stale in-flight marker")
  assert.equal(typeof pending.announcementInFlight?.at, "string")
  assert.equal(pending.announcementDelivered, false)
  assert.ok(!("announcedAt" in pending))
})

test("succeeded of the in-flight session confirms with an announcedAt stamp and no XP side effects", { concurrency: false }, async (t) => {
  const root = await mkdtemp(join(tmpdir(), "otsumi-announce-b2-"))
  const stateFile = join(root, "state.json")
  const fixture = stateFixture(pendingFixture())
  await writeFile(stateFile, JSON.stringify(fixture, null, 2) + "\n")
  let runtime = null

  installModeBridge()
  t.after(async () => {
    await runtime?.cleanup()
    delete globalThis[bridgeKey]
    await rm(root, { recursive: true, force: true })
  })

  runtime = await createRuntime(stateFile)

  const request = requestEvent("s-b2", { withUserMessage: false })
  await runtime.context(request)
  assert.match(directiveOf(request), /state="level-up-announcing"/)

  runtime.emit({ type: "session.execution.succeeded", data: { sessionID: "s-b2" } })
  await sleep()

  const after = await readState(stateFile)
  const pending = after.pendingEvolution
  assert.equal(pending.announcementDelivered, true, "succeeded must confirm the announcement")
  assert.equal(typeof pending.announcedAt, "string", "confirmation must stamp announcedAt")
  assert.ok(Number.isFinite(Date.parse(pending.announcedAt)), "announcedAt must be an ISO timestamp")
  assert.ok(pending.announcementInFlight == null, "confirmation must clear the in-flight marker")

  // The in-flight session never had a tracked inbox input, so the
  // confirmation itself must be XP-neutral.
  assert.equal(after.xp, fixture.xp)
  assert.deepEqual(after.counters, fixture.counters)
  assert.deepEqual(after.awardComponents, fixture.awardComponents)
})

test("interrupted, failed, and session.error roll the announcement back and re-injection rebinds", { concurrency: false }, async (t) => {
  const root = await mkdtemp(join(tmpdir(), "otsumi-announce-b3-"))
  const stateFile = join(root, "state.json")
  const fixture = stateFixture(pendingFixture())
  await writeFile(stateFile, JSON.stringify(fixture, null, 2) + "\n")
  let runtime = null

  installModeBridge()
  t.after(async () => {
    await runtime?.cleanup()
    delete globalThis[bridgeKey]
    await rm(root, { recursive: true, force: true })
  })

  runtime = await createRuntime(stateFile)

  const first = requestEvent("s-b3", { withUserMessage: false })
  await runtime.context(first)
  assert.match(directiveOf(first), /state="level-up-announcing"/)
  let after = await readState(stateFile)
  assert.equal(after.pendingEvolution.announcementInFlight?.sessionID, "s-b3")

  runtime.emit({ type: "session.execution.interrupted", data: { sessionID: "s-b3" } })
  await sleep()
  after = await readState(stateFile)
  assert.ok(after.pendingEvolution.announcementInFlight == null, "interrupted must clear the in-flight marker")
  assert.equal(after.pendingEvolution.announcementDelivered, false, "interrupted must not confirm")
  assert.ok(!("announcedAt" in after.pendingEvolution))
  assert.equal(after.xp, 42)

  // A subsequent eligible request re-announces with a fresh in-flight binding.
  const second = requestEvent("s-b3b", { withUserMessage: false })
  await runtime.context(second)
  assert.match(directiveOf(second), /state="level-up-announcing"/, "a subsequent eligible request must re-announce")
  after = await readState(stateFile)
  assert.equal(after.pendingEvolution.announcementInFlight?.sessionID, "s-b3b", "re-injection must rebind the new session")
  assert.equal(after.pendingEvolution.announcementDelivered, false)

  runtime.emit({ type: "session.execution.failed", data: { sessionID: "s-b3b" } })
  await sleep()
  after = await readState(stateFile)
  assert.ok(after.pendingEvolution.announcementInFlight == null, "failed must clear the in-flight marker")
  assert.equal(after.pendingEvolution.announcementDelivered, false)

  runtime.emit({ type: "session.error", data: { sessionID: "s-b3b" } })
  await sleep()
  after = await readState(stateFile)
  assert.ok(after.pendingEvolution.announcementInFlight == null, "session.error must not leave an in-flight marker")
  assert.equal(after.pendingEvolution.announcementDelivered, false)
  assert.ok(!("announcedAt" in after.pendingEvolution))
})

test("legacy delivered-true state without announcedAt is unconfirmed: re-announce, then confirm on succeeded", { concurrency: false }, async (t) => {
  const root = await mkdtemp(join(tmpdir(), "otsumi-announce-b4-"))
  const stateFile = join(root, "state.json")
  const fixture = stateFixture(pendingFixture({ announcementDelivered: true }))
  await writeFile(stateFile, JSON.stringify(fixture, null, 2) + "\n")
  let runtime = null

  installModeBridge()
  t.after(async () => {
    await runtime?.cleanup()
    delete globalThis[bridgeKey]
    await rm(root, { recursive: true, force: true })
  })

  runtime = await createRuntime(stateFile)

  const request = requestEvent("s-b4", { withUserMessage: false })
  await runtime.context(request)
  assert.match(
    directiveOf(request),
    /<otsumi-progression level="2" state="level-up-announcing" announce="yes">/,
    "the legacy live shape must be treated as unconfirmed",
  )
  let after = await readState(stateFile)
  assert.equal(after.pendingEvolution.announcementInFlight?.sessionID, "s-b4")
  assert.ok(!("announcedAt" in after.pendingEvolution), "re-announcement must not invent an announcedAt stamp")

  runtime.emit({ type: "session.execution.succeeded", data: { sessionID: "s-b4" } })
  await sleep()
  after = await readState(stateFile)
  const pending = after.pendingEvolution
  assert.equal(pending.announcementDelivered, true)
  assert.equal(typeof pending.announcedAt, "string", "succeeded must stamp announcedAt for the legacy state")
  assert.ok(Number.isFinite(Date.parse(pending.announcedAt)))
  assert.ok(pending.announcementInFlight == null)
  assert.equal(after.xp, fixture.xp)
  assert.deepEqual(after.awardComponents, fixture.awardComponents)
})

test("confirmed-without-proposal requests carry the forced-lock mandate on every turn until a proposal exists", { concurrency: false }, async (t) => {
  const root = await mkdtemp(join(tmpdir(), "otsumi-announce-b5-"))
  const stateFile = join(root, "state.json")
  const fixture = stateFixture(
    pendingFixture({
      announcementDelivered: true,
      announcedAt: "2026-08-05T10:00:00.000Z",
    }),
  )
  await writeFile(stateFile, JSON.stringify(fixture, null, 2) + "\n")
  let runtime = null

  installModeBridge()
  t.after(async () => {
    await runtime?.cleanup()
    delete globalThis[bridgeKey]
    await rm(root, { recursive: true, force: true })
  })

  runtime = await createRuntime(stateFile)

  for (const sessionID of ["s-b5a", "s-b5b"]) {
    const request = requestEvent(sessionID)
    await runtime.context(request)
    const directive = directiveOf(request)
    assert.match(directive, /state="choice-unlocked"/, `${sessionID} must receive the forced lock`)
    assert.match(directive, /evolution choice is still open/i)
    assert.match(directive, /choose exactly one self-directed evolution/)
    assert.match(directive, /otsumi_progression_propose/)
    assert.match(directive, /do not leave the choice pending for the user to notice/i)
    assert.match(directive, /same turn|this turn/i)
  }

  let after = await readState(stateFile)
  assert.equal(after.pendingEvolution.announcementDelivered, true)
  assert.equal(after.pendingEvolution.announcedAt, "2026-08-05T10:00:00.000Z", "the confirmed stamp must stay stable")
  assert.equal(after.xp, 42)

  await runtime.propose(PROPOSAL_ARGS)

  const next = requestEvent("s-b5c")
  await runtime.context(next)
  const directive = directiveOf(next)
  assert.match(directive, /state="proposal-pending"/, "a recorded proposal must switch the directive")
  assert.match(directive, /Pending evolution: Bounded ledger audits/)
  assert.doesNotMatch(directive, /choice-unlocked/)
  assert.doesNotMatch(directive, /level-up-announcing/)
})

test("a stored proposal freezes re-announcement while an existing in-flight still finalizes on succeeded", { concurrency: false }, async (t) => {
  const root = await mkdtemp(join(tmpdir(), "otsumi-announce-b6-"))
  const stateFile = join(root, "state.json")
  const fixture = stateFixture(pendingFixture())
  await writeFile(stateFile, JSON.stringify(fixture, null, 2) + "\n")
  let runtime = null

  installModeBridge()
  t.after(async () => {
    await runtime?.cleanup()
    delete globalThis[bridgeKey]
    await rm(root, { recursive: true, force: true })
  })

  runtime = await createRuntime(stateFile)

  const request = requestEvent("s-b6", { withUserMessage: false })
  await runtime.context(request)
  assert.match(directiveOf(request), /state="level-up-announcing"/)
  let after = await readState(stateFile)
  assert.equal(after.pendingEvolution.announcementInFlight?.sessionID, "s-b6")
  assert.equal(after.pendingEvolution.announcementDelivered, false)

  await runtime.propose(PROPOSAL_ARGS)

  const next = requestEvent("s-b6", { withUserMessage: false })
  await runtime.context(next)
  const directive = directiveOf(next)
  assert.match(directive, /state="proposal-pending"/)
  assert.doesNotMatch(directive, /level-up-announcing/, "no re-announce injection while a proposal exists")
  assert.doesNotMatch(directive, /choice-unlocked/, "no forced-lock injection while a proposal exists")
  after = await readState(stateFile)
  assert.equal(after.pendingEvolution.announcementInFlight?.sessionID, "s-b6", "recording a proposal must not clear the in-flight marker")
  assert.equal(after.pendingEvolution.announcementDelivered, false)

  runtime.emit({ type: "session.execution.succeeded", data: { sessionID: "s-b6" } })
  await sleep()
  after = await readState(stateFile)
  const pending = after.pendingEvolution
  assert.equal(pending.announcementDelivered, true, "an in-flight that pre-existed the proposal must still finalize")
  assert.equal(typeof pending.announcedAt, "string")
  assert.ok(pending.announcementInFlight == null)
  assert.equal(pending.proposal?.title, PROPOSAL_ARGS.title, "finalization must preserve the proposal")
  assert.equal(after.xp, fixture.xp)
  assert.deepEqual(after.awardComponents, fixture.awardComponents)
})

test("reject maintains the delivered-implies-announcedAt invariant by stamping announcedAt when absent", { concurrency: false }, async (t) => {
  const root = await mkdtemp(join(tmpdir(), "otsumi-announce-b6b-"))
  const stateFile = join(root, "state.json")
  const fixture = stateFixture(
    pendingFixture({
      announcementDelivered: true,
      proposal: {
        ...PROPOSAL_ARGS,
        proposedAt: "2026-08-04T00:00:00.000Z",
      },
    }),
  )
  await writeFile(stateFile, JSON.stringify(fixture, null, 2) + "\n")
  let runtime = null

  installModeBridge()
  t.after(async () => {
    await runtime?.cleanup()
    delete globalThis[bridgeKey]
    await rm(root, { recursive: true, force: true })
  })

  runtime = await createRuntime(stateFile)

  await runtime.reject({ reason: "Too invasive for now." })

  const after = await readState(stateFile)
  const pending = after.pendingEvolution
  assert.equal(pending.announcementDelivered, true)
  assert.equal(typeof pending.announcedAt, "string", "reject must stamp announcedAt when the legacy state lacks it")
  assert.ok(Number.isFinite(Date.parse(pending.announcedAt)))
  assert.equal(pending.proposal, null)
  assert.equal(pending.rejections.length, 1)
  assert.equal(pending.rejections[0].title, PROPOSAL_ARGS.title)
})

test("a fresh level-up emits an unconfirmed pendingEvolution with no announcement stamps", { concurrency: false }, async (t) => {
  const root = await mkdtemp(join(tmpdir(), "otsumi-announce-fresh-"))
  const stateFile = join(root, "state.json")
  let runtime = null

  installModeBridge()
  t.after(async () => {
    await runtime?.cleanup()
    delete globalThis[bridgeKey]
    await rm(root, { recursive: true, force: true })
  })

  runtime = await createRuntime(stateFile, {
    interaction: 1,
    completion: 1,
    effectiveWork: 3,
    firstLevel: 5,
    growth: 1,
  })

  const inboxID = "inbox-fresh-unlock"
  const item = { type: "user", payload: { text: "kickoff work", agent: "osho" } }
  runtime.emit({ type: "session.inbox.enqueued", data: { sessionID: "s-fu", inboxID, item } })
  runtime.emit({ type: "session.execution.started", data: { sessionID: "s-fu" } })
  runtime.emit({ type: "session.inbox.delivered", data: { sessionID: "s-fu", inboxID, item } })
  runtime.emit({ type: "session.step.started", data: { sessionID: "s-fu", agent: "osho" } })
  await sleep(20)
  await runtime.work("s-fu")
  runtime.emit({ type: "session.execution.succeeded", data: { sessionID: "s-fu" } })
  await sleep()

  const after = await readState(stateFile)
  assert.equal(after.level, 2)
  assert.equal(after.xp, 5)
  const pending = after.pendingEvolution
  assert.equal(pending.level, 2)
  assert.equal(pending.announcementDelivered, false, "a fresh unlock must be unconfirmed")
  assert.ok(pending.announcedAt == null, "a fresh unlock must not carry announcedAt")
  assert.ok(pending.announcementInFlight == null, "a fresh unlock must not carry an in-flight marker")
  assert.equal(pending.proposal, null)
  assert.deepEqual(pending.rejections, [])
})

test("a child session dispatch is skipped by the top-level gate without touching state", { concurrency: false }, async (t) => {
  const root = await mkdtemp(join(tmpdir(), "otsumi-announce-child-"))
  const stateFile = join(root, "state.json")
  const fixture = stateFixture(pendingFixture())
  await writeFile(stateFile, JSON.stringify(fixture, null, 2) + "\n")
  let runtime = null

  installModeBridge()
  t.after(async () => {
    await runtime?.cleanup()
    delete globalThis[bridgeKey]
    sessionInfo.delete("s-child")
    await rm(root, { recursive: true, force: true })
  })

  runtime = await createRuntime(stateFile)
  runtime.setSessionInfo("s-child", { parentID: "ses_parent123" })
  const before = await readState(stateFile)

  const request = requestEvent("s-child")
  await runtime.context(request)

  assert.doesNotMatch(directiveOf(request), /<otsumi-progression/, "a child session must not receive the directive")
  assert.deepEqual(await readState(stateFile), before, "a child session dispatch must not mutate state")
})

test("a session lookup failure fails closed at the top-level gate without touching state", { concurrency: false }, async (t) => {
  const root = await mkdtemp(join(tmpdir(), "otsumi-announce-lookup-fail-"))
  const stateFile = join(root, "state.json")
  const fixture = stateFixture(pendingFixture())
  await writeFile(stateFile, JSON.stringify(fixture, null, 2) + "\n")
  let runtime = null

  installModeBridge()
  t.after(async () => {
    await runtime?.cleanup()
    delete globalThis[bridgeKey]
    sessionInfo.delete("s-fail")
    await rm(root, { recursive: true, force: true })
  })

  runtime = await createRuntime(stateFile)
  runtime.setSessionInfo("s-fail", "throw")
  const before = await readState(stateFile)

  const request = requestEvent("s-fail")
  await runtime.context(request)

  assert.doesNotMatch(directiveOf(request), /<otsumi-progression/, "a failed lookup must fail closed without a directive")
  assert.deepEqual(await readState(stateFile), before, "a failed lookup must not mutate state")
})
