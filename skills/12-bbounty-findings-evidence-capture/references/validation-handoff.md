# Validation and Handoff

## Purpose

Prepare a bounded review package that separates observed evidence from interpretation and never turns a handoff into authorization for more testing.

## Preconditions

- Scope, provenance, classification, integrity status, and redaction decisions are recorded.
- The recipient and approved reporting channel are known.

## Documentation Method

Review each stated fact against one or more artifact IDs. Label assertions `observed`, `corroborated`, or `inconclusive`; list competing explanations and missing context. Package only the minimal permitted evidence, its manifest, custody record, limitations, and any exact approval requested. Complete the [evidence handoff template](../assets/evidence-handoff-template.md).

## Privacy and False-Claim Controls

Do not describe a finding as confirmed solely because an artifact exists. Do not infer impact, ownership, severity, exploitability, or reproduction beyond direct evidence. Block broad handoff when restricted originals, sensitive material, unresolved scope, or failed integrity checks require escalation.

## Evidence and Handoff

State the approved recipient/channel, evidence access restrictions, validation status, limitations, retention instruction, and explicit authorization required for follow-up. Preserve the distinction between a reviewer request and permission to act.

## Sources

- [OWASP Vulnerability Disclosure Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Vulnerability_Disclosure_Cheat_Sheet.html)
- [ISO/IEC 29147: Vulnerability Disclosure](https://www.iso.org/standard/72311.html)
