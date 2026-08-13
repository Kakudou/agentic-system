---
name: 12-bbounty-webvuln-auth
description: "Assess authorized authentication flows, session lifecycle, recovery, MFA, throttling, account binding, and persistent-login controls using program-approved test accounts and minimum-impact evidence."
metadata:
  version: "1.0"
  opencode/slash: "true"
---

# Authentication Assessment

Assess web authentication only within explicit program scope and with program-approved test accounts. Preserve account availability, do not collect credentials or tokens, and do not test other users' accounts, production lockout boundaries, or recovery channels unless the program explicitly authorizes them.

## Purpose

Find authorization-impacting defects in registration, login, recovery, MFA, sessions, and persistent-login mechanisms while producing reproducible, minimally invasive evidence.

## Prerequisites

- Written target scope and rules of engagement, including rate, concurrency, and account-recovery limits.
- At least two program-approved test accounts when cross-account isolation is in scope, plus a controlled mailbox or authenticator where required.
- A safe request-capture method and a way to redact secrets from stored evidence.
- Known escalation and stop contacts for account lockouts, unexpected notifications, or suspected cross-account access.

## Workflow

1. **Establish the assessment boundary.** Record allowed hosts, approved accounts, test window, and explicit prohibitions. Build a flow map for registration, login, logout, password change/reset, recovery, MFA, and persistent login. Use [auth flows](references/auth-flows.md) and [registration](references/registration.md) when those flows exist.
2. **Capture a baseline.** For each approved account, capture a normal request/response sequence and expected authenticated and unauthenticated states. Use the evidence fields and test-selection matrix in [the authentication cheatsheet](assets/auth_cheatsheet.md).
3. **Assess identity and password controls safely.** Compare only controlled valid and invalid inputs at a deliberately low rate; stop at the first indication of throttling or lockout. Load [username enumeration](references/username-enumeration.md), [password policy](references/password-policy.md), [password policies](references/password-policies.md), and [brute-force safeguards](references/brute-force.md) when applicable. Use [the controlled-input planner](assets/credential_wordlists.md), never a real credential list or breached credentials.
4. **Assess account lifecycle flows.** Verify binding, expiry, single use, invalidation, and notification behavior using only controlled accounts and inboxes. Load [password reset](references/password-reset.md) and [account recovery](references/account-recovery.md) at the reset or recovery step.
5. **Assess MFA state transitions.** Confirm that no protected action is available before successful MFA and that enrollment, factor changes, backup/recovery paths, and logout revoke the appropriate state. Use [MFA](references/mfa.md) for the checklist and [MFA bypass](references/mfa-bypass.md) for controlled state-binding tests.
6. **Assess session and cookie boundaries.** Compare pre-login, post-login, privilege-change, logout, and timeout behavior for approved accounts. Inspect cookie attributes and scope without exporting or replaying secrets outside the controlled browser context. Use [session management](references/session-management.md) and [cookie handling](references/cookie-theft.md).
7. **Assess persistent login and takeover impact.** For any remember-me feature, verify controlled-token lifecycle, device/session revocation, and reauthentication requirements. Use [remember-me](references/remember-me.md). If a defect chain could affect another account, stop at the least-privileged controlled proof and use [account takeover](references/account-takeover.md) to scope impact safely.
8. **Validate and report.** Reproduce the smallest safe proof, remove secrets, explain false-positive controls, and map remediation. Use [the remediation lookup](assets/auth_cheatsheet.md#remediation-lookup) before reporting.

## Validation and Evidence

- Record timestamps, authorized account labels, endpoint/method, redacted request and response metadata, expected versus observed state, and the exact safe reproduction boundary.
- Preserve only redacted artifacts. Do not retain passwords, session identifiers, reset links, MFA codes, recovery codes, or authentication headers.
- Confirm observations in a clean controlled session and distinguish application behavior from browser extensions, caches, mail gateways, WAFs, and test-environment configuration.

## Output Intent

```yaml
auth_report:
  target: string
  authorization: scope-and-test-account-labels
  flow: string
  observation: string
  reproduction: minimally-invasive-controlled-steps
  evidence: redacted-request-response-metadata
  false_positive_controls: [strings]
  impact: low | medium | high | critical
  remediation: [strings]
```

## Resources

- References: [registration](references/registration.md), [auth flows](references/auth-flows.md), [cookie handling](references/cookie-theft.md), [MFA bypass](references/mfa-bypass.md), [remember-me](references/remember-me.md), [password policy](references/password-policy.md), [account takeover](references/account-takeover.md), [password policies](references/password-policies.md), [password reset](references/password-reset.md), [account recovery](references/account-recovery.md), [username enumeration](references/username-enumeration.md), [brute-force safeguards](references/brute-force.md), [session management](references/session-management.md), and [MFA](references/mfa.md).
- Assets: [authentication cheatsheet](assets/auth_cheatsheet.md) and [controlled-input planner](assets/credential_wordlists.md).
