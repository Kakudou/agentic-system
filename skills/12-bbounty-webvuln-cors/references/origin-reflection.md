# Origin Reflection

## Purpose and Preconditions

Use when a response's `Access-Control-Allow-Origin` appears to echo a requesting origin. Confirm written scope and select a read-only endpoint. If authentication is relevant, use only a program-approved account and harmless controlled data.

## Safe Assessment

1. Record an ordinary baseline and the response policy for a documented trusted origin.
2. Compare it with one or two controlled, unrelated origins using normal request capture.
3. Record the exact allow-origin value, credential permission, and `Vary` response header.
4. If the response is protected, confirm in a clean browser whether an unrelated origin can actually read only the harmless controlled response.

## Interpretation and Controls

Reflection is not independently exploitable when the response is public or browsers cannot make credentialed response data readable. Treat CDN/proxy header injection, redirects, cached variants, documented integrations, and a trusted origin under the same organizational control as alternatives to rule out. A raw client can show server policy but cannot prove browser access.

## Evidence and Remediation

Preserve redacted baseline/comparison headers, endpoint sensitivity, clean-browser result, and controls. Use exact server-side allowlist matching for scheme, host, and port; emit `Vary: Origin` for dynamic policies; do not allow unrelated origins to read protected responses.

Sources: [PortSwigger Academy: CORS](https://portswigger.net/web-security/cors), [MDN: CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS).
