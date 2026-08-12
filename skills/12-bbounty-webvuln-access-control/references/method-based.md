# Method-Based Authorization Assessment

## Purpose and Preconditions

Assess whether authorization is consistent across documented HTTP methods, RPC methods, or workflow entry points for the same protected capability. Use normal traffic or documentation to identify valid alternatives; do not probe arbitrary methods.

## Authorized Assessment Steps

1. Record the expected method-to-action mapping for the target capability.
2. Capture an authorized baseline for each valid method or entry point.
3. With a designated denied account, test only those same valid methods against disposable or read-only test data.
4. Confirm any apparent success through the resulting server-side state and restore it.

## Observation and Interpretation

A failure occurs when an alternate method or direct workflow entry performs an action denied through the intended path. Different status codes, method-not-allowed responses, or CORS preflight behavior are not findings by themselves.

## False-Positive Controls

Account for idempotency, method tunneling documented by the API, CSRF failures, routing normalization, and asynchronous actions. Confirm the protected action actually occurred.

## Reporting Evidence

Record the capability, valid method/entry-point mapping, expected policy, redacted baseline and comparison captures, final state, and cleanup in the [evidence template](../assets/evidence_template.md).

## Remediation

Apply the same centralized authorization decision to all routes and methods that invoke a capability, and enforce workflow state server-side.

## Sources

- https://portswigger.net/web-security/access-control
- https://owasp.org/API-Security/editions/2023/en/0xa5-broken-function-level-authorization/
