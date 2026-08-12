# Remediation Lookup

## Purpose

Translate the observed boundary into a conservative owner handoff. Confirm framework-specific advice against the application's supported version and architecture.

| Observed condition | Preferred remediation | Verification criterion |
|---|---|---|
| Native object serialization crosses a trust boundary | Replace with a data-only, schema-validated representation | Untrusted input reaches only primitive/data-transfer fields |
| Dynamic type metadata is accepted | Remove polymorphic binding or enforce a small explicit allowlist | Configuration and tests reject unapproved types before binding |
| Legacy formatter/API remains reachable | Migrate to supported safe serialization and disable the legacy path | Code/config inventory shows no untrusted entry path |
| Signature is treated as sufficient safety | Verify integrity before parsing and separately constrain types and schema | Invalid or out-of-policy content is rejected without typed activation |
| Boundary is uncertain | Add structured logging, ownership, and an architecture review | Owner can identify format, parser, validation order, and trust source |

## Handoff Template

State the boundary, evidence locator, confidence, control gap, recommended owner action, and retest evidence needed. Do not include sensitive values or operational test material.
