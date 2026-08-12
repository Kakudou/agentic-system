# Authorization Assessment

## Purpose

Assess whether GraphQL resolvers enforce intended access by actor, object, field, relationship, and action, rather than relying on a single endpoint or client-side restrictions.

## Prerequisites

- Designated test accounts representing approved roles.
- Controlled objects with known ownership and an expected access matrix.
- Explicit write-operation permission and cleanup approval before any mutation assessment.

## Bounded Authorized Workflow

1. State the expected policy for one role, object, action, and result.
2. Establish a normal authorized baseline using a controlled object.
3. Compare the minimum permitted alternate role or ownership context.
4. For a relevant relationship, test only the controlled related object and minimal fields.
5. Assess mutations only if explicitly authorized, using reversible test data and a documented cleanup path.
6. Stop after the first reproducible unauthorized server-side result or any unexpected state change.

## Observations And Interpretation

| Observation | Interpretation |
|---|---|
| Unauthorized actor receives protected controlled-object data | Potential object or field authorization flaw. |
| Unauthorized actor can perform a controlled state change | Potential action authorization flaw; stop and restore only under approval. |
| Field appears in schema but is denied at execution | Expected defense-in-depth behavior. |
| Response differs only in UI or error wording | Insufficient without server-side access or action proof. |

## False-Positive Controls

- Verify account role, session freshness, tenant membership, and test-object ownership.
- Distinguish delegated access, shared resources, and documented support/admin roles from unauthorized access.
- Compare server results, not only client rendering or HTTP status.

## Evidence

Capture the stated policy, test identities as labels, controlled-object labels, minimal redacted baseline/comparison, server-side outcome, cleanup status, and impact.

## Remediation

Enforce deny-by-default authorization in each resolver and mutation, centralize policy where practical, and test object, field, and relationship access across roles.

## Sources

- PortSwigger: https://portswigger.net/web-security/graphql#access-control-vulnerabilities
- OWASP API1: https://owasp.org/API-Security/editions/2023/en/0xa1-broken-object-level-authorization/
