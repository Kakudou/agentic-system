# DNS Record Semantics

## Purpose and Preconditions

Use this reference to interpret an already-authorized DNS observation. It does not expand scope or prescribe collection.

## Guidance

Address records map names to addresses; aliases map a name to a canonical target; delegation records identify authority boundaries; mail and service records publish routing metadata; TXT records carry domain-controlled text. Each is a DNS assertion, not proof of current service ownership, reachability, or security impact. Preserve record type, response status, authority context, and time before drawing conclusions.

## Authoritative Sources

- [RFC 1034: Domain Names - Concepts and Facilities](https://datatracker.ietf.org/doc/html/rfc1034)
- [RFC 1035: Domain Names - Implementation and Specification](https://datatracker.ietf.org/doc/html/rfc1035)
- [IANA DNS Parameters](https://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml)
