# Ownership Bypass Assessment

## Purpose and Preconditions

Assess ownership and relationship enforcement for objects that can be shared, delegated, transferred, or inherited. Use designated owner, non-owner, and delegate accounts only where those relationships are part of the approved test setup.

## Authorized Assessment Steps

1. Record the intended owner, delegate, parent-child, and tenant relationships for a disposable test object.
2. Capture allowed owner and, if applicable, delegate access.
3. Compare a non-owner request for the same object and action.
4. For explicitly approved relationship transitions, perform the minimum reversible transition, verify access before and after, then restore the original state.

## Observation and Interpretation

An ownership bypass exists when a non-owner obtains access or changes ownership without a documented relationship. A valid shared-resource grant or administrator operation is expected behavior.

## False-Positive Controls

Verify current sharing, delegation expiry, inherited project membership, support access, and object ownership in the server-side result. Do not rely on request-supplied ownership fields as evidence of server trust.

## Reporting Evidence

Capture the relationship model, account roles, expected allow/deny, paired request results, safe before/after state, and restoration in the [evidence template](../assets/evidence_template.md).

## Remediation

Derive ownership and relationship authorization from trusted server-side state. Validate grants, transfers, revocation, and parent-child inheritance on every affected operation.

## Sources

- https://portswigger.net/web-security/access-control
- https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html
