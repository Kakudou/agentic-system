# DNS, HTTP, And TLS Baseline

## Purpose

Capture a minimal, reproducible baseline for an already authorized web target without turning baseline collection into enumeration.

## Preconditions

- Scope and target identity are confirmed.
- The target is an explicitly authorized hostname or URL.

## Methodology

Use ordinary resolver and browser-equivalent observation only as permitted by the program. For the declared hostname, record relevant DNS answers, one normal HTTP(S) response per authorized scheme, response status and selected headers, and publicly presented TLS certificate metadata. Keep request count minimal and do not query unrelated record names, ports, paths, or host headers.

## Observations And Interpretation

DNS answers describe a routing state at a point in time. HTTP headers and page metadata can suggest a delivery layer or framework but are not reliable product inventory. Certificate issuer, validity window, and presented names document the connection identity; they do not prove asset ownership or a security defect.

## False-Positive Controls

- Capture timestamp, resolver or browser context, exact URL, and redacted response metadata.
- Distinguish a resolver failure, transport failure, and application response.
- Do not classify a missing header, version banner, certificate warning, or CDN response as a vulnerability during bootstrap.

## Rate And Scope Limits

Honor published limits and caching guidance. Use no parallel requests, no retries beyond a documented transient failure check, no port variation, no TLS-cipher testing, and no content crawling. Stop on rate-limit signals or unexpected impact.

## Evidence

Record the observation source, request timestamp, target, DNS answer type and value, HTTP status and selected headers, TLS subject/issuer/validity/presented names, and any error as observed.

## Handoff

Provide raw observation excerpts or hashes where policy permits, with interpretations marked as tentative. Refer possible certificate, transport, or header concerns to a separately authorized validation workflow.

## Sources

- PortSwigger Web Security Academy, [Information gathering](https://portswigger.net/web-security/information-gathering)
- RFC 1034, [Domain names: concepts and facilities](https://www.rfc-editor.org/rfc/rfc1034)
- RFC 9110, [HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110)
- RFC 8446, [The Transport Layer Security (TLS) Protocol Version 1.3](https://www.rfc-editor.org/rfc/rfc8446)
