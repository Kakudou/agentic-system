# Password Policy

## Purpose

Assess whether registration, password change, and reset apply the published password policy consistently.

## Preconditions

- Use a controlled account and synthetic values from [the controlled-input planner](../assets/credential_wordlists.md).
- Do not use breached, common, or third-party credentials.

## Authorized Assessment Workflow

1. Record the published policy and where it is enforced.
2. Submit a small, controlled boundary set for length, permitted characters, normalization, and confirmation behavior.
3. Compare registration, password-change, and reset results for the same synthetic boundary inputs.
4. Confirm accepted passwords authenticate exactly as entered when the product documents that behavior.
5. Record validation messages and outcomes without retaining the test password.

## Observations and Interpretation

Inconsistent server-side enforcement, silent transformation that changes authentication semantics, or acceptance contrary to a security claim may be reportable.

## False-Positive Controls

Separate client-side hints from server enforcement; account for documented password-manager normalization and localization.

## Remediation

Enforce a single server-side policy across all password-setting paths; permit long passwords; avoid arbitrary composition rules; disclose normalization behavior.

## Sources

- [PortSwigger: Password-based authentication](https://portswigger.net/web-security/authentication/password-based)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
