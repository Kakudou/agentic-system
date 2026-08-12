# Access-Control Remediation Lookup

## Purpose and Preconditions

Use after validating a policy mismatch. Select remediation from the failure class and validate it against the original subject/object/action tuple plus adjacent routes. This lookup does not replace application-specific authorization design.

| Failure class | Primary remediation | Verification after fix |
|---|---|---|
| IDOR/BOLA | Enforce server-side object authorization at every object lookup and mutation | Owner, peer, delegated, and tenant comparisons for each operation |
| Horizontal access | Bind private objects to the authenticated principal or documented relationship | Detail, list, search, nested, and export paths deny peers |
| Vertical/function-level | Centralize deny-by-default capability checks at the server boundary | Lower role is denied for every route, method, and workflow step |
| Tenant isolation | Derive tenant scope from trusted authenticated context and enforce it in queries and writes | Separate test tenant cannot read, enumerate, link, or alter data |
| Ownership/delegation | Model ownership and delegation explicitly; validate relationship transitions | Transfer, sharing, revocation, parent-child, and stale access paths obey policy |
| State-dependent control | Enforce state transition authorization and preconditions server-side | Direct and alternate entry points cannot skip required state |

## Reporting Evidence

State the violated policy, affected control point, recommended enforcement boundary, and regression cases. Avoid recommending identifier obscurity as an access-control control.

## Sources

- https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html
- https://portswigger.net/web-security/access-control
- https://owasp.org/API-Security/editions/2023/en/0xa5-broken-function-level-authorization/
