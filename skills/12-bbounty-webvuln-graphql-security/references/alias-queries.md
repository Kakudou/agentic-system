# Alias Query Semantics

## Purpose

Provide the interpretation boundary for GraphQL aliases: they rename response keys for repeated field selections and can change effective work per HTTP request.

## Prerequisites

- A documented or observed operation that supports repeated field selection.
- Explicit alias-count limits and a benign read-only controlled object.
- No guessable, sensitive, or state-changing inputs.

## Bounded Authorized Workflow

1. Confirm the normal single selection and its expected response shape.
2. Use one small authorized alias comparison with known controlled values only.
3. Determine whether validation, complexity controls, and visible rate-limit semantics treat effective operations appropriately.
4. Stop after one comparison or on any warning signal; do not scale aliases or automate generation.

## Observations And Interpretation

- Different response keys alone are expected alias behavior.
- Acceptance of a small repeated selection is not evidence of a weakness.
- A concern requires evidence that a sensitive control counts only the transport request while allowing prohibited effective work within agreed limits.

## False-Positive Controls

- Confirm that aliases reference the same resolver behavior and controlled objects.
- Do not claim rate-limit bypass from a single accepted request without an observable policy mismatch.
- Treat operation-specific quotas and documented bulk access as possible intended controls.

## Evidence

Capture the approved ceiling, baseline/comparison classification, visible throttling or cost decision, expected policy, and no-harm stop result.

## Remediation

Use operation-aware quotas, alias and root-field caps, and pre-execution complexity analysis for sensitive resolvers.

## Sources

- PortSwigger: https://portswigger.net/web-security/graphql#bypassing-rate-limiting-using-aliases
- OWASP: https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html#query-limiting-depth--amount
