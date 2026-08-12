# Schema And Parameter Observation Boundaries

## Purpose

Preserve the contract details an authorized source reveals while preventing discovery from becoming enumeration or introspection.

## Preconditions

- The endpoint or operation is already in the approved inventory.
- The field, parameter, schema, or message detail appears in approved documentation or normal approved client traffic.

## Methodology

Transcribe visible names, locations, types, requiredness, media types, and documented constraints. For normal client traffic, record only values needed to identify the shape and redact credentials, tokens, personal data, identifiers, and response bodies unless program policy specifically requires retained evidence. Note omitted fields as unknown, not absent.

## Interpretation

Observed fields describe a single source or execution path, not the full accepted input set or server-side schema. Documentation can define optional fields that the client does not use. A validation error encountered during ordinary use is not permission to seek additional parameters.

## False-Positive And Scope Controls

- Do not request OpenAPI, GraphQL, protobuf, reflection, or introspection data unless separately and explicitly authorized.
- Do not add, remove, mutate, fuzz, or replay parameters, headers, messages, or operations.
- Stop if normal observation exposes sensitive data beyond the approved evidence-minimization policy.

## Evidence

Record the source locator, operation, redacted field description, observation context, date, and any redaction or uncertainty.

## Handoff

Provide a bounded contract observation and list unknowns for the owner of a separately authorized contract-review or validation activity.

## Sources

- PortSwigger Web Security Academy, [API testing](https://portswigger.net/web-security/api-testing)
- OWASP, [API Security Project](https://owasp.org/API-Security/)
