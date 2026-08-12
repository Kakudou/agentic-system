# Inert Property-Handling Observation

## Purpose

Observe whether ordinary properties are validated, copied, and consumed according to the application contract without attempting pollution.

## Preconditions

- The feature accepts documented ordinary structured properties.
- Baseline behavior and permitted observation channels are available.

## Bounded Inert Methodology

Submit only normal, supported property names with unique inert values. Compare validation messages, normalized output, persisted own-property fields, and consumer behavior. Prefer source review or application telemetry when explicitly provided; never alter prototype state or probe privileged consumers.

## Observation And Interpretation

Expected behavior is rejection of unknown fields or deterministic handling of permitted own properties. Loose acceptance identifies a review candidate, not pollution. A confirmed assessment requires an unintended, reproducible security-relevant effect within authorization.

## False-Positive Controls

Check API versioning, form defaults, serialization quirks, cached responses, and feature flags. Repeat with a clean test record.

## Stop Conditions

Stop if the test affects shared configuration, other users, authorization, logging integrity, or system availability.

## Evidence

Record ordinary field names, inert labels, expected and observed validation behavior, response identifiers, and environment controls.

## Remediation

Use strict schemas, own-property checks, allowlisted assignment, and defensive object types; test fixes with ordinary acceptance and rejection cases.

## Sources

- https://portswigger.net/web-security/prototype-pollution
- https://owasp.org/www-community/attacks/Prototype_Pollution
