# Confirmation and Evidence

## Purpose and Preconditions

Use before declaring a UI-redressing finding. Require written scope, a completed policy inventory, a harmless test account if authentication was used, and no recorded state-changing interaction.

## Safe Bounded Methodology

Confirm one final response and one approved parent context in a clean browser, then cross-check response headers, redirect path, and action classification. Complete the [evidence and stop checklist](../assets/evidence-stop-checklist.md). Do not expand to additional origins or actions solely to strengthen a report.

## Observations and Interpretation

A confirmed finding needs a reproducible mismatch between intended framing policy and observed rendering plus a justified impact boundary. Mark results inconclusive when browser behavior, parent authorization, or action relevance is uncertain. Describe conditions, not hypothetical completion of an action.

## False-Positive Controls

Rule out documented embedding, temporary proxy/CDN behavior, response variation by authentication, browser extensions, cached content, and independent confirmation steps. Verify remediation advice against actual product embedding requirements.

## Cleanup and Stop Conditions

Close test contexts, clear transient data, and record cleanup. Stop and escalate on unexpected data, prompts, navigation beyond authorization, or any indication that an action may be triggered.

## Evidence and Remediation

Include authorization reference, redacted headers, browser matrix row, page/action category, controls, limitations, and cleanup status. Recommend the smallest effective policy correction and a regression check for the affected route class.

Sources: [PortSwigger: Clickjacking](https://portswigger.net/web-security/clickjacking), [PortSwigger: CSP](https://portswigger.net/web-security/cross-site-scripting/content-security-policy).
