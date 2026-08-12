# Sensitive-Data And Stop Controls

## Purpose

Prevent reconnaissance evidence from retaining secrets, personal data, or out-of-scope access.

## Preconditions

- The observer has a program contact and an approved evidence location.

## Method

Before capture, minimize the view and redact locally. Stop immediately for credentials, tokens, cookies, recovery codes, MFA QR codes, authorization artifacts, personal data, another user's content, privileged access, or an unapproved host or identity-provider tenant. Notify the program contact through the approved channel.

## Interpretation And Controls

Unexpected data exposure is not permission to investigate further. Do not copy, replay, decode, share, or use it. Preserve only the minimum non-sensitive context required for the owner to triage, if the program rules permit it.

## Privacy, Evidence, And Handoff

Use category-level descriptions, timestamps, and redacted paths. Identify what was intentionally not retained. Record the stop condition, scope status, and contact notification in the handoff.

## Sources

- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
