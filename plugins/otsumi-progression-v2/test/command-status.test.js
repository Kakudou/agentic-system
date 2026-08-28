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

function stateFixture() {
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
      "id:award-one": {
        interaction: true,
        completion: true,
        effectiveWork: false,
        interrupted: false,
      },
      "digest:award-two": {
        interaction: true,
        completion: false,
        effectiveWork: false,
        interrupted: true,
      },
    },
    pendingEvolution: {
      level: 2,
      unlockedAt: "2026-08-01T00:00:00.000Z",
      announcementDelivered: false,
      proposal: {
        title: "Sharper continuity",
        desire: "I want to preserve continuity more reliably.",
        rationale: "Continuity matters.",
        changes: "Bounded runtime changes.",
        requiredEffects: "Approved local code changes.",
        risks: "Stale state.",
        successEvidence: "Regression tests.",
        proposedAt: "2026-08-02T00:00:00.000Z",
      },
      rejections: [
        {
          title: "Earlier idea",
          reason: "Too broad.",
          rejectedAt: "2026-08-01T12:00:00.000Z",
        },
      ],
    },
    evolutions: [
      {
        level: 1,
        title: "First evolution",
        result: "Added a verified capability.",
        completedAt: "2026-07-01T00:00:00.000Z",
      },
    ],
    updatedAt: "2026-08-02T00:00:00.000Z",
  }
}

