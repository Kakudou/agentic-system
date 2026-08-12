# Controlled Confirmation

## Purpose and Preconditions

Use only after a state-transition hypothesis identifies a reversible, low-impact test path. Written program permission must explicitly cover confirmation; otherwise use a fixture or report the hypothesis without testing.

## Safe Bounded Methodology

Establish a sequential baseline, declare a minimal manual confirmation and side-effect cap, and observe only the selected test identity. Use ordinary approved tooling without scripts, request floods, synchronization tricks, or altered timing. Perform cleanup before any further work. Do not test financial, inventory, authentication, authorization, notification, or third-party workflows.

## State And Idempotency Interpretation

Compare the final durable state to the baseline invariant. Correct idempotency yields one durable effect and a duplicate rejection or replay of the original outcome. Divergent responses without divergent durable state are not a confirmed race.

## False-Positive Controls And Limits

Rule out client retries, browser resubmission, background jobs, delayed replication, cache variance, and test-environment resets. Keep one test account, one transition, and the predeclared cap. Stop rather than retune attempts when results are ambiguous.

## Evidence

Capture scope authorization, baseline, declared cap, timestamps, redacted request correlation IDs, authoritative state, audit records, and cleanup confirmation.

## Remediation

Recommend transactional compare-and-set or locking at the invariant boundary, durable idempotency handling, and reconciliation for interrupted work.

## Source

- PortSwigger, [Race-condition vulnerability types](https://portswigger.net/web-security/race-conditions)
