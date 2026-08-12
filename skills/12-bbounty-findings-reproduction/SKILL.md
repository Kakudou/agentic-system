---
name: 12-bbounty-findings-reproduction
description: Document the minimum safe context for an already observed in-scope finding without replaying tests, exposing sensitive data, or expanding impact.
metadata:
  version: 2.0
  opencode/slash: "true"
---

# Finding Reproduction Documentation

## Scope

Use only to document an already observed condition on an authorized, in-scope asset. It does not authorize testing, replay, access expansion, state changes, or disclosure decisions.

## Purpose

Create a review-ready, evidence-linked reproducibility packet for an already observed finding. It records what an authorized reviewer needs to assess without payloads, automation, account or session details, or severity determination.

## Prerequisites

- A current authorization and in-scope asset decision.
- Existing evidence with known source and custody.
- An approved private evidence location and authorized handoff channel.

## Workflow

1. **[Admit scope and evidence](references/scope-and-evidence-admission.md).** Record the authorization, asset boundary, provenance, and exclusions. Stop when any is unclear.
2. **[Write the minimum reproducibility narrative](references/minimum-reproducibility-narrative.md).** Describe only the non-secret context, observed condition, and reviewer validation question. Use the [static reproduction record](assets/reproduction-record-template.md).
3. **[Record preconditions and expected observations](references/preconditions-and-expected-observations.md).** Separate required context, directly observed result, and unverified expectation. Complete the [precondition/observation confidence matrix](assets/precondition-observation-confidence-matrix.md).
4. **[Control sensitive data and state changes](references/redaction-and-state-change-controls.md).** Redact protected material, reference restricted evidence, and stop before replay, access expansion, or any state-changing action. Complete the [redaction/stop checklist](assets/redaction-stop-checklist.md).
5. **[Label uncertainty and hand off](references/uncertainty-and-handoff.md).** Preserve alternative explanations, missing evidence, confidence, restrictions, and the next reviewer question in the [handoff template](assets/reproduction-handoff-template.md).

## Evidence

- Scope and authorization reference for the affected asset.
- Existing evidence references with source, capture time, custody, and integrity information when available.
- Completed reproduction record, confidence matrix, and redaction/stop checklist.
- Explicit uncertainty, validation boundary, and authorized-reviewer handoff record.

## Output

One bounded reproduction-documentation packet containing a minimum narrative, preconditions, expected and observed results, evidence references, confidence labels, redaction status, and handoff questions. It contains no commands, payloads, account or session details, active-test instructions, automation, or unsupported conclusion.

## Supplemental Index

- [Scope and evidence admission](references/scope-and-evidence-admission.md)
- [Minimum reproducibility narrative](references/minimum-reproducibility-narrative.md)
- [Preconditions and expected observations](references/preconditions-and-expected-observations.md)
- [Redaction and state-change controls](references/redaction-and-state-change-controls.md)
- [Uncertainty and handoff](references/uncertainty-and-handoff.md)
- [Static reproduction record](assets/reproduction-record-template.md)
- [Precondition/observation confidence matrix](assets/precondition-observation-confidence-matrix.md)
- [Redaction/stop checklist](assets/redaction-stop-checklist.md)
- [Reproduction handoff template](assets/reproduction-handoff-template.md)
