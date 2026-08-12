# Invariant-Testing Assessment

## Purpose and Prerequisites

Use when a property must remain true through valid operations, such as a permitted quantity range, a non-negative test balance, a consistent entitlement, or agreement between related records. Use synthetic data and reversible operations only.

## Map Intended Business Rules

Write each invariant as a clear assertion with scope and exceptions. Examples: a server-confirmed quote uses an authoritative catalog amount; a test object cannot enter a terminal state without its prerequisite; a revoked test entitlement is unavailable. Link every assertion to documentation, observed baseline behavior, or a confirmed owner statement.

## Safe State, Role, and Object Testing

Choose one invariant at a time. Record its baseline, perform one bounded permitted action, and check the authoritative outcome. Prefer harmless boundaries around documented limits over malformed, extreme, or value-seeking inputs.

## Observations and Interpretation

An invariant failure requires a persistent, server-side contradiction, not a stale page or intermediate asynchronous state. Compare relevant records at the same consistency point and note defined rounding, delay, or reconciliation behavior.

## False-Positive Controls

- Separate universal invariants from conditional business rules and approved exceptions.
- Verify data freshness and eventual-consistency windows.
- Confirm that test fixtures do not intentionally violate production constraints.

## Evidence

Capture the assertion, source, baseline, controlled action, authoritative before/after observations, exception checks, and cleanup outcome.

## Remediation

Centralize invariant enforcement at the authoritative service boundary. Add server-side validation, transactional consistency checks, reconciliation monitoring, and tests covering rule boundaries and state changes.

## Sources

- [PortSwigger: Business logic vulnerabilities](https://portswigger.net/web-security/logic-flaws)
- [OWASP: Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)
