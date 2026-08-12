# JSON Inputs

## Purpose

Record JSON request fields and paths already emitted by an approved client or stated in first-party schemas.

## Preconditions

The JSON body is from an allowed, naturally generated request or an in-scope first-party document. Never send an empty, modified, or exploratory JSON body.

## Method

Capture field paths, value kinds, nullability as observed, and enclosing media type. Preserve nesting and arrays without retaining sensitive values.

## Interpretation And Controls

Response JSON keys are output data, not automatically request inputs. Client-side models and schemas can include optional, deprecated, or feature-gated fields. Do not infer accepted types or requiredness without direct request or documentation evidence.

## Evidence And Handoff

Use the [client and documentation correlation](client-documentation-correlation.md) reference before upgrading confidence. State whether each path is request-observed, documentation-only, or corroborated.

## Sources

- RFC 8259, JSON: https://www.rfc-editor.org/rfc/rfc8259
- OpenAPI Specification, parameter and request body descriptions: https://spec.openapis.org/oas/latest.html
