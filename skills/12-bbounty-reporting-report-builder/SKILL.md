---
name: 12-bbounty-reporting-report-builder
description: Draft evidence-led security finding reports from authorized, reviewable observations without submission automation, exploit guidance, or unsupported claims.
metadata:
  version: 2.0
  opencode/slash: "true"
---

# Evidence-Led Report Builder

## Purpose

Turn an authorized, bounded finding record into a factual draft that an authorized reviewer can assess. This skill documents observed evidence; it does not collect evidence, reproduce an issue, determine severity or payout, submit to a platform, or claim unverified impact.

## Scope First

1. Confirm written authorization, in-scope affected boundary, finding ID, evidence package, handling restrictions, and review recipient. Admit only traceable artifacts under [evidence admission](references/evidence-admission.md).
2. Draft a factual title, summary, and affected boundary from supported observations only. See [factual finding drafting](references/factual-drafting.md).
3. Record the minimum conditions under which the observation occurred, separately from any impact hypothesis. Apply [reproducibility and impact boundaries](references/reproducibility-impact-boundaries.md).
4. Stop and request review for missing provenance, scope ambiguity, secrets, personal data, private content, uncertain interpretation, or any requested follow-up that requires new testing. Use [redaction and uncertainty controls](references/redaction-uncertainty.md).

## Documentation Workflow

1. Start with the [static report outline](assets/report-outline-template.md) and enter only known facts, explicit limitations, and evidence references.
2. Map every material sentence to an artifact, observation, or stated limitation in the [claim/evidence matrix](assets/claim-evidence-matrix.md). Remove or mark claims that lack direct support.
3. Describe impact as a bounded consequence of the observed condition, not a rating, payout, or certainty claim. Frame feasible corrective outcomes using [impact and remediation framing](references/impact-remediation-framing.md).
4. Apply the [redaction and review checklist](assets/redaction-review-checklist.md). Do not include credentials, tokens, session material, personal data, customer content, or unnecessary operational detail.
5. Package the draft, evidence references, unanswered questions, and review decisions with the [review handoff template](assets/review-handoff-template.md) and follow [review handoff](references/review-handoff.md).

## Prerequisites

- Written authorization and a current scope reference.
- An existing finding ID and authorized evidence handoff with provenance and handling rules.
- A named authorized reviewer or handoff channel.

## Evidence

- Scope and authorization reference, affected boundary, and observation window.
- Stable evidence identifiers and enough context for a reviewer to locate permitted artifacts.
- Claim-to-evidence mapping, redaction decisions, limitations, and unresolved questions.
- Review handoff identifying what was observed, what remains unverified, and any follow-up authorization needed.

## Output

```yaml
report_draft_handoff:
  finding_id: string
  authorization_reference: string
  affected_boundary: string
  observation_window: RFC-3339 interval | unavailable-with-reason
  factual_summary: string
  claims:
    - claim_id: string
      status: observed | bounded-inference | unverified
      evidence_ids: [string]
      limitation: string | none
  redaction_status: complete | review-required
  remediation_framing: string | none
  reviewer_questions: [string]
  handoff_recipient: string
```

## Supplemental Index

- [Evidence admission](references/evidence-admission.md)
- [Factual finding drafting](references/factual-drafting.md)
- [Reproducibility and impact boundaries](references/reproducibility-impact-boundaries.md)
- [Redaction and uncertainty](references/redaction-uncertainty.md)
- [Impact and remediation framing](references/impact-remediation-framing.md)
- [Review handoff](references/review-handoff.md)
- [Static assets](assets/)
