# MFA State-Binding Tests

## Purpose

Determine whether MFA completion is enforced and bound to the correct controlled account, session, factor, and action.

## Preconditions

- MFA testing is expressly in scope, with controlled authenticators and recovery methods.
- Do not guess codes, flood prompts, or test another user's factors.

## Authorized Assessment Workflow

1. Capture the normal first-factor, challenge, verification, and protected-resource sequence.
2. In a clean controlled session, verify protected resources remain denied until a valid controlled factor completes.
3. Verify that changing account, session, factor, or requested action during the flow does not satisfy MFA for a different controlled context.
4. Check expiry, single-use behavior, retries, and recovery/backup-code revocation using documented low-volume limits.
5. Confirm factor enrollment, removal, and fallback require recent authentication and notify the account owner.

## Observations and Interpretation

A successful protected action without completed MFA, or MFA confirmation applying to a different controlled context, can be an authentication bypass.

## False-Positive Controls

Distinguish remembered-device policy, grace periods, and trusted-network settings from unintended bypasses; repeat after clearing browser state.

## Remediation

Track MFA completion server-side and bind it to account, session, factor, action, and expiry; rate-limit safely; require reauthentication for factor changes.

## Sources

- [PortSwigger: Multi-factor authentication](https://portswigger.net/web-security/authentication/multi-factor)
- [OWASP Multifactor Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Multifactor_Authentication_Cheat_Sheet.html)
