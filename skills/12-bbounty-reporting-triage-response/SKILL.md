---
name: 12-bbounty-reporting-triage-response
description: Prepare evidence-led, privacy-safe triage-response records from supplied bug-bounty material without sending messages, retesting, or disputing decisions.
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Triage Response Preparation

## Purpose

Turn supplied triage feedback and report evidence into a factual, review-ready preparation packet. This skill documents what the record supports; it does not access platforms, send messages, retest, negotiate, dispute decisions, or alter report state.

## Prerequisites

- A supplied triage record, report identifier, program authorization reference, and handling constraints.
- Traceable supplied evidence with source, time or version where available, and sensitivity status.
- An authorized reviewer or owner and approved evidence location.

## Documentation Workflow

1. Admit only material whose source, scope, and handling status are known. Preserve the triager's request as a quoted record, not an inferred instruction. Use [triage record interpretation and evidence admission](references/triage-record-interpretation.md) and the [triage record worksheet](assets/triage-record-worksheet.md).
2. Classify the request as clarification, status notice, duplicate or merge notice, severity or impact question, closure notice, or unclassified. Classification organizes review only; it does not establish platform status or an obligation to respond. See [request classification](references/request-classification.md).
3. Map each requested factual point to admitted evidence, a bounded unknown, or a required external decision. Record contradictions and confidence with the [request/evidence confidence matrix](assets/request-evidence-confidence-matrix.md) and [evidence mapping](references/evidence-mapping.md).
4. Prepare only factual clarification content: observed conditions, exact evidence references, limitations, and narrowly stated unknowns. Do not draft a message, promise work, recommend retesting, or argue a platform outcome. Apply [factual clarification preparation boundaries](references/factual-clarification-preparation.md).
5. Redact unnecessary secrets, personal data, credentials, session material, internal identifiers, and exploit-enabling detail. Stop for unclear authority, sensitive handling, unsupported claims, or a request requiring active validation. Use [privacy and uncertainty controls](references/privacy-uncertainty-controls.md) and the [privacy/stop checklist](assets/privacy-stop-checklist.md).
6. Package the record, mapping, redaction decisions, open questions, and requested reviewer decision. Follow [review handoff](references/review-handoff.md) and the [review handoff template](assets/review-handoff-template.md).

## Evidence

- Authorization, scope, handling restrictions, report identifier, and supplied triage record.
- Source-linked request classifications and evidence-to-claim mappings.
- Facts, contradictions, uncertainty labels, redactions, stop conditions, and unresolved questions.
- Reviewer, approved evidence location, and requested decision.

## Output

```yaml
triage_preparation_handoff:
  report_id: string
  authorization_reference: string
  scope_status: in_scope | unclear | stopped
  triage_record: {source_reference: string, received_at: RFC-3339 timestamp | unknown}
  requests:
    - classification: clarification | status_notice | duplicate_or_merge_notice | severity_or_impact_question | closure_notice | unclassified
      quoted_request_reference: string
      evidence_mapping: [string]
      confidence: direct | corroborated | inconclusive | unsupported
      factual_points: [string]
      limitations: [string]
  redactions: [string]
  stop_events: [string]
  reviewer_questions: [string]
  requested_decision: string
```

## Supplemental Index

- [Triage record interpretation](references/triage-record-interpretation.md)
- [Request classification](references/request-classification.md)
- [Evidence mapping](references/evidence-mapping.md)
- [Factual clarification preparation](references/factual-clarification-preparation.md)
- [Privacy and uncertainty controls](references/privacy-uncertainty-controls.md)
- [Review handoff](references/review-handoff.md)
- [Static assets](assets/)
