# Improved Prompt Construction

Read immediately before composing the retrospective's improved prompt.

## Goal

Produce the **best plausible starting request for the delivered outcome**, not an omniscient specification containing every implementation detail learned later.

## Include

- explicit desired outcome
- essential starting context
- constraints that proved materially necessary
- boundaries that prevent observed scope drift
- input/output shape when it mattered
- success criteria that were actually established by delivery/acceptance
- relevant failed approach only when the user had already tried it before the original ask or when excluding it is necessary to reproduce the delivered route

## Exclude

- hindsight trivia that did not affect success
- implementation steps the successful agent could choose independently
- tool call choreography
- internal agent role names unless they were genuinely part of the user's requested system
- abandoned ideas outside final scope
- future improvements not delivered
- explanations such as “I am telling you this because last time…”

## Natural-Language Rule

The improved prompt should sound like a strong user request, not like a pipeline log or meta-analysis.

Prefer:

> Refactor the authentication middleware to preserve the existing route API while making token refresh idempotent. Keep the current database schema and add regression coverage for expired and duplicated refresh attempts. Done means the existing suite plus the new refresh tests pass.

Avoid:

> Phase 1 inspect files, Phase 2 use tool X, Phase 3 run agent Y, because during the original session we had a problem with...

## Fresh-Context Completeness

A new agent should understand:

- what to accomplish
- what not to change
- what material context applies
- how success is recognized

without access to the retrospective.

## Scope Ceiling

The delivered result is the ceiling, not a minimum. If an improvement was discussed but not delivered, leave it out unless the original request already explicitly required it and the final state merely failed to satisfy it; in that case mark the retrospective as unresolved rather than pretending delivery occurred.
