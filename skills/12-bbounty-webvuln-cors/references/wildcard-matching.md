# Wildcard and Pattern Matching

## Purpose and Preconditions

Use when an endpoint returns `Access-Control-Allow-Origin: *`, dynamically allows multiple origins, or appears to apply a broad origin rule. Restrict testing to controlled origins and a read-only endpoint.

## Safe Assessment

1. Compare documented trusted origins with clearly unrelated controlled origins.
2. Note whether the server returns a literal wildcard, echoes an origin, or applies a deterministic allowlist decision.
3. If a pattern is suspected, test only the minimum distinct controlled origins needed to show the boundary. Do not use deceptive domains, takeover candidates, or third-party infrastructure.
4. For protected responses, proceed to browser confirmation only under the credential-inclusion workflow.

## Interpretation and Controls

A literal wildcard may be appropriate for genuinely public, non-credentialed content. Browser credentialed reads cannot use wildcard allow-origin, so this combination is not browser proof by itself. Confirm redirects, shared API gateways, cache variants, normalization, and documented subdomain ownership before reporting a matching defect.

## Evidence and Remediation

Capture the documented policy, the minimum comparison headers, response sensitivity, and browser result where applicable. Replace broad or heuristic matching with exact normalized origin allowlists; segregate public endpoints from authenticated responses.

Sources: [PortSwigger Academy: CORS](https://portswigger.net/web-security/cors), [MDN: Access-Control-Allow-Origin](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Allow-Origin).
