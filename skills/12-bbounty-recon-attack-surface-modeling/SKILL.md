---
name: 12-bbounty-recon-attack-surface-modeling
description: Synthesize authorized, already-collected reconnaissance evidence into a scoped, confidence-labelled attack-surface model without performing discovery or making vulnerability claims.
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Authorized Reconnaissance Surface Modeling

## Purpose

Turn admitted reconnaissance evidence into a reviewable model of assets, routes, identities, and trust boundaries. This skill is synthesis only: it does not collect evidence, probe targets, infer unobserved technologies, or establish vulnerabilities.

## Scope And Prerequisites

- A current written authorization and in-scope asset definition.
- Evidence collected under that authorization, with source, time, and collection context.
- A named recipient and approved handling channel for the handoff.

Read [scope and evidence admission](references/scope-evidence-admission.md) before accepting material. Stop and request clarification when authorization, asset ownership, evidence provenance, or handling rules are unclear.

## Workflow

1. Normalize only admitted observations and retain the source record. Use the [evidence normalization guide](references/evidence-normalization.md) and [evidence/confidence matrix](assets/evidence-confidence-matrix.md).
2. Model observed assets and routes, then identities and dependencies. Use [surface modeling](references/surface-modeling.md) and the [surface-model worksheet](assets/surface-model-worksheet.md).
3. Represent observed control or data crossings with [trust-boundary mapping](references/trust-boundary-mapping.md). Mark unknown ownership, authentication context, and data classification as unknown.
4. Reconcile conflicts and assign confidence with [confidence and validation](references/confidence-validation.md). Do not merge contradictory claims into fact.
5. Frame only evidence-backed risk indicators using [risk-indicator framing](references/risk-indicator-framing.md). An indicator is not a vulnerability, exploit path, severity rating, or finding.
6. Apply the [scope and stop checklist](assets/scope-stop-checklist.md), then prepare the [recon handoff template](assets/recon-handoff-template.md) using the [evidence and handoff guide](references/evidence-handoff.md).

## Evidence

Every modeled claim needs a stable evidence identifier, source type, observation time, authorized scope basis, and confidence. Preserve conflicting observations, excluded material, and uncertainty rather than resolving them by assumption. Minimize sensitive values and include only what the recipient needs to review the model.

## Output

Deliver a static, evidence-linked surface model containing:

- Scope decision and exclusions.
- Observed assets, routes, identity contexts, dependencies, and trust boundaries.
- Per-claim evidence references, confidence, conflicts, and unknowns.
- Clearly labelled risk indicators with no vulnerability assertion.
- A bounded handoff, validation needs, and stop conditions.

## Reference Index

- [Scope and evidence admission](references/scope-evidence-admission.md)
- [Evidence normalization](references/evidence-normalization.md)
- [Surface modeling](references/surface-modeling.md)
- [Trust-boundary mapping](references/trust-boundary-mapping.md)
- [Confidence and validation](references/confidence-validation.md)
- [Risk-indicator framing](references/risk-indicator-framing.md)
- [Evidence and handoff](references/evidence-handoff.md)
