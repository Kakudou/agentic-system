# Record and Authority Observation

## Purpose and Preconditions

Use this guide to document records for an exact in-scope name or zone after authorization establishes permitted record types and observation rate. It is not a name-discovery procedure. Prefer passive, already-published evidence; use only individually authorized, low-volume DNS observations when passive evidence is insufficient.

## Methodology

Record the fully qualified name, observed record type, response status, answer, authority context, TTL, observation source, and timestamp. Start with delegation and authority context, then only observe records relevant to the stated question. Treat A and AAAA as addressing, CNAME as an alias relationship, MX as mail routing, NS as delegation, SOA as zone metadata, TXT as policy or verification data, and SRV as a published service-location assertion.

## Interpretation and Attribution

DNS data establishes a published mapping, not ownership of an address, service, or account. Attribute a record to the zone only after confirming the observed name lies in scope and the response is consistent with the authorized zone's authority context. CNAME and NS targets may be provider-operated. Shared CDN addresses, mail relays, load balancers, and rotation are normal and do not establish exposure.

## False-Positive Controls

Treat cached or propagating data, DNSSEC material, negative responses, and differing answer order as ordinary protocol behavior unless the owner confirms otherwise. Compare like record types at recorded times; do not infer split-horizon configuration from one external observation.

## Limits, Evidence, and Handoff

Do not expand into guessed names, broad record sweeps, endpoint interaction, or unrelated provider domains. Follow the engagement rate cap and stop on errors, unexpected scope boundaries, or owner instruction. Preserve raw response metadata and a concise interpretation in the worksheet. Hand off unresolved ownership or security impact to the authorized asset owner with the evidence reference and observed limitation.

## Authoritative Sources

- [RFC 1034: Domain Names - Concepts and Facilities](https://datatracker.ietf.org/doc/html/rfc1034)
- [RFC 1035: Domain Names - Implementation and Specification](https://datatracker.ietf.org/doc/html/rfc1035)
- [IANA Root Zone Database](https://www.iana.org/domains/root/db)
