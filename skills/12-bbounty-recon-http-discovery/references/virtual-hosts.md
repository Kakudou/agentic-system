# Response and Service Differentiation

## Purpose and Preconditions

Determine whether already-authorized endpoints appear to be distinct services or delivery paths. This reference does not authorize virtual-host enumeration, DNS discovery, host-header modification, or alternate-port checks.

## Bounded Safe Methodology

Compare ordinary baseline records from the fixed approved endpoint list. Use stable, non-sensitive features: final canonical endpoint, status class, content type, coarse response size, server timing, selected cache headers, certificate identity, and explicitly public branding. Make no request variation solely to induce a difference.

## Observations and Interpretation

Consistent differences can identify separate delivery behavior, but they may also result from CDN edge selection, tenant routing, A/B tests, localization, maintenance, or authentication state. Identical responses do not prove that services are shared.

## False-Positive Controls

Use the same neutral client context and compare multiple stable features rather than one header or page title. Label inferences as tentative until corroborated by authorized evidence. Never convert a response difference into an assumed hostname, ownership claim, or exposure.

## Scope, Evidence, and Handoff

Keep comparisons within the approved endpoint inventory and request budget. Record the compared endpoints, features, confounders, repeat observations, and confidence in the [matrix](../assets/redirect-tls-service-matrix.md). Escalate only the differentiated service record, not a claim of a hidden virtual host.

## Sources

- [RFC 9110: HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110)
- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
