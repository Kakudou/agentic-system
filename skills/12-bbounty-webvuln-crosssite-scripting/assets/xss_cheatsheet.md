# XSS Test-Selection Matrix

All examples are **authorized-test probes**. Use a test account and a non-destructive signal such as `print()` or a labelled console message. A response containing a probe is not proof of execution.

## Reflection marker workflow

1. Submit a unique 8-12 character alphanumeric marker per input, for example `rxK4mQ82`.
2. Search raw responses for each marker and preserve the request/response pair.
3. Find the marker in DevTools Elements after page scripts run; View Source cannot show DOM mutations.
4. Record surrounding syntax, transformations, viewer role, and whether the marker persists.
5. Use one delimiter probe to identify the context, then select exactly one matching probe below.
6. Confirm the signal in a clean browser session under the target origin and remove any stored test data.

## Context selection

| Context observed | First probe | Success criterion | Next action |
| --- | --- | --- | --- |
| HTML text node | `<xss-marker>` | A real element appears rather than text | Test a minimal element/event confirmation if permitted; recommend HTML output encoding. |
| Double-quoted attribute | `MARK"Q` | Quote ends or is unescaped in final DOM | Identify attribute type; test attribute-breakout only when markup structure permits. |
| Single-quoted attribute | `MARK'Q` | Single quote ends or is unescaped | Same as above; preserve following markup syntax. |
| Unquoted attribute | `MARK Q` | Whitespace creates a new attribute | Determine if parser repairs markup; recommend quoted attributes plus encoding. |
| URL attribute | `https://example.invalid/marker` | Value is assigned as a URL | Check parsing and protocol allowlist; do not infer execution from navigation alone. |
| Inline event handler | `MARK'Q` or `MARK"Q` | JavaScript string boundary is controllable | Trace HTML decode then JS parse; use a local signal only after syntax is known. |
| Script string | matching quote plus marker | Quote/backslash behavior is known | Preserve script grammar and confirm with a minimal local signal. |
| Template literal | `${/*MARK*/1}` | Expression is evaluated rather than shown literally | Confirm only in authorized scope; replace with safe data serialization. |
| JSON bootstrap | `"MARK"` | JSON remains valid and later consumer identified | Trace parsed field to DOM; JSON alone is not XSS. |
| Client template | framework marker syntax | Framework compiles untrusted text | Identify framework/version and compiler boundary before confirmation. |

## Browser confirmation checklist

- Verify the page origin displayed by the browser and the affected authenticated role.
- Use a fresh navigation; for stored paths also use a different viewer session where authorized.
- Inspect console errors and CSP violations before calling a probe failed.
- Disable or account for extensions, cached responses, service workers, and devtools overrides.
- Capture DOM context, execution signal, request/response, CSP header, and cleanup result.
- Distinguish execution requiring a normal victim action from self-XSS requiring pasted code.

## DOM shortlist

| Sources to trace | Sinks needing review | Usually safe alternatives |
| --- | --- | --- |
| `location.search`, `location.hash`, `location.pathname`, `document.referrer`, `window.name`, `postMessage`, storage, API data | `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `document.write`, event properties, `eval`, `Function`, string timers, jQuery HTML methods | `textContent`, DOM constructors, typed URL APIs, framework escaped bindings |

## CSP quick interpretation

| Policy observation | Assessment meaning |
| --- | --- |
| Only `Content-Security-Policy-Report-Only` | Observational only; it does not block execution. |
| `script-src` with nonce/hash and no unsafe inline | Strong containment if nonce is fresh/unpredictable and scripts are trusted. |
| `unsafe-inline` or `unsafe-eval` | Reduces CSP protection for common XSS routes. |
| Broad third-party script host | Review whether untrusted parties can serve script there. |
| `frame-ancestors` | Clickjacking control, not an XSS fix. |

## Remediation lookup

| Root cause | Primary repair | Verify |
| --- | --- | --- |
| HTML text injection | Encode at HTML output boundary; use text APIs | Markup remains a text node. |
| Attribute injection | Quote attributes and attribute-encode output | Delimiters cannot terminate the value. |
| Unsafe URL | Parse URL and allowlist required schemes | Alternate encodings cannot produce disallowed schemes. |
| Script/template injection | Serialize data and avoid inline executable contexts | Input cannot change JavaScript grammar. |
| DOM sink | Replace with text/DOM APIs; sanitize required HTML | Taint no longer reaches a parsing/execution sink. |
| Stored rich text | Maintained allowlist sanitizer plus output handling | All entry-to-exit roles render inert safe content. |

## Sources

- https://portswigger.net/web-security/cross-site-scripting
- https://portswigger.net/web-security/cross-site-scripting/contexts
- https://portswigger.net/web-security/cross-site-scripting/dom-based
- https://portswigger.net/web-security/cross-site-scripting/content-security-policy
