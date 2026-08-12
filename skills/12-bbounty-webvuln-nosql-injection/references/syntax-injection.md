# Syntax and Parser Differentials

## Purpose and Preconditions

Use this reference when an endpoint translates URL, form, JSON, or GraphQL input into a NoSQL query language or expression. Require authorized scope, a normal request, a documented expected type, and a low request budget.

## Safe Bounded Assessment

1. Hold method, headers, identity, and test value constant while recording a baseline.
2. Compare one encoding or type boundary at a time, using a representation that is invalid for the documented field rather than a query-language fragment.
3. Observe validation class, response schema, and sanitized diagnostics if they are already available.
4. Return to the baseline after each comparison and repeat only once when the result is stable.
5. Stop if the endpoint exposes additional records, changes authorization, performs a state change, or becomes slow or unstable.

Do not use syntax-breaking strings, null-byte techniques, conditional expressions, regular-expression patterns, timing tests, or scriptable query features.

## Observation and Interpretation

An error may originate in the client, gateway, framework parser, schema validator, query adapter, or database. Treat only a reproducible change that is corroborated at the query-construction boundary as a candidate. A generic database-like error or a different HTTP status is not confirmation.

## False-Positive Controls

Check content-type negotiation, URL decoding depth, duplicate-key handling, form-to-object parsing, JSON parser behavior, Unicode normalization, WAF transformations, and retry or cache effects. Use application logs or source review when authorized to locate the rejecting layer.

## Evidence

Capture the intended schema, exact transport class, sanitized outcome categories, response metadata, repeatability, and corroborating log or code location. Exclude raw sensitive content.

## Remediation

Parse once, validate against a strict schema immediately, reject unknown keys and incompatible types, and pass typed values rather than raw request structures to the data layer. See [validation guidance](validation.md).

## Further Reading

- PortSwigger: <https://portswigger.net/web-security/nosql-injection>
