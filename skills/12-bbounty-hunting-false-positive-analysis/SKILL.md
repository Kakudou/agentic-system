---
name: 12-bbounty-hunting-false-positive-analysis
description: Assess an authorized security finding against admitted evidence, known behavior, and uncertainty before handoff. No active testing, payload replay, exploitation, or retest automation.
metadata:
  version: 2.0
  opencode/slash: "true"
---

# Evidence-Led Finding Validation

## Purpose

Decide whether an authorized finding has enough traceable evidence to hand off as confirmed, needs review, is a duplicate or known behavior, or should be closed as unsupported. This skill evaluates supplied material only. It does not send traffic, replay payloads, access targets, exploit root causes, or assign a formulaic confidence score.

## Scope And Admission

Require the written authorization, in-scope asset boundary, program rules, finding claim, and original evidence. Admit only material with a source, collection context, time, asset, and integrity-preserving reference. Stop when scope, provenance, or handling restrictions are unclear. Use [evidence admission](references/evidence-admission.md) and the [scope/stop checklist](assets/scope-stop-checklist.md).

## Establish The Baseline

Compare the claimed observation with an equivalent documented baseline: expected behavior, relevant account state, configuration or release context, and contemporaneous control observations. A single anomalous record is not reproducibility. Use [reproducibility baseline](references/reproducibility-baseline.md) and the [validation worksheet](assets/validation-worksheet.md).

## Separate Known Behavior And Duplicates

Check authoritative program documentation, accepted prior findings, and stated limitations. Same vulnerability label or endpoint alone does not establish a duplicate. Compare affected security property, asset boundary, preconditions, evidence, and supported cause; retain distinctions that change remediation or impact. Use [known-behavior and duplicate distinction](references/known-behavior-duplicate-distinction.md).

## Assess The Claimed Cause

Treat a root-cause statement as an evidence-backed explanation, not a requirement to obtain source access or pursue exploitation. Link each causal claim to observed behavior, identify competing explanations, and mark unverified causes as hypotheses. Use [root-cause evidence assessment](references/root-cause-evidence-assessment.md).

## Control Uncertainty

Classify confidence qualitatively from evidence quality, corroboration, recency, and alternative explanations. Keep confidence in the observation separate from confidence in the causal or impact inference. Do not convert repeated copies, tool labels, or familiar patterns into independent confirmation. Use [uncertainty and confidence controls](references/uncertainty-confidence-controls.md) and the [evidence/confidence matrix](assets/evidence-confidence-matrix.md).

## Evidence And Handoff

Record the decision, admitted evidence, baseline comparison, known-issue result, causal assessment, uncertainties, and scope limits. Route unresolved or potentially material cases to the authorized triage owner without overstating validation. Use [evidence and handoff](references/evidence-handoff.md), [validation ethics](references/validation-ethics.md), and the [handoff template](assets/handoff-template.md).

## Prerequisites

- Written authorization, in-scope asset boundary, exclusions, and evidence-handling rules
- A finding claim with original evidence and collection context
- Access to applicable program policy, known-issue records, or an explicit statement that they are unavailable
- A named authorized triage or reporting recipient

## Evidence

- Scope-admission decision and authorization reference
- Evidence inventory with provenance, asset, collection context, time, and preservation reference
- Baseline comparison and interpretation
- Known-behavior and duplicate review result
- Root-cause assessment, alternative explanations, and uncertainty controls
- Decision and bounded handoff record

## Output

Return one validation packet with status `confirmed`, `needs-review`, `known-behavior`, `duplicate`, or `unsupported`. Include only claims supported by admitted evidence.

```yaml
finding_validation:
  finding_id: string
  status: confirmed | needs-review | known-behavior | duplicate | unsupported
  scope_reference: string
  claim: string
  admitted_evidence: []
  baseline_comparison: string
  known_behavior_or_duplicate_review: string
  root_cause_assessment: supported | hypothesis | not-assessed
  confidence: low | medium | high
  uncertainties: []
  handoff: string
```

## Supplemental Index

- [Evidence admission](references/evidence-admission.md)
- [Reproducibility baseline](references/reproducibility-baseline.md)
- [Known-behavior and duplicate distinction](references/known-behavior-duplicate-distinction.md)
- [Root-cause evidence assessment](references/root-cause-evidence-assessment.md)
- [Uncertainty and confidence controls](references/uncertainty-confidence-controls.md)
- [Evidence and handoff](references/evidence-handoff.md)
- [Validation ethics](references/validation-ethics.md)
- [Validation worksheet](assets/validation-worksheet.md)
- [Evidence/confidence matrix](assets/evidence-confidence-matrix.md)
- [Scope/stop checklist](assets/scope-stop-checklist.md)
- [Handoff template](assets/handoff-template.md)
