# Claim and Identity-Binding Interpretation

## Purpose

Interpret the documented or observed relationship between federation data and the relying party's local identity, tenant, and authorization context. This is an evidence exercise, not account-link testing.

## Preconditions

- The IdP, relying party, designated test identity, and permitted evidence sources are in scope.
- The expected identifier and tenancy model are documented or explicitly unknown.

## Method

Use redacted supplied logs, browser captures, application documentation, or a specifically approved normal sign-in by one designated account. Record only the minimum necessary facts: asserted issuer or IdP, service-provider or audience context, stable subject identifier if observable, local account mapping, tenant context, and authorization outcome. Compare those facts with the stated design; do not edit profile fields, link identities, change email addresses, or substitute federation artifacts.

## Interpretation

A concern requires evidence that the relying party's server accepted an identity or tenancy association contrary to the documented policy. Matching displays, aliases, email normalization, invited-account migration, support impersonation, and expected just-in-time provisioning are not findings without a policy contradiction and server-side evidence.

## False-Positive and Scope Controls

- Use designated accounts and isolated test tenants only.
- Do not retain subject identifiers, email addresses, group names, or raw federation artifacts unless necessary and approved.
- Stop when the observation could expose another person's account, tenant, or attributes.

## Evidence and Handoff

Record the expected binding rule, redacted observed binding facts, source provenance, alternatives considered, confidence, and owner for identity-platform review. Use the [identity-binding confidence matrix](../assets/identity-binding-confidence-matrix.md).

## Sources

- [PortSwigger: OAuth 2.0 authentication vulnerabilities](https://portswigger.net/web-security/oauth)
- [OWASP SAML Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SAML_Security_Cheat_Sheet.html)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
