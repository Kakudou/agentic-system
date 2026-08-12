# Delegation And Service-Lifecycle Observation

## Purpose And Preconditions

Use for an admitted, in-scope observation that contains a DNS alias, delegation, or provider-managed target. Require written authorization and source, time, and asset context. This guide is passive unless the authorization explicitly permits a low-impact observation; it never permits account, control-plane, or service interaction.

## Methodology

Record the source name, observed record relationship, target, response or authority context supplied by the evidence source, TTL if present, collection time, and source reliability. Compare the relationship with program inventory, public provider documentation, or asset-owner documentation. Note lifecycle signals such as a documented migration, retired integration, or removed service reference without inferring the service's current account state.

## Interpretation And Controls

DNS delegation establishes a naming relationship, not control of the target service. Resolution failure, a provider response, caching, propagation, split-horizon DNS, a maintenance state, or a deliberately disabled service can all resemble an orphaned mapping. Do not expand scope to adjacent names or provider infrastructure.

## Evidence And Handoff

Preserve the original observation, collection context, relationship map, supporting documentation, and alternatives. Hand off an `unverified lifecycle concern` to the asset owner for internal service and DNS review.

## Authoritative Sources

- [RFC 1034, Domain Names: Concepts and Facilities](https://datatracker.ietf.org/doc/html/rfc1034)
- [RFC 1035, Domain Names: Implementation and Specification](https://datatracker.ietf.org/doc/html/rfc1035)
- [AWS Route 53 Developer Guide: DNS concepts](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html)
