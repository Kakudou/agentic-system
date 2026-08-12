---
name: 12-bbounty-webvuln-web-caching-poisoning
description: Authorization-bounded assessment of cache-key completeness using only owner-approved harmless markers on controlled endpoints.
metadata:
  version: 2.0
  opencode/slash: "true"
---

# Web Cache Key Integrity Assessment

## Intent

Assess whether documented cache-key dimensions cover permitted, benign response variations. This skill does not place altered content in a cache, vary forwarding or security headers, test cross-user delivery, or perform bulk discovery.

## Prerequisites

- Written authorization names permitted hosts, endpoints, variation dimensions, request limits, and owner escalation contact.
- An owner-approved controlled fixture and inert marker are available.
- Cache-layer telemetry or configuration review is available for independent confirmation and cleanup.

## Workflow

1. Map cache layers, response eligibility, and configured key dimensions using [cache architecture and key mapping](references/cache-architecture-key-mapping.md) and the [cache layer/key coverage worksheet](assets/cache-layer-key-coverage-worksheet.md).
2. Select only an owner-approved benign variation that affects the controlled fixture. Validate it with [controlled harmless-marker validation](references/controlled-marker-validation.md) and record it in the [marker test record](assets/marker-test-record.md).
3. If the owner identifies canonicalization as relevant, compare the documented normalization behavior using [normalization and path behavior](references/normalization-path-behavior.md). Do not construct ambiguous requests or vary unapproved input classes.
4. Confirm a suspected key-coverage gap only through [confirmation and false-positive controls](references/confirmation-false-positive-controls.md). Confirmation must stay within the fixture, controlled account, and owner telemetry.
5. Apply [impact boundaries](references/impact-boundaries.md), remove the marker or request invalidation, and complete the [confirmation, cleanup, and stop checklist](assets/confirmation-cleanup-stop-checklist.md).
6. Report the configuration gap and owner-approved corrective action using [prevention and remediation](references/prevention-remediation.md) and the [remediation lookup](assets/remediation-lookup.md).

## Evidence

- Authorization boundary and approved variation dimension.
- Cache-layer/key map and controlled fixture change record.
- Redacted baseline/marker observations with owner telemetry correlation.
- False-positive exclusions, cleanup/invalidation confirmation, and remediation ownership.

## Output

```yaml
cache_key_integrity_assessment:
  target: string
  authorization: confirmed | not_confirmed
  controlled_fixture: string
  approved_variation: string
  cache_layers: [string]
  observation: key_coverage_confirmed | suspected_gap | confirmed_controlled_gap | stopped
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
