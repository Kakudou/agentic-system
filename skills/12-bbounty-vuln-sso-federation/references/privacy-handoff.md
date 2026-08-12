# Privacy, Stop, and Handoff Controls

## Purpose

Protect identity data, preserve scope, and deliver only the minimum evidence required for remediation.

## Preconditions

- A secure evidence destination, retention rule, and escalation recipient are identified.
- The assessment has an authorization and stop-contact reference.

## Method

Redact or avoid collecting names, email addresses, subject values, group memberships, session cookies, authorization codes, tokens, assertions, and raw metadata where a reference suffices. Keep only designated test-account facts. Stop immediately on third-party data, unexpected privilege, an unapproved IdP, account or tenant crossover, or unclear consent.

## Interpretation

More sensitive evidence is not stronger evidence. If policy contradiction cannot be demonstrated without exposing protected data or changing state, report the concern as inconclusive and request a controlled validation path.

## False-Positive and Scope Controls

Do not share raw artifacts across providers or teams without authorization. Preserve provenance and redaction notes so recipients do not misread a sanitized capture as complete protocol data.

## Evidence and Handoff

Use the [sensitive-data and stop checklist](../assets/sensitive-data-stop-checklist.md) and [remediation and handoff template](../assets/remediation-handoff-template.md). State retention location, redactions, stopped work, unresolved uncertainty, and the accountable recipient.

## Sources

- [PortSwigger: OAuth 2.0 authentication vulnerabilities](https://portswigger.net/web-security/oauth)
- [OWASP SAML Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SAML_Security_Cheat_Sheet.html)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
