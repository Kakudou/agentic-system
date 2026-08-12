# PKCE Validation

## Purpose And Preconditions

PKCE binds an authorization-code transaction to the client that started it, especially for public clients. Use this guide only for authorized code flows exercised by a controlled account.

## Safe Bounded Method

1. From normal flow metadata or implementation review, establish whether the client sends a code challenge and declares the secure `S256` method.
2. Confirm the authorization server requires a matching verifier during the legitimate code exchange and that the relying party treats exchange failure as a failed login.
3. When a program explicitly permits negative testing, use the application's sanctioned test environment and a test transaction to confirm a deliberately invalid verifier is rejected. Do not reuse, intercept, or exchange authorization codes manually.

## Observations And Interpretation

| Observation | Interpretation |
| --- | --- |
| `S256` challenge and verifier are consistently required | Expected modern PKCE protection. |
| PKCE absent for a public client | Configuration risk requiring client-type and provider-policy review. |
| Invalid verifier is accepted in sanctioned testing | Strong indication that code binding may be absent; preserve minimal evidence and stop. |

## False-Positive Controls

- Confidential-client authentication and PKCE can be complementary; one does not automatically replace the other.
- Some server-side web clients may use PKCE as defense in depth; evaluate the actual client classification.
- A client library hiding PKCE fields is not proof that PKCE is missing.

## Evidence

Record client type, observed challenge method, redacted exchange outcome, test-environment authorization, and whether any user session was affected.

## Remediation

Require PKCE with `S256` for public clients, bind each code to its challenge, client, and callback, and reject missing, malformed, or non-matching verifiers.

## PortSwigger Sources

- [OAuth 2.0 authentication vulnerabilities](https://portswigger.net/web-security/oauth)
