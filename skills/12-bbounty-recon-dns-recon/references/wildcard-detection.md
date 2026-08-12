# Wildcard and Response-Pattern Interpretation

## Purpose and Preconditions

Use this guide when an authorized observation of an in-scope name returns an unexpected answer or when documented DNS configuration indicates wildcard behavior. Do not create random labels or use response filtering to expand discovery.

## Methodology

Compare only already-authorized observations with the zone's documented or observed authority context. Note record type, answer shape, alias chain, response status, TTL, and time. If the same response pattern appears for independently known names, classify it as a possible synthesized or shared routing pattern pending owner confirmation.

## Interpretation and Attribution

Wildcard expansion can produce answers for names without explicit records. It does not prove that a hostname is provisioned, that a web service exists, or that an individual result is a vulnerability. Rotating answers, CDN aliases, and catch-all front doors can legitimately differ over time. Keep explicit records, delegation, and application ownership separate.

## Limits, Evidence, and Handoff

Remain within the preapproved name set and rate limit. Preserve response metadata and the comparison rationale, including negative or inconclusive observations. Mark candidate names as unconfirmed where a wildcard pattern could account for them. Ask the owner to confirm intended routing rather than escalating a pattern alone as a defect.

## Authoritative Sources

- [RFC 4592: The Role of Wildcards in the Domain Name System](https://datatracker.ietf.org/doc/html/rfc4592)
- [RFC 1034, Section 4.3.3](https://datatracker.ietf.org/doc/html/rfc1034#section-4.3.3)
- [RFC 2308: DNS Negative Caching](https://datatracker.ietf.org/doc/html/rfc2308)
