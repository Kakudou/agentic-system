# XXE Assessment Cheatsheet

## Purpose and Preconditions

Use for a quick, authorized preflight before an XML assessment. Have a named target, valid baseline, request-rate limit, redaction plan, and stop contact. This is a decision aid, not a payload catalog.

## Safe Method

| Question | Safe action | Do not do |
|---|---|---|
| Is XML actually parsed? | Compare a valid baseline with one harmless marker variant. | Infer it from a URL or header alone. |
| Is DTD handling relevant? | Use an internal marker only; inspect owner logs when available. | Name a file, URL, host, or system identifier. |
| Is processing asynchronous? | Correlate trace IDs and ask the owner for sanitized telemetry. | Use callbacks or external collectors. |
| Is XInclude possible? | Use a structurally valid marker-only variant in the accepted format. | Reference a resource or test retrieval. |
| Is remediation needed? | Verify parser settings and a non-resolver regression test. | Rely on framework defaults. |

## Parser and Content-Type Notes

XML parsing can occur in direct XML APIs, SOAP, SVG conversion, feeds, multipart uploads, office/document pipelines, and background workers. `Content-Type` is evidence, not proof. Preserve the documented media type and test one boundary at a time.

## Interpret Results

| Observation | Interpretation | Next step |
|---|---|---|
| Declaration rejected before business processing | Likely safe at this boundary. | Capture evidence and confirm with logs if available. |
| Generic validation error | Inconclusive. | Compare against size-matched baseline and schema behavior. |
| Marker is processed or logs show DTD/XInclude handling | Configuration review required. | Use the remediation lookup; do not escalate testing. |
| Timeout or background job difference | Inconclusive, possibly asynchronous. | Stop and obtain owner telemetry. |

## False-Positive Controls and Limits

Control for WAF/CDN changes, authentication state, schema validation, MIME sniffing, cache variation, and asynchronous queues. Stop on unexpected latency, error volume, user impact, or any behavior beyond scope. Never attempt resource retrieval, external interaction, or expansion abuse.

## Evidence and Remediation

Record authorization, baseline/probe pair, content type, request size, normalized response, latency, trace ID, and owner logs. Disable DTD and external entity resolution, disable XInclude unless required, and regression-test that resolver activity is absent.

## Source

PortSwigger: <https://portswigger.net/web-security/xxe>
