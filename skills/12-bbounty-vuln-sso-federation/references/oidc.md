# OIDC Observation

## Purpose

Provide protocol context for interpreting an already observed OpenID Connect integration and its documented trust configuration.

## Preconditions

- OIDC is identified in supplied documentation, a captured normal browser journey, or an authorized prior artifact.
- Observation of the named issuer and relying party is permitted; endpoint discovery or provider probing is not assumed.

## Method

From approved evidence, record the named issuer, relying party or client context, normal authorization return path, configured redirect ownership, and any published discovery or key metadata already supplied. Compare these observations with the intended environment and account boundary. Do not initiate authorization requests, call token or introspection endpoints, decode or replay tokens, or vary flow parameters.

## Interpretation

Configuration labels and public metadata establish context, not a vulnerability. Escalate only when observed evidence conflicts with the documented issuer, relying-party, redirect, audience, nonce/state handling, or server-side identity-binding policy. A browser redirect alone cannot demonstrate acceptance or impact.

## False-Positive and Scope Controls

Separate shared login infrastructure from the application under assessment. Treat staging, mobile, legacy, and multi-tenant configurations as distinct contexts. Do not capture authorization codes, tokens, cookies, or third-party personal data.

## Evidence and Handoff

Preserve redacted, timestamped configuration references and normal-flow observations; identify what was not observed. Route suspected validation gaps to the relying-party and IdP owners with the expected policy and a safe validation criterion.

## Sources

- [PortSwigger: OAuth 2.0 authentication vulnerabilities](https://portswigger.net/web-security/oauth)
- [PortSwigger: OpenID Connect](https://portswigger.net/web-security/oauth/openid-connect)
- [OWASP OAuth2 Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/OAuth2_Cheat_Sheet.html)
