# Tenant-Isolation Assessment

## Purpose and Preconditions

Assess separation between designated organizations, workspaces, projects, or accounts. Use two approved test tenants with known memberships and disposable data for any allowed write.

## Authorized Assessment Steps

1. Record how authenticated identity establishes tenant context and which objects belong to each test tenant.
2. Capture Tenant A's normal access to its test object and collection.
3. Compare Tenant A access to a known Tenant B object across detail, list/search, nested, and export routes in scope.
4. Test tenant-changing operations only with an explicit approval and reversible test state.

## Observation and Interpretation

Cross-tenant protected data or successful cross-tenant action is a failure. Distinct response bodies alone do not establish isolation; the key question is whether Tenant A receives Tenant B content or effect.

## False-Positive Controls

Confirm tenant identifiers, explicit cross-tenant sharing, global public resources, stale caches, and authorized provider/support roles.

## Reporting Evidence

Capture both test tenants, authenticated subject, expected boundary, redacted comparison captures, minimum affected data or safe action proof, and cleanup using the [evidence template](../assets/evidence_template.md).

## Remediation

Derive tenant scope from authenticated server-side context and apply it consistently to every query, mutation, background job, cache key, export, and object relationship.

## Sources

- https://owasp.org/API-Security/editions/2023/en/0xa1-broken-object-level-authorization/
- https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html
