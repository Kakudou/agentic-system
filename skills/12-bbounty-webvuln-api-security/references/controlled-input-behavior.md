# Controlled Input Behavior Assessment

## Purpose and Preconditions

Assess whether approved operations enforce their documented input contract without exploit development. Requires written permission for the exact operation and a reversible, dedicated test object.

## Bounded Authorized Methodology

Establish one known-good request. Change only one documented field's permitted boundary, type, format, nullability, or value representation per request. Observe status, error category, and dedicated object state. Assess unexpected-property handling only for properties already explicitly listed in the owner-provided contract; do not guess names or send payload collections.

## Observations and Interpretation

Expected behavior is deterministic rejection or safe normalization consistent with the contract. Unexpected acceptance, coercion, or changed state should be treated as a candidate validation or property-authorization issue and passed to safe confirmation.

## False-Positive Controls

Account for API gateways, SDK serialization, server defaults, asynchronous updates, locale or time-zone normalization, and version-specific schemas. Repeat only the minimum baseline comparison needed to rule these out.

## Stop Conditions

Stop if the request could create irreversible state, increase resource use materially, affect a non-test record, disclose sensitive data, or cause instability.

## Evidence

Keep the contract citation, field classification, redacted baseline and variation, response metadata, and before/after state of the dedicated test object.

## Remediation

Use server-side allowlist schemas, strict deserialization, explicit writable-field mapping, resource limits, and consistent validation errors without sensitive internals.

## Sources

- [PortSwigger: API testing](https://portswigger.net/web-security/api-testing)
- [OWASP API3:2023 Broken Object Property Level Authorization](https://owasp.org/API-Security/editions/2023/en/0xa3-broken-object-property-level-authorization/)
