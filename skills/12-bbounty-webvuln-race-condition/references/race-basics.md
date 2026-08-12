# Race Basics And Race-Window Hypotheses

## Purpose and Preconditions

Use this guide to turn an authorized concern into a falsifiable state-consistency hypothesis. Require a scoped target, disposable identity, reversible transition, and an observable authoritative state; otherwise stop.

## Safe Bounded Methodology

Map the transition as `precondition -> check -> mutation -> commit -> observable state`. A race-window hypothesis names one possible gap between check and commit, the invariant expected after sequential execution, and the least invasive observation. Prefer provider fixtures. If live confirmation is explicitly allowed, set the smallest manual attempt count needed by the program and never expand it after ambiguity.

## State And Idempotency Interpretation

A safe implementation commits one valid transition or rejects a duplicate without changing durable state. A repeated success response alone is not proof: confirm the final authoritative state, audit record, and idempotency key behavior. A rejected duplicate with one consistent state is expected.

## False-Positive Controls And Limits

Account for retries, asynchronous workers, stale reads, caching, eventual consistency, and duplicate display events. Use one isolated account, no shared records, no notifications, and no value-bearing actions. Stop on rate limiting, unexpected state, third-party effect, or unclear authorization.

## Evidence

Record the transition map, invariant, baseline, timestamps, redacted identifiers, authoritative before/after state, and cleanup result. Classify observations as confirmed, not reproduced, inconclusive, or stopped.

## Remediation

Make validation and mutation atomic, enforce datastore constraints, use idempotency keys with durable outcome records, and make consumers tolerate duplicate delivery.

## Source

- PortSwigger, [Race conditions](https://portswigger.net/web-security/race-conditions)
