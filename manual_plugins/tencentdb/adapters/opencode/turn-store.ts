import type {
  CompletedTurn,
  TurnState,
} from "../../domain/model.ts"

import {
  assistantMessageIDFrom,
  eventData,
  ordinalFrom,
  sessionIDFrom,
} from "./event-codec.ts"

export class TurnStore {
  private readonly turns =
    new Map<
      string,
      TurnState
    >()

  private readonly activeExecutions =
    new Set<string>()

  private readonly executionStartedAt =
    new Map<
      string,
      number
    >()

  private readonly seenEventIDs =
    new Set<string>()

  private readonly seenFragments =
    new Set<string>()

  stateFor(
    sessionID: string,
  ): TurnState {
    let state =
      this.turns.get(
        sessionID,
      )

    if (!state) {
      state = {
        sessionID,
        generation: 0,
        openCodeAgent: "",
        userText: "",
        assistantText: "",
        sawTextDelta: false,
        assistantMessageIDs:
          new Set<string>(),
        startedAt:
          Date.now(),
      }

      this.turns.set(
        sessionID,
        state,
      )
    }

    return state
  }

  get(
    sessionID: string,
  ) {
    return this.turns.get(
      sessionID,
    )
  }

  delete(
    sessionID: string,
  ) {
    this.turns.delete(
      sessionID,
    )

    this.activeExecutions.delete(
      sessionID,
    )

    this.executionStartedAt.delete(
      sessionID,
    )
  }

  setUserText(
    sessionID: string,
    text: string,
  ) {
    this.stateFor(
      sessionID,
    ).userText =
      text
  }

  openExecution(
    sessionID: string,
  ) {
    this.activeExecutions.add(
      sessionID,
    )

    this.executionStartedAt.set(
      sessionID,
      Date.now(),
    )

    const state =
      this.stateFor(
        sessionID,
      )

    state.generation += 1
    state.openCodeAgent = ""
    state.assistantText = ""
    state.sawTextDelta = false
    state.assistantMessageIDs
      .clear()
    state.startedAt =
      Date.now()

    return state
  }

  bindStep(
    sessionID: string,
    event: any,
  ) {
    this.activeExecutions.add(
      sessionID,
    )

    const state =
      this.stateFor(
        sessionID,
      )

    const assistantID =
      assistantMessageIDFrom(
        event,
      )

    if (assistantID) {
      state.assistantMessageIDs
        .add(
          assistantID,
        )
    }

    const agent =
      eventData(event)?.agent

    if (
      typeof agent ===
        "string" &&
      agent.trim() &&
      !state.openCodeAgent
    ) {
      state.openCodeAgent =
        agent.trim()
    }

    return state
  }

  noteAssistantMessage(
    sessionID: string,
    event: any,
  ) {
    const state =
      this.stateFor(
        sessionID,
      )

    const assistantID =
      assistantMessageIDFrom(
        event,
      )

    if (assistantID) {
      state.assistantMessageIDs
        .add(
          assistantID,
        )
    }

    return state
  }

  appendText(
    sessionID: string,
    delta: string,
  ) {
    const state =
      this.stateFor(
        sessionID,
      )

    state.sawTextDelta =
      true

    state.assistantText +=
      delta

    return state
  }

  setFinalTextIfNeeded(
    sessionID: string,
    text: string,
  ) {
    const state =
      this.stateFor(
        sessionID,
      )

    if (
      !state.sawTextDelta &&
      text.trim()
    ) {
      state.assistantText =
        state.assistantText
          ? `${state.assistantText}\n${text.trim()}`
          : text.trim()
    }

    return state
  }

  interrupt(
    sessionID: string,
  ) {
    this.activeExecutions.delete(
      sessionID,
    )

    this.executionStartedAt.delete(
      sessionID,
    )

    const state =
      this.turns.get(
        sessionID,
      )

    if (state) {
      state.assistantText = ""
      state.sawTextDelta = false
      state.assistantMessageIDs
        .clear()
    }

    return state
  }

  finishExecution(
    sessionID: string,
  ): CompletedTurn | null {
    this.activeExecutions.delete(
      sessionID,
    )

    this.executionStartedAt.delete(
      sessionID,
    )

    const state =
      this.turns.get(
        sessionID,
      )

    if (!state) {
      return null
    }

    return {
      sessionID:
        state.sessionID,

      generation:
        state.generation,

      openCodeAgent:
        state.openCodeAgent,

      userText:
        state.userText.trim(),

      assistantText:
        state.assistantText.trim(),

      assistantMessageIDs:
        [
          ...state
            .assistantMessageIDs,
        ],
    }
  }

  latestExecutionSession(
    maxAgeMs = 30000,
  ): string {
    const now =
      Date.now()

    let winner = ""
    let winnerAt = 0

    for (
      const [
        sessionID,
        startedAt,
      ] of this.executionStartedAt
    ) {
      if (
        now - startedAt >
        maxAgeMs
      ) {
        continue
      }

      if (
        startedAt >
        winnerAt
      ) {
        winner =
          sessionID

        winnerAt =
          startedAt
      }
    }

    return winner
  }

  currentAgent(
    sessionID?: string,
  ): string {
    if (sessionID) {
      const explicit =
        this.turns.get(
          sessionID,
        )?.openCodeAgent

      if (explicit) {
        return explicit
      }
    }

    const latest =
      this.latestExecutionSession()

    return (
      latest
        ? this.turns.get(
            latest,
          )?.openCodeAgent
        : ""
    ) ?? ""
  }

  stats() {
    return {
      bufferedTurns:
        this.turns.size,

      activeExecutions:
        this.activeExecutions.size,
    }
  }

  acceptEvent(
    event: any,
  ): boolean {
    const eventID =
      typeof event?.id ===
        "string"
        ? event.id
        : ""

    if (!eventID) {
      return true
    }

    if (
      this.seenEventIDs.has(
        eventID,
      )
    ) {
      return false
    }

    this.seenEventIDs.add(
      eventID,
    )

    if (
      this.seenEventIDs.size >
      50000
    ) {
      this.seenEventIDs.clear()
      this.seenEventIDs.add(
        eventID,
      )
    }

    return true
  }

  acceptTextFragment(
    event: any,
    delta: string,
  ): boolean {
    const sessionID =
      sessionIDFrom(
        event,
      )

    const assistantID =
      assistantMessageIDFrom(
        event,
      )

    const ordinal =
      ordinalFrom(
        event,
      )

    if (
      !assistantID &&
      !ordinal
    ) {
      return true
    }

    const signature = [
      event?.type ?? "",
      sessionID,
      assistantID,
      ordinal,
      delta,
    ].join("\u0000")

    if (
      this.seenFragments.has(
        signature,
      )
    ) {
      return false
    }

    this.seenFragments.add(
      signature,
    )

    if (
      this.seenFragments.size >
      100000
    ) {
      this.seenFragments.clear()
      this.seenFragments.add(
        signature,
      )
    }

    return true
  }
}
