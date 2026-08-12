# Token Validation

## Purpose and Preconditions

Read before testing token enforcement, binding, expiry, or reuse. Work only on an approved reversible operation with a controlled session. Never record or exchange token values between accounts.

## Safe Assessment

1. Document where the application obtains and transmits its token and capture a redacted valid baseline.
2. Perform the smallest permitted missing, invalid, or stale-token comparison in the same controlled session.
3. If lifecycle behavior is in scope, compare only controlled form states and stop after the minimum result.
4. Verify the operation's actual before/after state and restore it if needed.

## Interpretation and Controls

Framework tokens may rotate after navigation, submit, or login, so an expected failure can be normal. A token's presence is insufficient if omission is accepted; conversely, a rejected altered token is not a full assessment of every state-changing route. Avoid cross-account token tests unless explicitly authorized because they can create account-bound security effects.

## Evidence and Remediation

Preserve redacted token-location metadata, baseline/comparison outcome, state evidence, and cleanup. Use cryptographically strong server-side validation, bind tokens to the appropriate authenticated context, and apply consistent validation across all cookie-authenticated state changes.

Sources: [PortSwigger Academy: CSRF](https://portswigger.net/web-security/csrf), [OWASP CSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html).
