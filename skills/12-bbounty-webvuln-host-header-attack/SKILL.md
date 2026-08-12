---
name: 12-bbounty-webvuln-host-header-attack
description: Authorized, marker-only assessment of Host-header trust boundaries, routing, and canonical-host validation.
metadata:
  version: 1.0
  opencode/slash: "true"
---

# Host-Header Trust-Boundary Assessment

## Purpose

Assess whether an in-scope application and delivery chain consistently authorize and canonicalize the hostname used for routing and generated links. This workflow is limited to harmless, tester-controlled markers and non-state-changing requests. It excludes password-reset poisoning, cache poisoning, SSRF, request smuggling, duplicate-header ambiguity, host discovery, and exploitation.

## Prerequisites And Authorization

- Written authorization naming the target, endpoint class, allowed methods, and permitted hostname variation.
- A reproducible ordinary request with the canonical public host and an inert, tester-controlled hostname marker approved by the program.
- Known stop/disclosure contact, rate limits, and a plan to avoid authenticated, transactional, or user-specific endpoints.

## Workflow

1. **Inventory declared authority and routing.** Map canonical host, approved aliases, TLS/SNI endpoint, proxy/CDN layer, and origin route. Record only documented or already in-scope hosts. Use [host-routing inventory](references/routing.md) and the [authority/header coverage worksheet](assets/authority-header-coverage-worksheet.md).
2. **Establish canonical-host handling.** Manually compare the baseline with one approved inert hostname marker, changing one authority value at a time. Observe rejection, canonical redirect, or preserved routing without following user-specific flows. See [Host-header basics](references/host-header-basics.md) and [harmless authority markers](references/host-payloads.md).
3. **Interpret intermediary normalization.** Determine whether edge, proxy, and application make a consistent allowlist and canonicalization decision. Do not infer origin behavior from a CDN error alone. See [proxy/CDN normalization](references/host-techniques.md) and the [normalization matrix](assets/proxy-cdn-normalization-matrix.md).
4. **Confirm only the boundary.** Repeat a positive marker-only observation once on the same safe endpoint. Demonstrate only unapproved authority acceptance, inconsistent routing, or marker use in a non-sensitive absolute URL. Apply [safe confirmation and impact boundaries](references/impact-boundaries.md).
5. **Preserve evidence and close.** Capture sanitized metadata, interpretation, and cleanup/stop status. Recommend a single trusted authority source and deployed-path regression coverage. See [validation and prevention](references/validation-prevention.md), the [evidence/stop checklist](assets/evidence-stop-checklist.md), and [remediation lookup](assets/remediation-lookup.md).

## Evidence And Output

Record authorization, target and canonical host, approved marker ownership, endpoint, baseline/variant identifiers, TLS/proxy context, status and relevant sanitized headers, non-sensitive link or routing observation, false-positive controls, stop/cleanup status, and remediation. Do not retain user data, tokens, request bodies, or sensitive response content.

```yaml
host_header_assessment:
  scope_authorization: reference
  target_and_canonical_host: string
  authority_marker: ownership-and-approved-value
  routing_observation: statement
  confirmation: not-demonstrated | marker-only | stopped-on-exposure
  evidence: sanitized-request-response-metadata
  cleanup: not-needed | complete | program-owned
  remediation: references
```

## Reference Index

- [Host-header basics](references/host-header-basics.md)
- [Host-routing inventory](references/routing.md)
- [Proxy/CDN normalization](references/host-techniques.md)
- [Harmless authority markers](references/host-payloads.md)
- [Safe confirmation and impact boundaries](references/impact-boundaries.md)
- [Validation and prevention](references/validation-prevention.md)
- [Authority/header coverage worksheet](assets/authority-header-coverage-worksheet.md)
- [Proxy/CDN normalization matrix](assets/proxy-cdn-normalization-matrix.md)
- [Evidence and stop checklist](assets/evidence-stop-checklist.md)
- [Remediation lookup](assets/remediation-lookup.md)
