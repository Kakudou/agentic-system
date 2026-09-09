import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { dirname, join, resolve } from "node:path"
import test from "node:test"

import { loadModeRouterPlugin } from "./plugin-loader.js"

const plugin = await loadModeRouterPlugin()
const BRIDGE_KEY = Symbol.for("kakudou.mode-router.v2.bridge")
const MANAGED_PLUGIN = "kakudou.response-gadgets"

function pluginConfig(defaultMode = "dev") {
  return {
    version: 2,
    default_mode: defaultMode,
    managed_plugins: [MANAGED_PLUGIN],
    mode: [
      {
        name: "dev",
        prefixes_allowed: ["05-dev-*"],
        plugins: [MANAGED_PLUGIN],
      },
      { name: "chatbot", prefixes_allowed: ["09-rp-*"] },
      { name: "gamemaster", prefixes_allowed: ["10-rpg-*"] },
    ],
  }
}

class FakeEventStream {
  constructor() {
    this.items = []
    this.waiters = []
    this.closed = false
  }

  [Symbol.asyncIterator]() {
    return this
  }

  next() {
    if (this.items.length > 0) return Promise.resolve({ value: this.items.shift(), done: false })
    if (this.closed) return Promise.resolve({ value: undefined, done: true })
    return new Promise((resolveNext) => this.waiters.push(resolveNext))
  }

  push(value) {
    const waiter = this.waiters.shift()
    if (waiter) waiter({ value, done: false })
    else this.items.push(value)
  }

  async return() {
    this.closed = true
    for (const waiter of this.waiters.splice(0)) waiter({ value: undefined, done: true })
    return { value: undefined, done: true }
  }
}

function stateFileFor(home, configPath) {
  const key = createHash("sha256")
    .update(`${process.cwd()}\0${resolve(configPath)}`)
    .digest("hex")
    .slice(0, 20)
  return join(home, ".cache", "opencode", "mode-router-v2", `${key}.json`)
}

function contextEvent(sessionID, text) {
  return {
    ...(sessionID ? { sessionID } : {}),
    agent: "osho",
    system: [{ text: "base" }],
    messages: [{ role: "user", content: text }],
    tools: {},
  }
}

function inboxEvent(sessionID, text) {
  return {
    type: "session.inbox.enqueued",
    data: {
      sessionID,
      inboxID: `inbox-${sessionID}`,
      item: {
        type: "user",
        payload: { text, agent: "osho" },
      },
    },
  }
}

async function eventually(predicate, message) {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    if (predicate()) return
    await new Promise((resolveNow) => setImmediate(resolveNow))
  }
  assert.fail(message)
}

