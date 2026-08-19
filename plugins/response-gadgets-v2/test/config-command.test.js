import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import test from "node:test"

import plugin from "../index.js"

const BRIDGE_KEY = Symbol.for("kakudou.mode-router.v2.bridge")
const COMMAND_MARKER = '<opencode-response-gadget action="$ARGUMENTS" />'

function rawConfig(probabilities = {}) {
  return {
    version: 1,
    primary_agent: "osho",
    require_mode_router: true,
    modes: ["dev", "dev-python", "video-edit"],
    gadgets: [
      {
        name: "random-srs",
        skill: "97-gadget-random-srs",
        probability: probabilities["random-srs"] ?? 0.15,
      },
      {
        name: "random-news",
        skill: "97-gadget-random-news",
        probability: probabilities["random-news"] ?? 0.05,
      },
      {
        name: "random-fun-facts",
        skill: "97-gadget-random-fun-facts",
        probability: probabilities["random-fun-facts"] ?? 0.05,
      },
    ],
  }
}

async function createConfig(t, config = rawConfig()) {
  const root = await mkdtemp(join(tmpdir(), "response-gadgets-test-"))
  const path = join(root, "config.json")
  await writeFile(path, JSON.stringify(config, null, 2) + "\n")
  t.after(() => rm(root, { recursive: true, force: true }))
  return path
}

