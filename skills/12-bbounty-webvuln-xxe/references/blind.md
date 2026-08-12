# Blind and Out-of-Band Behavior

## Purpose and Preconditions

Use this reference when an authorized marker probe suggests DTD parsing but produces no in-band result. Confirm that the assessment rules explicitly prohibit or permit external interaction before proceeding.

## Safe Method

This skill does not perform callback, DNS, HTTP, or other out-of-band testing. Document the in-band observation and ask the system owner to review parser telemetry or reproduce the behavior in an isolated test environment using an owner-controlled harmless marker.

## Parser and Content-Type Distinctions

Background queues, document converters, SOAP processors, and upload scanners can parse XML after the HTTP response. A 202 response or absent response difference may reflect asynchronous processing rather than blind behavior. Record the declared content type and each downstream processor disclosed by the owner.

## Observations and Interpretation

- Owner logs showing a blocked resolution attempt support a defense-in-depth finding or configuration verification.
- A timeout, generic error, or missing response evidence alone is inconclusive.
- A confirmed attempt to resolve an external identifier in isolated owner testing indicates unsafe parser configuration; do not reproduce it against production.

## False Positives and Limits

Control for queue delays, antivirus scanning, gateway retries, and unrelated network errors. Never use external collectors, internal addresses, file paths, or exfiltration. Stop if asynchronous work causes error volume or latency outside the agreed threshold.

## Evidence and Remediation

Record timestamps, correlation IDs, owner-supplied sanitized logs, and the explicit prohibition or authorization decision. Disable external entity resolution and outbound access from parsing workloads; add a test that proves no resolver invocation occurs.

## Source

PortSwigger: <https://portswigger.net/web-security/xxe/blind>
