# Client And Documentation Correlation

## Purpose

Improve confidence by comparing allowed client-observed inputs with first-party API documentation, schemas, or published contracts.

## Preconditions

Both sources are in scope or explicitly approved. Documentation must be attributable to the target owner; third-party examples and stale mirrors are not authoritative.

## Method

Compare endpoint, method, input location, name/path, and stated type. Record agreement, disagreement, or absence. A read-only review of existing browser assets or API descriptions is allowed only when it remains within scope; do not derive hidden endpoints or initiate requests from it.

## Interpretation And Controls

Documentation may be stale, generic, version-specific, or permission-gated. Client code can expose dead, experimental, or environment-specific fields. Agreement raises confidence but does not prove server-side acceptance, authorization, or security impact.

## Evidence And Handoff

Cite stable documentation sections and client/request locators. Describe conflicts and retain them as unconfirmed rather than resolving them through experimentation.

## Sources

- OpenAPI Specification: https://spec.openapis.org/oas/latest.html
- JSON Schema: https://json-schema.org/specification
