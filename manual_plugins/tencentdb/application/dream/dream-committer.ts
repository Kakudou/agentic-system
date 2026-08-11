import type {
  AppConfig,
} from "../../config.ts"

import {
  resolveMemoryScope,
} from "../../config.ts"

import type {
  DreamKind,
  DreamSample,
} from "../../domain/dream/model.ts"

import type {
  MemoryPort,
  TracePort,
} from "../../domain/ports.ts"

import {
  DreamSessionRegistry,
} from "./dream-session-registry.ts"

function trimTo(
  value: unknown,
  limit: number,
): string {
  const text =
    typeof value === "string"
      ? value.trim()
      : ""

  if (
    text.length <= limit
  ) {
    return text
  }

  return (
    text.slice(
      0,
      Math.max(
        0,
        limit - 16,
      ),
    ) +
    "\n[… truncated]"
  )
}

function safePathPart(
  value: string,
): string {
  return value
    .toLowerCase()
    .replace(
      /[^a-z0-9_-]+/g,
      "-",
    )
    .replace(
      /^-+|-+$/g,
      "",
    )
    .slice(0, 64) ||
    "agent"
}

function yamlString(
  value: string,
): string {
  return JSON.stringify(value)
}

function sourceRefs(
  sample: DreamSample,
): string[] {
  return sample.sources.map(
    (source) => {
      if (source.layer === "L2") {
        return [
          source.layer,
          source.path ?? "unknown",
          source.version ?? "",
        ]
          .filter(Boolean)
          .join(":")
      }

      return [
        source.layer,
        source.id ?? "profile",
        source.version ?? "",
      ]
        .filter(Boolean)
        .join(":")
    },
  )
}

function dreamWarning(
  kind: DreamKind,
): string {
  return kind === "nightmare"
    ? (
        "NIGHTMARE MEMORY — COUNTERFACTUAL STRESS TEST, NOT FACTUAL HISTORY. " +
        "It may suggest risks or tensions, but it must never override contradictory factual memory."
      )
    : (
        "DREAM MEMORY — IMAGINED ASSOCIATION, NOT FACTUAL HISTORY. " +
        "It may suggest a connection, but it must never override contradictory factual memory."
      )
}

function scenarioContent(input: {
  kind: DreamKind
  title: string
  seed: string
  dream: string
  association: string
  grounding: string
  sample: DreamSample
  openCodeAgent: string
  createdAt: string
}): string {
  const refs =
    sourceRefs(
      input.sample,
    )

  return [
    "---",
    "tdai_dream: true",
    `kind: ${input.kind}`,
    "status: candidate",
    "factual_authority: low",
    `open_code_agent: ${yamlString(input.openCodeAgent)}`,
    `source_sample_id: ${yamlString(input.sample.sampleId)}`,
    `entropy_fingerprint: ${yamlString(input.sample.entropyFingerprint)}`,
    `created_at: ${yamlString(input.createdAt)}`,
    "source_refs:",
    ...(
      refs.length
        ? refs.map(
            (ref) =>
              `  - ${yamlString(ref)}`,
          )
        : [
            "  - none",
          ]
    ),
    "---",
    "",
    `# ${input.kind === "nightmare" ? "Nightmare" : "Dream"}: ${input.title}`,
    "",
    `> ${dreamWarning(input.kind)}`,
    "",
    "## Seed",
    "",
    input.seed,
    "",
    input.kind === "nightmare"
      ? "## Nightmare"
      : "## Dream",
    "",
    input.dream,
    "",
    input.kind === "nightmare"
      ? "## Possible failure pattern"
      : "## Possible association",
    "",
    input.association,
    "",
    "## Grounding",
    "",
    input.grounding ||
      (
        "This candidate was generated from a bounded TencentDB memory sample. " +
        "It is associative/counterfactual material, not evidence that an imagined event occurred."
      ),
    "",
  ].join("\n")
}

export class DreamCommitter {
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

