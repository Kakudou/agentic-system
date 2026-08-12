# Cookie Handling

## Purpose

Assess cookie scope, transport, browser exposure, and lifecycle without exporting or replaying session material.

## Preconditions

- Use only controlled sessions. Do not exfiltrate cookies, intercept third-party traffic, or test XSS payload delivery.

## Authorized Assessment Workflow

1. Record redacted `Set-Cookie` metadata before login, after login, after privilege changes, and after logout.
2. Check `Secure`, `HttpOnly`, `SameSite`, `Path`, `Domain`, expiry, and host-prefix suitability against the feature's needs.
3. Confirm HTTPS enforcement and that authentication cookies are not set or accepted over insecure transport.
4. In separate controlled browser contexts, verify logout and security events revoke intended cookie-backed access.
5. Compare only server-visible authorization outcomes; do not copy session values between accounts.

## Observations and Interpretation

Missing transport or script-exposure protections, overbroad scope, or continued authorization after revocation can increase session compromise impact.

## False-Positive Controls

Account for cookies intentionally used for non-auth preferences and browser-specific SameSite behavior; verify which cookie gates server authorization.

## Remediation

Use opaque, server-side session identifiers; set `Secure`, `HttpOnly`, and appropriate `SameSite`; restrict domain/path; rotate and revoke sessions.

## Sources

- [PortSwigger: Session management](https://portswigger.net/web-security/sessions)
- [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
