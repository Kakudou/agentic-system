# Frame Ancestors

## Purpose and Preconditions

Use when a response contains a `Content-Security-Policy` header or equivalent policy source. Work only on an authorized final navigation response and retain the redirect chain because policies can differ by page.

## Safe Bounded Methodology

Record every CSP header field and its `frame-ancestors` directive for the selected page. Compare it with the page's documented embedding requirement and observe the browser's non-interactive rendered-or-blocked outcome in an approved context. Do not alter headers, bypass policy, or interact with framed content.

## Observations and Interpretation

`frame-ancestors` controls which parent origins may frame the resource. `'none'` blocks all framing; `'self'` limits parents to the same origin; explicit scheme/host sources permit only those sources. An absent directive is not protection. Browser enforcement and the final response policy are decisive, not an initial redirect alone.

## False-Positive Controls

Check for multiple CSP headers, report-only policy, reverse-proxy modifications, redirect changes, and documented allowed parents. Do not infer an allow decision from a source-string resemblance; scheme, host, and port semantics matter.

## Cleanup and Stop Conditions

Remove temporary browser state and stop if testing would require a new parent origin not approved by scope or any page interaction.

## Evidence and Remediation

Preserve the redacted final CSP, redirect chain, browser result, and documented embedding requirement. Prefer a restrictive enforced `frame-ancestors` allowlist, ideally `'none'` where framing is unnecessary.

Sources: [PortSwigger: Clickjacking](https://portswigger.net/web-security/clickjacking), [PortSwigger: CSP](https://portswigger.net/web-security/cross-site-scripting/content-security-policy).
