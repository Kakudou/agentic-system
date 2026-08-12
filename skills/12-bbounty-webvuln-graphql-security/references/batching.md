# Batching Assessment

## Purpose

Assess whether a GraphQL implementation safely handles an explicitly permitted, very small transport batch without amplifying effective operations or bypassing relevant controls.

## Prerequisites

- Written permission for transport-batch testing, including a fixed batch-size ceiling.
- A known supported batch format from documentation or normal-client behavior.
- Benign read-only controlled operations, baseline observations, and stop conditions.

## Bounded Authorized Workflow

1. Establish a single-operation baseline using a controlled read.
2. If documented support exists, make one batch at or below the approved small ceiling using equivalent known-safe operations.
3. Observe acceptance, per-operation errors, visible accounting, and resource-warning signals.
4. Stop on rejection, elevated latency, partial failure, throttling, resource warnings, or unexpected data.
5. Do not probe alternate batch encodings, mix mutations, increase batch size, or repeat requests to measure degradation.

## Observations And Interpretation

| Observation | Interpretation |
|---|---|
| Batch format rejected | May be intentional; record and stop. |
| Batch accepted with independent validation and accounting | Expected behavior. |
| Batch accepted | Not a finding without evidence of a material control failure. |
| Mixed or inconsistent authorization results | Investigate only through the object/action authorization workflow. |

## False-Positive Controls

- Confirm batching is actually supported rather than accepted by a proxy.
- Compare equivalent controlled operations, not different data shapes.
- Do not use timing alone as proof of resource exhaustion or an N+1 condition.

## Evidence

Capture batch permission and ceiling, normal baseline, one redacted batch outcome, visible controls, stop status, and relevant server-provided error identifiers.

## Remediation

Limit batch size and aggregate cost before execution, authenticate and authorize each operation independently, and apply operation-aware quotas.

## Sources

- PortSwigger: https://portswigger.net/web-security/graphql
- OWASP: https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html#query-limiting-depth--amount
