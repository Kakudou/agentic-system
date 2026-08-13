import type {
  AppConfig,
} from "../../../config.ts"

import {
  resolveMemoryScope,
} from "../../../config.ts"

import type {
  DreamKind,
  DreamRole,
} from "../../../domain/dream/model.ts"

import {
  wrapLanguageEvidence,
} from "../../../domain/policies/language-policy.ts"

import type {
  TracePort,
} from "../../../domain/ports.ts"

import {
  DreamCommitter,
} from "../../../application/dream/dream-committer.ts"

import {
  DreamSampler,
} from "../../../application/dream/dream-sampler.ts"

import {
  DreamSessionRegistry,
} from "../../../application/dream/dream-session-registry.ts"

import {
  TurnStore,
} from "../turn-store.ts"

const STRING_OUTPUT = {
  type: "string",
}

function secureRandomInt(
  maxExclusive: number,
): number {
  if (
    !Number.isInteger(maxExclusive) ||
    maxExclusive <= 0 ||
    maxExclusive > 0x1_0000_0000
  ) {
    throw new Error(
      "TDAI_RANDOM_RANGE_INVALID",
    )
  }

  // Rejection sampling avoids modulo bias while keeping the plugin free of
  // Node-specific type dependencies. OpenCode V2 runs in a Web-Crypto-capable
  // JavaScript runtime.
  const range = 0x1_0000_0000
  const limit =
    Math.floor(
      range / maxExclusive,
    ) * maxExclusive

  const buffer =
    new Uint32Array(1)

  let value = 0
  do {
    crypto.getRandomValues(
      buffer,
    )
    value = buffer[0] ?? 0
  } while (value >= limit)

  return value % maxExclusive
}

