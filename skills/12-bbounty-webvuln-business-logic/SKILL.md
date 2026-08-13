---
name: 12-bbounty-webvuln-business-logic
description: Authorized assessment of business rules, pricing, state, workflow, invariants, and trust boundaries.
metadata:
  version: "1.0"
  opencode/slash: "true"
---

# Business Logic Assessment

## Purpose

Assess whether an application enforces its intended business rules across pricing, state, workflow, and trust boundaries. Work only within explicit authorization, with designated test accounts and synthetic or non-financial test data. Prefer read-only or reversible checks; do not complete purchases, trigger payouts, consume scarce inventory, or use concurrent/race testing unless the engagement explicitly permits it.

## Prerequisites

- Confirmed in-scope targets, permitted methods, and financial-abuse limits.
- Designated test accounts, roles, objects, and a cleanup path for any state change.
- Available business-flow, pricing, entitlement, and API documentation.
- A safe test dataset and an agreed stop condition for unexpected effects.

## Workflow

### 1. Map intended rules

Record each business outcome, eligible actor, object, precondition, calculation source, state transition, and expected result before testing. Read the [business rules matrix](assets/business_rules_matrix.md) to turn documentation and observed normal behavior into traceable coverage. When behavior is ambiguous, read [logic puzzles](references/logic-puzzles.md) to frame a bounded hypothesis rather than treating an unusual response as a flaw.

### 2. Establish safe baselines

Use a normal, permitted path with synthetic test data. Capture the displayed and server-confirmed result, resulting state, and relevant identifiers. Read [evidence fields](assets/evidence_fields.md) before collecting evidence and [business-logic cheatsheet](assets/business_logic_cheatsheet.md) for scope and false-positive controls.

### 3. Assess calculations and entitlements

When totals, quantities, taxes, shipping, currency, discounts, coupons, credits, or thresholds affect an outcome, read [price and quantity assessment](references/price-quantity.md), [price manipulation assessment](references/price-manipulation.md), and [coupons and credits assessment](references/coupons-credits.md). Compare server-derived results at a safe boundary using synthetic values only; do not obtain goods, funds, credits, or services. Record expected arithmetic and eligibility in the [invariant checklist](assets/invariant_checklist.md).

### 4. Assess state and workflow enforcement

When an object has lifecycle states, approvals, verification, fulfillment, cancellation, or recovery steps, read [state-machine assessment](references/state-machine.md) and use the [state-transition test record](assets/state_transition_test_record.md). When a process has ordered screens or API steps, read [workflow-bypass assessment](references/workflow-bypass.md). Test only a minimum, reversible comparison between a documented valid path and a controlled invalid or out-of-order attempt. Do not replay requests or perform concurrency testing unless specifically authorized.

### 5. Assess trust boundaries and invariants

When a server accepts client-provided values, identity context, eligibility attributes, or data relayed by another component, read [trust-boundary assessment](references/trust-boundaries.md). When correctness depends on a rule that must remain true across actions or systems, read [invariant-testing assessment](references/invariant-testing.md). Confirm whether the server independently derives or validates the value, role, object relationship, and state.

### 6. Interpret and validate

Treat a UI discrepancy, client-controlled field, status code, or calculation difference as a lead. A finding requires a reproducible violation of a documented or defensibly inferred rule and a confirmed server-side outcome. Account for rounding policy, tax jurisdiction, feature flags, asynchronous processing, test-mode behavior, delegated roles, and documented exceptions. Restore test state and use the [evidence fields](assets/evidence_fields.md) to check proof completeness.

### 7. Report and remediate

Report the intended rule, controlled test conditions, observed server-side outcome, impact without financial gain, cleanup status, and remediation. Read the [remediation lookup](assets/remediation_lookup.md) to map the failure to server-side controls.

## Validation

- Intended rule, actor, object, and preconditions were recorded before testing.
- Testing stayed within authorized scope and used safe test data.
- The observed outcome demonstrates a server-side rule violation, not only a client-side display difference.
- Alternative explanations and documented exceptions were checked.
- Any changed test state was restored or disclosed.

## Evidence

- Scope authorization and safety constraints.
- Rule source, expected result, and controlled test conditions.
- Redacted baseline and comparison observations.
- Before/after state, calculation inputs and server-confirmed outputs.
- Cleanup status, impact rationale, and remediation mapping.

## Output Format

```yaml
business_logic_report:
  target: string
  assessed_rules: [strings]
  findings:
    - id: string
      class: price_quantity | coupons_credits | state_machine | workflow_bypass | trust_boundary | invariant
      intended_rule: string
      test_context: string
      expected_result: string
      observed_result: string
      server_side_effect: string
      evidence: [strings]
      cleanup_status: not_applicable | restored | pending
      remediation: string
  impact: low | medium | high | critical
```

## Detailed Resources

- [Price and quantity assessment](references/price-quantity.md)
- [Price manipulation assessment](references/price-manipulation.md)
- [Coupons and credits assessment](references/coupons-credits.md)
- [State-machine assessment](references/state-machine.md)
- [Workflow-bypass assessment](references/workflow-bypass.md)
- [Trust-boundary assessment](references/trust-boundaries.md)
- [Invariant-testing assessment](references/invariant-testing.md)
- [Logic puzzles](references/logic-puzzles.md)
- [Business rules matrix](assets/business_rules_matrix.md)
- [State-transition test record](assets/state_transition_test_record.md)
- [Invariant checklist](assets/invariant_checklist.md)
- [Evidence fields](assets/evidence_fields.md)
- [Remediation lookup](assets/remediation_lookup.md)
- [Business-logic cheatsheet](assets/business_logic_cheatsheet.md)
