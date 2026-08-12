# Minimal Reproducibility Record

## Purpose

Record the minimum safe context a reviewer needs to understand and validate an already observed condition. It is not a procedure for testing, exploitation, payload construction, or impact expansion.

## Preconditions

- The observed condition is linked to admitted evidence.
- The program allows the intended reviewer to access the referenced material.

## Documentation Method

State the affected asset, relevant non-secret state or configuration, observation time window, evidence reference, and expected observable result. Describe boundaries such as account role, feature state, or environmental dependency at a high level. If a detail would enable misuse or expose protected data, replace it with a controlled-evidence reference and access requirement.

## False-Claim And Privacy Controls

- Do not claim reproducibility until an authorized reviewer independently confirms it.
- Do not include commands, payloads, credentials, tokens, production identifiers, or operational sequences.
- Do not imply that absence of a repeated observation disproves the original evidence; record the limitation.

## Evidence And Handoff

Label the record “observation context” until independent validation. Identify the reviewer role, evidence access path, and validation question rather than prescribing actions.

## Sources

- OWASP Web Security Testing Guide, [Reporting](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/91-Reporting/README)
- HackerOne, [Vulnerability Disclosure Guidelines](https://www.hackerone.com/vulnerability-disclosure-guidelines)
