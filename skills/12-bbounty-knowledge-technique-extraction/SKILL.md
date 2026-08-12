---
name: 12-bbounty-knowledge-technique-extraction
description: Authorization-first, evidence-led documentation of security assessment techniques without operational attack guidance.
metadata:
  version: 2.0
  opencode/slash: "true"
---

# Evidence-Led Technique Extraction

## Purpose

Turn authorized, provenance-labeled observations into bounded, reusable defensive knowledge. This skill documents what the evidence supports, where the resulting technique may apply, and what remains uncertain. It does not discover targets, test systems, extract payloads, produce exploit recipes, automate assessment, or validate against live targets.

## Prerequisites

- Written authorization, an approved evidence set, handling restrictions, and a named handoff recipient.
- A source reference for every observation and a secure location for the resulting record.
- Permission to retain the minimum necessary redacted evidence.

## Workflow

1. Admit only authorized, attributable observations using [approved evidence admission](references/evidence-admission.md). Record exclusions and stop if scope, provenance, or handling conditions are unclear.
2. Convert observations into a neutral technique statement with [observation-to-technique abstraction](references/observation-technique-abstraction.md). Preserve the distinction between fact, interpretation, and hypothesis in the [static technique record](assets/static-technique-record.md).
3. Define supported environments, required conditions, counterexamples, and assumptions with [applicability and assumption boundaries](references/applicability-limits.md) and the [evidence/applicability matrix](assets/evidence-applicability-matrix.md). Do not generalize one environment's observation into universal behavior.
4. Remove unnecessary identifiers, secrets, personal data, target-specific details, and operational material according to [privacy and redaction controls](references/privacy-redaction.md). Stop and escalate sensitive or restricted material using the [privacy/stop checklist](assets/privacy-stop-checklist.md).
5. Review claims for evidence support and uncertainty using [validation and knowledge handoff](references/validation-uncertainty-handoff.md), then transfer the bounded record through the [knowledge handoff template](assets/knowledge-handoff-template.md).

## Evidence

- Authorization, scope, source provenance, collection time, and handling decision for each admitted observation.
- Quoted or referenced source evidence sufficient to support each factual statement.
- Explicit separation of observed facts, derived technique concepts, assumptions, exclusions, counterexamples, and confidence.
- Redaction and stop decisions, validation outcome, and recipient acknowledgement or unresolved questions.

## Output

```yaml
technique_knowledge_handoff:
  record_id: string
  title: string
  authorization_reference: string
  source_evidence:
    - source_reference: string
      observation: string
      collection_context: string
      redaction_status: none | redacted | restricted
  technique_statement: string
  applicability:
    supported_conditions: [string]
    assumptions: [string]
    exclusions: [string]
    counterexamples_or_unknowns: [string]
  confidence: low | medium | high
  validation_status: documented | reviewed | needs-clarification | stopped
  limitations: [string]
  handoff_recipient: string
```

## Supplemental Index

- [Approved evidence admission](references/evidence-admission.md)
- [Observation-to-technique abstraction](references/observation-technique-abstraction.md)
- [Applicability and assumption boundaries](references/applicability-limits.md)
- [Privacy and redaction controls](references/privacy-redaction.md)
- [Validation and knowledge handoff](references/validation-uncertainty-handoff.md)
- [Static technique record](assets/static-technique-record.md)
- [Evidence/applicability matrix](assets/evidence-applicability-matrix.md)
- [Privacy/stop checklist](assets/privacy-stop-checklist.md)
- [Knowledge handoff template](assets/knowledge-handoff-template.md)
