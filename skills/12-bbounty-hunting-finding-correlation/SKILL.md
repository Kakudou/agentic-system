---
name: 12-bbounty-hunting-finding-correlation
description: Evidence-led synthesis of authorized security findings into bounded relationship, duplicate, pattern, and handoff assessments.
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Finding Correlation

## Purpose

Organize already-admitted findings into a traceable correlation assessment. This skill does not test targets, exploit issues, merge reports automatically, or assert a common root cause or attack chain.

## Scope And Prerequisites

- Use only findings and architecture context authorized for the engagement.
- Each candidate finding needs a stable identifier, evidence locator, affected surface, observation, and collection conditions.
- Treat relatedness as a hypothesis until the available evidence supports it.
- Stop or redact when correlation would expose unnecessary personal data, secrets, or out-of-scope systems.

## Synthesis Flow

1. Admit only complete, attributable observations using [evidence admission](references/evidence-admission.md).
2. Compare candidates with the [root-cause and pattern grouping guide](references/root-cause-pattern-grouping.md); record shared characteristics separately from causal conclusions.
3. Classify each relationship with the [duplicate and multi-aspect guide](references/duplicate-and-multi-aspect.md). Preserve distinct impact, surface, and evidence where they matter.
4. Apply [confidence and conflict controls](references/confidence-conflict-controls.md). Conflicting or insufficient evidence remains unresolved, not merged.
5. Produce a bounded, minimally sensitive [evidence handoff](references/evidence-handoff.md), using the included assets where useful.

## Evidence

- Original finding identifiers and immutable evidence locators
- Scope and authorization context
- Comparison criteria, relationship decisions, confidence, and unresolved conflicts
- Redaction and stop decisions

## Output

Return a correlation assessment containing:

- admitted findings and excluded items with reasons
- proposed groups or relationship pairs, each labeled as observed similarity, supported pattern, duplicate candidate, multi-aspect candidate, or unresolved
- evidence citations, confidence, conflicts, and limits for every classification
- a privacy-safe handoff for the authorized report owner

## Working Assets

- [Correlation worksheet](assets/correlation-worksheet.md)
- [Grouping and conflict matrix](assets/grouping-conflict-matrix.md)
- [Privacy and stop checklist](assets/privacy-stop-checklist.md)
- [Handoff template](assets/handoff-template.md)

## Supplemental Index

- [Reference index](references/README.md)
