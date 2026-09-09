import assert from "node:assert/strict"
import test from "node:test"

import {
  CaptureService,
} from "../application/capture-service.ts"
import {
  OpenCodeLifecycle,
} from "../adapters/opencode/lifecycle.ts"
import {
  installAgentPolicy,
  installTurnAwareWebGuard,
} from "../adapters/opencode/guardrails.ts"
import {
  installDreamExecutionGuard,
} from "../adapters/opencode/dream/guard.ts"
import {
  registerDreamTools,
} from "../adapters/opencode/dream/tools.ts"
import {
  registerTools,
} from "../adapters/opencode/tools.ts"
import {
  TurnStore,
} from "../adapters/opencode/turn-store.ts"
import {
  ModePolicyGate,
} from "../adapters/opencode/mode-policy.ts"
import {
  DreamSessionRegistry,
} from "../application/dream/dream-session-registry.ts"
import {
  loadConfig,
} from "../config.ts"

const BRIDGE_KEY =
  Symbol.for(
    "kakudou.mode-router.v2.bridge",
  )

function traceSpy() {
  const entries: Array<{
    event: string
    data: unknown
  }> = []

  return {
    entries,
    write(
      event: string,
      data?: unknown,
    ) {
      entries.push({
        event,
        data,
      })
    },
  }
}

function config() {
  return loadConfig({
    gateway: {
      url: "http://127.0.0.1:1",
    },
    memory: {
      instanceId: "test",
      teamId: "team-test",
      userId: "user-test",
      agents: {
        osho: "agent-osho",
      },
    },
    knowledge: {
      url: "http://127.0.0.1:1/v3",
      discovery: {
        enabled: false,
      },
      defaultWikiIds: [
        "wiki-test",
      ],
      defaultCodeGraphIds: [
        "graph-test",
      ],
    },
    dream: {
      enabled: true,
    },
    exposeAdminTools: true,
  })
}

function policy(
  enabled: boolean,
) {
  return {
    sessionID(
      event: any,
    ) {
      const value =
        event?.sessionID ??
        event?.sessionId ??
        null
      return typeof value ===
        "string" && value
        ? value
        : null
    },
    async isEnabled(
      sessionID: string | null,
    ) {
      return Boolean(
        enabled && sessionID,
      )
    },
    async requireEnabled(
      sessionID: string | null,
    ) {
      if (!enabled || !sessionID) {
        throw new Error(
          "tencentdb-memory: disabled by authoritative mode-router policy",
        )
      }
    },
  }
}

function setupTools(
  enabled: boolean,
) {
  const calls: string[] = []
  const definitions =
    new Map<string, any>()
  const turns =
    new TurnStore()
  const cfg = config()
  const trace = traceSpy()

  const note =
    (name: string, value: unknown) =>
      async () => {
        calls.push(name)
        return value
      }

  const memory: any = {
    searchAtomic: note(
      "memory.searchAtomic",
      { items: [{ id: "atom" }] },
    ),
    searchConversations: note(
      "memory.searchConversations",
      { items: [] },
    ),
    listScenarios: note(
      "memory.listScenarios",
      { items: [] },
    ),
    readScenario: note(
      "memory.readScenario",
      {},
    ),
    readCore: note(
      "memory.readCore",
      {},
    ),
    health: note(
      "memory.health",
      { ok: true },
    ),
  }
  const knowledge: any = {
    searchWiki: note(
      "knowledge.searchWiki",
      {},
    ),
    readWikiPages: note(
      "knowledge.readWikiPages",
      {},
    ),
    searchCodeGraph: note(
      "knowledge.searchCodeGraph",
      {},
    ),
    exploreCodeGraph: note(
      "knowledge.exploreCodeGraph",
      {},
    ),
  }
  const assets: any = {
    wikiIds: note(
      "assets.wikiIds",
      ["wiki-test"],
    ),
    codeGraphIds: note(
      "assets.codeGraphIds",
      ["graph-test"],
    ),
    singleCodeGraph: note(
      "assets.singleCodeGraph",
      {
        ok: true,
        id: "graph-test",
      },
    ),
  }
  const context: any = {
    retrieve: note(
      "context.retrieve",
      {},
    ),
  }
  const capture: any = {
    capture: note(
      "capture.capture",
      true,
    ),
  }
  const guard: any = {
    failureThreshold: 3,
    maxCallsPerTurn: null,
    consumeTurn() {
      calls.push(
        "guard.consumeTurn",
      )
      return { allowed: true }
    },
    admit() {
      calls.push("guard.admit")
      return { action: "allow" }
    },
    recordOutcome() {
      calls.push(
        "guard.recordOutcome",
      )
    },
    envelopeFor() {
      return {
        turn: {
          used: 0,
          limit: null,
          remaining: null,
          exhausted: false,
          calls: [],
        },
        source: {
          id: "test",
          status: "ok",
          consecutiveFailures: 0,
          threshold: 3,
          lastError: null,
          lastProbeAt: null,
        },
      }
    },
    turnState() {
      calls.push(
        "guard.turnState",
      )
      return {
        used: 0,
        limit: null,
        remaining: null,
        exhausted: false,
        calls: [],
      }
    },
  }
  const ctx = {
    tool: {
      async transform(
        callback: (tools: any) => void,
      ) {
        callback({
          add(definition: any) {
            definitions.set(
              definition.name,
              definition,
            )
          },
        })
      },
    },
  }

  return {
    calls,
    definitions,
    deps: {
      config: cfg,
      memory,
      knowledge,
      context,
      assets,
      capture,
      guard,
      turns,
      trace,
      policy: policy(enabled),
    },
  }
}

