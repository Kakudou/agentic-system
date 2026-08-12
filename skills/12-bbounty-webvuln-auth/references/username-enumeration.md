# Username Enumeration

## Purpose

Identify whether identity-related endpoints disclose account existence through controlled, low-volume comparisons.

## Preconditions

- Use one known controlled identity and one synthetic non-existent identity.
- Respect rate limits and stop if throttling, CAPTCHA, or lockout behavior appears.

## Authorized Assessment Workflow

1. Capture one failed login, registration, and recovery response for each controlled comparison input.
2. Compare user-visible messages, status classes, redirect destinations, body structure, and timing at a small sample size.
3. Repeat each comparison in a clean session to rule out stateful behavior.
4. Record normalized differences without storing credentials or personal data.

## Observations and Interpretation

Stable, account-existence-dependent differences can enable targeted attacks, especially on recovery and login endpoints.

## False-Positive Controls

Exclude CDN/WAF variance, mail-delivery timing, localization, and rate-limit effects; do not infer from a single timing observation.

## Remediation

Return generic messages and comparable responses, apply consistent timing where practical, and rate-limit identity-sensitive endpoints.

## Sources

- [PortSwigger: Username enumeration](https://portswigger.net/web-security/authentication/password-based#username-enumeration)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
