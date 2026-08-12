# Query Inputs

## Purpose

Classify names and value shapes already present in the query component of an approved, naturally generated request.

## Preconditions

The endpoint and navigation are in scope, and the request was produced under the request contract. Read [scope and request-contract baseline](scope-contract.md) first.

## Method

Record query names, repeated-name behavior, empty versus present values, and URL encoding as observed. Do not add, remove, rename, or substitute query values.

## Interpretation And Controls

A query name indicates client transmission, not server-side use or requiredness. Redirect, analytics, cache-busting, and UI-state fields are common false positives. Keep endpoint, method, source locator, and confidence with each record.

## Evidence And Handoff

Use the worksheet's input row and classify the result through [input location and type classification](input-classification.md). Hand off only redacted value shapes.

## Sources

- RFC 3986, URI generic syntax: https://www.rfc-editor.org/rfc/rfc3986
- WHATWG URL Standard: https://url.spec.whatwg.org/
