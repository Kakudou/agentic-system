# Password Reset

## Purpose

Assess whether password-reset artifacts and state transitions are bound, short-lived, single-use, and safely invalidated.

## Preconditions

- Use only controlled accounts and mailboxes. Written scope must permit reset testing.
- Do not alter host-routing headers, race requests, guess tokens, or send reset messages to other users.

## Authorized Assessment Workflow

1. Capture the normal controlled reset request, delivery, confirmation, password update, and post-reset session behavior.
2. Verify generic responses for controlled existing and synthetic non-existent identities.
3. Check that a reset artifact is bound to its requested controlled account and invalid after use, expiry, or a newer reset.
4. Confirm the reset completes only through the intended trusted origin and that post-reset notifications and session revocation occur as documented.
5. Test password-policy consistency using controlled synthetic values.

## Observations and Interpretation

An artifact accepted outside its intended account, transaction, lifetime, or trusted-origin flow can enable unauthorized reset. Merely seeing a token-like URL does not establish weakness.

## False-Positive Controls

Account for mail rewriting, link scanners, asynchronous delivery, and documented multi-device reset behavior; repeat only within approved limits.

## Remediation

Use opaque high-entropy single-use artifacts, bind them server-side, expire promptly, construct URLs from trusted configuration, rate-limit safely, notify users, and revoke sessions after reset.

## Sources

- [PortSwigger: Resetting user passwords](https://portswigger.net/web-security/authentication/other-mechanisms#resetting-user-passwords)
- [OWASP Forgot Password Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html)
