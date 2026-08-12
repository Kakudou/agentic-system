# Controlled Internal Service Differentiation

## Use When

Use this reference only when written authorization names a program-owned internal test fixture or equivalent isolated service. It is not a basis for discovering infrastructure.

## Safe Assessment

Use the assigned fixture, documented endpoint, and a single low-impact request. The goal is only to demonstrate that a destination-class restriction is missing or ineffective. Do not vary ports, enumerate addresses, collect banners, invoke state-changing endpoints, or access live internal services.

## Interpretation

Different response codes or timeouts may reflect proxies, firewalls, caches, retries, or DNS behavior. Confirm against fixture logs and a known-safe control destination. Report the boundary class, not internal hostnames, network ranges, service versions, or topology.

## Source

- PortSwigger: [Server-side request forgery (SSRF)](https://portswigger.net/web-security/ssrf)
