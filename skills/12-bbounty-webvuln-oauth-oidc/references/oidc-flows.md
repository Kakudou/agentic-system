# OIDC Flow And Claim Model

## Purpose And Preconditions

Use this guide when `openid` is requested or an ID token is consumed. Work only with an in-scope relying party, provider, and test account. OIDC adds authentication assertions to OAuth; an access token and an ID token have different consumers and must not be treated interchangeably.

## Safe Bounded Method

1. Inventory the relying party, OpenID Provider, user session, requested OIDC scopes, and response type from a normal test login.
2. Identify where the relying party receives and validates the ID token.
3. Compare the configured issuer, audience/client ID, key source, and expected claims with redacted token metadata or implementation documentation.
4. Confirm the application binds the resulting local account to the validated subject, not display attributes such as email or name alone.

## Observations And Interpretation

| Observation | Interpretation |
| --- | --- |
| `openid` and an ID token are present | OIDC validation requirements apply. |
| More than one audience or authorized party is expected | The relying party needs explicit audience and `azp` handling where applicable. |
| Identity is mapped from mutable profile data | Review subject binding and provider verification rules. |
| Nonce is used in a front-channel identity response | Verify it is generated, retained per transaction, and checked on return. |

## False-Positive Controls

- A readable JWT is not evidence that it is accepted without validation.
- Optional claims vary by scope and provider; absence alone is not a defect.
- Provider account session reuse can look like relying-party account confusion. Repeat with clean, controlled sessions before reporting.

## Evidence

Record redacted headers/claim names, configured trust values, local-account outcome, and the expected versus observed binding. Do not store token values.

## Remediation

Validate the ID token signature against trusted provider keys and enforce issuer, audience, time claims, nonce when applicable, and stable subject binding. Use the authorization code flow with PKCE rather than browser-delivered identity artifacts when feasible.

## PortSwigger Sources

- [OpenID Connect](https://portswigger.net/web-security/oauth/openid-connect)
- [OAuth 2.0 authentication vulnerabilities](https://portswigger.net/web-security/oauth)
