import type {
  TracePort,
} from "../../domain/ports.ts"

import {
  CaptureService,
} from "../../application/capture-service.ts"

import {
  RetrievalBudget,
} from "../../application/retrieval-budget.ts"

import {
  DreamSessionRegistry,
} from "../../application/dream/dream-session-registry.ts"

import {
  assistantMessageIDFrom,
  eventData,
  inputShape,
  inputTextFromEvent,
  normalizeEvent,
  sessionIDFrom,
} from "./event-codec.ts"

import {
  TurnStore,
} from "./turn-store.ts"

const LOGGED_EVENT_TYPES =
  new Set([
    "session.input.admitted",
    "session.execution.started",
    "session.input.promoted",
    "session.step.started",
    "session.text.started",
    "session.text.ended",
    "session.step.ended",
    "session.execution.succeeded",
    "session.execution.interrupted",
    "session.deleted",
    "session.closed",
    "session.ended",
  ])

export class OpenCodeLifecycle {
  private turns:
    TurnStore

  private capture:
    CaptureService

  private budget:
    RetrievalBudget

  private dreams:
    DreamSessionRegistry

  private trace:
    TracePort

  constructor(
    turns:
      TurnStore,

    capture:
      CaptureService,

    budget:
      RetrievalBudget,

    dreams:
      DreamSessionRegistry,

    trace:
      TracePort,
  ) {
    this.turns = turns
    this.capture = capture
    this.budget = budget
    this.dreams = dreams
    this.trace = trace
  }

