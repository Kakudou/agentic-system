---
name: 12-bbounty-vuln-origin-exposure
description: Authorization-first, evidence-led assessment of whether observed edge routing may expose an origin boundary.
metadata:
  version: 2.0
  opencode/slash: "true"
---

# Authorized Origin-Exposure Assessment

## Purpose

Assess whether admitted evidence indicates that an in-scope application's edge and origin boundary may be misconfigured. This skill observes approved evidence and prepares an owner-facing handoff. It does not bypass a CDN or WAF, discover or contact origins, probe direct routes, query historical DNS, enumerate hosts or IPs, automate collection, or access an origin.

## Prerequisites

- Written authorization with exact in-scope assets, allowed evidence sources and low-impact methods, exclusions, handling rules, and a stop contact.
- Provenance-labeled observations from owner-provided material, passive sources, or explicitly approved normal edge interactions.
- A secure evidence location and named remediation or triage recipient.

## Workflow

1. Admit each asset and observation against scope and ownership before assessment. Use [scope and ownership admission](references/scope-ownership-admission.md) and the [scope/stop checklist](assets/scope-stop-checklist.md).
2. Describe the documented or normally observed edge-to-origin architecture without seeking an alternate route. Use [edge/origin architecture observation](references/edge-origin-architecture-observation.md) and the [edge/origin evidence worksheet](assets/edge-origin-evidence-worksheet.md).
3. Interpret routing and delivery indicators only as bounded signals of configuration context, not proof of origin reachability or exposure. Use [origin-routing interpretation](references/origin-routing-interpretation.md).
4. Separate asset ownership, edge-provider operation, origin operation, and shared-infrastructure attribution. Apply [ownership attribution and false-positive controls](references/ownership-attribution.md) and the [attribution-confidence matrix](assets/attribution-confidence-matrix.md). Stop on a third-party or ownership conflict.
5. Preserve observations and limitations, then request owner-side validation and remediation. Use [validation, prevention, and handoff](references/validation-prevention-handoff.md) and the [remediation/handoff template](assets/remediation-handoff-template.md).

## Evidence

- Authorization and scope decision, asset identity, collection time, source provenance, and permitted method.
- Observed edge-routing or architecture context, including the distinction between evidence and inference.
- Ownership and attribution assessment, alternatives, confidence, exclusions, and stop decisions.
- A remediation-oriented handoff that makes no claim that an origin is identified, reachable, or bypassable.

## Output

```yaml
origin_exposure_handoff:
  scope_reference: string
  observed_at: RFC-3339 timestamp
  assets:
    - asset: fqdn_or_application_identifier
      edge_context: documented | observed_normal_route | unknown
      routing_indicator: string
      attribution: confirmed | likely | unverified | third_party
      exposure_assessment: no_indicator | configuration_concern | owner_validation_required
      evidence_references: [string]
      limitations: [string]
  stopped_or_excluded: [string]
  remediation_owner: string
```

## Supplemental Index

- [Scope and ownership admission](references/scope-ownership-admission.md)
- [Edge/origin architecture observation](references/edge-origin-architecture-observation.md)
- [Origin-routing interpretation](references/origin-routing-interpretation.md)
- [Ownership attribution and false-positive controls](references/ownership-attribution.md)
- [Validation, prevention, and handoff](references/validation-prevention-handoff.md)
- [Edge/origin evidence worksheet](assets/edge-origin-evidence-worksheet.md)
- [Attribution-confidence matrix](assets/attribution-confidence-matrix.md)
- [Scope/stop checklist](assets/scope-stop-checklist.md)
- [Remediation/handoff template](assets/remediation-handoff-template.md)
