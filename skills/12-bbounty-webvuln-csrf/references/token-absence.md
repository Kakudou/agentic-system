# Token Absence

## Purpose and Preconditions

Use when a cookie-authenticated state-changing request appears not to carry an anti-CSRF token. Confirm scope, select a reversible low-impact operation, and use only a designated account and test data.

## Safe Assessment

1. Capture a normal successful request and identify all server-side protections, including token fields, headers, Origin/Referer checks, reauthentication, and workflow confirmations.
2. Make one permitted comparison that omits the suspected token or protection field while retaining only required controlled operation data.
3. Observe whether the action completed, then restore controlled state immediately.
4. Confirm browser relevance in a clean profile only if the program allows it.

## Interpretation and Controls

No visible HTML token does not prove absence: SPAs may use request headers, framework middleware, custom content types, Origin validation, or reauthentication. A successful request is not CSRF proof unless browser conditions can authenticate it cross-site and the action completes without an effective independent defense.

## Evidence and Remediation

Record redacted baseline/comparison metadata, protection locations, before/after state, browser outcome, and cleanup. Require unpredictable server-validated protection on every cookie-authenticated state-changing request and reject missing values.

Sources: [PortSwigger Academy: CSRF](https://portswigger.net/web-security/csrf), [OWASP CSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html).
