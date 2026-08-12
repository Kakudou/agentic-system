# Authorization Checks

## Purpose

Turn an authorization hypothesis into a small, reproducible role/object/action comparison without collecting unrelated data or changing state unnecessarily.

## Prerequisites

- Completed entry in the schema, role, and action worksheet.
- Named controlled object for each actor context and expected result.
- Explicit mutation authorization where a write action is included.

## Bounded Authorized Workflow

1. Select one operation and classify it as read, relationship traversal, or write.
2. Record the expected decision for the owner, non-owner, privileged role, and anonymous context only where each is authorized for testing.
3. Request the smallest response shape that proves access or denial.
4. For writes, use one reversible synthetic change and confirm resulting state before cleanup.
5. Stop after a confirmed violation, an unexpected effect, or an ambiguity requiring the program owner.

## Observations And Interpretation

- A successful response must contain protected data or a completed prohibited action to demonstrate an issue.
- Consistent denial across direct and nested paths supports resolver enforcement but does not prove every resolver is covered.
- Partial field redaction can be correct; compare it to the documented policy.

## False-Positive Controls

- Reauthenticate or verify session identity before conclusions.
- Account for tenant-level sharing, support delegation, feature flags, and eventual consistency.
- Do not substitute arbitrary identifiers for controlled-object comparisons.

## Evidence

Include operation classification, role/object labels, expected and observed result, minimum redacted response, timestamps, cleanup result, and rejected alternative explanations.

## Remediation

Apply authorization at every resolver and mutation entry point, use policy tests for direct and nested access paths, and avoid trusting client-supplied identifiers or roles.

## Sources

- PortSwigger: https://portswigger.net/web-security/graphql#access-control-vulnerabilities
- OWASP API5: https://owasp.org/API-Security/editions/2023/en/0xa5-broken-function-level-authorization/