function secureRandomHex(
  byteLength: number,
): string {
  const bytes =
    new Uint8Array(byteLength)
  crypto.getRandomValues(bytes)
  return Array.from(bytes)
    .map((value) =>
      value
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")
}



function toolResult(
  value: unknown,
) {
  const text =
    typeof value === "string"
      ? value
      : JSON.stringify(
          value,
          null,
          2,
        )

  return {
    output: text,
    content: text,
  }
}

function present(
  value: unknown,
  config: AppConfig,
) {
  return toolResult(
    wrapLanguageEvidence(
      value,
      config.guardrails
        .outputLanguage,
      (
        config.guardrails.enabled &&
        config.guardrails
          .annotateTencentEvidence
      ),
    ),
  )
}

function currentSession(
  toolCtx: any,
  turns: TurnStore,
): string {
  return (
    (
      typeof toolCtx?.sessionID ===
        "string"
        ? toolCtx.sessionID
        : ""
    ) ||
    turns.latestExecutionSession(
      30000,
    ) ||
    "opencode-v2"
  )
}

function currentAgent(
  toolCtx: any,
  turns: TurnStore,
): string {
  const agent =
    toolCtx?.agent

  if (
    typeof agent === "string" &&
    agent.trim()
  ) {
    return agent.trim()
  }

  if (
    agent &&
    typeof agent === "object"
  ) {
    const explicit =
      (
        typeof agent.id ===
          "string"
          ? agent.id
          : ""
      ) ||
      (
        typeof agent.name ===
          "string"
          ? agent.name
          : ""
      )

    if (explicit.trim()) {
      return explicit.trim()
    }
  }

  const sessionID =
    currentSession(
      toolCtx,
      turns,
    )

  return turns.currentAgent(
    sessionID,
  )
}

function generation(
  sessionID: string,
  turns: TurnStore,
): number {
  return turns.get(
    sessionID,
  )?.generation ?? 0
}

export type DreamToolDependencies = {
  config: AppConfig
  turns: TurnStore
  sessions: DreamSessionRegistry
  sampler: DreamSampler
  committer: DreamCommitter
  trace: TracePort
}

export async function registerDreamTools(
  ctx: any,
  deps: DreamToolDependencies,
) {
  await ctx.tool.transform(
    (tools: any) => {
      tools.add({
        name:
          "tdai_dream_begin",
        codemode:
          false,
        description:
          "DREAM SKILL ONLY. Mark the current OpenCode execution as an explicit dream execution so normal L0 auto-capture is suppressed. " +
          "The /dream orchestrator and every dream worker MUST call this before RNG or any dream operation. Never use during ordinary work.",
        input: {
          type: "object",
          properties: {
            role: {
              type: "string",
              enum: [
                "orchestrator",
                "worker",
              ],
            },
            protocol: {
              type: "string",
              enum: [
                "TDAI_DREAM_SKILL_V1",
              ],
            },
          },
          required: [
            "role",
            "protocol",
          ],
          additionalProperties:
            false,
        },
        output:
          STRING_OUTPUT,
        execute:
          async (
            args: any,
            toolCtx: any,
          ) => {
            if (!deps.config.dream.enabled) {
              return present(
                {
                  terminal: true,
                  terminal_code:
                    "TDAI_DREAM_DISABLED",
                },
                deps.config,
              )
            }

            if (
              args.protocol !==
                "TDAI_DREAM_SKILL_V1"
            ) {
              return present(
                {
                  terminal: true,
                  terminal_code:
                    "TDAI_DREAM_PROTOCOL_REQUIRED",
                },
                deps.config,
              )
            }

            const sessionID =
              currentSession(
                toolCtx,
                deps.turns,
              )

            const agent =
              currentAgent(
                toolCtx,
                deps.turns,
              )

            const currentGeneration =
              generation(
                sessionID,
                deps.turns,
              )

            const role =
              String(
                args.role,
              ) as DreamRole

            if (
              role === "worker" &&
              !resolveMemoryScope(
                deps.config,
                agent,
              )
            ) {
              return present(
                {
                  terminal: true,
                  terminal_code:
                    "TDAI_DREAM_UNMAPPED_AGENT",
                  openCodeAgent:
                    agent || null,
                },
                deps.config,
              )
            }

            const state =
              deps.sessions.begin({
                sessionID,
                generation:
                  currentGeneration,
                role,
                openCodeAgent:
                  agent,
              })

            deps.trace.write(
              "DREAM_SESSION_BEGIN",
              {
                sessionID,
                generation:
                  currentGeneration,
                role,
                openCodeAgent:
                  agent || null,
              },
            )

            return present(
              {
                dream_session: true,
                role:
                  state.role,
                session_id:
                  state.sessionID,
                generation:
                  state.generation,
                open_code_agent:
                  state.openCodeAgent ||
                  null,
                normal_capture_suppressed:
                  true,
                instruction:
                  role === "worker"
                    ? (
                        "Now call tdai_dream_roll exactly once. " +
                        "If outcome=nothing, return immediately without sampling. " +
                        "If dream/nightmare, call tdai_dream_sample exactly once."
                      )
                    : (
                        "Spawn exactly one callable custom archetype subagent at a time using the native OpenCode subagent roster. " +
                        "Each worker must load the dream skill and begin its own dream session."
                      ),
              },
              deps.config,
            )
          },
      })

      tools.add({
        name:
          "tdai_dream_roll",
        codemode:
          false,
        description:
          "DREAM WORKER ONLY. Produce the one cryptographically random 60/30/10 dream outcome for this execution. Repeated calls return the same immutable roll and never reroll.",
        input: {
          type: "object",
          properties: {},
          additionalProperties:
            false,
        },
        output:
          STRING_OUTPUT,
        execute:
          async (
            _args: any,
            toolCtx: any,
          ) => {
            const sessionID =
              currentSession(
                toolCtx,
                deps.turns,
              )

            const currentGeneration =
              generation(
                sessionID,
                deps.turns,
              )

            const state =
              deps.sessions.get(
                sessionID,
              )

            if (
              !state ||
              state.generation !==
                currentGeneration ||
              state.role !== "worker"
            ) {
              return present(
                {
                  terminal: true,
                  terminal_code:
                    "TDAI_DREAM_SESSION_REQUIRED",
                  message:
                    "Call tdai_dream_begin(role='worker') first.",
                },
                deps.config,
              )
            }

            if (state.roll) {
              return present(
                {
                  terminal: false,
                  reused: true,
                  roll:
                    state.roll.roll,
                  outcome:
                    state.roll.outcome,
                },
                deps.config,
              )
            }

            const roll =
              secureRandomInt(100)

            const outcome =
              roll < 60
                ? "nothing"
                : roll < 90
                  ? "dream"
                  : "nightmare"

            const attached =
              deps.sessions
                .attachRoll(
                  sessionID,
                  currentGeneration,
                  {
                    roll,
                    outcome,
                    entropy:
                      secureRandomHex(16),
                  },
                )

            return present(
              {
                terminal: false,
                reused: false,
                roll:
                  attached.roll?.roll,
                outcome:
                  attached.roll?.outcome,
              },
              deps.config,
            )
          },
      })

      tools.add({
        name:
          "tdai_dream_sample",
        codemode:
          false,
        description:
          "DREAM WORKER ONLY. After tdai_dream_roll selected dream/nightmare, return exactly one bounded sample of the current archetype's own TencentDB L0/L1/L2/L3 memory. " +
          "The plugin reuses the roll's private entropy; the model cannot substitute it. Prior Dream L2 scenarios are excluded to prevent recursive amplification. Repeated calls reuse the same immutable sample.",
        input: {
          type: "object",
          properties: {},
          additionalProperties:
            false,
        },
        output:
          STRING_OUTPUT,
        execute:
          async (
            _args: any,
            toolCtx: any,
          ) => {
            const sessionID =
              currentSession(
                toolCtx,
                deps.turns,
              )

            const agent =
              currentAgent(
                toolCtx,
                deps.turns,
              )

            const currentGeneration =
              generation(
                sessionID,
                deps.turns,
              )

            const state =
              deps.sessions.get(
                sessionID,
              )

            if (
              !state ||
              state.generation !==
                currentGeneration ||
              state.role !== "worker" ||
              !state.roll
            ) {
              return present(
                {
                  terminal: true,
                  terminal_code:
                    "TDAI_DREAM_ROLL_REQUIRED",
                },
                deps.config,
              )
            }

            if (
              state.roll.outcome ===
              "nothing"
            ) {
              return present(
                {
                  terminal: true,
                  terminal_code:
                    "TDAI_DREAM_NOTHING",
                  message:
                    "The immutable roll selected nothing; no memory sample is allowed for this execution.",
                },
                deps.config,
              )
            }

            return present(
              await deps.sampler
                .sample({
                  sessionID,
                  generation:
                    currentGeneration,
                  openCodeAgent:
                    agent,
                  kind:
                    state.roll
                      .outcome as DreamKind,
                  entropy:
                    state.roll.entropy,
                }),
              deps.config,
            )
          },
      })

      tools.add({
        name:
          "tdai_dream_commit",
        codemode:
          false,
        description:
          "DREAM WORKER ONLY. Commit exactly ONE low-authority L2 Scenario candidate derived from the immutable tdai_dream_sample. " +
          "The plugin controls the path, provenance warning, and one-shot mutation boundary. A second commit is deterministically rejected.",
        input: {
          type: "object",
          properties: {
            sample_id: {
              type: "string",
            },
            title: {
              type: "string",
              maxLength: 120,
            },
            seed: {
              type: "string",
              maxLength: 400,
            },
            dream: {
              type: "string",
              maxLength: 3600,
            },
            association: {
              type: "string",
              maxLength: 1400,
            },
            grounding: {
              type: "string",
              maxLength: 1000,
            },
          },
          required: [
            "sample_id",
            "title",
            "seed",
            "dream",
            "association",
            "grounding",
          ],
          additionalProperties:
            false,
        },
        output:
          STRING_OUTPUT,
        execute:
          async (
            args: any,
            toolCtx: any,
          ) => {
            const sessionID =
              currentSession(
                toolCtx,
                deps.turns,
              )

            const agent =
              currentAgent(
                toolCtx,
                deps.turns,
              )

            const currentGeneration =
              generation(
                sessionID,
                deps.turns,
              )

            const state =
              deps.sessions.get(
                sessionID,
              )

            if (!state?.sample) {
              return present(
                {
                  terminal: true,
                  terminal_code:
                    "TDAI_DREAM_SAMPLE_REQUIRED",
                },
                deps.config,
              )
            }

            return present(
              await deps.committer
                .commit({
                  sessionID,
                  generation:
                    currentGeneration,
                  openCodeAgent:
                    agent,
                  sampleID:
                    String(
                      args.sample_id ??
                      "",
                    ),
                  kind:
                    state.sample.kind,
                  title:
                    args.title,
                  seed:
                    args.seed,
                  dream:
                    args.dream,
                  association:
                    args.association,
                  grounding:
                    args.grounding,
                }),
              deps.config,
            )
          },
      })
    },
  )

  deps.trace.write(
    "DREAM_TOOLS_INSTALLED",
    {
      tools: [
        "tdai_dream_begin",
        "tdai_dream_roll",
        "tdai_dream_sample",
        "tdai_dream_commit",
      ],
    },
  )
}
