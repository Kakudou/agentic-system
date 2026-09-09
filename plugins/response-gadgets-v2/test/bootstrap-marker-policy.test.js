import assert from "node:assert/strict"
import crypto from "node:crypto"
import { mkdtemp, rm, writeFile } from "node:fs/promises"
import { syncBuiltinESMExports } from "node:module"
import { tmpdir } from "node:os"
import { join } from "node:path"
import test from "node:test"

import plugin from "../index.js"

const BRIDGE_KEY = Symbol.for("kakudou.mode-router.v2.bridge")
const PLUGIN_ID = "kakudou.response-gadgets"
const GADGET_SKILL = "97-gadget-random-srs"
const FINGERPRINT = "0123456789abcdef".repeat(4)

function rawConfig(probability = 1) {
  return {
    version: 1,
    primary_agent: "osho",
    gadgets: [{
      name: "random-srs",
      skill: GADGET_SKILL,
      probability,
    }],
  }
}

function bootstrapMetadata(step, overrides = {}) {
  return {
    kind: "setup_template_step",
    templateSchemaVersion: 2,
    step,
    fingerprint: FINGERPRINT,
    ...overrides,
  }
}

function admittedUser(id, text, metadata) {
  return {
    id: `msg_${id}`,
    type: "user",
    time: { created: 1 },
    text,
    ...(metadata === undefined ? {} : { metadata }),
  }
}

function contextEvent(sessionID, text, metadata, messages) {
  return {
    sessionID,
    agent: "osho",
    inputText: text,
    system: [{ text: "base" }],
    messages: messages ?? [admittedUser(`${sessionID}_user`, text, metadata)],
    tools: {},
  }
}

function renderedSystem(event) {
  return event.system
    .map((part) => typeof part === "string" ? part : part.text)
    .join("\n")
}

async function createConfig(t, probability = 1) {
  const root = await mkdtemp(join(tmpdir(), "response-gadgets-bootstrap-test-"))
  const path = join(root, "config.json")
  await writeFile(path, JSON.stringify(rawConfig(probability), null, 2) + "\n")
  t.after(() => rm(root, { recursive: true, force: true }))
  return path
}

function installRuntime(t, options = {}) {
  const previousBun = globalThis.Bun
  const previousBridge = globalThis[BRIDGE_KEY]
  const state = {
    enabled: options.enabled ?? true,
    mode: options.mode ?? "dev",
    skillAllowed: options.skillAllowed ?? true,
    decisionQueue: [],
    parseCalls: 0,
    pluginChecks: 0,
    skillChecks: 0,
  }

  globalThis.Bun = {
    YAML: {
      parse(text) {
        state.parseCalls++
        return JSON.parse(text)
      },
    },
  }
  globalThis[BRIDGE_KEY] = {
    resolveRequest(event) {
      return {
        sessionID: event?.sessionID ?? null,
        agent: event?.agent ?? "osho",
        inputText: event?.inputText ?? "",
      }
    },
    agentFor() {
      return "osho"
    },
    async pluginDecisionFor(sessionID, pluginID) {
      state.pluginChecks++
      assert.equal(pluginID, PLUGIN_ID)
      return {
        mode: sessionID ? state.mode : null,
        managed: true,
        enabled: Boolean(sessionID) && state.enabled,
      }
    },
    async decisionFor(sessionID, skillID) {
      state.skillChecks++
      const allowed = state.decisionQueue.length
        ? state.decisionQueue.shift()
        : state.skillAllowed
      return {
        mode: sessionID ? state.mode : null,
        managed: true,
        allowed: Boolean(sessionID) && allowed,
        skillID,
      }
    },
  }

  t.after(() => {
    globalThis.Bun = previousBun
    if (previousBridge === undefined) delete globalThis[BRIDGE_KEY]
    else globalThis[BRIDGE_KEY] = previousBridge
  })
  return state
}