test(
  "off-mode denies every normal and admin tool before any memory effect",
  async () => {
    const harness =
      setupTools(false)
    await registerTools(
      {
        tool: {
          async transform(
            callback: (tools: any) => void,
          ) {
            callback({
              add(definition: any) {
                harness.definitions.set(
                  definition.name,
                  definition,
                )
              },
            })
          },
        },
      },
      harness.deps as any,
    )

    const args: Record<string, any> = {
      tdai_context: {
        query: "query",
        mode: "wiki",
      },
      tdai_memory_search: {
        query: "query",
      },
      tdai_memory_layer: {
        action: "scenario_list",
      },
      tdai_wiki_search: {
        query: "query",
      },
      tdai_wiki_read: {
        wiki_id: "wiki-test",
        refs: ["page"],
      },
      tdai_code_search: {
        query: "query",
      },
      tdai_code_graph: {
        operation: "explore",
        code_graph_id: "graph-test",
        query: "query",
      },
      tdai_memory_health: {},
      tdai_capture: {
        user_content: "user",
        assistant_content: "assistant",
      },
    }

    assert.deepEqual(
      [...harness.definitions.keys()],
      Object.keys(args),
    )

    for (const [name, input] of Object.entries(args)) {
      await assert.rejects(
        harness.definitions
          .get(name)
          .execute(
            input,
            {
              sessionID:
                "chatbot-session",
              agent: "osho",
            },
          ),
        /disabled by authoritative mode-router policy/,
        name,
      )
    }

    assert.deepEqual(
      harness.calls,
      [],
    )
  },
)

test(
  "off-mode denies every dream tool before dream state, sampling, commitment, or randomness",
  async () => {
    const cfg = config()
    const definitions =
      new Map<string, any>()
    const calls: string[] = []
    const sessions =
      new DreamSessionRegistry()
    const turns =
      new TurnStore()
    turns.openExecution(
      "chatbot-session",
    )

    await registerDreamTools(
      {
        tool: {
          async transform(
            callback: (tools: any) => void,
          ) {
            callback({
              add(definition: any) {
                definitions.set(
                  definition.name,
                  definition,
                )
              },
            })
          },
        },
      },
      {
        config: cfg,
        turns,
        sessions,
        sampler: {
          async sample() {
            calls.push("sample")
            return {}
          },
        },
        committer: {
          async commit() {
            calls.push("commit")
            return {}
          },
        },
        trace: traceSpy(),
        policy: policy(false),
      } as any,
    )

    const invocations: Record<string, any> = {
      tdai_dream_begin: {
        role: "worker",
        protocol:
          "TDAI_DREAM_SKILL_V1",
      },
      tdai_dream_roll: {},
      tdai_dream_sample: {},
      tdai_dream_commit: {
        sample_id: "sample",
        title: "title",
        seed: "seed",
        dream: "dream",
        association: "association",
        grounding: "grounding",
      },
    }

    for (
      const [name, args]
      of Object.entries(invocations)
    ) {
      await assert.rejects(
        definitions.get(name)
          .execute(
            args,
            {
              sessionID:
                "chatbot-session",
              agent: "osho",
            },
          ),
        /disabled by authoritative mode-router policy/,
        name,
      )
    }

    assert.equal(
      sessions.get(
        "chatbot-session",
      ),
      undefined,
    )
    assert.deepEqual(calls, [])
  },
)

