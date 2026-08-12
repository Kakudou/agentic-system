# SQL Injection Prevention

## Primary control: parameterize values

Build SQL text from fixed application literals and bind every untrusted value as a parameter. Prepared statements separate query structure from data, so a quote in a request remains a value rather than syntax. Apply this to `SELECT`, `INSERT`, `UPDATE`, and `DELETE`, including values received indirectly from databases, queues, or internal services.

Review the whole data path: a query is not protected if a later layer concatenates a supposedly trusted value. Second-order SQLi often arises when safely stored input is later reused as SQL text.

## Dynamic identifiers need a different design

Parameters generally cannot represent table names, column names, sort directions, or other SQL grammar. Do not escape arbitrary identifier input. Map a small, allowlisted set of user-facing choices to fixed SQL fragments, or redesign the feature so the server chooses the query shape. Reject values outside the mapping before query construction.

## ORM and query-builder boundaries

An ORM is protective only while its parameter-binding APIs are used. Audit raw-query, interpolation, expression, filter, and ordering escape hatches. Treat a query-builder method that accepts raw SQL as equivalent to hand-written concatenation. Tests should cover hostile punctuation in every supported input channel, including JSON, cookies, headers, and persisted profile fields.

## Reduce blast radius and preserve useful evidence

Use a database identity with only the application permissions it requires; it should not administer users, alter schema, access unrelated databases, or invoke operating-system features. Disable unnecessary dangerous extensions and outbound capabilities. Return generic client errors while retaining correlated, access-controlled server-side diagnostics. Verbose SQL errors simplify exploitation and leak implementation details.

Input validation improves correctness and reduces attack surface, but it is not a substitute for parameterization. WAF signatures and escaping routines also cannot reliably secure every SQL context.

## Fix verification

1. Identify the vulnerable query construction and replace concatenation with bound values.
2. Add allowlists for any unavoidable dynamic identifier.
3. Re-run the original true/false or syntax differential using an authorized test account; the application should preserve normal behavior without SQL-dependent divergence.
4. Confirm errors are generic externally and actionable only in protected logs.
5. Review the runtime database grants and document remaining justified exceptions.

## Sources

- https://portswigger.net/web-security/sql-injection
- https://portswigger.net/web-security/sql-injection/blind
