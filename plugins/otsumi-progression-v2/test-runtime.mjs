import assert from "node:assert/strict"
import { mkdtemp, readFile, rm } from "node:fs/promises"
import { join } from "node:path"
import { tmpdir } from "node:os"

import plugin from "./index.js"

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

const sleep = (ms = 20) => new Promise((resolve) => setTimeout(resolve, ms))

const root = await mkdtemp(join(tmpdir(), "otsumi-progression-test-"))
const stateFile = join(root, "state.json")
const stream = new AsyncQueue()
const tools = new Map()
const commands = new Map()
const hooks = new Map()
let requestHook = null

const bridgeKey = Symbol.for("kakudou.mode-router.v2.bridge")
globalThis[bridgeKey] = {
  async modeFor() {
    return "dev"
  },
  resolveRequest(event) {
    return {
      sessionID: event.sessionID ?? null,
      agent: event.agent ?? null,
      inputText: "next",
      inputAt: Date.now(),
    }
  },
  agentFor() {
    return "osho"
  },
}

const ctx = {
  options: {
    stateFile,
    xp: {
      interaction: 1,
      completion: 1,
      effectiveWork: 3,
      firstLevel: 5,
      growth: 1,
    },
  },
  event: {
    subscribe() {
      return stream
    },
  },
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
  session: {
    async hook(name, callback) {
      if (name !== "context") throw new Error(`unsupported hook ${name}`)
      requestHook = callback
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
}

const cleanup = await plugin.setup(ctx)
assert.equal(typeof requestHook, "function")
assert.equal(commands.get("otsumi")?.template, '<otsumi-progression-command action="$ARGUMENTS" />')
assert.equal(tools.size, 4)
assert.equal(typeof hooks.get("execute.after"), "function")

function emit(value) {
  stream.push(value)
}

let inboxSerial = 0

function enqueueUserInbox({ inboxID = `inbox-${++inboxSerial}`, text, agent = "osho" }) {
  const item = {
    type: "user",
    payload: { text, agent },
  }

  emit({
    type: "session.inbox.enqueued",
    data: { sessionID: "s1", inboxID, item },
  })
  return { inboxID, item }
}

function deliverUserInbox({ inboxID, item }) {
  emit({
    type: "session.inbox.delivered",
    data: { sessionID: "s1", inboxID, item },
  })
}

async function successfulTurn({ work = false, text = "do work" } = {}) {
  const inbox = enqueueUserInbox({ text })
  emit({ type: "session.execution.started", data: { sessionID: "s1" } })
  deliverUserInbox(inbox)
  emit({ type: "session.step.started", data: { sessionID: "s1", agent: "osho" } })
  await sleep()
  if (work) {
    await hooks.get("execute.after")({
      tool: "subagent",
      sessionID: "s1",
      agent: "osho",
      result: { ok: true },
    })
  }
  emit({ type: "session.execution.succeeded", data: { sessionID: "s1" } })
  await sleep(60)
}

await successfulTurn({ work: true })

const statusTool = tools.get("otsumi_progression_status")
let status = await statusTool.execute({}, { sessionID: "s1", agent: "osho" })
assert.match(status.output, /\*\*Level:\*\* 2/)
assert.match(status.output, /\*\*XP:\*\* 5/)
assert.match(status.output, /Level 2 evolution:\*\* pending/)

const request = {
  sessionID: "s1",
  agent: "osho",
  system: [{ text: "base" }],
  messages: [{ role: "user", content: "next" }],
  tools: {},
}
await requestHook(request)
assert.match(request.system[0].text, /otsumi-progression/)
assert.match(request.system[0].text, /00-agent-evolution/)

const propose = tools.get("otsumi_progression_propose")
const reject = tools.get("otsumi_progression_reject")
const complete = tools.get("otsumi_progression_complete")

const proposalArgs = {
  title: "I want eyes",
  desire: "I want richer visual perception when Kakudou explicitly allows it.",
  rationale: "Repeated visual-context friction made perception matter to me.",
  changes: "Add an explicitly invoked visual-perception integration.",
  requiredEffects: "Plugin code and explicit device/screen permission when used.",
  risks: "Privacy and accidental capture if permission boundaries are weak.",
  successEvidence: "A user-approved test proves one explicit capture can be inspected and no ambient capture occurs.",
}

await propose.execute(proposalArgs, { sessionID: "s1", agent: "osho" })
status = await statusTool.execute({}, { sessionID: "s1", agent: "osho" })
assert.match(status.output, /I want eyes/)

await reject.execute({ reason: "Not yet; choose something less invasive." }, { sessionID: "s1", agent: "osho" })
status = await statusTool.execute({}, { sessionID: "s1", agent: "osho" })
assert.match(status.output, /has not locked a proposal yet/)
assert.match(status.output, /Rejected\/reconsidered proposals:\*\* 1/)

await propose.execute(
  {
    ...proposalArgs,
    title: "I want my own status UI",
    desire: "I want a visible place where my current state feels like mine.",
    changes: "Create a local status UI for progression and runtime state.",
    requiredEffects: "User-approved local files only.",
    risks: "Low; avoid leaking private memory content.",
    successEvidence: "The approved UI renders the progression state without exposing secrets.",
  },
  { sessionID: "s1", agent: "osho" },
)

// Accumulate XP while the Level 2 evolution remains unresolved. No second
// level may unlock yet even after crossing the Level 3 threshold (10 XP).
await successfulTurn({ work: true, text: "more work" })
status = await statusTool.execute({}, { sessionID: "s1", agent: "osho" })
assert.match(status.output, /\*\*Level:\*\* 2/)
assert.match(status.output, /\*\*XP:\*\* 10/)

const completion = await complete.execute(
  {
    result: "Built the approved local status UI.",
    approvalEvidence: "Kakudou explicitly approved the UI implementation in the current conversation.",
    verification: "Independent validation confirmed the UI renders progression state and does not expose private memory.",
  },
  { sessionID: "s1", agent: "osho" },
)
assert.match(completion.output, /immediately unlocked Level 3/)

status = await statusTool.execute({}, { sessionID: "s1", agent: "osho" })
assert.match(status.output, /\*\*Level:\*\* 3/)
assert.match(status.output, /Level 3 evolution:\*\* pending/)
assert.match(status.output, /Level 2: I want my own status UI/)

// A gadget-only appendix may use a skill and delegation, but it must not earn
// the effective-work bonus. Only base + successful completion are added.
const gadgetInbox = enqueueUserInbox({ inboxID: "inbox-gadget", text: "hello" })
emit({ type: "session.execution.started", data: { sessionID: "s1" } })
deliverUserInbox(gadgetInbox)
emit({ type: "session.step.started", data: { sessionID: "s1", agent: "osho" } })
await sleep()
await hooks.get("execute.after")({
  tool: "skill",
  input: { name: "97-gadget-random-news" },
  sessionID: "s1",
  agent: "osho",
  result: { ok: true },
})
await hooks.get("execute.after")({
  tool: "subagent",
  sessionID: "s1",
  agent: "osho",
  result: { ok: true },
})
emit({ type: "session.execution.succeeded", data: { sessionID: "s1" } })
await sleep(60)
status = await statusTool.execute({}, { sessionID: "s1", agent: "osho" })
assert.match(status.output, /\*\*XP:\*\* 12/)

// Retry of the same inbox input: an interrupted attempt grants only the
// base interaction point. A later successful retry may add the missing
// completion/work components, but never a second base award.
const retryInbox = enqueueUserInbox({ inboxID: "inbox-retry", text: "retry me" })
emit({ type: "session.execution.started", data: { sessionID: "s1" } })
deliverUserInbox(retryInbox)
emit({ type: "session.step.started", data: { sessionID: "s1", agent: "osho" } })
emit({ type: "session.execution.interrupted", data: { sessionID: "s1" } })
await sleep(60)
status = await statusTool.execute({}, { sessionID: "s1", agent: "osho" })
assert.match(status.output, /\*\*XP:\*\* 13/)

emit({ type: "session.execution.started", data: { sessionID: "s1" } })
// OpenCode may redeliver the same inbox item while retrying an interrupted
// execution. The inbox ID, rather than event count, is the deduplication key.
deliverUserInbox(retryInbox)
emit({ type: "session.step.started", data: { sessionID: "s1", agent: "osho" } })
await sleep()
await hooks.get("execute.after")({
  tool: "subagent",
  sessionID: "s1",
  agent: "osho",
  result: { ok: true },
})
emit({ type: "session.execution.succeeded", data: { sessionID: "s1" } })
await sleep(60)
status = await statusTool.execute({}, { sessionID: "s1", agent: "osho" })
assert.match(status.output, /\*\*XP:\*\* 17/)
assert.match(status.output, /Interactions: 4/)

await assert.rejects(
  () => statusTool.execute({}, { sessionID: "s1", agent: "kyosha" }),
  /PRIMARY_AGENT_REQUIRED/,
)

const persisted = JSON.parse(await readFile(stateFile, "utf8"))
assert.equal(persisted.level, 3)
assert.equal(persisted.xp, 17)
assert.equal(persisted.evolutions.length, 1)
assert.equal(persisted.pendingEvolution.level, 3)

await cleanup()
delete globalThis[bridgeKey]
await rm(root, { recursive: true, force: true })

console.log("otsumi-progression-v2 runtime: PASS")
