import assert from "node:assert/strict"
import { mkdtemp, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import test from "node:test"

import { loadModeRouterPlugin } from "./plugin-loader.js"

const plugin = await loadModeRouterPlugin()

async function* emptyEvents() {}

function restrictiveConfig() {
  return {
    version: 1,
    default_mode: "chatbot",
    managed_prefixes: [],
    mode: [
      {
        name: "dev",
        prefixes_allowed: ["05-dev-*"],
        // Legacy fields must carry no runtime authority.
        agents_allowed: ["kyosha"],
        tools_denied: ["read", "subagent"],
      },
      {
        name: "chatbot",
        prefixes_allowed: ["09-rp-*"],
        agents_allowed: ["kyosha"],
        tools_denied: ["read", "subagent"],
      },
    ],
  }
}

async function setupHarness(
  t,
  rawConfig = restrictiveConfig(),
  { getSession = ({ sessionID }) => ({ data: { id: sessionID } }) } = {},
) {
  const root = await mkdtemp(join(tmpdir(), "mode-router-runtime-test-"))
  const config = join(root, "modes.json")
  await writeFile(config, JSON.stringify(rawConfig))

  const priorBun = globalThis.Bun
  const priorHome = process.env.HOME
  const bridgeKey = Symbol.for("kakudou.mode-router.v2.bridge")
  const priorBridge = globalThis[bridgeKey]
  globalThis.Bun = { YAML: { parse: JSON.parse } }
  process.env.HOME = root

  const contextHooks = new Map()
  const toolHooks = new Map()
  const ctx = {
    options: { config },
    command: {
      async transform(callback) {
        callback({
          update(_name, update) {
            update({})
          },
        })
      },
    },
    event: {
      subscribe: () => emptyEvents(),
    },
    session: {
      async get(input) {
        return getSession(input)
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
    if (priorBridge === undefined) delete globalThis[bridgeKey]
    else globalThis[bridgeKey] = priorBridge
    await rm(root, { recursive: true, force: true })
  })

  return {
    contextHook: contextHooks.get("context"),
    executeBefore: toolHooks.get("execute.before"),
  }
}

function nativeToolFixture() {
  const readSchema = {
    type: "object",
    properties: { path: { type: "string" } },
    required: ["path"],
  }
  const subagentSchema = {
    type: "object",
    properties: { agent: { type: "string" } },
    required: ["agent"],
  }
  const readDefinition = {
    description: "Read a file",
    input: readSchema,
  }
  const subagentDefinition = {
    description: "Launch a harness subagent",
    input: subagentSchema,
  }
  const skillDefinition = {
    description: [
      "<available_skills>",
      "<skill><id>05-dev-code-review</id><name>review</name></skill>",
      "<skill><id>opencode</id><name>OpenCode</name></skill>",
      "</available_skills>",
    ].join(""),
    input: { type: "object" },
  }
  const marker = Symbol("native-tool-record-marker")
  const tools = {
    read: readDefinition,
    subagent: subagentDefinition,
    skill: skillDefinition,
    [marker]: { preserved: true },
  }

  return {
    tools,
    marker,
    keys: Reflect.ownKeys(tools),
    bytes: JSON.stringify(tools),
    readDefinition,
    readSchema,
    subagentDefinition,
    subagentSchema,
  }
}

function assertNativeToolsUntouched(event, fixture) {
  assert.equal(event.tools, fixture.tools, "tool record identity changed")
  assert.deepEqual(Reflect.ownKeys(event.tools), fixture.keys, "tool keys changed")
  assert.equal(JSON.stringify(event.tools), fixture.bytes, "tool record changed deeply")
  assert.equal(event.tools.read, fixture.readDefinition, "read definition identity changed")
  assert.equal(event.tools.read.input, fixture.readSchema, "read schema identity changed")
  assert.equal(
    event.tools.subagent,
    fixture.subagentDefinition,
    "subagent definition identity changed",
  )
  assert.equal(
    event.tools.subagent.input,
    fixture.subagentSchema,
    "subagent schema identity changed",
  )
  assert.equal(event.tools[fixture.marker].preserved, true)
}

test("registers the current mutable pre-model context hook", async (t) => {
  const root = await mkdtemp(join(tmpdir(), "mode-router-hook-test-"))
  const config = join(root, "modes.json")
  await writeFile(
    config,
    JSON.stringify({
      version: 1,
      default_mode: "dev",
      managed_prefixes: ["05-dev-*"],
      mode: [{ name: "dev", prefixes_allowed: ["05-dev-*"] }],
    }),
  )

  const priorBun = globalThis.Bun
  globalThis.Bun = { YAML: { parse: JSON.parse } }
  t.after(async () => {
    globalThis.Bun = priorBun
    await rm(root, { recursive: true, force: true })
  })

  const modelHooks = []
  const ctx = {
    options: { config },
    command: {
      async transform(callback) {
        callback({ update() {} })
      },
    },
    event: {
      subscribe: () => emptyEvents(),
    },
    session: {
      async hook(name) {
        modelHooks.push(name)
      },
    },
    tool: {
      async hook() {},
    },
  }

  const cleanup = await plugin.setup(ctx)
  t.after(cleanup)

  assert.deepEqual(modelHooks, ["context"])
})

test("does not publish the authoritative bridge when setup fails before guards register", async (t) => {
  const root = await mkdtemp(join(tmpdir(), "mode-router-failed-setup-test-"))
  const config = join(root, "modes.json")
  await writeFile(
    config,
    JSON.stringify({
      version: 1,
      default_mode: "dev",
      managed_prefixes: ["05-dev-*"],
      mode: [{ name: "dev", prefixes_allowed: ["05-dev-*"] }],
    }),
  )

  const bridgeKey = Symbol.for("kakudou.mode-router.v2.bridge")
  const previousBridge = globalThis[bridgeKey]
  const sentinelBridge = { id: "pre-existing-bridge" }
  const priorBun = globalThis.Bun
  globalThis.Bun = { YAML: { parse: JSON.parse } }
  globalThis[bridgeKey] = sentinelBridge

  t.after(async () => {
    globalThis.Bun = priorBun
    if (previousBridge === undefined) delete globalThis[bridgeKey]
    else globalThis[bridgeKey] = previousBridge
    await rm(root, { recursive: true, force: true })
  })

  const ctx = {
    options: { config },
    command: {
      async transform() {
        throw new Error("command registration failed")
      },
    },
    event: {
      subscribe: () => emptyEvents(),
    },
    session: {
      async hook() {
        throw new Error("session guard must not register")
      },
    },
    tool: {
      async hook() {
        throw new Error("tool guard must not register")
      },
    },
  }

  await assert.rejects(plugin.setup(ctx), /command registration failed/)
  assert.equal(globalThis[bridgeKey], sentinelBridge)
})

test("keeps native tool definitions exactly untouched on every context path", async (t) => {
  const { contextHook } = await setupHarness(t)
  assert.equal(typeof contextHook, "function")

  const paths = [
    {
      name: "normal",
      event(fixture) {
        return {
          sessionID: "session-normal",
          system: [{
            text: "<available_skills><skill><id>05-dev-code-review</id></skill>" +
              "<skill><id>opencode</id></skill></available_skills>",
          }],
          messages: [{ role: "user", content: "ordinary request" }],
          tools: fixture.tools,
        }
      },
      verify(event) {
        assert.doesNotMatch(event.system[0].text, /05-dev-code-review/)
        assert.match(event.system[0].text, /opencode/)
      },
    },
    {
      name: "unresolved identity",
      event(fixture) {
        return {
          system: [{ text: "base" }],
          messages: [{ role: "user", content: "uncorrelated request" }],
          tools: fixture.tools,
        }
      },
    },
    {
      name: "mode command",
      event(fixture) {
        return {
          sessionID: "session-mode-command",
          system: [{ text: "base" }],
          messages: [{
            role: "user",
            content: '<opencode-mode-router action="status" />',
          }],
          tools: fixture.tools,
        }
      },
      verify(event) {
        assert.match(event.system[0].text, /Native tools .*untouched/i)
        assert.match(event.system[0].text, /Harness subagents .*untouched/i)
      },
    },
    {
      name: "blocked explicit managed skill slash",
      event(fixture) {
        return {
          sessionID: "session-blocked-slash",
          system: [{ text: "base" }],
          messages: [{ role: "user", content: "/05-dev-code-review inspect" }],
          tools: fixture.tools,
        }
      },
      verify(event) {
        assert.match(event.system[0].text, /mode-router-skill-block/)
      },
    },
    {
      name: "context hook error",
      event(fixture) {
        const event = {
          system: [{ text: "base" }],
          messages: [{ role: "user", content: "trigger error path" }],
          tools: fixture.tools,
        }
        Object.defineProperty(event, "sessionID", {
          enumerable: true,
          get() {
            throw new Error("synthetic identity failure")
          },
        })
        return event
      },
      captureErrors: true,
      verify(event, errors) {
        assert.match(event.system[0].text, /skill-routing-error/)
        assert.match(errors.flat().map(String).join(" "), /context skill routing failed closed/)
      },
    },
  ]

  for (const path of paths) {
    const fixture = nativeToolFixture()
    const event = path.event(fixture)
    const errors = []
    const priorConsoleError = console.error
    if (path.captureErrors) {
      console.error = (...args) => errors.push(args)
    }
    try {
      await contextHook(event)
    } finally {
      console.error = priorConsoleError
    }
    assertNativeToolsUntouched(event, fixture)
    path.verify?.(event, errors)
  }
})

test("passes native execute.before calls before identity or legacy mode restrictions", async (t) => {
  const { executeBefore } = await setupHarness(t)
  assert.equal(typeof executeBefore, "function")

  for (const [tool, input] of [
    ["read", { path: "/tmp/example" }],
    ["subagent", { agent: "fuhyo" }],
    ["skill", { name: "opencode" }],
  ]) {
    await assert.doesNotReject(() => executeBefore({ tool, input }))

    const event = { tool, input }
    Object.defineProperty(event, "sessionID", {
      get() {
        throw new Error(`session identity must not be read for native ${tool}`)
      },
    })
    await assert.doesNotReject(() => executeBefore(event))
    assert.equal(event.input, input)
  }

  await assert.doesNotReject(() =>
    executeBefore({
      tool: "read",
      sessionID: "legacy-restricted-read",
      input: { path: "/tmp/example" },
    }),
  )
  await assert.doesNotReject(() =>
    executeBefore({
      tool: "subagent",
      sessionID: "legacy-restricted-subagent",
      input: { agent: "fuhyo" },
    }),
  )
})

test("fails closed only for unavailable managed JohnnyDecimal calls", async (t) => {
  const { executeBefore } = await setupHarness(t)

  await assert.rejects(
    () => executeBefore({ tool: "skill", input: { name: "05-dev-code-review" } }),
    /managed skill.*no session ID/i,
  )
  await assert.rejects(
    () => executeBefore({ tool: "05-dev-code-review", input: {} }),
    /managed tool.*no session ID/i,
  )
  await assert.rejects(
    () => executeBefore({
      tool: "skill",
      sessionID: "blocked-carrier",
      input: { name: "05-dev-code-review" },
    }),
    /blocked managed skill.*chatbot/i,
  )
  await assert.rejects(
    () => executeBefore({
      tool: "05-dev-code-review",
      sessionID: "blocked-direct",
      input: {},
    }),
    /blocked managed tool.*chatbot/i,
  )

  await assert.doesNotReject(() =>
    executeBefore({
      tool: "skill",
      sessionID: "allowed-carrier",
      input: { name: "09-rp-chatbot-dialogue" },
    }),
  )
  await assert.doesNotReject(() =>
    executeBefore({
      tool: "09-rp-chatbot-dialogue",
      sessionID: "allowed-direct",
      input: {},
    }),
  )

  const unmanaged = { tool: "42-custom-tool", input: {} }
  Object.defineProperty(unmanaged, "sessionID", {
    get() {
      throw new Error("unmanaged JohnnyDecimal call must not resolve a session")
    },
  })
  await assert.doesNotReject(() => executeBefore(unmanaged))
})

test("fails managed JohnnyDecimal calls closed when session mode resolution fails", async (t) => {
  const { executeBefore } = await setupHarness(t, restrictiveConfig(), {
    getSession() {
      throw new Error("session lookup unavailable")
    },
  })

  const warnings = []
  const priorConsoleWarn = console.warn
  console.warn = (...args) => warnings.push(args)
  try {
    await assert.rejects(
      () => executeBefore({
        tool: "skill",
        sessionID: "unresolved-carrier",
        input: { name: "05-dev-code-review" },
      }),
      /managed skill.*no resolved runtime mode/i,
    )
    await assert.rejects(
      () => executeBefore({
        tool: "05-dev-code-review",
        sessionID: "unresolved-direct",
        input: {},
      }),
      /managed tool.*no resolved runtime mode/i,
    )

    await assert.doesNotReject(() => executeBefore({
      tool: "read",
      sessionID: "same-unresolved-runtime",
      input: { path: "/tmp/example" },
    }))
  } finally {
    console.warn = priorConsoleWarn
  }

  assert.equal(warnings.length, 2)
  assert.match(warnings.flat().map(String).join(" "), /session mode resolution unavailable/)
})
