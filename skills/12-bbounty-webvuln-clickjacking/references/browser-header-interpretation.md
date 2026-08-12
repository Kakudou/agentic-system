# Browser and Header Interpretation

## Purpose and Preconditions

Use when interpreting captured CSP and `X-Frame-Options` headers. Have the final response, redirect context, and browser result or a documented reason it was not tested.

## Safe Bounded Methodology

Record headers exactly as received, identify enforced versus report-only CSP, and compare the declared policy with a non-interactive browser observation. Use the [browser confirmation matrix](../assets/browser-confirmation-matrix.md); do not alter request headers or browser security settings.

## Observations and Interpretation

An enforced `frame-ancestors` directive governs supported browser framing decisions. `X-Frame-Options: DENY` prevents framing; `SAMEORIGIN` permits only same-origin framing. `ALLOW-FROM` is obsolete and unreliable across browsers. Conflicting, duplicate, or absent headers require careful browser confirmation rather than optimistic interpretation.

## False-Positive Controls

Distinguish CSP report-only from enforced CSP, the initial URL from final HTML response, and browser network delivery from actual rendering. Check redirect, cache, CDN, and intermediary effects without treating a raw HTTP client as a browser-enforcement result.

## Cleanup and Stop Conditions

Close test sessions and stop if confirmation would require disabling browser protections, adding extensions, changing security preferences, or interacting with the target.

## Evidence and Remediation

Retain redacted raw headers, response status, final URL, browser/version, and result. Deploy enforced `frame-ancestors` as primary control, with `X-Frame-Options` as a legacy-compatible complement where needed.

Sources: [PortSwigger: Clickjacking](https://portswigger.net/web-security/clickjacking), [PortSwigger: CSP](https://portswigger.net/web-security/cross-site-scripting/content-security-policy).
