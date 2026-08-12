# Validation and Handoff

## Purpose

Turn passive client-artifact observations into a bounded, reviewable handoff without converting leads into findings or performing additional validation.

## Preconditions

- Artifact provenance, scope decisions, and redaction status are recorded.
- The recipient and approved reporting channel are known.
- Any sensitive observation has been stopped and handled under program rules.

## Method

Review each entry for a direct source, timestamp, scope status, and clear separation between fact and interpretation. Seek a second independent passive observation only if it remains in scope and needs no additional request or interaction. Mark unresolved items `inconclusive` or `needs-approval`; do not test them.

## Interpretation and Scope Controls

Confidence measures support for the recorded observation, not exploitability, impact, or ownership. Cache variation, client differences, third-party delivery, stale artifacts, and limited session coverage are common explanations. Do not use a handoff to authorize new collection or testing.

## Stop and Redaction

Block handoff until sensitive values, request bodies, session identifiers, and personal data are removed or routed through the program-approved restricted channel. If redaction would remove the necessary context, escalate rather than broadening distribution.

## Evidence and Handoff

Complete the [recon handoff template](../assets/recon-handoff-template.md) and attach only redacted, access-controlled evidence. State scope, confidence, limitations, stop decisions, and the exact authorization required for proposed follow-up.

## Sources

- [OWASP Vulnerability Disclosure Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Vulnerability_Disclosure_Cheat_Sheet.html)
