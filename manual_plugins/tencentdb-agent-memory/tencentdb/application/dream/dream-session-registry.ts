import type {
  DreamRole,
  DreamSample,
  DreamSessionState,
} from "../../domain/dream/model.ts"

function cloneState(
  state: DreamSessionState,
): DreamSessionState {
  return {
    ...state,
    sample:
      state.sample
        ? {
            ...state.sample,
            sources:
              state.sample.sources.map(
                (source) => ({
                  ...source,
                }),
              ),
          }
        : undefined,
  }
}

export class DreamSessionRegistry {
  private readonly states =
    new Map<
      string,
      DreamSessionState
    >()

  onExecutionStarted(
    sessionID: string,
    generation: number,
  ) {
    const existing =
      this.states.get(
        sessionID,
      )

    if (
      existing &&
      existing.generation !==
        generation
    ) {
      this.states.delete(
        sessionID,
      )
    }
  }

  begin(input: {
    sessionID: string
    generation: number
    role: DreamRole
    openCodeAgent: string
  }): DreamSessionState {
    const existing =
      this.states.get(
        input.sessionID,
      )

    if (
      existing &&
      existing.generation ===
        input.generation
    ) {
      return cloneState(
        existing,
      )
    }

    const state:
      DreamSessionState = {
        sessionID:
          input.sessionID,

        generation:
          input.generation,

        role:
          input.role,

        openCodeAgent:
          input.openCodeAgent,

        startedAt:
          Date.now(),

        committing:
          false,

        committed:
          false,
      }

    this.states.set(
      input.sessionID,
      state,
    )

    return cloneState(
      state,
    )
  }

  get(
    sessionID: string,
  ): DreamSessionState | undefined {
    const state =
      this.states.get(
        sessionID,
      )

    return state
      ? cloneState(state)
      : undefined
  }

  isDreamExecution(
    sessionID: string,
    generation: number,
  ): boolean {
    const state =
      this.states.get(
        sessionID,
      )

    return Boolean(
      state &&
      state.generation ===
        generation,
    )
  }

  attachSample(
    sessionID: string,
    generation: number,
    sample: DreamSample,
  ): DreamSessionState {
    const state =
      this.states.get(
        sessionID,
      )

    if (
      !state ||
      state.generation !==
        generation ||
      state.role !== "worker"
    ) {
      throw new Error(
        "TDAI_DREAM_SESSION_REQUIRED",
      )
    }

    if (!state.sample) {
      state.sample =
        sample
    }

    return cloneState(
      state,
    )
  }

  startCommit(
    sessionID: string,
    generation: number,
    sampleID: string,
  ):
    | {
        ok: true
        state: DreamSessionState
      }
    | {
        ok: false
        code: string
        state?: DreamSessionState
      } {
    const state =
      this.states.get(
        sessionID,
      )

    if (
      !state ||
      state.generation !==
        generation ||
      state.role !== "worker"
    ) {
      return {
        ok: false,
        code:
          "TDAI_DREAM_SESSION_REQUIRED",
      }
    }

    if (!state.sample) {
      return {
        ok: false,
        code:
          "TDAI_DREAM_SAMPLE_REQUIRED",
        state:
          cloneState(state),
      }
    }

    if (
      state.sample.sampleId !==
        sampleID
    ) {
      return {
        ok: false,
        code:
          "TDAI_DREAM_SAMPLE_MISMATCH",
        state:
          cloneState(state),
      }
    }

    if (state.committed) {
      return {
        ok: false,
        code:
          "TDAI_DREAM_ALREADY_COMMITTED",
        state:
          cloneState(state),
      }
    }

    if (state.committing) {
      return {
        ok: false,
        code:
          "TDAI_DREAM_COMMIT_IN_PROGRESS",
        state:
          cloneState(state),
      }
    }

    state.committing =
      true

    return {
      ok: true,
      state:
        cloneState(state),
    }
  }

  finishCommit(
    sessionID: string,
    generation: number,
    path: string,
    version?: string,
  ) {
    const state =
      this.states.get(
        sessionID,
      )

    if (
      !state ||
      state.generation !==
        generation
    ) {
      return
    }

    state.committing =
      false
    state.committed =
      true
    state.commitPath =
      path
    state.commitVersion =
      version
  }

  failCommit(
    sessionID: string,
    generation: number,
  ) {
    const state =
      this.states.get(
        sessionID,
      )

    if (
      state &&
      state.generation ===
        generation
    ) {
      state.committing =
        false
    }
  }

  completeExecution(
    sessionID: string,
    generation: number,
  ) {
    const state =
      this.states.get(
        sessionID,
      )

    if (
      state &&
      state.generation ===
        generation
    ) {
      state.completedAt =
        Date.now()
    }
  }

  delete(
    sessionID: string,
  ) {
    this.states.delete(
      sessionID,
    )
  }

  stats() {
    let active = 0
    let committed = 0

    for (
      const state of
        this.states.values()
    ) {
      if (!state.completedAt) {
        active += 1
      }

      if (state.committed) {
        committed += 1
      }
    }

    return {
      sessions:
        this.states.size,
      active,
      committed,
    }
  }
}
