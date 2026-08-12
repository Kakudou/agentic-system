# Frame-Policy Inventory

## Purpose and Preconditions

Use to create an authorized coverage set for pages, redirects, and action categories. Confirm scope, rate limits, and whether authenticated navigation is permitted.

## Safe Bounded Methodology

Use normal navigation and response capture to list selected pages and their final response headers. Record CSP `frame-ancestors`, `X-Frame-Options`, status, redirect destination, and documented embedding need in the [coverage worksheet](../assets/coverage-worksheet.md). Do not fuzz paths, modify requests, or invoke actions.

## Observations and Interpretation

Policy can vary by route, application, authentication state, and redirect target. The effective candidate for browser confirmation is the final HTML response, not a generic host-level assumption. Missing or inconsistent protection is a lead requiring browser confirmation and impact analysis.

## False-Positive Controls

Separate API/non-HTML responses, error pages, stale cache variants, and intentionally embeddable public widgets from account or administrative pages. Note multiple headers and policy-report-only deployments.

## Cleanup and Stop Conditions

Stop if navigation reaches an unapproved host, shows sensitive data outside the designated test record, or requires a state-changing action. Clear only transient test browser data.

## Evidence and Remediation

Preserve a redacted coverage list, final headers, and redirect notes. Normalize protection across sensitive HTML routes through centrally managed CSP and documented exceptions.

Sources: [PortSwigger: Clickjacking](https://portswigger.net/web-security/clickjacking), [PortSwigger: CSP](https://portswigger.net/web-security/cross-site-scripting/content-security-policy).
