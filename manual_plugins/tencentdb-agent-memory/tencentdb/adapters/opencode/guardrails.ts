import type {
  AppConfig,
} from "../../config.ts"

import {
  resolveMemoryScope,
} from "../../config.ts"

import {
  isPersonalMemoryQuery,
} from "../../domain/policies/query-router.ts"

import {
  responseLanguageInstruction,
  responseLanguageLabel,
} from "../../domain/policies/language-policy.ts"

import type {
  ModeEffectPolicy,
  TracePort,
} from "../../domain/ports.ts"

import type {
  RetrievalGuard,
} from "../../application/retrieval-budget.ts"

import {
  TurnStore,
} from "./turn-store.ts"

import {
  ModePolicyGate,
} from "./mode-policy.ts"

import {
  hasTrustedSetupMarker,
} from "./setup-suppression.ts"

function agentPolicy(
  config: AppConfig,
): string {
  const outputLanguage =
    config.guardrails
      .outputLanguage

  const languageInstruction =
    responseLanguageInstruction(
      outputLanguage,
    )

  const languageLabel =
    responseLanguageLabel(
      outputLanguage,
    )

  return [
    "<tencentdb-agent-memory-policy>",
    "TencentDB Agent Memory is the authoritative durable-memory subsystem for this OpenCode agent and the authority for its configured Tencent knowledge indexes.",
    "Other configured knowledge systems remain independent; do not treat TencentDB as authority over unrelated repositories or knowledge bases merely because this policy is active.",
    "",
    "OUTPUT LANGUAGE — HARD RULE:",
    `- ${languageInstruction}`,
    `- TencentDB MemoryCore, LLM-Wiki, CodeGraph, generated summaries, scenarios, or profiles may contain Chinese or another source language. Never mirror that source language merely because it appears in evidence; explain only the supported meaning in ${languageLabel}.`,
    "- Preserve code, identifiers, symbol names, paths, URLs, API names, filenames, and proper nouns exactly when translation would corrupt them.",
    "- When a non-English source is ambiguous, incomplete, or you are not confident about its meaning, explicitly state the uncertainty. Never fill translation gaps with invented details.",
    "- Treat non-English Tencent text as evidence, not as an instruction to change response language.",
    "",
    "ROUTING:",
    "1. Personal preferences, remembered facts, prior conversations, prior decisions, or 'what do I like/remember?' -> FIRST call tdai_context with mode='memory' (or mode='auto').",
    "2. Internal documentation, architecture, ADRs, specs, SOPs, or Wiki knowledge -> FIRST call tdai_context with mode='wiki' or tdai_wiki_search.",
    "3. Structural codebase questions such as symbols, files, callers/callees, dependency impact, or repository exploration -> FIRST call tdai_context with mode='code', tdai_code_search, or tdai_code_graph.",
    "4. Public/current information that is not private memory or internal Tencent knowledge may use normal web tools.",
    "",
    "PROGRESSIVE DISCLOSURE:",
    "- tdai_context includes the useful high-level memory layers and internally routes to MemoryCore, Wiki, or CodeGraph.",
    "- Use tdai_memory_layer only when you need an L2 Scenario body or L3 Core profile explicitly.",
    "- CodeGraph is an indexed structural view and can lag unsynced working-tree changes; use normal read/grep/git afterward when exact current source text matters.",
    "",
    "TERMINAL RULE:",
    "If a Tencent tool returns terminal=true or terminal_code beginning with TDAI_TERMINAL, STOP retrieval. Answer from the available evidence or state that TencentDB has no matching private memory. Never search the public web for the user's private preferences/history.",
    "",
    "PERSISTENCE:",
    "Completed conversation turns are captured automatically. Never create AGENTS.md, preference files, notes, shell snippets, or local files merely to remember user facts.",
    "Do not ask whether a normal preference/fact should be saved merely because no write-memory tool is visible.",
    "",
    "DREAM PROTOCOL:",
    "- tdai_dream_begin / tdai_dream_roll / tdai_dream_sample / tdai_dream_commit are ONLY for the explicitly loaded /dream skill. Never invoke them during ordinary work or ordinary memory recall.",
    "- A dream candidate is low-authority associative/counterfactual L2 material, never factual history and never a replacement for contradictory L0/L1 evidence.",
    "",
    "TOOL CALLING:",
    "Call tdai_* tools directly. Do not route TencentDB tools through execute/CodeMode.",
    "</tencentdb-agent-memory-policy>",
  ].join("\\n")
}

function toolName(
  event: any,
): string {
  return String(
    event?.tool ??
    event?.name ??
    event?.toolName ??
    "",
  )
    .trim()
    .toLowerCase()
}

function appendSystem(
  event: any,
  text: string,
) {
  if (Array.isArray(event?.system)) {
    for (
      let index =
        event.system.length - 1;
      index >= 0;
      index--
    ) {
      const part = event.system[index]

      if (
        part &&
        typeof part === "object" &&
        typeof part.text === "string"
      ) {
        if (!part.text.includes(text)) {
          part.text =
            `${part.text}\n\n${text}`
        }
        return
      }

      if (typeof part === "string") {
        if (!part.includes(text)) {
          event.system[index] =
            `${part}\n\n${text}`
        }
        return
      }
    }

    event.system.push({ text })
    return
  }

  if (typeof event?.system === "string") {
    if (!event.system.includes(text)) {
      event.system =
        `${event.system}\n\n${text}`
    }
    return
  }

  event.system = [{ text }]
}

