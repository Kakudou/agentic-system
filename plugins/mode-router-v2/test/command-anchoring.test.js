import assert from "node:assert/strict"
import { mkdtemp, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import test from "node:test"

import { replaceModeCommandPrompt, requestedModeAction } from "../lib/runtime.js"
import { loadModeRouterPlugin } from "./plugin-loader.js"

const plugin = await loadModeRouterPlugin()
const BRIDGE_KEY = Symbol.for("kakudou.mode-router.v2.bridge")
const MARKER = '<opencode-mode-router action="dev" />'

async function* emptyEvents() {}

function config() {
  return {
    version: 1,
    default_mode: "chatbot",
    managed_prefixes: [],
    mode: [
      { name: "dev", prefixes_allowed: ["05-dev-*"] },
      { name: "chatbot", prefixes_allowed: ["09-rp-*"] },
    ],
  }
}

async function setupHarness(t, sessions = new Map()) {
  const root = await mkdtemp(join(tmpdir(), "mode-router-anchoring-test-"))
  const configPath = join(root, "modes.json")
  await writeFile(configPath, JSON.stringify(config()))

  const priorBun = globalThis.Bun
  const priorHome = process.env.HOME
  const priorBridge = globalThis[BRIDGE_KEY]
  globalThis.Bun = { YAML: { parse: JSON.parse } }
  process.env.HOME = root

  const contextHooks = new Map()
  const ctx = {
    options: { config: configPath },
    command: { async transform(callback) { callback({ add() {} }) } },
    event: { subscribe: () => emptyEvents() },
    session: {
      async get({ sessionID }) {
        return { data: sessions.get(sessionID) ?? { id: sessionID } }
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

  return { contextHook: contextHooks.get("context"), bridge: globalThis[BRIDGE_KEY] }
}

function contextEvent(sessionID, content) {
  return {
    sessionID,
    agent: "osho",
    system: [{ text: "base" }],
    messages: [{ role: "user", content }],
    tools: {},
  }
}

function typedHostUserContextEvent(sessionID, text) {
  return {
    sessionID,
    agent: "osho",
    system: [{ text: "base" }],
    messages: [{ type: "user", text }],
    tools: {},
  }
}

test("requestedModeAction matches the marker only as the entire trimmed user text", () => {
  const event = (content) => ({ messages: [{ role: "user", content }] })

  assert.equal(requestedModeAction(event(MARKER)), "dev")
  assert.equal(requestedModeAction(event(`  \n${MARKER}\n\t `)), "dev")
  assert.equal(requestedModeAction(event(`please run ${MARKER} now`)), null)
  assert.equal(requestedModeAction(event(`"${MARKER}"`)), null)
  assert.equal(requestedModeAction(event(`> ${MARKER}`)), null)
  assert.equal(requestedModeAction(event(`${MARKER}\nand then explain it`)), null)
})

test("replaceModeCommandPrompt never rewrites a marker quoted inside a longer message", () => {
  const quoted = `The docs say to send ${MARKER} to switch.`
  const event = { messages: [{ role: "user", content: [{ type: "text", text: quoted }] }] }

  assert.equal(replaceModeCommandPrompt(event, "RESULT"), false)
  assert.equal(event.messages[0].content[0].text, quoted)
})

test("an exact marker switches the session mode", async (t) => {
  const { contextHook, bridge } = await setupHarness(t)
  const event = contextEvent("exact-session", MARKER)

  await contextHook(event)

  assert.match(event.system[0].text, /Mode switched to: dev/)
  assert.equal(await bridge.modeFor("exact-session"), "dev")
})

test("an exact marker surrounded by whitespace switches the session mode", async (t) => {
  const { contextHook, bridge } = await setupHarness(t)
  const event = contextEvent("whitespace-session", `\n   ${MARKER}  \n`)

  await contextHook(event)

  assert.match(event.system[0].text, /Mode switched to: dev/)
  assert.equal(await bridge.modeFor("whitespace-session"), "dev")
})

async function assertTypedHostRootCommand(t, action, expectedResult) {
  const { contextHook } = await setupHarness(t)
  const event = typedHostUserContextEvent(`typed-host-${action}`, `/mode ${action}`)

  await contextHook(event)

  assert.match(event.system[0].text, /<mode-router-command>/)
  assert.match(event.messages[0].text, /The mode-router runtime already executed this control command\./)
  assert.match(event.messages[0].text, expectedResult)
}

test("a typed host user /mode status command is rewritten after type-based user recognition", async (t) => {
  await assertTypedHostRootCommand(t, "status", /Mode Router: HEALTHY/)
})

test("a typed host user /mode list command is rewritten after type-based user recognition", async (t) => {
  await assertTypedHostRootCommand(t, "list", /Available modes:/)
})

test("a marker inside a sentence or quote changes nothing and is not replaced", async (t) => {
  const { contextHook, bridge } = await setupHarness(t)

  for (const [index, content] of [
    `Can you explain what ${MARKER} does?`,
    `"${MARKER}"`,
    `> ${MARKER}\nWhy did this appear in my log?`,
  ].entries()) {
    const sessionID = `embedded-session-${index}`
    const event = contextEvent(sessionID, content)

    await contextHook(event)

    assert.equal(event.messages[0].content, content, "user text was rewritten")
    assert.doesNotMatch(event.system[0].text, /<mode-router-command>/)
    assert.doesNotMatch(event.system[0].text, /Mode switched to/)
    assert.match(event.system[0].text, /mode="chatbot"/)
    assert.equal(await bridge.modeFor(sessionID), "chatbot")
  }
})

test("mode commands are ignored in child sessions", async (t) => {
  const sessions = new Map([
    ["parent-session", { id: "parent-session" }],
    ["child-session", { id: "child-session", parentID: "parent-session" }],
  ])
  const { contextHook, bridge } = await setupHarness(t, sessions)

  for (const content of [MARKER, "/mode dev"]) {
    const event = contextEvent("child-session", content)

    await contextHook(event)

    assert.equal(event.messages[0].content, content, "child command text was rewritten")
    assert.doesNotMatch(event.system[0].text, /<mode-router-command>/)
    assert.match(event.system[0].text, /mode="chatbot"/)
    assert.equal(await bridge.modeFor("child-session"), "chatbot")
    assert.equal(await bridge.modeFor("parent-session"), "chatbot")
  }

  // The same command in the top-level parent still works.
  const parentEvent = contextEvent("parent-session", MARKER)
  await contextHook(parentEvent)
  assert.match(parentEvent.system[0].text, /Mode switched to: dev/)
  assert.equal(await bridge.modeFor("parent-session"), "dev")
})