test(
  "off-mode lifecycle events are ignored before turn-store, capture, retry, or dedup work",
  async () => {
    const calls: string[] = []
    const lifecycle =
      new OpenCodeLifecycle(
        {
          acceptEvent() {
            calls.push("acceptEvent")
            return true
          },
        } as any,
        {
          async capture() {
            calls.push("capture")
            return true
          },
        } as any,
        {
          resetAllTurns() {
            calls.push("reset")
          },
        } as any,
        {} as any,
        traceSpy(),
        policy(false) as any,
      )

    await lifecycle.handle({
      id: "event-1",
      type:
        "session.execution.started",
      sessionID:
        "chatbot-session",
    })

    assert.deepEqual(calls, [])
  },
)

test(
  "session end never captures, including while the plugin is enabled",
  async () => {
    const turns = new TurnStore()
    const captures: unknown[] = []
    const sessionID = "dev-session-end"
    turns.openExecution(sessionID)
    turns.appendUserText(
      sessionID,
      "user",
    )
    turns.bindStep(
      sessionID,
      {
        data: {
          agent: "osho",
        },
      },
    )
    turns.appendText(
      sessionID,
      "assistant",
    )

    const lifecycle =
      new OpenCodeLifecycle(
        turns,
        {
          async capture(turn: unknown) {
            captures.push(turn)
            return true
          },
        } as any,
        {
          clearTurn() {},
        } as any,
        {
          isDreamExecution() {
            return false
          },
          delete() {},
        } as any,
        traceSpy(),
        policy(true) as any,
      )

    await lifecycle.handle({
      type: "session.ended",
      sessionID,
    })
    await new Promise(
      (resolve) =>
        setImmediate(resolve),
    )

    assert.deepEqual(captures, [])
  },
)

test(
  "a scheduled capture retry rechecks mode authorization before posting",
  async (t) => {
    let enabled = true
    let posts = 0
    const capture =
      new CaptureService(
        config(),
        {
          async captureTurn() {
            posts += 1
            throw new Error(
              "mock first POST failure",
            )
          },
        } as any,
        traceSpy(),
        {
          async isEnabled(
            sessionID: string | null,
          ) {
            return Boolean(
              enabled && sessionID,
            )
          },
        } as any,
      )
    t.after(() => capture.stop())

    await capture.capture({
      sessionID: "retry-session",
      generation: 7331,
      openCodeAgent: "osho",
      userText: "user",
      assistantText: "assistant",
      assistantMessageIDs: [],
    })
    assert.equal(posts, 1)

    enabled = false
    await new Promise(
      (resolve) =>
        setTimeout(resolve, 1200),
    )

    assert.equal(posts, 1)
  },
)

