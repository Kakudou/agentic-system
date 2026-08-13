import type {
  AppConfig,
} from "../../config.ts"

import {
  resolveMemoryScope,
} from "../../config.ts"

import type {
  DreamKind,
  DreamSample,
  DreamSource,
} from "../../domain/dream/model.ts"

import type {
  MemoryPort,
  TracePort,
} from "../../domain/ports.ts"

import {
  DreamSessionRegistry,
} from "./dream-session-registry.ts"

function objectRecord(
  value: unknown,
): Record<string, any> {
  return (
    value &&
    typeof value === "object"
  )
    ? value as Record<string, any>
    : {}
}

function arrayField(
  value: unknown,
  key: string,
): any[] {
  const record =
    objectRecord(value)

  return Array.isArray(
    record[key],
  )
    ? record[key]
    : []
}

function textField(
  value: unknown,
  key: string,
): string {
  const record =
    objectRecord(value)

  return typeof record[key] ===
    "string"
    ? record[key]
    : ""
}

function truncate(
  value: string,
  maxChars: number,
): string {
  if (
    maxChars <= 0 ||
    value.length <= maxChars
  ) {
    return value
  }

  return (
    value.slice(
      0,
      Math.max(
        0,
        maxChars - 24,
      ),
    ) +
    "\n[… dream sample truncated]"
  )
}

function hash32(
  value: string,
): number {
  let hash =
    2166136261

  for (
    let index = 0;
    index < value.length;
    index++
  ) {
    hash ^=
      value.charCodeAt(index)

    hash =
      Math.imul(
        hash,
        16777619,
      )
  }

  return hash >>> 0
}

function xorshift32(
  seed: number,
) {
  let state =
    seed || 0x9e3779b9

  return () => {
    state ^=
      state << 13
    state ^=
      state >>> 17
    state ^=
      state << 5

    return (
      state >>> 0
    ) / 0x100000000
  }
}

function shuffled<T>(
  values: T[],
  entropy: string,
  salt: string,
): T[] {
  const copy =
    [...values]

  const random =
    xorshift32(
      hash32(
        `${entropy}\u0000${salt}`,
      ),
    )

  for (
    let index =
      copy.length - 1;
    index > 0;
    index--
  ) {
    const pick =
      Math.floor(
        random() *
        (index + 1),
      )

    ;[
      copy[index],
      copy[pick],
    ] = [
      copy[pick],
      copy[index],
    ]
  }

  return copy
}

function take<T>(
  values: T[],
  count: number,
  entropy: string,
  salt: string,
): T[] {
  if (count <= 0) {
    return []
  }

  return shuffled(
    values,
    entropy,
    salt,
  ).slice(
    0,
    count,
  )
}

function sampleID(
  entropy: string,
  sessionID: string,
  agent: string,
): string {
  const left =
    hash32(
      `${entropy}:${sessionID}:${agent}`,
    )
      .toString(16)
      .padStart(8, "0")

  const right =
    hash32(
      `${Date.now()}:${entropy.length}:${agent}`,
    )
      .toString(16)
      .padStart(8, "0")

  return `drs_${left}${right}`
}

async function settled(
  operation:
    () => Promise<unknown>,
): Promise<unknown> {
  try {
    return await operation()
  } catch (error) {
    return {
      unavailable: true,
      error:
        String(error),
    }
  }
}

export class DreamSampler {
  constructor(
    private readonly config:
      AppConfig,

    private readonly memory:
      MemoryPort,

    private readonly sessions:
      DreamSessionRegistry,

    private readonly trace:
      TracePort,
  ) {}

