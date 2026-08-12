# Error-Based SQL Injection

Use error-based testing when malformed input creates a stable server response and error handling may expose database behavior. Error content can reveal query context, DBMS family, or occasionally a value coerced into an invalid type. Treat verbose errors as sensitive evidence and do not use them to retrieve secrets.

## Safe workflow

1. Capture normal and deliberately invalid application-level inputs to distinguish validation errors from backend failures.
2. Apply a minimal syntax-boundary probe appropriate to the input context. Record status, error family, correlation ID, and a redacted excerpt.
3. Repeat the exact probe and compare it with a syntactically similar control. A database-derived error must recur only with the SQL-relevant change.
4. Where responses are otherwise identical, use a conditional-error design: a known false condition should avoid the error and a known true condition should produce it. Repeat the pair before drawing conclusions.
5. If a verbose cast or conversion error returns a value, stop after a harmless, non-sensitive value demonstrates the channel.

## Error classification

SQL parser, type-conversion, column-count, and divide-by-zero messages can each support an injection hypothesis when tied to paired controls. Generic 500 pages, ORM exceptions without SQL context, proxy errors, and WAF block pages do not. A named database in an error is a fingerprinting clue, not proof that the injected expression executed as intended.

## DBMS variation and controls

Cast syntax, conditional expressions, and exposed error text vary widely among MySQL, PostgreSQL, SQL Server, Oracle, and SQLite. Use a provider-specific probe only after a lower-risk observation suggests that provider, and corroborate with `dbms-detection.md`. Suppressed production errors may still yield a status or body-class oracle; then treat the technique as blind conditional error testing.

Do not use errors that alter state, invoke external programs, or depend on excessive computation. Stop if error rates affect availability or monitoring indicates service distress.

## Reporting and mitigation

Provide the normal/control/probe sequence, redacted response distinction, and reproduction count. Explain whether the finding shows SQL parsing, conditional execution, or data reflection. Fix unsafe concatenation with parameter binding, allowlist dynamic identifiers, handle exceptions generically at the boundary, and retain detailed diagnostics only in protected logs.

## Sources

- https://portswigger.net/web-security/sql-injection/blind
- https://portswigger.net/web-security/sql-injection/cheat-sheet