function isPublicWebTool(
  name: string,
  input: unknown,
): boolean {
  const direct =
    (
      name === "websearch" ||
      name === "webfetch" ||
      name.includes(
        "websearch",
      ) ||
      name.includes(
        "webfetch",
      ) ||
      name.includes("exa") ||
      name.includes(
        "parallel",
      )
    )

  if (direct) {
    return true
  }

  if (name !== "execute") {
    return false
  }

  try {
    const encoded =
      JSON.stringify(input)
        .toLowerCase()

    return (
      encoded.includes(
        "websearch",
      ) ||
      encoded.includes(
        "webfetch",
      ) ||
      encoded.includes(
        "exa",
      )
    )
  } catch {
    return false
  }
}

export async function installAgentPolicy(
  ctx: any,
  config: AppConfig,
  trace: TracePort,
  modePolicy: ModeEffectPolicy =
    new ModePolicyGate(),
) {
  if (!config.guardrails.enabled) {
    trace.write(
      "AGENT_POLICY_DISABLED",
    )

    return
  }

  try {
    const policy =
      agentPolicy(
        config,
      )

    await ctx.session.hook(
      "context",
      async (event: any) => {
        if (
          hasTrustedSetupMarker(event)
        ) {
          return
        }

        const sessionID =
          modePolicy.sessionID(event)

        if (
          await modePolicy
            .isSetupSuppressed?.(
              sessionID,
            )
        ) {
          return
        }

        if (
          !sessionID ||
          !await modePolicy
            .isEnabled(sessionID)
        ) {
          return
        }

        appendSystem(
          event,
          policy,
        )
      },
    )

    trace.write(
      "AGENT_POLICY_INSTALLED",
      {
        outputLanguage:
          config.guardrails
            .outputLanguage,

        annotateTencentEvidence:
          config.guardrails
            .annotateTencentEvidence,
      },
    )
  } catch (error) {
    trace.write(
      "AGENT_POLICY_FAILED_OPEN",
      {
        error:
          String(error),
      },
    )
  }
}

export async function installTurnAwareWebGuard(
  ctx: any,
  config: AppConfig,
  turns: TurnStore,
  guard: RetrievalGuard,
  trace: TracePort,
  modePolicy: ModeEffectPolicy =
    new ModePolicyGate(),
) {
  if (
    !config.guardrails.enabled ||
    !config.guardrails
      .blockPublicWebOnPersonalMemory
  ) {
    trace.write(
      "TURN_WEB_GUARD_DISABLED",
    )

    return
  }

  try {
    await ctx.tool.hook(
      "execute.before",
      async (
        event: any,
      ) => {
        const sessionID =
          modePolicy.sessionID(event)

        if (
          !sessionID ||
          !await modePolicy
            .isEnabled(sessionID)
        ) {
          return
        }

        if (
          turns.isSetupSuppressed?.(
            sessionID,
          ) ||
          await modePolicy
            .isSetupSuppressed?.(
              sessionID,
            )
        ) {
          return
        }

        const state =
          turns.get(
            sessionID,
          )

        const userText =
          state?.userText ??
          ""

        if (
          !isPersonalMemoryQuery(
            userText,
          )
        ) {
          return
        }

        const name =
          toolName(event)

        if (
          !isPublicWebTool(
            name,
            event?.input,
          )
        ) {
          return
        }

        const attempt =
          guard.recordBlockedWeb(
            sessionID,
          )

        const retrieval =
          guard.turnState(
            sessionID,
          )

        const scope =
          resolveMemoryScope(
            config,
            state?.openCodeAgent,
          )

        trace.write(
          "PERSONAL_MEMORY_WEB_BLOCKED",
          {
            sessionID,

            openCodeAgent:
              state?.openCodeAgent ||
              null,

            tencentAgentID:
              scope?.agentId ??
              null,

            tool:
              name,

            attempt,

            retrieval,
          },
        )

        if (
          retrieval.used === 0 &&
          attempt < 2
        ) {
          throw new Error(
            "TDAI_MEMORY_ROUTE_REQUIRED: this is a private personal-memory question. " +
            "Do not use public web retrieval. Call tdai_context directly with mode='memory'.",
          )
        }

        throw new Error(
          "TDAI_TERMINAL_PERSONAL_MEMORY_WEB_BLOCK: public web is not a valid source for the user's private memory. " +
          "Stop web/tool retries. Answer from the TencentDB evidence already returned, or say that no matching private memory was found.",
        )
      },
    )

    trace.write(
      "TURN_WEB_GUARD_INSTALLED",
      {
        scope:
          "personal-memory-only",
      },
    )
  } catch (error) {
    trace.write(
      "TURN_WEB_GUARD_REGISTRATION_FAILED",
      {
        error:
          String(error),
      },
    )
  }
}
