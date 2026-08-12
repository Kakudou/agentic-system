# Prevention And Remediation

## Use When

Use this reference after confirming a server-side fetch behavior or during a defensive review.

## Recommended Controls

Avoid arbitrary user-supplied destinations where a stable integration design is possible. Otherwise, allowlist exact schemes, hosts, and ports required by the feature; parse and canonicalize once; validate the final resolved address; block loopback, link-local, private, multicast, and otherwise reserved destinations; and revalidate every redirect.

Constrain outbound network egress independently of application validation. Use short connection and response limits, disable redirects by default, isolate fetchers from sensitive networks, and log blocked destination classes without recording sensitive URLs. Cloud workloads should enforce provider metadata hardening and network controls.

## Source

- PortSwigger: [Server-side request forgery (SSRF)](https://portswigger.net/web-security/ssrf)
- OWASP: [Server Side Request Forgery Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html)
