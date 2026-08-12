# Authentication Flows

## Purpose

Map authentication state transitions and test that each protected state requires the intended completed flow.

## Preconditions

- Use approved accounts, controlled factors, and documented in-scope endpoints.
- Capture a baseline flow before changing one state input at a time.

## Authorized Assessment Workflow

1. Diagram registration, login, MFA, password change/reset, logout, and persistent-login transitions.
2. Capture expected status, redirects, cookie changes, and protected-resource access for each transition.
3. In a clean controlled session, attempt only direct navigation to the next declared state without completing the preceding controlled step.
4. Verify logout, password changes, factor changes, and recovery invalidate the expected sessions.
5. Repeat a minimal proof after clearing local browser state.

## Observations and Interpretation

Access to a protected state before the required server-side transition, or missing invalidation after a security event, is material evidence.

## False-Positive Controls

Differentiate cached pages, client-side routing, and delayed propagation from server-authorized access by checking a fresh request.

## Remediation

Enforce an explicit server-side authentication state machine; bind each transition to the account and session; invalidate state on security events.

## Sources

- [PortSwigger: Authentication vulnerabilities](https://portswigger.net/web-security/authentication)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
