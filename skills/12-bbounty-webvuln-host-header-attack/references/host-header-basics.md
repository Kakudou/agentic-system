# Host-Header Basics

## Purpose And Preconditions

Use this reference to establish what authority value a public request is expected to carry and where it is consumed. Proceed only with written authorization, a safe `GET` or `HEAD` baseline, and one program-approved inert hostname marker.

`Host` (and equivalent authority data in newer HTTP versions) is a routing input, not proof that the supplied hostname is trusted. TLS/SNI, CDN or load balancer, reverse proxy, framework settings, and link-generation code can each make a separate decision.

## Bounded Marker Methodology

1. Record canonical-host baseline: URL, TLS/SNI endpoint, status, redirect target, and non-sensitive response headers.
2. Change only declared authority to the approved marker; retain method, path, protocol, and all other headers.
3. Record whether the request is rejected, redirected to canonical host, or reaches the same public route.
4. Where a response contains a public absolute URL, inspect only its host portion for the marker. Do not invoke accounts, email, reset, cacheable user content, or backend-facing features.

## Observations And Interpretation

- Rejection or canonical redirect is consistent with an allowlist, but its enforcement layer remains to be identified.
- Marker acceptance at the edge but application rejection indicates inconsistent enforcement, not automatically exploitable behavior.
- A marker in a non-sensitive absolute URL shows host-derived output. Treat it as a trust-boundary defect only after safe reproduction and deployed-path confirmation.

## False-Positive Controls, Cleanup, And Evidence

Compare status, redirect location, content type, and stable response metadata with baseline. Account for locale redirects, CDN challenge pages, maintenance responses, and browser/proxy rewriting. Stop on sensitive data, state change, rate limiting, or a route outside written scope. Capture sanitized baseline/marker metadata, TLS/proxy context, output location, and marker ownership.

## Remediation

Use a configured canonical public origin or exact allowlist at the trusted edge; generated absolute URLs should use that trusted configuration rather than client authority.

## Source

- PortSwigger: <https://portswigger.net/web-security/host-header>
