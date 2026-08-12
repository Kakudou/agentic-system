# Scope And Evidence Admission

## Purpose

Admit only supplied reconnaissance material that can support a bounded inventory claim.

## Preconditions

- Written authorization identifies the program or owner, in-scope boundaries, exclusions, permitted evidence types, handling rules, and stop contact.
- Each artifact has a source identifier, provider or collector, collection time, locator, and intact relevant excerpt.

## Method

1. Record the authorization and handling boundary before reading content.
2. Admit an observation only when its source and locator permit later review.
3. Transcribe the minimum relevant observation into the matrix; retain the original identifier and timestamp.
4. Mark evidence as `admitted`, `context-limited`, or `rejected`. Rejection preserves only enough metadata to explain why.

## Interpretation And Controls

Evidence proves only what it directly records at its collection time. A source mentioning a name, hostname, address, certificate subject, repository string, or vendor label does not independently establish ownership, scope, current operation, or authorization. Do not supplement gaps with active discovery.

## Privacy, Scope, And Handoff

Minimize personal data, credentials, tokens, unrelated content, and sensitive locators. Redact before sharing and record that a redaction occurred. Stop and escalate scope ambiguity, sensitive-data exposure, or provenance failure. Hand off admitted evidence IDs and rejection reasons, never raw secrets.

## Authoritative Sources

- [NIST SP 800-86, Guide to Integrating Forensic Techniques](https://csrc.nist.gov/pubs/sp/800/86/final)
- [CISA, Vulnerability Disclosure Policy Platform](https://www.cisa.gov/vulnerability-disclosure-policy-platform)
