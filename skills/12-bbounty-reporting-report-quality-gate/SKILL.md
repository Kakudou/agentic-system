---
name: 12-bbounty-reporting-report-quality-gate
description: Review an evidence-led security report for factual completeness, traceable claims, safe disclosure, and a clear reviewer handoff without testing, scoring, or submission activity.
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Evidence-Led Report Review

## Purpose

Review a supplied security-report draft and its authorized evidence references before it is handed to an authorized decision-maker. This skill documents review findings only. It does not test, replay, reproduce, score, rate severity, estimate payout, submit, or make acceptance decisions.

## Scope First

1. Confirm written authorization, affected boundary, finding ID, draft version, evidence handling rules, and review recipient. Admit only traceable material under [evidence integrity and provenance](references/evidence-integrity.md).
2. Check that each material statement is complete enough to review and stays within its supported claim boundary. Use [review criteria](references/review-criteria.md) and [claim and uncertainty review](references/claim-uncertainty-review.md).
3. Keep recorded conditions, observed outcome, potential impact, and corrective framing distinct. See [remediation review](references/remediation-review.md). Do not request or conduct new testing.
4. Stop for missing provenance, ambiguous authorization or scope, secrets, personal data, private content, unsafe redaction, or a claim that cannot be bounded. Apply [redaction and stop controls](references/redaction-stop-controls.md).
5. Record a review outcome, outstanding issues, and the requested next decision with [review handoff](references/review-handoff.md).

## Review Workflow

1. Complete the [quality-review worksheet](assets/quality-review-worksheet.md) against the supplied draft and authorized evidence references.
2. Map every material claim in the [claim/evidence confidence matrix](assets/claim-evidence-confidence-matrix.md). Mark unsupported, ambiguous, or withheld claims rather than repairing them with assumptions.
3. Use the [redaction/stop checklist](assets/redaction-stop-checklist.md) before sharing any review package.
4. Produce a factual outcome: `ready-for-authorized-review`, `revision-required`, or `stopped-for-authorization-or-safety`. Use the [review handoff template](assets/review-handoff-template.md).

## Prerequisites

- Written authorization, current scope reference, and an existing finding ID.
- A supplied draft and authorized evidence references with provenance and handling rules.
- A named authorized reviewer or approved handoff channel.

## Evidence

- Authorization, scope, affected boundary, draft identifier, and observation window where known.
- Evidence IDs, provenance, access restrictions, and claim-to-evidence mapping.
- Review notes on claim status, limitations, redactions, and unresolved questions.
- Review outcome and the bounded decision requested from the recipient.

## Output

```yaml
report_review_handoff:
  finding_id: string
  draft_identifier: string
  authorization_reference: string
  review_outcome: ready-for-authorized-review | revision-required | stopped-for-authorization-or-safety
  reviewed_claims:
    - claim_id: string
      status: supported | bounded-inference | unsupported | withheld
      evidence_ids: [string]
      limitation: string | none
  redaction_status: complete | review-required | stop
  required_revisions: [string]
  unresolved_questions: [string]
  requested_decision: string
```

## Supplemental Index

- [Review criteria](references/review-criteria.md)
- [Evidence integrity and provenance](references/evidence-integrity.md)
- [Claim and uncertainty review](references/claim-uncertainty-review.md)
- [Redaction and stop controls](references/redaction-stop-controls.md)
- [Remediation review](references/remediation-review.md)
- [Review handoff](references/review-handoff.md)
- [Static review assets](assets/)