  async commit(input: {
    sessionID: string
    generation: number
    openCodeAgent: string
    sampleID: string
    kind: DreamKind
    title: unknown
    seed: unknown
    dream: unknown
    association: unknown
    grounding?: unknown
  }) {
    if (!this.config.dream.enabled) {
      return {
        terminal: true,
        terminal_code:
          "TDAI_DREAM_DISABLED",
      }
    }

    const gate =
      this.sessions.startCommit(
        input.sessionID,
        input.generation,
        input.sampleID,
      )

    if (!gate.ok) {
      return {
        terminal: true,
        terminal_code:
          gate.code,
        path:
          gate.state?.commitPath,
        version:
          gate.state?.commitVersion,
        message:
          gate.code ===
            "TDAI_DREAM_ALREADY_COMMITTED"
            ? (
                "One dream mutation has already been committed for this execution. Stop immediately."
              )
            : (
                "The dream commit was rejected by the one-shot session guard."
              ),
      }
    }

    const state =
      gate.state

    const sample =
      state.sample

    if (!sample) {
      this.sessions.failCommit(
        input.sessionID,
        input.generation,
      )

      return {
        terminal: true,
        terminal_code:
          "TDAI_DREAM_SAMPLE_REQUIRED",
      }
    }

    if (
      sample.kind !==
        input.kind
    ) {
      this.sessions.failCommit(
        input.sessionID,
        input.generation,
      )

      return {
        terminal: true,
        terminal_code:
          "TDAI_DREAM_KIND_MISMATCH",
      }
    }

    const scope =
      resolveMemoryScope(
        this.config,
        input.openCodeAgent,
      )

    if (
      !scope ||
      (
        state.openCodeAgent &&
        state.openCodeAgent !==
          input.openCodeAgent
      )
    ) {
      this.sessions.failCommit(
        input.sessionID,
        input.generation,
      )

      return {
        terminal: true,
        terminal_code:
          "TDAI_DREAM_AGENT_MISMATCH",
      }
    }

    const title =
      trimTo(
        input.title,
        120,
      ) ||
      (
        input.kind ===
          "nightmare"
          ? "Untitled Nightmare"
          : "Untitled Dream"
      )

    const seed =
      trimTo(
        input.seed,
        400,
      )

    const dream =
      trimTo(
        input.dream,
        3600,
      )

    const association =
      trimTo(
        input.association,
        1400,
      )

    const grounding =
      trimTo(
        input.grounding,
        1000,
      )

    if (
      !seed ||
      !dream ||
      !association
    ) {
      this.sessions.failCommit(
        input.sessionID,
        input.generation,
      )

      return {
        terminal: true,
        terminal_code:
          "TDAI_DREAM_INVALID_PROPOSAL",
        message:
          "seed, dream, and association are required. Do not invent missing fields outside the sampled evidence.",
      }
    }

    const now =
      new Date()

    const createdAt =
      now.toISOString()

    const date =
      createdAt.slice(
        0,
        10,
      )

    const timestamp =
      createdAt
        .slice(11, 19)
        .replace(/:/g, "")

    const path = [
      this.config.dream
        .pathPrefix,
      safePathPart(
        input.openCodeAgent,
      ),
      input.kind,
      date,
      `${timestamp}-${sample.sampleId}.md`,
    ].join("/")

    let content =
      scenarioContent({
        kind:
          input.kind,
        title,
        seed,
        dream,
        association,
        grounding,
        sample,
        openCodeAgent:
          input.openCodeAgent,
        createdAt,
      })

    if (
      content.length >
        this.config.dream
          .maxCommitChars
    ) {
      content =
        content.slice(
          0,
          Math.max(
            0,
            this.config.dream
              .maxCommitChars -
            96,
          ),
        ) +
        "\n\n> [Dream content truncated by the deterministic commit boundary.]\n"
    }

    this.trace.write(
      "DREAM_COMMIT_POST",
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
        path,
        chars:
          content.length,
      },
    )

    try {
      const result =
        await this.memory
          .writeScenario(
            scope,
            {
              path,
              content,
              summary:
                `[${input.kind.toUpperCase()} candidate] ${title}`,
            },
          ) as any

      const version =
        result &&
        typeof result === "object" &&
        typeof result.version ===
          "string"
          ? result.version
          : undefined

      this.sessions.finishCommit(
        input.sessionID,
        input.generation,
        path,
        version,
      )

      this.trace.write(
        "DREAM_COMMIT_OK",
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
          path,
          version:
            version ?? null,
        },
      )

      return {
        terminal: true,
        terminal_code:
          "TDAI_DREAM_COMMITTED",
        mutation_count: 1,
        layer: "L2",
        kind:
          input.kind,
        path,
        version:
          version ?? null,
        message:
          "Exactly one low-authority L2 dream candidate was written. Stop now; do not perform any further retrieval or memory mutation.",
      }
    } catch (error) {
      this.sessions.failCommit(
        input.sessionID,
        input.generation,
      )

      this.trace.write(
        "DREAM_COMMIT_FAILED",
        {
          sessionID:
            input.sessionID,
          generation:
            input.generation,
          openCodeAgent:
            input.openCodeAgent,
          kind:
            input.kind,
          sampleID:
            sample.sampleId,
          path,
          error:
            String(error),
        },
      )

      return {
        terminal: true,
        terminal_code:
          "TDAI_DREAM_COMMIT_FAILED",
        error:
          String(error),
        message:
          "No dream mutation was committed. Stop this worker rather than inventing a successful write.",
      }
    }
  }
}
