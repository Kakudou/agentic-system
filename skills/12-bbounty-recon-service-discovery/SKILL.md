---
name: 12-bbounty-recon-service-discovery
description: Record authorized, low-impact observations that help identify in-scope exposed services without active enumeration or interaction.
metadata:
  version: 2.0
  opencode/slash: "true"
---

# Authorized Service Reconnaissance

## Purpose

Turn already available, authorized observations into a conservative service inventory. This skill is observation-oriented: do not scan, probe, authenticate, enumerate versions, collect banners, or test protocols.

## Prerequisites

- A current written authorization and program policy.
- Explicit in-scope assets and permitted service classes.
- A source for observations, such as program-provided inventory, passive DNS, public documentation, or an authorized prior artifact.
- A defined rate, time, and evidence-retention limit.

## Workflow

1. Confirm the target, ownership boundary, allowed service classes, and stop conditions before recording anything. Read [scope and permitted service classes](references/scope-and-service-classes.md).
2. Record only passive or already supplied service-identity signals. Do not infer a product or version from one weak signal. Read [service identity observations](references/service-identity.md).
3. Classify an observation as HTTP, non-HTTP, encrypted transport, or unknown without attempting a protocol interaction. Read [HTTP and non-HTTP boundaries](references/http-non-http-boundaries.md).
4. When authorized evidence already contains transport or certificate metadata, interpret it conservatively. Read [TLS and protocol observations](references/tls-protocol-observations.md).
5. Establish likely ownership using independent public or program-provided evidence; keep unverified third-party infrastructure separate. Read [attribution and validation](references/attribution-validation.md).
6. Apply false-positive controls, stop at ambiguity or scope conflict, and prepare a reviewable handoff. Read [evidence and handoff](references/evidence-handoff.md).

Use the static [scope and stop checklist](assets/scope-stop-checklist.md) before work, the [service and ownership worksheet](assets/service-ownership-observation-worksheet.md) while recording observations, and the [protocol/TLS interpretation matrix](assets/protocol-tls-interpretation-matrix.md) for classification. Use the [handoff template](assets/handoff-template.md) for the final package.

## Evidence

- Authorization or policy reference, scope snapshot, and collection time.
- Source provenance and exact observation, with redactions noted.
- Conservative classification, confidence, and competing explanations.
- Ownership evidence, validation status, exclusions, and stop decisions.

## Output

```yaml
service_recon_handoff:
  scope_reference: string
  collected_at: timestamp
  observations:
    - asset: string
      service_class: http | non_http | encrypted_transport | unknown
      identity_assessment: string
      ownership_assessment: confirmed | likely | unverified | third_party
      confidence: low | medium | high
      evidence_references: [string]
      limitations: [string]
  stopped_or_excluded: [string]
  next_owner: string
```

## Supplemental Index

- [Scope and permitted service classes](references/scope-and-service-classes.md)
- [Service identity observations](references/service-identity.md)
- [HTTP and non-HTTP boundaries](references/http-non-http-boundaries.md)
- [TLS and protocol observations](references/tls-protocol-observations.md)
- [Attribution and validation](references/attribution-validation.md)
- [Evidence and handoff](references/evidence-handoff.md)
