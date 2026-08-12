# Validation And False-Positive Controls

## Purpose and Preconditions

Use to classify a bounded observation before reporting. Require a baseline, a stated invariant, and access to authoritative state or audit evidence.

## Safe Bounded Methodology

Compare the observation to sequential behavior, wait only the documented consistency interval, inspect authoritative state, and verify cleanup. If evidence is incomplete, report it as inconclusive rather than repeating the test.

## State And Idempotency Interpretation

Confirmation requires a durable invariant violation. Retries, duplicate HTTP responses, or reordered events are not confirmation when the operation ID and final state remain singular and consistent.

## False-Positive Controls And Limits

Account for client retries, queues, read replicas, cache, test resets, and asynchronous workers. Do not increase request volume, add timing manipulation, or test other accounts to resolve ambiguity. Stop at the declared cap.

## Evidence

Include the invariant, baseline, observed and authoritative states, audit correlation, declared limits, and cleanup status.

## Remediation

Recommend the control that enforces the failed invariant, then add monitoring that detects duplicate operations and repair paths.

## Source

- PortSwigger, [Race conditions](https://portswigger.net/web-security/race-conditions)
