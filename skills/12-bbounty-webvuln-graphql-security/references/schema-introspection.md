# Schema Introspection

## Purpose

Assess approved schema-metadata exposure and use it to map only the types, fields, arguments, and operations relevant to a bounded hypothesis.

## Prerequisites

- Explicit permission to query schema metadata.
- A defined information-disclosure objective and redaction plan.
- An identified GraphQL surface and normal request context.

## Bounded Authorized Workflow

1. Observe the smallest supported metadata response needed to identify the applicable root operation or type.
2. Request details only for types and fields connected to the approved hypothesis.
3. Record access conditions and whether descriptions, deprecated fields, input fields, or operations add material exposure.
4. Stop when the hypothesis is mapped or metadata is denied.
5. Do not use alternate transports, formatting variants, malformed queries, suggestion harvesting, or tooling to bypass an introspection restriction.

## Observations And Interpretation

| Observation | Interpretation |
|---|---|
| Metadata available to an intended developer role | Often expected; assess sensitivity and exposure context. |
| Metadata available to an unauthenticated or lower-privilege role | Lead requiring impact analysis, not automatically a finding. |
| Metadata denied | A control result, not a reason to attempt evasion. |
| Sensitive operation names or descriptions revealed | Assess whether they materially enable access beyond already available client behavior. |

## False-Positive Controls

- Separate schema metadata from proof that a field or operation is executable.
- Check whether the schema is public by design, documented, or available in the shipped client.
- Avoid retaining full schemas when a redacted relevant excerpt establishes the observation.

## Evidence

Capture role context, scope approval, minimal redacted metadata excerpt, relevant operation/type mapping, expected exposure policy, and impact rationale.

## Remediation

Restrict introspection by environment and role where appropriate, remove sensitive descriptions and unused operations, and ensure authorization remains enforced independently of schema visibility.

## Sources

- PortSwigger: https://portswigger.net/web-security/graphql#discovering-schema-information
- OWASP GraphQL Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html#disable-introspection-queries
