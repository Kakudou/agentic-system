# UNION-Based SQL Injection

Use this method only when an injected input reaches a `SELECT`-like query and the application visibly renders query-derived rows. `UNION` combines the original result with another `SELECT`; it requires an equal number of columns and compatible types. Obtain explicit authorization and start with harmless constants, not application data.

## Controlled workflow

1. Record several normal responses for the same session, request method, and input shape. Note stable markers, status, body length, and any result-row count.
2. Establish whether quote or syntax changes produce a repeatable, SQL-correlated difference. A generic denial page alone is not confirmation.
3. Determine result-column count using either ordinal ordering until the first reproducible out-of-range response, or successively longer `UNION SELECT NULL,...` lists. `NULL` is useful because it is compatible with many types. The last valid ordinal or matching null count is a hypothesis; confirm it by repeating the boundary pair.
4. Place a unique non-sensitive marker in one candidate column at a time while retaining `NULL` elsewhere. A reflected marker proves both type compatibility and output location. Never infer visibility merely from an HTTP 200 response.
5. If scope requires DBMS confirmation, display one low-risk server identity/version value in the proven text column. Cross-check the result with syntax/error evidence before treating it as fact.
6. Stop at a minimal proof. If schema knowledge is in scope, retrieve only a small metadata sample sufficient to establish reachability, then use `schemas.md`.

## DBMS adaptations

Oracle requires `FROM dual` for constant `SELECT`s. MySQL accepts `-- ` only when the trailing space follows the double dash; `#` is another comment form. PostgreSQL, SQL Server, and SQLite differ in casts and concatenation, so reuse only syntax corroborated by the target. See `../assets/dbms_payloads.md`; version probes are indicators, not a license to enumerate data.

## Verification and false-positive controls

Compare a valid-column-count request against one too many and one too few, repeating each under the same conditions. Confirm a reflected marker is unique and not echoed by client-side code, caching, templating, or a request log. Dynamic inventory, A/B tests, CDN errors, authentication expiry, and WAF normalization can all change pages independently of SQL. Preserve request/response pairs with secrets removed.

## Impact and remediation

The demonstrated impact is unauthorized query-result control, not automatically access to every table. State exactly what was shown and which database identity was implicated. Remediate with parameterized queries for values, allowlisted fixed mappings for dynamic identifiers, generic external errors, and least-privilege database grants.

## Sources

- https://portswigger.net/web-security/sql-injection/union-attacks
- https://portswigger.net/web-security/sql-injection/finding-the-number-of-columns
- https://portswigger.net/web-security/sql-injection/finding-the-data-types
- https://portswigger.net/web-security/sql-injection/cheat-sheet
