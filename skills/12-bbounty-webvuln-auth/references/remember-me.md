# Remember-Me

## Purpose

Assess persistent-login controls using controlled accounts and device contexts.

## Preconditions

- Persistent login is in scope; use program-approved accounts and browsers only.
- Do not attempt token guessing, collection, or replay between accounts.

## Authorized Assessment Workflow

1. Capture the controlled opt-in login and redacted persistent-cookie attributes.
2. Check the behavior after browser restart, explicit logout, password change, factor change, and account recovery.
3. Verify active-device/session management can revoke the persistent login as documented.
4. Confirm sensitive actions require fresh authentication where the product policy requires it.
5. Compare behavior in a clean controlled browser profile and record only metadata.

## Observations and Interpretation

Persistent access surviving a documented revocation event or bypassing required reauthentication is relevant.

## False-Positive Controls

Confirm whether logout is device-local by design and distinguish a normal session cookie from the persistent mechanism.

## Remediation

Use high-entropy, opaque, server-side revocable tokens; scope and protect cookies; revoke on security events; require reauthentication for sensitive actions.

## Sources

- [PortSwigger: Keeping users logged in](https://portswigger.net/web-security/authentication/other-mechanisms#keeping-users-logged-in)
- [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
