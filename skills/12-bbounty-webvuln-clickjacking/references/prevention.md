# Prevention

## Purpose and Preconditions

Use after a confirmed or suspected policy gap to select a product-compatible fix. Identify legitimate parent origins and route classes before changing policy.

## Safe Bounded Methodology

Map routes that require embedding and routes that do not. For each, select an enforced `frame-ancestors` policy using `'none'`, `'self'`, or a minimal explicit allowlist. Validate in staging or another approved environment with ordinary navigation and non-interactive rendering checks; do not use bypass attempts.

## Observations and Interpretation

`frame-ancestors` is the principal modern framing control. `X-Frame-Options` can support legacy clients but has less expressive semantics. Client-side frame-busting is not a replacement for headers. A blanket policy can break approved integrations, so exceptions must be explicit and narrowly scoped.

## False-Positive Controls

Check all delivery paths, including redirects, error routes, identity flows, and CDN-served pages. Verify that CSP is enforced rather than report-only and that intermediaries preserve headers. Confirm each listed parent is organizationally intended.

## Cleanup and Stop Conditions

Roll back test-only configuration through the normal change process. Stop deployment if approved embeds break, policy ownership is unclear, or validation requires interacting with sensitive actions.

## Evidence and Remediation

Keep the route-to-policy decision, approved parent inventory, redacted response headers, and non-interactive regression results. Use the [remediation lookup](../assets/remediation-lookup.md) for concise mapping.

Sources: [PortSwigger: Clickjacking](https://portswigger.net/web-security/clickjacking), [PortSwigger: CSP](https://portswigger.net/web-security/cross-site-scripting/content-security-policy).
