import assert from "node:assert/strict"
import test from "node:test"

import {
  installAgentPolicy,
} from "../adapters/opencode/guardrails.ts"
import {
  OpenCodeLifecycle,
} from "../adapters/opencode/lifecycle.ts"
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
  CaptureService,
} from "../application/capture-service.ts"
import {
  DreamSessionRegistry,
} from "../application/dream/dream-session-registry.ts"
import {
  loadConfig,
} from "../config.ts"
import {
  HttpJsonClient,
} from "../infrastructure/tencent/http-client.ts"
import {
  SETUP_SUPPRESSION_DENIAL,
} from "../adapters/opencode/setup-suppression.ts"

const FINGERPRINT =
  "0123456789abcdef".repeat(4)

const ALLOWED_SETUP_STEPS = [
  "mode",
  "persona_setup",
  "introduction",
] as const

function setupMetadata(
  step: string = "mode",
  overrides: Record<string, unknown> = {},
) {
  return {
    kind: "setup_template_step",
    templateSchemaVersion: 2,
    step,
    fingerprint: FINGERPRINT,
    ...overrides,
  }
}

function config() {
  return loadConfig({
    gateway: {
      url: "http://127.0.0.1:1",
    },
    memory: {
      instanceId: "bootstrap-test",
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
      defaultWikiIds: ["wiki-test"],
      defaultCodeGraphIds: ["graph-test"],
    },
    dream: {
      enabled: true,
    },
    circuit: {
      failureThreshold: 1000,
      openSeconds: 60,
    },
    exposeAdminTools: true,
  })
}

function traceSpy() {
  const entries: Array<{
    event: string
    data: unknown
  }> = []

  return {
    entries,
    write(event: string, data?: unknown) {
      entries.push({ event, data })
    },
  }
}

function modePolicy(enabled = true) {
  return {
    sessionID(event: any) {
      const sessionID =
        event?.sessionID ??
        event?.sessionId ??
        event?.data?.sessionID ??
        null
      return typeof sessionID === "string" && sessionID
        ? sessionID
        : null
    },
    async isEnabled(sessionID: string | null) {
      return Boolean(enabled && sessionID)
    },
    async requireEnabled(sessionID: string | null) {
      if (!enabled || !sessionID) {
        throw new Error("disabled")
      }
    },
  }
}

function setupAwareModePolicy(
  enabled = true,
) {
  const setupSuppressed =
    new Set<string>()

  return {
    ...modePolicy(enabled),
    isSetupSuppressed(
      sessionID: string | null,
    ) {
      return Boolean(
        sessionID &&
        setupSuppressed.has(
          sessionID,
        ),
      )
    },
    markSetupSuppressed(
      sessionID: string,
    ) {
      setupSuppressed.add(
        sessionID,
      )
    },
    clearSetupSuppressed(
      sessionID: string,
    ) {
      setupSuppressed.delete(
        sessionID,
      )
    },
  }
}

function guardSpy(calls: string[]) {
  return {
    failureThreshold: 3,
    maxCallsPerTurn: null,
    resetAllTurns() {
      calls.push("guard.resetAllTurns")
    },
    clearTurn() {
      calls.push("guard.clearTurn")
    },
    turnState() {
      calls.push("guard.turnState")
      return {
        used: 0,
        limit: null,
        remaining: null,
        exhausted: false,
        calls: [],
      }
    },
  }
}

function dreamRegistrySpy(calls: string[]) {
  return {
    onExecutionStarted() {
      calls.push("dream.onExecutionStarted")
    },
    isDreamExecution() {
      calls.push("dream.isDreamExecution")
      return false
    },
    delete() {
      calls.push("dream.delete")
    },
  }
}

function inboxEvent(
  type: string,
  sessionID: string,
  metadata = setupMetadata(),
) {
  return {
    type,
    data: {
      sessionID,
      inboxID: `inbox-${sessionID}`,
      item: {
        type: "user",
        payload: {
          text: "internal setup turn",
        },
        metadata,
      },
    },
  }
}

