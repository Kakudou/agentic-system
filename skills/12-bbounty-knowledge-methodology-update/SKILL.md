---
name: 12-bbounty-knowledge-methodology-update
description: Prepare controlled, evidence-bound documentation changes to an authorized bug bounty methodology without conducting or deploying security work.
metadata:
  version: 2.0
  opencode/slash: "true"
---

# Controlled Methodology Update

## Purpose

Document a proposed change to an existing methodology so a designated owner can make an informed approval decision. This skill records evidence and limits; it does not execute procedures, test targets, deploy workflows, or alter a methodology source of truth.

## Prerequisites

- An identified methodology owner and the document/version proposed for change
- Written authorization to prepare a proposal
- Source-traceable observations, findings, program requirements, or policy changes
- A designated approval and handoff recipient

## Method

1. Establish the proposal boundary: identify the affected document, intended outcome, non-goals, owner, and decision requested. Use the [change proposal and evidence admission guide](references/change-evidence.md).
2. Record the observed lesson without generalizing beyond its support. State its population, conditions, exclusions, and confidence using the [applicability and limits guide](references/applicability-limits.md).
3. Review compatibility, safety, and stop conditions before recommending adoption. Use the [compatibility and safety review](references/compatibility-safety-review.md) and its [safety checklist](assets/safety-stop-checklist.md).
4. Prepare the approval, versioning, and rollback record. Do not represent a proposed version as approved. Follow the [approval, versioning, and rollback record](references/approval-version-rollback.md).
5. Package the decision-ready materials and unresolved questions for the receiving owner using the [validation and handoff guide](references/validation-handoff.md) and [approved-change handoff template](assets/approved-change-handoff-template.md).

## Evidence

- Provenance for each observation and a precise locator
- Evidence admission decision, relevance, limitations, and confidence
- Explicit applicability boundaries and excluded contexts
- Compatibility and safety review, including stop/escalation conditions
- Owner decision, approved version identifier if applicable, rollback reference, and handoff acknowledgement

## Output

Produce a documentation-only change packet using the [change proposal template](assets/change-proposal.md) and [evidence/applicability matrix](assets/evidence-applicability-matrix.md):

```yaml
methodology_change_packet:
  proposal_id: string
  target_document: string
  current_version: string
  requested_change: string
  authorization: string
  evidence: [source_traceable_records]
  applicability_boundaries: [strings]
  compatibility_safety_review: pending | accepted | blocked
  approval_status: draft | approved | rejected | deferred
  approved_version: string | null
  rollback_reference: string | null
  handoff_recipient: string
  unresolved_questions: [strings]
```

## Constraints

- Do not add attack recipes, target instructions, testing plans, automation, scripts, or deployment steps.
- Treat observations as documentation evidence, not proof of universal effectiveness.
- Stop and escalate when authorization, provenance, affected scope, safety assessment, owner decision, or rollback ownership is missing.
- Keep proposed, approved, and superseded material visibly distinct.

## Supplemental Index

- [Change evidence](references/change-evidence.md)
- [Applicability and limits](references/applicability-limits.md)
- [Compatibility and safety review](references/compatibility-safety-review.md)
- [Approval, versioning, and rollback](references/approval-version-rollback.md)
- [Validation and handoff](references/validation-handoff.md)
