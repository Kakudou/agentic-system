# Route And Method Classification

## Purpose

Classify observed route behavior without converting conventions or client hints into claims.

## Preconditions

- A route has a scope-confirmed source record.
- Method or parameter evidence comes from an authorized observed request, target documentation, or separately approved low-impact validation.

## Methodology

Transcribe the method and parameter names/types visible in the evidence. Mark their origin and authentication context. Where the engagement explicitly authorizes a low-impact validation, use only the approved action and record the approval, exact request identity, and outcome; otherwise leave support unconfirmed.

## Interpretation

Classify REST, RPC, GraphQL, or another interface only when protocol evidence supports the label. A route path alone does not establish protocol, permitted methods, parameter optionality, mutation behavior, or authorization requirements. Report observed methods independently rather than implying unobserved alternatives.

## False-Positive And Scope Controls

Framework defaults, generated clients, error messages, and `Allow`-style metadata can be stale, intermediary-generated, or policy-dependent. Do not treat them as execution proof. Redact parameter values and avoid recording secrets or personal data.

## Evidence And Handoff

Use the confidence matrix to show the source, corroboration, conflicts, and classification boundary. Escalate any required method variation, schema inspection, or mutation test for explicit approval.

## Authoritative Sources

- [IETF RFC 9110: HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110)
- [GraphQL Specification](https://spec.graphql.org/)
- [JSON-RPC 2.0 Specification](https://www.jsonrpc.org/specification)
