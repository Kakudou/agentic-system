# HTTP and Non-HTTP Boundaries

## Purpose and Preconditions

Classify an already observed service boundary without turning classification into protocol testing. Confirm the asset and service class are explicitly allowed by the authorization.

## Authorized Bounded Method

Use only source-provided labels, public architecture documentation, asset inventory records, and passive metadata. Assign one of `http`, `non_http`, `encrypted_transport`, or `unknown`; preserve the source wording beside the normalized class. Do not send protocol-specific requests, negotiate a session, or use a port number as proof of a protocol.

## Interpretation

An HTTP label supports only an HTTP-facing boundary in the cited source. A non-HTTP label may describe a management, messaging, name-resolution, or other service boundary, but does not establish exposure, access level, product, or version. Encrypted transport may encapsulate several application protocols and remains ambiguous without stronger authorized evidence.

## False-Positive Controls

- Port conventions are hints, not identity evidence.
- Distinguish an internal dependency from a public endpoint.
- Treat CDN, reverse-proxy, and shared-hosting labels as infrastructure context.
- Preserve `unknown` when sources disagree or are stale.

## Rate and Scope Limits

This reference authorizes no network interaction. Limit collection to the declared asset set and stop when a source reveals non-public operational details beyond the approved purpose.

## Evidence and Handoff

Record the original source label, normalized class, source date, scope decision, confidence, and reason for ambiguity. Route requests for active validation to the program owner or separately authorized workflow.

## Sources

- [RFC 9110: HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110)
- [IANA Service Name and Port Number Registry](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml)
