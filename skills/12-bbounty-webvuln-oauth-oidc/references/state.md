# State Validation

## Purpose And Preconditions

Use this guide to assess login transaction binding and cross-site request forgery resistance for browser-based OAuth/OIDC flows. Use only test accounts and an explicit authorization boundary.

## Safe Bounded Method

1. Start one normal controlled login and record whether a state value is created and returned, without retaining its value.
2. Confirm the relying party compares the returned value with a single-use, session-bound server-side record before creating a session or linking an identity.
3. Where explicitly authorized, abandon a test transaction and verify that a later callback is rejected without completing authentication.

## Observations And Interpretation

| Observation | Interpretation |
| --- | --- |
| State is unpredictable, session-bound, and consumed once | Expected transaction-binding behavior. |
| State is absent | Requires context: some SDK patterns use other robust transaction binding, but the application must demonstrate it. |
| Callback completes after the originating transaction is abandoned | Investigate whether a local session or identity can actually be created; do not use another user's session. |

## False-Positive Controls

- Do not equate a provider's anti-CSRF controls with relying-party transaction validation.
- Browser back-button behavior, cached pages, and provider SSO can mimic a completed callback.
- Validate outcome using a fresh test session and account state, not URL appearance alone.

## Evidence

Capture redacted lifecycle observations, session boundaries, expiry/one-time behavior, and the resulting local authentication state.

## Remediation

Generate high-entropy state per login, bind it to the initiating session and intended provider/client, verify it before any session change, and expire and consume it once used.

## PortSwigger Sources

- [OAuth 2.0 authentication vulnerabilities](https://portswigger.net/web-security/oauth)