async function setupInstances(
  t,
  definitions,
  { beforeSetup } = {},
) {
  const root = await mkdtemp(join(tmpdir(), "mode-router-multi-instance-test-"))
  const priorBun = globalThis.Bun
  const priorHome = process.env.HOME
  const priorBridge = globalThis[BRIDGE_KEY]
  globalThis.Bun = { YAML: { parse: JSON.parse } }
  process.env.HOME = root

  const configPaths = new Map()
  for (const definition of definitions) {
    const configName = definition.configName ?? "modes.json"
    if (configPaths.has(configName)) continue
    const configPath = join(root, configName)
    await writeFile(configPath, JSON.stringify(definition.config ?? pluginConfig()))
    configPaths.set(configName, configPath)
  }

  await beforeSetup?.({ root, configPaths })

  const instances = []
  try {
    for (const definition of definitions) {
      const contextHooks = new Map()
      const toolHooks = new Map()
      const stream = new FakeEventStream()
      const configPath = configPaths.get(definition.configName ?? "modes.json")
      const ctx = {
        options: { config: configPath },
        command: {
          async transform(callback) {
            callback({ update(_name, update) { update({}) } })
          },
        },
        event: { subscribe: () => stream },
        session: {
          async get(input) {
            return definition.getSession
              ? definition.getSession(input)
              : { data: { id: input.sessionID } }
          },
          async hook(name, callback) {
            contextHooks.set(name, callback)
          },
        },
        tool: {
          async hook(name, callback) {
            toolHooks.set(name, callback)
          },
        },
      }

      const rawCleanup = await plugin.setup(ctx)
      const instance = {
        bridge: globalThis[BRIDGE_KEY],
        configPath,
        contextHook: contextHooks.get("context"),
        executeBefore: toolHooks.get("execute.before"),
        stream,
        live: true,
        async cleanup() {
          if (!this.live) return
          this.live = false
          await rawCleanup?.()
        },
      }
      instances.push(instance)
    }
  } catch (error) {
    for (const instance of instances.toReversed()) await instance.cleanup()
    globalThis.Bun = priorBun
    if (priorHome === undefined) delete process.env.HOME
    else process.env.HOME = priorHome
    if (priorBridge === undefined) delete globalThis[BRIDGE_KEY]
    else globalThis[BRIDGE_KEY] = priorBridge
    await rm(root, { recursive: true, force: true })
    throw error
  }

  t.after(async () => {
    for (const instance of instances.toReversed()) await instance.cleanup()
    globalThis.Bun = priorBun
    if (priorHome === undefined) delete process.env.HOME
    else process.env.HOME = priorHome
    if (priorBridge === undefined) delete globalThis[BRIDGE_KEY]
    else globalThis[BRIDGE_KEY] = priorBridge
    await rm(root, { recursive: true, force: true })
  })

  return { root, configPaths, instances }
}

test("repeated setups share an immediate mode command with every bridge", async (t) => {
  const { instances: [instanceA, instanceB] } = await setupInstances(t, [{}, {}])
  const event = contextEvent("shared-command-session", "/mode chatbot")

  await instanceA.contextHook(event)
  const instanceBMode = await instanceB.bridge.modeFor("shared-command-session")
  const globalMode = await globalThis[BRIDGE_KEY].modeFor("shared-command-session")
  const decision = await instanceB.bridge.pluginDecisionFor(
    "shared-command-session",
    MANAGED_PLUGIN,
  )

  assert.match(event.system.map((item) => item.text).join("\n"), /mode="chatbot"/)
  assert.equal(instanceBMode, "chatbot")
  assert.equal(globalMode, "chatbot")
  assert.equal(decision.mode, "chatbot")
  assert.equal(decision.managed, true)
  assert.equal(decision.enabled, false)
  assert.equal(typeof decision.reason, "string")
})

test("an inbox event and context hook on different setups share identity, mode, and fork lineage", async (t) => {
  const sessions = new Map([
    ["shared-root", { id: "shared-root" }],
    ["shared-child", { id: "shared-child", fork: { sessionID: "shared-root" } }],
  ])
  const getSession = ({ sessionID }) => ({ data: sessions.get(sessionID) })
  const { instances: [instanceA, instanceB] } = await setupInstances(t, [
    { getSession },
    { getSession },
  ])

  instanceA.stream.push(inboxEvent("shared-root", "/mode chatbot"))
  await eventually(
    () => instanceA.bridge.agentFor("shared-root") === "osho",
    "instance A did not observe the inbox event",
  )

  const modeEvent = contextEvent(null, "/mode chatbot")
  await instanceB.contextHook(modeEvent)

  const childEvent = contextEvent("shared-child", "continue in the child session")
  await instanceA.contextHook(childEvent)
  const childMode = await instanceB.bridge.modeFor("shared-child")

  assert.match(modeEvent.system.map((item) => item.text).join("\n"), /mode="chatbot"/)
  assert.match(childEvent.system.map((item) => item.text).join("\n"), /mode="chatbot"/)
  assert.equal(childMode, "chatbot")
})

test("cleaning up the latest setup preserves the shared bridge while another setup is live", async (t) => {
  const { instances: [instanceA, instanceB] } = await setupInstances(t, [{}, {}])
  await instanceA.contextHook(contextEvent("cleanup-session", "/mode chatbot"))

  await instanceB.cleanup()

  assert.equal(typeof globalThis[BRIDGE_KEY]?.modeFor, "function")
  assert.equal(await globalThis[BRIDGE_KEY].modeFor("cleanup-session"), "chatbot")
})

