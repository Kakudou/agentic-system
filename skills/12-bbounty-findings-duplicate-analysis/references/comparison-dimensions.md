# Comparison Dimensions

## Purpose And Preconditions

Compare finding records consistently without treating a single shared attribute as identity. Use only admitted evidence for at least two findings with compatible authorization and collection context.

## Documentation Methodology

Record the original value and any narrow normalization for each dimension: asset and route identity, affected authorization boundary, observed behavior, input or precondition class, evidence time and environment, claimed security property, and bounded consequence. Mark each dimension as match, difference, unknown, or incomparable, with evidence IDs and locators. Preserve redirects, versions, roles, tenants, methods, and environment differences rather than silently collapsing them.

## Bias, Privacy, And False-Claim Controls

Names, categories, endpoints, similar wording, shared infrastructure, or a shared symptom are leads only. They do not prove the same asset, mechanism, report, or condition. Do not score, automate, or weight dimensions into a conclusion; explain the evidence and material differences instead. Redact identifiers when program rules require it.

## Evidence And Handoff

Place the completed dimensions in the [static comparison worksheet](../assets/comparison-worksheet.md). Handoff unresolved identity, tenancy, version, or ownership questions to an authorized reviewer.

## Disclosure And Triage Sources

- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [RFC 9110: HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110)
