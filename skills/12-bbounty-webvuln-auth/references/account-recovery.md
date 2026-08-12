# Account Recovery

## Purpose

Assess recovery methods as alternate authentication flows and confirm they provide equivalent identity assurance.

## Preconditions

- Recovery is explicitly in scope and all mailboxes, factors, and accounts are controlled.
- Do not contact support, social-engineer staff, or use real recovery data without written authorization.

## Authorized Assessment Workflow

1. Map available recovery options and their prerequisites for a controlled account.
2. Complete the normal controlled recovery path and record state changes, notifications, and expiry behavior.
3. Verify recovery proof cannot be used for a different controlled account or a different pending transaction.
4. Confirm recovery revokes or challenges existing sessions and factors according to documented policy.
5. Stop on unexpected cross-account impact and escalate through the program channel.

## Observations and Interpretation

Recovery that lowers identity assurance, misbinds account state, or leaves compromised sessions active may enable takeover.

## False-Positive Controls

Account for intended support workflows, recovery cooling-off periods, and asynchronous notification delivery.

## Remediation

Apply risk-based verification, bind proof to the account and transaction, expire and single-use recovery artifacts, notify users, and revoke sessions where appropriate.

## Sources

- [PortSwigger: Other authentication mechanisms](https://portswigger.net/web-security/authentication/other-mechanisms)
- [OWASP Forgot Password Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html)
