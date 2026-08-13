---
name: 12-bbounty-reporting-report-submission
description: Prepare an authorized, redacted, platform-ready security report handoff without submitting, uploading evidence, or messaging a platform.
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Controlled Report-Submission Preparation

## Purpose

Prepare a reviewed report for an authorized human submitter. This skill never accesses a platform, uploads artifacts, submits a report, checks platform status, determines payout, retries an action, or sends follow-up messages.

## Authorization First

1. Confirm written reporting authorization, current program scope, approved submitter, report identity, and handling restrictions. Admit only a quality-approved report and traceable permitted evidence under [report and evidence admission](references/report-evidence-admission.md).
2. Use only program or platform rules supplied by the authorized user or reviewer. Map the approved report to those rules with [policy and format review](references/policy-format-review.md); unknown or conflicting requirements block readiness.
3. Minimize sensitive content and obtain explicit final authorization for the exact prepared package. Apply [redaction and final authorization](references/redaction-final-authorization.md).
4. Produce an immutable, submission-ready package for the named human submitter using the [submission-ready handoff](references/submission-ready-handoff.md). Stop at handoff.
5. If the user later supplies independent confirmation of a completed submission, record only the minimum permitted receipt metadata using the [post-submission evidence record](references/post-submission-evidence-record.md). Do not retrieve, verify, or respond to it.

## Documentation Workflow

1. Complete the [submission-readiness worksheet](assets/submission-readiness-worksheet.md) from admitted materials only.
2. Complete the [policy/format confidence matrix](assets/policy-format-confidence-matrix.md) against supplied rules. Mark each unknown, conflict, or unsupported field as a blocker.
3. Apply the [final-stop checklist](assets/final-stop-checklist.md). A missing authorization, unresolved handling decision, or open blocker means `not-ready`.
4. Deliver the package and unresolved decisions in the [sealed handoff/record template](assets/sealed-handoff-record-template.md). The human submitter alone decides whether to submit.

## Prerequisites

- A quality-approved, evidence-led report with a stable finding identifier.
- Current written authorization, scope reference, handling rules, and named approved submitter.
- Supplied platform or program reporting rules when platform-specific formatting is requested.

## Evidence

- Authorization, scope, report-quality approval, and evidence-admission references.
- Supplied policy/format rules with locator, date, and confidence assessment.
- Field mapping, blockers, redaction decisions, and exact-package identifier where permitted.
- Final authorization or its absence, handoff recipient, and any user-supplied post-submission receipt metadata.

## Output

```yaml
submission_preparation:
  finding_id: string
  readiness: ready-for-human-submission | not-ready | stopped
  authorization_reference: string
  approved_submitter: string
  report_admission: admitted | blocked
  evidence_admission: admitted | metadata-only | blocked
  policy_format_review: passed | blockers-present | unavailable
  redaction_status: complete | review-required | blocked
  final_authorization: granted | pending | denied
  handoff_package_id: string
  blockers: [string]
  post_submission_record: supplied | not-provided
```

## Supplemental Index

- [Report and evidence admission](references/report-evidence-admission.md)
- [Policy and format review](references/policy-format-review.md)
- [Redaction and final authorization](references/redaction-final-authorization.md)
- [Submission-ready handoff](references/submission-ready-handoff.md)
- [Post-submission evidence record](references/post-submission-evidence-record.md)
- [Static assets](assets/)
