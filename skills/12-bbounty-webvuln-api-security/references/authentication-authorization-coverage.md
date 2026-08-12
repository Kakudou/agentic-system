# Authentication and Authorization Coverage

## Purpose and Preconditions

Review object, property, and function authorization using only owner-provisioned test roles and dedicated objects. Requires an approved role matrix and explicit permission to compare the named roles.

## Bounded Authorized Methodology

For each approved operation, state the expected decision for the authenticated role, action, and test object. Where authorization permits, make a single equivalent request with a second approved role or second dedicated object. Assess separately whether identity is established, whether the action is allowed, whether the object belongs to the caller's permitted scope, and whether each returned or writable property is appropriate.

## Observations and Interpretation

An unexpected successful action may indicate broken function-level authorization. An unexpected object read or update decision may indicate broken object-level authorization. Unexpected property visibility or mutability may indicate broken property-level authorization. Confirm the server-side effect only on dedicated test data.

## False-Positive Controls

Check documented delegated access, shared tenancy, administrative role intent, caching, eventual consistency, and test-data ownership before classifying an observation. A different error code alone does not establish an authorization defect.

## Stop Conditions

Stop if a comparison would touch another user's data, exercise a destructive or privileged action, expose sensitive data, or require privilege modification.

## Evidence

Record approved role labels, redacted test-object identifiers, expected decision, observed status and response category, and a before/after state check for reversible actions.

## Remediation

Perform authorization server-side for every request; enforce deny-by-default object, property, and function policies; derive ownership from trusted context; and test each role-object-action combination in CI.

## Sources

- [PortSwigger: API testing](https://portswigger.net/web-security/api-testing)
- [OWASP API1:2023 Broken Object Level Authorization](https://owasp.org/API-Security/editions/2023/en/0xa1-broken-object-level-authorization/)
- [OWASP API3:2023 Broken Object Property Level Authorization](https://owasp.org/API-Security/editions/2023/en/0xa3-broken-object-property-level-authorization/)
- [OWASP API5:2023 Broken Function Level Authorization](https://owasp.org/API-Security/editions/2023/en/0xa5-broken-function-level-authorization/)
