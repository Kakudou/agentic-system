# Operator and Query Behavior

## Purpose and Preconditions

Use this reference when a request field may be deserialized into an object, array, or query option rather than a scalar value. Require an explicit field contract, an authorized endpoint, a baseline, and a request budget. This is not a catalog of operators or test payloads.

## Safe Bounded Assessment

1. Classify the field as data, server-approved filter, sort, projection, pagination, or internal-only control.
2. For a scalar data field, submit at most one minimal structurally invalid representation and verify that the schema boundary rejects it.
3. For a documented filter object, verify only that its accepted keys, nesting, types, and allowed values match the published contract.
4. Keep result observations constrained to a known test record. Do not test expressions, pattern evaluation, aggregation, script execution, or broad selectors.
5. Stop on an authorization effect, unexpected records, excessive response size, or unstable service behavior.

Use the [input, type, and operator assessment matrix](../assets/input-type-operator-assessment-matrix.md) to select the permitted observation.

## Observation and Interpretation

- A scalar field that rejects object or array representations at the request boundary is a positive validation result.
- A scalar field that accepts a structure but preserves identical, test-record-only semantics needs corroboration from logs, source review, or a controlled environment.
- A filter endpoint is not vulnerable merely because it accepts structured filters. The concern is an undocumented or unbounded capability that reaches the data adapter.
- User-controlled field names, sort keys, projection fields, or nested query metadata are meaningful only when they exceed the server-owned allowlist.

## False-Positive Controls

Compare requests with identical authorization, content type, locale, pagination, and cache state. Confirm whether the framework parses bracket notation, duplicate keys, arrays, or JSON objects before the application sees them. Exclude differences caused by validation order, default filters, feature flags, tenant scoping, or search indexing.

## Evidence

Preserve the documented contract, a sanitized baseline and differential summary, response shape and status, test-record scope, log or source corroboration if available, and why the behavior cannot be explained by normal parsing.

## Remediation

Bind request fields to strict schemas, allowlist queryable fields and operators on the server, avoid passing request objects directly to database APIs, and keep projections, sorting, and authorization predicates server-owned. See [prevention and remediation](prevention.md).

## Further Reading

- PortSwigger: <https://portswigger.net/web-security/nosql-injection>
