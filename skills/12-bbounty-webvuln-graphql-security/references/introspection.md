# Introspection Boundaries

## Purpose

Decide when introspection is relevant and keep metadata assessment within authorization, privacy, and information-minimization limits.

## Prerequisites

- Written permission for metadata assessment or a documented public-schema policy.
- A confirmed surface and a redaction strategy.
- Agreement that disabled introspection is not to be bypassed.

## Bounded Authorized Workflow

1. Determine whether metadata is needed to answer the current hypothesis.
2. Prefer public documentation, normal-client artifacts, and the smallest authorized schema observation.
3. Classify a denial as a protected boundary and continue only with already authorized evidence sources.
4. Stop after collecting the relevant type/operation relationship; do not archive an entire schema by default.

## Observations And Interpretation

- Introspection availability is an exposure characteristic, not proof of broken authorization.
- A public schema can be legitimate; sensitive resolvers must still authorize at execution time.
- Error suggestions and parser differences are not authorization to enumerate or recover schema details.

## False-Positive Controls

- Confirm environment and role before comparing metadata visibility.
- Exclude generated, stale, or client-only type names from impact claims.
- Do not equate obscurity controls with access control.

## Evidence

Record why metadata was necessary, allowed role/method, limited fields observed, denial behavior if applicable, and whether documented policy matches the result.

## Remediation

Use production-appropriate metadata policies, minimize sensitive descriptions, and maintain resolver-level authorization regardless of introspection configuration.

## Sources

- PortSwigger: https://portswigger.net/web-security/graphql#discovering-schema-information
- OWASP: https://owasp.org/www-project-api-security/
