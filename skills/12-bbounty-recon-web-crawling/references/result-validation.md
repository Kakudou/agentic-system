# Result Validation and Handoff

## Purpose and Preconditions

Use this reference before presenting crawl observations as an inventory or recon input. Ensure the scope worksheet, URL/form matrix, and minimal timestamped evidence are complete enough for an independent reviewer to understand each classification.

## Low-Impact Methodology

Normalize URLs consistently, remove fragments for deduplication, retain source provenance, and compare equivalent redirects or navigation aliases. Perform a desk review of recorded observations only; do not revisit routes merely to raise confidence unless the additional observation is within the original approval and budget.

## Observations and Interpretation

- Navigation shells, error documents, CDN resources, tracking parameters, and locale variants can inflate apparent route counts.
- A status response alone does not prove content, access level, ownership, or a security finding.
- Preserve meaningful variants when origin, path, query semantics, or access classification differs.
- Label unverified inferences as hypotheses and route them to the appropriate validation workflow.

## State-Change Avoidance

Do not use normalization as a reason to request new routes, retry blocked pages, test parameters, or follow external links. Keep secrets and unnecessary personal data out of the handoff.

## Limits, Evidence, and Handoff

Record deduplication rules, discarded aliases, false-positive rationale, scope decisions, and unresolved questions. Deliver only redacted evidence needed to reproduce the classification. See [RFC 3986](https://www.rfc-editor.org/rfc/rfc3986) for URI syntax and [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/) for testing evidence context.
