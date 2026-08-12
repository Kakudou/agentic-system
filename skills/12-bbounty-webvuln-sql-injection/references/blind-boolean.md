# Blind SQL Injection Through Conditional Responses

Use conditional-response testing when query output and database errors are hidden but a request changes predictably when a database predicate is true versus false. Examples include a stable banner, response length, redirect, item count, or JSON field. Do not begin extraction until the two controls are repeatable.

## Establish a reliable oracle

1. Capture at least three baseline responses with a known-good input and a fixed authenticated session.
2. Send paired, syntactically comparable predicates: one unambiguously true and one unambiguously false. Change nothing else.
3. Compare stable features rather than raw bodies: status, redirect target, marker presence, normalized length, and selected JSON values.
4. Repeat the pair in alternating order. Confirm that true consistently maps to one outcome and false to another, while ordinary baselines remain stable.

An isolated difference is insufficient. Cache variation, personalization, rate limits, anti-automation pages, expired state, and a broken application branch commonly imitate a boolean oracle.

## Inference, with scope limits

After confirmation, test benign facts first, such as whether a fixed condition is evaluated or the length of a non-sensitive version string. Character-by-character inference conceptually asks a predicate about one position. Equality checks are easy to explain; ordered comparisons permit binary search and fewer requests. Function names and case behavior vary by DBMS (`SUBSTRING` versus `SUBSTR`, collation differences), so validate on a harmless known value before applying an approach elsewhere.

Use a request budget, one concurrent request, fixed cookies, and a pause on any change in oracle reliability. Automated tools must preserve paired controls, record raw timing and response classifications, and stop rather than guess on ambiguous results. Do not retrieve credentials, tokens, or bulk records merely because inference works.

## Safe proof, impact, and fix

A concise proof is the repeated true/false pair and its deterministic response marker, optionally corroborated by one non-sensitive server fact. Redact session identifiers. The impact is unauthorized influence over a database predicate; data exposure requires separately demonstrated, authorized evidence. Fix the query with parameters, remove dynamic SQL construction, and retest the exact pair after deployment.

## Sources

- https://portswigger.net/web-security/sql-injection/blind
- https://portswigger.net/web-security/sql-injection/cheat-sheet
