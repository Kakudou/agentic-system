# Server-Side Interpretation

## Purpose

Assess whether a documented server request path performs unsafe object-property handling without causing persistent mutation, data access, or code execution.

## Preconditions

- The endpoint, method, account, rate, and test type are explicitly authorized.
- A normal request baseline and expected response contract are recorded.
- The tester can use an isolated test account or reversible test state where the program requires it.

## Bounded Inert Methodology

1. Map accepted structured fields, validation errors, and documented nested-object behavior using ordinary valid inputs and unique inert labels.
2. Identify server-side parsing, normalization, merge, configuration, or persistence boundaries from response metadata, documentation, and authorized source review.
3. Compare only safe handling outcomes such as rejection, canonicalization, or preservation of ordinary own properties.
4. Do not use special prototype names, mutate shared state, invoke internal services, access data, or seek execution behavior.

## Observation And Interpretation

A server-side concern needs a reproducible input-to-handling-path observation plus an unintended, security-relevant effect in the server's response or authorized telemetry. A generic JSON parser, an object merge utility, or a changed error message alone is not proof of prototype pollution. Do not infer persistence from a single response.

## False-Positive Controls

- Repeat against a fresh, authorized test record and compare with the baseline.
- Rule out request replay, caching, validation normalization, load balancing, and concurrent test activity.
- Confirm the affected component is server-side rather than a browser rendering artifact.

## Stop Conditions

Stop on evidence of shared-state change, cross-user influence, unexpected processing cost, a rate-limit warning, or any requirement to access records, secrets, infrastructure, or execution-capable sinks.

## Evidence

Record the authorized endpoint, method, content type, redacted baseline and observed response metadata, correlation IDs, timestamps, test-account boundary, and reproducibility notes.

## Remediation

Enforce schema validation before object composition, reject dangerous property names at every recursive boundary, use null-prototype or map-like structures where appropriate, and patch affected libraries. Apply these controls at API, worker, and configuration ingestion boundaries.

## Sources

- https://portswigger.net/web-security/prototype-pollution/server-side
- https://owasp.org/www-community/attacks/Prototype_Pollution
