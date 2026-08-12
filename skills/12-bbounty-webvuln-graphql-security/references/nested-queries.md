# Nested Query Assessment

## Purpose

Assess permitted relationship traversal for authorization consistency and bounded query-cost controls without constructing deep, broad, circular, or load-amplifying queries.

## Prerequisites

- A mapped relationship relevant to an approved authorization or cost hypothesis.
- Controlled parent and related objects with known ownership.
- An agreed maximum depth, page size, and stop condition.

## Bounded Authorized Workflow

1. Record a minimal parent-object baseline.
2. Add one approved relationship and only the fields needed to test the hypothesis.
3. Compare expected role/object access or the documented depth/cost control.
4. Do not increase depth, breadth, page size, aliases, or batch size after the initial comparison.
5. Stop on latency, errors, cost warnings, unexpected data, or any indication of asynchronous work.

## Observations And Interpretation

| Observation | Interpretation |
|---|---|
| Related controlled object is correctly denied | Supports relationship-level enforcement. |
| Related protected data is returned to an unauthorized actor | Potential relationship or field authorization flaw. |
| Depth/cost limit rejects the added relationship | Expected protective behavior. |
| Slower response | Supporting signal only; not evidence of a performance vulnerability. |

## False-Positive Controls

- Verify relationship sharing and tenant rules before claiming unauthorized access.
- Keep result size fixed and use only controlled objects.
- Do not infer N+1 behavior or denial-of-service impact from a single timing comparison.

## Evidence

Record the parent/relationship policy, approved depth and result-size limits, baseline/comparison summaries, server-side decision, timing as supplemental data, and stop state.

## Remediation

Authorize every relationship resolver, enforce depth and cost limits before execution, cap pagination, and use efficient resolver/data-loading patterns.

## Sources

- PortSwigger: https://portswigger.net/web-security/graphql#access-control-vulnerabilities
- OWASP: https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html#query-limiting-depth--amount
