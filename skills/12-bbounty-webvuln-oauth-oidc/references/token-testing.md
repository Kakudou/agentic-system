# Token And Claim Validation

## Purpose And Preconditions

Review how the client and resource server accept access tokens and how the relying party accepts ID tokens. Inspect only artifacts issued to a controlled test account. Decoding is observational only; it does not verify integrity and must never be used to alter or replay an artifact.

## Safe Bounded Method

1. Classify each artifact by purpose: authorization code, access token, refresh token, or ID token. Record only type and redacted metadata.
2. For JWTs, compare header and claim names with trusted configuration: key source, permitted signing algorithm, issuer, audience, expiry, not-before, issued-at, and key identifier.
3. Confirm the consuming component rejects expired or wrong-context artifacts through documented behavior, logs, or a sanctioned test environment. Do not supply altered, borrowed, or replayed tokens.
4. Compare requested, granted, and enforced scopes using controlled API actions that do not access sensitive data.
5. Confirm identity mapping is based on a validated stable subject and that refresh-token handling, if in scope, follows the provider's documented rotation and revocation policy.

## Observations And Interpretation

| Observation | Interpretation |
| --- | --- |
| Signature, issuer, audience, time bounds, and key provenance are enforced | Core token-validation controls are present. |
| Consumer accepts an ID token as an API credential | Potential token-type confusion; confirm actual resource access in a safe environment. |
| Displayed scope differs from effective permissions | Investigate policy mapping and endpoint enforcement. |
| Subject is mapped by unverified mutable profile data | Account-binding risk requiring provider and application policy review. |

## False-Positive Controls

- JWT decoding is not signature validation.
- Opaque access tokens may be correctly validated through introspection or a server-side store; lack of readable claims is not a defect.
- Clock skew and key rotation can explain isolated validation failures. Confirm trusted time, key rollover policy, and intended audience.
- Access-token claims and ID-token claims have different validation and authorization purposes.

## Evidence

Capture artifact type, redacted header/claim names, trusted configuration source, consumer outcome, scope-to-action comparison, timestamps, and environment. Never include values, signatures, secrets, or raw bearer artifacts.

## Remediation

Enforce allowlisted algorithms and trusted keys; validate issuer, audience, authorized party where applicable, time bounds, and token type; bind identity to a stable validated subject; enforce scopes and tenant context at the resource server; and rotate or revoke refresh tokens according to risk.

## PortSwigger Sources

- [OAuth 2.0 authentication vulnerabilities](https://portswigger.net/web-security/oauth)
- [OpenID Connect](https://portswigger.net/web-security/oauth/openid-connect)
