# Validation, Prevention, And Handoff

## Purpose

Provide a privacy-preserving handoff that lets the authorized owner validate an observation and correct publication controls.

## Preconditions

- Authorization, ownership status, and reporting channel are recorded.
- Evidence is redacted and contains no sensitive payload.

## Method

Submit the [remediation handoff template](../assets/remediation-handoff-template.md) through the authorized channel. Ask the asset owner to confirm intended publication, ownership, impact, and remediation. Recommend prevention themes only: release allowlists, separation of build/debug outputs from public deployment, deployment review, cache invalidation after removal, and secret rotation or incident handling when the owner confirms exposure.

Do not independently validate artifact contents, test remediation, access revision history, or request secret material. Any follow-up observation needs separate explicit approval.

## Interpretation And Controls

Treat owner confirmation as the boundary between a suspected and confirmed exposure. Avoid severity claims based solely on artifact type. Preserve third-party and shared-platform ambiguity, and do not assign remediation responsibility without confirmed ownership.

## Evidence And Handoff

Include authorization reference, redacted locator, classification, confidence, observed boundary, alternative explanations, stop status, and requested owner decision. Close the assessment as `owner-confirmed`, `not-reproducible`, `out-of-scope`, or `awaiting-owner-review`.

## Sources

- OWASP, [Vulnerability Management Guide](https://owasp.org/www-project-vulnerability-management-guide/)
- OWASP, [Software Supply Chain Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Software_Supply_Chain_Security_Cheat_Sheet.html)
- GitHub Docs, [About secret scanning](https://docs.github.com/code-security/secret-scanning/introduction/about-secret-scanning)
- NIST SP 800-218, [Secure Software Development Framework](https://csrc.nist.gov/pubs/sp/800/218/final)
