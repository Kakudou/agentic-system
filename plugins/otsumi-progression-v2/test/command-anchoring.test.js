import assert from "node:assert/strict"
import { mkdtemp, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import test from "node:test"

import plugin from "../index.js"

const bridgeKey = Symbol.for("kakudou.mode-router.v2.bridge")
const MARKER = '<otsumi-progression-command action="status" />'

async function* emptyEvents() {}

async function setupHarness(t) {
  const root = await mkdtemp(join(tmpdir(), "otsumi-progression-anchoring-test-"))
  let contextHook = null

  globalThis[bridgeKey] = {
    async pluginDecisionFor(_sessionID, pluginID) {
      return {
        mode: "dev",
        managed: pluginID === "kakudou.otsumi-progression",
        enabled: pluginID === "kakudou.otsumi-progression",
        reason: "allow",
      }
    },
    async modeFor() {
      return "dev"
    },
    agentFor() {
      return "osho"
    },
    resolveRequest(event) {
      const latest = event.messages.at(-1)
      return {
        sessionID: event.sessionID,
        agent: event.agent,
        inputText: typeof latest?.content === "string" ? latest.content.trim() : "",
        inputAt: Date.now(),
      }
    },
  }

  const cleanup = await plugin.setup({
    options: { stateFile: join(root, "state.json") },
    command: { async transform(callback) { await callback({ add() {} }) } },
    event: { subscribe: () => emptyEvents() },
    session: {
      async hook(name, callback) {
        assert.equal(name, "context")
        contextHook = callback
      },
      async get() {
        return { data: {} }
      },
      async prompt() {},
    },
    tool: { async transform() {}, async hook() {} },
  })

  t.after(async () => {
    await cleanup()
    delete globalThis[bridgeKey]
    await rm(root, { recursive: true, force: true })
  })

  return contextHook
}

function request(sessionID, content) {
  return {
    sessionID,
    agent: "osho",
    system: [{ text: "base" }],
    messages: [{ id: `message-${sessionID}`, role: "user", content }],
    tools: {},
  }
}

test("the /otsumi marker runs only when it is the entire trimmed user text", { concurrency: false }, async (t) => {
  const contextHook = await setupHarness(t)

  for (const [sessionID, content] of [
    ["exact", MARKER],
    ["whitespace", `\n  ${MARKER} \t\n`],
  ]) {
    const event = request(sessionID, content)
    await contextHook(event)
    assert.match(event.messages[0].content, /runtime already executed this read-only control command/)
    assert.match(event.system[0].text, /<otsumi-progression-command-result>/)
  }
})

test("a /otsumi marker inside a sentence or quote changes nothing and is not replaced", { concurrency: false }, async (t) => {
  const contextHook = await setupHarness(t)

  for (const [index, content] of [
    `What does ${MARKER} return?`,
    `"${MARKER}"`,
    `> ${MARKER}\nWhy is this in my log?`,
  ].entries()) {
    const event = request(`embedded-${index}`, content)
    await contextHook(event)
    assert.equal(event.messages[0].content, content, "user text was rewritten")
    assert.doesNotMatch(event.system[0].text, /otsumi-progression-command-result/)
  }
})
