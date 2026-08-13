---
name: 12-bbounty-recon-asset-inventory
description: Synthesize authorized, supplied reconnaissance evidence into a traceable asset inventory without active discovery or validation.
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Recon Asset Inventory

## Purpose

Produce a bounded, evidence-led inventory of assets represented in supplied reconnaissance material. This skill does not enumerate targets, perform network checks, merge data automatically, validate liveness, or provide exploitation guidance.

## Prerequisites

- Written authorization and a defined target scope, exclusions, and stop contact.
- Supplied source artifacts with provenance, collection time, and permitted handling.
- A stated recipient and handling classification for the final handoff.

## Workflow

1. Admit only evidence that satisfies the [scope and evidence admission guide](references/evidence-intake.md). Stop when scope, provenance, or handling authority is missing.
2. Normalize each represented asset conservatively using the [asset identity and ownership normalization guide](references/asset-normalization.md). Preserve the original value and never turn a tentative association into ownership.
3. Correlate source claims and resolve duplicates or contradictions through the [source correlation and conflict-resolution guide](references/source-correlation-conflicts.md). Retain uncertainty rather than forcing a merge.
4. Assign lifecycle or status confidence only from supplied time-bounded evidence using the [lifecycle and status-confidence guide](references/lifecycle-status-confidence.md). “Unknown” is valid and preferred to inference.
5. Apply the [privacy and scope controls](references/privacy-scope-controls.md), then complete the [inventory worksheet](assets/asset-inventory-worksheet.md), [source and confidence matrix](assets/source-confidence-matrix.md), and [scope and stop checklist](assets/scope-stop-checklist.md).
6. Deliver verified, disputed, and unverified records separately with the [evidence and handoff guide](references/evidence-handoff.md) and [recon handoff template](assets/recon-handoff-template.md).

## Evidence

- Preserve source identifier, locator, collection time, collector or provider, and quoted observation for every inventory claim.
- Record normalization decisions, correlations, conflicts, confidence, scope decision, and redactions beside the affected record.
- Do not treat absence from a source, stale observations, third-party labels, or a single technical indicator as proof of ownership, status, or scope.

## Output

A static inventory package containing the completed worksheet, source/confidence matrix, stop checklist, and handoff. Each asset record must state its normalized identity, original observation, evidence references, ownership confidence, lifecycle/status confidence, scope disposition, and unresolved conflicts.

## Supplemental Index

- [Evidence intake](references/evidence-intake.md)
- [Asset normalization](references/asset-normalization.md)
- [Source correlation and conflicts](references/source-correlation-conflicts.md)
- [Lifecycle and status confidence](references/lifecycle-status-confidence.md)
- [Privacy and scope controls](references/privacy-scope-controls.md)
- [Evidence and handoff](references/evidence-handoff.md)
- [Inventory worksheet](assets/asset-inventory-worksheet.md)
- [Source and confidence matrix](assets/source-confidence-matrix.md)
- [Scope and stop checklist](assets/scope-stop-checklist.md)
- [Recon handoff template](assets/recon-handoff-template.md)
