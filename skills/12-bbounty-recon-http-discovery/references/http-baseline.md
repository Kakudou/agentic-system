# HTTP Identity and Baseline

## Purpose and Preconditions

Create a minimal, comparable record for an exact, authorized HTTP(S) endpoint. Confirm the program permits ordinary requests to the declared scheme and port; this guide does not authorize adjacent ports, paths, hostnames, authentication, or content collection.

## Bounded Safe Methodology

Make the smallest ordinary observation needed for the approved endpoint, respecting the stricter of program and service rate limits. Record the endpoint as requested and effective, time, status class, response protocol where visible, selected non-sensitive headers, and a coarse response-size or content-type indicator. Prefer a designated harmless path; do not alter methods, headers, cookies, query parameters, or request bodies.

## Observations and Interpretation

A response establishes only that the endpoint produced that response at that time. CDN, WAF, geo-routing, load balancing, maintenance pages, and personalized sessions can change status, headers, and representation. Treat product and infrastructure names as hints, not confirmed components.

## False-Positive Controls

Record network location, resolver or client context when relevant, and whether cookies or credentials were absent. Compare only like-for-like observations. Repeat a material difference once at a safe interval when authorized; preserve an inconclusive result if it does not repeat.

## Scope, Evidence, and Handoff

Never turn a known endpoint into host, path, parameter, or port discovery. Retain the authorization reference, exact endpoint, timestamp, minimal metadata, and limitations in the [worksheet](../assets/endpoint-baseline-worksheet.md). Hand off unexplained differences as observations, not findings.

## Sources

- [RFC 9110: HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110)
- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
