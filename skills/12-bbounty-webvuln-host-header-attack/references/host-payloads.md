# Harmless Authority Markers

## Purpose And Preconditions

Use this reference to select the single inert authority marker for an authorized assessment. This is not a payload list. Require program approval for the marker, a safe idempotent endpoint, and a recorded canonical baseline.

## Bounded Marker Methodology

1. Use canonical public hostname as baseline authority.
2. Use one non-routable, tester-controlled marker hostname only if program-authorized; do not use a third-party, internal, IP-literal, malformed, or look-alike name.
3. Change only authority once per comparison. Do not add forwarded/override headers, duplicate headers, alternate request targets, or syntax variations.
4. Compare status, redirect location, content type, and non-sensitive headers. Repeat a positive observation once at most.

## Observations And Interpretation

Expected safe behavior is explicit rejection or canonical redirect. Marker acceptance is a signal to examine routing and URL construction, not evidence of access to another host. Reflection in a public absolute URL is reportable only within demonstrated non-sensitive boundaries.

## False-Positive Controls, Cleanup, And Evidence

Use a fresh request without cookies when permitted and account for edge challenge pages, regional routing, and generic errors. Stop on unexpected content, state change, or rate limiting. Record approved marker, changed field, sanitized metadata, and that no cleanup was needed.

## Remediation

Reject unapproved authority at the first trusted boundary and derive public URLs from configured canonical origin data.

## Source

- PortSwigger: <https://portswigger.net/web-security/host-header/exploiting>
