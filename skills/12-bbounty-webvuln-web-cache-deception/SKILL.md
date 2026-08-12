---
name: 12-bbounty-webvuln-web-cache-deception
description: Authorization-bounded assessment of whether caches can store a controlled account's dynamic response under a cacheable-looking path.
metadata:
  version: 2.0
  opencode/slash: "true"
---

# Web Cache Deception Assessment

## Intent

Assess cache and origin path-handling consistency without accessing another user's data, creating deceptive links, or attempting persistent cache population. This skill is for explicitly authorized targets and controlled accounts only.

## Prerequisites

- Written scope authorizes cache-behavior testing and identifies permitted hosts, paths, rate limits, and escalation contact.
- A disposable controlled account and a non-sensitive, reversible marker location are available.
- The operator can stop testing and request cache invalidation from the target owner.

## Workflow

1. Confirm scope, choose a low-traffic controlled endpoint, and record the cache layers and expected key behavior in [cache architecture and key mapping](references/cache-architecture-key-mapping.md). Do not test authenticated production data unless the owner explicitly provides a controlled test account and endpoint.
2. Establish only ordinary baseline observations and record them in the [cache layer/key coverage worksheet](assets/cache-layer-key-coverage-worksheet.md). Identify cache state from documented response metadata or owner telemetry; do not infer it from timing alone.
3. If scope permits, use one owner-approved harmless marker on the controlled endpoint following [controlled marker validation](references/controlled-marker-validation.md) and record it in the [marker test record](assets/marker-test-record.md). Never use a marker that changes executable content, redirects, shared configuration, or user-visible business data.
4. Compare documented and observed path interpretation using [normalization and path behavior](references/normalization-path-behavior.md). Keep comparisons bounded to one variation class, use only non-sensitive controlled responses, and stop on unexpected cache storage.
5. Independently confirm any suspected mismatch with [confirmation and false-positive controls](references/confirmation-false-positive-controls.md). Do not test cross-user delivery, audience reachability, or impact propagation.
6. Apply the [impact boundaries](references/impact-boundaries.md), perform the required cleanup or owner-requested invalidation, and use the [confirmation, cleanup, and stop checklist](assets/confirmation-cleanup-stop-checklist.md).
7. Report observations, confidence, evidence, and fixes using [prevention and remediation](references/prevention-remediation.md) and the [remediation lookup](assets/remediation-lookup.md).

## Evidence

- Authorization and target/endpoint boundary.
- Timestamped baseline and controlled-marker observations, with redacted response metadata.
- Cache-layer/key hypothesis, path interpretation comparison, and independent confirmation result.
- Cleanup or invalidation confirmation, stop decision, and remediation owner.

## Output

```yaml
cache_deception_assessment:
  target: string
  authorization: confirmed | not_confirmed
  controlled_endpoint: string
  cache_layers: [string]
  observation: no_mismatch | suspected_mismatch | confirmed_controlled_storage | stopped
  confidence: low | medium | high
  impact_boundary: controlled_only | owner_review_required
  cleanup: complete | owner_requested | not_applicable
  evidence: [string]
  remediation: [string]
```

## Supplemental Index

- [Cache architecture and key mapping](references/cache-architecture-key-mapping.md)
- [Controlled marker validation](references/controlled-marker-validation.md)
- [Normalization and path behavior](references/normalization-path-behavior.md)
- [Confirmation and false-positive controls](references/confirmation-false-positive-controls.md)
- [Impact boundaries](references/impact-boundaries.md)
- [Prevention and remediation](references/prevention-remediation.md)
- [Assessment matrix](references/assessment-matrix.md)
- [Static assessment tools](assets/)
