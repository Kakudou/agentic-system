# Impact Boundaries

## Purpose And Preconditions

Keep validation proportional and prevent a cache-behavior assessment from becoming data-access testing. Scope and owner escalation path must be known.

## Safe Controlled Methodology

Demonstrate only controlled-account data and a harmless fixture. Describe potential exposure conditionally from architecture and policy evidence; do not request, retrieve, enumerate, or validate any other user's response.

## Observations And Interpretation

Controlled storage of a controlled response supports a configuration finding. It does not prove access to private data, audience size, persistence, or severity.

## False-Positive Controls

Do not equate cacheability with data exposure. Confirm route authentication, shared-cache eligibility, key scope, TTL, and invalidation behavior with the owner.

## Cleanup And Stop Conditions

Immediately stop and notify the owner if non-controlled data appears, shared delivery is suspected, cleanup cannot be verified, or scope becomes unclear.

## Evidence And Remediation

Record the boundary decision and escalation contact. Prioritize non-shared caching for dynamic/authenticated content, conservative edge rules, and regression tests for ambiguous paths.

## Sources

- [PortSwigger: Web cache deception](https://portswigger.net/web-security/web-cache-deception)
