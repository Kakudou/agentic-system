# NoSQL Injection Remediation Lookup

Use this lookup after a confirmed or well-supported candidate. Apply the smallest control at the failing boundary, then validate with the original bounded differential.

| Observed weakness | Primary remediation | Defense in depth | Validation evidence |
|---|---|---|---|
| Scalar accepts object or array form | Strict schema with recursive type validation | Reject unknown keys and duplicate representations | Invalid structure fails before data access across supported encodings |
| Request object reaches query builder | Map DTO fields to a server-built query object | Static analysis or wrapper API that forbids raw request objects | Source/log review shows only typed values enter query construction |
| Undocumented filter key or nesting accepted | Allowlist filter fields, nesting, and supported operations | Versioned public filter grammar | Unsupported key/depth is rejected consistently |
| Client controls sort or projection metadata | Server allowlist of fields and fixed output views | Response DTOs and field-level authorization | Unsupported option cannot alter schema or field visibility |
| Type normalization changes semantics | Canonicalize then validate one explicit type | Contract tests for alternate transport encodings | Equivalent valid values behave identically; invalid variants reject |
| Authorization mixed with client filter | Add fixed server-owned tenant, ownership, and privilege predicates | Least-privilege database identity and authorization tests | Bounded invalid input cannot change authorization result |
| Generic sanitizer or WAF is sole control | Move validation and query composition into application layer | Retain WAF telemetry as defense in depth | Application rejects input even when perimeter control is absent |

## Regression Set

Maintain tests for each public input's expected scalar or collection type, unknown keys, nested forms, alternate encodings, documented filter limits, server-owned options, and authorization invariants. Tests should assert rejection or safe normalization, never exploit behavior.
