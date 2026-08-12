# Transport and Header Posture

## Purpose and Preconditions

Use this after a baseline exists to assess whether normal responses express an appropriate transport and browser-security posture. Limit review to authorized origins and normal requests. Header presence alone does not establish protection or severity.

## Bounded Safe Methodology

Observe the normal HTTP entry point only if in scope and compare its redirect behavior with the HTTPS baseline. Record the final HTTPS response's transport and browser-relevant policy metadata, including transport enforcement, content policy, framing policy, MIME handling, referrer handling, caching, and cookie attributes when visible in the authorized session. Compare policies across a small, representative set of ordinary routes such as a public page, login page, and authenticated page when authorized.

## Observations and Interpretation

Look for contradictions: a secure page that can be reached without a secure redirect, sensitive content with unexpectedly permissive caching, or a browser policy that conflicts with documented embedding or resource requirements. A missing header can be intentional, obsolete, supplied by another layer, or irrelevant to the route. Assess the route's data sensitivity and browser behavior before claiming impact.

## False-Positive Controls

- Account for reverse proxies, CDNs, service workers, and application-specific policy delivery.
- Verify that the observed route is intended to receive the control.
- Check a second normal response and distinguish report-only from enforced policy.
- Do not treat deprecated headers as compensating controls.

## Stop Conditions

Stop if confirmation requires certificate manipulation, protocol downgrades, interception outside authorization, or any change to a production request.

## Evidence

Capture redacted request and response metadata, redirect chain, route classification, timestamp, observed policy value, comparison route, and explanation of why the posture is relevant.

## Remediation

Enforce HTTPS consistently, set controls at the appropriate application or edge layer, scope policies to the actual content, and regression-test representative routes. Roll out transport and content policies carefully to avoid breaking legitimate subdomains or third-party integrations.

## Sources

- PortSwigger Web Security Academy, [HTTP security headers](https://portswigger.net/web-security/learning-paths/server-side-vulnerabilities-apprentice/http-security-headers)
- OWASP Secure Headers Project, [Headers](https://owasp.org/www-project-secure-headers/)
