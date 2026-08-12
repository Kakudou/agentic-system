# Vertical Escalation Assessment

## Purpose and Preconditions

Assess whether a lower-privilege designated account can use a capability reserved for a documented higher-privilege role. Obtain the expected policy and use harmless test capabilities where possible.

## Authorized Assessment Steps

1. Identify a documented protected capability and capture its expected higher-role behavior.
2. Attempt the same exact server-side operation with the lower-role account through its normal in-scope route.
3. Check alternate supported entry points, methods, and workflow steps only where they are known and authorized.
4. Confirm any permitted state change on test data, then restore it.

## Observation and Interpretation

Vertical escalation is confirmed when the lower role receives protected functionality or completes a higher-role action. A hidden menu, client-side disabled control, or informative error alone is not proof.

## False-Positive Controls

Verify current role server-side, intended support/delegation privileges, environment-specific feature flags, and that a background process did not perform the action.

## Reporting Evidence

Record role policy, exact protected capability, lower-role request/result, higher-role baseline where available, resulting state, and cleanup in the [evidence template](../assets/evidence_template.md).

## Remediation

Use deny-by-default, centralized server-side authorization checks for every protected function. Test all routes and workflow stages that reach the capability.

## Sources

- https://portswigger.net/web-security/access-control
- https://owasp.org/API-Security/editions/2023/en/0xa5-broken-function-level-authorization/
