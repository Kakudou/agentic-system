---
name: 12-bbounty-webvuln-prototype-pollution
description: Authorized, observation-only prototype-pollution assessment workflow for JavaScript property-handling paths.
metadata:
  version: 2.0
  opencode/slash: "true"
---

# Prototype-Pollution Assessment

## Purpose

Assess authorized JavaScript property-handling paths for prototype-pollution risk through bounded, inert observation. This skill does not authorize prototype mutation, payload delivery, gadget discovery, code execution, data access, persistence testing, or disruption.

## Prerequisites

- Written program authorization that covers the target, account, methods, and active testing level.
- In-scope routes or code, a normal baseline, and a test-account boundary where applicable.
- A stop and reporting path for unexpected state changes or sensitive observations.

## Workflow

1. Establish scope, baseline requests, state ownership, and stop conditions. Read [assessment basics](references/basics.md).
2. Map accepted structured input through parsing and merge boundaries with unique inert labels. Use the [source-to-merge-to-sink worksheet](assets/source-merge-sink-worksheet.md) and read [input and merge-path mapping](references/input-merge-paths.md).
3. Observe harmless ordinary property handling, including validation, canonicalization, and own-property behavior. Read [inert property-handling observation](references/techniques.md).
4. Classify the affected runtime before drawing conclusions: read [client-side interpretation](references/client-side.md) or [server-side interpretation](references/server-side.md).
5. Confirm only with the least invasive, explicitly authorized check. Read [safe confirmation](references/testing.md) and record the decision in the [confirmation matrix](assets/confirmation-matrix.md).
6. Preserve a reproducible evidence trail and stop at the first boundary breach. Read [validation and evidence](references/validation.md) and use the [evidence and stop checklist](assets/evidence-stop-checklist.md).
7. Bound impact to observed behavior and prepare prevention-oriented remediation. Read [impact boundaries](references/impact-boundaries.md) and [prevention](references/prevention.md); consult the [remediation lookup](assets/remediation-lookup.md).

## Evidence

- Authorization and scope reference, target, test account, timestamp, and tester identity.
- Baseline and observed behavior, with redacted request/response metadata and correlation identifiers.
- Input-to-merge-path mapping, runtime classification, reproduction controls, and stop decisions.
- Only observed impact, uncertainty, and remediation evidence. Do not retain sensitive data unnecessarily.

## Output

```yaml
prototype_pollution_assessment:
  target: string
  authorization_reference: string
  runtime: client | server | mixed | undetermined
  status: no_issue_observed | needs_program_review | confirmed_by_authorized_evidence
  mapped_paths: [string]
  observations: [string]
  false_positive_controls: [string]
  stop_conditions_triggered: [string]
  evidence_references: [string]
  observed_impact_boundary: string
  remediation: [string]
```

## Resource Index

Read only the resource required for the current step. This index supplements the contextual workflow links above.

- [Assessment basics](references/basics.md)
- [Input and merge-path mapping](references/input-merge-paths.md)
- [Inert property-handling observation](references/techniques.md)
- [Client-side interpretation](references/client-side.md)
- [Server-side interpretation](references/server-side.md)
- [Safe confirmation](references/testing.md)
- [Validation and evidence](references/validation.md)
- [Impact boundaries](references/impact-boundaries.md)
- [Prevention](references/prevention.md)
- [Source-to-merge-to-sink worksheet](assets/source-merge-sink-worksheet.md)
- [Confirmation matrix](assets/confirmation-matrix.md)
- [Evidence and stop checklist](assets/evidence-stop-checklist.md)
- [Remediation lookup](assets/remediation-lookup.md)
