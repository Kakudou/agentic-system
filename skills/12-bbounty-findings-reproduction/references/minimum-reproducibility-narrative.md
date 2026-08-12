# Minimum Reproducibility Narrative

## Purpose And Preconditions

Describe the smallest safe context needed to understand an already observed condition. Require admitted evidence and an approved reviewer path. This narrative is not an operational procedure and must not enable replay or impact expansion.

## Documentation Methodology

State the affected asset, time window, relevant non-secret condition, observed outcome, evidence references, and expected observation to be independently assessed. Describe dependencies such as role category, feature state, or environment at a high level. Replace details that could enable misuse with a restricted evidence reference and reviewer access condition.

## False-Claim And Privacy Controls

- Label the result as an observation context until independently validated.
- Exclude commands, payloads, request sequences, credentials, tokens, session material, and production identifiers.
- Do not represent a missing repeat observation as proof that the original evidence is false; record the limitation.

## Evidence And Handoff

Complete the [static reproduction record](../assets/reproduction-record-template.md). Name the evidence supporting each statement and the precise reviewer question, rather than telling the reviewer how to test.

## Sources

- OWASP Web Security Testing Guide, [Reporting](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/91-Reporting/README)
- HackerOne, [Vulnerability Disclosure Guidelines](https://www.hackerone.com/vulnerability-disclosure-guidelines)
