# SameSite Cookie Controls

## Purpose and Preconditions

Use alongside [SameSite behavior](samesite.md) when interpreting cookie configuration as part of a CSRF defense. The selected target action must be authorized, reversible, and associated with a controlled account.

## Safe Assessment

1. Inventory all cookies that can authenticate the selected request, including domain-scoped and framework session cookies.
2. Compare observed browser inclusion for the normal same-site flow and the approved cross-site-relevant context.
3. Record other defenses before concluding, especially token enforcement, Origin/Referer validation, reauthentication, and transaction confirmation.

## Interpretation and Controls

Do not assume a cookie attribute is honored in every browser or context. Same-site sibling applications may share site context while remaining different origins. Proxy-added cookies, test-environment domains, and login/session renewal can change observations; repeat in a clean profile.

## Evidence and Remediation

Capture redacted cookie attribute metadata, context, and complementary controls. Apply restrictive SameSite attributes where compatible, scope cookies narrowly, and protect state changes independently with server-side validation.

Sources: [PortSwigger Academy: CSRF](https://portswigger.net/web-security/csrf), [OWASP CSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html).
