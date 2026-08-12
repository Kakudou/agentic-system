# Object Ownership Assessment

## Purpose and Preconditions

Use when access depends on creator, assignee, parent object, project membership, or delegation. Document the intended relationship graph and prepare designated accounts and test records that represent it.

## Authorized Assessment Steps

1. Identify the server-side relationship that should permit access.
2. Capture normal access for each documented relationship state.
3. Compare a non-member or non-owner against the same object and action.
4. For approved transition tests, use a disposable object and verify grant and revocation behavior, then restore state.

## Observation and Interpretation

The result is a finding only when access contradicts the relationship policy. A UI label or request field claiming ownership does not establish the server-side relationship.

## False-Positive Controls

Confirm inherited membership, explicit shares, organization roles, temporary delegation, and cache invalidation. Verify which account actually owns the test object.

## Reporting Evidence

Record the relationship graph, expected policy, account comparison, resulting state, and cleanup with the [evidence template](../assets/evidence_template.md).

## Remediation

Resolve ownership and relationship checks from trusted server-side records. Apply them to reads, writes, list filters, nested resources, shares, transfers, and revocation.

## Sources

- https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html
- https://portswigger.net/web-security/access-control
