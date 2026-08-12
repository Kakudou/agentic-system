# Out-of-Band SQL Injection

Out-of-band application security testing (OAST) is relevant when database work is asynchronous or HTTP output, errors, and timing provide no dependable signal. It depends on a database capability that can cause an outbound interaction and an authorized interaction service that records a unique callback.

## Confirmation-first process

1. Obtain explicit authorization for outbound interaction testing, including the callback domain, rate, permitted protocol, and data-handling rules.
2. Generate a unique, non-guessable interaction identifier and record its creation time.
3. Send one minimal, non-data-bearing callback trigger suitable for the suspected DBMS and query context.
4. Poll the authorized listener for a bounded window. Correlate protocol, unique identifier, source metadata, and timestamp with the request.
5. Repeat once with a fresh identifier and a non-trigger control. Two attributed interactions are stronger evidence than a single event.

## Interpretation and constraints

An interaction proves that something reached the callback domain, not necessarily that it was the target database. Corporate resolvers, security scanners, prefetching, and collaborator reuse can produce noise. Require unique-token correlation and a control request without the trigger. Network egress policy, DNS restrictions, database privileges, disabled procedures, and asynchronous queues often prevent OAST even when SQLi exists.

Do not place database values, credentials, tokens, personal data, or arbitrary file contents in DNS labels, URLs, or any callback. Do not use OS-command or file-writing capabilities. If a no-data callback confirms execution, stop and report the potential for outbound interaction subject to authorization and egress controls.

## Defensive response

Parameterize SQL and remove dynamic query construction. Restrict database service-account privileges, disable unneeded network-capable procedures/features, apply egress filtering and DNS monitoring, and alert on unexpected database-originated lookups. Retest with the same non-data-bearing callback after remediation.

## Sources

- https://portswigger.net/web-security/sql-injection/blind
- https://portswigger.net/web-security/sql-injection/cheat-sheet