  async sample(input: {
    sessionID: string
    generation: number
    openCodeAgent: string
    kind: DreamKind
    entropy: string
  }) {
    if (!this.config.dream.enabled) {
      return {
        terminal: true,
        terminal_code:
          "TDAI_DREAM_DISABLED",
      }
    }

    const state =
      this.sessions.get(
        input.sessionID,
      )

    if (
      !state ||
      state.generation !==
        input.generation ||
      state.role !== "worker"
    ) {
      return {
        terminal: true,
        terminal_code:
          "TDAI_DREAM_SESSION_REQUIRED",
        message:
          "Call tdai_dream_begin(role='worker') first.",
      }
    }

    if (state.sample) {
      return {
        reused: true,
        terminal: false,
        sample:
          state.sample,
        message:
          "The dream sample is immutable for this execution. Use it; do not retrieve another sample.",
      }
    }

    if (
      state.openCodeAgent &&
      input.openCodeAgent &&
      state.openCodeAgent !==
        input.openCodeAgent
    ) {
      return {
        terminal: true,
        terminal_code:
          "TDAI_DREAM_AGENT_MISMATCH",
      }
    }

    const scope =
      resolveMemoryScope(
        this.config,
        input.openCodeAgent,
      )

    if (!scope) {
      return {
        terminal: true,
        terminal_code:
          "TDAI_DREAM_UNMAPPED_AGENT",
        openCodeAgent:
          input.openCodeAgent ||
          null,
      }
    }

    const entropy =
      input.entropy
        .trim()
        .toLowerCase()

    if (
      !/^[0-9a-f]{16,128}$/.test(
        entropy,
      )
    ) {
      return {
        terminal: true,
        terminal_code:
          "TDAI_DREAM_INVALID_ENTROPY",
        message:
          "entropy must be the 16-128 hexadecimal value generated by the dream runtime roll.",
      }
    }

    const sampleConfig =
      this.config.dream.sample

    const [
      atomicResult,
      conversationResult,
      scenarioIndexResult,
      coreResult,
    ] =
      await Promise.all([
        settled(
          () =>
            this.memory
              .queryAtomic(
                scope,
                {
                  limit:
                    sampleConfig
                      .atomicPool,
                  offset: 0,
                },
              ),
        ),

        settled(
          () =>
            this.memory
              .queryConversations(
                scope,
                {
                  limit:
                    sampleConfig
                      .conversationPool,
                  offset: 0,
                },
              ),
        ),

        sampleConfig.scenarios > 0
          ? settled(
              () =>
                this.memory
                  .listScenarios(
                    scope,
                  ),
            )
          : Promise.resolve({
              entries: [],
            }),

        sampleConfig.includeCore
          ? settled(
              () =>
                this.memory
                  .readCore(
                    scope,
                  ),
            )
          : Promise.resolve(null),
      ])

    const atoms =
      take(
        arrayField(
          atomicResult,
          "items",
        ),
        sampleConfig.atoms,
        entropy,
        "L1",
      )

    const conversations =
      take(
        arrayField(
          conversationResult,
          "messages",
        ),
        sampleConfig
          .conversations,
        entropy,
        "L0",
      )

    const scenarioEntries =
      arrayField(
        scenarioIndexResult,
        "entries",
      ).filter(
        (entry) => {
          const path =
            textField(
              entry,
              "path",
            )

          return (
            path &&
            !path.endsWith("/") &&
            !path.startsWith(
              `${this.config.dream.pathPrefix}/`,
            )
          )
        },
      )

    const selectedScenarios =
      take(
        scenarioEntries,
        sampleConfig.scenarios,
        entropy,
        "L2",
      )

    const scenarioFiles =
      await Promise.all(
        selectedScenarios.map(
          async (entry) => {
            const path =
              textField(
                entry,
                "path",
              )

            const result =
              await settled(
                () =>
                  this.memory
                    .readScenario(
                      scope,
                      {
                        path,
                      },
                    ),
              )

            return {
              path,
              result,
            }
          },
        ),
      )

    const sources:
      DreamSource[] = []

    for (
      const atom of atoms
    ) {
      const content =
        textField(
          atom,
          "content",
        ).trim()

      if (!content) {
        continue
      }

      sources.push({
        layer: "L1",
        id:
          textField(
            atom,
            "id",
          ) || undefined,
        version:
          textField(
            atom,
            "version",
          ) || undefined,
        type:
          textField(
            atom,
            "type",
          ) || undefined,
        content:
          truncate(
            content,
            sampleConfig
              .sourceMaxChars,
          ),
        background:
          truncate(
            textField(
              atom,
              "background",
            ),
            Math.floor(
              sampleConfig
                .sourceMaxChars /
              2,
            ),
          ) || undefined,
      })
    }

    for (
      const message of
        conversations
    ) {
      const content =
        textField(
          message,
          "content",
        ).trim()

      if (!content) {
        continue
      }

      sources.push({
        layer: "L0",
        id:
          textField(
            message,
            "id",
          ) || undefined,
        version:
          textField(
            message,
            "version",
          ) || undefined,
        role:
          textField(
            message,
            "role",
          ) || undefined,
        timestamp:
          textField(
            message,
            "timestamp",
          ) || undefined,
        content:
          truncate(
            content,
            sampleConfig
              .sourceMaxChars,
          ),
      })
    }

    for (
      const scenario of
        scenarioFiles
    ) {
      const content =
        textField(
          scenario.result,
          "content",
        ).trim()

      if (!content) {
        continue
      }

      sources.push({
        layer: "L2",
        path:
          scenario.path,
        version:
          textField(
            scenario.result,
            "version",
          ) || undefined,
        content:
          truncate(
            content,
            sampleConfig
              .scenarioMaxChars,
          ),
      })
    }

    if (
      sampleConfig.includeCore
    ) {
      const coreContent =
        textField(
          coreResult,
          "content",
        ).trim()

      if (coreContent) {
        sources.push({
          layer: "L3",
          version:
            textField(
              coreResult,
              "version",
            ) || undefined,
          content:
            truncate(
              coreContent,
              sampleConfig
                .coreMaxChars,
            ),
        })
      }
    }

    const sample:
      DreamSample = {
        sampleId:
          sampleID(
            entropy,
            input.sessionID,
            input.openCodeAgent,
          ),
        kind:
          input.kind,
        entropyFingerprint:
          entropy.slice(0, 12),
        createdAt:
          new Date()
            .toISOString(),
        sources,
      }

    this.sessions.attachSample(
      input.sessionID,
      input.generation,
      sample,
    )

    this.trace.write(
      "DREAM_SAMPLE_READY",
      {
        sessionID:
          input.sessionID,
        generation:
          input.generation,
        openCodeAgent:
          input.openCodeAgent,
        agentID:
          scope.agentId,
        kind:
          input.kind,
        sampleID:
          sample.sampleId,
        layers:
          sources.map(
            (source) =>
              source.layer,
          ),
        sourceCount:
          sources.length,
      },
    )

    return {
      terminal:
        sources.length === 0,
      terminal_code:
        sources.length === 0
          ? "TDAI_DREAM_NO_MEMORY_SAMPLE"
          : undefined,
      sample,
      instruction:
        sources.length
          ? (
              "This is the only memory sample for this dream execution. " +
              "Do not call ordinary Tencent retrieval, Wiki, CodeGraph, or public web tools. " +
              "Create one bounded dream/nightmare from this evidence, then call tdai_dream_commit exactly once."
            )
          : (
              "No usable memory was sampled. Do not invent memories and do not commit a dream."
            ),
    }
  }
}
