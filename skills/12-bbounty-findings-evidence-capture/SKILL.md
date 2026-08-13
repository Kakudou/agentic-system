---
name: 12-bbounty-findings-evidence-capture
description: Preserve minimal, authorized, reviewable evidence for an in-scope finding without collecting, replaying, or disclosing sensitive data.
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Evidence-Led Finding Capture

## Purpose

Create a minimal, attributable evidence package that lets an authorized reviewer assess a reported finding. This skill documents already-observed, in-scope artifacts. It does not automate collection, issue requests, operate browsers or terminals, capture screenshots or video, replay inputs, authenticate, or validate secrets.

## Scope First

1. Confirm written authorization, the finding ID, in-scope target and observation window, allowed artifact types, approved storage, retention rule, and handoff channel. Establish [evidence admission and chain of custody](references/evidence-provenance.md) before accepting an artifact.
2. Admit only artifacts already observed during authorized work. Classify each [request, response, browser, or terminal artifact](references/artifact-classification.md); distinguish the original from any redacted derivative.
3. Stop for scope ambiguity, unexpected state change, credentials, session material, personal data, private content, or an artifact whose collection would require a new action. Apply [redaction, privacy, and retention controls](references/evidence-redaction.md).

## Evidence Workflow

1. Define the smallest evidence set that supports the stated observation and record the exact reproduction boundary, exclusions, and limitations. Follow [minimal capture and reproducibility boundaries](references/minimal-capture.md); do not add artifacts merely because they may be useful later.
2. Assign stable artifact IDs and document provenance, time window, observer/session context, scope status, and immutable-content identifier where available. Use the [static evidence manifest](assets/evidence-manifest.md) and [artifact and redaction classification matrix](assets/artifact-redaction-classification-matrix.md).
3. Create only authorized redacted derivatives. Preserve the relationship to the restricted original without placing raw sensitive material in the handoff.
4. Check manifest completeness, integrity identifiers, custody entries, storage restrictions, and retention disposition. Apply the [integrity and stop checklist](assets/integrity-stop-checklist.md) and read [integrity and retention](references/integrity-retention.md).
5. Hand off facts, artifacts, limitations, and any approval needed for follow-up without claiming exploitability, impact, or reproduction not supported by the evidence. Follow [validation and handoff](references/validation-handoff.md) and use the [evidence handoff template](assets/evidence-handoff-template.md).

## Prerequisites

- Written authorization and current scope covering the observation.
- A finding identifier and a known approved evidence store, retention rule, and reporting channel.
- An existing authorized observation or artifact; this skill is not a collection mechanism.

## Evidence

- Authorization and scope reference, observation window, and session or observer context.
- Minimal original artifact metadata or permitted redacted derivative, with artifact classification and provenance.
- Manifest entries, integrity identifiers, custody and redaction decisions, storage restriction, and retention disposition.
- Direct support for each reported fact, competing explanations, coverage limits, and follow-up authorization needs.

## Output

```yaml
evidence_handoff:
  finding_id: string
  authorization_reference: string
  observation_window: RFC-3339 interval
  claim_status: observed | corroborated | inconclusive
  artifacts:
    - artifact_id: string
      class: request-record | response-record | browser-observation | terminal-observation | derivative
      provenance: string
      integrity_identifier: string | unavailable-with-reason
      handling: restricted-original | redacted-derivative | metadata-only
  custody_and_retention: string
  supported_facts: [string]
  limitations: [string]
  requested_follow_up_authorization: string | none
```

## Supplemental Index

- [Evidence provenance and custody](references/evidence-provenance.md)
- [Artifact classification](references/artifact-classification.md)
- [Minimal capture boundaries](references/minimal-capture.md)
- [Redaction, privacy, and retention](references/evidence-redaction.md)
- [Integrity and retention](references/integrity-retention.md)
- [Validation and handoff](references/validation-handoff.md)
- [Static assets](assets/)
