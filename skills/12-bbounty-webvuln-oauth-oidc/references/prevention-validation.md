# Evidence, Prevention, And Validation

## Purpose And Preconditions

Use this guide to turn controlled observations into reproducible, low-risk findings and to verify remediation without expanding scope. Have program reporting requirements, an evidence-retention policy, and a safe validation environment.

## Safe Bounded Method

1. State the intended control and expected result before the test.
2. Record one minimal authorized observation with redacted metadata and a timestamp.
3. Repeat only enough to rule out session, cache, account-role, provider-SSO, and environment variance.
4. Describe impact using only controlled accounts and harmless actions.
5. After remediation, repeat the same bounded check and record the changed result.

## Observations And Interpretation

| Observation | Interpretation |
| --- | --- |
| A control fails consistently in a controlled session | Candidate finding; assess affected clients, users, and authorization boundary. |
| Result varies by session or provider state | Insufficient evidence until the source of variance is isolated. |
| Configuration appears weak but no unsafe behavior is observed | Report as hardening guidance only if program policy accepts it. |

## False-Positive Controls

- Confirm scope and environment, including staging versus production.
- Use freshly authenticated controlled accounts and document SSO state.
- Separate a client-side display defect from a server-side authorization decision.
- Never infer impact from an error message, decoded token, or endpoint advertisement alone.

## Evidence

Use redacted request/response metadata, configuration sources, account-role descriptions, timestamps, expected/observed outcomes, and a minimal reproduction narrative. Exclude credentials, cookies, token/code values, personal data, and unrelated traffic.

## Remediation

Map each finding to a concrete control: exact callback registration, transaction-bound state, PKCE `S256`, strict token validation, stable subject binding, least-privilege scopes, resource-server authorization, and issuer/key configuration. Include an owner and a repeatable validation criterion.

## PortSwigger Sources

- [OAuth 2.0 authentication vulnerabilities](https://portswigger.net/web-security/oauth)
- [OpenID Connect](https://portswigger.net/web-security/oauth/openid-connect)
