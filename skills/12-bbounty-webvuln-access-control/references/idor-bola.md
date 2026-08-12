# IDOR/BOLA API Analysis

## Purpose and Preconditions

Use this API-focused companion when an endpoint or resolver accepts object identifiers, including nested identifiers. Have designated accounts, known test records, expected authorization policy, and mutation approval where relevant.

## Authorized Assessment Steps

1. Identify object references in documented API operations and normal requests.
2. Map each reference to its expected owner, tenant, and permitted actions.
3. Compare owner and designated peer behavior for the smallest relevant read operation.
4. Extend only confirmed candidates to permitted, reversible operations and linked/nested objects.

## Observation and Interpretation

IDOR and BOLA describe the same core failure in different contexts: an API accepts a reference but does not enforce object-level authorization. Authentication, random IDs, or endpoint-level role checks alone are not sufficient controls.

## False-Positive Controls

Check API documentation for public, shared, delegated, or administrative access; validate object identity and response freshness; and distinguish schema validation from authorization.

## Reporting Evidence

Use the [evidence template](../assets/evidence_template.md) to show the protected object, policy mismatch, paired requests, minimal result, and cleanup.

## Remediation

Authorize at each object resolver and scope every object query and mutation to authenticated principal, tenant, and documented relationship.

## Sources

- https://owasp.org/API-Security/editions/2023/en/0xa1-broken-object-level-authorization/
- https://portswigger.net/web-security/access-control/idor
