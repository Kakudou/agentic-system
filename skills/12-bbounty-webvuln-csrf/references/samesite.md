# SameSite Behavior

## Purpose and Preconditions

Use when cookies authenticate the selected operation. Record actual `Set-Cookie` attributes and browser context in a clean approved profile; do not infer behavior from a manually attached cookie header.

## Safe Assessment

1. Identify session cookies and record their `SameSite`, `Secure`, domain, and path attributes without preserving values.
2. Establish the normal authenticated baseline for the reversible operation.
3. Observe, under a program-approved browser context, whether the browser includes the controlled session cookie for the relevant request type.
4. Continue with token or origin assessment if the cookie is included; restore state after any permitted comparison.

## Interpretation and Controls

SameSite is site-based, not strictly origin-based, and behavior varies by navigation, method, browser version, and cookie age. `Lax` or omitted attributes are not findings by themselves. Treat SameSite as defense in depth: an effective server-side token or origin check can still block CSRF.

## Evidence and Remediation

Record redacted cookie attributes, browser/version context, request type, and actual inclusion behavior. Set an appropriate SameSite policy for session cookies, retain server-side CSRF validation, and use `Secure` for `SameSite=None` cookies.

Sources: [PortSwigger Academy: CSRF](https://portswigger.net/web-security/csrf), [MDN: SameSite cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies#controlling_third-party_cookies_with_samesite).
