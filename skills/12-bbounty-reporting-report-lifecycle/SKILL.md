---
name: 12-bbounty-reporting-report-lifecycle
description: Document the evidence-led lifecycle of an already approved vulnerability report without polling platforms, messaging, submission, or escalation.
metadata:
  version: 2.0
  opencode/slash: "true"
---

# Evidence-Led Report Lifecycle

## Purpose

Maintain a static, reviewable lifecycle record for an approved bug-bounty report. This skill documents observed status and evidence; it does not submit reports, access platforms, poll APIs, calculate deadlines, draft platform messages, or escalate.

## Authorization Boundary

Use only when a report has already been admitted and the user provides or explicitly authorizes the evidence to document. Do not infer a submission, platform state, response, reward, identity, or deadline from an absent record. Stop if the material is outside the authorized program scope or contains unredacted sensitive data.

Read [approved report and record admission](references/report-admission.md) before creating or updating a record.

## Prerequisites

- An approved report or report-admission reference
- User-supplied, read-only observation or response evidence
- A stable local record location approved by the user
- Redaction and uncertainty review under [privacy and uncertainty controls](references/privacy-uncertainty.md)

## Workflow

1. Create or update one record using [the lifecycle record](references/lifecycle-record.md) and `assets/lifecycle-record.yaml`.
2. Document each observed status and timestamp under [status interpretation](references/status-interpretation.md). Preserve platform wording and mark mappings as interpretation.
3. Keep submitted material and received material distinct under [evidence and provenance](references/evidence-provenance.md). Attach locators, capture times, and redaction notes rather than copying secrets.
4. Apply `assets/privacy-stop-checklist.md`; if evidence is incomplete, record `unknown` with a reason instead of filling a gap.
5. Package the record for a human decision using [review handoff](references/review-handoff.md) and `assets/review-handoff-template.md`.

## Evidence

- Approved-report or admission reference
- Dated status observations with source locators
- Separate request and response evidence references
- Redaction, uncertainty, and stop decisions
- Review handoff packet and unresolved questions

## Output

One static lifecycle record with immutable observation entries, a current interpreted status, confidence, provenance, privacy controls, and a review handoff. Use `assets/status-confidence-matrix.yaml` only to label confidence; it is not a platform-state authority.

## Supplemental Index

- [Lifecycle record](references/lifecycle-record.md)
- [Status interpretation](references/status-interpretation.md)
- [Evidence and provenance](references/evidence-provenance.md)
- [Privacy and uncertainty](references/privacy-uncertainty.md)
- [Review handoff](references/review-handoff.md)
- [Static assets](assets/README.md)
