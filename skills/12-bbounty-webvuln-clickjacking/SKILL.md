---
name: 12-bbounty-webvuln-clickjacking
description: Assess authorized UI-redressing and frame-policy exposure without interaction-forcing proof content.
metadata:
  version: 2.0
  opencode/slash: "true"
---

# UI-Redressing and Frame-Policy Assessment

## Purpose

Assess only explicitly authorized targets, paths, origins, and test accounts. This workflow establishes whether an application permits unintended framing and whether that condition creates a credible, bounded UI-redressing risk. It does not create iframe proof pages, overlays, bypass attempts, social-engineering content, credential handling, or state-changing interactions.

## Prerequisites

- Written authorization covering the target, permitted origins, rate limits, and assessment method.
- An approved same-account test context and harmless, non-production test data if authenticated pages are in scope.
- A defined stop owner and a clean browser profile for non-interactive confirmation.

## Workflow

1. **Inventory candidate pages and actions.** Identify in-scope HTML pages, redirects, and meaningful UI actions without invoking actions. Record coverage in the [page/action/frame-policy worksheet](assets/coverage-worksheet.md). Read [clickjacking basics](references/clickjacking-basics.md) and [UI redressing](references/ui-redressing.md) for applicability, and [frame-policy inventory](references/frame-policy-inventory.md) for collection boundaries.
2. **Interpret declared protections.** Capture the final navigation response and relevant redirect responses. Interpret `Content-Security-Policy: frame-ancestors` with [frame ancestors](references/frame-ancestors.md) and `X-Frame-Options` with [browser and header interpretation](references/browser-header-interpretation.md); do not treat a single header observation as browser proof.
3. **Confirm only a bounded condition.** Where policy appears permissive, use an approved controlled same-account context to observe whether the selected page is rendered as a frame, without clicks, form input, or action invocation. Follow [controlled same-account embedding assessment](references/controlled-embedding-assessment.md) and record the result in the [browser confirmation matrix](assets/browser-confirmation-matrix.md).
4. **Validate the finding boundary.** Separate framability from exploitability. Apply [confirmation and evidence](references/validation-evidence.md), [impact boundaries](references/impact-boundaries.md), and the [evidence and stop checklist](assets/evidence-stop-checklist.md). Stop on any unexpected authenticated data, consent prompt, state transition, scope ambiguity, or browser behavior outside the approved condition.
5. **Report and prevent recurrence.** State the affected page, observed final policy, browser result, meaningful action category, limitations, and smallest safe correction. Use [prevention](references/prevention.md) and the [remediation lookup](assets/remediation-lookup.md).

## Evidence

- Authorization boundary, target URL, test-account/test-data label, and timestamp.
- Redacted redirect chain and final response policy headers.
- Browser/version/profile state and observed rendered-or-blocked result, with no secrets or sensitive page content.
- Coverage, false-positive controls, stop/cleanup status, impact boundary, and recommended remediation.

## Output

```yaml
ui_redressing_assessment:
  target: string
  authorized_scope: string
  pages_assessed: [string]
  policy_observed: [string]
  browser_confirmation: rendered | blocked | inconclusive | not_tested
  meaningful_action_category: none | low_risk | sensitive | out_of_scope
  impact: not_established | bounded | confirmed
  false_positive_controls: [string]
  evidence: [redacted-artifacts]
  remediation: [string]
  cleanup_status: complete | not_applicable
```

## Reference Index

- [Frame-policy inventory](references/frame-policy-inventory.md)
- [Controlled embedding assessment](references/controlled-embedding-assessment.md)
- [Browser and header interpretation](references/browser-header-interpretation.md)
- [Confirmation and evidence](references/validation-evidence.md)
- [Impact boundaries](references/impact-boundaries.md)
- [Prevention](references/prevention.md)
- [Clickjacking basics](references/clickjacking-basics.md)
- [Assessment techniques](references/techniques.md)
- [Payload safety](references/payloads.md)
- [UI redressing](references/ui-redressing.md)
- [Frame ancestors](references/frame-ancestors.md)
