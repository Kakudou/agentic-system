# Schema and Parameter Contract Mapping

## Purpose and Preconditions

Map permitted inputs and outputs for an approved operation before controlled testing. Requires an approved operation, test account, test object, and a source contract or owner confirmation.

## Bounded Authorized Methodology

Document required and optional fields, type, format, allowed range or vocabulary, nullability, mutability, defaults, and response visibility. Make only one manual, contract-relevant variation at a time on a dedicated test object. Use an invalid or boundary value only when the written scope permits it and the request is reversible; never add guessed fields or replay bulk requests.

## Observations and Interpretation

Compare acceptance, rejection, normalization, and error handling to the documented contract. Acceptance of an unrecognized property, unexpected coercion, or a response exposing a field outside the role's contract is an observation requiring safe confirmation, not proof of exploitability.

## False-Positive Controls

Rule out client-side-only validation, server defaults, asynchronous processing, stale reads, and schema version mismatch. Re-establish the known-good baseline between comparisons.

## Stop Conditions

Stop on an unexpected state change, error suggesting instability, unapproved field, unclear ownership, or any need to use a non-test object.

## Evidence

Capture the contract citation, redacted baseline and variation metadata, response status, validation message category, and test-object state before and after.

## Remediation

Enforce server-side schema validation, explicit allowlists for writable fields, type and range checks, canonicalization, and contract tests for rejected fields.

## Sources

- [PortSwigger: API testing](https://portswigger.net/web-security/api-testing)
- [OWASP API3:2023 Broken Object Property Level Authorization](https://owasp.org/API-Security/editions/2023/en/0xa3-broken-object-property-level-authorization/)
