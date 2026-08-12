---
name: 12-bbounty-hunting-test-planning
description: Produce an authorized, low-impact security-test plan from admitted scope and evidence. Planning only; no scanning, exploitation, payloads, or execution.
metadata:
  version: 2.0
  opencode/slash: "true"
---

# Authorized Security-Test Planning

Create a bounded plan only after scope, authorization, and available evidence are admitted. Do not discover targets, rank targets automatically, scan, send test traffic, provide payloads, or describe exploit sequences.

## Scope And Evidence Intake

Require a written authorization boundary, in-scope assets, allowed testing window, known exclusions, permitted account/data handling, and supplied observations. If any material item is absent or contradictory, return a scope question rather than a test plan.

Use [scope admission](references/scope-admission.md) to record the decision and [the worksheet](assets/test-plan-worksheet.md) to capture the accepted boundary.

## Hypotheses To Tests

Frame each test as a falsifiable security hypothesis tied to a supplied observation, a named asset within scope, an expected safe signal, and an uncertainty level. Do not treat technology fingerprints, generic weakness lists, or prior reports as findings.

Use [hypothesis framing](references/hypothesis-framing.md) and [the confidence matrix](assets/hypothesis-evidence-confidence-matrix.md) to map evidence to bounded tests.

## Low-Impact Validation Plan

Specify the minimum non-destructive observation needed to distinguish the hypothesis from normal behavior. Define required permissions, test data constraints, rate and concurrency limits supplied by the authorization, expected benign and concerning signals, and a manual review path. Escalation requires renewed authorization.

Use [test design](references/test-design.md) for the planning method and [the worksheet](assets/test-plan-worksheet.md) for the static plan format.

## Stop Conditions

Predeclare conditions that halt work before it begins, including scope ambiguity, unexpected data exposure, service degradation, authentication or authorization anomalies, third-party interaction, or any signal outside the approved boundary. A stop is not a finding and must not be bypassed by continued testing.

Use [safety boundaries](references/safety-boundaries.md) and [the checklist](assets/stop-condition-checklist.md).

## Evidence And Handoff

Record only authorized, minimally necessary observations with timestamps, asset identifiers, test-plan IDs, conditions, and uncertainty. Separate observations, interpretation, and recommended owner action. Handoff does not assert a vulnerability without corroborated evidence and responsible review.

Use [evidence and handoff](references/evidence-handoff.md) and [the handoff template](assets/handoff-template.md).

## Prerequisites

- Explicit written authorization and an in-scope asset list
- Testing constraints and a named recipient for stop/escalation notices
- Supplied, provenance-labeled evidence sufficient to form at least one hypothesis

## Evidence

- Scope-admission record and authorization reference
- Hypothesis-to-test mapping with confidence and uncertainty
- Approved low-impact validation plan and stop conditions
- Minimal observation log and completed handoff, when validation is authorized and performed

## Output

Return a static plan containing: scope decision, evidence inventory, hypotheses, bounded validation steps, stop conditions, required approvals, and handoff owner. State `planning only` when no validation authorization is provided.

## Supplemental Index

- [Scope admission](references/scope-admission.md)
- [Hypothesis framing](references/hypothesis-framing.md)
- [Test design](references/test-design.md)
- [Safety boundaries](references/safety-boundaries.md)
- [Evidence and handoff](references/evidence-handoff.md)
- [Assets](assets/)
