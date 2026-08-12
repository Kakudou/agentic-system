# Validation Guidance

## Purpose and Preconditions

Use this reference to validate a suspected defect or a remediation without increasing access or data exposure. Require the original authorized scope, the original test record, a recorded baseline, and a defined rollback or stop path.

## Safe Bounded Assessment Steps

1. Reproduce only the original type or structure differential that created the hypothesis.
2. Verify whether the request schema rejects the input before it reaches the query adapter.
3. When source or logs are authorized, confirm the server constructs query structure from fixed code and typed values.
4. After remediation, repeat the same bounded differential once and compare with the original baseline.
5. Stop if behavior affects authorization, state, result scope, or service health.

## Observation and Interpretation

A validation error alone is insufficient if a later layer still accepts alternate encodings or nested structures. A fix is supported when equivalent invalid representations fail consistently at the intended boundary and the server no longer hands request-derived structure to the data layer.

## False-Positive Controls

Test both the original transport representation and documented alternatives. Control for deployment drift, feature flags, gateway transformations, stale caches, and test data changes. Do not claim remediation based solely on a WAF block or an altered error message.

## Evidence

Record version or deployment identity, original and post-fix sanitized outcome summaries, schema or code location, log correlation where available, test-record scope, and remaining limitations.

## Remediation

Adopt schema validation at ingress, recursive unknown-key rejection, server-owned query construction, field and option allowlists, and independent authorization enforcement. See [prevention and remediation](prevention.md).

## Further Reading

- PortSwigger: <https://portswigger.net/web-security/nosql-injection>
