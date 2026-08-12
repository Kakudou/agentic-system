# Access-Control Test-Coverage Decision Matrix

## Purpose and Preconditions

Use this matrix after scope, test accounts, test objects, and expected policy are known. It selects coverage; it does not define roles, endpoints, identifiers, or request collections. Do not test a write without explicit authorization and a cleanup plan.

## Decision Matrix

| Observed condition | Read before testing | Minimum comparison | Expected observation | Escalate when |
|---|---|---|---|---|
| Object identifier is client supplied | [IDOR](../references/idor.md) | Owner versus designated peer | Peer is denied or receives no protected object | A peer receives protected data or action succeeds |
| API resolves a record or nested record | [BOLA](../references/boa.md) | Same object/action under permitted accounts | Server checks object authorization on every operation | One operation differs from the documented policy |
| Same-role accounts have private data | [Horizontal access](../references/horizontal-access.md) | Account A object versus account B | Isolation remains enforced | Collection, detail, or linked object crosses boundary |
| Roles have different capabilities | [Vertical escalation](../references/vertical-escalation.md) | Lower role versus designated higher role baseline | Lower role is denied protected capability | Lower role completes the protected capability |
| Sensitive endpoint, method, or workflow step | [Function-level](../references/function-level.md) | Allowed versus denied role at that exact action | Denial is consistent across entry points | Direct, alternate-method, or late-step path succeeds |
| Tenant/workspace boundary exists | [Tenant isolation](../references/tenant-isolation.md) | Tenant A account against Tenant B test data | Tenant A cannot observe or alter Tenant B data | Detail, list, search, export, or linked object leaks |
| Ownership, sharing, delegation, or transfer exists | [Ownership bypass](../references/ownership-bypass.md) | Owner, delegate, and non-owner as documented | Only documented relationship grants access | Relationship check is absent or over-broad |

## Recording Rule

For each selected row, record one expected policy tuple and one controlled baseline before the comparison. Capture the result with the [evidence template](evidence_template.md). A denial alone does not prove all alternate routes are protected; record untested dimensions as coverage gaps.

## Sources

- https://portswigger.net/web-security/access-control
- https://owasp.org/API-Security/editions/2023/en/0xa1-broken-object-level-authorization/
