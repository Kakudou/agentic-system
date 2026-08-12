# Content Security Policy Assessment

CSP is a browser-enforced containment control: it restricts resource loading, script execution, and framing. It can make an XSS sink harder to exploit, but it does not remove unsafe output or DOM flows and must not be used to downgrade a confirmed injection to “not vulnerable.”

## Read the enforced policy

Collect all `Content-Security-Policy` headers and applicable meta policies for the affected response. Keep `Content-Security-Policy-Report-Only` separate: it reports violations but does not block execution. Note which policy is enforced, since multiple enforced policies combine restrictively.

Start with `script-src` and `default-src`. Record whether inline script/event handlers are allowed, whether `unsafe-eval` is allowed, which hosts can supply scripts, and whether a broad source permits attacker-controlled content. `script-src-elem` and `script-src-attr` can refine element and handler behavior. Assess actual page behavior rather than inferring protection from the header name.

Nonces and hashes can strongly limit unauthorized scripts when nonces are freshly generated per response, unpredictable, and only attached to intended scripts, or when hashes match fixed trusted content. `strict-dynamic` changes trust propagation from nonce/hash-approved scripts and needs to be assessed with browser support and the page's loader behavior. A reused or reflected nonce is not equivalent to a robust nonce.

## How CSP changes confirmation and impact

An inline HTML injection may be real while a traditional inline execution probe is blocked. Capture the console CSP violation and test only allowed, non-destructive proof paths within scope. State whether CSP blocks the tested execution mode, allows event handlers, permits a trusted-but-user-controllable script host, or leaves the application dependent on a nonce/hash. Do not claim a CSP bypass without demonstrating the exact policy parsing and allowed execution route.

Check `img-src`, `connect-src`, `form-action`, `base-uri`, and `object-src` when describing containment, but do not confuse network restrictions with XSS prevention. They may limit some effects while same-origin script execution can still read pages and make authenticated requests. CSP also cannot restore the confidentiality of DOM data exposed to executing same-origin code.

Policy injection is a separate finding: only investigate when controllable input demonstrably reaches the policy header or meta content. Policy directives are semicolon-separated; assess the final parsed policy and browser behavior safely, rather than assuming reflected text overrides a prior directive.

## Clickjacking is related but distinct

`frame-ancestors` controls which origins may frame the page. `frame-ancestors 'none'` prevents framing; `'self'` permits only same-origin ancestors. This mitigates clickjacking, not XSS. It is generally more flexible than `X-Frame-Options` and checks the ancestor hierarchy; use `X-Frame-Options` as legacy-browser defense where appropriate.

## Remediation

Fix the injection first with contextual encoding and safe DOM APIs. Deploy CSP in enforcement mode with a narrow `script-src`, nonce- or hash-authorized scripts, no unnecessary `unsafe-inline` or `unsafe-eval`, restrictive resource directives, `base-uri 'none'` where compatible, and appropriate `frame-ancestors`. Use report-only policies to tune a future enforced policy, never as the final mitigation. Retest affected user flows and third-party loaders before rollout.

## Sources

- https://portswigger.net/web-security/cross-site-scripting/content-security-policy
- https://portswigger.net/web-security/cross-site-scripting/preventing
