# Redaction, Privacy, and Retention

## Purpose

Preserve enough context for review without copying, exposing, or retaining sensitive material beyond the authorized need.

## Preconditions

- The engagement's reporting channel, retention rules, and escalation contact are known.
- Storage and sharing controls are appropriate for the evidence classification.

## Documentation Method

Classify before sharing. For credentials, session material, personal data, payment data, private source, internal configuration, or customer content, record the category, artifact ID, minimal redacted locator, observation time, and access restriction. Redaction must be irreversible in the shared derivative; keep any authorized original separate and access-controlled. Use the [artifact and redaction classification matrix](../assets/artifact-redaction-classification-matrix.md).

## Privacy and False-Claim Controls

Do not copy, decode, replay, validate, or describe sensitive values. A value-like string is not proof of a valid secret. If a redaction removes material needed to evaluate the claim, mark the evidence restricted and escalate through the approved channel rather than widening disclosure. When classification is uncertain, treat it as sensitive.

## Evidence and Handoff

Record the sensitivity class, derivative/original relationship, redaction decision, retention deadline or governing rule, restricted recipient, and whether collection stopped. State explicitly that no validity testing of sensitive material occurred.

## Sources

- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [CISA: Protecting Sensitive and Personal Information](https://www.cisa.gov/topics/cyber-threats-and-advisories)
