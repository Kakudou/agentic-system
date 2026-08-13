---
name: 12-bbounty-knowledge-public-writeup
description: Prepare a safe, evidence-bound public security writeup after explicit publication authorization. Produces a review-ready draft and handoff only; never publishes or provides exploitation instructions.
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Public Writeup Preparation

Prepare documentation that teaches a verified security lesson without exposing targets, people, secrets, or unresolved risk. This skill creates draft and review materials only. It does not publish, post, contact third parties, automate distribution, or test a target.

## Prerequisites

- Explicit, recorded authorization for the proposed public disclosure.
- Confirmed embargo status and the approved public scope.
- A verified finding record with attributable evidence.
- A designated reviewer or review process.

## Workflow

1. **Authorize first.** Read [publication authorization and embargo admission](references/authorization-embargo.md). Stop when authorization is absent, expired, ambiguous, or conflicts with an embargo.
2. **Define the learning goal.** Use the [public narrative structure](references/public-narrative.md) and [static public-writeup outline](assets/public-writeup-outline.md) to describe the security lesson, impact, remediation theme, and safe audience context.
3. **Bound every claim.** Apply [claim and evidence boundaries](references/claim-evidence-boundaries.md) with the [claim/evidence matrix](assets/claim-evidence-matrix.md). Include only claims supported by admissible evidence; mark uncertainty rather than filling gaps.
4. **Minimize disclosure.** Follow [redaction, attribution, and uncertainty](references/redaction-attribution.md) and complete the [embargo, redaction, and stop checklist](assets/embargo-redaction-stop-checklist.md). Remove identifiers, secrets, private correspondence, operational details, and details that could create actionable harm.
5. **Hand off for review.** Apply [review and publication-ready handoff](references/review-handoff.md), then deliver the draft and [publication-review handoff template](assets/publication-review-handoff-template.md) to the authorized reviewer. A handoff is not approval or publication.

## Evidence

- Recorded authorization and embargo decision.
- Source-linked claim/evidence matrix with uncertainty and exclusions.
- Completed redaction and stop checklist.
- Reviewer-ready draft and bounded handoff record.

## Output

```yaml
public_writeup_preparation:
  status: draft | blocked | ready_for_review
  authorization: confirmed | missing | unclear | expired
  embargo: clear | active | unclear
  narrative_outline: present | missing
  claims: supported | qualified | removed
  redaction_review: complete | incomplete | blocked
  handoff: prepared | not_prepared
  exclusions: [string]
  open_questions: [string]
```

## Resource Index

Read the contextual links in the workflow first. Supplemental resources: [authorization and embargo](references/authorization-embargo.md), [public narrative](references/public-narrative.md), [claim/evidence boundaries](references/claim-evidence-boundaries.md), [redaction and attribution](references/redaction-attribution.md), [review handoff](references/review-handoff.md), and the four files in [assets/](assets/).
