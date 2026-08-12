# Broken Object-Level Authorization

## Purpose and Preconditions

Assess API authorization for individual records and nested records. Use designated API identities, test objects, known expected permissions, and explicit approval before any mutation.

## Authorized Assessment Steps

1. Map object-bearing operations from supplied API documentation or normal application traffic.
2. Establish a normal result for an owner or permitted delegate.
3. Compare a designated peer or separate-tenant request for the same read, list, nested, and permitted mutation operation.
4. For GraphQL or RPC, treat each resolver or method that loads an object as a separate authorization boundary.

## Observation and Interpretation

BOLA is confirmed when the API returns a protected record or completes an object operation for a subject that policy denies. Endpoint authentication without object authorization does not prevent BOLA.

## False-Positive Controls

Verify server-side filtering rather than client-side display, documented sharing, tenant membership, and data freshness. Do not mistake an empty response or validation failure for authorization enforcement.

## Reporting Evidence

Record the object identifier class, operation, expected policy, paired captures, minimum sensitive proof, and restored state in the [evidence template](../assets/evidence_template.md).

## Remediation

Apply server-side authorization at every object resolver, including reads, mutations, nested resources, bulk actions, and asynchronous jobs. Scope queries by authenticated principal and tenant.

## Sources

- https://owasp.org/API-Security/editions/2023/en/0xa1-broken-object-level-authorization/
- https://portswigger.net/web-security/access-control