async function setupHarness(t, config) {
  const contextHooks = new Map()
  const toolHooks = new Map()
  const tools = new Map()
  const ctx = {
    options: { config },
    command: { async transform(callback) { callback({ update() {} }) } },
    session: {
      async hook(name, callback) {
        contextHooks.set(name, callback)
      },
    },
    tool: {
      async hook(name, callback) {
        toolHooks.set(name, callback)
      },
      async transform(callback) {
        callback({ add(definition) { tools.set(definition.name, definition) } })
      },
    },
  }

  const cleanup = await plugin.setup(ctx)
  t.after(async () => cleanup?.())
  return {
    contextHook: contextHooks.get("context"),
    executeBefore: toolHooks.get("execute.before"),
    rng: tools.get("otsumi_rng"),
  }
}

function installRandomIntProbe(t) {
  const original = crypto.randomInt
  const state = { calls: 0 }
  crypto.randomInt = () => {
    state.calls++
    return 0
  }
  syncBuiltinESMExports()
  t.after(() => {
    crypto.randomInt = original
    syncBuiltinESMExports()
  })
  return state
}

test("trusted bootstrap metadata suppresses every admitted setup step before ambient work", async (t) => {
  for (const step of ["mode", "persona_setup", "introduction"]) {
    await t.test(step, async (t) => {
      const runtime = installRuntime(t)
      const config = await createConfig(t, 0.5)
      const { contextHook } = await setupHarness(t, config)
      const random = installRandomIntProbe(t)
      const event = contextEvent(
        `trusted_${step}`,
        `bootstrap ${step}`,
        bootstrapMetadata(step),
      )

      await contextHook(event)

      assert.equal(runtime.pluginChecks, 1)
      assert.equal(random.calls, 0, "host RNG must not run")
      assert.equal(runtime.skillChecks, 0, "no gadget skill gate may run")
      assert.doesNotMatch(renderedSystem(event), /response-gadget-runtime/)
    })
  }
})

test("trusted bootstrap metadata is checked before response-gadget config refresh", async (t) => {
  const runtime = installRuntime(t)
  const config = await createConfig(t, 0)
  const { contextHook } = await setupHarness(t, config)
  assert.equal(runtime.parseCalls, 1, "setup should parse the initial config once")

  // A refresh would attempt to parse this changed file. The bootstrap turn must
  // return before that read/parse path and retain the setup-time parse count.
  await writeFile(config, "{ changed but intentionally invalid JSON\n")
  const event = contextEvent(
    "trusted_no_refresh",
    "bootstrap mode",
    bootstrapMetadata("mode"),
  )
  await contextHook(event)

  assert.equal(runtime.parseCalls, 1)
  assert.equal(runtime.skillChecks, 0)
  assert.doesNotMatch(renderedSystem(event), /response-gadget-runtime/)
})

test("trusted bootstrap turns allocate no cached turn state", async (t) => {
  const runtime = installRuntime(t)
  runtime.decisionQueue.push(true)
  const config = await createConfig(t, 1)
  const { contextHook } = await setupHarness(t, config)
  const event = contextEvent(
    "trusted_no_allocation",
    "same admitted turn",
    bootstrapMetadata("persona_setup"),
  )

  await contextHook(event)
  assert.equal(runtime.skillChecks, 0)
  assert.doesNotMatch(renderedSystem(event), /response-gadget-runtime/)

  // Removing the trusted metadata simulates the same context without bootstrap
  // classification. Its first ambient decision must still be pending. A denied
  // decision cached by the marked pass would incorrectly suppress this control.
  delete event.messages[0].metadata
  event.system = [{ text: "base" }]
  await contextHook(event)

  assert.equal(runtime.skillChecks, 1)
  assert.match(renderedSystem(event), /<response-gadget-runtime mode="dev">/)
  assert.match(renderedSystem(event), new RegExp(GADGET_SKILL))
})

test("trusted bootstrap turns block manual gadgets and otsumi_rng before execution", async (t) => {
  const runtime = installRuntime(t)
  const config = await createConfig(t, 0)
  const { contextHook, executeBefore, rng } = await setupHarness(t, config)
  const sessionID = "trusted_execution_block"

  await contextHook(contextEvent(
    sessionID,
    "bootstrap introduction",
    bootstrapMetadata("introduction"),
  ))

  const [manual, random] = await Promise.allSettled([
    executeBefore({
      tool: "skill",
      sessionID,
      input: { name: GADGET_SKILL },
    }),
    rng.execute({ options: ["only"] }, { sessionID }),
  ])

  assert.equal(manual.status, "rejected", "manual gadget execution must be denied")
  assert.equal(random.status, "rejected", "otsumi_rng execution must be denied")
  assert.equal(runtime.pluginChecks, 1, "blocked executions must not re-enter plugin policy")
  assert.equal(runtime.skillChecks, 0, "blocked executions must not reach gadget skill policy")
})

