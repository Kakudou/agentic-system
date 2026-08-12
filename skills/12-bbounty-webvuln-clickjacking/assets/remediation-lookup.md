# Frame-Policy Remediation Lookup

| Observed condition | Minimum correction | Validation boundary |
|---|---|---|
| Sensitive page has no effective framing restriction | Set enforced `Content-Security-Policy: frame-ancestors 'none'` if no embed is required. | Confirm final response and non-interactive browser block. |
| Same-origin embedding is required | Set enforced `frame-ancestors 'self'`. | Confirm intended same-origin rendering and unrelated-parent block without interaction. |
| Specific partner embed is required | Use a minimal explicit `frame-ancestors` allowlist of documented parent origins. | Confirm each approved parent and review scheme/host/port ownership. |
| Legacy browser support is required | Add compatible `X-Frame-Options: DENY` or `SAMEORIGIN` where its semantics match policy. | Test supported legacy browser behavior without treating it as a replacement for CSP. |
| Policy differs by route or redirect | Apply a centrally managed route policy and test final HTML responses, redirects, and error paths. | Inventory representative routes and approved embeds. |
| Only client-side frame-busting is present | Replace or supplement it with enforced response headers. | Confirm header delivery and browser enforcement. |

Sources: [PortSwigger: Clickjacking](https://portswigger.net/web-security/clickjacking), [PortSwigger: CSP](https://portswigger.net/web-security/cross-site-scripting/content-security-policy).
