# Registration

## Purpose

Assess whether controlled account creation consistently binds the intended identity, verification state, and initial session.

## Preconditions

- Registration is in scope; use only program-approved addresses and accounts.
- Do not create volume, reserve names, or send messages outside controlled inboxes.

## Authorized Assessment Workflow

1. Capture one normal registration and verification journey for a controlled address.
2. Compare a small set of controlled identity-format variants where the published policy permits them.
3. Confirm whether verification is required before authentication, recovery, or sensitive actions.
4. Check that duplicate and malformed inputs receive privacy-preserving, consistent handling.
5. Record the initial session, notification, and verification state without retaining secrets.

## Observations and Interpretation

Unexpected authentication before verified ownership, identity collision between controlled accounts, or a verification state that can be skipped may be security relevant.

## False-Positive Controls

Repeat in a clean browser profile; account for email provider normalization, delayed mail, and documented SSO or invite-only behavior.

## Remediation

Require verified ownership before sensitive access, normalize identities consistently, make verification state server-side, and rate-limit registration safely.

## Sources

- [PortSwigger: Authentication vulnerabilities](https://portswigger.net/web-security/authentication)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
