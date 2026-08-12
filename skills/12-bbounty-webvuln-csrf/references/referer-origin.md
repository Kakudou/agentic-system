# Origin and Referer Validation

## Purpose and Preconditions

Use when the application relies on request-origin metadata for CSRF protection. Choose an approved, reversible operation and a browser-relevant test context; manual header manipulation is only a server behavior observation.

## Safe Assessment

1. Capture a normal controlled request and document its Origin and Referer behavior.
2. Make the minimum permitted comparison for absent or untrusted metadata without changing unrelated request elements.
3. Confirm whether the action completed and whether the same result occurs in an approved clean browser context.
4. Restore controlled state and stop after the minimum proof.

## Interpretation and Controls

Origin may be absent in legitimate contexts, and Referer can be reduced by browser privacy policy. Header acceptance is not enough to show an attacker-controlled browser can produce the request. Account for CORS, custom headers, content type, reauthentication, and application confirmations that may independently prevent CSRF.

## Evidence and Remediation

Record redacted normal and comparison metadata, actual state result, browser context, and cleanup. Validate Origin against an exact trusted set when present, use a strict Referer fallback when necessary, and reject unexpected or missing values according to a documented compatibility policy.

Sources: [PortSwigger Academy: CSRF](https://portswigger.net/web-security/csrf), [OWASP CSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html).
