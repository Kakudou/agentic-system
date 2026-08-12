# Wildcard DNS Semantics

## Purpose and Preconditions

Use this compact reference when reading the detailed [wildcard and response-pattern interpretation](wildcard-detection.md). It applies only to names already authorized for observation.

## Guidance

DNS wildcard expansion is a standards-defined response behavior for names lacking an explicit node. It can coexist with explicit records and does not establish that a name is a separately deployed service. Classify the observed response pattern, retain authority context, and ask the owner to confirm intended routing where the distinction matters.

## Authoritative Sources

- [RFC 4592: The Role of Wildcards in the Domain Name System](https://datatracker.ietf.org/doc/html/rfc4592)
- [RFC 1034, Section 4.3.3](https://datatracker.ietf.org/doc/html/rfc1034#section-4.3.3)
