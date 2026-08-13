---
name: 12-bbounty-findings-finding-validation
description: Assess already-collected, authorized finding evidence for scope, reproducibility, claim boundaries, and safe handoff without testing targets or assigning severity.
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Evidence-Led Finding Validation

## Purpose

Turn an already captured security observation into a bounded, reviewable validation packet. This skill documents what the supplied evidence supports, what remains unknown, and whether a finding should be handed off, held, or closed. It does not access targets, replay requests or payloads, confirm exploitation, alter data, automate severity, or create a reportable vulnerability claim.

## Scope And Prerequisites

- A current written authorization, program rules, and known-behavior or duplicate guidance.
- A captured finding record with original evidence references, collection time, and collection context.
- A named authorized recipient and approved channel for sensitive evidence.

Read [evidence admission](references/evidence-admission.md) before accepting material. Use the [validation planning guide](references/validation-planning.md) and [validation worksheet](assets/validation-worksheet.md) to set the review boundary. Stop when scope, provenance, handling rules, or recipient authority is unclear.

## Workflow

1. Admit only evidence with a traceable source, time, context, and authorization basis. Record exclusions and gaps with [evidence admission](references/evidence-admission.md).
2. Establish what the original record can demonstrate without replaying it. Apply the [reproducibility baseline](references/reproducibility-baseline.md) and [claim/evidence confidence matrix](assets/claim-evidence-confidence-matrix.md).
3. Assess in-scope status, documented intended behavior, and possible duplicates using [scope, known behavior, and duplicates](references/scope-known-behavior-duplicates.md). Do not resolve ownership or duplicate status by assumption.
4. Bound the observation, mechanism, affected party, and plausible consequence with [claim and impact boundaries](references/claim-impact-boundaries.md). Separate evidence-backed facts from hypotheses; do not assign severity.
5. Apply [uncertainty and redaction controls](references/uncertainty-redaction-controls.md) and the [redaction and stop checklist](assets/redaction-stop-checklist.md). Preserve references rather than sensitive values.
6. Prepare a recipient-ready decision using the [handoff guide](references/handoff.md) and [handoff template](assets/handoff-template.md).

## Evidence

Every accepted claim needs an evidence ID, source locator, observation time, collection context, scope basis, and confidence rationale. Preserve contradictory, stale, indirect, or incomplete evidence as uncertainty. A validation decision describes the evidence state only; it is not proof of a live vulnerability, exploitability, business impact, severity, or bounty eligibility.

## Output

Deliver a static validation packet containing:

- Authorization, scope, admission, known-behavior, and duplicate assessment.
- A minimally stated observation and its direct evidence references.
- Reproducibility evidence status, limitations, conflicts, and confidence per claim.
- Explicit impact boundary, unknowns, false-positive alternatives, and stop conditions.
- Redacted handling notes and an authorized-recipient handoff decision: hand off, hold, or close.

## Reference Index

- [Evidence admission](references/evidence-admission.md)
- [Validation planning](references/validation-planning.md)
- [Reproducibility baseline](references/reproducibility-baseline.md)
- [Scope, known behavior, and duplicates](references/scope-known-behavior-duplicates.md)
- [Claim and impact boundaries](references/claim-impact-boundaries.md)
- [Uncertainty and redaction controls](references/uncertainty-redaction-controls.md)
- [Handoff](references/handoff.md)
