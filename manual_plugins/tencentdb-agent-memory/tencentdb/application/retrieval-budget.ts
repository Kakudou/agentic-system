import type {
  RetrievalEnvelope,
  RetrievalSourceState,
  RetrievalTurnState,
  TdaiSource,
} from "../domain/model.ts"

import type {
  TracePort,
} from "../domain/ports.ts"

type SourceState = {
  status: "ok" | "degraded"
  consecutiveFailures: number
  lastError: string | null
  lastProbeAt: number | null
}

type TurnBucket = {
  used: number
  calls: string[]
  blockedWeb: number
}

function defaultSourceState(): SourceState {
  return {
    status:
      "ok",

    consecutiveFailures:
      0,

    lastError:
      null,

    lastProbeAt:
      null,
  }
}

function defaultTurnBucket(): TurnBucket {
  return {
    used:
      0,

    calls:
      [],

    blockedWeb:
      0,
  }
}

/*
 * Per-source consecutive-failure guardrail with a non-terminal degraded
 * state and a half-open probe after a cooldown. The per-turn hard cap is
 * optional (maxCallsPerTurn === null means no cap). Pure in-memory state;
 * no timers, no I/O.
 */
export class RetrievalGuard {
  private readonly sources =
    new Map<
      TdaiSource,
      SourceState
    >()

  private readonly perTurn =
    new Map<
      string,
      TurnBucket
    >()

  readonly failureThreshold:
    number

  readonly probeCooldownMs:
    number

  readonly maxCallsPerTurn:
    number | null

  private readonly trace:
    TracePort

  constructor(
    opts: {
      failureThreshold: number
      probeCooldownMs: number
      maxCallsPerTurn: number | null
      trace: TracePort
    },
  ) {
    this.failureThreshold =
      opts.failureThreshold

    this.probeCooldownMs =
      opts.probeCooldownMs

    this.maxCallsPerTurn =
      opts.maxCallsPerTurn

    this.trace =
      opts.trace
  }

  private source(
    id: TdaiSource,
  ): SourceState {
    let state =
      this.sources.get(
        id,
      )

    if (!state) {
      state =
        defaultSourceState()

      this.sources.set(
        id,
        state,
      )
    }

    return state
  }

  private bucket(
    session: string,
  ): TurnBucket {
    let state =
      this.perTurn.get(
        session,
      )

    if (!state) {
      state =
        defaultTurnBucket()

      this.perTurn.set(
        session,
        state,
      )
    }

    return state
  }

  admit(
    source: TdaiSource,
    session: string,
    tool: string,
  ): {
    action: "call" | "probe" | "block"
    state: RetrievalSourceState
  } {
    const state =
      this.source(
        source,
      )

    let action:
      "call" |
      "probe" |
      "block"

    if (
      state.status ===
      "ok"
    ) {
      action =
        "call"
    } else if (
      Date.now() -
      (state.lastProbeAt ?? 0) >=
      this.probeCooldownMs
    ) {
      action =
        "probe"

      state.lastProbeAt =
        Date.now()
    } else {
      action =
        "block"
    }

    this.trace.write(
      "GUARD_ADMIT",
      {
        source,
        action,
        session,
        tool,

        consecutiveFailures:
          state
            .consecutiveFailures,
      },
    )

    return {
      action,

      state:
        this.sourceState(
          source,
        ),
    }
  }

  recordOutcome(
    source: TdaiSource,
    ok: boolean,
    error?: string,
  ): RetrievalSourceState {
    const state =
      this.source(
        source,
      )

    if (ok) {
      state.consecutiveFailures =
        0

      state.status =
        "ok"
    } else {
      state.consecutiveFailures +=
        1

      state.lastError =
        (
          error ??
          "unknown error"
        ).slice(
          0,
          300,
        )

      if (
        state.consecutiveFailures >=
        this.failureThreshold
      ) {
        if (
          state.status !==
          "degraded"
        ) {
          /*
           * The failed call that just tipped this source over is the
           * most recent observed attempt, so the half-open cooldown
           * starts from the degrade transition. Without this stamp a
           * freshly degraded source (lastProbeAt === null) would
           * immediately admit a probe on its very next call.
           */
          state.lastProbeAt =
            Date.now()
        }

        state.status =
          "degraded"
      }
    }

    this.trace.write(
      "GUARD_OUTCOME",
      {
        source,
        ok,

        consecutiveFailures:
          state
            .consecutiveFailures,

        status:
          state.status,

        error:
          ok
            ? null
            : state.lastError,
      },
    )

    return this.sourceState(
      source,
    )
  }

  sourceState(
    source: TdaiSource,
  ): RetrievalSourceState {
    const state =
      this.sources.get(
        source,
      ) ??
      defaultSourceState()

    return {
      id:
        source,

      status:
        state.status,

      consecutiveFailures:
        state
          .consecutiveFailures,

      threshold:
        this.failureThreshold,

      lastError:
        state.lastError,

      lastProbeAt:
        state.lastProbeAt,
    }
  }

  consumeTurn(
    session: string,
    tool: string,
  ): {
    allowed: boolean
    state: RetrievalTurnState
  } {
    const bucket =
      this.bucket(
        session,
      )

    let allowed:
      boolean

    if (
      this.maxCallsPerTurn !==
        null &&
      bucket.used >=
      this.maxCallsPerTurn
    ) {
      allowed =
        false
    } else {
      bucket.used +=
        1

      bucket.calls.push(
        tool,
      )

      allowed =
        true
    }

    return {
      allowed,

      state:
        this.turnState(
          session,
        ),
    }
  }

  resetAllTurns():
    void {
    this.perTurn.clear()
  }

  clearTurn(
    session: string,
  ): void {
    this.perTurn.delete(
      session,
    )
  }

  recordBlockedWeb(
    session: string,
  ): number {
    const bucket =
      this.bucket(
        session,
      )

    bucket.blockedWeb +=
      1

    return bucket.blockedWeb
  }

  turnState(
    session: string,
  ): RetrievalTurnState {
    const bucket =
      this.perTurn.get(
        session,
      ) ??
      defaultTurnBucket()

    return {
      used:
        bucket.used,

      limit:
        this.maxCallsPerTurn,

      remaining:
        this.maxCallsPerTurn ===
        null
          ? null
          : Math.max(
              0,
              this
                .maxCallsPerTurn -
              bucket.used,
            ),

      exhausted:
        this.maxCallsPerTurn !==
        null &&
        bucket.used >=
        this.maxCallsPerTurn,

      calls:
        [...bucket.calls],
    }
  }

  envelopeFor(
    session: string,
    source: TdaiSource,
  ): RetrievalEnvelope {
    return {
      session,

      turn:
        this.turnState(
          session,
        ),

      source:
        this.sourceState(
          source,
        ),
    }
  }
}
