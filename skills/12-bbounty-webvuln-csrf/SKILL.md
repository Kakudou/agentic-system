---
name: 12-bbounty-webvuln-csrf
description: Safely assess authorized CSRF defenses on controlled state-changing workflows.
metadata:
  version: 1.0
  opencode/slash: "true"
---

# CSRF Assessment

Assess CSRF only on explicitly authorized applications using designated accounts, controlled test records, and reversible changes. Do not target other users, abuse login or recovery flows, create proof pages, or cause destructive or financial actions.

## Prerequisites

- Written scope, state-change limits, approved accounts, and cleanup procedure.
- A selected low-impact state-changing operation with a known reversible outcome.
- A clean browser profile and safe request capture; redact all cookies, tokens, credentials, and personal data.

## Workflow

1. **Map defense state.** List each selected state-changing route, request method/content type, authenticated cookie behavior, token location, and Origin/Referer policy. Read the [browser precondition checklist](assets/csrf_cheatsheet.md#browser-precondition-checklist) before testing and select cases from the [defense-state matrix](assets/csrf_cheatsheet.md#csrf-defense-state-test-matrix).
2. **Assess token enforcement.** Capture a valid controlled baseline, then make the smallest permitted comparison for missing, invalid, or stale protection data. Read [token validation](references/tokens.md) and [token absence](references/token-absence.md). Confirm the action did not complete and restore any controlled state immediately.
3. **Assess browser context controls.** Where cookies authenticate the request, observe SameSite attributes and whether the selected browser context would include the session cookie. Read [SameSite behavior](references/samesite.md) and [SameSite cookie controls](references/samesite-cookies.md). SameSite is defense in depth, not a substitute for request validation.
4. **Assess Origin and Referer validation.** Compare normal application behavior with the minimum allowed absent or untrusted-context comparison. Read [Origin and Referer validation](references/referer-origin.md). Do not rely on manually supplied headers as proof of browser request behavior.
5. **Assess login or multi-step flows only when authorized.** Use only a dedicated controlled account and avoid replacing an active user session. Read [login CSRF](references/login-csrf.md) before assessing login binding or token requirements. Confirm each multi-step transition preserves its defenses.
6. **Validate and report.** Confirm the smallest browser-relevant controlled proof, rule out application-specific authorization or workflow checks, restore test data, and use the [evidence and remediation lookup](assets/csrf_cheatsheet.md#evidence-and-remediation-lookup).

## Evidence

- Scope, account/test-data label, operation, expected outcome, and cleanup record.
- Redacted valid baseline and comparison metadata, including token location and cookie attributes.
- Browser context and observed state before/after, without preserving secrets.
- False-positive controls for browser behavior, session state, retries, and application-specific confirmations.

## Output Intent

```yaml
csrf_finding:
  target: string
  operation: string
  authorized_test_data: string
  defenses_expected: [strings]
  observed_result: string
  browser_relevance: confirmed | not_confirmed | not_tested
  evidence: [redacted-artifacts]
  cleanup_status: restored | not_applicable | pending
  remediation: [strings]
```

## Resources

- [Token validation](references/tokens.md)
- [Token absence](references/token-absence.md)
- [SameSite behavior](references/samesite.md)
- [SameSite cookie controls](references/samesite-cookies.md)
- [Origin and Referer validation](references/referer-origin.md)
- [Login CSRF](references/login-csrf.md)
- [CSRF defense-state matrix and checklist](assets/csrf_cheatsheet.md)
