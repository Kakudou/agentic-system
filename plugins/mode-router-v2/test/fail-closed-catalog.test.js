import assert from "node:assert/strict"
import { mkdtemp, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import test from "node:test"

import { loadModeRouterPlugin } from "./plugin-loader.js"

const plugin = await loadModeRouterPlugin()
const BRIDGE_KEY = Symbol.for("kakudou.mode-router.v2.bridge")

async function* emptyEvents() {}

async function setupHarness(t) {
  const root = await mkdtemp(join(tmpdir(), "mode-router-fail-closed-test-"))
  const configPath = join(root, "modes.json")
  await writeFile(configPath, JSON.stringify({
    version: 1,
    default_mode: "dev",
    managed_prefixes: [],
    mode: [
      { name: "dev", prefixes_allowed: ["05-dev-*"] },
      { name: "chatbot", prefixes_allowed: ["09-rp-*"] },
    ],
  }))

  const priorBun = globalThis.Bun
  const priorHome = process.env.HOME
  const priorBridge = globalThis[BRIDGE_KEY]
  globalThis.Bun = { YAML: { parse: JSON.parse } }
  process.env.HOME = root

  const contextHooks = new Map()
  let cleanup
  try {
    cleanup = await plugin.setup({
      options: { config: configPath },
      command: { async transform(callback) { callback({ add() {} }) } },
      event: { subscribe: () => emptyEvents() },
      session: {
        async get({ sessionID }) {
          return { data: { id: sessionID } }
        },
        async hook(name, callback) {
          contextHooks.set(name, callback)
        },
      },
      tool: { async hook() {} },
    })
  } finally {
    if (priorHome === undefined) delete process.env.HOME
    else process.env.HOME = priorHome
  }

  t.after(async () => {
    await cleanup?.()
    globalThis.Bun = priorBun
    if (priorBridge === undefined) delete globalThis[BRIDGE_KEY]
    else globalThis[BRIDGE_KEY] = priorBridge
    await rm(root, { recursive: true, force: true })
  })

  return contextHooks.get("context")
}

function advertisement() {
  return [
    "<available_skills>",
    "<skill><id>05-dev-code-review</id></skill>",
    "<skill><id>09-rp-chatbot-dialogue</id></skill>",
    "<skill><id>opencode</id></skill>",
    "<skill><id>42-unmanaged-helper</id></skill>",
    "</available_skills>",
  ].join("")
}

function assertManagedRemoved(text) {
  assert.doesNotMatch(text, /05-dev-code-review/, "managed dev skill still advertised")
  assert.doesNotMatch(text, /09-rp-chatbot-dialogue/, "managed chatbot skill still advertised")
  assert.match(text, /<id>opencode<\/id>/, "unmanaged skill was removed")
  assert.match(text, /<id>42-unmanaged-helper<\/id>/, "unmanaged JD skill was removed")
}

test("the context-hook error path filters managed skills from the catalog (fail closed)", async (t) => {
  const contextHook = await setupHarness(t)
  const event = {
    system: [{ text: advertisement() }],
    messages: [{ role: "user", content: "trigger error path" }],
    tools: {},
  }
  Object.defineProperty(event, "sessionID", {
    enumerable: true,
    get() {
      throw new Error("synthetic identity failure")
    },
  })

  const priorError = console.error
  console.error = () => {}
  try {
    await contextHook(event)
  } finally {
    console.error = priorError
  }

  const text = event.system.map((part) => part.text).join("\n")
  assert.match(text, /mode-router-skill-routing-error/)
  assertManagedRemoved(text)
})

test("the unresolved-identity path filters managed skills from the catalog", async (t) => {
  const contextHook = await setupHarness(t)
  const event = {
    system: [{ text: advertisement() }],
    messages: [{ role: "user", content: "uncorrelated request" }],
    tools: {},
  }

  await contextHook(event)

  const text = event.system.map((part) => part.text).join("\n")
  assert.match(text, /unresolved="true"/)
  assertManagedRemoved(text)
})
