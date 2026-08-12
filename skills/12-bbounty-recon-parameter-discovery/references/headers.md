# Header Inputs

## Purpose

Record request headers naturally sent by the approved client and distinguish them from response metadata.

## Preconditions

The header came from an allowed client request or first-party documented contract. Never add or alter headers to infer behavior.

## Method

Record header name, source, endpoint/method association, and redacted value shape. Separate browser or intermediary-generated headers from application-declared headers where evidence supports that distinction.

## Interpretation And Controls

A response header is not evidence that the server accepts the same request header. Browser defaults, proxies, CORS preflights, and observability IDs may not be application inputs. Treat authorization and tracing headers as sensitive and omit their values.

## Evidence And Handoff

Use [client and documentation correlation](client-documentation-correlation.md) for application-header claims and flag client-only headers as unconfirmed.

## Sources

- RFC 9110, HTTP fields: https://www.rfc-editor.org/rfc/rfc9110
- Fetch Standard, header handling: https://fetch.spec.whatwg.org/
