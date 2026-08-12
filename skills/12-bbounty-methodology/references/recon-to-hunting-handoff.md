# Recon-To-Hunting Handoff

## Purpose

Decide when admitted reconnaissance evidence supports a bounded vulnerability-research hypothesis.

## Preconditions

- Asset is admitted under current scope and rules.
- Recon evidence is attributable, dated, and sufficient to describe an attack surface element.

## Process

1. Summarize the relevant asset, observed behavior, confidence, and applicable restriction.
2. State a narrow, testable hypothesis and the least-impactful validation boundary.
3. Select the focused hunting sub-skill that owns the hypothesis class.
4. Recheck admission before changing asset, account/role, method, or expected impact.

## Limits

- Recon output is not proof of a vulnerability or authorization for intrusive testing.
- Do not convert an ambiguous observation into a broad test campaign.

## Evidence And Handoff

Hand off the asset admission reference, observation references, hypothesis, uncertainty, and stop boundary. Hold when the hypothesis cannot be bounded safely.

## Authoritative Sources

- [NIST SP 800-115](https://csrc.nist.gov/pubs/sp/800/115/final)
- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