test(
  "request policy is injected only for an exactly identified enabled session",
  async (t) => {
    const prior =
      (globalThis as any)[BRIDGE_KEY]
    t.after(() => {
      if (prior === undefined) {
        delete (globalThis as any)[BRIDGE_KEY]
      } else {
        ;(globalThis as any)[BRIDGE_KEY] =
          prior
      }
    })

    const decisions =
      new Map([
        ["dev-session", true],
        ["dev-python-session", true],
        ["chatbot-session", false],
        ["gamemaster-session", false],
      ])
    ;(globalThis as any)[BRIDGE_KEY] = {
      resolveRequest(event: any) {
        return {
          sessionID:
            event?.sessionID ?? null,
        }
      },
      async pluginDecisionFor(
        sessionID: string,
        pluginID: string,
      ) {
        assert.equal(
          pluginID,
          "kakudou.tencentdb-memory",
        )
        return {
          managed: true,
          enabled:
            decisions.get(sessionID),
          mode: sessionID.replace(
            "-session",
            "",
          ),
        }
      },
    }

    let agentTransforms = 0
    let contextHook:
      ((event: any) => Promise<void>) |
      undefined
    await installAgentPolicy(
      {
        agent: {
          async transform() {
            agentTransforms += 1
          },
        },
        session: {
          async hook(
            name: string,
            callback:
              (event: any) =>
                Promise<void>,
          ) {
            assert.equal(name, "context")
            contextHook = callback
          },
        },
      },
      config(),
      traceSpy(),
    )

    assert.equal(agentTransforms, 0)
    assert.ok(contextHook)

    for (
      const sessionID
      of [
        "dev-session",
        "dev-python-session",
        "chatbot-session",
        "gamemaster-session",
      ]
    ) {
      const event = {
        sessionID,
        system: [
          { text: "base" },
        ],
      }
      await contextHook!(event)
      assert.equal(
        event.system[0].text.includes(
          "<tencentdb-agent-memory-policy>",
        ),
        decisions.get(sessionID),
        sessionID,
      )
    }

    for (
      const bridge
      of [
        undefined,
        {
          resolveRequest() {
            return null
          },
          async pluginDecisionFor() {
            return {
              managed: true,
              enabled: true,
              mode: "dev",
            }
          },
        },
        {
          resolveRequest(event: any) {
            return {
              sessionID:
                event.sessionID,
            }
          },
          async pluginDecisionFor() {
            throw new Error(
              "router unavailable",
            )
          },
        },
      ]
    ) {
      ;(globalThis as any)[BRIDGE_KEY] =
        bridge
      const event: any = {
        system: [{ text: "base" }],
      }
      await contextHook!(event)
      assert.equal(
        event.system[0].text,
        "base",
      )
    }
  },
)

test(
  "unknown tool identity never falls back to the latest session or agent",
  async () => {
    const harness = setupTools(true)
    harness.deps.turns
      .openExecution("other-session")
    harness.deps.turns
      .bindStep(
        "other-session",
        {
          data: { agent: "osho" },
        },
      )

    await registerTools(
      {
        tool: {
          async transform(
            callback: (tools: any) => void,
          ) {
            callback({
              add(definition: any) {
                harness.definitions.set(
                  definition.name,
                  definition,
                )
              },
            })
          },
        },
      },
      harness.deps as any,
    )

    await assert.rejects(
      harness.definitions
        .get("tdai_memory_search")
        .execute(
          { query: "query" },
          {},
        ),
      /disabled by authoritative mode-router policy/,
    )
    assert.deepEqual(
      harness.calls,
      [],
    )
    assert.equal(
      harness.deps.turns
        .currentAgent(
          "unknown-session",
        ),
      "",
    )
  },
)

test(
  "off-mode public-web and dream execute-before guards perform no memory side effects",
  async () => {
    const turns = new TurnStore()
    turns.openExecution(
      "latest-session",
    )
    turns.appendUserText(
      "latest-session",
      "What do I remember?",
    )
    const sessions =
      new DreamSessionRegistry()
    sessions.begin({
      sessionID: "latest-session",
      generation: 1,
      role: "worker",
      openCodeAgent: "osho",
    })

    const callbacks:
      Array<(event: any) => unknown> =
        []
    const ctx = {
      tool: {
        async hook(
          _name: string,
          callback:
            (event: any) => unknown,
        ) {
          callbacks.push(callback)
        },
      },
    }
    const calls: string[] = []
    const trace = {
      write(event: string) {
        calls.push(`trace:${event}`)
      },
    }
    const guard = {
      recordBlockedWeb() {
        calls.push("blocked-web")
        return 1
      },
      turnState() {
        calls.push("turn-state")
        return { used: 0 }
      },
    }

    await installTurnAwareWebGuard(
      ctx,
      config(),
      turns,
      guard as any,
      trace,
      policy(false) as any,
    )
    await installDreamExecutionGuard(
      ctx,
      config(),
      sessions,
      turns,
      trace,
      policy(false) as any,
    )
    calls.length = 0

    for (const callback of callbacks) {
      await callback({
        tool: "websearch",
        input: { query: "memory" },
      })
    }

    assert.deepEqual(calls, [])
  },
)

