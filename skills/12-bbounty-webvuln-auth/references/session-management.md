# Session Management

## Purpose

Assess authenticated-session issuance, rotation, expiry, revocation, and authorization binding for controlled accounts.

## Preconditions

- Use separate controlled browser profiles or containers; retain only redacted cookie metadata.
- Do not replay sessions across accounts or outside the controlled test environment.

## Authorized Assessment Workflow

1. Capture redacted session metadata at anonymous, authenticated, privilege-change, logout, and password/factor-change states.
2. Confirm a new authenticated session is issued after login and relevant privilege changes.
3. Verify logout and security events deny access from the original controlled browser context as documented.
4. Check idle and absolute expiration through the documented test environment or approved shortened timeout, not long unattended waits.
5. Confirm protected endpoints enforce authorization server-side in a clean unauthenticated context.

## Observations and Interpretation

Missing rotation, authorization after documented revocation, or inconsistent expiry can expose a session to fixation or persistence risk.

## False-Positive Controls

Separate cached rendering from server responses and distinguish multiple legitimate devices from an improperly shared session.

## Remediation

Generate opaque high-entropy identifiers server-side, rotate at authentication and privilege boundaries, enforce idle/absolute expiry, and revoke sessions on logout and account-security events.

## Sources

- [PortSwigger: Session management](https://portswigger.net/web-security/sessions)
- [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
