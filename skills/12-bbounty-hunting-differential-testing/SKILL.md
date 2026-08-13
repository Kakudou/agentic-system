---
name: 12-bbounty-hunting-differential-testing
description: Assess authorized, supplied observations for security-relevant differences using a bounded, evidence-led comparison plan.
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Authorized Differential Assessment

## Purpose

Assess whether a documented difference between comparable, authorized observations warrants a bounded validation handoff. This skill is observation-led: it analyzes supplied evidence and does not perform active testing, exploitation, or state-changing activity.

## Scope And Evidence Intake

Require written authorization, an explicit target and comparison boundary, permitted observation methods, data-handling limits, and a stop/escalation contact. Admit only observations with provenance, collection context, timestamps, and redaction status. Stop when scope, account ownership, sensitive data handling, or the comparison boundary is unclear. Use the [comparable baseline definition](references/baseline-construction.md) and [baseline/variation worksheet](assets/baseline-variation-worksheet.md).

## Bounded Variation Plan

Define one claimed security property and one authorized distinction to assess. Keep every other known condition stable, record expected behavior and disconfirming evidence, and do not broaden the distinction after seeing a result. Use the [bounded variation plan](references/variation-design.md).

## Compare Observations

Compare only meaningful, provenance-preserved fields such as outcome class, disclosed authorization behavior, response structure, and documented timing context. Separate facts from impact hypotheses; an observed difference is not itself a vulnerability. Use [response-difference interpretation](references/response-comparison.md) and the [comparison/confounder matrix](assets/comparison-confounder-matrix.md).

## Control Confounders And Stop

Assess benign explanations including environment, identity or tenant, authorization state, deployment timing, personalization, intermediaries, and incomplete capture. Lower confidence when observations are not comparable or cannot be independently accounted for. Stop rather than pursue a difference that needs unapproved interaction, state change, sensitive data, or third-party impact. Use [false-positive and confounder controls](references/confounder-control.md) and the [stop checklist](assets/stop-checklist.md).

## Evidence And Handoff

Deliver a facts-only packet with admitted evidence, comparison conditions, observed difference, alternative explanations, uncertainty, scope decision, and the minimum safe next question. Do not claim validation, impact, or a vulnerability without supporting evidence. Use [evidence and handoff](references/validation-handoff.md) and the [handoff template](assets/differential-handoff-template.md).

## Prerequisites

- Written authorization, scope boundary, exclusions, and handling constraints.
- At least two supplied observations with source, time, context, and redaction status.
- A defined security property, permitted comparison boundary, and authorized review recipient or channel.

## Evidence

- Authorization reference, scope decision, and stop/escalation contact.
- Baseline and variation provenance, conditions, timestamps, and redaction status.
- Field-level comparison, expected behavior, disconfirming evidence, and confounders.
- Confidence, limitations, and a bounded validation or review handoff.

## Output

```yaml
differential_assessment_handoff:
  authorization_reference: string
  scope: string
  security_property: string
  baseline: {evidence_reference: string, observed_at: RFC-3339 timestamp}
  variation: {evidence_reference: string, observed_at: RFC-3339 timestamp}
  observed_differences: [string]
  expected_behavior: string
  alternative_explanations: [string]
  confidence: high | medium | low | insufficient
  scope_status: in-scope | needs-review | stopped
  limitations: [string]
  handoff: string
```

## Supplemental Index

- [Baseline construction](references/baseline-construction.md)
- [Variation design](references/variation-design.md)
- [Response comparison](references/response-comparison.md)
- [Confounder control](references/confounder-control.md)
- [Validation and handoff](references/validation-handoff.md)
- [Baseline/variation worksheet](assets/baseline-variation-worksheet.md)
- [Comparison/confounder matrix](assets/comparison-confounder-matrix.md)
- [Stop checklist](assets/stop-checklist.md)
- [Handoff template](assets/differential-handoff-template.md)
