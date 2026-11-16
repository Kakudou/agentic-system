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
  ModeEffectPolicy,
  TracePort,
} from "../domain/ports.ts"

import {
  isPermanentHttpError,
  isRetryableError,
} from "../infrastructure/tencent/errors.ts"

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

// Marker spelling tolerates whitespace and case variants inside the comment,
// e.g. "<!-- OTSUMI-EPHEMERAL : START -->".
const EPHEMERAL_APPENDIX =
  /<!--\s*otsumi-ephemeral\s*:\s*start\s*-->[\s\S]*?<!--\s*otsumi-ephemeral\s*:\s*end\s*-->/gi

// A start marker with no matching end hides everything after it.
const EPHEMERAL_UNTERMINATED =
  /<!--\s*otsumi-ephemeral\s*:\s*start\s*-->[\s\S]*$/i

const EPHEMERAL_STRAY_END =
  /<!--\s*otsumi-ephemeral\s*:\s*end\s*-->/gi

function stripEphemeralAppendices(
  value: string,
): string {
  return value
    .replace(
      EPHEMERAL_APPENDIX,
      "",
    )
    .replace(
      EPHEMERAL_UNTERMINATED,
      "",
    )
    .replace(
      EPHEMERAL_STRAY_END,
      "",
    )
    .trim()
}

const REDACTED =
  "[REDACTED]"

/*
 * Secret-looking values must never become durable memory. Order matters:
 * NAME=value assignments run first so the variable name survives while its
 * value (often itself an sk-/ghp_ token) is replaced once.
 */
const SECRET_PATTERNS: ReadonlyArray<{
  pattern: RegExp
  keepPrefix: boolean
}> = [
  {
    pattern:
      /\b([A-Z0-9_]*(?:KEY|TOKEN|SECRET|PASSWORD)[A-Z0-9_]*\s*=\s*)\S+/g,
    keepPrefix:
      true,
  },
  {
    pattern:
      /\bsk-[A-Za-z0-9_-]{16,}/g,
    keepPrefix:
      false,
  },
  {
    pattern:
      /\bgh[pousr]_[A-Za-z0-9]{20,}/g,
    keepPrefix:
      false,
  },
  {
    pattern:
      /\bAKIA[0-9A-Z]{16}\b/g,
    keepPrefix:
      false,
  },
  {
    pattern:
      /bearer\s+[A-Za-z0-9._~+/=-]{16,}/gi,
    keepPrefix:
      false,
  },
  {
    // A UUID within ~20 characters after a credential keyword.
    pattern:
      /((?<![A-Za-z])(?:api[\s_-]?keys?|keys?|tokens?|secrets?|passwords?)(?![A-Za-z])[^\n]{0,20}?)\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi,
    keepPrefix:
      true,
  },
]

function redactSecrets(
  value: string,
): {
  text: string
  redactions: number
} {
  let text =
    value

  let redactions =
    0

  for (const {
    pattern,
    keepPrefix,
  } of SECRET_PATTERNS) {
    text =
      text.replace(
        pattern,
        (
          _match: string,
          prefix: unknown,
        ) => {
          redactions += 1

          return (
            keepPrefix &&
            typeof prefix === "string"
          )
            ? `${prefix}${REDACTED}`
            : REDACTED
        },
      )
  }

  return {
    text,
    redactions,
  }
}

const PROCESS_REGISTRY_KEY =
  "__kakudou_tencentdb_memory_capture__"

type CaptureProcessState = {
  captured: Set<string>
  inFlight: Set<string>
}

/*
 * OpenCode V2 may re-run a plugin's setup() within one server process.
 * Each setup() constructs a fresh CaptureService, so instance-local dedup
 * sets would let every live instance POST the same turn again. Sharing the
 * sets process-wide keeps capture idempotent no matter how many plugin
 * instances stay alive in the process.
 */
function captureProcessState(): CaptureProcessState {
  const globalScope =
    globalThis as any

  if (!globalScope[PROCESS_REGISTRY_KEY]) {
    globalScope[PROCESS_REGISTRY_KEY] = {
      captured:
        new Set<string>(),

      inFlight:
        new Set<string>(),
    }
  }

  return globalScope[PROCESS_REGISTRY_KEY]
}

export class CaptureService {
  private disposed =
    false

  private readonly captured =
    captureProcessState().captured

  private readonly inFlight =
    captureProcessState().inFlight

  private readonly retries =
    new Map<
      string,
      RetryState
    >()

  private readonly permanentlyRejected =
    new Set<string>()

  private config:
    AppConfig

  private memory:
    MemoryPort

  private trace:
    TracePort

  private policy:
    ModeEffectPolicy

  constructor(
    config:
      AppConfig,

    memory:
      MemoryPort,

    trace:
      TracePort,

    policy:
      ModeEffectPolicy,
  ) {
    this.config = config
    this.memory = memory
    this.trace = trace
    this.policy = policy
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

    if (
      retry.attempt >=
        RETRY_DELAYS_MS.length
    ) {
      this.retries.delete(key)

      this.trace.write(
        "CAPTURE_GIVE_UP",
        {
          sessionID:
            turn.sessionID,

          generation:
            turn.generation,

          openCodeAgent:
            turn.openCodeAgent ||
            null,

          attempts:
            retry.attempt,
        },
      )

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

    const key =
      this.key(turn)

    const setupSuppressed =
      Boolean(
        turn.setupSuppressed ||
        await this.policy
          .isSetupSuppressed?.(
            turn.sessionID,
          ),
      )

    if (setupSuppressed) {
      const pending =
        this.retries.get(key)

      if (pending?.timer) {
        clearTimeout(
          pending.timer,
        )
      }

      this.retries.delete(key)
      return false
    }

    if (
      this.permanentlyRejected.has(
        key,
      )
    ) {
      return false
    }

    if (
      !retry &&
      this.retries.has(key)
    ) {
      return false
    }

    if (
      !await this.policy
        .isEnabled(
          turn.sessionID,
        )
    ) {
      const pending =
        this.retries.get(key)

      if (pending?.timer) {
        clearTimeout(
          pending.timer,
        )
      }

      this.retries.delete(key)
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

    // Redact secret-looking values from both sides of the turn after
    // ephemeral stripping and before anything is submitted for capture.
    const redactedUser =
      redactSecrets(
        turn.userText,
      )

    const redactedAssistant =
      redactSecrets(
        turn.assistantText,
      )

    if (
      redactedUser.redactions > 0 ||
      redactedAssistant.redactions > 0
    ) {
      turn = {
        ...turn,
        userText:
          redactedUser.text,
        assistantText:
          redactedAssistant.text,
      }

      this.trace.write(
        "CAPTURE_SECRETS_REDACTED",
        {
          sessionID:
            turn.sessionID,

          generation:
            turn.generation,

          userRedactions:
            redactedUser.redactions,

          assistantRedactions:
            redactedAssistant.redactions,
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

      if (
        isPermanentHttpError(error)
      ) {
        this.permanentlyRejected.add(
          key,
        )
        this.retries.delete(key)
      } else if (
        isRetryableError(error) ||
        !(
          error &&
          typeof error === "object" &&
          (error as any).name ===
            "HttpStatusError"
        )
      ) {
        this.scheduleRetry(turn)
      }

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
