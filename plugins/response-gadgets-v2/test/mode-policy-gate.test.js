import assert from "node:assert/strict"
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import test from "node:test"

import plugin from "../index.js"

const BRIDGE_KEY = Symbol.for("kakudou.mode-router.v2.bridge")
const PLUGIN_ID = "kakudou.response-gadgets"
const DENIAL = "response-gadgets: disabled by authoritative mode-router policy"

function rawConfig(probability = 1) {
  return {
    version: 1,
    primary_agent: "osho",
    // Legacy local mode fields deliberately disagree with the bridge. They
    // must not participate in any runtime authorization decision.
    require_mode_router: false,
    modes: ["chatbot"],
    gadgets: [{
      name: "random-srs",
      skill: "97-gadget-random-srs",
      probability,
    }],
  }
}

async function createConfig(t, config = rawConfig()) {
  const root = await mkdtemp(join(tmpdir(), "response-gadgets-policy-test-"))
  const path = join(root, "config.json")
  await writeFile(path, JSON.stringify(config, null, 2) + "\n")
  t.after(() => rm(root, { recursive: true, force: true }))
  return path
}

function ordinaryEvent(sessionID, text = "ordinary request") {
  return {
    sessionID,
    agent: "osho",
    inputText: text,
    system: [{ text: "base" }],
    messages: [{ role: "user", id: `${sessionID}-user`, content: text }],
    tools: {},
  }
}

function commandEvent(sessionID, action) {
  return {
    sessionID,
    agent: "osho",
    inputText: `/gadget${action ? ` ${action}` : ""}`,
    system: [{ text: "base" }],
    messages: [{
      role: "user",
      content: `<opencode-response-gadget action="${action}" />`,
    }],
    tools: {},
  }
}

function renderedSystem(event) {
  return event.system.map((part) => typeof part === "string" ? part : part.text).join("\n")
}

