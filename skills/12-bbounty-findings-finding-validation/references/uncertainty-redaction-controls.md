# Uncertainty And Redaction Controls

## Purpose

Keep validation packets useful without overstating evidence or exposing credentials, personal data, private content, or unnecessary operational detail.

## Preconditions

- A defined recipient and approved handling channel.
- Evidence IDs and original locations retained in an approved system.

## Bounded Documentation Method

1. Label each statement as observed, inferred, historical, conflicting, or unknown.
2. Replace sensitive values with a minimal descriptor and evidence reference; preserve only the metadata needed to locate the original through the approved channel.
3. Record redactions, reason, and who may access the original evidence.
4. Stop and seek direction when material cannot be safely minimized or the recipient's authorization is unknown.

## Interpretation And Uncertainty

Redaction does not weaken a claim when the recipient can inspect the original through an approved channel. It does limit independent review by other readers and must be disclosed. Uncertainty is a result, not a defect to conceal.

## False-Positive And Privacy Controls

- Never include secrets, session material, full personal records, unrelated customer data, or private third-party content in general handoff text.
- Do not transform redacted evidence into a stronger inference than the original supports.
- Stop on evidence of active harm, unexpected sensitive data, or a requirement to retain or redistribute protected material.

## Evidence And Handoff

Attach the redaction and stop checklist, evidence access instructions, uncertainty labels, and any required escalation. The recipient receives sufficient context to request authorized review without receiving unnecessary sensitive content.

## Sources

- [NIST SP 800-122](https://csrc.nist.gov/pubs/sp/800/122/final)
- [CISA Vulnerability Disclosure Policy Platform](https://www.cisa.gov/vulnerability-disclosure-policy)
