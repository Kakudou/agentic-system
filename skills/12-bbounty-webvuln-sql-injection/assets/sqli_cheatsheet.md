# SQLi Method Selection Matrix

Use only on authorized targets. Begin with a stable baseline, make one change at a time, and stop at minimum necessary proof.

| Symptom | Confirmatory controls | Expected observation | Next safe action |
|---|---|---|---|
| Quote or syntax boundary changes response | Normal input, malformed input, repeated syntax-relevant probe | Repeatable SQL-like parser/type error or distinct generic error | Use `error-based.md`; fingerprint only with independent evidence. |
| Result page changes with true versus false condition | Alternating true/false predicates and baseline | Same stable marker follows predicate truth across repeats | Use `blind-boolean.md`; prove one harmless fact only. |
| Injected result marker appears in page/API | Valid and invalid column-count controls; marker in one candidate column at a time | Unique marker is rendered only for valid compatible column | Use `union-based.md`; display a minimal non-sensitive DBMS fact if required. |
| No content change, but conditional request latency separates controls | Sequential baseline/false/true samples | True samples repeatedly exceed both controls by selected delay | Use `blind-time.md`; stop if variance overlaps signal. |
| Query is asynchronous or no HTTP oracle exists | Unique callback trigger, non-trigger control, fresh identifier | Authorized listener sees correlated callback twice | Use `oob.md`; no data in callback. |
| SQL-looking error has no reliable behavior | Repeat malformed application input and SQL-relevant input | Difference is inconsistent or unrelated to syntax | Do not classify; retain evidence and try another authorized vector. |

## DBMS capability matrix

| DBMS | Version indicator | Catalog direction | String concatenation | Timing/OOB caveat |
|---|---|---|---|---|
| MySQL | `@@version` | `information_schema` | `CONCAT()` | `SLEEP` is context-dependent; OOB paths are platform constrained. |
| PostgreSQL | `version()` | `information_schema`, `pg_catalog` | `||` | `pg_sleep` needs valid expression context; program execution is privilege-sensitive and out of scope. |
| SQL Server | `@@VERSION` | `information_schema`, `sys` | `+` | `WAITFOR` is context-sensitive; network-capable procedures require privileges. |
| Oracle | `v$version`/`v$instance` | `all_tables`, `all_tab_columns` | `||` | Constant selects require `dual`; delay and DNS methods are privilege/configuration dependent. |
| SQLite | `sqlite_version()` | `sqlite_master`, pragmas | `||` | No standard sleep/OOB primitive; do not mistake application latency for evidence. |

## Safe test and evidence checklist

- Confirm scope, request rate, account authorization, and sensitive-data rules.
- Preserve a baseline and paired control for every claimed SQL-dependent effect.
- Normalize dynamic response fields before comparison.
- Repeat observations and record count, order, time, status, and stable marker.
- Redact cookies, tokens, user data, host internals, and version detail not needed for remediation.
- Stop on instability, rate limiting, unexpected data, state-changing behavior, or service impact.

## Remediation lookup

| Finding | Required fix | Defense in depth |
|---|---|---|
| Value injection | Parameterized/prepared query with fixed SQL text | Query tests with hostile inputs; generic client errors. |
| Dynamic sort/table/column injection | Server-side allowlist mapping to fixed fragments | Redesign to remove user-controlled SQL grammar. |
| Excessive accessible data | Narrow database role and segregated data access | Audit grants and monitor unusual query patterns. |
| Verbose SQL errors | Generic external error handling | Protected correlated server logs. |
| Database-triggered outbound request | Remove injection and disable unneeded network-capable features | Egress/DNS controls and monitoring. |

## Sources

- https://portswigger.net/web-security/sql-injection
- https://portswigger.net/web-security/sql-injection/cheat-sheet
- https://portswigger.net/web-security/sql-injection/blind
