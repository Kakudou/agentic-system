# Alias Assessment

## Purpose

Assess whether an approved small alias comparison is counted and constrained consistently with equivalent individual operations. Aliases are a query-shaping feature, not permission to bypass rate limits or test high-volume values.

## Prerequisites

- Explicit authorization for alias testing with a fixed maximum alias count.
- A benign read-only operation and controlled values already known to be valid.
- A baseline observation and agreed latency/error stop condition.

## Bounded Authorized Workflow

1. Record the normal single-operation baseline.
2. Send at most one authorized comparison using the agreed small number of aliases and the same controlled values.
3. Observe validation, rate-limit accounting where visible, response semantics, and resource-warning signals.
4. Stop immediately on elevated latency, errors, throttling, resource warnings, or unexpected data.
5. Do not test authentication, discount, token, credential, or other guessable-value operations with aliases.

## Observations And Interpretation

| Observation | Interpretation |
|---|---|
| Request rejected by alias/count control | Expected protective behavior. |
| Small alias request accepted | Normal GraphQL behavior unless cost/accounting evidence shows a material control gap. |
| Alias request is counted equivalently to individual operations | Supports rate-limit and cost-control enforcement. |
| Unexpected access to protected data | Assess as authorization, not merely alias, evidence. |

## False-Positive Controls

- Compare identical controlled values and response shapes.
- Do not infer server-side execution count from client timing alone.
- Rule out CDN, cache, network variance, and documented bulk-read capabilities.

## Evidence

Record authorized alias ceiling, baseline and one comparison summary, observed control behavior, timing as supporting data only, stop-condition state, and redacted request metadata.

## Remediation

Apply query-cost and alias-count limits before execution, account for resolver cost rather than HTTP request count alone, and rate-limit sensitive operations per effective operation.

## Sources

- PortSwigger: https://portswigger.net/web-security/graphql#bypassing-rate-limiting-using-aliases
- OWASP GraphQL Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html#query-limiting-depth--amount
