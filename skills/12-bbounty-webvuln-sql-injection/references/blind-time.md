# Blind SQL Injection Through Time Delays

Use timing only after visible output, errors, and conditional response markers are unavailable or unreliable. It infers query execution from a server-side delay, so network jitter makes it the noisiest common SQLi technique.

## Method

1. Take a baseline sample of identical, ordinary requests. Record client-observed elapsed time, status, body class, and server region if known.
2. Test a DBMS-appropriate, authorized conditional delay paired with an equivalent no-delay condition. Use the shortest delay that exceeds normal variance without burdening the service.
3. Alternate baseline, false control, and true control sequentially. A true control should repeatedly exceed both controls by approximately the chosen delay; a single slow response proves nothing.
4. If the signal is stable, repeat one harmless conditional fact to verify that the delay follows predicate truth. Stop after the minimum proof.

Delay functions vary: MySQL uses `SLEEP`, PostgreSQL uses `pg_sleep`, SQL Server uses `WAITFOR`, and Oracle methods have different privilege and context constraints. SQLite has no standard sleep primitive. Function acceptance without a measured, controlled difference is not confirmation.

## Variance and false positives

Avoid parallelism, cache warm-up effects, busy endpoints, and long delay values. Queueing, upstream retries, rate limits, geographic routing, garbage collection, connection establishment, and WAF challenges can all create latency. Keep the request method, body, headers, session, and transport path constant. If median baseline latency is variable enough to overlap the selected delay, discontinue timing and prefer another method.

## Evidence and remediation

Keep a compact table of alternating samples, measured durations, expected predicate, and response class. Redact request credentials. Report only a confirmed conditional timing oracle and its observed confidence, not inferred sensitive content. Remediation is identical to other SQLi: bind values, allowlist unavoidable query identifiers, minimize database privileges, and retest with the same sequential control plan.

## Sources

- https://portswigger.net/web-security/sql-injection/blind
- https://portswigger.net/web-security/sql-injection/cheat-sheet
