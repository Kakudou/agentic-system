# NoSQL Injection Basics

## Purpose and Preconditions

Use this reference to decide whether a request can cross from application data into query structure. Require explicit authorization, a bounded endpoint, a known-good baseline, and a non-sensitive test record where possible.

NoSQL injection is not a property of a database brand. It occurs when application-controlled query structure, such as keys, operators, expression fragments, sort or projection specifications, is influenced by untrusted input instead of being fixed by application code.

## Input and Data-Model Mapping

Document the external field, transport encoding, expected scalar or collection type, deserialization layer, server-side validation, data-store adapter, and resulting query role. Document, key-value, graph, search, and wide-column systems differ, but the same boundary applies: user data must not become executable query syntax or query metadata.

Complete the [database and query-model coverage worksheet](../assets/database-query-model-coverage-worksheet.md) before testing.

## Safe Bounded Assessment

1. Capture one normal request and response shape using a test value.
2. Determine from the API contract whether the field is intended to be scalar, list, object, filter, sort, or projection.
3. For scalar fields only, make one minimal representation change that should fail schema validation rather than alter query semantics.
4. Compare status, validation category, response shape, and available sanitized server-side evidence.
5. Restore the baseline and stop when the behavior is not safely bounded.

Do not test credential-bearing inputs, query expressions, server-side JavaScript, regular expressions, aggregation pipelines, or broad-selection behavior. Do not infer a database product from a generic error message.

## Authorization-Effect Boundaries

An unexpected difference in authorization is a stop condition, not an invitation to validate further. If an observation changes authentication state, permission outcome, object ownership, tenant boundary, or visible result set outside the test record, stop, preserve sanitized evidence, and use the program's validation channel. Do not access another user's data or demonstrate account access.

## Observation and Interpretation

| Observation | Interpretation | Next action |
|---|---|---|
| Structured input rejected by schema validation | Expected defense signal | Record as negative evidence. |
| Stable parser error before application handling | Possible input-handling issue, not proof of injection | Check encoding and framework behavior. |
| Repeatable change on a test record with corroborating logs or source review | Candidate query-structure boundary failure | Proceed to safe confirmation. |
| Different response with cache, rate limit, or default behavior present | Likely confounded | Reset conditions and repeat once. |

## False-Positive Controls

Use the same method, headers, role, test record, response representation, and request spacing for baseline and differential. Account for API gateway normalization, JSON parser differences, ORM or ODM casting, content negotiation, pagination defaults, caching, and asynchronous indexing. A single error, status code, or latency change is insufficient.

## Evidence

Record the endpoint and authorized scope, expected input contract, sanitized baseline/differential metadata, repeatability count, test-record identifier, relevant logs or code location, and stop decision. Retain no sensitive response body, secret, or credential.

## Remediation

Use explicit request schemas and typed DTOs, reject unexpected object and array forms, construct query structure from server-owned allowlists, and enforce authorization independently of query selection. See [prevention and remediation](prevention.md).

## Further Reading

- PortSwigger: <https://portswigger.net/web-security/nosql-injection>