test("the global bridge fails closed when live setups have conflicting config and state identities", async (t) => {
  await setupInstances(t, [
    { configName: "modes-a.json", config: pluginConfig("dev") },
    { configName: "modes-b.json", config: pluginConfig("chatbot") },
  ])

  const bridge = globalThis[BRIDGE_KEY]
  assert.equal(typeof bridge?.modeFor, "function")
  const mode = await bridge.modeFor("conflicting-runtime-session")
  const decision = await bridge.pluginDecisionFor("conflicting-runtime-session", MANAGED_PLUGIN)
  assert.equal(mode, null)
  assert.equal(decision.mode, null)
  assert.equal(decision.managed, true)
  assert.equal(decision.enabled, false)
})

test("an unresolved session cannot become default dev through another live setup", async (t) => {
  const warnings = []
  const priorWarn = console.warn
  console.warn = (...args) => warnings.push(args)
  try {
    const { instances: [instanceA, instanceB] } = await setupInstances(t, [
      {
        getSession() {
          throw new Error("session lookup unavailable")
        },
      },
      {},
    ])

    const instanceAMode = await instanceA.bridge.modeFor("shared-unresolved-session")
    const instanceBMode = await instanceB.bridge.modeFor("shared-unresolved-session")
    const decision = await globalThis[BRIDGE_KEY].pluginDecisionFor(
      "shared-unresolved-session",
      MANAGED_PLUGIN,
    )
    assert.equal(instanceAMode, null)
    assert.equal(instanceBMode, null)
    assert.equal(decision.mode, null)
    assert.equal(decision.enabled, false)
  } finally {
    console.warn = priorWarn
  }

  assert.match(warnings.flat().map(String).join(" "), /session mode resolution unavailable/)
})

test("shared setups preserve serialized state from each completed mode write", async (t) => {
  const { root, configPaths, instances: [instanceA, instanceB] } = await setupInstances(t, [{}, {}])
  await instanceA.contextHook(contextEvent("serialized-a", "/mode chatbot"))
  await instanceB.contextHook(contextEvent("serialized-b", "/mode gamemaster"))

  const payload = JSON.parse(
    await readFile(stateFileFor(root, configPaths.get("modes.json")), "utf8"),
  )
  assert.equal(payload.version, 1)
  assert.equal(payload.sessions["serialized-a"]?.mode, "chatbot")
  assert.equal(payload.sessions["serialized-b"]?.mode, "gamemaster")
  assert.equal(typeof payload.sessions["serialized-a"]?.updatedAt, "number")
  assert.equal(typeof payload.sessions["serialized-b"]?.updatedAt, "number")
})

test("shared setup pruning retains the 8000-entry policy without dropping either writer", async (t) => {
  const { root, configPaths, instances: [instanceA, instanceB] } = await setupInstances(
    t,
    [{}, {}],
    {
      async beforeSetup({ root, configPaths }) {
        const stateFile = stateFileFor(root, configPaths.get("modes.json"))
        const sessions = {}
        for (let index = 0; index < 10_000; index += 1) {
          sessions[`old-${index}`] = { mode: "dev", updatedAt: index + 1 }
        }
        await mkdir(dirname(stateFile), { recursive: true })
        await writeFile(stateFile, JSON.stringify({ version: 1, sessions }))
      },
    },
  )

  await instanceA.contextHook(contextEvent("fresh-a", "/mode chatbot"))
  await instanceB.contextHook(contextEvent("fresh-b", "/mode gamemaster"))

  const payload = JSON.parse(
    await readFile(stateFileFor(root, configPaths.get("modes.json")), "utf8"),
  )
  assert.equal(Object.keys(payload.sessions).length, 8001)
  assert.equal(payload.sessions["fresh-a"]?.mode, "chatbot")
  assert.equal(payload.sessions["fresh-b"]?.mode, "gamemaster")
  assert.equal(payload.sessions["old-0"], undefined)
})
