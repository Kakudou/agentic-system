# Vertical Authorization Analysis

## Purpose and Preconditions

Use when a protected capability is reachable through multiple application surfaces. Obtain a documented lower-role denial expectation and a safe, in-scope capability to assess.

## Authorized Assessment Steps

1. State the protected capability and allowed roles.
2. Locate documented or normally observed routes that invoke it.
3. Compare a designated denied role using each relevant safe entry point.
4. Verify server-side result and restore any approved test state.

## Observation and Interpretation

The relevant outcome is whether the denied role performs the protected capability, not whether a particular UI route is visible. A partial workflow response is not proof unless it produces the protected effect.

## False-Positive Controls

Check role refresh, feature flags, delegated administrative roles, asynchronous jobs, and test-environment policy differences.

## Reporting Evidence

Capture allowed policy, denied-role result, protected effect, and cleanup through the [evidence template](../assets/evidence_template.md).

## Remediation

Centralize deny-by-default capability checks and cover all alternate routes, methods, and workflow transitions in regression tests.

## Sources

- https://portswigger.net/web-security/access-control
- https://owasp.org/API-Security/editions/2023/en/0xa5-broken-function-level-authorization/
