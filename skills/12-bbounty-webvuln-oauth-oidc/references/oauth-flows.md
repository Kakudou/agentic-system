# OAuth Flow Inventory

## Purpose And Preconditions

Use this guide to identify the parties and security boundaries of an in-scope OAuth deployment before testing controls. Have written authorization, a controlled test account, and a normal user journey. Do not infer that a provider's advertised grant is authorized for testing.

## Safe Bounded Method

1. Observe one ordinary sign-in or consent journey for a test account.
2. Record the client, authorization server, resource server, callback owner, response type, grant, requested scope, granted scope, and whether the client is public or confidential.
3. Note where browser artifacts end and back-channel processing begins, without recording artifact values.
4. Mark legacy browser-delivered token flows and machine-to-machine flows separately. Client credentials does not authenticate an end user and should not be assessed with interactive account tests.

## Observations And Interpretation

| Observation | Interpretation |
| --- | --- |
| Code flow with PKCE and server-side exchange | Expected modern pattern for browser or native clients; continue with transaction-binding review. |
| Browser-delivered access or ID token | Raises exposure and callback-handling review priority; it is not a finding by itself. |
| Requested and granted scopes differ | Verify that the difference is documented, consented, and enforced by the resource server. |
| Multiple clients share a callback or identity mapping | Review each client's audience and account-binding controls. |

## False-Positive Controls

- Distinguish application login from provider session reuse or single sign-on.
- Confirm the observed client ID and callback belong to the in-scope application.
- Treat a deprecated flow as context, not proof of impact, unless an exposed artifact or missing control is demonstrated safely.

## Evidence

Capture a redacted sequence diagram, role/client inventory, scope comparison, timestamp, and the source of each observation. Never capture token, code, cookie, credential, or personal-data values.

## Remediation

Prefer authorization code flow with PKCE for public clients; minimize scopes; keep tokens out of browser-accessible locations where possible; and document the intended client, callback, and resource-server trust boundaries.

## PortSwigger Sources

- [OAuth 2.0 authentication vulnerabilities](https://portswigger.net/web-security/oauth)
- [OAuth grant types](https://portswigger.net/web-security/oauth/grant-types)
