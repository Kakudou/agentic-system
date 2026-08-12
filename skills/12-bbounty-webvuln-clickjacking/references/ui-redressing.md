# UI Redressing

## Purpose and Preconditions

Use this overview when deciding whether an authorized framing observation has security relevance. Confirm the target page, allowed test account, and non-interaction boundary before collecting evidence.

## Safe Bounded Methodology

Inventory pages that present meaningful choices, then compare their delivered frame policy and non-interactive browser rendering in an approved same-account context. Assess only visibility and browser enforcement; do not create deceptive content, request input, or activate any page control.

## Observations and Interpretation

UI redressing requires more than a page that can be framed. The reported risk depends on a meaningful user action, a plausible untrusted framing context, and the absence of independent confirmation or browser protections. A page that is intentionally embeddable, public, informational, or has no consequential action may be a configuration concern without a reportable impact.

## False-Positive Controls

Rule out documented partner embedding, tenant-owned parent origins, redirect-specific policy differences, cached header variants, and pages that require an independent browser or server-side confirmation before any action can complete.

## Cleanup and Stop Conditions

Close test tabs and discard transient browser data. Stop if scope is unclear, protected data appears unexpectedly, a prompt requests consent, or assessment would require user interaction.

## Evidence and Remediation

Keep redacted final-response headers, browser outcome, page/action category, and controls. Restrict framing with `frame-ancestors` and, where legacy support is needed, compatible `X-Frame-Options`; preserve only documented embedding relationships.

Sources: [PortSwigger: Clickjacking](https://portswigger.net/web-security/clickjacking), [PortSwigger: CSP](https://portswigger.net/web-security/cross-site-scripting/content-security-policy).