function installRuntime(t, policy = {}) {
  const previousBun = globalThis.Bun
  const previousBridge = globalThis[BRIDGE_KEY]
  const state = {
    enabled: policy.enabled ?? true,
    mode: policy.mode ?? "dev",
    throwPluginDecision: false,
    skillAllowed: true,
    pluginChecks: 0,
    skillChecks: 0,
  }

  globalThis.Bun = { YAML: { parse: JSON.parse } }
  globalThis[BRIDGE_KEY] = {
    resolveRequest(event) {
      return {
        sessionID: event?.sessionID ?? event?.trustedSessionID ?? null,
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
      if (state.throwPluginDecision) throw new Error("router unavailable")
      return {
        mode: sessionID ? state.mode : null,
        managed: true,
        enabled: Boolean(sessionID) && state.enabled,
        reason: state.enabled ? "allow" : "not-enabled-in-mode",
      }
    },
    async decisionFor(sessionID, skillID) {
      state.skillChecks++
      return {
        mode: sessionID ? state.mode : null,
        managed: true,
        allowed: Boolean(sessionID) && state.skillAllowed,
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

test("chatbot denial occurs before ambient gates, directives, or turn allocation", async (t) => {
  const policy = installRuntime(t, { enabled: false, mode: "chatbot" })
  const config = await createConfig(t)
  const { contextHook } = await setupHarness(t, config)
  const event = ordinaryEvent("chatbot-session")

  await contextHook(event)

  assert.equal(policy.pluginChecks, 1)
  assert.equal(policy.skillChecks, 0, "no gadget gate may be evaluated while disabled")
  assert.doesNotMatch(renderedSystem(event), /response-gadget-runtime/)

  // Enabling the exact same turn must perform first-time selection. If the
  // denied request allocated/cached turn state, this directive would be lost.
  policy.enabled = true
  policy.mode = "dev"
  await contextHook(event)
  assert.equal(policy.skillChecks, 1)
  assert.match(renderedSystem(event), /<response-gadget-runtime mode="dev">/)
})

test("missing, unresolved, and throwing plugin policy fail closed without ambient work", async (t) => {
  const policy = installRuntime(t)
  const config = await createConfig(t)
  const { contextHook } = await setupHarness(t, config)

  const unresolved = ordinaryEvent(undefined)
  delete unresolved.sessionID
  await contextHook(unresolved)
  assert.equal(policy.skillChecks, 0)
  assert.doesNotMatch(renderedSystem(unresolved), /response-gadget-runtime/)

  policy.throwPluginDecision = true
  const throwing = ordinaryEvent("throwing-policy")
  await contextHook(throwing)
  assert.equal(policy.skillChecks, 0)
  assert.doesNotMatch(renderedSystem(throwing), /response-gadget-runtime/)

  delete globalThis[BRIDGE_KEY]
  const missing = ordinaryEvent("missing-bridge")
  await contextHook(missing)
  assert.equal(policy.skillChecks, 0)
  assert.doesNotMatch(renderedSystem(missing), /response-gadget-runtime/)
})

test("disabled status, reload, and probability commands return one denial and never write config", async (t) => {
  installRuntime(t, { enabled: false, mode: "chatbot" })
  const config = await createConfig(t)
  const { contextHook } = await setupHarness(t, config)
  const before = await readFile(config, "utf8")

  for (const action of ["status", "reload", "random-srs 0.25"]) {
    const event = commandEvent(`denied-${action}`, action)
    await contextHook(event)
    assert.match(renderedSystem(event), new RegExp(DENIAL))
    assert.doesNotMatch(renderedSystem(event), /Response Gadgets: HEALTHY|reloaded|updated/)
    assert.equal(await readFile(config, "utf8"), before)
  }
})

test("stale RNG tool snapshots re-check policy and resolve only trusted execution identity", async (t) => {
  const policy = installRuntime(t, { enabled: true, mode: "dev" })
  const config = await createConfig(t)
  const { contextHook, rng } = await setupHarness(t, config)

  await contextHook(ordinaryEvent("dev-snapshot"))
  policy.enabled = false
  policy.mode = "chatbot"

  await assert.rejects(
    () => rng.execute({ options: ["only"] }, { sessionID: "dev-snapshot" }),
    new RegExp(DENIAL),
  )
  await assert.rejects(
    () => rng.execute({ options: ["only"] }),
    new RegExp(DENIAL),
  )

  policy.enabled = true
  policy.mode = "dev-python"
  assert.deepEqual(
    await rng.execute({ options: ["only"] }, { trustedSessionID: "trusted-execution" }),
    { output: "only", content: "only" },
  )
})

test("explicit gadget skills obey current plugin and managed-skill policy before duplicate state", async (t) => {
  const policy = installRuntime(t, { enabled: true, mode: "dev" })
  const config = await createConfig(t)
  const { contextHook, executeBefore } = await setupHarness(t, config)
  const sessionID = "explicit-skill"
  await contextHook(ordinaryEvent(sessionID))

  const call = {
    tool: "skill",
    sessionID,
    input: { name: "97-gadget-random-srs" },
  }
  await assert.doesNotReject(() => executeBefore(call))
  await assert.rejects(() => executeBefore(call), /blocked duplicate invocation/)

  policy.enabled = false
  await assert.rejects(() => executeBefore({ ...call, sessionID: "disabled-explicit" }), new RegExp(DENIAL))

  policy.enabled = true
  policy.skillAllowed = false
  await assert.rejects(
    () => executeBefore({ ...call, sessionID: "managed-skill-denied" }),
    /blocked gadget skill '97-gadget-random-srs' by authoritative mode-router skill policy/,
  )
})

test("authoritative dev and dev-python plugin decisions enable ambient behavior despite stale local modes", async (t) => {
  const policy = installRuntime(t, { enabled: true, mode: "dev" })
  const config = await createConfig(t, rawConfig(1))
  const { contextHook } = await setupHarness(t, config)

  for (const mode of ["dev", "dev-python"]) {
    policy.mode = mode
    const event = ordinaryEvent(`${mode}-enabled`)
    await contextHook(event)
    assert.match(renderedSystem(event), new RegExp(`<response-gadget-runtime mode="${mode}">`))
    assert.match(renderedSystem(event), /97-gadget-random-srs/)
  }
})
