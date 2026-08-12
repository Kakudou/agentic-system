# Role/Object/Action Coverage Model

## Purpose and Preconditions

Use this model to turn supplied policy and discovered in-scope behavior into a finite assessment plan. Complete it before testing a branch that could change state. Do not infer permissions from role names.

## Model

| Dimension | Capture | Example value format |
|---|---|---|
| Subject | Designated account and its documented relationship | `test-user-a`, `test-support-role` |
| Role | Server-recognized privilege class | `standard`, `manager` |
| Tenant | Organization/workspace boundary | `tenant-a`, `tenant-b` |
| Object | Test-data type and ownership relationship | `invoice: owned-by-a` |
| Action | Exact server-side operation | `read-detail`, `approve`, `export` |
| Route | Entry point and method/resolver | `GET /resource/{id}` |
| State | Required workflow condition | `draft`, `approved` |
| Expected result | Explicit allow or deny | `deny` |

## Coverage Rules

1. Cover every sensitive action for each role that is expected to be denied it.
2. Cover detail, collection/search, nested, and export representations when they expose the same object class.
3. Cover every permitted state-changing operation using only disposable test data and a documented restore step.
4. Treat parent-child, delegate, and tenant membership as separate authorization dimensions.
5. Mark unavailable accounts or objects as gaps rather than inventing a comparison.

## Interpretation

A finding requires a mismatch between documented or verified intended policy and server-enforced behavior. A complete model also makes negative results useful: they show exactly which policy tuples were tested.

## Sources

- https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html
- https://owasp.org/API-Security/editions/2023/en/0xa5-broken-function-level-authorization/
