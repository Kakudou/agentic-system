---
name: 12-bbounty-recon-target-bootstrap
description: Establish an authorized bug-bounty target's identity, baseline web posture, boundaries, and evidence handoff before deeper reconnaissance.
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Authorized Target Bootstrap

## Purpose

Create a small, attributable baseline for one authorized bug-bounty target. This workflow confirms what may be observed before any deeper reconnaissance; it does not discover subdomains, scan ports, brute force paths, authenticate, submit forms, or test vulnerabilities.

## Prerequisites

- A current program policy or written authorization.
- One declared target URL, hostname, or domain and its source.
- A recorded time window, operator, and applicable rate limits.
- Agreement to stop when scope, ownership, or safety is uncertain.

## Workflow

1. **Confirm scope and target identity.** Record the exact program source, in-scope target expression, exclusions, authorization window, and target entered by the operator. Resolve ambiguity before contacting a target. Use the [scope and identity guide](references/scope-and-target-identity.md) and start the [scope and stop-condition checklist](assets/scope-stop-checklist.md).
2. **Collect a minimal DNS, HTTP, and TLS baseline.** Make only the least number of ordinary resolver and browser-equivalent requests needed to document the declared target. Record observations, not conclusions about ownership or vulnerability, in the [target identity and baseline worksheet](assets/target-baseline-worksheet.md). Follow the [baseline collection guide](references/dns-http-tls-baseline.md).
3. **Normalize redirects and hostnames.** Treat every redirect destination, canonical hostname, and certificate name as an observation requiring its own scope check. Do not follow an out-of-scope destination. Use the [redirect, TLS, and hostname matrix](assets/redirect-tls-hostname-matrix.md) and the [normalization guide](references/redirect-hostname-normalization.md).
4. **Bound service observations.** Record only ordinary, publicly exposed behavior of explicitly in-scope web endpoints. Do not enumerate services, alter request methods, send malformed input, use credentials, or infer that shared infrastructure belongs to the program. Apply the [service-observation boundaries](references/service-observation-boundaries.md).
5. **Preserve evidence and hand off.** Separate facts from hypotheses, retain source and timing, and flag ambiguity or stop conditions. Complete the [evidence and handoff template](assets/evidence-handoff-template.md) using the [evidence and handoff guide](references/evidence-handoff.md).

## Stop Conditions

Stop and seek clarification if authorization expires; the target does not match the published scope; a redirect or resolved hostname is out of scope; a login, payment, state change, or rate-limit response appears; ownership is unclear; or collection would exceed the program's stated limits.

## Evidence

- Authorization and scope source, retrieval time, and relevant quoted constraints.
- Exact target input and normalized in-scope endpoint(s).
- Minimal DNS, HTTP, TLS, and redirect observations with timestamps.
- Request count or rate evidence where available, plus any stop decision.
- A clear distinction between observed facts, interpretation, and unresolved questions.

## Output

Deliver one bounded bootstrap packet: completed worksheets, a list of confirmed in-scope endpoints, observed redirect and TLS relationships, excluded or uncertain targets, collection limits used, and a recommended next step or clarification request. Do not label observations as vulnerabilities without separate validation.

## Reference Index

- [Scope and target identity](references/scope-and-target-identity.md)
- [DNS, HTTP, and TLS baseline](references/dns-http-tls-baseline.md)
- [Redirect and hostname normalization](references/redirect-hostname-normalization.md)
- [Service-observation boundaries](references/service-observation-boundaries.md)
- [Evidence and handoff](references/evidence-handoff.md)
