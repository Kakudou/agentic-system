---
name: 12-bbounty-engagement-scope-guard
description: Make documented, authorization-first scope decisions for bug bounty work and hand off unresolved boundaries safely.
metadata:
  version: 2.0
  opencode/slash: "true"
---

# Engagement Scope Guard

## Purpose

Keep work inside the current program authorization. This skill documents scope decisions; it does not validate targets, perform testing, or provide exploitation guidance.

## Prerequisites

- Current program terms and a dated scope source from `12-bbounty-engagement-program-intake` and `12-bbounty-engagement-scope-normalisation`.
- A proposed asset, action, and intended data exposure level.
- A named program contact or platform escalation path for unresolved questions.

## Decision Workflow

1. Admit only an authoritative, current scope source. Record its locator, retrieval date, version or timestamp, and any applicable safe-harbor language using the [scope-source admission guide](references/scope-source-admission.md) and [scope-decision worksheet](assets/scope-decision-worksheet.md).
2. Evaluate the proposed asset, action, rate, and data handling against explicit inclusions, exclusions, and program constraints. Use the [restriction evaluation guide](references/restriction-evaluation.md) and [restriction/conflict matrix](assets/restriction-conflict-matrix.md).
3. If sources are incomplete, stale, or conflicting, treat authorization as unresolved. Follow the [ambiguity and conflict guide](references/ambiguity-conflicts.md); do not infer permission from ownership clues, prior practice, or a broad wildcard alone.
4. Stop immediately when a boundary is unclear, an exclusion applies, a restriction would be exceeded, or unexpected sensitive data appears. Use the [stop and escalation guide](references/stop-escalation.md) and [stop/escalation checklist](assets/stop-escalation-checklist.md).
5. Hand off a concise, redacted decision record, including unresolved questions and the no-action state, with the [evidence and handoff guide](references/evidence-handoff.md) and [engagement handoff template](assets/engagement-handoff-template.md).

## Evidence

- Exact source references and retrieval metadata for the program terms and scope.
- The proposed asset, action category, anticipated request rate, and data boundary.
- Decision, rationale, restrictions, uncertainty, and escalation status.
- Redacted evidence references only; never retain credentials, tokens, personal data, or unnecessary response content.

## Output

```yaml
scope_decision:
  program: string
  scope_source: string
  retrieved_at: timestamp
  proposed_asset: string
  proposed_action: string
  decision: authorized | not_authorized | unresolved | stopped
  restrictions: [string]
  uncertainty: [string]
  escalation: pending | not_required | resolved
  evidence_refs: [string]
```

## Resource Index

- [Scope-source admission](references/scope-source-admission.md)
- [Restriction evaluation](references/restriction-evaluation.md)
- [Ambiguity and conflicts](references/ambiguity-conflicts.md)
- [Stop and escalation](references/stop-escalation.md)
- [Evidence and handoff](references/evidence-handoff.md)
- [Scope-decision worksheet](assets/scope-decision-worksheet.md)
- [Restriction/conflict matrix](assets/restriction-conflict-matrix.md)
- [Stop/escalation checklist](assets/stop-escalation-checklist.md)
- [Engagement handoff template](assets/engagement-handoff-template.md)
