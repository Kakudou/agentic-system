# Credential Inclusion

## Purpose and Preconditions

Use when a CORS-enabled endpoint returns account-bound or otherwise protected data. Work only with a program-approved account and a harmless read-only response. Never export or replay cookies, authorization headers, or certificates.

## Safe Assessment

1. Identify the endpoint's authentication mechanism and whether its response changes for the controlled account.
2. Record `Access-Control-Allow-Origin` and `Access-Control-Allow-Credentials` for a trusted and controlled unrelated origin.
3. In a clean browser profile, confirm whether credentials are included under normal browser rules and whether the unrelated origin can read the harmless response.
4. Stop after the minimum proof; do not invoke state-changing operations or collect sensitive data.

## Interpretation and Controls

`Access-Control-Allow-Credentials: true` alone is not a finding. Browser-readable exposure requires a compatible non-wildcard allowed origin, actual credential inclusion, and protected response data. Distinguish cookie credentials from authorization headers, which browser pages cannot attach cross-origin without other application behavior. Confirm public, anonymous, and session-bound responses differ.

## Evidence and Remediation

Capture redacted response headers, controlled browser outcome, and endpoint sensitivity. Restrict credentialed CORS to an exact allowlist, minimize credentialed cross-origin endpoints, and avoid relying on CORS as the authorization decision.

Sources: [PortSwigger Academy: CORS](https://portswigger.net/web-security/cors), [MDN: CORS credentials](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS#requests_with_credentials).
