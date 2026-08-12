# Horizontal Access Assessment

## Purpose and Preconditions

Assess isolation between designated accounts with the same role. Prepare two distinct accounts and objects whose ownership and sharing state are known.

## Authorized Assessment Steps

1. Document each account's role, tenant, and owned test object.
2. Establish normal owner access to the selected object and related representations.
3. Repeat the exact operation as the same-role peer using only the known test reference.
4. Where approved, use a reversible state change on a disposable object and verify cleanup.

## Observation and Interpretation

A peer reading private content, altering a peer object, or accessing a peer-only function is horizontal escalation. A public object, an intentional collaboration grant, or a response that contains no protected data is not.

## False-Positive Controls

Validate sharing settings, role equivalence, test-object ownership, caches, and collection filters. Compare content and server-side state rather than HTTP status alone.

## Reporting Evidence

Provide the two-account relationship, policy expectation, paired captures, minimum affected data or safe action proof, and cleanup status using the [evidence template](../assets/evidence_template.md).

## Remediation

Enforce ownership or documented relationship checks at each server-side object access, including lists, search, exports, and nested resources.

## Sources

- https://portswigger.net/web-security/access-control
- https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html
