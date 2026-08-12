# Compatibility And Safety Review

## Purpose

Identify whether a documentation change conflicts with approved scope, existing controls, dependencies, or reporting obligations before it is presented for approval.

## Preconditions

- A bounded proposed change and target methodology version.
- Admitted evidence and documented applicability limits.
- A known owner for safety and compatibility decisions.

## Documentation Methodology

1. Compare the proposed wording with the current methodology’s stated scope, authorization boundaries, and safeguards.
2. Identify documents, roles, dependencies, and records that would become inconsistent if the change were approved.
3. Record each risk with impact, uncertainty, owner, and required decision.
4. State whether the proposal is compatible, conditionally compatible, or blocked. Conditional status must name the unmet condition.
5. Record stop and escalation triggers using the [safety/stop checklist](../assets/safety-stop-checklist.md).

## Uncertainty And Safety Controls

- This is a documentation review, not operational validation or permission to perform security testing.
- Block the proposal when it could imply unauthorized scope, remove a safeguard without owner approval, or lacks a responsible rollback owner.
- Do not treat a reviewer’s silence as approval.
- Preserve unresolved conflicts in the handoff rather than editing them away.

## Evidence And Handoff

Provide the completed checklist, affected-document list, conflict register, and a clear recommendation status to the approver. Any blocked or conditional item remains visible in the final handoff.

## Authoritative Sources

- Current approved methodology and change-control policy
- Applicable authorization, scope, and reporting requirements
- Owner-confirmed dependency and rollback information
