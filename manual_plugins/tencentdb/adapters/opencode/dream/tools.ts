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
                        "Now perform the /dev/urandom roll from the dream skill. " +
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
          "tdai_dream_sample",
        codemode:
          false,
        description:
          "DREAM WORKER ONLY. Return exactly one bounded, entropy-selected sample of the current archetype's own TencentDB L0/L1/L2/L3 memory. " +
          "Prior Dream L2 scenarios are excluded to prevent recursive dream amplification. Repeated calls reuse the same immutable sample.",
        input: {
          type: "object",
          properties: {
            kind: {
              type: "string",
              enum: [
                "dream",
                "nightmare",
              ],
            },
            entropy: {
              type: "string",
              minLength: 16,
              maxLength: 128,
              pattern:
                "^[0-9a-fA-F]+$",
            },
          },
          required: [
            "kind",
            "entropy",
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

            return present(
              await deps.sampler
                .sample({
                  sessionID,
                  generation:
                    generation(
                      sessionID,
                      deps.turns,
                    ),
                  openCodeAgent:
                    agent,
                  kind:
                    String(
                      args.kind,
                    ) as DreamKind,
                  entropy:
                    String(
                      args.entropy ??
                      "",
                    ),
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
            kind: {
              type: "string",
              enum: [
                "dream",
                "nightmare",
              ],
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
            "kind",
            "title",
            "seed",
            "dream",
            "association",
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

            return present(
              await deps.committer
                .commit({
                  sessionID,
                  generation:
                    generation(
                      sessionID,
                      deps.turns,
                    ),
                  openCodeAgent:
                    agent,
                  sampleID:
                    String(
                      args.sample_id ??
                      "",
                    ),
                  kind:
                    String(
                      args.kind,
                    ) as DreamKind,
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
        "tdai_dream_sample",
        "tdai_dream_commit",
      ],
    },
  )
}
