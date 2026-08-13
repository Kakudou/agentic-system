---
name: 12-bbounty-knowledge-historical-finding-retrieval
description: Authorization-first, privacy-preserving documentation of historical security knowledge without retrieval automation or operational testing guidance.
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Historical Knowledge Documentation

## Purpose

Document bounded lessons from historical security material that an authorized recipient may use for defensive planning or review. This skill does not discover or query corpora, access systems, test targets, generate payloads, reproduce findings, automate retrieval, or establish that a historical finding applies to a current environment.

## Prerequisites

- Written authorization, admitted corpus and scope, applicable handling rules, and a named recipient.
- Provenance and access status for each supplied historical item.
- Permission to retain only the minimum necessary redacted evidence in an approved destination.

## Workflow

1. Admit only supplied material whose corpus, scope, and retention right are documented in [authorized corpus and scope admission](references/corpus-scope-admission.md). Stop for unclear authorization or source status.
2. Describe a bounded historical observation and evaluate its relevance through [relevance criteria and similarity controls](references/relevance-similarity.md). Record support, material differences, and confidence in the [relevance/confidence matrix](assets/relevance-confidence-matrix.md).
3. Preserve source attribution and access limits with [provenance and access boundaries](references/provenance-access.md). A historical record is not evidence about an unsupplied target.
4. Review inference, recency, contradictions, and uncertainty using [uncertainty and validation](references/uncertainty-validation.md). Documented similarity never confirms applicability, exploitability, impact, or novelty.
5. Apply [privacy and redaction controls](references/privacy-handoff.md) and the [privacy/stop checklist](assets/privacy-stop-checklist.md). Transfer only the minimum necessary record using the [knowledge handoff template](assets/knowledge-handoff-template.md).

## Evidence

- Authorization, corpus admission, scope, retention, provenance, and access decision for each admitted item.
- Source references supporting each historical fact, plus relevance criteria, material differences, and uncertainty.
- Redaction decisions, excluded material, validation disposition, recipient, and unresolved questions.

## Output

```yaml
historical_knowledge_handoff:
  record_id: string
  authorization_reference: string
  corpus_scope_reference: string
  historical_statement: string
  sources:
    - source_reference: string
      provenance_status: verified | partial | unknown | restricted
      access_status: authorized | limited | unavailable
  relevance: supported | conditional | unsupported | unknown
  material_differences: [string]
  confidence: low | medium | high
  privacy_status: none | redacted | restricted | stopped
  limitations: [string]
```

## Supplemental Index

- [Authorized corpus and scope admission](references/corpus-scope-admission.md)
- [Relevance criteria and similarity controls](references/relevance-similarity.md)
- [Provenance and access boundaries](references/provenance-access.md)
- [Uncertainty and validation](references/uncertainty-validation.md)
- [Privacy and handoff controls](references/privacy-handoff.md)
- [Static retrieval record](assets/static-retrieval-record.md)
- [Relevance/confidence matrix](assets/relevance-confidence-matrix.md)
- [Privacy/stop checklist](assets/privacy-stop-checklist.md)
- [Knowledge handoff template](assets/knowledge-handoff-template.md)
