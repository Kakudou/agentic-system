# Scope, Test-Account, and IdP Boundaries

## Purpose

Establish the authorized federation relationship before collecting or interpreting evidence.

## Preconditions

- Written authorization identifies in-scope relying parties, IdPs, test accounts, permitted methods, and a stop contact.

## Method

Document the relying-party owner, IdP owner, protocol, environment, test-account tenancy, permitted observation sources, and excluded partner or production boundaries. Use only supplied artifacts or passive normal-flow evidence. Do not enumerate endpoints, probe provider configuration, or contact third parties.

## Interpretation

An observed redirect to an IdP does not authorize assessment of that IdP. A shared identity domain does not establish ownership, scope, or permission to access its metadata or support flows.

## False-Positive and Scope Controls

Stop on an unlisted host, partner IdP, real-user data, unexpected tenant, or ambiguous ownership. Record the gap rather than inferring authority.

## Evidence and Handoff

Capture the authorization reference, boundary diagram or description, account class, exclusions, decision, and stop contact. Continue only after all required boundaries are explicit.

## Sources

- [PortSwigger: OAuth 2.0 authentication vulnerabilities](https://portswigger.net/web-security/oauth)
- [OWASP SAML Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SAML_Security_Cheat_Sheet.html)
- [OWASP Identity Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
