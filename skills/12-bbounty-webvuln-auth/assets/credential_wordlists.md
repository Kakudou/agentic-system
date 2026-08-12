# Controlled Input Planner

Use this lookup only with program-approved test accounts. It intentionally contains no credential lists, breached data, token values, or password-guessing guidance. Create unique synthetic values in the authorized test environment and do not retain them in evidence.

## Decision Matrix

| Assessment goal | Safe input set | Maximum scope | Stop condition |
| --- | --- | --- | --- |
| Username enumeration | One controlled existing identifier and one synthetic absent identifier | Low-volume paired comparison | Throttle, CAPTCHA, lockout, or inconsistent delivery state |
| Password policy | Boundary-length and character-class synthetic values | One controlled account per path | Password change succeeds unexpectedly or account state changes |
| Login safeguards | One known-invalid synthetic password | Program-approved sequential attempt budget | Any challenge, delay, throttle, or lockout |
| MFA safeguards | One intentional invalid code attempt, if authorized | Controlled factor only | Any retry control or factor disruption |
| Reset/recovery | Controlled mailbox and one synthetic absent identity | One reset transaction at a time | Unexpected notification or cross-account effect |

## Synthetic Input Design

Generate values locally for one assessment, label them by purpose, and delete them after reporting. Examples are placeholders, not secrets:

| Test | Synthetic pattern | Record as |
| --- | --- | --- |
| Controlled account label | `auth-test-a` | Account label, not the real identifier |
| Absent identifier | `absent-auth-check-<unique>` | Synthetic absent identifier |
| Boundary password | `TestOnly-<length>-<unique>` | Length/category only, never the value |
| Invalid password | `invalid-auth-check-<unique>` | Invalid-input label only |
| MFA negative test | One deliberately invalid controlled attempt | Attempt count and result only |

## Lockout-Safe Test Plan

1. Obtain written limits for attempts, rate, concurrency, test window, and recovery.
2. Establish a normal failure baseline with a single controlled invalid input.
3. Use sequential requests only, one variable at a time, and pause between attempts.
4. Stop at the first throttle, challenge, delay, lockout, notification, or unexpected state change.
5. Confirm the controlled account remains usable through the documented recovery path.
6. Never use credential lists, password spraying, credential stuffing, IP rotation, or bypass attempts.

## Evidence Fields

Record only: test-account label, input category, attempt number, timestamp, endpoint/method, status class, response-size class, user-visible message category, latency range, challenge state, and recovery outcome. Redact all authentication material.

## Remediation Lookup

| Finding | Primary remediation |
| --- | --- |
| Account-existence disclosure | Generic responses, comparable processing, rate limits |
| Weak or inconsistent password policy | Central server-side policy across registration, reset, and change |
| Insufficient failure controls | Layered account-aware throttling, risk detection, safe recovery |
| Unsafe MFA retries | Bind challenges to context, constrain attempts, protect recovery |
| Reset/recovery weakness | Single-use, short-lived, account-bound artifacts and notifications |

## Sources

- [PortSwigger: Password-based authentication](https://portswigger.net/web-security/authentication/password-based)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [OWASP Blocking Brute Force Attacks](https://owasp.org/www-community/controls/Blocking_Brute_Force_Attacks)
