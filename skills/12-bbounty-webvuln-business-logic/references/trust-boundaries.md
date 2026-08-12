# Trust-Boundary Assessment

## Purpose and Prerequisites

Use when client input, a browser workflow, a partner integration, a cache, or a downstream service provides data used for a business decision. Confirm authorization and use non-sensitive, designated test data only.

## Map Intended Business Rules

For each decision, identify the data origin, trust level, transformations, authoritative server source, and final enforcement point. Typical decisions include price, eligibility, quantity, ownership, address, currency, and approval status.

## Safe State, Role, and Object Testing

Compare a normal request with one minimal, permitted variation to a non-authoritative context value on an isolated test object. Observe whether the server derives the value from authoritative records or accepts it as a decision input. Do not submit privileged role values, production credentials, or values that could grant benefit.

## Observations and Interpretation

Echoing client data is not proof of trust. A finding needs a server-side decision that contradicts the authoritative rule. Account for signed values, server-side session context, gateway normalization, and documented delegated workflows.

## False-Positive Controls

- Confirm which component is authoritative for the decision.
- Check that test-mode configuration is not intentionally permissive.
- Treat client validation absence as defense-in-depth unless server enforcement also fails.

## Evidence

Capture the data-flow map, baseline and safe variation, authoritative value, server decision, affected test object, and proof that no value or privilege was obtained.

## Remediation

Treat client and external context as untrusted. Resolve sensitive decisions from authoritative server-side records, validate signed context and provenance, and enforce authorization and business constraints at the final action.

## Sources

- [PortSwigger: Business logic vulnerabilities](https://portswigger.net/web-security/logic-flaws)
- [OWASP: Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)
