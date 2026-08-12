# IDOR Assessment

## Purpose and Preconditions

Assess whether a server authorizes a client-supplied object reference. Use only in-scope endpoints, designated peer accounts, and known test objects. Record the intended ownership or sharing policy before comparison.

## Authorized Assessment Steps

1. Capture the owner's normal request for one test object and identify every object reference in the route, query, body, or nested path.
2. Send the smallest equivalent request using a designated peer's known test object reference; do not enumerate identifiers.
3. Where writes are explicitly permitted, use a disposable object and a reversible field, confirm the result, then restore it.
4. Cover related detail, nested, collection, and download/export representations when in scope.

## Observation and Interpretation

A finding requires a peer to receive protected object content or complete an action contrary to policy. A predictable identifier, different error, or object existence signal alone is not IDOR.

## False-Positive Controls

Check documented sharing, delegation, public visibility, support access, caching, and that both objects belong to the designated accounts. Normalize responses before comparison.

## Reporting Evidence

Capture the policy tuple, redacted owner and peer requests, minimum protected field or safe state change, and cleanup outcome using the [evidence template](../assets/evidence_template.md).

## Remediation

Authorize every object lookup and operation server-side against the authenticated principal, tenant, and documented relationship. Do not treat opaque identifiers as authorization.

## Sources

- https://portswigger.net/web-security/access-control/idor
- https://cheatsheetseries.owasp.org/cheatsheets/Insecure_Direct_Object_Reference_Prevention_Cheat_Sheet.html
