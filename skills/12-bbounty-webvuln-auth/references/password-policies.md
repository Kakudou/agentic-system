# Password Policy Consistency

## Purpose

Verify that password controls behave consistently across all controlled identity and recovery paths.

## Preconditions

- Password-setting paths are in scope and a controlled mailbox/account is available.

## Authorized Assessment Workflow

1. Identify registration, password change, administrator-assisted reset if exposed, and self-service reset paths.
2. Use the same minimal synthetic boundary cases in each path.
3. Compare policy enforcement, error handling, session invalidation, and notification behavior.
4. Confirm that password changes require the expected existing authentication or recovery proof.
5. Preserve redacted evidence of the policy mismatch only.

## Observations and Interpretation

A weaker reset path or a path that changes a password without sufficient proof can undermine the stated password policy.

## False-Positive Controls

Check role-specific policies, staged rollout flags, and documented account classes before concluding a mismatch.

## Remediation

Centralize policy enforcement, require appropriate proof for every password change, revoke affected sessions, and notify users of changes.

## Sources

- [PortSwigger: Password-based authentication](https://portswigger.net/web-security/authentication/password-based)
- [OWASP Forgot Password Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html)
