# Impact Evidence

## Purpose and Preconditions

Use after a finding is validated and only with an explicit authorized scope. This guide documents observed security effects; it does not direct additional exploitation.

## Documentation Method

For each proposed claim, record the asset, timestamp, authorization condition, observation, evidence locator, and redaction applied. Preserve the minimum evidence needed for independent review, such as a redacted response excerpt, deterministic behavior comparison, or approved product documentation. Link observations to the claim rather than treating a vulnerability class as proof of impact.

## Interpretation

An observation supports only its demonstrated effect on the tested asset and boundary. State what was observed, what it may indicate, and what was not tested. Do not generalize one account, tenant, endpoint, or environment to others without direct evidence.

## False-Claim and Privacy Controls

Do not collect unrelated records, credentials, tokens, private keys, or personal data. Redact identifiers and secrets before handoff. Mark unsupported consequences as unverified, not likely or confirmed.

## Evidence and Handoff

Use the [impact-evidence worksheet](../assets/impact-evidence-worksheet.md); include stable evidence locators, integrity-preserving originals where permitted, and redacted review copies.

## Sources

- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [CVSS v4.0 specification](https://www.first.org/cvss/v4-0/specification-document)
