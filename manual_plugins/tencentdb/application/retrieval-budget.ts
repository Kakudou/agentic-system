import type {
  RetrievalBudgetSnapshot,
} from "../domain/model.ts"

type BudgetState = {
  used: number
  calls: string[]
  blockedWeb: number
}

export class RetrievalBudget {
  private readonly states =
    new Map<
      string,
      BudgetState
    >()

  readonly limit: number

  constructor(
    limit: number,
  ) {
    this.limit = limit
  }

  reset(
    sessionID: string,
  ) {
    this.states.set(
      sessionID,
      {
        used: 0,
        calls: [],
        blockedWeb: 0,
      },
    )
  }

  clear(
    sessionID: string,
  ) {
    this.states.delete(
      sessionID,
    )
  }

  consume(
    sessionID: string,
    tool: string,
  ): {
    allowed: boolean
    snapshot: RetrievalBudgetSnapshot
  } {
    let state =
      this.states.get(
        sessionID,
      )

    if (!state) {
      state = {
        used: 0,
        calls: [],
        blockedWeb: 0,
      }

      this.states.set(
        sessionID,
        state,
      )
    }

    const allowed =
      state.used <
      this.limit

    if (allowed) {
      state.used += 1
      state.calls.push(
        tool,
      )
    }

    return {
      allowed,
      snapshot:
        this.snapshot(
          sessionID,
        ),
    }
  }

  snapshot(
    sessionID: string,
  ): RetrievalBudgetSnapshot {
    const state =
      this.states.get(
        sessionID,
      ) ?? {
        used: 0,
        calls: [],
        blockedWeb: 0,
      }

    return {
      used:
        state.used,

      limit:
        this.limit,

      remaining:
        Math.max(
          0,
          this.limit -
          state.used,
        ),

      exhausted:
        state.used >=
        this.limit,

      calls:
        [...state.calls],
    }
  }

  recordBlockedWeb(
    sessionID: string,
  ): number {
    let state =
      this.states.get(
        sessionID,
      )

    if (!state) {
      state = {
        used: 0,
        calls: [],
        blockedWeb: 0,
      }

      this.states.set(
        sessionID,
        state,
      )
    }

    state.blockedWeb += 1

    return state.blockedWeb
  }
}
