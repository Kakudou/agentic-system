# Multi-Factor Authentication

## Purpose

Assess enrollment, challenge, verification, recovery, and revocation controls for controlled MFA factors.

## Preconditions

- Use only test authenticator devices, controlled numbers/mailboxes, and program-approved backup codes.
- Do not guess codes, fatigue users, intercept messages, or attempt cross-account factor use.

## Authorized Assessment Workflow

1. Document available factors, fallback methods, remembered-device policy, and sensitive-action reauthentication requirements.
2. Enroll a controlled factor and verify notifications, confirmation, and recent-authentication requirements.
3. Complete valid and intentionally invalid single-attempt challenges to observe error and retry behavior.
4. Verify factor removal, replacement, recovery, password change, and logout revoke or challenge expected MFA state.
5. Compare protected-action access before and after valid controlled MFA completion.

## Observations and Interpretation

Weak factor-change proof, missing step-up authentication, unsafe fallback, or factor state surviving required revocation can materially weaken MFA.

## False-Positive Controls

Confirm documented remembered-device and grace-period behavior; allow for provider delivery delays before interpreting a failure.

## Remediation

Prefer phishing-resistant factors where feasible; require recent authentication for factor changes; bind challenges to context; limit retries; secure recovery and notify users.

## Sources

- [PortSwigger: Multi-factor authentication](https://portswigger.net/web-security/authentication/multi-factor)
- [OWASP Multifactor Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Multifactor_Authentication_Cheat_Sheet.html)