test(
  "the centralized bridge decision fails closed and enables only positive managed decisions",
  async (t) => {
    const prior =
      (globalThis as any)[BRIDGE_KEY]
    t.after(() => {
      if (prior === undefined) {
        delete (globalThis as any)[BRIDGE_KEY]
      } else {
        ;(globalThis as any)[BRIDGE_KEY] =
          prior
      }
    })

    const gate = new ModePolicyGate()
    delete (globalThis as any)[BRIDGE_KEY]
    assert.equal(
      await gate.isEnabled(
        "dev-session",
      ),
      false,
    )
    assert.equal(
      await gate.isEnabled(null),
      false,
    )

    for (
      const result
      of [
        null,
        undefined,
        {
          managed: true,
          enabled: true,
          mode: null,
        },
        {
          managed: false,
          enabled: true,
          mode: "dev",
        },
      ]
    ) {
      ;(globalThis as any)[BRIDGE_KEY] = {
        async pluginDecisionFor() {
          return result
        },
      }
      assert.equal(
        await gate.isEnabled(
          "session",
        ),
        false,
      )
    }

    ;(globalThis as any)[BRIDGE_KEY] = {
      async pluginDecisionFor() {
        throw new Error(
          "router unavailable",
        )
      },
    }
    assert.equal(
      await gate.isEnabled("session"),
      false,
    )

    for (
      const [mode, enabled]
      of [
        ["dev", true],
        ["dev-python", true],
        ["chatbot", false],
        ["gamemaster", false],
      ] as const
    ) {
      ;(globalThis as any)[BRIDGE_KEY] = {
        async pluginDecisionFor(
          sessionID: string,
          pluginID: string,
        ) {
          assert.equal(
            sessionID,
            `${mode}-session`,
          )
          assert.equal(
            pluginID,
            "kakudou.tencentdb-memory",
          )
          return {
            managed: true,
            enabled,
            mode,
          }
        },
      }

      assert.equal(
        await gate.isEnabled(
          `${mode}-session`,
        ),
        enabled,
      )
    }
  },
)

test(
  "enabled development tools retain Tencent query mode semantics",
  async () => {
    const harness = setupTools(true)
    await registerTools(
      {
        tool: {
          async transform(
            callback: (tools: any) => void,
          ) {
            callback({
              add(definition: any) {
                harness.definitions.set(
                  definition.name,
                  definition,
                )
              },
            })
          },
        },
      },
      harness.deps as any,
    )

    let request: any = null
    harness.deps.context.retrieve =
      async (value: any) => {
        request = value
        return { ok: true }
      }

    await harness.definitions
      .get("tdai_context")
      .execute(
        {
          query: "architecture",
          mode: "wiki",
        },
        {
          sessionID: "dev-session",
          agent: "osho",
        },
      )

    assert.equal(request.mode, "wiki")
    assert.equal(
      request.sessionID,
      "dev-session",
    )
    assert.equal(
      request.openCodeAgent,
      "osho",
    )
  },
)

test(
  "enabled development execution still captures on execution success",
  async () => {
    const turns = new TurnStore()
    const captures: any[] = []
    const lifecycle =
      new OpenCodeLifecycle(
        turns,
        {
          async capture(turn: any) {
            captures.push(turn)
            return true
          },
        } as any,
        {
          resetAllTurns() {},
          clearTurn() {},
          turnState() {
            return { used: 0 }
          },
          failureThreshold: 3,
          maxCallsPerTurn: null,
        } as any,
        {
          onExecutionStarted() {},
          isDreamExecution() {
            return false
          },
        } as any,
        traceSpy(),
        policy(true) as any,
      )
    const sessionID = "dev-capture"

    await lifecycle.handle({
      type:
        "session.execution.started",
      sessionID,
    })
    await lifecycle.handle({
      type: "session.step.started",
      sessionID,
      data: { agent: "osho" },
    })
    turns.appendUserText(
      sessionID,
      "user",
    )
    await lifecycle.handle({
      type: "session.text.ended",
      sessionID,
      data: { text: "assistant" },
    })
    await lifecycle.handle({
      type:
        "session.execution.succeeded",
      sessionID,
    })
    await new Promise(
      (resolve) =>
        setImmediate(resolve),
    )

    assert.equal(captures.length, 1)
    assert.equal(
      captures[0].openCodeAgent,
      "osho",
    )
    assert.equal(
      captures[0].assistantText,
      "assistant",
    )
  },
)
