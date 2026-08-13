import type {
  AppConfig,
} from "../../../config.ts"

import type {
  TracePort,
} from "../../../domain/ports.ts"

import {
  DreamSessionRegistry,
} from "../../../application/dream/dream-session-registry.ts"

import {
  TurnStore,
} from "../turn-store.ts"

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

function eventSessionID(
  event: any,
  turns: TurnStore,
): string {
  const explicit =
    String(
      event?.sessionID ??
      event?.sessionId ??
      "",
    ).trim()

  return (
    explicit ||
    turns.latestExecutionSession(
      60000,
    )
  )
}

function isDreamTool(
  name: string,
): boolean {
  return name.startsWith(
    "tdai_dream_",
  )
}

function isWebTool(
  name: string,
): boolean {
  return (
    name.includes("websearch") ||
    name.includes("webfetch") ||
    name.includes("exa")
  )
}

function isMutationTool(
  name: string,
): boolean {
  return (
    name === "edit" ||
    name === "write" ||
    name === "patch" ||
    name === "apply_patch"
  )
}

export async function installDreamExecutionGuard(
  ctx: any,
  config: AppConfig,
  sessions: DreamSessionRegistry,
  turns: TurnStore,
  trace: TracePort,
) {
  if (!config.dream.enabled) {
    trace.write(
      "DREAM_EXECUTION_GUARD_DISABLED",
    )

    return
  }

  try {
    await ctx.tool.hook(
      "execute.before",
      (
        event: any,
      ) => {
        const sessionID =
          eventSessionID(
            event,
            turns,
          )

        if (!sessionID) {
          return
        }

        const state =
          sessions.get(
            sessionID,
          )

        const generation =
          turns.get(
            sessionID,
          )?.generation ?? 0

        if (
          !state ||
          state.generation !==
            generation
        ) {
          return
        }

        const name =
          toolName(event)

        if (isDreamTool(name)) {
          return
        }

        if (
          state.role ===
            "orchestrator"
        ) {
          if (
            name.includes(
              "subagent",
            ) ||
            name === "task" ||
            name === "skill"
          ) {
            return
          }

          trace.write(
            "DREAM_TOOL_BLOCKED",
            {
              sessionID,
              role:
                state.role,
              tool:
                name,
            },
          )

          throw new Error(
            "TDAI_DREAM_ORCHESTRATOR_TOOL_BLOCK: the /dream orchestrator may only spawn archetype subagents (plus dream protocol tools). Do not perform project work or retrieval in the orchestrator.",
          )
        }

        if (
          name.includes(
            "subagent",
          ) ||
          name === "task"
        ) {
          throw new Error(
            "TDAI_DREAM_RECURSION_BLOCK: a dream worker must never spawn another subagent.",
          )
        }

        if (name === "skill") {
          /*
           * Harmless if a worker redundantly reloads the explicit dream skill.
           * All other tools are denied below.
           */
          return
        }

        trace.write(
          "DREAM_TOOL_BLOCKED",
          {
            sessionID,
            role:
              state.role,
            tool:
              name,
            web:
              isWebTool(name),
            mutation:
              isMutationTool(name),
          },
        )

        throw new Error(
          "TDAI_DREAM_TOOL_BLOCK: this dream worker may use only the explicit dream skill and tdai_dream_* tools. Stop alternate retrieval, shell, filesystem, project, web, or mutation attempts.",
        )
      },
    )

    trace.write(
      "DREAM_EXECUTION_GUARD_INSTALLED",
      {
        worker:
          "dream tools only",
        orchestrator:
          "subagent orchestration only",
      },
    )
  } catch (error) {
    trace.write(
      "DREAM_EXECUTION_GUARD_REGISTRATION_FAILED",
      {
        error:
          String(error),
      },
    )
  }
}
