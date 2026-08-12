# Integrity, Validation, and Handoff

## Purpose and Preconditions

Allow an authorized reviewer to assess a sensitive-data finding without unnecessary disclosure. Require admitted evidence, a classification, approved recipient/channel, and documented retention/access boundary before handoff.

## Documentation Method

For each artifact or derivative, record stable ID, provenance, observation window, class, handling state, and integrity identifier when available. Identify what fact it supports, what cannot be concluded, and any mismatch between original and derivative. Do not manufacture an integrity identifier or treat metadata as proof of content.

## Privacy, Legal, and Scope Controls

Validate the report against the minimum-necessary rule: facts must be supported, the recipient must be authorized, and the package must not contain unnecessary restricted data. Stop the handoff if integrity, classification, recipient, channel, or retention is unresolved. Do not disclose originals to obtain validation.

## Evidence and Handoff

Use the restricted handoff template to deliver supported facts, classifications, artifact references, limitations, and a bounded request for next steps. Record receipt or reviewer decision only when actually confirmed. Escalate a need for additional evidence as an authorization request, not as permission to collect or expose more data.

## Sources

- OWASP, [Vulnerability Disclosure Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Vulnerability_Disclosure_Cheat_Sheet.html)
- NIST, [SP 800-86: Integrating Forensic Techniques](https://csrc.nist.gov/pubs/sp/800/86/final)
- FIRST, [Guidelines for Multistakeholder Vulnerability Coordination](https://www.first.org/global/sigs/vulnerability-coordination/guidelines)
