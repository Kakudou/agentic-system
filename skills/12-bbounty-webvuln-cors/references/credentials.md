# Credential Semantics

## Purpose and Preconditions

Read before assessing a suspected credentialed CORS exposure. Know whether the application uses cookies, browser-managed client certificates, or application-controlled authorization headers, and have a safe controlled account.

## Safe Assessment

1. Inspect redacted browser network metadata to identify the credential mechanism and cookie attributes.
2. Establish whether the selected read-only endpoint returns different data when authenticated.
3. Confirm browser behavior using ordinary application navigation and a clean profile, without copying secret values into tools or evidence.

## Interpretation and Controls

Server receipt of a manually supplied credential is not proof the browser would include it cross-origin. `Access-Control-Allow-Credentials` enables browser sharing only with a matching explicit allowed origin; wildcard `Access-Control-Allow-Origin` is incompatible with credentialed browser reads. Cookie SameSite policy can affect whether cookies are sent, but does not replace CORS validation.

## Evidence and Remediation

Record credential type as a label, not a value, alongside redacted headers and clean-browser result. Limit credentialed CORS routes, use exact origin matching, and enforce authorization on every request.

Sources: [PortSwigger Academy: CORS](https://portswigger.net/web-security/cors), [MDN: Fetch credentials](https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials).
