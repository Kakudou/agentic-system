# Prevention And Reporting

## Purpose and Preconditions

Use after a confirmed finding or as defensive guidance for a mapped risk. Tie every recommendation to a specific invariant and implementation boundary.

## Safe Bounded Methodology

Describe the transition, the violated or threatened invariant, and the smallest control that makes the check and durable write inseparable. Validate fixes only in an approved fixture with the same low-impact bounds as the original assessment.

## State And Idempotency Interpretation

Use transactions or atomic conditional writes for check-and-update operations; enforce uniqueness at the datastore; persist idempotency keys and outcomes; and make asynchronous consumers deduplicate. Locks alone are insufficient if reads, retries, or downstream effects bypass the invariant.

## False-Positive Controls And Limits

Do not claim a fix from code review alone. Confirm final state, duplicate handling, timeout recovery, and cleanup in the approved environment. Stop validation if it would exceed the fixture or authorization boundary.

## Evidence

Report affected transition, invariant, evidence classification, bounded reproduction conditions, remediation rationale, and retest evidence or its absence.

## Remediation

Prioritize atomic mutation, schema constraints, idempotency, transactional outbox or compensation, authorization at every state, and invariant-focused monitoring.

## Source

- PortSwigger, [Race conditions](https://portswigger.net/web-security/race-conditions)
