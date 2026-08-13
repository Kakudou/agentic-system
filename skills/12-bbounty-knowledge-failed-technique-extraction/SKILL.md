---
name: 12-bbounty-knowledge-failed-technique-extraction
description: Document authorized failed security-assessment approaches as bounded, evidence-led learning records without retesting or attack guidance.
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Evidence-Led Failed-Approach Learning

## Purpose

Turn already-observed, authorized assessment outcomes into a bounded learning record. This skill documents evidence and uncertainty; it does not discover targets, replay or retest an approach, generate payloads, automate assessment, assign blame, or establish causal certainty.

## Prerequisites

- Written authorization, scope, evidence-handling restrictions, and a named recipient for the record.
- Existing observation records with a source reference, time context, and enough context to state what was expected and observed.
- Permission to retain only the minimum necessary, redacted information.

## Workflow

1. Admit only in-scope, attributable records that were already observed. Apply [approved evidence admission](references/evidence-admission.md); exclude or stop when authorization, provenance, or handling is unclear.
2. Record the intended condition and the observed result without treating either as proof of cause. Use [expected versus observed analysis](references/expected-observed-analysis.md) and the [expected/observed confidence matrix](assets/expected-observed-confidence-matrix.md).
3. Document plausible constraints, confounders, missing context, and alternative explanations. Follow [constraint and confounder analysis](references/confounders-limits.md); do not convert an ambiguous outcome into a failure diagnosis.
4. Apply [uncertainty and privacy controls](references/uncertainty-privacy.md) and the [privacy/stop checklist](assets/privacy-stop-checklist.md). Remove unnecessary target details, credentials, personal data, and operational material; stop and escalate restricted information.
5. Assemble the [static learning record](assets/static-learning-record.md), review it with [validation and knowledge handoff](references/validation-handoff.md), and transfer it using the [knowledge handoff template](assets/knowledge-handoff-template.md). The handoff may request authorized follow-up but must not prescribe it.

## Evidence

- Authorization and scope reference, source provenance, observation time or interval, and handling decision.
- Separate expected and observed statements with direct source references.
- Constraints, confounders, alternatives, unknowns, confidence rationale, exclusions, and privacy decisions.
- Validation disposition, handoff recipient, and questions requiring separately authorized review.

## Output

```yaml
failed_approach_learning_record:
  record_id: string
  authorization_reference: string
  approach_label: string
  evidence:
    - source_reference: string
      observed_at: RFC-3339 timestamp | interval | unknown-with-reason
      handling: metadata-only | redacted | restricted
  expected: string
  observed: string
  confidence: high | medium | low | unknown
  constraints_and_confounders: [string]
  alternative_explanations: [string]
  bounded_learning: string
  limitations_and_exclusions: [string]
  validation_status: reviewed | needs-clarification | stopped
```

## Supplemental Index

- [Approved evidence admission](references/evidence-admission.md)
- [Expected versus observed analysis](references/expected-observed-analysis.md)
- [Constraint and confounder analysis](references/confounders-limits.md)
- [Uncertainty and privacy controls](references/uncertainty-privacy.md)
- [Validation and knowledge handoff](references/validation-handoff.md)
- [Static learning record](assets/static-learning-record.md)
- [Expected/observed confidence matrix](assets/expected-observed-confidence-matrix.md)
- [Privacy/stop checklist](assets/privacy-stop-checklist.md)
- [Knowledge handoff template](assets/knowledge-handoff-template.md)
