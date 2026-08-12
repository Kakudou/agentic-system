# Passive Name-Source Coverage

## Purpose and Preconditions

Use this guide when an engagement permits reviewing passive, publicly available name evidence for an explicitly in-scope zone. It replaces brute-force discovery: do not generate candidate labels, use wordlists, automate guesses, or send high-volume DNS queries.

## Methodology

Collect only names already exposed by authorized program materials or passive public sources. Record each source, retrieval time, exact presented name, and whether it is within the approved zone. Deduplicate names without treating repetition as validation. A low-impact, explicitly authorized observation of a specific already-known name may confirm its current DNS response.

## Interpretation and Attribution

Passive sources may be stale, incomplete, misissued, or refer to third-party infrastructure. A listed name is a lead, not proof that it resolves now, is controlled by the target, or is in bounty scope. Validate scope and response pattern independently, and flag source disagreement rather than resolving it by broader collection.

## False-Positive Controls

Separate a source's assertion from a current DNS observation. Certificate, archival, and indexing data can outlive a deployment; repeated appearances across sources do not prove present ownership or impact.

## Limits, Evidence, and Handoff

Keep source collection within the approved zone, time window, and passive-source rate cap. Stop when source terms, authorization, or collection volume are unclear. Preserve source URLs or immutable references, timestamps, and the distinction between source discovery and DNS observation. Send unverified or out-of-scope names to the owner as leads only.

## Authoritative Sources

- [RFC 9116: A File Format to Aid in Security Vulnerability Disclosure](https://datatracker.ietf.org/doc/html/rfc9116)
- [Certificate Transparency](https://certificate.transparency.dev/)
- [RFC 1034: Domain Names - Concepts and Facilities](https://datatracker.ietf.org/doc/html/rfc1034)