function installRuntime(t) {
  const previousBun = globalThis.Bun
  const previousBridge = globalThis[BRIDGE_KEY]

  globalThis.Bun = { YAML: { parse: JSON.parse } }
  globalThis[BRIDGE_KEY] = {
    resolveRequest(event) {
      return {
        sessionID: event.sessionID ?? null,
        agent: event.agent ?? null,
        inputText: event.inputText ?? "",
      }
    },
    async modeFor() {
      return "dev"
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

async function setupHarness(t, config, options = {}) {
  const commands = new Map()
  const contextHooks = new Map()
  const toolHooks = new Map()
  const ctx = {
    options: { ...options, config },
    command: {
      async transform(callback) {
        callback({
          update(name, update) {
            const command = {}
            update(command)
            commands.set(name, command)
          },
        })
      },
    },
    session: {
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

  const cleanup = await plugin.setup(ctx)
  t.after(async () => cleanup?.())
  return {
    commands,
    contextHook: contextHooks.get("context"),
    executeBefore: toolHooks.get("execute.before"),
  }
}

function commandEvent(action, tools = {}) {
  return {
    sessionID: `command-${action || "status"}`,
    agent: "osho",
    inputText: `/gadget${action ? ` ${action}` : ""}`,
    system: [{ text: "base system" }],
    messages: [{
      role: "user",
      content: `<opencode-response-gadget action="${action}" />`,
    }],
    tools,
  }
}

function ordinaryEvent(sessionID, text = "ordinary request", tools = {}) {
  return {
    sessionID,
    agent: "osho",
    inputText: text,
    system: [{ text: "base system" }],
    messages: [{ role: "user", id: `${sessionID}-user`, content: text }],
    tools,
  }
}

function renderedSystem(event) {
  return event.system.map((part) => typeof part === "string" ? part : part.text).join("\n")
}

test("registers /gadget and reports the authoritative configuration without touching native tools", async (t) => {
  installRuntime(t)
  const config = await createConfig(t)
  const { commands, contextHook } = await setupHarness(t, config)

  const command = commands.get("gadget")
  assert.ok(command, "the /gadget command was not registered")
  assert.equal(command.template, COMMAND_MARKER)
  assert.match(command.description, /inspect|probabilit/i)

  const marker = Symbol("native-marker")
  const readDefinition = { description: "Read", input: { type: "object" } }
  const tools = { read: readDefinition, [marker]: { preserved: true } }
  const keys = Reflect.ownKeys(tools)
  const bytes = JSON.stringify(tools)
  const event = commandEvent("status", tools)

  await contextHook(event)

  assert.equal(event.tools, tools)
  assert.deepEqual(Reflect.ownKeys(event.tools), keys)
  assert.equal(JSON.stringify(event.tools), bytes)
  assert.equal(event.tools.read, readDefinition)
  assert.equal(event.tools[marker].preserved, true)

  const output = renderedSystem(event)
  assert.match(output, /Response Gadgets: HEALTHY/)
  assert.match(output, new RegExp(`Config: ${config.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`))
  assert.match(output, /Config revision: [a-f0-9]{12}/)
  assert.match(output, /Allowed modes: dev, dev-python, video-edit/)
  assert.match(output, /random-srs\s+->\s+97-gadget-random-srs\s+probability=0\.15/)
  assert.match(output, /random-news\s+->\s+97-gadget-random-news\s+probability=0\.05/)
  assert.match(output, /random-fun-facts\s+->\s+97-gadget-random-fun-facts\s+probability=0\.05/)
  assert.match(output, /Return the exact result below verbatim and do not call tools/)
  assert.doesNotMatch(output, /<response-gadget-runtime mode=/)
  assert.match(event.messages[0].content, /runtime already executed this control command/i)

  const emptyAction = commandEvent("")
  await contextHook(emptyAction)
  assert.match(renderedSystem(emptyAction), /Response Gadgets: HEALTHY/)
  assert.doesNotMatch(renderedSystem(emptyAction), /<response-gadget-runtime mode=/)

  const reload = commandEvent("reload")
  await contextHook(reload)
  assert.match(renderedSystem(reload), /Gadget configuration reloaded\. Revision: [a-f0-9]{12}/)
  assert.doesNotMatch(renderedSystem(reload), /<response-gadget-runtime mode=/)
})

test("uses a current raw gadget command without rewriting a historical marker", async (t) => {
  installRuntime(t)
  const config = await createConfig(t)
  const { contextHook } = await setupHarness(t, config)
  const historicalMarker = '<opencode-response-gadget action="reload" />'
  const event = {
    sessionID: "current-raw-gadget-command",
    agent: "osho",
    inputText: "/gadget status",
    system: [{ text: "base" }],
    messages: [
      { role: "user", content: historicalMarker },
      { role: "assistant", content: "Gadget configuration reloaded." },
      { role: "user", content: "/gadget status" },
    ],
    tools: {},
  }

  await contextHook(event)

  assert.equal(event.messages[0].content, historicalMarker)
  assert.match(event.messages[2].content, /runtime already executed this control command/i)
  assert.match(renderedSystem(event), /Response Gadgets: HEALTHY/)
  assert.doesNotMatch(renderedSystem(event), /Gadget configuration reloaded/)
})

test("ignores historical gadget commands and stale raw tracking on a later ordinary turn", async (t) => {
  installRuntime(t)
  const config = await createConfig(t, rawConfig({
    "random-srs": 1,
    "random-news": 0,
    "random-fun-facts": 0,
  }))
  const { contextHook } = await setupHarness(t, config)
  const historicalMarker = '<opencode-response-gadget action="status" />'
  const event = {
    sessionID: "historical-gadget-command",
    agent: "osho",
    inputText: "/gadget status",
    system: [{ text: "base" }],
    messages: [
      { role: "user", content: historicalMarker },
      { role: "assistant", content: "Response Gadgets: HEALTHY" },
      {
        id: "ordinary-user-after-gadget-command",
        role: "user",
        content: "continue with ordinary processing",
      },
    ],
    tools: {},
  }

  await contextHook(event)

  const output = renderedSystem(event)
  assert.equal(event.messages[0].content, historicalMarker)
  assert.doesNotMatch(output, /<response-gadget-command>/)
  assert.match(output, /<response-gadget-runtime mode="dev">/)
  assert.match(output, /97-gadget-random-srs/)
})

test("atomically persists a global probability that a second plugin setup observes with deterministic one and zero gates", async (t) => {
  installRuntime(t)
  const config = await createConfig(t, rawConfig({
    "random-srs": 0,
    "random-news": 0,
    "random-fun-facts": 0,
  }))
  const first = await setupHarness(t, config)

  const mutation = commandEvent("random-srs 1")
  await first.contextHook(mutation)
  assert.match(renderedSystem(mutation), /Gadget probability updated: random-srs = 1/)
  assert.doesNotMatch(renderedSystem(mutation), /<response-gadget-runtime mode=/)

  const persisted = JSON.parse(await readFile(config, "utf8"))
  assert.equal(
    persisted.gadgets.find((gadget) => gadget.name === "random-srs").probability,
    1,
  )

  const statusAfterMutation = commandEvent("status")
  await first.contextHook(statusAfterMutation)
  assert.match(
    renderedSystem(statusAfterMutation),
    /random-srs\s+->\s+97-gadget-random-srs\s+probability=1/,
  )
  assert.doesNotMatch(
    renderedSystem(statusAfterMutation),
    /<response-gadget-runtime mode=/,
  )

  const second = await setupHarness(t, config)
  const event = ordinaryEvent("second-setup-session")
  await second.contextHook(event)

  const output = renderedSystem(event)
  assert.match(output, /<response-gadget-runtime mode="dev">/)
  assert.match(output, /97-gadget-random-srs/)
  assert.doesNotMatch(output, /97-gadget-random-news/)
  assert.doesNotMatch(output, /97-gadget-random-fun-facts/)
})

test("rejects invalid gadget mutations without changing the file or last-known-good revision", async (t) => {
  installRuntime(t)
  const config = await createConfig(t)
  const { contextHook } = await setupHarness(t, config)
  const before = await readFile(config, "utf8")
  const revision = createHash("sha256").update(before).digest("hex").slice(0, 12)

  const unknown = commandEvent("not-a-gadget 0.4")
  await contextHook(unknown)
  assert.match(renderedSystem(unknown), /Unknown gadget 'not-a-gadget'/)
  assert.equal(await readFile(config, "utf8"), before)

  const invalid = commandEvent("random-srs 1.1")
  await contextHook(invalid)
  assert.match(renderedSystem(invalid), /Invalid probability '1\.1'/)
  assert.equal(await readFile(config, "utf8"), before)

  const status = commandEvent("status")
  await contextHook(status)
  assert.match(renderedSystem(status), new RegExp(`Config revision: ${revision}`))
  assert.match(renderedSystem(status), /random-srs\s+->\s+97-gadget-random-srs\s+probability=0\.15/)
})

test("refreshes on context turns while retaining the last-known-good configuration after an invalid edit", async (t) => {
  installRuntime(t)
  const initial = JSON.stringify(rawConfig({
    "random-srs": 1,
    "random-news": 0,
    "random-fun-facts": 0,
  }), null, 2) + "\n"
  const config = await createConfig(t, JSON.parse(initial))
  const { contextHook } = await setupHarness(t, config)
  const revision = createHash("sha256").update(initial).digest("hex").slice(0, 12)

  await writeFile(config, "{ invalid JSON\n")

  const ordinary = ordinaryEvent("last-known-good-session")
  await contextHook(ordinary)
  assert.match(renderedSystem(ordinary), /97-gadget-random-srs/)

  const status = commandEvent("status")
  await contextHook(status)
  const output = renderedSystem(status)
  assert.match(output, /Response Gadgets: DEGRADED \(last-known-good config\)/)
  assert.match(output, new RegExp(`Config revision: ${revision}`))
  assert.match(output, /Config reload error:/)
  assert.doesNotMatch(output, /<response-gadget-runtime mode=/)

  const reload = commandEvent("reload")
  await contextHook(reload)
  assert.match(renderedSystem(reload), /Gadget configuration reload FAILED/)
  assert.match(renderedSystem(reload), /Continuing with the last-known-good configuration/)
  assert.doesNotMatch(renderedSystem(reload), /<response-gadget-runtime mode=/)
})

test("keeps persisted configuration authoritative over legacy option probabilities and blocks duplicate selected gadget calls", async (t) => {
  installRuntime(t)
  const config = await createConfig(t, rawConfig({
    "random-srs": 1,
    "random-news": 1,
    "random-fun-facts": 0,
  }))
  const { contextHook, executeBefore } = await setupHarness(t, config, {
    probabilities: {
      "97-gadget-random-srs": 0,
      "97-gadget-random-news": 0,
    },
    modes: ["chatbot"],
    primaryAgent: "someone-else",
    requireModeRouter: false,
  })

  const event = ordinaryEvent("duplicate-guard-session")
  await contextHook(event)
  const first = renderedSystem(event)
  assert.match(first, /97-gadget-random-srs/)
  assert.match(first, /97-gadget-random-news/)
  assert.doesNotMatch(first, /97-gadget-random-fun-facts/)

  await executeBefore({
    tool: "skill",
    sessionID: "duplicate-guard-session",
    input: { name: "97-gadget-random-srs" },
  })
  await assert.rejects(
    () => executeBefore({
      tool: "skill",
      sessionID: "duplicate-guard-session",
      input: { name: "97-gadget-random-srs" },
    }),
    /blocked duplicate invocation.*97-gadget-random-srs/i,
  )
  await assert.doesNotReject(() => executeBefore({
    tool: "skill",
    sessionID: "duplicate-guard-session",
    input: { name: "97-gadget-random-news" },
  }))
})
