---
name: 12-bbounty-engagement-scope-normalisation
description: Produce an evidence-bound, non-expanding normalized engagement scope from authorized program material.
metadata:
  version: 2.0
  opencode/slash: "true"
---

# Scope Normalisation

## Purpose

Create a reviewable scope record from authorized engagement material. This skill documents what the source permits; it does not discover, expand, resolve, scan, probe, or validate targets.

## Prerequisites

- An authorized, versioned scope source or an authorized source owner.
- Engagement identity and effective date when available.
- A named recipient for questions and handoff.

## Authorization First

- Treat only explicitly admitted scope sources as authoritative. Read [scope-source admission](references/scope-source-admission.md) before recording targets.
- Preserve source wording, source location, retrieval date, and version or freshness marker. If authority, version, or applicability is unclear, stop rather than infer permission.
- Do not convert identifiers into additional targets, infer ownership, resolve names, calculate ranges, or perform active validation.

## Workflow

1. Record each admitted source and its provenance in the [scope-normalization worksheet](assets/scope-normalization-worksheet.md).
2. Classify and represent each source identifier consistently using [identifier and type normalization](references/identifier-type-normalization.md) and the [identifier/restriction matrix](assets/identifier-restriction-matrix.md). Keep the source value alongside any presentation-normalized value.
3. Copy inclusions, exclusions, restrictions, and conditions without widening or silently reconciling them. Follow [inclusion and exclusion preservation](references/inclusion-exclusion-normalization.md).
4. Apply [ambiguity and conflict controls](references/ambiguity-validation.md). An unresolved conflict, unclear boundary, or missing authorization is a stop condition; capture it in the [ambiguity/stop checklist](assets/ambiguity-stop-checklist.md).
5. Produce a versioned handoff using [evidence and handoff](references/versioned-evidence-handoff.md) and the [engagement handoff template](assets/engagement-handoff-template.md).

## Evidence

- Source provenance and immutable or stable locator.
- Verbatim scope, restriction, and exclusion statements.
- Identifier classification and documented normalization decisions.
- Ambiguities, conflicts, stop decisions, and source-owner questions.
- A dated, versioned handoff with limitations.

## Output

Deliver a static normalized-scope package containing:

- Scope-source register and evidence references.
- Included identifiers, exclusions, restrictions, and conditions, each traceable to source text.
- Identifier/restriction matrix and unresolved-items register.
- Explicit statement that no target expansion or active validation occurred.
- Versioned engagement handoff and named follow-up owner.

## Supplemental Index

- [Scope-source admission](references/scope-source-admission.md)
- [Identifier and type normalization](references/identifier-type-normalization.md)
- [Inclusion and exclusion preservation](references/inclusion-exclusion-normalization.md)
- [Ambiguity and conflict controls](references/ambiguity-validation.md)
- [Evidence and handoff](references/versioned-evidence-handoff.md)
