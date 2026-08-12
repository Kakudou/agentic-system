# Database and Query-Model Coverage Worksheet

Complete this worksheet before testing. Unknown fields are valid results; do not guess the database or query model.

| Area | Record | Evidence source | Confidence |
|---|---|---|---|
| Authorized target | Host, route, method, program constraints | Scope statement | High / medium / low |
| Caller context | Test account or role, tenant, test-record identifier | Engagement setup | High / medium / low |
| Transport | JSON, form, URL, GraphQL, RPC, other | Captured normal request | High / medium / low |
| External field | Name, expected type, required/optional, documentation | API contract or UI behavior | High / medium / low |
| Parser boundary | Gateway, framework, schema library, unknown | Headers, logs, source review | High / medium / low |
| Query role | Data value, filter, sort, projection, pagination, unknown | Contract or source review | High / medium / low |
| Data model | Document, key-value, search, graph, wide-column, unknown | Maintainer/source/telemetry | High / medium / low |
| Data-access boundary | Mapper, repository, query builder, direct driver, unknown | Authorized source or logs | High / medium / low |
| Authorization predicate | Fixed server rule, tenant filter, ownership rule, unknown | Source review or design docs | High / medium / low |
| Baseline | Status, response schema, test-record scope, audit correlation | Manual baseline request | High / medium / low |

## Coverage Decision

Proceed only if the external field, expected type, baseline, and test-record scope are known. Prefer source or log corroboration when the query role or data model is unknown. Stop and request clarification when testing could affect authentication, authorization, unrelated records, or system load.

## Review Questions

1. Is this input a value or a query instruction?
2. Is its type enforced before it reaches the data-access layer?
3. Which query metadata is constructed only by server code?
4. Is authorization fixed independently of all client-supplied filter input?
5. Can the observation remain limited to a non-sensitive test record?
