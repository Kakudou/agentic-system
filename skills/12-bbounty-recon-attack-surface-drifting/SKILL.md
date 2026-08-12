---
name: 12-bbounty-recon-attack-surface-drifting
description: Analyze authorized, supplied recon evidence for attributable attack-surface changes without conducting monitoring or new discovery.
metadata:
  version: 2.0
  opencode/slash: "true"
---

# Attack Surface Change Analysis

## Purpose

Compare two supplied, authorized recon evidence sets to produce a bounded, evidence-backed account of potential attack-surface change. This skill does not discover targets, monitor, schedule collection, make requests, recheck observations, or establish ownership.

## Prerequisites

- Written authorization, program rules, and a defined comparison scope.
- A baseline and comparison observation with source, collection time, collection boundary, and handling status.
- An approved evidence location and a receiving owner for uncertain or material changes.

## Analysis Workflow

1. Admit only evidence whose scope, provenance, collection context, and handling restrictions are known. Record omissions rather than filling them from inference. Use [baseline governance and evidence admission](references/baseline-governance.md) and the [baseline/change worksheet](assets/baseline-change-worksheet.md).
2. Normalize only comparable identity fields, preserving the observed form and any normalization decision. Do not merge hosts, services, paths, tenants, or owners merely because they look related. Apply [identity-safe observation comparison](references/observation-comparison.md).
3. Classify each supported difference as addition, removal, modification, or inconclusive. Separate observed facts from explanations and use the [drift classification guide](references/drift-classification.md) with the [classification-confidence matrix](assets/classification-confidence-matrix.md).
4. Assign confidence from evidence quality, comparability, and corroboration already present in the supplied material. Do not resolve uncertainty by active validation. Follow [confidence and validation limits](references/confidence-validation.md).
5. Stop analysis when ownership, scope, sensitive data, or attribution is uncertain. Record the boundary and question in the [scope/stop checklist](assets/scope-stop-checklist.md).
6. Deliver a facts-only comparison with evidence references, limitations, and owner questions. Use [evidence and handoff](references/evidence-handoff.md) and the [recon handoff template](assets/recon-handoff-template.md).

## Evidence

- Authorization reference, comparison scope, and applicable handling restrictions.
- Baseline and comparison provenance, timestamps, collection boundaries, and supplied observation records.
- Identity-normalization decisions, supported change classifications, confidence, and confounders.
- Scope decisions, redaction status, limitations, and handoff questions.

## Output

```yaml
attack_surface_change_handoff:
  authorization_reference: string
  comparison_scope: string
  baseline: {evidence_reference: string, observed_at: RFC-3339 timestamp}
  comparison: {evidence_reference: string, observed_at: RFC-3339 timestamp}
  changes:
    - observed_identity: string
      classification: addition | removal | modification | inconclusive
      facts: [string]
      confidence: high | medium | low | insufficient
      evidence_references: [string]
      confounders: [string]
      scope_status: in-scope | needs-review | stopped
  limitations: [string]
  handoff: string
```

## Supplemental Index

- [Baseline governance](references/baseline-governance.md)
- [Observation comparison](references/observation-comparison.md)
- [Drift classification](references/drift-classification.md)
- [Confidence and validation](references/confidence-validation.md)
- [Evidence and handoff](references/evidence-handoff.md)
- [Static assets](assets/)
