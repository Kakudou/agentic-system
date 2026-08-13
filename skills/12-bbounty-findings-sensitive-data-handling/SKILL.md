---
name: 12-bbounty-findings-sensitive-data-handling
description: Minimize, classify, contain, and hand off already-observed sensitive finding evidence without collecting, extracting, storing, or disclosing it.
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Privacy-Preserving Evidence Handling

## Purpose

Prepare the smallest authorized, reviewable evidence package for a finding that may contain sensitive data. This skill documents already-observed artifacts only. It does not collect data, issue requests, extract or validate secrets, automate redaction, choose storage locations, or disclose restricted content.

## Scope First

1. Confirm written authorization, finding ID, in-scope target, approved recipient, reporting channel, and applicable legal, program, and retention rules. Apply [data-minimization admission](references/data-minimization-admission.md) before accepting any artifact.
2. Classify the artifact and handling risk before it enters a report. If it contains or may contain credentials, session material, personal data, private content, or out-of-scope material, follow [classification and immediate containment](references/classification-and-containment.md).
3. Stop when scope, authorization, classification, or recipient access is unclear. Do not copy, quote, forward, test, or further inspect the content. Record only the minimum non-sensitive handling metadata permitted by the engagement.

## Evidence Workflow

1. Admit only the minimum already-observed artifact or metadata needed to support the reported fact. Record why it is necessary, what is excluded, and the permitted handling boundary in the [data-handling manifest](assets/data-handling-manifest.md).
2. Assign a handling class and determine whether the handoff may contain a restricted original, a reviewer-approved redacted derivative, or metadata only. Use the [classification and redaction matrix](assets/classification-redaction-matrix.md) and [classification guidance](references/classification-and-containment.md).
3. For any permitted derivative, ensure redaction is manual, reviewable, proportionate, and does not turn the derivative into a reproduction or disclosure recipe. Apply [redaction boundaries](references/redaction-boundaries.md).
4. Confirm the approved retention period, access restriction, recipient, and disposal owner before handoff. Use the [stop and retention checklist](assets/stop-retention-checklist.md) and [retention and access boundaries](references/retention-access-boundaries.md).
5. Preserve provenance and integrity identifiers where permitted. Hand off only supported facts, limitations, classifications, and required decisions using the [restricted handoff template](assets/restricted-handoff-template.md) and [integrity, validation, and handoff guidance](references/integrity-validation-handoff.md).

## Prerequisites

- Written authorization and current scope covering the prior observation.
- Finding identifier, approved recipient or reporting channel, and applicable retention/access policy.
- An already-observed authorized artifact or permitted metadata; this skill is not a collection mechanism.

## Evidence

- Authorization, scope, observation window, and approved recipient references.
- Minimum necessary artifact metadata, classification, admission decision, and exclusions.
- Redaction decision and reviewer identity where a derivative is permitted.
- Provenance, integrity identifier when available, retention/access boundary, and handoff record.
- Supported facts, uncertainty, and follow-up authorization requirements.

## Output

```yaml
sensitive_data_handoff:
  finding_id: string
  authorization_reference: string
  observation_window: RFC-3339 interval
  admission: admitted | metadata-only | stopped
  classification: public | internal | confidential | restricted
  handling: restricted-original | reviewed-redacted-derivative | metadata-only
  approved_recipient: string
  integrity_identifier: string | unavailable-with-reason
  retention_disposition: string
  supported_facts: [string]
  limitations: [string]
  follow_up_required: string | none
```

## Supplemental Index

- [Data-minimization admission](references/data-minimization-admission.md)
- [Classification and immediate containment](references/classification-and-containment.md)
- [Redaction boundaries](references/redaction-boundaries.md)
- [Retention and access boundaries](references/retention-access-boundaries.md)
- [Integrity, validation, and handoff](references/integrity-validation-handoff.md)
- [Static assets](assets/)
