import assert from "node:assert/strict"
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import test from "node:test"

import plugin from "../index.js"

const BRIDGE_KEY = Symbol.for("kakudou.mode-router.v2.bridge")
const DENIAL = "response-gadgets: disabled by authoritative mode-router policy"
const MARKER = '<opencode-response-gadget action="random-srs 0.25" />'

function rawConfig(probability = 1) {
  return {
    version: 1,
    primary_agent: "osho",
    gadgets: [{
      name: "random-srs",
      skill: "97-gadget-random-srs",
      probability,
    }],
  }
}

async function createConfig(t) {
  const root = await mkdtemp(join(tmpdir(), "response-gadgets-marker-test-"))
  const path = join(root, "config.json")
  await writeFile(path, JSON.stringify(rawConfig(), null, 2) + "\n")
  t.after(() => rm(root, { recursive: true, force: true }))
  return path
}

function installRuntime(t, { enabled = true } = {}) {
  const previousBun = globalThis.Bun
  const previousBridge = globalThis[BRIDGE_KEY]
  globalThis.Bun = { YAML: { parse: JSON.parse } }
  globalThis[BRIDGE_KEY] = {
    resolveRequest(event) {
      return {
        sessionID: event?.sessionID ?? null,
        agent: event?.agent ?? null,
        inputText: event?.inputText ?? "",
      }
    },
    agentFor() {
      return null
    },
    async pluginDecisionFor(sessionID) {
      return {
        mode: sessionID ? (enabled ? "dev" : "chatbot") : null,
        managed: true,
        enabled: Boolean(sessionID) && enabled,
      }
    },
    async decisionFor() {
      return { allowed: true, mode: "dev" }
    },
  }
  t.after(() => {
    globalThis.Bun = previousBun
    if (previousBridge === undefined) delete globalThis[BRIDGE_KEY]
    else globalThis[BRIDGE_KEY] = previousBridge
  })
}

async function contextHookFor(t, config) {
  const hooks = new Map()
  const ctx = {
    options: { config },
    command: { async transform(callback) { callback({ add() {} }) } },
    session: {
      async hook(name, callback) {
        hooks.set(name, callback)
      },
    },
    tool: {
      async hook() {},
      async transform(callback) {
        callback({ add() {} })
      },
    },
  }
  await plugin.setup(ctx)
  return hooks.get("context")
}

function event(sessionID, text, agent = "osho") {
  return {
    sessionID,
    agent,
    inputText: text,
    system: [{ text: "base" }],
    messages: [{ role: "user", id: `${sessionID}-user`, content: text }],
    tools: {},
  }
}

function renderedSystem(value) {
  return value.system.map((part) => typeof part === "string" ? part : part.text).join("\n")
}

test("a marker quoted inside a longer user message is not a gadget command", async (t) => {
  installRuntime(t)
  const config = await createConfig(t)
  const contextHook = await contextHookFor(t, config)
  const before = await readFile(config, "utf8")
  const text = `Why does the plugin react to ${MARKER} in my notes?`
  const quoted = event("quoted-marker", text)

  await contextHook(quoted)

  assert.equal(quoted.messages[0].content, text, "a quoted marker must not rewrite the prompt")
  assert.doesNotMatch(renderedSystem(quoted), /<response-gadget-command>/)
  assert.equal(await readFile(config, "utf8"), before, "a quoted marker must not write config")
})

test("a non-primary agent never executes a gadget command", async (t) => {
  installRuntime(t)
  const config = await createConfig(t)
  const contextHook = await contextHookFor(t, config)
  const before = await readFile(config, "utf8")

  for (const text of [MARKER, "/gadget random-srs 0.25"]) {
    const subagent = event(`subagent-${text.length}`, text, "kyosha")
    await contextHook(subagent)

    assert.equal(subagent.messages[0].content, text, `subagent prompt rewritten for ${text}`)
    assert.doesNotMatch(renderedSystem(subagent), /<response-gadget-command>/)
    assert.equal(await readFile(config, "utf8"), before, `subagent wrote config for ${text}`)
  }

  // Positive control: the exact same command from the primary agent executes.
  const primary = event("primary-command", MARKER)
  await contextHook(primary)
  assert.match(renderedSystem(primary), /Gadget probability updated: random-srs = 0\.25/)
})

test("a disabled plugin does not replace a non-command message that quotes a marker", async (t) => {
  installRuntime(t, { enabled: false })
  const config = await createConfig(t)
  const contextHook = await contextHookFor(t, config)
  const text = `Please explain this snippet: ${MARKER}`
  const quoted = event("disabled-quoted-marker", text)

  await contextHook(quoted)

  assert.equal(quoted.messages[0].content, text, "a quoted marker must not be replaced while disabled")
  assert.doesNotMatch(renderedSystem(quoted), new RegExp(DENIAL))

  // Positive control: an exact marker still receives the deterministic denial.
  const exact = event("disabled-exact-marker", MARKER)
  await contextHook(exact)
  assert.match(renderedSystem(exact), new RegExp(DENIAL))
})
