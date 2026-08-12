# Proxy And CDN Normalization

## Purpose And Preconditions

Use when a CDN, load balancer, reverse proxy, service mesh, or application framework can make independent authority decisions. Require a documented public route, canonical baseline, and approved inert marker. This is not a procedure for malformed or duplicate requests.

## Bounded Marker Methodology

1. Compare canonical baseline and one marker request at public edge using the same safe method and path.
2. Record visible intermediary identity, status, redirect location, and only non-sensitive headers that indicate routing or canonicalization.
3. If the program supplies staging or observability, correlate requests there; otherwise mark downstream layer unknown.
4. Populate the [proxy/CDN normalization matrix](../assets/proxy-cdn-normalization-matrix.md) with observed facts, not assumptions.

## Observations And Interpretation

Edge rejection can hide downstream acceptance; edge acceptance can precede application rejection. Canonical redirects should preserve intended public origin. Different behavior across documented aliases may be intentional migration behavior.

## False-Positive Controls, Cleanup, And Evidence

Control for WAF challenges, geographic routing, TLS certificate selection, cookies, language routing, and transient origin failures. Do not vary forwarded/override headers or bypass layers. Stop on sensitive content, unexpected target routing, state change, or rate limiting. Retain sanitized metadata and the completed matrix.

## Remediation

Normalize and validate authority once at the trusted edge, forward the approved canonical value explicitly, and configure the origin to reject direct or inconsistent authority.

## Source

- PortSwigger: <https://portswigger.net/web-security/host-header>
