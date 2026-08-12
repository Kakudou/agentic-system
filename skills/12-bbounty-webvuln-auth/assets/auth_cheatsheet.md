# Authentication Assessment Cheatsheet

Use with written authorization and program-approved accounts only. Do not retain credentials, tokens, reset links, MFA codes, or authentication headers.

## Test Selection Matrix

| Flow | Assess when | Primary evidence | Load detail |
| --- | --- | --- | --- |
| Registration and login | New account or sign-in path exists | State transitions, generic errors, redacted cookies | [Auth flows](../references/auth-flows.md) |
| Password controls | Password can be set or changed | Policy outcome by input category | [Password policy](../references/password-policy.md) |
| Reset and recovery | Recovery artifacts or support flow exist | Binding, lifetime, invalidation, notifications | [Password reset](../references/password-reset.md), [Account recovery](../references/account-recovery.md) |
| MFA | Factor enrollment or challenge exists | Pre/post-MFA authorization state | [MFA](../references/mfa.md), [MFA state binding](../references/mfa-bypass.md) |
| Sessions and cookies | Authenticated browser state exists | Rotation, expiry, revocation, attributes | [Session management](../references/session-management.md), [Cookie handling](../references/cookie-theft.md) |
| Persistent login | Remember-me/device trust exists | Opt-in, expiry, revocation, reauthentication | [Remember-me](../references/remember-me.md) |
| Failure safeguards | Login, MFA, reset, or recovery accepts retries | Attempt budget and protective response | [Brute-force safeguards](../references/brute-force.md) |
| Cross-account impact | A controlled proof crosses an auth boundary | Least-privileged second-account proof | [Account takeover](../references/account-takeover.md) |

## Request and Response Evidence Fields

| Field | Capture | Redact or exclude |
| --- | --- | --- |
| Context | Target, endpoint, method, test-account label, timestamp | Real identifiers where not needed |
| Request | Parameter names, input category, cookie/header names | Values of passwords, tokens, cookies, MFA/recovery codes |
| Response | Status, redirect class, body-size class, user-visible message category, latency range | Full sensitive bodies and links |
| State | Authenticated/unauthenticated result, session rotation/revocation result | Session identifiers and account data |
| Reproduction | Minimal ordered controlled steps and stop condition | Automation payloads or large request catalogs |

## Lockout-Safe Failure Testing

1. Document the approved attempt budget before testing.
2. Use a single controlled account and synthetic invalid input.
3. Send sequential low-rate attempts only.
4. Stop immediately at the first protective response or unexpected state change.
5. Verify controlled-account recovery and record the outcome.

## MFA and Session Checklist

- [ ] Protected endpoints remain denied until controlled MFA completes.
- [ ] MFA completion is bound to the intended account, session, factor, and action.
- [ ] Factor enrollment, removal, recovery, and backup paths require suitable proof.
- [ ] Login and privilege changes rotate the authenticated session.
- [ ] Logout, password reset/change, and factor changes revoke or challenge affected sessions.
- [ ] Auth cookies have appropriate `Secure`, `HttpOnly`, `SameSite`, domain, path, and expiry attributes.
- [ ] Persistent-login controls are revocable and do not replace reauthentication for sensitive actions.

## Remediation Lookup

| Observation | Remediation |
| --- | --- |
| Protected state reachable before completion | Enforce a server-side authentication state machine |
| Session persists after required revocation | Rotate and revoke server-side sessions on security events |
| Cookie scope or flags are unsafe | Restrict scope and set appropriate cookie attributes |
| MFA is not context-bound | Bind MFA to account, session, factor, action, and expiry |
| Reset artifact has weak lifecycle | Use opaque, single-use, short-lived, server-bound artifacts |
| Identity enumeration | Normalize errors and apply rate-aware controls |
| Persistent login bypasses controls | Use revocable opaque tokens and step-up authentication |

## Sources

- [PortSwigger: Authentication vulnerabilities](https://portswigger.net/web-security/authentication)
- [PortSwigger: Multi-factor authentication](https://portswigger.net/web-security/authentication/multi-factor)
- [PortSwigger: Session management](https://portswigger.net/web-security/sessions)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
