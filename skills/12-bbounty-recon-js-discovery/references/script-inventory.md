# Script Provenance and Client Artifact Inventory

## Purpose

Create a bounded record of JavaScript artifacts already delivered to an authorized browser. The inventory establishes where an observation came from; it is not a collection plan or a claim about application functionality.

## Preconditions

- Current written authorization identifies the allowed origins, pages, browser/session context, and rate limits.
- The artifact was visible during ordinary authorized navigation or in an approved browser-network record.
- Evidence storage can restrict access and redact sensitive values.

## Method

Record one row per browser-delivered artifact in the [client-artifact and evidence worksheet](../assets/client-artifact-evidence-worksheet.md). Preserve only the source page, artifact URL or safely minimized identifier, observed origin, delivery context, timestamp, content type, and visible integrity/cache metadata. Mark third-party, redirected, ambiguous, and out-of-scope origins distinctly. Do not request an artifact separately, follow references, or infer ownership from a domain name alone.

## Interpretation and Scope Controls

An artifact observed on a page demonstrates browser delivery in that session, not target ownership, current use, or security impact. Hashed filenames, framework labels, and cache headers are identifiers or delivery hints, not proof of version, route coverage, or deployment state. A browser extension, proxy, cache, service worker, or third-party tag can affect what is visible; record these as limitations.

## Stop and Redaction

Stop and isolate the record if an artifact view exposes credentials, session material, personal data, internal-only content, or an unapproved origin. Do not copy the value. Record the category, context, and stop decision only, then apply the [sensitive-data checklist](../assets/sensitive-data-stop-redaction-checklist.md).

## Evidence and Handoff

Retain a timestamped, redacted browser observation and the scope decision. Assign confidence using the [provenance and confidence matrix](../assets/provenance-confidence-matrix.md); unresolved ownership or scope goes to handoff as `needs-review`.

## Sources

- [OWASP Web Security Testing Guide: Information Gathering](https://owasp.org/www-project-web-security-testing-guide/)
- [MDN: `<script>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script)
