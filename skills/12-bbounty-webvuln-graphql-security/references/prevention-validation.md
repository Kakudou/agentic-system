# Prevention And Validation

## Purpose

Validate GraphQL findings conservatively and map confirmed weaknesses to effective server-side controls.

## Prerequisites

- A bounded hypothesis with recorded scope, expected behavior, and controlled test context.
- Minimal baseline and comparison observations.
- A redaction and state-cleanup plan.

## Bounded Authorized Workflow

1. Reproduce once with the smallest authorized comparison that demonstrates the claimed effect.
2. Confirm actor identity, object ownership, session freshness, tenant context, and response source.
3. Rule out caches, gateways, feature flags, delegated access, asynchronous processing, and documented bulk operations.
4. Classify the issue by the failed control: metadata minimization, object/field/action authorization, or query-cost enforcement.
5. Stop after validation; do not expand impact through additional objects, values, depth, aliases, batches, or mutations.

## Observations And Interpretation

- A confirmed finding has a repeatable server-side policy failure under controlled conditions.
- Schema visibility, verbose errors, accepted aliases, accepted batches, and timing changes are leads unless tied to a demonstrable security impact.
- A denied request, validation error, or cost rejection generally demonstrates a control, not a failure.

## False-Positive Controls

- Compare expected policy with program documentation and designated test-account capabilities.
- Preserve only redacted minimal evidence and avoid secondary data collection.
- State uncertainty when production telemetry or server-side accounting is unavailable.

## Evidence

Include scope, hypothesis, expected policy, controlled conditions, minimal reproduction, observed server-side outcome, eliminated alternatives, impact rationale, cleanup status, and remediation.

## Remediation

Use resolver-level deny-by-default authorization; validate object relationships and actions server-side; apply pre-execution depth, breadth, alias, batch, and cost limits; cap pagination; and log safe operation-cost decisions for monitoring.

## Sources

- PortSwigger: https://portswigger.net/web-security/graphql
- OWASP GraphQL Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html
- OWASP API Security Top 10: https://owasp.org/www-project-api-security/