  async handle(
    raw: any,
  ) {
    const event =
      normalizeEvent(raw)

    if (
      !event ||
      typeof event.type !==
        "string"
    ) {
      return
    }

    if (
      !this.turns
        .acceptEvent(event)
    ) {
      return
    }

    const type =
      event.type

    const data =
      eventData(event)

    const sessionID =
      sessionIDFrom(event)

    const assistantMessageID =
      assistantMessageIDFrom(
        event,
      )

    if (
      LOGGED_EVENT_TYPES.has(type)
    ) {
      this.trace.write(
        "EVENT",
        {
          type,

          sessionID:
            sessionID ||
            null,

          assistantMessageID:
            assistantMessageID ||
            null,

          dataKeys:
            data &&
            typeof data === "object"
              ? Object.keys(data)
              : [],
        },
      )
    }

    if (
      type ===
        "session.input.admitted" ||
      type ===
        "session.input.promoted"
    ) {
      if (!sessionID) {
        return
      }

      const inputText =
        inputTextFromEvent(
          event,
        )

      if (inputText) {
        this.turns
          .setUserText(
            sessionID,
            inputText,
          )

        this.trace.write(
          "USER_FROM_INPUT_EVENT",
          {
            source:
              type,

            sessionID,

            userChars:
              inputText.length,
          },
        )
      } else {
        if (
          type ===
          "session.input.admitted"
        ) {
          this.trace.write(
            "INPUT_TEXT_UNRESOLVED",
            {
              sessionID,

              shape:
                inputShape(
                  data?.input,
                ),
            },
          )
        }

        this.trace.write(
          "USER_INPUT_EMPTY",
          {
            source:
              type,

            sessionID,
          },
        )
      }

      return
    }

    if (
      type ===
      "session.execution.started"
    ) {
      if (!sessionID) {
        return
      }

      const state =
        this.turns
          .openExecution(
            sessionID,
          )

      this.budget.reset(
        sessionID,
      )

      this.dreams.onExecutionStarted(
        sessionID,
        state.generation,
      )

      this.trace.write(
        "EXECUTION_OPEN",
        {
          sessionID,

          generation:
            state.generation,

          userChars:
            state.userText.length,

          retrievalBudget:
            this.budget.limit,
        },
      )

      return
    }

    if (
      type ===
      "session.step.started"
    ) {
      if (!sessionID) {
        return
      }

      const before =
        this.turns.get(
          sessionID,
        )?.openCodeAgent

      const state =
        this.turns
          .bindStep(
            sessionID,
            event,
          )

      if (
        state.openCodeAgent &&
        state.openCodeAgent !== before
      ) {
        this.trace.write(
          "AGENT_BOUND",
          {
            sessionID,

            generation:
              state.generation,

            openCodeAgent:
              state.openCodeAgent,
          },
        )
      }

      this.trace.write(
        "STEP_BOUND",
        {
          sessionID,

          generation:
            state.generation,

          assistantMessageID:
            assistantMessageID ||
            null,

          openCodeAgent:
            state.openCodeAgent ||
            null,

          userChars:
            state.userText.length,
        },
      )

      return
    }

    if (
      type ===
      "session.text.started"
    ) {
      if (!sessionID) {
        return
      }

      this.turns
        .noteAssistantMessage(
          sessionID,
          event,
        )

      return
    }

    if (
      type ===
      "session.text.delta"
    ) {
      if (!sessionID) {
        return
      }

      const delta =
        typeof data?.delta ===
          "string"
          ? data.delta
          : typeof data?.text ===
              "string"
            ? data.text
            : ""

      if (!delta) {
        return
      }

      if (
        !this.turns
          .acceptTextFragment(
            event,
            delta,
          )
      ) {
        return
      }

      const state =
        this.turns
          .noteAssistantMessage(
            sessionID,
            event,
          )

      const firstDelta =
        !state.sawTextDelta

      this.turns
        .appendText(
          sessionID,
          delta,
        )

      if (firstDelta) {
        this.trace.write(
          "TEXT_DELTA_FIRST",
          {
            sessionID,

            assistantMessageID:
              assistantMessageID ||
              null,

            userChars:
              state.userText.length,
          },
        )
      }

      return
    }

    if (
      type ===
      "session.text.ended"
    ) {
      if (!sessionID) {
        return
      }

      const state =
        this.turns
          .noteAssistantMessage(
            sessionID,
            event,
          )

      this.turns
        .setFinalTextIfNeeded(
          sessionID,
          typeof data?.text ===
            "string"
            ? data.text
            : "",
        )

      this.trace.write(
        "TEXT_END",
        {
          sessionID,

          assistantMessageID:
            assistantMessageID ||
            null,

          usedDeltaStream:
            state.sawTextDelta,

          userChars:
            state.userText.length,

          assistantChars:
            state.assistantText.length,
        },
      )

      return
    }

    if (
      type ===
      "session.execution.interrupted"
    ) {
      if (!sessionID) {
        return
      }

      const state =
        this.turns
          .interrupt(
            sessionID,
          )

      this.budget.clear(
        sessionID,
      )

      this.trace.write(
        "EXECUTION_INTERRUPTED",
        {
          sessionID,

          generation:
            state?.generation ??
            null,

          userChars:
            state?.userText.length ??
            0,

          assistantChars:
            state?.assistantText.length ??
            0,
        },
      )

      return
    }

    if (
      type ===
      "session.execution.succeeded"
    ) {
      if (!sessionID) {
        this.trace.write(
          "EXECUTION_SUCCEEDED_NO_SESSION",
        )

        return
      }

      const turn =
        this.turns
          .finishExecution(
            sessionID,
          )

      const budget =
        this.budget.snapshot(
          sessionID,
        )

      this.budget.clear(
        sessionID,
      )

      if (!turn) {
        this.trace.write(
          "EXECUTION_SUCCEEDED_NO_STATE",
          {
            sessionID,
          },
        )

        return
      }

      this.trace.write(
        "EXECUTION_SUCCEEDED",
        {
          sessionID,

          generation:
            turn.generation,

          openCodeAgent:
            turn.openCodeAgent ||
            null,

          userChars:
            turn.userText.length,

          assistantChars:
            turn.assistantText.length,

          assistantMessageIDs:
            turn.assistantMessageIDs,

          retrieval:
            budget,
        },
      )

      if (
        this.dreams.isDreamExecution(
          sessionID,
          turn.generation,
        )
      ) {
        const dream =
          this.dreams.get(
            sessionID,
          )

        this.dreams.completeExecution(
          sessionID,
          turn.generation,
        )

        this.trace.write(
          "DREAM_AUTO_CAPTURE_SUPPRESSED",
          {
            sessionID,
            generation:
              turn.generation,
            role:
              dream?.role ?? null,
            openCodeAgent:
              turn.openCodeAgent ||
              dream?.openCodeAgent ||
              null,
            committed:
              dream?.committed ??
              false,
            commitPath:
              dream?.commitPath ??
              null,
          },
        )

        /*
         * Keep the TurnState until the next execution or session end so the
         * generation remains monotonic. Deleting it here would recreate the
         * same generation number on a later normal turn and could accidentally
         * inherit Dream capture suppression.
         */
        return
      }

      if (
        !turn.userText ||
        !turn.assistantText
      ) {
        this.trace.write(
          "CAPTURE_SKIPPED_INCOMPLETE",
          {
            sessionID,

            generation:
              turn.generation,

            userChars:
              turn.userText.length,

            assistantChars:
              turn.assistantText.length,
          },
        )

        return
      }

      void (
        async () => {
          const ok =
            await this.capture
              .capture(turn)

          if (ok) {
            const current =
              this.turns.get(
                sessionID,
              )

            if (
              current &&
              current.generation ===
                turn.generation
            ) {
              this.turns.delete(
                sessionID,
              )
            }
          }
        }
      )()

      return
    }

    if (
      type ===
        "session.deleted" ||
      type ===
        "session.closed" ||
      type ===
        "session.ended"
    ) {
      if (!sessionID) {
        return
      }

      const turn =
        this.turns
          .finishExecution(
            sessionID,
          )

      if (
        turn?.userText &&
        turn.assistantText
      ) {
        if (
          this.dreams.isDreamExecution(
            sessionID,
            turn.generation,
          )
        ) {
          this.trace.write(
            "DREAM_SESSION_END_CAPTURE_SUPPRESSED",
            {
              sessionID,
              generation:
                turn.generation,
            },
          )
        } else {
          void this.capture
            .capture(turn)
        }
      }

      this.budget.clear(
        sessionID,
      )

      this.turns.delete(
        sessionID,
      )

      this.dreams.delete(
        sessionID,
      )

      this.trace.write(
        "SESSION_END",
        {
          sessionID,

          mode:
            "v3-no-session-end-required",
        },
      )
    }
  }

  run(
    ctx: any,
  ) {
    const task =
      (async () => {
        try {
          const events =
            ctx.event.subscribe()

          this.trace.write(
            "EVENT_SUBSCRIBED",
            {
              asyncIterator:
                typeof events?.[
                  Symbol.asyncIterator
                ],
            },
          )

          for await (
            const raw of events
          ) {
            try {
              await this.handle(raw)
            } catch (error) {
              this.trace.write(
                "EVENT_HANDLER_FAILED_OPEN",
                {
                  error:
                    String(error),
                },
              )
            }
          }
        } catch (error) {
          this.trace.write(
            "EVENT_SUBSCRIPTION_FAILED",
            {
              error:
                String(error),
            },
          )
        }
      })()

    void task
  }
}
