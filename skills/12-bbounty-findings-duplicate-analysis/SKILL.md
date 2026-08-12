---
name: 12-bbounty-findings-duplicate-analysis
description: Compare already captured, authorized finding evidence for possible duplicate handling without querying databases, testing targets, or asserting a shared root cause.
metadata:
  version: 2.0
  opencode/slash: "true"
---

# Evidence-Led Duplicate Analysis

## Purpose

Prepare a bounded, reviewable comparison of supplied finding records. This skill documents whether the admitted evidence supports a duplicate candidate, separate findings, or an inconclusive result. It does not query finding databases, test or replay targets, calculate similarity, merge records, assign ownership, or assert a root cause.

## Scope And Prerequisites

- Written authorization, current program duplicate policy, and an approved recipient and channel.
- At least two captured finding records with traceable evidence references and collection context.
- Handling rules for sensitive evidence and any cross-reporter information.

Admit and minimize material under [evidence admission and privacy](references/evidence-admission-privacy.md). Stop if scope, provenance, access authority, or permitted disclosure is unclear.

## Workflow

1. Record each finding verbatim enough to preserve its bounded identity, then compare only the declared fields using [comparison dimensions](references/comparison-dimensions.md) and the [static comparison worksheet](assets/comparison-worksheet.md).
2. Separate common symptoms from evidence of a common underlying condition with [symptom and root-cause boundaries](references/symptom-root-cause-boundaries.md). Do not infer either from labels, endpoints, payloads, or similar prose alone.
3. Document supporting, conflicting, absent, and incomparable evidence per dimension in the [similarity and confidence matrix](assets/similarity-confidence-matrix.md). Apply [uncertainty and conflict controls](references/uncertainty-conflict-controls.md).
4. Use one bounded outcome: `possible-duplicate`, `keep-separate`, or `inconclusive`. A possible duplicate is a reviewer question, not a merge instruction.
5. Apply the [privacy and stop checklist](assets/privacy-stop-checklist.md), then package the comparison using [evidence and handoff](references/evidence-handoff.md) and the [handoff template](assets/handoff-template.md).

## Evidence

For every comparison, retain finding IDs, authorization and scope basis, source locators, observation windows, normalized-field rationale, direct comparison evidence, conflicts, exclusions, redaction status, and confidence rationale. Preserve uncertainty rather than converting it into a duplicate, root-cause, impact, or eligibility claim.

## Output

Deliver a static duplicate-analysis packet containing:

- The findings compared and their authorization, identity, and evidence boundaries.
- Per-dimension matches, differences, unknowns, and source references.
- A clear distinction between same symptom and evidence-supported shared condition.
- Confidence, conflicts, privacy restrictions, and stop conditions.
- One handoff outcome: possible duplicate for authorized review, keep separate, or inconclusive.

## Supplemental Index

- [Evidence admission and privacy](references/evidence-admission-privacy.md)
- [Comparison dimensions](references/comparison-dimensions.md)
- [Symptom and root-cause boundaries](references/symptom-root-cause-boundaries.md)
- [Uncertainty and conflict controls](references/uncertainty-conflict-controls.md)
- [Evidence and handoff](references/evidence-handoff.md)
- [Static assets](assets/)
