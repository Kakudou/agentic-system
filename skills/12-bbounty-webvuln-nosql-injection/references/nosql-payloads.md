# Bounded Assessment Cases

## Purpose and Preconditions

This reference replaces payload lists with safe case categories. Use it only after authorization, request-to-data-model mapping, a baseline, and identification of a non-sensitive test record. Do not derive or substitute exploit syntax from these cases.

## Cases

| Case | Preconditions | Safe bounded assessment | Expected safe behavior |
|---|---|---|---|
| Scalar field | API documents a string, number, boolean, or identifier | Submit one incompatible structural representation | Request rejected by schema before query access. |
| Array field | API documents a finite list with element type | Compare an allowed list with one invalid element type | Invalid element rejected; no silent query reinterpretation. |
| Filter object | API publishes a restricted filter grammar | Test one undocumented key or nesting level | Unknown structure rejected or ignored consistently. |
| Sort or projection option | API allows named server-approved options | Test one name outside the documented allowlist | Unsupported option rejected; no new fields exposed. |
| Content encoding | Endpoint accepts multiple encodings | Compare equivalent valid values across encodings | Same typed value and authorization outcome. |

## Observation and Interpretation

Rejecting malformed input is expected and is not a vulnerability. A case becomes a candidate only if an input that contradicts the contract reaches query construction and produces a repeatable, test-record-limited semantic change corroborated by logs or source review.

## False-Positive Controls

Keep the route, method, identity, test record, pagination, and cache conditions fixed. Distinguish gateway parsing, framework coercion, and application validation from database query behavior. Do not use a different result count as proof unless the result is strictly the known test record and corroborated.

## Evidence

Record case category, expected contract, sanitized baseline/differential metadata, response shape, repeatability, corroboration, and stop condition. Do not record payload strings, credentials, response bodies, or unrelated records.

## Remediation

Apply strict request validation, allowlist filter and option names, type-check elements recursively, and translate client inputs into server-owned query builders. See [prevention and remediation](prevention.md).

## Further Reading

- PortSwigger: <https://portswigger.net/web-security/nosql-injection>
