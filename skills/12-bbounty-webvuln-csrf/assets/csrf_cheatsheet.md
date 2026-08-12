# CSRF Defense-State Test Matrix

Use only for approved, reversible state changes with designated accounts and test data. Capture a valid baseline before any comparison; stop and restore state after the minimum proof.

| Defense state | Preconditions | Safe authorized comparison | Confirm only when | False-positive control |
|---|---|---|---|---|
| Server-issued token | Valid baseline and known token location | Omit, invalidate, or use a stale controlled token as permitted | The protected action completes despite the failed protection condition | Confirm no alternate application confirmation or workflow validation performed the action |
| Token binding or reuse | Controlled session and two valid form states where authorized | Compare same-session lifecycle without sharing tokens across users | Token acceptance violates documented binding/expiry expectations and action completes | Account for framework token rotation, parallel tabs, and cached forms |
| Origin or Referer validation | Browser context and normal request metadata captured | Use the minimum permitted absent or untrusted-context comparison | Protected action completes in a browser-relevant cross-site context | Manual header changes alone do not prove browser behavior |
| SameSite cookies | Cookie attributes and a browser context available | Observe whether the browser includes the controlled session cookie in the relevant context | A relevant authenticated request can reach the operation; assess with other defenses | SameSite does not establish token validation or impact by itself |
| Login or multi-step flow | Explicit authorization and separate controlled account | Verify state binding and protection at each transition without disrupting other sessions | Controlled session is unintentionally replaced or a protected transition completes | Rule out deliberate SSO, device trust, or documented login behavior |

## Browser Precondition Checklist

- [ ] Scope permits the selected operation and testing browser context.
- [ ] Dedicated account and reversible test data are in use.
- [ ] Normal valid request and expected state transition are recorded.
- [ ] Cookie authentication and SameSite attributes are observed, not assumed.
- [ ] Token field/header and Origin/Referer behavior are identified.
- [ ] Clean profile excludes extensions, prior sessions, and cached application state.
- [ ] Stop contact and cleanup path are available before the comparison.

## Evidence and Remediation Lookup

### Evidence

- [ ] Redacted valid baseline and failed-defense comparison captured.
- [ ] Before/after controlled state and cleanup recorded.
- [ ] Browser conditions and actual session behavior recorded without secret values.
- [ ] Duplicate submission, retries, user-confirmation, and workflow controls ruled out.

### Remediation

| Finding pattern | Recommended correction |
|---|---|
| Missing or optional protection token | Require an unpredictable server-validated token on every cookie-authenticated state-changing request. |
| Token lacks required lifecycle binding | Bind validation to the intended session or request context and enforce expiry/reuse policy appropriate to the framework. |
| Origin/Referer checks accept untrusted context | Validate Origin when present and use strict, well-defined Referer fallback; reject unexpected values. |
| Reliance only on SameSite | Retain SameSite as defense in depth and add server-side token or origin validation. |
| Login or workflow transition lacks request integrity | Apply appropriate anti-CSRF controls and bind each transition to the controlled session and expected workflow state. |

Sources: [PortSwigger Academy: CSRF](https://portswigger.net/web-security/csrf), [OWASP CSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html).
