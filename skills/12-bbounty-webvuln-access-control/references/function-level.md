# Function-Level Authorization

## Purpose and Preconditions

Assess whether each sensitive server-side function is restricted to documented roles and workflow states. Start from supplied documentation or observed normal application behavior; do not invent endpoint names or roles.

## Authorized Assessment Steps

1. List in-scope sensitive functions, their documented allowed roles, methods, and required prior state.
2. Capture an allowed baseline where one is available.
3. Test the exact function with a designated denied role using a harmless operation or disposable test data.
4. Compare known alternate methods, routes, and confirmation steps only when they are in scope and backed by a normal flow.

## Observation and Interpretation

The issue is confirmed when a denied role completes a protected server-side function. Client-side navigation restrictions and a 200 response without a completed protected effect are insufficient.

## False-Positive Controls

Check feature flags, delegated administration, asynchronous processing, idempotent no-ops, and the required workflow state. Confirm the server-side result independently.

## Reporting Evidence

Include the function, required role/state, denied-role request and outcome, allowed baseline if available, before/after test state, and cleanup in the [evidence template](../assets/evidence_template.md).

## Remediation

Centralize server-side authorization and state-transition checks. Apply deny-by-default controls consistently to every method, route, resolver, and background trigger reaching the function.

## Sources

- https://owasp.org/API-Security/editions/2023/en/0xa5-broken-function-level-authorization/
- https://portswigger.net/web-security/access-control
