# Protocol Handling

## Use When

Use this reference when a product feature accepts a URL and its documented scheme policy is relevant to the assessment.

## Safe Assessment

Verify the intended HTTP or HTTPS behavior only against a controlled destination. Determine whether unsupported schemes are rejected before any network activity and whether redirects can change schemes. Do not submit file, socket, messaging, database, or other non-HTTP schemes, and do not construct protocol-specific request data.

## Interpretation And Remediation

An accepted string is not proof that a scheme was fetched. Confirm the server's actual outbound behavior through response evidence or an authorized callback. The preferred control is an explicit HTTPS-only allowlist where product requirements allow it; otherwise allow only HTTP(S), reject credentials in URLs, and apply the same policy before each connection and redirect.

## Source

- PortSwigger: [Server-side request forgery (SSRF)](https://portswigger.net/web-security/ssrf)