async function admitSetupTurn(
  lifecycle: OpenCodeLifecycle,
  sessionID: string,
  metadata = setupMetadata(),
) {
  await lifecycle.handle(
    inboxEvent(
      "session.inbox.enqueued",
      sessionID,
      metadata,
    ),
  )
  await lifecycle.handle({
    type: "session.execution.started",
    data: { sessionID },
  })
  await lifecycle.handle(
    inboxEvent(
      "session.inbox.delivered",
      sessionID,
      metadata,
    ),
  )
}

async function finishTurn(
  lifecycle: OpenCodeLifecycle,
  sessionID: string,
) {
  await lifecycle.handle({
    type: "session.step.started",
    data: {
      sessionID,
      agent: "osho",
    },
  })
  await lifecycle.handle({
    type: "session.text.ended",
    data: {
      sessionID,
      text: "setup response",
    },
  })
  await lifecycle.handle({
    type: "session.execution.succeeded",
    data: { sessionID },
  })
  await new Promise<void>(
    (resolve) => setImmediate(resolve),
  )
}

function userInboxEvent(
  type: string,
  sessionID: string,
  inboxID: string,
  text: string,
  metadata?: Record<string, unknown>,
) {
  return {
    type,
    data: {
      sessionID,
      inboxID,
      item: {
        type: "user",
        payload: { text },
        ...(metadata
          ? { metadata }
          : {}),
      },
    },
  }
}

function policyCopyCount(
  event: any,
) {
  const text =
    Array.isArray(event?.system)
      ? event.system.map(
          (part: any) =>
            typeof part === "string"
              ? part
              : part?.text ?? "",
        ).join("\n")
      : String(
          event?.system ?? "",
        )

  return text.split(
    "<tencentdb-agent-memory-policy>",
  ).length - 1
}

test(
  "trusted setup metadata suppresses context policy injection for every allowed setup step",
  async () => {
    let contextHook:
      ((event: any) => Promise<void>) |
      undefined

    await installAgentPolicy(
      {
        session: {
          async hook(
            name: string,
            callback: (event: any) => Promise<void>,
          ) {
            assert.equal(name, "context")
            contextHook = callback
          },
        },
      },
      config(),
      traceSpy(),
      modePolicy(true) as any,
    )

    assert.ok(contextHook)

    for (const step of ALLOWED_SETUP_STEPS) {
      const event = {
        sessionID: `setup-context-${step}`,
        system: [{ text: "base" }],
        messages: [{
          id: `message-${step}`,
          type: "user",
          text: `setup ${step}`,
          metadata: setupMetadata(step),
        }],
      }

      await contextHook!(event)
      assert.equal(
        event.system[0].text,
        "base",
        step,
      )
    }
  },
)

test(
  "trusted setup admission allocates no turn state and performs no success or session-end action",
  async () => {
    const turns = new TurnStore()
    const calls: string[] = []
    const lifecycle = new OpenCodeLifecycle(
      turns,
      {
        async capture() {
          calls.push("capture")
          return true
        },
      } as any,
      guardSpy(calls) as any,
      dreamRegistrySpy(calls) as any,
      traceSpy(),
      modePolicy(true) as any,
    )
    const sessionID =
      "trusted-no-allocation"

    await admitSetupTurn(
      lifecycle,
      sessionID,
    )

    assert.deepEqual(
      turns.stats(),
      {
        bufferedTurns: 0,
        activeExecutions: 0,
      },
    )
    assert.deepEqual(calls, [])

    await finishTurn(
      lifecycle,
      sessionID,
    )
    await lifecycle.handle({
      type: "session.ended",
      data: { sessionID },
    })

    assert.deepEqual(calls, [])
    assert.deepEqual(
      turns.stats(),
      {
        bufferedTurns: 0,
        activeExecutions: 0,
      },
    )
  },
)

test(
  "trusted setup admission prevents the initial capture POST",
  async (t) => {
    let posts = 0
    const turns = new TurnStore()
    const capture = new CaptureService(
      config(),
      {
        async captureTurn() {
          posts += 1
          return { ok: true }
        },
      } as any,
      traceSpy(),
      modePolicy(true) as any,
    )
    t.after(() => capture.stop())

    const lifecycle = new OpenCodeLifecycle(
      turns,
      capture,
      guardSpy([]) as any,
      dreamRegistrySpy([]) as any,
      traceSpy(),
      modePolicy(true) as any,
    )
    const sessionID =
      "trusted-no-initial-post"

    await admitSetupTurn(
      lifecycle,
      sessionID,
    )
    await finishTurn(
      lifecycle,
      sessionID,
    )

    assert.equal(posts, 0)
  },
)

