# Evidence and Stop-Condition Checklist

## Purpose and Preconditions

Use before and during every authorized assessment. The tester must have written scope, an escalation contact, a request budget, and a redaction process.

## Checklist

| Check | Record or action |
|---|---|
| Authorization | Scope reference, target, test window, tester, permitted methods, and rate. |
| Baseline | Redacted valid request, content type, request size, status, body digest, latency, and trace ID. |
| Marker probe | One redacted marker-only variant and the same measurements. |
| Parser context | Endpoint/upload path, declared format, disclosed parser/library/version, and sync or async behavior. |
| Controls | Same authentication, data, size, route, and cache conditions; WAF/schema/queue checks. |
| Owner evidence | Sanitized logs, correlation IDs, configuration excerpts, or staging reproduction result. |
| Remediation | Control objective, affected boundary, owner, regression case, and retest result. |

## Safe Method and Parser Distinctions

Send one valid baseline and at most one harmless marker variant for a single confirmed parser boundary. XML APIs, SOAP middleware, SVG conversion, document uploads, and background workers can use different parsers even when exposed through the same host. Record the declared content type and actual processing path; never use a header or file extension as proof of parsing.

## Stop Immediately When

- Authorization is unclear, expired, or does not cover the format or route.
- A request causes unexpected latency, error volume, queue growth, user-visible impact, or data exposure.
- The next step would require a path, resource identifier, external interaction, callback, or expansion-abuse input.
- An asynchronous processor is involved and owner telemetry is unavailable.
- A gateway, WAF, or validation layer makes the parser result ambiguous after one controlled comparison.

## Interpretation and False Positives

Do not label a parser error, timeout, or accepted upload as XXE. Confirm the processing layer, eliminate transport and validation differences, and prefer owner-provided logs. An inconclusive result is a valid outcome.

## Authorization Limits and Remediation

This checklist prohibits retrieval, server-side request testing, out-of-band interaction, and denial-of-service-style expansion probes. For a confirmed configuration concern, use [secure parser configuration lookup](secure-parser-remediation-lookup.md) and validate with a harmless marker regression test.

## Source

PortSwigger: <https://portswigger.net/web-security/xxe>
