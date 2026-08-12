# Payload and Context Testing

## Purpose and Preconditions

Use this reference before adapting a safe marker probe to a known XML schema, SOAP operation, SVG upload, feed, or XML-to-object conversion path. You need a captured valid request and authorization for that exact interface.

## Safe Method

Preserve the business fields, ordering, encoding, and declared media type from the baseline. Make one syntactic change: introduce a unique harmless marker in the parser feature under assessment. The marker must not name a resource, trigger a network request, expand recursively, or exceed ordinary field size.

## Parser and Content-Type Distinctions

Do not assume changing `Content-Type` causes XML parsing. Test only content types documented or observed for the endpoint. Distinguish direct XML bodies from multipart file uploads, compressed documents, SOAP envelopes, SVG conversion, and message-queue imports; each may use a separate parser and validation chain.

## Observations and Interpretation

Compare field-level results, parser errors, schema errors, status, body, and latency to the baseline. A changed error can indicate only malformed structure. A deterministic marker transformation plus owner-confirmed parser logs is stronger evidence than response text alone.

## False Positives and Limits

Use a baseline with the same size and business data. Exclude cache variation, WAF normalization, authentication changes, and validation order differences. Never bypass file validation, use polyglots, change upload extensions, or probe unsupported content types without separate written approval.

## Evidence and Remediation

Keep redacted paired captures, schema/version details, content type, and parser trace IDs. Recommend parser hardening specific to the confirmed component, then retest the same baseline and marker variant after remediation.

## Source

PortSwigger: <https://portswigger.net/web-security/xxe>
