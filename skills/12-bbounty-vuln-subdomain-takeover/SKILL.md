---
name: 12-bbounty-vuln-subdomain-takeover
description: Authorization-first, passive assessment of observed dangling DNS delegations and service-lifecycle risk.
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Authorized Dangling-Delegation Assessment

## Purpose

Assess whether an already observed, in-scope DNS delegation may be orphaned from its intended service. This skill records evidence and prepares remediation handoff only. It does not enumerate names, fingerprint services, send DNS queries, claim or register resources, create accounts, test takeover, or automate assessment.

## Prerequisites

- Written authorization, exact in-scope names, permitted evidence sources, exclusions, and a stop contact.
- Provenance-labeled observations from a program-provided inventory, passive source, or authorized prior artifact.
- A secure evidence location and named remediation or triage recipient.

## Workflow

1. Admit the asset and each observation only after confirming scope and ownership evidence. Record uncertainty or stop using [scope and ownership evidence admission](references/scope-ownership-admission.md) and the [scope/stop checklist](assets/scope-stop-checklist.md).
2. Map the observed delegation and its service-lifecycle context without interacting with the target or provider. Use [delegation and service-lifecycle observation](references/delegation-lifecycle-observation.md) and the [delegation/ownership worksheet](assets/delegation-ownership-worksheet.md).
3. Treat missing resolution, provider-branded responses, or stale-looking mappings as inconclusive indicators, not proof of availability or impact. Apply [unclaimed-state interpretation](references/unclaimed-state-interpretation.md) and the [claimability-confidence matrix](assets/claimability-confidence-matrix.md).
4. Separate DNS control, service operation, account control, and third-party ownership. Apply [ownership attribution and false-positive controls](references/ownership-attribution.md); stop on an attribution or scope conflict.
5. Preserve evidence, state the bounded concern and limitations, and hand off remediation without attempting confirmation by control-plane interaction. Use [validation, prevention, and handoff](references/validation-prevention-handoff.md) and the [remediation/handoff template](assets/remediation-handoff-template.md).

## Evidence

- Authorization and scope decision, asset identity, collection time, and source provenance.
- Observed DNS relationship, authority context when supplied, and service-lifecycle indicators.
- Ownership assessment, alternative explanations, confidence, exclusions, and stop decisions.
- A remediation-oriented handoff with no claim of takeover or resource availability.

## Output

```yaml
dangling_delegation_handoff:
  scope_reference: string
  observed_at: RFC-3339 timestamp
  observations:
    - source_name: fqdn
      delegation: string
      ownership_assessment: confirmed | likely | unverified | third_party
      lifecycle_assessment: active | stale_indicator | unknown
      claimability_confidence: none | low | medium
      evidence_references: [string]
      limitations: [string]
  stopped_or_excluded: [string]
  remediation_owner: string
```

## Supplemental Index

- [Scope and ownership evidence admission](references/scope-ownership-admission.md)
- [Delegation and service-lifecycle observation](references/delegation-lifecycle-observation.md)
- [Unclaimed-state interpretation](references/unclaimed-state-interpretation.md)
- [Ownership attribution and false-positive controls](references/ownership-attribution.md)
- [Validation, prevention, and handoff](references/validation-prevention-handoff.md)
- [Delegation/ownership worksheet](assets/delegation-ownership-worksheet.md)
- [Claimability-confidence matrix](assets/claimability-confidence-matrix.md)
- [Scope/stop checklist](assets/scope-stop-checklist.md)
- [Remediation/handoff template](assets/remediation-handoff-template.md)
