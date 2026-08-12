# Safe NoSQL Assessment Techniques

## Purpose and Preconditions

Use this reference to select a low-impact test method after mapping a specific input to a query-model hypothesis. Require explicit authorization, a stable baseline, a non-sensitive test record, and a defined request budget. The goal is to test validation boundaries, not retrieve data or alter access.

## Bounded Assessment Steps

1. Choose one input and one hypothesis: scalar-versus-structure handling, documented filter validation, or server-owned query-option enforcement.
2. Establish one baseline using the expected type and known test record.
3. Make a single minimal invalid structural or type variation appropriate to the documented contract.
4. Compare only status, validation category, response schema, and available sanitized audit evidence.
5. Re-run the baseline, then repeat the same differential once if it did not cause a stop condition.
6. Confirm only when a controlled test record and independent evidence show that untrusted structure crossed into query construction.

Use [bounded assessment cases](nosql-payloads.md) for case selection and the [decision matrix](../assets/input-type-operator-assessment-matrix.md#decision-matrix) for disposition.

## Safe Confirmation

The strongest confirmation is source review or an application log demonstrating that a user-controlled key, value type, or query option reached a database query builder contrary to the API contract. If that evidence is unavailable, require repeatable behavior limited to a test record and an explanation that excludes validation, cache, and default-query behavior. Do not escalate to authentication testing, record enumeration, extraction, timing manipulation, or expression execution.

## Observation and Interpretation

| Signal | Meaning | Disposition |
|---|---|---|
| Invalid structure is rejected before data access | Control appears effective | Negative evidence. |
| Different validation path without query corroboration | Parser hypothesis only | Inconclusive. |
| Contract-violating structure changes test-record query semantics and is corroborated | Candidate injection | Report minimal proof. |
| Any broader visibility or authorization effect | Potentially serious, outside safe confirmation | Stop and escalate. |

## False-Positive Controls

Normalize test conditions: request identity, test record, headers, pagination, cache state, feature flags, and response representation. Ensure a difference is not due to search indexing, automatic type casting, empty-value defaults, error normalization, rate limiting, or an application-level filter.

## Evidence

Record hypothesis, contract, baseline/differential summaries, repeatability, environmental controls, source or log corroboration, and every stop decision. Redact identifiers and exclude response bodies beyond the test record.

## Remediation

Use typed request schemas and data-transfer objects; translate documented filters through server-owned allowlists; reject unsupported nesting and types; do not merge request bodies into query objects; enforce authorization predicates outside client-controllable filters. See [prevention and remediation](prevention.md).

## Further Reading

- PortSwigger: <https://portswigger.net/web-security/nosql-injection>
