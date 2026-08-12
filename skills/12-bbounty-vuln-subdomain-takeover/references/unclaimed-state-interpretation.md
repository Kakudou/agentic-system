# Unclaimed-State Interpretation

## Purpose And Preconditions

Use when admitted evidence suggests a target is unavailable, deleted, or unconfigured. Require an in-scope source name, an evidence timestamp, and a clear distinction between observation and inference. No service claim, registration, account creation, or takeover verification is permitted.

## Methodology

Classify only the observed state: reachable relationship, unavailable response, missing resolution, stale passive record, or unknown. Where explicitly authorized, a single low-impact observation may be compared with a program-provided inventory or public provider lifecycle documentation. Do not attempt to distinguish states by changing configuration, registering a name, or using provider control planes.

## Interpretation And Controls

An unavailable or provider-branded state is not evidence that a resource can be claimed, that a target account is absent, or that an attacker could control content. Propagation, caching, provider routing, account policy, reservation, private tenancy, and disabled-but-owned resources remain plausible explanations. `High` confidence applies only to confidence in the documented concern and ownership correlation, never claimability; use `none` when evidence cannot support a claimability assessment.

## Evidence And Handoff

Keep the exact observation, permitted comparison, timestamp, source limitations, and competing explanations. Hand off as a request for owner-side validation, not a confirmed vulnerability.

## Authoritative Sources

- [RFC 2308, DNS Negative Caching](https://datatracker.ietf.org/doc/html/rfc2308)
- [Google Cloud DNS overview](https://cloud.google.com/dns/docs/overview)
- [AWS Route 53 DNS concepts](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html)
