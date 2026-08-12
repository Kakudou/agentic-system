---
name: 12-bbounty-recon-js-discovery
description: Build an evidence-bounded inventory of client JavaScript artifacts observed during authorized navigation.
metadata:
  version: 2.0
  opencode/slash: "true"
---

# Authorized Client-Artifact Observation

## Purpose

Record client JavaScript artifacts already delivered during authorized navigation and relate their observable metadata to known application behavior. This skill is observation-only. It does not download bundles, retrieve source maps, enumerate chunks or routes, extract endpoints or secrets, automate collection, authenticate, submit data, or probe application behavior.

## Scope First

1. Confirm written authorization, in-scope origins and pages, approved session context, rate limits, evidence handling rules, and stop contacts. Record [script provenance and scope](references/script-inventory.md) before collecting an artifact.
2. Observe only artifacts the authorized browser already receives while a tester performs ordinary, approved navigation. Do not follow artifact references, alter requests, or generalize from names, framework conventions, comments, or stale metadata.
3. Stop for scope ambiguity, an out-of-scope origin, unexpected authentication or state change, sensitive data, or any action beyond passive observation. Apply the [sensitive-data stop and redaction controls](references/sensitive-data-handling.md).

## Observation Workflow

1. Build a [client artifact inventory](references/script-inventory.md) from browser-visible, in-scope artifacts. Capture source page, first-party or third-party origin, observed timestamp, content type, and stable non-sensitive identifiers in the [client-artifact and evidence worksheet](assets/client-artifact-evidence-worksheet.md).
2. Interpret only metadata already visible in delivered artifacts or browser tooling, such as filename, cache validators, integrity attributes, declared source-map reference, or build marker. Read [bundle and source-map metadata interpretation](references/build-artifact-metadata.md); do not retrieve referenced resources.
3. Correlate an observed route or configuration label only with a visible user action or browser-network record from the same authorized session. Treat artifact strings and metadata as leads, not proof of a live route, capability, or configuration. Read [observed route and configuration correlation](references/client-configuration-correlation.md).
4. Classify provenance and confidence, document contradictory evidence and scope limits, and redact before sharing. Use the [provenance and confidence matrix](assets/provenance-confidence-matrix.md) and [sensitive-data checklist](assets/sensitive-data-stop-redaction-checklist.md).
5. Produce an evidence-bounded handoff that separates observed facts, interpretations, and follow-up requiring approval. Read [validation and handoff](references/validation-handoff.md) and use the [recon handoff template](assets/recon-handoff-template.md).

## Prerequisites

- Written authorization and current program scope covering each observed origin and page.
- An authorized browser session or approved browser-network capture.
- A restricted evidence store and handling process that prevents disclosure of credentials, tokens, personal data, or sensitive configuration values.

## Evidence

- Authorization reference, scope snapshot, browser/session context, and observation time window.
- Artifact source page, origin classification, visible metadata, and timestamp.
- Redacted browser-network or navigation evidence linking any route/configuration observation to a user action.
- Confidence rationale, competing explanations, limitations, and stop/redaction decisions.

## Output

```yaml
client_artifact_recon_handoff:
  authorization_reference: string
  observed_at: RFC-3339 timestamp
  artifacts:
    - source_page: string
      artifact_identifier: string
      origin: first-party | approved-third-party | stopped | needs-review
      visible_metadata: [string]
      provenance: browser-delivered | browser-network-record | target-documentation
      confidence: observed | corroborated | inconclusive
  correlations:
    - observation: string
      supporting_evidence: string
      status: observed | interpretation | needs-approval
  sensitive_data_status: none-observed | redacted | stopped
  limitations: [string]
  handoff: string
```

## Supplemental Index

- [Script provenance and client inventory](references/script-inventory.md)
- [Build-artifact metadata](references/build-artifact-metadata.md)
- [Route/configuration correlation](references/client-configuration-correlation.md)
- [Sensitive-data handling](references/sensitive-data-handling.md)
- [Validation and handoff](references/validation-handoff.md)
- [Static assets](assets/)
