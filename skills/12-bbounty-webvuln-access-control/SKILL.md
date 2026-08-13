---
name: 12-bbounty-webvuln-access-control
description: Access-control assessment for object, function, role, ownership, and tenant authorization failures.
metadata:
  version: "1.0"
  opencode/slash: "true"
---

# Access Control Assessment

## Purpose

Assess whether the application enforces its intended authorization policy for every relevant subject, object, action, and tenant boundary. Work only within explicit authorization, use designated test accounts and test data, and prefer read-only or reversible checks.

## Prerequisites

- Confirmed in-scope targets and permitted test methods.
- At least two designated accounts where same-role or cross-role comparison is needed.
- Test objects, tenants, and an agreed cleanup path for any state-changing check.
- Available API, role, and business-rule documentation when supplied.

## Workflow

### 1. Model the intended policy

Inventory authenticated and unauthenticated functions, object types, roles, ownership relationships, tenant boundaries, and state-dependent actions. Record expected allow/deny outcomes before testing. Read the [role/object/action coverage model](assets/role_object_action_coverage.md) and use the [test-coverage decision matrix](assets/acl_test_matrix.md) to choose the minimum meaningful comparisons.

### 2. Establish controlled baselines

For each selected case, capture the designated account's normal request and response, then repeat the same request with a permitted peer account, lower-privilege account, or separate test tenant as applicable. Use unique test objects and minimize returned data. Read the [evidence template](assets/evidence_template.md) before collecting results.

### 3. Assess object authorization

When an endpoint accepts an object reference in a path, query, body, nested resource, or API resolver, read [IDOR assessment](references/idor.md). For API object operations, read [broken object-level authorization](references/boa.md) before covering the permitted read and state-changing actions. Read [object ownership assessment](references/object-ownership.md) and [ownership bypass assessment](references/ownership-bypass.md) when ownership, delegation, parent-child relationships, or transfer semantics determine access.

### 4. Assess peer, role, and function boundaries

When two same-role principals should be isolated, read [horizontal access assessment](references/horizontal-access.md) and [horizontal authorization analysis](references/horizontal.md). When a lower-privilege role must not use a higher-privilege capability, read [vertical escalation assessment](references/vertical-escalation.md) and [vertical authorization analysis](references/vertical.md). For endpoint, workflow-step, or HTTP-method permissions, read [function-level authorization](references/function-level.md) and [method-based authorization assessment](references/method-based.md).

### 5. Assess tenant boundaries

When an application supports organizations, workspaces, accounts, projects, or similar partitions, read [tenant-isolation assessment](references/tenant-isolation.md). Compare only designated test tenants and confirm both object-level and collection-level behavior.

### 6. Interpret and validate

Treat status-code differences, reflected identifiers, or a UI-only restriction as leads, not proof. Confirm that an unauthorized subject received a protected object or completed a protected action, account for documented delegation and privileged support workflows, and restore test state. Use the [access-control cheat sheet](assets/access_control_cheatsheet.md) for false-positive controls and the [evidence template](assets/evidence_template.md) for the required proof set.

### 7. Report and remediate

Report the violated policy, affected subject/object/action/tenant tuple, minimal reproducible authorized-test steps, observed result, impact, and cleanup status. Read the [remediation lookup](assets/remediation_lookup.md) when mapping a confirmed failure to corrective controls.

## Validation

- Expected policy was recorded before the comparison.
- The comparison used only authorized accounts, objects, and tenants.
- A protected object was disclosed or a protected action completed, not merely requested.
- Equivalent controls were checked across relevant methods, nested routes, and workflow steps.
- Test state was removed or restored where applicable.

## Evidence

- Scope and authorization constraints.
- Expected policy and test-account relationship.
- Redacted baseline and comparison request/response captures.
- Object, action, role, and tenant identifiers limited to designated test data.
- Before/after state and cleanup confirmation for any write.

## Output Format

```yaml
access_control_findings:
  target: string
  assessed_policy: string
  findings:
    - id: string
      class: idor | bola | horizontal | vertical | function_level | tenant_isolation | ownership
      subject: string
      object: string
      action: string
      expected_result: deny
      observed_result: string
      evidence: [strings]
      cleanup_status: not_applicable | restored | pending
      remediation: string
```

## Detailed Resources

- [IDOR assessment](references/idor.md)
- [Broken object-level authorization](references/boa.md)
- [Vertical escalation assessment](references/vertical-escalation.md)
- [Horizontal access assessment](references/horizontal-access.md)
- [Function-level authorization](references/function-level.md)
- [Tenant-isolation assessment](references/tenant-isolation.md)
- [Ownership bypass assessment](references/ownership-bypass.md)
- [Object ownership assessment](references/object-ownership.md)
- [Method-based authorization assessment](references/method-based.md)
- [IDOR/BOLA API analysis](references/idor-bola.md)
- [Horizontal authorization analysis](references/horizontal.md)
- [Vertical authorization analysis](references/vertical.md)
- [Test-coverage decision matrix](assets/acl_test_matrix.md)
- [Role/object/action coverage model](assets/role_object_action_coverage.md)
- [Evidence template](assets/evidence_template.md)
- [Remediation lookup](assets/remediation_lookup.md)
- [Access-control cheat sheet](assets/access_control_cheatsheet.md)
