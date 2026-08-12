# Schema Discovery

## Purpose

Confirm that an authorized endpoint is GraphQL and define the smallest safe surface to assess. Discovery is surface identification, not path spraying, schema recovery, or control evasion.

## Prerequisites

- Explicit endpoint and method scope, or permission to validate a named endpoint candidate.
- A normal client trace or relevant API documentation where available.
- A permitted account context and a harmless stop condition.

## Bounded Authorized Workflow

1. Start with documented endpoints or an endpoint used by the normal client.
2. Make one minimal non-destructive confirmation using the normal transport and authentication context.
3. Record whether the response is GraphQL validation, application data, or intermediary behavior.
4. Identify only the root operation or type information necessary for the approved hypothesis.
5. Stop if the endpoint is out of scope, the response is ambiguous, or the request causes an unexpected effect.

## Observations And Interpretation

| Observation | Interpretation |
|---|---|
| GraphQL-shaped validation or operation response | Candidate GraphQL surface; proceed only within scope. |
| Generic HTTP error or HTML response | May be a proxy, route, or authentication boundary, not evidence of GraphQL. |
| Authentication or persisted-operation rejection | Record the boundary; do not attempt alternate encodings or bypasses. |

## False-Positive Controls

- Compare with known normal-client behavior when possible.
- Do not infer supported methods or paths from a single gateway response.
- Treat validation errors as implementation clues, not schema evidence or a vulnerability.

## Evidence

Capture the approved endpoint, method, content type, authentication label, redacted response classification, timestamp, and stop-condition result.

## Remediation

Expose GraphQL only on intended routes, apply consistent authentication and request validation at the gateway and application layers, and document supported transports.

## Sources

- PortSwigger: https://portswigger.net/web-security/graphql
- OWASP GraphQL Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html
