import assert from "node:assert/strict"
import { mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import test from "node:test"

import { ConfigManager } from "../lib/config.js"
import { modeDecision } from "../lib/matcher.js"
import { loadModeRouterPlugin } from "./plugin-loader.js"

const plugin = await loadModeRouterPlugin()
const BRIDGE_KEY = Symbol.for("kakudou.mode-router.v2.bridge")
const MANAGED_PLUGIN = "kakudou.response-gadgets"

function pluginConfig(defaultMode = "dev") {
  return {
    version: 2,
    default_mode: defaultMode,
    managed_plugins: [
      "kakudou.response-gadgets",
      "kakudou.otsumi-progression",
      "kakudou.tencentdb-memory",
    ],
    mode: [
      {
        name: "dev",
        prefixes_allowed: ["05-dev-*"],
        plugins: [
          "kakudou.response-gadgets",
          "kakudou.otsumi-progression",
          "kakudou.tencentdb-memory",
        ],
      },
      {
        name: "dev-python",
        extends: "dev",
        prefixes_allowed: ["06-python-*"],
      },
      { name: "chatbot", prefixes_allowed: ["09-rp-*"] },
      { name: "gamemaster", prefixes_allowed: ["10-rpg-*"] },
    ],
  }
}

async function* emptyEvents() {}

async function setupBridge(t, { config = pluginConfig(), getSession } = {}) {
  const root = await mkdtemp(join(tmpdir(), "mode-router-plugin-bridge-test-"))
  const configPath = join(root, "modes.json")
  await writeFile(configPath, JSON.stringify(config))

  const priorBun = globalThis.Bun
  const priorHome = process.env.HOME
  const priorBridge = globalThis[BRIDGE_KEY]
  globalThis.Bun = { YAML: { parse: JSON.parse } }
  process.env.HOME = root

  const contextHooks = new Map()

  const ctx = {
    options: { config: configPath },
    command: { async transform(callback) { callback({ update() {} }) } },
    event: { subscribe: () => emptyEvents() },
    session: {
      async get(input) {
        return getSession ? getSession(input) : { data: { id: input.sessionID } }
      },
      async hook(name, callback) {
        contextHooks.set(name, callback)
      },
    },
    tool: { async hook() {} },
  }

  let cleanup
  try {
    cleanup = await plugin.setup(ctx)
  } catch (error) {
    globalThis.Bun = priorBun
    if (priorBridge === undefined) delete globalThis[BRIDGE_KEY]
    else globalThis[BRIDGE_KEY] = priorBridge
    await rm(root, { recursive: true, force: true })
    throw error
  } finally {
    if (priorHome === undefined) delete process.env.HOME
    else process.env.HOME = priorHome
  }

  const bridge = globalThis[BRIDGE_KEY]
  t.after(async () => {
    await cleanup?.()
    globalThis.Bun = priorBun
    if (priorBridge === undefined) delete globalThis[BRIDGE_KEY]
    else globalThis[BRIDGE_KEY] = priorBridge
    await rm(root, { recursive: true, force: true })
  })

  return { bridge, configPath, contextHook: contextHooks.get("context") }
}

function assertPluginDecision(decision, { mode, managed, enabled }) {
  assert.equal(decision?.mode, mode)
  assert.equal(decision?.managed, managed)
  assert.equal(decision?.enabled, enabled)
  assert.equal(typeof decision?.reason, "string")
}

test("mode resolution follows fork.sessionID recursively while retaining parentID support", async (t) => {
  const v1 = pluginConfig()
  v1.version = 1
  delete v1.managed_plugins
  for (const mode of v1.mode) delete mode.plugins

  const sessions = new Map([
    ["leaf", { id: "leaf", fork: { sessionID: "middle" } }],
    ["middle", { id: "middle", parentID: "root" }],
    ["root", { id: "root" }],
  ])
  const { bridge, contextHook } = await setupBridge(t, {
    config: v1,
    getSession({ sessionID }) {
      return { data: sessions.get(sessionID) }
    },
  })

  await contextHook({
    sessionID: "root",
    agent: "osho",
    system: [{ text: "base" }],
    messages: [{ role: "user", content: '<opencode-mode-router action="chatbot" />' }],
    tools: {},
  })

  assert.equal(await bridge.modeFor("leaf"), "chatbot")
})

test("bridge resolves recursive fork.sessionID lineage and still supports parentID", async (t) => {
  const lookups = []
  const sessions = new Map([
    ["leaf", { id: "leaf", fork: { sessionID: "middle" } }],
    ["middle", { id: "middle", parentID: "root" }],
    ["root", { id: "root" }],
  ])
  const { bridge } = await setupBridge(t, {
    getSession({ sessionID }) {
      lookups.push(sessionID)
      return { data: sessions.get(sessionID) }
    },
  })

  assert.equal(typeof bridge?.pluginDecisionFor, "function")
  const decision = await bridge.pluginDecisionFor("leaf", MANAGED_PLUGIN)

  assertPluginDecision(decision, { mode: "dev", managed: true, enabled: true })
  assert.deepEqual(lookups, ["leaf", "middle", "root"])
})

test("bridge fails managed plugins closed for unresolved lookup, cycle, depth, and session identity", async (t) => {
  const cases = [
    {
      name: "lookup failure",
      start: "lookup-failure",
      getSession() {
        throw new Error("session service unavailable")
      },
    },
    {
      name: "fork cycle",
      start: "cycle-a",
      getSession({ sessionID }) {
        return {
          data: {
            id: sessionID,
            fork: { sessionID: sessionID === "cycle-a" ? "cycle-b" : "cycle-a" },
          },
        }
      },
    },
    {
      name: "excessive lineage depth",
      start: "depth-0",
      getSession({ sessionID }) {
        const depth = Number(sessionID.slice("depth-".length))
        return {
          data: depth >= 128
            ? { id: sessionID }
            : { id: sessionID, fork: { sessionID: `depth-${depth + 1}` } },
        }
      },
    },
  ]

  for (const item of cases) {
    await t.test(item.name, async (t) => {
      const warnings = []
      const priorWarn = console.warn
      console.warn = (...args) => warnings.push(args)
      try {
        const { bridge } = await setupBridge(t, { getSession: item.getSession })
        assert.equal(typeof bridge?.pluginDecisionFor, "function")
        const decision = await bridge.pluginDecisionFor(item.start, MANAGED_PLUGIN)
        assertPluginDecision(decision, { mode: null, managed: true, enabled: false })
      } finally {
        console.warn = priorWarn
      }
    })
  }

  const { bridge } = await setupBridge(t)
  assert.equal(typeof bridge?.pluginDecisionFor, "function")
  assertPluginDecision(
    await bridge.pluginDecisionFor(null, MANAGED_PLUGIN),
    { mode: null, managed: true, enabled: false },
  )
  assertPluginDecision(
    await bridge.pluginDecisionFor(null, "example.unmanaged-plugin"),
    { mode: null, managed: false, enabled: true },
  )
})

test("bridge disables managed plugins in chatbot and gamemaster", async (t) => {
  for (const mode of ["chatbot", "gamemaster"]) {
    await t.test(mode, async (t) => {
      const { bridge } = await setupBridge(t, { config: pluginConfig(mode) })
      assert.equal(typeof bridge?.pluginDecisionFor, "function")
      assertPluginDecision(
        await bridge.pluginDecisionFor(`${mode}-session`, MANAGED_PLUGIN),
        { mode, managed: true, enabled: false },
      )
    })
  }
})

test("plugin config reload keeps last-known-good policy and unchanged skill decisions", async (t) => {
  const root = await mkdtemp(join(tmpdir(), "mode-router-plugin-config-test-"))
  const configPath = join(root, "modes.json")
  const priorBun = globalThis.Bun
  globalThis.Bun = { YAML: { parse: JSON.parse } }
  t.after(async () => {
    globalThis.Bun = priorBun
    await rm(root, { recursive: true, force: true })
  })

  await writeFile(configPath, JSON.stringify(pluginConfig()))
  const manager = new ConfigManager(configPath)
  await manager.initialize()
  const beforeConfig = manager.current
  const beforeSkill = modeDecision("05-dev-code-review", "dev", beforeConfig)

  await writeFile(configPath, JSON.stringify({ ...pluginConfig(), managed_plugins: "not-a-list" }))
  const refresh = await manager.refresh({ force: true })

  assert.equal(refresh.ok, false)
  assert.equal(refresh.changed, false)
  assert.equal(manager.current, beforeConfig)
  assert.deepEqual(modeDecision("05-dev-code-review", "dev", manager.current), beforeSkill)
  assert.equal(typeof manager.lastError, "string")
})

test("mode-router imports no managed plugin consumer and creates no static plugin cycle", async () => {
  const root = new URL("../", import.meta.url)
  const files = ["index.js"]
  for (const entry of await readdir(new URL("../lib/", import.meta.url))) {
    if (entry.endsWith(".js")) files.push(`lib/${entry}`)
  }

  for (const file of files) {
    const source = await readFile(new URL(file, root), "utf8")
    const imports = [...source.matchAll(/from\s+["']([^"']+)["']/g)].map((match) => match[1])
    assert.equal(
      imports.every((specifier) => specifier.startsWith("node:") || specifier.startsWith("./")),
      true,
      `${file} imports outside mode-router: ${imports.join(", ")}`,
    )
    assert.doesNotMatch(source, /response-gadgets-v2|otsumi-progression-v2|tencentdb-agent-memory/)
  }
})
