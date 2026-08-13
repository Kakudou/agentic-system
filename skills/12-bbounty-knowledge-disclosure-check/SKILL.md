---
name: 12-bbounty-knowledge-disclosure-check
description: Authorization-first documentation of supplied public disclosure status, overlap uncertainty, and safe knowledge handoff without retrieval, testing, or comparison automation.
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Disclosure-Status Documentation

## Purpose

Document the disclosure status of a supplied security finding for an authorized recipient. This skill does not search sources, query disclosure databases, compare reports automatically, test targets, reproduce findings, generate exploit material, or decide that a finding is unique, duplicate, valid, or eligible for a reward.

## Prerequisites

- Written authorization, admitted source and program scope, handling rules, and a named recipient.
- Supplied, attributable public disclosure-status material or an explicit record that status is unknown.
- Permission to retain only the minimum necessary redacted documentation in an approved destination.

## Workflow

1. Admit only sources and scope explicitly authorized for this record. Apply [approved source and scope admission](references/source-scope-admission.md); stop if authority, provenance, or currency is unclear.
2. Record supplied public-status facts, access limits, and the date context in the [public disclosure-status record guide](references/public-disclosure-status.md) and [static disclosure-status record](assets/static-disclosure-status-record.md). Absence of supplied evidence is `unknown`, not `undisclosed`.
3. Describe similarities and attribution only as bounded observations. Use [similarity and attribution uncertainty](references/similarity-attribution.md) and the [source/confidence matrix](assets/source-confidence-matrix.md); do not infer identity, priority, or duplicate status.
4. Apply [privacy and embargo controls](references/embargo-privacy.md) and the [embargo/stop checklist](assets/embargo-stop-checklist.md). Exclude secrets, private reports, personal data, and details that could defeat an embargo.
5. Review factual support, limitations, and handling restrictions through [validation and knowledge handoff](references/validation-handoff.md), then transfer the minimum necessary record with the [knowledge handoff template](assets/knowledge-handoff-template.md).

## Evidence

- Authorization, source/scope admission, provenance, public-access status, and source date for every record.
- Separated observed status facts, similarity observations, attribution limits, confidence rationale, and unknowns.
- Privacy or embargo decisions, exclusions, validation disposition, recipient, and approved destination.

## Output

```yaml
disclosure_status_handoff:
  record_id: string
  authorization_reference: string
  scope_reference: string
  subject_label: string
  status: publicly_disclosed | publicly_unconfirmed | not_publicly_documented | unknown | restricted | stopped
  sources:
    - source_reference: string
      source_date: date | unknown
      provenance: verified | partial | unknown | restricted
      public_access: public | supplied-private-summary | unavailable
      observed_status_fact: string
  similarity_observations: [string]
  attribution: supported | partial | unknown | withheld
  confidence: low | medium | high
  limitations: [string]
  handling: redacted | embargoed | restricted | cleared
  validation_status: reviewed | needs-clarification | stopped
```

## Supplemental Index

- [Approved source and scope admission](references/source-scope-admission.md)
- [Public disclosure-status record](references/public-disclosure-status.md)
- [Similarity and attribution uncertainty](references/similarity-attribution.md)
- [Privacy and embargo controls](references/embargo-privacy.md)
- [Validation and knowledge handoff](references/validation-handoff.md)
- [Static disclosure-status record](assets/static-disclosure-status-record.md)
- [Source/confidence matrix](assets/source-confidence-matrix.md)
- [Embargo/stop checklist](assets/embargo-stop-checklist.md)
- [Knowledge handoff template](assets/knowledge-handoff-template.md)
