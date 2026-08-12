# Prevention and Remediation

## Purpose and Preconditions

Use this reference to turn confirmed or suspected query-structure exposure into an implementation-focused remediation plan. Recommendations must match the application's transport, schema, data-access layer, and authorization model.

## Safe Bounded Validation Steps

1. Define the public request schema separately from the database query model.
2. Verify scalar fields reject object and array representations, including nested forms.
3. Translate documented filters, sorting, and projections using server-owned allowlists of fields, directions, and supported operations.
4. Confirm request objects are not merged, spread, or passed wholesale into data-access APIs.
5. Ensure tenant, ownership, and privilege restrictions are fixed server predicates, not client-provided filters.
6. Retest only the original bounded differential using a non-sensitive test record.

## Observation and Interpretation

Successful remediation produces consistent schema rejection or safe normalization before query construction. A generic sanitization layer or WAF may be defense in depth but does not replace typed validation and server-owned query composition.

## False-Positive Controls

Review all supported encodings and API versions, nested input paths, background jobs that share the data-access helper, and administrative endpoints under their own authorization. Confirm that legitimate documented filters remain functional and correctly scoped.

## Evidence

Capture the affected input contract, remediation commit or configuration location, post-fix bounded test result, authorization control location, and any untested paths or residual risk.

## Remediation

Prioritize these controls:

1. Strict schemas with unknown-key rejection and recursive type validation.
2. Server-built query objects with allowlisted fields and fixed query metadata.
3. Safe data-access abstractions that accept typed values rather than arbitrary query documents.
4. Independent authorization predicates and least-privilege database identities.
5. Regression tests for scalar, object, array, nested, and alternate-encoding boundaries.

## Further Reading

- PortSwigger: <https://portswigger.net/web-security/nosql-injection>
