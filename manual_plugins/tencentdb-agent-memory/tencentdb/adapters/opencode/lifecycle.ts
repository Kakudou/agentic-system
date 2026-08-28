import type {
  TracePort,
} from "../../domain/ports.ts"

import {
  CaptureService,
} from "../../application/capture-service.ts"

import {
  RetrievalGuard,
} from "../../application/retrieval-budget.ts"

import {
  DreamSessionRegistry,
} from "../../application/dream/dream-session-registry.ts"

import {
  assistantMessageIDFrom,
  eventData,
  normalizeEvent,
  sessionIDFrom,
} from "./event-codec.ts"

import {
  TurnStore,
} from "./turn-store.ts"

const LOGGED_EVENT_TYPES =
  new Set([
    "session.inbox.enqueued",
    "session.inbox.delivered",
    "session.inbox.cancelled",
    "session.execution.started",
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
  private readonly pendingUserText =
    new Map<
      string,
      Map<string, string>
    >()

  private turns:
    TurnStore

  private capture:
    CaptureService

  private guard:
    RetrievalGuard

  private dreams:
    DreamSessionRegistry

  private trace:
    TracePort

  constructor(
    turns:
      TurnStore,

    capture:
      CaptureService,

    guard:
      RetrievalGuard,

    dreams:
      DreamSessionRegistry,

    trace:
      TracePort,
  ) {
    this.turns = turns
    this.capture = capture
    this.guard = guard
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
      "session.inbox.enqueued"
    ) {
      const inboxID =
        data?.inboxID

      const item =
        data?.item

      const text =
        item?.payload?.text

      if (
        !sessionID ||
        typeof inboxID !==
          "string" ||
        !inboxID ||
        item?.type !== "user" ||
        typeof text !== "string" ||
        !text.trim()
      ) {
        this.trace.write(
          "USER_INBOX_ENQUEUE_IGNORED",
          {
            sessionID:
              sessionID || null,
            inboxID:
              typeof inboxID ===
                "string"
                ? inboxID
                : null,
            hasUserType:
              item?.type ===
              "user",
            textType:
              typeof text,
            nonblank:
              typeof text ===
                "string"
                ? Boolean(
                    text.trim(),
                  )
                : false,
          },
        )

        return
      }

      let pending =
        this.pendingUserText.get(
          sessionID,
        )

      if (!pending) {
        pending =
          new Map<
            string,
            string
          >()
        this.pendingUserText.set(
          sessionID,
          pending,
        )
      }

      const userText =
        text.trim()

      pending.set(
        inboxID,
        userText,
      )

      this.trace.write(
        "USER_INBOX_PENDING",
        {
          sessionID,
          inboxID,
          userChars:
            userText.length,
        },
      )

      return
    }

    if (
      type ===
      "session.inbox.delivered"
    ) {
      const inboxID =
        data?.inboxID

      const pending =
        sessionID
          ? this.pendingUserText.get(
              sessionID,
            )
          : undefined

      const userText =
        typeof inboxID ===
          "string"
          ? pending?.get(
              inboxID,
            )
          : undefined

      if (
        !sessionID ||
        !userText
      ) {
        this.trace.write(
          "USER_INBOX_DELIVERY_UNRESOLVED",
          {
            sessionID:
              sessionID || null,
            inboxID:
              typeof inboxID ===
                "string"
                ? inboxID
                : null,
            reason:
              typeof inboxID ===
                "string"
                ? "not-pending"
                : "missing-id",
          },
        )

        return
      }

      const state =
        this.turns
          .appendUserText(
            sessionID,
            userText,
          )

      if (!state) {
        this.trace.write(
          "USER_INBOX_DELIVERY_UNRESOLVED",
          {
            sessionID,
            inboxID,
            reason:
              "no-active-execution",
          },
        )

        return
      }

      pending?.delete(
        inboxID,
      )

      if (!pending?.size) {
        this.pendingUserText.delete(
          sessionID,
        )
      }

      this.trace.write(
        "USER_FROM_INBOX_DELIVERY",
        {
          sessionID,
          inboxID,
          generation:
            state.generation,
          userChars:
            userText.length,
        },
      )

      return
    }

    if (
      type ===
      "session.inbox.cancelled"
    ) {
      const inboxID =
        data?.inboxID

      const pending =
        sessionID
          ? this.pendingUserText.get(
              sessionID,
            )
          : undefined

      const removed =
        typeof inboxID ===
          "string"
          ? pending?.delete(
              inboxID,
            ) ?? false
          : false

      if (
        sessionID &&
        pending &&
        !pending.size
      ) {
        this.pendingUserText.delete(
          sessionID,
        )
      }

      this.trace.write(
        "USER_INBOX_CANCELLED",
        {
          sessionID:
            sessionID || null,
          inboxID:
            typeof inboxID ===
              "string"
              ? inboxID
              : null,
          removed,
        },
      )

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

      this.guard.resetAllTurns()

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

          failureThreshold:
            this.guard
              .failureThreshold,

          maxCallsPerTurn:
            this.guard
              .maxCallsPerTurn,
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

      this.guard.clearTurn(
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

      const turnState =
        this.guard.turnState(
          sessionID,
        )

      this.guard.clearTurn(
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
            turnState,
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

      this.guard.clearTurn(
        sessionID,
      )

      this.turns.delete(
        sessionID,
      )

      this.pendingUserText.delete(
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
  ): () => Promise<void> {
    let iterator: AsyncIterator<any> | null =
      null

    let stopGateResolve:
      (() => void) |
      null =
        null

    const stopGate =
      new Promise<void>(
        (resolve) => {
          stopGateResolve =
            resolve
        },
      )

    let stopped =
      false

    const task =
      (async () => {
        try {
          const events =
            ctx.event.subscribe()

          iterator =
            events?.[
              Symbol.asyncIterator
            ]?.() ?? events

          this.trace.write(
            "EVENT_SUBSCRIBED",
            {
              asyncIterator:
                typeof iterator?.next,
            },
          )

          if (!iterator?.next) {
            throw new Error(
              "OpenCode V2 event subscription is not async-iterable",
            )
          }

          while (!stopped) {
            const item =
              await Promise.race(
                [
                  iterator.next(),

                  stopGate.then(
                    () =>
                      ({
                        done: true,
                        value:
                          undefined,
                      }),
                  ),
                ],
              )

            if (
              stopped ||
              item?.done
            ) {
              break
            }

            try {
              await this.handle(
                item?.value,
              )
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

    return async () => {
      if (stopped) {
        return
      }

      stopped =
        true

      stopGateResolve?.()

      /*
       * The host's iterator return() may never settle at all (observed live:
       * neither resolves nor rejects). Bound it so cleanup always completes;
       * the stop gate above has already terminated the run loop.
       */
      await Promise.race(
        [
          (async () => {
            try {
              await iterator?.return?.()
            } catch (error) {
              this.trace.write(
                "EVENT_UNSUBSCRIBE_FAILED",
                {
                  error:
                    String(error),
                  },
                )
            }
          })(),

          new Promise<void>(
            (resolve) =>
              setTimeout(
                resolve,
                2000,
              ),
          ),
        ],
      )

      await Promise.race(
        [
          task,

          new Promise<void>(
            (resolve) =>
              setTimeout(
                resolve,
                2000,
              ),
          ),
        ],
      )

      this.trace.write(
        "EVENT_LIFECYCLE_STOPPED",
        {},
      )
    }
  }
}
