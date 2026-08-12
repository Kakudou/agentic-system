---
name: 12-bbounty-knowledge-research
description: Document authorized security research as attributable, bounded claims without testing targets or collecting sensitive material.
metadata:
  version: 2.0
  opencode/slash: "true"
---

# Evidence-Led Security Research

## Purpose

Create a reviewable research record from authorized, lawfully obtained sources. This skill frames questions, evaluates sources, extracts bounded claims, and prepares a handoff. It does not test targets, collect data, or establish a vulnerability, severity, or impact.

## Authorization First

1. Confirm the research question, written authorization, applicable program scope, permitted source classes, recipient, storage location, and retention rule. Apply [research-question and source admission](references/research-question-source-admission.md).
2. Stop and escalate for unclear authorization, a source requiring credentials or target interaction, sensitive data, copyright or licensing restrictions, or any request outside the documented research boundary. Apply [sensitive-data, copyright, and scope controls](references/ethics-scope-controls.md).

## Research Workflow

1. Frame one answerable question and admit sources only when their origin, date, version, and permitted use can be recorded. Use the [static research record](assets/static-research-record.md).
2. Assess each source's authority, independence, completeness, and recency before relying on it. Record provenance with [source credibility and provenance](references/source-credibility-provenance.md).
3. Extract only source-supported, atomic claims. Preserve quotations or precise locators, separate facts from interpretation, and record contradictions in [claim extraction and uncertainty](references/claim-extraction-uncertainty.md).
4. Assign a bounded confidence state and a validation question; research corroborates context but does not validate target applicability. Complete the [source and claim confidence matrix](assets/source-claim-confidence-matrix.md) and follow [uncertainty and validation](references/uncertainty-validation.md).
5. Review minimization, attribution, handling restrictions, and open questions. Use the [ethics and stop checklist](assets/ethics-stop-checklist.md), then prepare an approved review package through [evidence and handoff](references/evidence-handoff.md) using the [knowledge handoff template](assets/knowledge-handoff-template.md).

## Prerequisites

- A written research purpose, authorization boundary, and current scope or disclosure policy.
- An approved recipient, storage location, and retention rule.
- Sources that may be reviewed without target interaction or restricted-data access.

## Evidence

- Authorization, scope, and research-question references.
- Source identity, locator, access date, version or publication date, provenance assessment, and handling restriction.
- Atomic claim records with supporting source locators, counter-evidence, uncertainty, and confidence state.
- Stop, escalation, and handoff decisions with outstanding validation questions.

## Output

```yaml
research_handoff:
  research_question: string
  authorization_reference: string
  scope_reference: string
  source_records:
    - source_id: string
      provenance: string
      locator: string
      accessed_at: RFC-3339 timestamp
      credibility: high | medium | low | unresolved
      handling: shareable | restricted | do-not-retain
  claims:
    - claim_id: string
      statement: string
      source_ids: [string]
      status: supported | corroborated | uncertain | contradicted
      limitations: [string]
      validation_question: string | none
  handoff_status: ready-for-review | blocked | escalated
```

## Supplemental Index

- [Research question and source admission](references/research-question-source-admission.md)
- [Source credibility and provenance](references/source-credibility-provenance.md)
- [Claim extraction and uncertainty](references/claim-extraction-uncertainty.md)
- [Uncertainty and validation](references/uncertainty-validation.md)
- [Sensitive-data, copyright, and scope controls](references/ethics-scope-controls.md)
- [Evidence and handoff](references/evidence-handoff.md)
- [Static assets](assets/)
