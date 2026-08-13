---
name: 12-bbounty-webvuln-graphql-security
description: Safely assess authorized GraphQL surfaces for schema exposure, authorization gaps, and bounded query-cost controls.
metadata:
  version: "1.0"
  opencode/slash: "true"
---

# GraphQL Security Assessment

Assess only explicitly authorized GraphQL endpoints, accounts, roles, objects, request methods, and query-cost limits. Use designated accounts and harmless test records. Prefer read-only checks; do not enumerate unknown objects, brute force values, flood requests, use bulk aliases or batches, or send state-changing operations without explicit written authorization and cleanup approval.

## Prerequisites

- Written scope defining endpoints, permitted test accounts and roles, object ownership, methods, rate limits, and query-cost boundaries.
- A harmless controlled object for each authorized role comparison, plus a stop and escalation contact.
- Normal client traffic, API documentation, or a confirmed endpoint candidate where available.
- A redaction plan for tokens, identifiers, personal data, and schema descriptions.

## Workflow

### 1. Identify the GraphQL surface

Establish the endpoint and its accepted transport from normal application behavior or authorized documentation. Use one minimal, non-destructive confirmation only; distinguish an application, proxy, and GraphQL validation response. Record the observed method, content type, authentication context, and any operation restrictions. Read [schema discovery](references/schema-discovery.md) for recognition, boundaries, and interpretation. Use the [assessment decision matrix](assets/assessment_decision_matrix.md) to decide whether to continue or stop.

### 2. Map the schema safely

If schema metadata access is in scope, begin with the smallest metadata observation needed to identify root operations and relevant types. Expand only to the fields, arguments, and relationships needed by the approved hypothesis. If introspection is unavailable, do not evade controls or induce suggestion errors; map only from authorized documentation and normal client behavior. Read [schema introspection](references/schema-introspection.md) and [introspection boundaries](references/introspection.md). Record coverage in the [schema, role, and action worksheet](assets/schema_role_action_worksheet.md).

### 3. Assess authorization by object and action

For each approved object/action pair, compare the expected result for designated roles using only controlled objects. Separate object-level access, field-level exposure, relationship traversal, and mutation authorization. Treat an error, UI difference, or schema-visible field as a lead until a controlled comparison confirms an unauthorized server-side result. Read [authorization assessment](references/authorization.md), [authorization checks](references/authorization-checks.md), and [nested query assessment](references/nested-queries.md) when a permitted relationship traversal is relevant.

### 4. Assess query cost only within agreed limits

Start from a normal, small baseline. Assess aliases, transport batching, or nesting only when the engagement explicitly permits the exact technique and a low fixed ceiling. Make at most the minimum controlled comparison needed; do not increase cardinality, depth, concurrency, or request rate after latency, errors, resource warnings, or other stop signals. Read [alias assessment](references/aliases.md), [alias query semantics](references/alias-queries.md), [batching assessment](references/batching.md), and the [query-cost and stop-condition checklist](assets/query_cost_stop_conditions.md).

### 5. Validate findings and capture evidence

Reproduce each suspected issue with the smallest authorized comparison, then rule out caching, gateway behavior, feature flags, intended delegation, stale sessions, and test-data mislabeling. Do not collect unnecessary records or repeat a potentially costly request. Use [prevention and validation](references/prevention-validation.md) and the [evidence and remediation lookup](assets/evidence_remediation_lookup.md) to complete proof and remediation.

## Validation

- Endpoint and transport were confirmed without endpoint spraying or control-evasion attempts.
- Every schema, role, object, action, alias, batch, and nesting observation is within written scope.
- Authorization evidence compares designated actors and controlled objects, with expected behavior stated in advance.
- Query-cost work stayed below the agreed fixed limits and stopped on the first warning signal.
- A finding demonstrates a reproducible server-side security impact, not only metadata exposure, an error message, or response-time variance.

## Evidence

- Scope authorization, test-account/role labels, controlled-object labels, and applicable limits.
- Redacted baseline and comparison request/response metadata, timing, and operation identifiers.
- Schema/operation mapping relevant to the hypothesis, without unnecessary schema or sensitive data capture.
- Expected and observed authorization or cost-control behavior, false-positive controls, and stop-condition status.
- Minimal reproduction, impact rationale, and remediation mapped to the affected control.

## Output Intent

```yaml
graphql_security_report:
  target: string
  authorized_scope: string
  surface: [strings]
  coverage: [object-role-action records]
  findings:
    - id: string
      class: schema_exposure | object_authorization | field_authorization | mutation_authorization | relationship_authorization | query_cost_control
      expected_result: string
      observed_result: string
      controlled_context: string
      evidence: [redacted-artifacts]
      false_positive_controls: [strings]
      remediation: [strings]
  stop_conditions: [strings]
  impact: low | medium | high | critical
```

## Resources

- [Schema discovery](references/schema-discovery.md)
- [Schema introspection](references/schema-introspection.md)
- [Introspection boundaries](references/introspection.md)
- [Authorization assessment](references/authorization.md)
- [Authorization checks](references/authorization-checks.md)
- [Alias assessment](references/aliases.md)
- [Alias query semantics](references/alias-queries.md)
- [Batching assessment](references/batching.md)
- [Nested query assessment](references/nested-queries.md)
- [Prevention and validation](references/prevention-validation.md)
- [Assessment decision matrix](assets/assessment_decision_matrix.md)
- [Schema, role, and action worksheet](assets/schema_role_action_worksheet.md)
- [Query-cost and stop-condition checklist](assets/query_cost_stop_conditions.md)
- [Evidence and remediation lookup](assets/evidence_remediation_lookup.md)
