# Response And Consistency Interpretation

## Purpose and Preconditions

Use after a bounded observation produces differing responses or delayed results. Require access to an authoritative state source or classify the result as inconclusive.

## Safe Bounded Methodology

Compare each response with the sequential baseline, then check the final durable state and approved audit trail after the documented consistency period. Keep the test scope to one disposable identity and perform no repeated timing experiments.

## State And Idempotency Interpretation

Response order and latency do not prove concurrency failure. A confirmed issue requires a violated invariant in authoritative state or an unauthorized committed transition. Idempotent replays may return different status codes while correctly referring to the same durable outcome.

## False-Positive Controls And Limits

Exclude retries, load balancing, cache headers, queued jobs, replication lag, and frontend rendering differences. Do not use load, rate-limit pressure, or synchronization methods to force a result. Stop when consistency cannot be observed safely.

## Evidence

Record baseline and observed response metadata, consistency wait criteria, durable state, audit correlation, and cleanup result.

## Remediation

Expose stable operation identifiers, document consistency behavior, use transactional outbox patterns where needed, and make reads clearly distinguish pending from committed state.

## Source

- PortSwigger, [Race conditions](https://portswigger.net/web-security/race-conditions)
