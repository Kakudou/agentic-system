import { resolve } from "node:path"

import { ConfigManager } from "./config.js"
import { RequestIdentityTracker } from "./identity.js"
import { modeDecision, pluginDecision } from "./matcher.js"
import { SessionModeStore } from "./state.js"

const PLUGIN_ID = "kakudou.mode-router"
const MODE_BRIDGE = Symbol.for("kakudou.mode-router.v2.bridge")
const RUNTIME_REGISTRY = Symbol.for("kakudou.mode-router.v2.runtime-registry")

function registry() {
  if (globalThis[RUNTIME_REGISTRY]) return globalThis[RUNTIME_REGISTRY]

  const value = {
    priorBridge: globalThis[MODE_BRIDGE],
    pending: new Map(),
    runtimes: new Map(),
    conflictBridge: null,
  }
  value.conflictBridge = conflictBridge(value)
  globalThis[RUNTIME_REGISTRY] = value
  return value
}

function activeRuntimes(value) {
  return [...value.runtimes.values()].filter((runtime) => runtime.bindings.size > 0)
}

function publishBridge(value) {
  const active = activeRuntimes(value)
  if (active.length === 1) {
    globalThis[MODE_BRIDGE] = active[0].bridge
    return
  }
  if (active.length > 1) {
    globalThis[MODE_BRIDGE] = value.conflictBridge
    return
  }

  if (value.priorBridge === undefined) delete globalThis[MODE_BRIDGE]
  else globalThis[MODE_BRIDGE] = value.priorBridge

  if (value.pending.size === 0 && value.runtimes.size === 0) {
    delete globalThis[RUNTIME_REGISTRY]
  }
}

async function currentConfigs(value) {
  const runtimes = activeRuntimes(value)
  await Promise.all(runtimes.map((runtime) => runtime.configManager.refresh()))
  return runtimes.map((runtime) => runtime.configManager.current)
}

function conflictBridge(value) {
  return {
    id: PLUGIN_ID,
    async modeFor() {
      return null
    },
    resolveRequest() {
      return {
        sessionID: null,
        agent: null,
        inputText: "",
        inputAt: null,
        source: "conflicting-runtime-identities",
      }
    },
    agentFor() {
      return null
    },
    async decisionFor(_sessionID, skillID) {
      const decisions = (await currentConfigs(value)).map((config) =>
        modeDecision(skillID, null, config),
      )
      const managed = decisions.find((decision) => decision.managed)
      return { mode: null, ...(managed ?? decisions[0] ?? {
        managed: false,
        allowed: true,
        reason: "unmanaged",
      }) }
    },
    async pluginDecisionFor(_sessionID, pluginID) {
      const decisions = (await currentConfigs(value)).map((config) =>
        pluginDecision(pluginID, null, config),
      )
      return decisions.find((decision) => decision.managed) ?? decisions[0] ?? {
        mode: null,
        managed: false,
        enabled: true,
        reason: "passthrough",
      }
    },
  }
}

async function createRuntime(key, configPath, store) {
  const configManager = new ConfigManager(configPath)
  await configManager.initialize()
  await store.load()

  const runtime = {
    key,
    configManager,
    store,
    identities: new RequestIdentityTracker(),
    bindings: new Set(),
    bridge: null,
    modeForSession: null,
  }

  runtime.modeForSession = async function modeForSession(
    sessionID,
    config,
    seen = new Set(),
    depth = 0,
  ) {
    if (!sessionID) return null

    const stored = store.get(sessionID, config)
    if (stored) return stored

    if (seen.has(sessionID)) {
      console.warn(`[kakudou.mode-router] session lineage cycle at '${sessionID}'`)
      return null
    }
    if (depth >= 128) {
      console.warn(
        `[kakudou.mode-router] session lineage exceeded 128 levels at '${sessionID}'`,
      )
      return null
    }
    seen.add(sessionID)

    const authority = runtime.bindings.values().next().value?.ctx
    if (!authority) return null

    try {
      const response = await authority.session.get({ sessionID })
      const session = response?.data ?? response
      if (!session || typeof session !== "object") {
        console.warn(
          `[kakudou.mode-router] session lookup returned no record for '${sessionID}'`,
        )
        return null
      }
      const parentID =
        session?.parentID ??
        session?.parentId ??
        session?.parent?.id ??
        session?.fork?.sessionID ??
        null

      if (typeof parentID === "string" && parentID) {
        const inherited = await modeForSession(parentID, config, seen, depth + 1)
        if (!inherited) return null
        await store.set(sessionID, inherited)
        return inherited
      }

      await store.set(sessionID, config.defaultMode)
      return config.defaultMode
    } catch (error) {
      console.warn(
        `[kakudou.mode-router] session mode resolution unavailable for '${sessionID}':`,
        error,
      )
      return null
    }
  }

  runtime.bridge = {
    id: PLUGIN_ID,
    async modeFor(sessionID) {
      if (!sessionID) return null
      await configManager.refresh()
      return runtime.modeForSession(sessionID, configManager.current)
    },
    resolveRequest(event) {
      return runtime.identities.resolve(event)
    },
    agentFor(sessionID) {
      return runtime.identities.agentFor(sessionID)
    },
    async decisionFor(sessionID, skillID) {
      if (!sessionID || !skillID) return null
      await configManager.refresh()
      const mode = await runtime.modeForSession(sessionID, configManager.current)
      return { mode, ...modeDecision(skillID, mode, configManager.current) }
    },
    async pluginDecisionFor(sessionID, pluginID) {
      await configManager.refresh()
      const config = configManager.current
      const mode = sessionID
        ? await runtime.modeForSession(sessionID, config)
        : null
      return pluginDecision(pluginID, mode, config)
    },
  }

  return runtime
}

export async function prepareSharedRuntime(configPath) {
  const value = registry()
  const store = new SessionModeStore(configPath)
  const key = `${resolve(configPath)}\0${resolve(store.file)}`
  const existing = value.runtimes.get(key)
  if (existing) return existing

  let pending = value.pending.get(key)
  if (!pending) {
    pending = createRuntime(key, configPath, store)
    value.pending.set(key, pending)
  }

  try {
    const runtime = await pending
    value.runtimes.set(key, runtime)
    return runtime
  } catch (error) {
    if (value.pending.get(key) === pending) value.pending.delete(key)
    if (value.runtimes.size === 0) publishBridge(value)
    throw error
  } finally {
    if (value.pending.get(key) === pending) value.pending.delete(key)
  }
}

export function activateSharedRuntime(runtime, ctx) {
  const value = registry()
  const binding = { ctx, stopIdentity: null, active: true }
  value.runtimes.set(runtime.key, runtime)
  runtime.bindings.add(binding)
  binding.stopIdentity = runtime.identities.start(ctx)
  publishBridge(value)
  return binding
}

export async function discardSharedRuntime(runtime) {
  const value = globalThis[RUNTIME_REGISTRY]
  if (!value || runtime.bindings.size > 0) return
  if (value.runtimes.get(runtime.key) === runtime) value.runtimes.delete(runtime.key)
  publishBridge(value)
}

export async function releaseSharedRuntime(runtime, binding) {
  if (!binding?.active) return
  binding.active = false
  runtime.bindings.delete(binding)
  await binding.stopIdentity?.()

  const value = globalThis[RUNTIME_REGISTRY]
  if (!value) return
  if (runtime.bindings.size === 0 && value.runtimes.get(runtime.key) === runtime) {
    value.runtimes.delete(runtime.key)
  }
  publishBridge(value)
}