test("registers /otsumi and renders an XP-neutral diagnostic character sheet", { concurrency: false }, async (t) => {
  const root = await mkdtemp(join(tmpdir(), "otsumi-progression-command-test-"))
  const stateFile = join(root, "state.json")
  const initial = stateFixture()
  await writeFile(stateFile, JSON.stringify(initial, null, 2) + "\n")

  const stream = new AsyncQueue()
  const commands = new Map()
  let contextHook = null
  let rawInput = "/otsumi status"

  globalThis[bridgeKey] = {
    async modeFor() {
      return "dev"
    },
    agentFor() {
      return "osho"
    },
    resolveRequest(event) {
      return {
        sessionID: event.sessionID,
        agent: event.agent,
        inputText: rawInput,
        inputAt: 1_723_000_000_000,
      }
    },
  }

  const cleanup = await plugin.setup({
    options: { stateFile },
    command: {
      async transform(callback) {
        await callback({
          update(name, mutate) {
            const command = {}
            mutate(command)
            commands.set(name, command)
          },
        })
      },
    },
    event: {
      subscribe() {
        return stream
      },
    },
    session: {
      async hook(name, callback) {
        assert.equal(name, "context")
        contextHook = callback
      },
      async get() {
        return { data: {} }
      },
    },
    tool: {
      async transform() {},
      async hook() {},
    },
  })

  t.after(async () => {
    await cleanup()
    delete globalThis[bridgeKey]
    await rm(root, { recursive: true, force: true })
  })

  assert.deepEqual(commands.get("otsumi"), {
    description: "Inspect Ōtsumi's read-only GameMaster/PNJ progression sheet: /otsumi [status]",
    template: '<otsumi-progression-command action="$ARGUMENTS" />',
  })

  // XP neutrality must not depend on the context hook being observed. The
  // public inbox path already carries the raw slash controller text.
  const missedContextSessionID = "session-command-missed-context"
  stream.push({
    type: "session.inbox.enqueued",
    data: {
      sessionID: missedContextSessionID,
      inboxID: "inbox-otsumi-status",
      item: {
        type: "user",
        payload: { text: "/otsumi status", agent: "osho" },
      },
    },
  })
  stream.push({
    type: "session.execution.started",
    data: { sessionID: missedContextSessionID },
  })
  stream.push({
    type: "session.execution.succeeded",
    data: { sessionID: missedContextSessionID },
  })
  stream.push({
    type: "session.ended",
    data: { sessionID: missedContextSessionID },
  })
  await sleep()
  assert.deepEqual(JSON.parse(await readFile(stateFile, "utf8")), initial)

  const sessionID = "session-command"
  stream.push({ type: "session.execution.started", data: { sessionID } })
  await sleep(20)

  const tools = {
    read: { description: "native read", input: { type: "object" } },
  }
  const toolsBefore = JSON.stringify(tools)
  const request = {
    sessionID,
    agent: "osho",
    messages: [
      {
        id: "message-otsumi-status",
        role: "user",
        content: '<otsumi-progression-command action="status" />',
      },
    ],
    system: [{ text: "base" }],
    tools,
  }

  await contextHook(request)

  const rendered = request.messages[0].content
  assert.match(rendered, /runtime already executed this read-only control command/)
  assert.match(rendered, /# Ōtsumi — GameMaster \/ PNJ Character Sheet/)
  assert.match(rendered, /\*\*Level:\*\* 2/)
  assert.match(rendered, /\*\*XP:\*\* 42/)
  assert.match(rendered, /\*\*Next threshold:\*\* 90 XP/)
  assert.match(rendered, /\*\*Progress:\*\* 2 \/ 50 XP/)
  assert.match(rendered, /Interactions: 9/)
  assert.match(rendered, /Sharper continuity/)
  assert.match(rendered, /Earlier idea.*Too broad/s)
  assert.match(rendered, /First evolution.*Added a verified capability/s)
  assert.match(rendered, /Durable award-ledger entries: 2/)
  assert.match(rendered, /State schema version: 2/)
  assert.match(rendered, new RegExp(stateFile.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")))
  assert.match(rendered, /Configured primary agent: osho/)
  assert.match(rendered, /Eligible modes: dev, dev-python, video-edit/)
  assert.match(rendered, /Tracked runtime sessions: 1/)
  assert.match(rendered, /Agent: osho/)
  assert.match(rendered, /Mode: dev/)
  assert.match(rendered, /Input tracked: yes/)
  assert.match(rendered, /User-text characters: 14/)
  assert.match(rendered, /Generation: 1/)
  assert.match(rendered, /Meaningful work: no/)
  assert.match(rendered, /Gadget phase: no/)
  assert.match(rendered, /Last lifecycle event: session\.execution\.started/)
  assert.match(rendered, /Last lifecycle time: \d{4}-\d{2}-\d{2}T/)
  assert.match(request.system.at(-1).text, /Return the exact result below verbatim and do not call tools/)
  assert.equal(request.tools, tools)
  assert.equal(JSON.stringify(request.tools), toolsBefore)

  stream.push({ type: "session.execution.succeeded", data: { sessionID } })
  await sleep()
  assert.deepEqual(JSON.parse(await readFile(stateFile, "utf8")), initial)

  rawInput = "/otsumi"
  const shortRequest = {
    sessionID: "session-command-short",
    agent: "osho",
    messages: [{ role: "user", content: '<otsumi-progression-command action="" />' }],
    system: [],
    tools: {},
  }
  await contextHook(shortRequest)
  assert.match(shortRequest.messages[0].content, /GameMaster \/ PNJ Character Sheet/)

  rawInput = "/otsumi dance"
  const unknownRequest = {
    sessionID: "session-command-unknown",
    agent: "osho",
    messages: [{ role: "user", content: '<otsumi-progression-command action="dance" />' }],
    system: [],
    tools: {},
  }
  await contextHook(unknownRequest)
  assert.match(
    unknownRequest.messages[0].content,
    /Ōtsumi Progression ERROR: unknown action 'dance'\. Supported actions: status\./,
  )
  // Even if lifecycle ordering drifts and execution.started is observed after
  // the context hook, the slash controller remains XP-neutral.
  stream.push({
    type: "session.execution.started",
    data: { sessionID: "session-command-unknown" },
  })
  stream.push({
    type: "session.execution.succeeded",
    data: { sessionID: "session-command-unknown" },
  })
  await sleep()
  assert.deepEqual(JSON.parse(await readFile(stateFile, "utf8")), initial)

  rawInput = "/otsumi status"
  const historicalMarker = '<otsumi-progression-command action="dance" />'
  const currentRawRequest = {
    sessionID: "session-command-current-raw",
    agent: "osho",
    messages: [
      { role: "user", content: historicalMarker },
      { role: "assistant", content: "Ōtsumi Progression ERROR: unknown action 'dance'." },
      { role: "user", content: "/otsumi status" },
    ],
    system: [],
    tools: {},
  }

  await contextHook(currentRawRequest)

  assert.equal(currentRawRequest.messages[0].content, historicalMarker)
  assert.match(
    currentRawRequest.messages[2].content,
    /runtime already executed this read-only control command/i,
  )
  assert.match(currentRawRequest.messages[2].content, /GameMaster \/ PNJ Character Sheet/)
  assert.doesNotMatch(currentRawRequest.messages[2].content, /unknown action 'dance'/)
  assert.deepEqual(JSON.parse(await readFile(stateFile, "utf8")), initial)
})

test("renders an honest announcement state line for confirmed, in-flight, and pending announcements", { concurrency: false }, async (t) => {
  const cases = [
    {
      name: "confirmed",
      pending: {
        level: 2,
        unlockedAt: "2026-08-01T00:00:00.000Z",
        announcementDelivered: true,
        announcedAt: "2026-08-05T10:00:00.000Z",
        proposal: null,
        rejections: [],
      },
    },
    {
      name: "in-flight",
      pending: {
        level: 2,
        unlockedAt: "2026-08-01T00:00:00.000Z",
        announcementDelivered: false,
        announcementInFlight: { sessionID: "sess-sheet-inflight", at: "2026-08-06T09:30:00.000Z" },
        proposal: null,
        rejections: [],
      },
    },
    {
      name: "pending (fresh)",
      pending: {
        level: 2,
        unlockedAt: "2026-08-01T00:00:00.000Z",
        announcementDelivered: false,
        proposal: null,
        rejections: [],
      },
    },
    {
      name: "pending (legacy delivered without announcedAt)",
      pending: {
        level: 2,
        unlockedAt: "2026-08-01T00:00:00.000Z",
        announcementDelivered: true,
        proposal: null,
        rejections: [],
      },
    },
  ]

  for (const { name, pending } of cases) {
    await t.test(name, async (sub) => {
      const root = await mkdtemp(join(tmpdir(), "otsumi-progression-announce-sheet-"))
      const stateFile = join(root, "state.json")
      const initial = {
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
        evolutions: [],
        updatedAt: "2026-08-02T00:00:00.000Z",
      }
      await writeFile(stateFile, JSON.stringify(initial, null, 2) + "\n")

      const stream = new AsyncQueue()
      const capturedTools = new Map()
      globalThis[bridgeKey] = {
        async modeFor() {
          return "dev"
        },
        agentFor() {
          return "osho"
        },
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
          async hook() {},
        },
        tool: {
          async transform(callback) {
            await callback({
              add(definition) {
                capturedTools.set(definition.name, definition)
              },
            })
          },
          async hook() {},
        },
      })

      sub.after(async () => {
        await cleanup()
        delete globalThis[bridgeKey]
        await rm(root, { recursive: true, force: true })
      })

      const statusTool = capturedTools.get("otsumi_progression_status")
      const result = await statusTool.execute({}, { sessionID: `sess-sheet-${name}`, agent: "osho" })
      const sheet = result.output
      const line = sheet.split("\n").find((candidate) => /nnouncement/i.test(candidate))
      assert.ok(line, `the sheet must render an announcement line (${name})`)

      if (name === "confirmed") {
        assert.match(line, /confirmed/i)
        assert.match(line, /2026-08-05T10:00:00\.000Z/)
      } else if (name === "in-flight") {
        assert.match(line, /in-flight/i)
        assert.match(line, /sess-sheet-inflight/)
        assert.match(line, /2026-08-06T09:30:00\.000Z/)
      } else {
        assert.match(line, /pending/i)
      }

      // The /otsumi status path must remain state-neutral.
      assert.deepEqual(JSON.parse(await readFile(stateFile, "utf8")), initial)
    })
  }
})
