# Evidence, Validation, and Ethics

## Purpose and Preconditions

Use this guide before recording a DNS concern or handing it to an owner. The engagement must define authorization, scope, rate limits, data handling, and a stop contact.

## Methodology

Separate observation from interpretation and interpretation from impact. Preserve the minimum raw DNS context needed for repeatability, then compare it with authority data, scope records, and a second permitted source when practical. Record uncertainty explicitly. Validate only the DNS relationship; do not access applications, providers, accounts, or non-public data unless separately authorized.

## False-Positive Controls

Exclude or qualify normal DNS behavior: caching and propagation, negative caching, round-robin responses, CDN and shared-provider routing, wildcard expansion, split responsibility between registrant and operator, and stale passive sources. A record alone is not evidence of a vulnerable service, exposed data, or security impact.

## Limits, Evidence, and Handoff

Honor the strictest applicable rate or scope rule. Stop on unexpected sensitive data, signs of production instability, conflicting authorization, provider boundaries, or owner instruction. Store raw evidence in the approved location; reports should contain only necessary redacted excerpts and stable evidence references. Handoff must state the observation, scope basis, confidence, limitations, and requested owner action.

## Authoritative Sources

- [RFC 9116: A File Format to Aid in Security Vulnerability Disclosure](https://datatracker.ietf.org/doc/html/rfc9116)
- [CISA Vulnerability Disclosure Policy Platform](https://www.cisa.gov/vulnerability-disclosure-policy-platform)
- [NIST SP 800-115: Technical Guide to Information Security Testing and Assessment](https://csrc.nist.gov/pubs/sp/800/115/final)
