---
name: 12-bbounty-recon-http-discovery
description: Perform low-impact, authorized HTTP identity and transport observation for explicitly in-scope web endpoints.
metadata:
  version: 2.0
  opencode/slash: "true"
---

# Authorized HTTP Reconnaissance

## Purpose

Establish a reproducible, low-impact HTTP baseline for explicitly authorized endpoints. This skill observes known HTTP(S) services; it does not discover hosts or ports, fuzz virtual hosts, enumerate TLS ciphers, test methods, authenticate, submit data, or probe application behavior.

## Prerequisites

- Written authorization and program rules covering each exact endpoint.
- An explicit target list, allowed schemes and ports, time window, rate limit, and stop contacts.
- A passive or already-authorized way to make ordinary baseline observations.

## Workflow

1. Confirm the endpoint, scheme, port, ownership boundary, and permitted observation rate. Stop for ambiguity, an out-of-scope redirect, authentication, unexpected state change, instability, or program-rule conflict. Use the [scope and stop checklist](assets/scope-stop-checklist.md).
2. Record one minimal identity and baseline observation per approved endpoint: request context, status class, selected response metadata, effective endpoint, and timestamp. Do not collect sensitive bodies or credentials. Use the [HTTP baseline guide](references/http-baseline.md) and [baseline worksheet](assets/endpoint-baseline-worksheet.md).
3. If the observed endpoint redirects or canonicalizes, document the chain without extending beyond the authorized endpoint set. Read [redirect and canonical-host observation](references/redirects.md).
4. If HTTPS is in scope, record only transport posture visible from the ordinary connection, such as certificate identity, validity period, negotiated protocol, and connection errors. Read [TLS and transport posture](references/tls.md).
5. When approved endpoints appear to serve different applications, record stable, non-sensitive differentiators and competing explanations. Do not infer unapproved hosts from host-header variations. Read [service differentiation](references/virtual-hosts.md) and the [interpretation matrix](assets/redirect-tls-service-matrix.md).
6. Corroborate material observations with a second low-impact observation when permitted, classify confidence, and hand off facts rather than vulnerability claims. Read [false-positive controls and handoff](references/validation-handoff.md) and use the [handoff template](assets/recon-handoff-template.md).

## Evidence

- Authorization reference, scope snapshot, and applicable rate limit.
- Timestamped endpoint observations, including scheme, port, status class, effective endpoint, and selected non-sensitive headers.
- Redirect hops and boundary decisions, when observed.
- TLS/transport observations and connection errors, when applicable.
- Differentiator comparisons, confidence, limitations, and stop decisions.

## Output

```yaml
http_recon_handoff:
  authorization_reference: string
  observed_at: RFC-3339 timestamp
  endpoints:
    - endpoint: string
      scope_status: in-scope | stopped | needs-review
      baseline: {status_class: string, effective_endpoint: string}
      redirects: [string]
      transport_posture: string
      service_differentiators: [string]
      confidence: observed | corroborated | inconclusive
      limitations: [string]
  handoff: string
```

## Supplemental Resources

- [HTTP baseline](references/http-baseline.md)
- [Redirects](references/redirects.md)
- [TLS and transport](references/tls.md)
- [Service differentiation](references/virtual-hosts.md)
- [Validation and handoff](references/validation-handoff.md)
- [Static assets](assets/)
