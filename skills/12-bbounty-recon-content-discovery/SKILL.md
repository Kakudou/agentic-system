---
name: 12-bbounty-recon-content-discovery
description: Observe authorized web content through normal navigation and disclosed static artifacts without enumeration or active probing.
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Authorized Content Discovery

## Purpose

Record content exposed through ordinary, authorized navigation and already-referenced static artifacts. This skill is observation-only: it does not generate or guess resource candidates, conduct active discovery, authenticate, submit data, or retrieve material beyond the authorized boundary.

## Prerequisites

- Written authorization and program rules for the exact target and observation methods.
- Explicit host and path boundary, time window, request/rate limit, sensitive-data handling rules, and stop contact.
- An approved normal browsing context or passive source.

## Workflow

1. Establish the target identity, permitted navigation boundary, allowed methods, and stop conditions. Do not treat a discovered link, redirect, or artifact host as authorization. Use [scope and observation boundaries](references/scope-boundaries.md) and the [scope/stop checklist](assets/scope-stop-checklist.md).
2. Follow only visible navigation and explicitly referenced resources within that boundary. Record the source relationship, access context, response class, and coarse content purpose. Use [application navigation and content classification](references/content-classification.md) and the [content-observation worksheet](assets/content-observation-worksheet.md).
3. For an already-authorized static artifact, record only necessary observable properties and non-sensitive metadata. Do not fetch unreferenced artifacts or infer hidden resources. Use [static artifact and metadata observations](references/artifact-metadata.md).
4. Separate direct observations from interpretation, preserve alternate explanations, and corroborate only with another permitted low-impact observation. Use [confidence and false-positive controls](references/confidence-handoff.md) and the [artifact-confidence matrix](assets/artifact-confidence-matrix.md).
5. Stop for sensitive content, an authorization ambiguity, an out-of-scope destination, authentication, a state-changing route, rate-limit signal, or unexpected behavior. Hand off bounded facts and limitations with the [evidence and handoff guide](references/confidence-handoff.md) and [recon handoff template](assets/recon-handoff-template.md).

## Evidence

- Authorization reference, scope snapshot, permitted method, rate/request count, and collection time.
- Source-to-content relationship, effective target, navigation context, and coarse content classification.
- Minimal redacted metadata or secure evidence reference, confidence rationale, alternative explanations, and stop decisions.
- Explicit limitations and recommended next step; no vulnerability conclusion without separately authorized validation.

## Output

```yaml
content_recon_handoff:
  authorization_reference: string
  observed_at: RFC-3339 timestamp
  scope_status: in-scope | stopped | needs-review
  observations:
    - locator: string
      discovered_from: string
      content_class: navigation | public-document | static-asset | metadata-signal | unknown
      access_context: anonymous-normal | approved-authenticated | passive-source
      evidence_reference: string
      confidence: observed | corroborated | inconclusive
      limitations: [string]
  handoff: string
```

## Supplemental Resources

- [Scope and boundaries](references/scope-boundaries.md)
- [Content classification](references/content-classification.md)
- [Artifact metadata](references/artifact-metadata.md)
- [Confidence and handoff](references/confidence-handoff.md)
- [Static tools](assets/)
