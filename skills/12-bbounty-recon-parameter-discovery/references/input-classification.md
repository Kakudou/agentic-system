# Input Location And Type Classification

## Purpose

Consistently distinguish query, body, header, cookie, and JSON-path inputs and record only supported type claims.

## Preconditions

The candidate is tied to a permitted request, client artifact, or first-party contract. Review the [confidence matrix](../assets/input-location-type-confidence-matrix.md).

## Method

Classify location from request structure: URI query, request body, request header, cookie field, or JSON path within a request body. Record type only as observed or documented, such as string-shaped, integer-shaped, boolean-shaped, array, object, file metadata, or unknown. Use the focused location reference when needed: [query](query.md), [body](body.md), [headers](headers.md), [cookies](cookies.md), or [JSON](json.md).

## Interpretation And Controls

Never merge inputs with the same name across locations. A value's appearance is not a schema guarantee. Response fields, DOM attributes, and client-side state remain non-input candidates unless correlated with a request or authoritative contract.

## Evidence And Handoff

State location, type basis, confidence, and source locator. Mark ambiguity rather than selecting the most convenient classification.

## Sources

- OpenAPI Specification: https://spec.openapis.org/oas/latest.html
- RFC 9110, HTTP semantics: https://www.rfc-editor.org/rfc/rfc9110
