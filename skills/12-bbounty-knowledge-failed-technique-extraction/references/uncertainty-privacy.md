# Uncertainty and Privacy Controls

## Purpose

Ensure learning records state the limits of their evidence and minimize exposure of sensitive information.

## Preconditions

- An admitted evidence set and known handling restrictions.
- A proposed learning statement, confidence level, and intended handoff recipient.

## Documentation Method

Classify each statement as observed, derived, or unknown. Assign confidence only with a short rationale based on source quality, corroboration, and known limits. Replace sensitive values with a minimal redacted description, or reference restricted evidence by identifier. Use the [privacy/stop checklist](../assets/privacy-stop-checklist.md) before sharing.

## False-Claim and Privacy Controls

Confidence is not probability, reproducibility, exploitability, or causation. Do not make claims beyond the evidence boundary. Exclude secrets, authentication material, personal data, private content, unnecessary target identifiers, and operational instructions. Stop and escalate when disclosure, retention, consent, scope, or recipient authorization is uncertain.

## Evidence and Handoff

Attach the confidence rationale, unknowns, redaction status, access restriction, and stop or escalation decision to the learning record. Give restricted material only to the approved recipient through the approved channel.

## Sources

- [NIST Privacy Framework](https://www.nist.gov/privacy-framework)
- [NIST SP 800-122, Guide to Protecting the Confidentiality of Personally Identifiable Information](https://csrc.nist.gov/pubs/sp/800/122/final)