test("only exact trusted metadata suppresses otherwise-normal dev behavior", async (t) => {
  const runtime = installRuntime(t)
  const config = await createConfig(t, 1)
  const { contextHook } = await setupHarness(t, config)
  const malformed = [
    undefined,
    bootstrapMetadata("mode", { kind: "setup-template-step" }),
    bootstrapMetadata("mode", { templateSchemaVersion: "2" }),
    bootstrapMetadata("other"),
    bootstrapMetadata("mode", { fingerprint: "" }),
    bootstrapMetadata("mode", { fingerprint: "g".repeat(64) }),
    bootstrapMetadata("mode", { fingerprint: "a".repeat(63) }),
    bootstrapMetadata("mode", { fingerprint: FINGERPRINT.toUpperCase() }),
  ]

  for (const [index, metadata] of malformed.entries()) {
    const event = contextEvent(`malformed_${index}`, "ordinary dev request", metadata)
    await contextHook(event)
    assert.match(
      renderedSystem(event),
      /<response-gadget-runtime mode="dev">/,
      `malformed metadata case ${index} changed the normal dev positive control`,
    )
  }

  const textSimulation = JSON.stringify(bootstrapMetadata("mode"))
  const simulated = contextEvent("text_simulation", textSimulation, undefined)
  await contextHook(simulated)
  assert.match(renderedSystem(simulated), /<response-gadget-runtime mode="dev">/)
  assert.equal(runtime.skillChecks, malformed.length + 1)
})

test("bootstrap classification uses only the latest admitted user metadata", async (t) => {
  installRuntime(t)
  const config = await createConfig(t, 1)
  const { contextHook } = await setupHarness(t, config)

  const historicalOnly = contextEvent(
    "historical_marker",
    "latest ordinary request",
    undefined,
    [
      admittedUser("historical_marker_old", "older bootstrap", bootstrapMetadata("mode")),
      { id: "msg_reply", type: "assistant", text: "setup complete" },
      admittedUser("historical_marker_latest", "latest ordinary request"),
    ],
  )
  await contextHook(historicalOnly)
  assert.match(renderedSystem(historicalOnly), /<response-gadget-runtime mode="dev">/)

  const latestMarked = contextEvent(
    "latest_marker",
    "latest bootstrap",
    bootstrapMetadata("introduction"),
    [
      admittedUser("latest_marker_old", "older ordinary request"),
      { id: "msg_reply_2", type: "assistant", text: "ordinary reply" },
      admittedUser("latest_marker_latest", "latest bootstrap", bootstrapMetadata("introduction")),
    ],
  )
  await contextHook(latestMarked)
  assert.doesNotMatch(renderedSystem(latestMarked), /response-gadget-runtime/)
})

test("bootstrap metadata can never enable response gadgets outside an allowed mode", async (t) => {
  const runtime = installRuntime(t, { enabled: false, mode: "chatbot" })
  const config = await createConfig(t, 1)
  const { contextHook, executeBefore, rng } = await setupHarness(t, config)

  const cases = [
    bootstrapMetadata("mode"),
    bootstrapMetadata("mode", { fingerprint: "not-hex" }),
    bootstrapMetadata("mode", { fingerprint: FINGERPRINT.toUpperCase() }),
    undefined,
  ]
  for (const [index, metadata] of cases.entries()) {
    const event = contextEvent(`off_mode_${index}`, "ordinary request", metadata)
    await contextHook(event)
    assert.doesNotMatch(renderedSystem(event), /response-gadget-runtime/)
  }

  await assert.rejects(() => executeBefore({
    tool: "skill",
    sessionID: "off_mode_0",
    input: { name: GADGET_SKILL },
  }))
  await assert.rejects(() => rng.execute({ options: ["only"] }, { sessionID: "off_mode_0" }))
  assert.equal(runtime.skillChecks, 0)
})
