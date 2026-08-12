# CORS Origin and Credential Assessment Matrix

Use after scope and a read-only endpoint are established. Record headers and browser observations; do not treat a manually supplied `Origin` header as browser proof.

| Comparison | Preconditions | Safe authorized test | Interpret as a lead when | False-positive control |
|---|---|---|---|---|
| Trusted versus unrelated origin | Endpoint is in scope | Compare response CORS headers for one documented trusted origin and one controlled unrelated origin | The unrelated origin is allowed or reflected | Confirm the origin is not an approved asset, redirect, tenant, or documented integration |
| Broad matching | A non-exact policy is suspected | Compare clearly distinct controlled origins without using lookalike production domains | Matching extends beyond the documented allowlist | Verify normalization, proxy behavior, and whether the response is public |
| Credentialed read | Controlled account and harmless protected response | In a clean browser, observe whether a cross-origin request can read the harmless response | Browser allows an unrelated origin to read credentialed data | Confirm actual credential inclusion and response readability; headers alone are insufficient |
| Preflight policy | Non-simple browser request is relevant | Inspect the browser's preflight and actual response for the selected read-only route | Preflight and actual response jointly permit unintended access | Confirm method/header policy applies to the actual endpoint, not an OPTIONS default |
| `null` origin | Explicitly permitted by program | Compare `null` treatment with trusted and unrelated origin behavior | `null` is allowed for a protected credentialed response | Confirm browser-relevant origin conditions and protected response readability |

## Evidence and Remediation Checklist

### Evidence

- [ ] Scope, endpoint, authorization, and harmless test-data label recorded.
- [ ] Redacted request and response headers captured for baseline and comparison.
- [ ] `Access-Control-Allow-Origin`, `Access-Control-Allow-Credentials`, and `Vary` recorded.
- [ ] Clean-browser observation distinguishes network delivery from JavaScript readability.
- [ ] Caches, CDNs, proxies, redirects, and documented trusted integrations ruled out.
- [ ] No cookies, tokens, authorization headers, or sensitive response content retained.

### Remediation lookup

| Observed condition | Recommended correction |
|---|---|
| Unintended reflected or broad origin | Use a server-side exact allowlist of normalized scheme, host, and port values; reject all other origins. |
| Credentialed protected response readable cross-origin | Limit allowed origins to exact trusted origins and return credentials only where required. |
| Public endpoint uses broad access | Verify the response remains intentionally public and does not vary by cookies or authorization. |
| Dynamic origin response | Send `Vary: Origin` and configure intermediary caches to prevent cross-origin response mixing. |
| `null` accepted without a documented need | Reject `null` for protected resources. |

Sources: [PortSwigger Academy: CORS](https://portswigger.net/web-security/cors), [MDN: CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS).
