---
name: 12-bbounty-vuln-third-party-integratior-security
description: Explicitly authorized, observation-first assessment of third-party integration boundaries.
metadata:
  version: 2.0
  opencode/slash: "true"
---

# Third-Party Integration Boundary Assessment

## Purpose

Assess declared third-party integrations for observable ownership, data, identity, and trust-boundary risks. Work from authorized documentation, normal-use views, configuration supplied by the owner, and explicitly approved low-impact observations. Do not manipulate callbacks, use credentials or tokens, probe endpoints, bypass controls, automate requests, or change integration state.

## Prerequisites

- Written authorization naming the target, vendors, permitted observation methods, testing window, exclusions, and test roles.
- A named system owner, vendor-contact route, and stop/escalation path.
- Approved non-sensitive fixtures when a controlled observation is permitted.
- Confirmation that no access, state change, sensitive-data handling, or availability-impacting action is authorized unless stated in writing.

## Workflow

1. **Admit scope and ownership.** Record the approved application, vendor, integration owner, contract boundary, and exclusions. Stop when ownership or authority is unclear. See [scope, vendor, and ownership admission](references/scope-vendor-ownership.md).
2. **Inventory observed flows.** List only integrations evidenced by supplied configuration, documentation, normal-use UI, or approved logs. Separate inbound and outbound paths. See the [observed integration inventory](references/observed-integration-inventory.md) and [boundary worksheet](assets/integration-boundary-worksheet.md).
3. **Classify data, identity, and trust boundaries.** Map the initiating identity, receiving identity, data class, authorization decision, and vendor handoff for each observed flow. Mark assumptions as unverified. See [data, identity, and trust-boundary classification](references/data-identity-trust-boundaries.md) and the [confidence matrix](assets/vendor-data-flow-confidence-matrix.md).
4. **Interpret configuration harmlessly.** Review owner-supplied, redacted settings or documented behavior for least privilege, destination allowlists, validation, retention, and auditability. Do not reveal, use, or test secrets. See [harmless configuration interpretation](references/harmless-configuration-interpretation.md).
5. **Apply privacy and stop controls.** Minimize collection, redact evidence, and stop before exposure of sensitive data, credentials, or unapproved traffic. See [privacy, stop controls, and handoff](references/privacy-stop-handoff.md) and the [sensitive-data and stop checklist](assets/sensitive-data-stop-checklist.md).
6. **Validate, hand off, and prevent.** Corroborate observations with a second approved source or owner confirmation; state unperformed checks. Report only demonstrated conditions and recommend preventive controls. See [validation and prevention](references/validation-prevention.md) and the [remediation handoff template](assets/remediation-handoff-template.md).

## Evidence

- Authorization, scope, vendor ownership, exclusions, test role, and testing-window record.
- Redacted inventory of observed inbound and outbound integrations and their evidence sources.
- Data, identity, and trust-boundary map with confidence and unverified assumptions.
- Factual configuration or normal-use observations, false-positive controls, and stop decisions.
- Owner/vendor handoff record and remediation tied to demonstrated behavior only.

## Output

```yaml
third_party_integration_assessment:
  target: authorized application and integration scope
  authorization: scope reference and testing window
  ownership: application owner, vendor owner, and escalation route
  integrations:
    - direction: inbound | outbound
      vendor_or_service: documented identity
      purpose: observed or documented purpose
      data_classification: public | internal | confidential | sensitive | unknown
      identity_boundary: documented identity transition
      trust_boundary: concise description
      confidence: low | medium | high
      evidence: redacted references
  observations:
    - condition: factual, non-exploitative observation
      demonstrated_impact: bounded consequence or not demonstrated
      false_positive_controls: [corroboration or limitation]
      stop_status: completed | stopped | escalated
      remediation: preventive corrective action
  limitations: [excluded or unperformed checks]
  handoff: owner and vendor follow-up route
```

## Resource Index

- [Scope, vendor, and ownership admission](references/scope-vendor-ownership.md)
- [Observed inbound and outbound integration inventory](references/observed-integration-inventory.md)
- [Data, identity, and trust-boundary classification](references/data-identity-trust-boundaries.md)
- [Harmless configuration interpretation](references/harmless-configuration-interpretation.md)
- [Privacy, stop controls, and handoff](references/privacy-stop-handoff.md)
- [Validation and prevention](references/validation-prevention.md)
- [Integration boundary worksheet](assets/integration-boundary-worksheet.md)
- [Vendor and data-flow confidence matrix](assets/vendor-data-flow-confidence-matrix.md)
- [Sensitive-data and stop checklist](assets/sensitive-data-stop-checklist.md)
- [Remediation handoff template](assets/remediation-handoff-template.md)
