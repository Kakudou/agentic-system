# Remediation Lookup

## Purpose and Preconditions

Map a traced receiver context to an engineering control after evidence establishes the actual path. This is a review aid, not a substitute for context-specific design.

| Observed context | Preferred direction | Verify with inert marker | Avoid relying on alone |
|---|---|---|---|
| Text display | Use native text-rendering APIs or framework text binding | Marker remains literal text | Generic HTML escaping rules without context review |
| HTML rendering | Avoid raw HTML; use vetted sanitization only when HTML is required | Unsafe structure is not created on the tested path | Sanitizer name or configuration assumption |
| URL/navigation | Parse structured URLs and allowlist destinations/schemes | Normal route stays within policy | String prefix checks |
| Attribute assignment | Use typed APIs and allowlisted attribute/value classes | Value is constrained for its actual consumer | Treating every attribute as equivalent |
| Message boundary | Verify exact origin and schema before downstream use | Normal message path reaches only validated branch | Wildcard trust or sender-supplied identity |
| Persistent client data | Treat data as untrusted at read and validate before use | Existing value is safely handled | Assuming same-origin storage is inherently trusted |

## Bounded Test Process

For each recommendation, define one normal-route regression observation with the existing marker. Verify the final receiver outcome only; do not mutate browser state or create active content.

## Browser/Runtime Interpretation

A remediation is evidenced for the observed browser, route, and policy configuration. Record deviations caused by framework versions, feature flags, or browser support.

## False-Positive Controls

Do not recommend a universal encoder or declare closure from a static diff. Tie the control and regression to the receiver context and the complete traced path.

## Evidence

Record flow ID, selected control, implementation owner, expected runtime result, actual regression observation, residual-risk statement, and review status.

## Sources

- PortSwigger, [DOM-based cross-site scripting](https://portswigger.net/web-security/cross-site-scripting/dom-based)
- OWASP, [Cross Site Scripting Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
