# Account Takeover Impact Assessment

## Purpose

Safely scope the impact of an authentication defect without accessing non-controlled accounts.

## Preconditions

- A suspected issue has a minimal controlled proof.
- Do not use third-party identities, credentials, tokens, mailboxes, social engineering, or breach data.

## Authorized Assessment Workflow

1. State the prerequisite defect and affected controlled flow.
2. Demonstrate only the least-privileged outcome on a second program-approved account when cross-account testing is authorized.
3. Stop before viewing sensitive data, changing credentials, enrolling factors, or altering payment, recovery, or notification settings.
4. Record the exact authorization boundary crossed, account labels, and redacted server evidence.
5. Assess whether compensating controls or user interaction constrain real-world impact.

## Observations and Interpretation

Cross-account access or ability to change authentication state between controlled accounts can support an ATO impact claim. A theoretical chain without a controlled proof should be reported as a hypothesis, not confirmed takeover.

## False-Positive Controls

Verify account separation, roles, tenancy, and intentional shared-resource behavior; reproduce in clean sessions.

## Remediation

Fix the underlying binding or authorization defect, require reauthentication for security changes, revoke affected sessions, notify users, and review related recovery paths.

## Sources

- [PortSwigger: Authentication vulnerabilities](https://portswigger.net/web-security/authentication)
- [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)
