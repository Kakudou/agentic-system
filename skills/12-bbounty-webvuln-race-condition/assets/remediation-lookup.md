# Remediation Lookup

| Failure Mode | Primary Control | Defense In Depth | Verification |
| --- | --- | --- | --- |
| Check and write split | Atomic conditional write or transaction | Invariant alerting | One terminal state after replay |
| Duplicate operation | Durable idempotency key and stored outcome | Unique constraint | Replays resolve to original outcome |
| Concurrent creation | Database uniqueness constraint | Transactional retry handling | One canonical object |
| Intermediate state exposed | Keep object private until committed | Authorization on each consumer | Incomplete object remains inert |
| Asynchronous duplicate effect | Transactional outbox and consumer deduplication | Reconciliation job | One downstream effect per operation |
