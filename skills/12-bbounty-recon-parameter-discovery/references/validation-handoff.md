# Confidence Controls And Handoff

## Purpose

Prevent observational leads from being represented as confirmed server inputs or security findings.

## Preconditions

Each item has an in-scope endpoint/method, source locator, classification, and redacted evidence. Refer to the [confidence matrix](../assets/input-location-type-confidence-matrix.md).

## Method

Assign confidence from source quality: observed request, first-party documentation, or both. Check that the item is not a response field, UI-only label, browser default, intermediary header, unrelated cookie, stale document entry, or cross-origin artifact. No active validation occurs in this skill.

## Interpretation And Controls

Use "observed" for a naturally generated request and "corroborated" only when independent first-party documentation agrees on endpoint, method, location, and name/path. Mark discrepancies, unknown types, and client-only/documentation-only records as unconfirmed. An inventory is never an authorization to test inputs.

## Evidence And Handoff

Use the [recon handoff template](../assets/recon-handoff-template.md). Include scope constraints, sources, confidence, redactions, exclusions, and a clear statement that no mutation, guessing, fuzzing, or acceptance testing was performed.

## Sources

- OWASP Web Security Testing Guide: https://owasp.org/www-project-web-security-testing-guide/
- RFC 9110, HTTP semantics: https://www.rfc-editor.org/rfc/rfc9110