test(
  "trusted setup admission blocks retrieval, dream, and admin effects even when dev policy is enabled",
  async () => {
    const calls: string[] = []
    const turns = new TurnStore()
    const dreams =
      new DreamSessionRegistry()
    const lifecycle = new OpenCodeLifecycle(
      turns,
      { async capture() { return true } } as any,
      guardSpy(calls) as any,
      dreamRegistrySpy(calls) as any,
      traceSpy(),
      modePolicy(true) as any,
    )
    const sessionID =
      "trusted-tools-denied"

    await admitSetupTurn(
      lifecycle,
      sessionID,
    )
    calls.length = 0

    const definitions =
      new Map<string, any>()
    const note =
      (name: string, value: unknown) =>
        async () => {
          calls.push(name)
          return value
        }
    const memory: any = {
      searchAtomic: note(
        "memory.searchAtomic",
        { items: [] },
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
    const toolContext = {
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
    const common = {
      config: config(),
      turns,
      trace: traceSpy(),
      policy: modePolicy(true),
    }

    await registerTools(
      toolContext,
      {
        ...common,
        memory,
        knowledge,
        context: {
          retrieve: note(
            "context.retrieve",
            {},
          ),
        },
        assets: {
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
            { id: "graph-test" },
          ),
        },
        capture: {
          capture: note(
            "capture.capture",
            true,
          ),
        },
        guard: {
          failureThreshold: 3,
          maxCallsPerTurn: null,
          consumeTurn() {
            calls.push("guard.consumeTurn")
            return { allowed: true }
          },
          admit() {
            calls.push("guard.admit")
            return { action: "allow" }
          },
          recordOutcome() {
            calls.push("guard.recordOutcome")
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
        },
      } as any,
    )
    await registerDreamTools(
      toolContext,
      {
        ...common,
        sessions: dreams,
        sampler: {
          async sample() {
            calls.push("dream.sample")
            return {}
          },
        },
        committer: {
          async commit() {
            calls.push("dream.commit")
            return {}
          },
        },
      } as any,
    )

    const invocations: Array<[
      string,
      Record<string, unknown>,
    ]> = [
      [
        "tdai_context",
        { query: "memory", mode: "memory" },
      ],
      ["tdai_memory_health", {}],
      [
        "tdai_capture",
        {
          user_content: "user",
          assistant_content: "assistant",
        },
      ],
      [
        "tdai_dream_begin",
        {
          role: "worker",
          protocol: "TDAI_DREAM_SKILL_V1",
        },
      ],
    ]

    await Promise.allSettled(
      invocations.map(
        ([name, args]) =>
          definitions.get(name).execute(
            args,
            {
              sessionID,
              agent: "osho",
            },
          ),
      ),
    )

    assert.deepEqual(calls, [])
    assert.equal(
      dreams.get(sessionID),
      undefined,
    )
  },
)

test(
  "setup suppression ends per completed generation without leaking effects or becoming sticky for the session",
  { concurrency: false },
  async (t) => {
    const turns = new TurnStore()
    const policy =
      setupAwareModePolicy(true)
    const captureSessions: string[] = []
    const retrievalSessions: string[] = []
    const capture = new CaptureService(
      config(),
      {
        async captureTurn(turn: any) {
          captureSessions.push(
            turn.sessionID,
          )
          return { ok: true }
        },
      } as any,
      traceSpy(),
      policy as any,
    )
    t.after(() => capture.stop())

    const lifecycle =
      new OpenCodeLifecycle(
        turns,
        capture,
        guardSpy([]) as any,
        dreamRegistrySpy([]) as any,
        traceSpy(),
        policy as any,
      )

    let contextHook:
      ((event: any) => Promise<void>) |
      undefined
    await installAgentPolicy(
      {
        session: {
          async hook(
            name: string,
            callback:
              (event: any) => Promise<void>,
          ) {
            assert.equal(name, "context")
            contextHook = callback
          },
        },
      },
      config(),
      traceSpy(),
      policy as any,
    )
    assert.ok(contextHook)

    const definitions =
      new Map<string, any>()
    await registerTools(
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
        config: config(),
        turns,
        trace: traceSpy(),
        policy,
        context: {
          async retrieve(input: any) {
            retrievalSessions.push(
              input.sessionID,
            )
            return {
              available: true,
              query: input.query,
            }
          },
        },
        guard: {
          consumeTurn() {
            return { allowed: true }
          },
          admit() {
            return { action: "allow" }
          },
          recordOutcome() {},
          envelopeFor() {
            return {
              turn: {
                used: 1,
                limit: null,
                remaining: null,
                exhausted: false,
                calls: ["tdai_context"],
              },
              source: {
                id: "context",
                status: "ok",
                consecutiveFailures: 0,
                threshold: 3,
                lastError: null,
                lastProbeAt: null,
              },
            }
          },
        },
      } as any,
    )

    const invokeContext =
      async (sessionID: string) => {
        try {
          await definitions
            .get("tdai_context")
            .execute(
              {
                query: "restore dev memory",
                mode: "memory",
              },
              {
                sessionID,
                agent: "osho",
              },
            )
          return "allowed"
        } catch (error) {
          return String(error).includes(
            SETUP_SUPPRESSION_DENIAL,
          )
            ? "setup-denied"
            : String(error)
        }
      }

    const sessionID =
      "setup-then-ordinary-same-session"
    await admitSetupTurn(
      lifecycle,
      sessionID,
    )

    const setupContext = {
      sessionID,
      system: [{ text: "base" }],
      messages: [{
        type: "user",
        text: "internal setup turn",
        metadata: setupMetadata(),
      }],
    }
    await contextHook!(setupContext)
    const setupTool =
      await invokeContext(sessionID)
    const setupAllocation =
      turns.stats()

    await finishTurn(
      lifecycle,
      sessionID,
    )

    const capturesBeforeSuppressedRetry =
      captureSessions.length
    const completedSetupTurn = {
      ...captureTurn(sessionID),
      generation: 77,
      setupSuppressed: true,
    }
    await capture.capture(
      completedSetupTurn,
    )
    await capture.capture(
      completedSetupTurn,
    )
    const capturesAfterSuppressedRetry =
      captureSessions.length

    const ordinaryContext = {
      sessionID,
      system: [{ text: "base" }],
      messages: [{
        type: "user",
        text: "ordinary unmarked dev turn",
      }],
    }
    await contextHook!(ordinaryContext)
    await contextHook!(ordinaryContext)

    const ordinaryInboxID =
      `inbox-${sessionID}-ordinary`
    await lifecycle.handle(
      userInboxEvent(
        "session.inbox.enqueued",
        sessionID,
        ordinaryInboxID,
        "ordinary unmarked dev turn",
      ),
    )
    await lifecycle.handle({
      type: "session.execution.started",
      data: { sessionID },
    })
    await lifecycle.handle(
      userInboxEvent(
        "session.inbox.delivered",
        sessionID,
        ordinaryInboxID,
        "ordinary unmarked dev turn",
      ),
    )
    await lifecycle.handle({
      type: "session.step.started",
      data: {
        sessionID,
        agent: "osho",
      },
    })
    const ordinaryTool =
      await invokeContext(sessionID)
    await lifecycle.handle({
      type: "session.text.ended",
      data: {
        sessionID,
        text: "ordinary response",
      },
    })
    await lifecycle.handle({
      type: "session.execution.succeeded",
      data: { sessionID },
    })
    await new Promise<void>(
      (resolve) => setImmediate(resolve),
    )

    const overlapSessionID =
      "overlapping-setup-generations"
    await lifecycle.handle(
      userInboxEvent(
        "session.inbox.enqueued",
        overlapSessionID,
        "overlap-setup-1",
        "first setup generation",
        setupMetadata("mode"),
      ),
    )
    await lifecycle.handle(
      userInboxEvent(
        "session.inbox.enqueued",
        overlapSessionID,
        "overlap-setup-2",
        "second setup generation",
        setupMetadata("persona_setup"),
      ),
    )

    await finishTurn(
      lifecycle,
      overlapSessionID,
    )
    const overlapAfterFirst = {
      sessionID: overlapSessionID,
      system: [{ text: "base" }],
      messages: [{
        type: "user",
        text: "marker-free while second setup remains",
      }],
    }
    await contextHook!(overlapAfterFirst)
    const overlapToolAfterFirst =
      await invokeContext(
        overlapSessionID,
      )

    await finishTurn(
      lifecycle,
      overlapSessionID,
    )
    const overlapAfterSecond = {
      sessionID: overlapSessionID,
      system: [{ text: "base" }],
      messages: [{
        type: "user",
        text: "marker-free after both setups",
      }],
    }
    await contextHook!(overlapAfterSecond)

    const cleanupSessionID =
      "setup-session-end-cleanup"
    await lifecycle.handle(
      userInboxEvent(
        "session.inbox.enqueued",
        cleanupSessionID,
        "cleanup-setup",
        "setup before session end",
        setupMetadata("introduction"),
      ),
    )
    await lifecycle.handle({
      type: "session.ended",
      data: { sessionID: cleanupSessionID },
    })

    assert.deepEqual(
      {
        setup: {
          policyCopies:
            policyCopyCount(
              setupContext,
            ),
          tool: setupTool,
          allocation:
            setupAllocation,
          captureAttempts:
            capturesBeforeSuppressedRetry,
        },
        completedSuppressedRetry: {
          before:
            capturesBeforeSuppressedRetry,
          after:
            capturesAfterSuppressedRetry,
        },
        ordinary: {
          policyCopies:
            policyCopyCount(
              ordinaryContext,
            ),
          tool: ordinaryTool,
          retrievals:
            retrievalSessions.filter(
              (id) => id === sessionID,
            ).length,
          captures:
            captureSessions.filter(
              (id) => id === sessionID,
            ).length,
        },
        overlap: {
          afterFirstPolicyCopies:
            policyCopyCount(
              overlapAfterFirst,
            ),
          afterFirstTool:
            overlapToolAfterFirst,
          afterSecondPolicyCopies:
            policyCopyCount(
              overlapAfterSecond,
            ),
        },
        cleanup: {
          turnStoreSuppressed:
            turns.isSetupSuppressed(
              cleanupSessionID,
            ),
          policySuppressed:
            await policy
              .isSetupSuppressed(
                cleanupSessionID,
              ),
        },
      },
      {
        setup: {
          policyCopies: 0,
          tool: "setup-denied",
          allocation: {
            bufferedTurns: 0,
            activeExecutions: 0,
          },
          captureAttempts: 0,
        },
        completedSuppressedRetry: {
          before: 0,
          after: 0,
        },
        ordinary: {
          policyCopies: 1,
          tool: "allowed",
          retrievals: 1,
          captures: 1,
        },
        overlap: {
          afterFirstPolicyCopies: 0,
          afterFirstTool:
            "setup-denied",
          afterSecondPolicyCopies: 1,
        },
        cleanup: {
          turnStoreSuppressed: false,
          policySuppressed: false,
        },
      },
    )
  },
)

test(
  "malformed setup metadata never suppresses dev and never authorizes off-mode effects",
  async (t) => {
    const malformed = [
      setupMetadata("mode", {
        kind: "setup-template-step",
      }),
      setupMetadata("mode", {
        templateSchemaVersion: 1,
      }),
      setupMetadata("not-allowed"),
      setupMetadata("Mode"),
      setupMetadata("mode", {
        fingerprint: "g".repeat(64),
      }),
      setupMetadata("mode", {
        fingerprint: "a".repeat(63),
      }),
    ]

    for (
      const [index, metadata]
      of malformed.entries()
    ) {
      await t.test(
        `dev positive control ${index + 1}`,
        async (t) => {
          let posts = 0
          const capture = new CaptureService(
            config(),
            {
              async captureTurn() {
                posts += 1
                return { ok: true }
              },
            } as any,
            traceSpy(),
            modePolicy(true) as any,
          )
          t.after(() => capture.stop())
          const lifecycle =
            new OpenCodeLifecycle(
              new TurnStore(),
              capture,
              guardSpy([]) as any,
              dreamRegistrySpy([]) as any,
              traceSpy(),
              modePolicy(true) as any,
            )
          const sessionID =
            `malformed-dev-${index}`

          await admitSetupTurn(
            lifecycle,
            sessionID,
            metadata,
          )
          await finishTurn(
            lifecycle,
            sessionID,
          )
          assert.equal(posts, 1)
        },
      )
    }

    let offModePosts = 0
    const offModeCapture =
      new CaptureService(
        config(),
        {
          async captureTurn() {
            offModePosts += 1
            return { ok: true }
          },
        } as any,
        traceSpy(),
        modePolicy(false) as any,
      )
    t.after(() => offModeCapture.stop())
    const offModeLifecycle =
      new OpenCodeLifecycle(
        new TurnStore(),
        offModeCapture,
        guardSpy([]) as any,
        dreamRegistrySpy([]) as any,
        traceSpy(),
        modePolicy(false) as any,
      )

    await admitSetupTurn(
      offModeLifecycle,
      "malformed-off-mode",
      malformed[0],
    )
    await finishTurn(
      offModeLifecycle,
      "malformed-off-mode",
    )
    assert.equal(offModePosts, 0)
  },
)

function captureTurn(
  sessionID: string,
) {
  return {
    sessionID,
    generation: 1,
    openCodeAgent: "osho",
    userText: "user",
    assistantText: "assistant",
    assistantMessageIDs: [],
  }
}

function statusError(status: number) {
  return Object.assign(
    new Error(
      `HTTP ${status} /v3/conversation/add`,
    ),
    {
      name: "HttpStatusError",
      status,
    },
  )
}

test(
  "terminal capture HTTP statuses make one attempt, schedule no retry, and do not duplicate pending work",
  async (t) => {
    const statuses = [
      400,
      401,
      403,
      404,
      409,
      413,
      422,
    ]
    const services: CaptureService[] = []
    const attempts =
      new Map<number, number>()

    t.after(() => {
      for (const service of services) {
        service.stop()
      }
    })

    for (const status of statuses) {
      const service = new CaptureService(
        config(),
        {
          async captureTurn() {
            attempts.set(
              status,
              (attempts.get(status) ?? 0) + 1,
            )
            throw statusError(status)
          },
        } as any,
        traceSpy(),
        modePolicy(true) as any,
      )
      services.push(service)

      const turn = captureTurn(
        `terminal-http-${status}`,
      )
      await service.capture(turn)
      await service.capture(turn)
    }

    await new Promise(
      (resolve) => setTimeout(resolve, 1150),
    )

    for (const status of statuses) {
      assert.equal(
        attempts.get(status),
        1,
        `HTTP ${status}`,
      )
    }
  },
)

test(
  "408, 425, 429, 5xx, and TransportError retain one deduplicated bounded retry schedule",
  async (t) => {
    const cases: Array<{
      name: string
      error: Error
    }> = [
      { name: "408", error: statusError(408) },
      { name: "425", error: statusError(425) },
      { name: "429", error: statusError(429) },
      { name: "500", error: statusError(500) },
      { name: "503", error: statusError(503) },
      {
        name: "transport",
        error: Object.assign(
          new Error("socket closed"),
          { name: "TransportError" },
        ),
      },
    ]
    const services: CaptureService[] = []
    const attempts =
      new Map<string, number>()

    t.after(() => {
      for (const service of services) {
        service.stop()
      }
    })

    for (const item of cases) {
      const service = new CaptureService(
        config(),
        {
          async captureTurn() {
            attempts.set(
              item.name,
              (attempts.get(item.name) ?? 0) + 1,
            )
            throw item.error
          },
        } as any,
        traceSpy(),
        modePolicy(true) as any,
      )
      services.push(service)

      const turn = captureTurn(
        `retryable-${item.name}`,
      )
      await service.capture(turn)
      await service.capture(turn)
    }

    await new Promise(
      (resolve) => setTimeout(resolve, 1150),
    )

    for (const item of cases) {
      assert.equal(
        attempts.get(item.name),
        2,
        item.name,
      )
    }
  },
)

test(
  "retryable capture failures give up after the bounded delay schedule",
  async (t) => {
    t.mock.timers.enable({
      apis: ["setTimeout"],
    })

    let attempts = 0
    const capture = new CaptureService(
      config(),
      {
        async captureTurn() {
          attempts += 1
          throw Object.assign(
            new Error("transport failed"),
            { name: "TransportError" },
          )
        },
      } as any,
      traceSpy(),
      modePolicy(true) as any,
    )

    await capture.capture(
      captureTurn("bounded-retry"),
    )
    assert.equal(attempts, 1)

    for (
      const [index, delay]
      of [
        1000,
        5000,
        15000,
        30000,
        60000,
      ].entries()
    ) {
      t.mock.timers.tick(delay)
      await new Promise<void>(
        (resolve) => setImmediate(resolve),
      )
      assert.equal(
        attempts,
        index + 2,
        `retry ${index + 1}`,
      )
    }

    t.mock.timers.tick(120_000)
    await new Promise<void>(
      (resolve) => setImmediate(resolve),
    )
    assert.equal(attempts, 6)
    capture.stop()
  },
)

test(
  "terminal HTTP responses do not count against the transport circuit breaker",
  { concurrency: false },
  async (t) => {
    const originalFetch =
      globalThis.fetch
    t.after(() => {
      globalThis.fetch = originalFetch
    })

    for (
      const status
      of [
        400,
        401,
        403,
        404,
        409,
        413,
        422,
      ]
    ) {
      globalThis.fetch =
        async () =>
          new Response(
            JSON.stringify({
              error: "terminal request",
            }),
            { status },
          )

      const client = new HttpJsonClient(
        "https://no-network.invalid",
        100,
        1,
        60_000,
        () => ({}),
      )
      await assert.rejects(
        client.request("/capture"),
      )
      assert.equal(
        client.breaker.snapshot().failures,
        0,
        `HTTP ${status}`,
      )
      assert.equal(
        client.breaker.snapshot().open,
        false,
        `HTTP ${status}`,
      )
    }
  },
)

test(
  "retryable HTTP responses and transport failures still count against the circuit breaker",
  { concurrency: false },
  async (t) => {
    const originalFetch =
      globalThis.fetch
    t.after(() => {
      globalThis.fetch = originalFetch
    })

    const cases: Array<{
      name: string
      fetch: typeof fetch
    }> = [
      ...[
        408,
        425,
        429,
        500,
        503,
      ].map((status) => ({
        name: `HTTP ${status}`,
        fetch: async () =>
          new Response(
            "retryable",
            { status },
          ),
      })),
      {
        name: "TransportError",
        fetch: async () => {
          throw Object.assign(
            new Error("network unavailable"),
            { name: "TransportError" },
          )
        },
      },
    ]

    for (const item of cases) {
      globalThis.fetch = item.fetch
      const client = new HttpJsonClient(
        "https://no-network.invalid",
        100,
        1,
        60_000,
        () => ({}),
      )
      await assert.rejects(
        client.request("/capture"),
      )
      assert.equal(
        client.breaker.snapshot().failures,
        1,
        item.name,
      )
      assert.equal(
        client.breaker.snapshot().open,
        true,
        item.name,
      )
    }
  },
)

test(
  "a retry rechecks trusted setup suppression and stops without another POST",
  async (t) => {
    let posts = 0
    let setupSuppressed = false
    const policy = {
      ...modePolicy(true),
      async isSetupSuppressed(
        sessionID: string | null,
      ) {
        return Boolean(
          sessionID && setupSuppressed,
        )
      },
    }
    const capture = new CaptureService(
      config(),
      {
        async captureTurn() {
          posts += 1
          throw Object.assign(
            new Error("transport failed"),
            { name: "TransportError" },
          )
        },
      } as any,
      traceSpy(),
      policy as any,
    )
    t.after(() => capture.stop())

    await capture.capture(
      captureTurn(
        "retry-becomes-setup-suppressed",
      ),
    )
    assert.equal(posts, 1)

    setupSuppressed = true
    await new Promise(
      (resolve) => setTimeout(resolve, 1150),
    )
    assert.equal(posts, 1)
  },
)
