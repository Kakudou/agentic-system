import type {
  AppConfig,
} from "../config.ts"

import {
  resolveMemoryScope,
} from "../config.ts"

import type {
  CompletedTurn,
} from "../domain/model.ts"

import type {
  MemoryPort,
  TracePort,
} from "../domain/ports.ts"

function hashText(
  value: string,
): string {
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

  return (
    hash >>> 0
  ).toString(16)
}

type RetryState = {
  turn: CompletedTurn
  attempt: number
  timer?: ReturnType<
    typeof setTimeout
  >
}

const RETRY_DELAYS_MS = [
  1000,
  5000,
  15000,
  30000,
  60000,
]

const EPHEMERAL_APPENDIX =
  /<!--\s*otsumi-ephemeral:start\s*-->[\s\S]*?<!--\s*otsumi-ephemeral:end\s*-->/gi

function stripEphemeralAppendices(
  value: string,
): string {
  return value
    .replace(
      EPHEMERAL_APPENDIX,
      "",
    )
    .trim()
}

export class CaptureService {
  private disposed =
    false

  private readonly captured =
    new Set<string>()

  private readonly inFlight =
    new Set<string>()

  private readonly retries =
    new Map<
      string,
      RetryState
    >()

  private config:
    AppConfig

  private memory:
    MemoryPort

  private trace:
    TracePort

  constructor(
    config:
      AppConfig,

    memory:
      MemoryPort,

    trace:
      TracePort,
  ) {
    this.config = config
    this.memory = memory
    this.trace = trace
  }

  private key(
    turn: CompletedTurn,
  ): string {
    return [
      turn.sessionID,
      turn.generation,
      hashText(
        [
          turn.openCodeAgent,
          turn.userText,
          turn.assistantText,
        ].join("\n---\n"),
      ),
    ].join(":")
  }

  private scheduleRetry(
    turn: CompletedTurn,
  ) {
    if (this.disposed) {
      return
    }

    const key =
      this.key(turn)

    if (
      this.captured.has(key)
    ) {
      this.retries.delete(key)
      return
    }

    let retry =
      this.retries.get(key)

    if (!retry) {
      retry = {
        turn: {
          ...turn,
          assistantMessageIDs:
            [
              ...turn
                .assistantMessageIDs,
            ],
        },
        attempt: 0,
      }

      this.retries.set(
        key,
        retry,
      )
    }

    if (retry.timer) {
      return
    }

    const delay =
      RETRY_DELAYS_MS[
        Math.min(
          retry.attempt,
          RETRY_DELAYS_MS.length - 1,
        )
      ]

    retry.timer =
      setTimeout(
        () => {
          const current =
            this.retries.get(key)

          if (!current) {
            return
          }

          current.timer =
            undefined

          current.attempt += 1

          void (
            async () => {
              const ok =
                await this.capture(
                  current.turn,
                  true,
                )

              if (
                !ok &&
                this.retries.has(key)
              ) {
                this.scheduleRetry(
                  current.turn,
                )
              }
            }
          )()
        },
        delay,
      )

    ;(
      retry.timer as any
    ).unref?.()
  }

  async capture(
    turn: CompletedTurn,
    retry = false,
  ): Promise<boolean> {
    if (this.disposed) {
      return false
    }

    const originalAssistantChars =
      turn.assistantText.length

    // Ambient response gadgets are display-only context. They must not become
    // durable personal/project memory merely because they were appended to an
    // otherwise useful answer. Explicit SRS vault writes remain separate
    // knowledge artifacts and are unaffected by this sanitizer.
    turn = {
      ...turn,
      assistantText:
        stripEphemeralAppendices(
          turn.assistantText,
        ),
      assistantMessageIDs: [
        ...turn.assistantMessageIDs,
      ],
    }

    if (
      turn.assistantText.length !==
      originalAssistantChars
    ) {
      this.trace.write(
        "CAPTURE_EPHEMERAL_STRIPPED",
        {
          sessionID:
            turn.sessionID,

          generation:
            turn.generation,

          originalAssistantChars,

          capturedAssistantChars:
            turn.assistantText.length,
        },
      )
    }

    if (
      !turn.userText.trim() ||
      !turn.assistantText.trim()
    ) {
      this.trace.write(
        "CAPTURE_SKIPPED_INCOMPLETE",
        {
          sessionID:
            turn.sessionID,

          generation:
            turn.generation,

          userChars:
            turn.userText.length,

          assistantChars:
            turn.assistantText.length,
        },
      )

      return false
    }

    const scope =
      resolveMemoryScope(
        this.config,
        turn.openCodeAgent,
      )

    if (!scope) {
      this.trace.write(
        "CAPTURE_SKIPPED_UNMAPPED_AGENT",
        {
          sessionID:
            turn.sessionID,

          openCodeAgent:
            turn.openCodeAgent ||
            null,

          configuredAgents:
            Object.keys(
              this.config.memory.agents,
            ),

          hasDefaultAgent:
            Boolean(
              this.config.memory
                .defaultAgentId,
            ),
        },
      )

      return false
    }

    const key =
      this.key(turn)

    if (
      this.captured.has(key)
    ) {
      return true
    }

    if (
      this.inFlight.has(key)
    ) {
      return false
    }

    this.inFlight.add(key)

    this.trace.write(
      "CAPTURE_POST",
      {
        sessionID:
          turn.sessionID,

        generation:
          turn.generation,

        retry,

        openCodeAgent:
          turn.openCodeAgent,

        teamID:
          scope.teamId,

        agentID:
          scope.agentId,

        userID:
          scope.userId,

        userChars:
          turn.userText.length,

        assistantChars:
          turn.assistantText.length,

        transport:
          "v3/conversation/add",
      },
    )

    try {
      const result =
        await this.memory
          .captureTurn({
            scope,
            sessionID:
              turn.sessionID,
            userText:
              turn.userText,
            assistantText:
              turn.assistantText,
          })

      this.captured.add(key)
      this.retries.delete(key)

      this.trace.write(
        "AUTO_CAPTURE_OK",
        {
          sessionID:
            turn.sessionID,

          generation:
            turn.generation,

          openCodeAgent:
            turn.openCodeAgent,

          agentID:
            scope.agentId,

          result,
        },
      )

      return true
    } catch (error) {
      this.trace.write(
        "AUTO_CAPTURE_FAILED",
        {
          sessionID:
            turn.sessionID,

          generation:
            turn.generation,

          openCodeAgent:
            turn.openCodeAgent,

          agentID:
            scope.agentId,

          error:
            String(error),
        },
      )

      this.scheduleRetry(turn)

      return false
    } finally {
      this.inFlight.delete(key)
    }
  }

  stop() {
    this.disposed = true

    for (const retry of this.retries.values()) {
      if (retry.timer) {
        clearTimeout(retry.timer)
      }
    }

    this.retries.clear()
  }
}
