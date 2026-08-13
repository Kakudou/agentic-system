---
name: 12-bbounty-vuln-webhook-security
description: Authorization-first, observation-oriented assessment of documented or already observed webhook trust boundaries.
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Authorized Webhook Boundary Assessment

## Purpose

Assess an in-scope webhook sender, receiver, and event boundary from supplied documentation, approved captures, configuration views, or prior authorized evidence. This skill records bounded concerns and prepares a remediation handoff. It does not discover endpoints, send requests, register destinations, forge events, bypass or replay authentication, process payloads, automate assessment, or use secrets.

## Prerequisites

- Written authorization identifying in-scope systems, allowed evidence sources, exclusions, and a stop contact.
- Provenance-labeled webhook documentation, approved captures, owner-provided configuration, or authorized prior artifacts.
- A secure evidence location and named triage or remediation recipient.

Stop and request clarification if scope, sender or receiver ownership, evidence provenance, or the handoff channel is unclear.

## Assessment

1. Admit each system, relationship, and artifact only after confirming scope and ownership. See [scope and ownership admission](references/scope-ownership-admission.md).
2. Inventory only the observed sender, receiver, event, delivery, and ownership relationships. See [webhook inventory observation](references/webhook-inventory-observation.md) and use the [static webhook boundary worksheet](assets/webhook-boundary-worksheet.md).
3. Classify documented or observed sender authentication, signature verification, freshness, and duplicate-handling boundaries without attempting to defeat them. See [authentication and replay-boundary classification](references/authentication-replay-boundaries.md) and the [event/authentication confidence matrix](assets/event-authentication-confidence-matrix.md).
4. Interpret exposed configuration only as evidence of a control boundary, not proof of exploitability or impact. See [harmless configuration interpretation](references/configuration-interpretation.md).
5. Minimize collection and stop on sensitive data, secrets, third-party ownership, unintended delivery, or instability. See [privacy and stop controls](references/privacy-stop-controls.md) and the [sensitive-data/stop checklist](assets/sensitive-data-stop-checklist.md).
6. Separate observations from inferences, state limitations, and hand off prevention guidance to the owner. See [evidence, handoff, and prevention](references/evidence-handoff-prevention.md) and the [remediation/handoff template](assets/remediation-handoff-template.md).

## Evidence

- Authorization, scope, ownership decision, source provenance, and collection time.
- Observed sender/receiver/event relationships and documented delivery controls.
- Authentication-boundary classification, confidence, alternatives, exclusions, and stop decisions.
- Redacted evidence references and a remediation-oriented handoff. Do not retain secrets, full sensitive payloads, or destination details beyond the approved minimum.

## Output

```yaml
webhook_boundary_handoff:
  scope_reference: string
  observed_at: RFC-3339 timestamp
  boundaries:
    - sender_ownership: confirmed | likely | unverified | third_party
      receiver_ownership: confirmed | likely | unverified | third_party
      event_class: documented | observed | unknown
      authentication_boundary: documented | observed | unknown
      freshness_or_duplicate_control: documented | observed | unknown
      confidence: low | medium | high
      evidence_references: [string]
      limitations: [string]
  stopped_or_excluded: [string]
  remediation_owner: string
```

## Supplemental Index

- [Reference index](references/README.md)
- [Static webhook boundary worksheet](assets/webhook-boundary-worksheet.md)
- [Event/authentication confidence matrix](assets/event-authentication-confidence-matrix.md)
- [Sensitive-data/stop checklist](assets/sensitive-data-stop-checklist.md)
- [Remediation/handoff template](assets/remediation-handoff-template.md)
