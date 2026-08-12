# Basic XXE Behavior

## Purpose and Preconditions

Use this reference when an authorized endpoint is known to parse XML and DTD or entity handling is relevant. Obtain a valid baseline request, the accepted content type, and an agreed low request rate first.

## Safe Method

Compare a minimal valid XML document with a semantically identical document that contains one unique, harmless internal marker declaration. Do not use a system identifier, URL, path, parameter entity, recursive reference, or oversized value. Send each request once and retain the normalized response and trace ID.

## Parser and Content-Type Distinctions

`application/xml` and `text/xml` commonly indicate XML, but SOAP, SVG, feeds, multipart uploads, and API gateways can invoke different parsers. A body that looks like XML is not proof that the application parser received it. Use the [decision matrix](../assets/parser-input-decision-matrix.md) to identify the actual boundary.

## Observations and Interpretation

- Rejection of the declaration before business processing supports a safe parser policy, subject to log confirmation.
- Acceptance of valid XML without observable marker expansion is inconclusive.
- Marker expansion, a DTD-specific parser message, or owner-provided parser logs indicates DTD processing and requires configuration review, not escalation to external-resource testing.

## False Positives and Limits

Repeat only the baseline once. Compare CDN, WAF, schema, and application validation responses before attributing behavior to the XML parser. Stay within authorization: no external entities, file access, callbacks, or expansion-abuse probes.

## Evidence and Remediation

Capture redacted paired requests, content type, normalized differences, timing, trace IDs, and owner logs. Recommend disabling DTD processing and external resolution, then verify with a regression test that rejects declarations while accepting the valid baseline. See [prevention](prevention.md).

## Source

PortSwigger: <https://portswigger.net/web-security/xxe>
