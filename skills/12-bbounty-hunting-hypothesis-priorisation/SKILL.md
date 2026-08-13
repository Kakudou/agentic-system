---
name: 12-bbounty-hunting-hypothesis-priorisation
description: Prioritize authorized security-test hypotheses using traceable program-scope and recon evidence.
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Hypothesis Prioritization

## Purpose

Produce a transparent review order for security-test hypotheses. Prioritization is an evidence-synthesis aid, not a finding, severity decision, likelihood estimate, or authorization to test.

## Prerequisites

- Written program scope, rules, and disclosure channel.
- Hypotheses tied to observed, authorized target evidence.
- A defined test window and safe stopping conditions.

## Workflow

1. Admit only hypotheses supported by in-scope assets and traceable evidence. Record exclusions and unknowns using [scope and evidence admission](references/scope-evidence-admission.md).
2. Compare admitted hypotheses with the static [review-order worksheet](assets/review-order-worksheet.md). Use observable indicators, not numerical scores or generic vulnerability assumptions.
3. State the review order and confidence using the [indicator and confidence matrix](assets/indicator-confidence-matrix.md). Give every ordering decision a short evidence rationale.
4. Challenge the order for missing evidence, anchoring, novelty bias, duplicated work, and conflicts of interest. Apply [uncertainty and bias controls](references/risk-adjustment.md) and [validation and ethics controls](references/validation-ethics.md).
5. Stop, defer, or narrow work when scope, consent, safety, or evidence is insufficient. Confirm this with the [scope and stop checklist](assets/scope-stop-checklist.md).
6. Package the resulting order for an authorized planning/review channel without prescribing execution. Use the [safe planning handoff](assets/planning-handoff-template.md).

## Evidence

- Program rules and explicit scope boundaries.
- Asset or feature observations with source and capture time.
- Hypothesis-to-observation links and stated assumptions.
- Review-order indicators, uncertainty notes, exclusions, and handoff record.

## Output

```yaml
prioritization_review:
  target: string
  scope_source: string
  hypotheses:
    - id: string
      hypothesis: string
      admitted_evidence: [strings]
      review_order: first|next|defer|exclude
      confidence: high|medium|low|unknown
      uncertainty_and_controls: [strings]
  exclusions: [strings]
  planning_handoff: string
```

## References

Supplemental guidance: [indicator review](references/scoring-matrix.md), [public-context review](references/competition-analysis.md), [uncertainty controls](references/risk-adjustment.md), [historical evidence](references/historical-data.md), [validation and ethics](references/validation-ethics.md).
