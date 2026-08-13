---
name: 12-bbounty-webvuln-cors
description: Safely assess authorized CORS policy for unintended cross-origin access to controlled data.
metadata:
  version: "1.0"
  opencode/slash: "true"
---

# CORS Assessment

Assess CORS only on explicitly authorized hosts and endpoints. Use program-approved accounts and non-sensitive test records. Do not create attacker-hosted proof pages, expose credentials, or perform state-changing cross-origin requests.

## Prerequisites

- Written scope, rate limits, and an approved test account if authenticated data is in scope.
- A selected read-only endpoint that returns a harmless, account-bound or otherwise protected response.
- A clean browser profile for browser-enforcement confirmation; redact all session data from evidence.

## Workflow

1. **Map the policy.** Capture same-origin and ordinary cross-origin baselines for each candidate endpoint. Record `Access-Control-Allow-Origin`, `Access-Control-Allow-Credentials`, `Access-Control-Allow-Methods`, `Access-Control-Allow-Headers`, and `Vary`. Use the [origin and credential assessment matrix](assets/cors_cheatsheet.md) to select the minimum comparisons.
2. **Assess origin decisions.** Compare one expected trusted origin with controlled, clearly unrelated origins. A reflected or allowed origin is a lead, not a finding. Read [origin reflection](references/origin-reflection.md) before interpreting matching responses and [wildcard matching](references/wildcard-matching.md) when matching behavior is broad or pattern-based.
3. **Assess browser-readable authenticated exposure.** Only when the endpoint has safe controlled account data, determine whether the browser would attach credentials and permit the unrelated origin to read the response. Read [credential inclusion](references/credential-inclusion.md) and [credential semantics](references/credentials.md) before this step. Do not copy, export, or replay cookies, authorization headers, or client certificates.
4. **Assess special origin handling.** Test `null` only where program policy allows and browser-relevant conditions are understood. Read [null-origin handling](references/null-origin.md). Confirm any header observation in a clean browser context; a raw HTTP client does not model browser CORS enforcement.
5. **Validate and report.** Reproduce the smallest read-only controlled proof, rule out caches, gateways, and documented trusted-origin relationships, then use the [evidence and remediation checklist](assets/cors_cheatsheet.md#evidence-and-remediation-checklist).

## Evidence

- Scope authorization, endpoint, endpoint sensitivity, and designated account/test-data label.
- Redacted baseline and comparison request/response headers, including `Vary`.
- Expected versus observed browser-readable behavior in a clean profile.
- False-positive controls, cleanup status, and a minimum-necessary remediation.

## Output Intent

```yaml
cors_finding:
  target: string
  endpoint: string
  authorized_test_data: string
  policy_expected: string
  policy_observed: string
  browser_readability: confirmed | not_confirmed | not_tested
  evidence: [redacted-artifacts]
  false_positive_controls: [strings]
  remediation: [strings]
```

## Resources

- [Origin reflection](references/origin-reflection.md)
- [Credential inclusion](references/credential-inclusion.md)
- [Credential semantics](references/credentials.md)
- [Wildcard matching](references/wildcard-matching.md)
- [Null-origin handling](references/null-origin.md)
- [CORS origin/credential matrix and checklist](assets/cors_cheatsheet.md)
