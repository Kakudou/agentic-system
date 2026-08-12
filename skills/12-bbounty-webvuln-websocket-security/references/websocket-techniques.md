# Origin and Authentication Review

## Purpose and Preconditions

Review whether a normal WebSocket handshake presents an origin and how the endpoint authenticates the authorized test account. This is a configuration and behavior review, not an origin-bypass exercise.

## Bounded Methodology

1. Observe the normal browser handshake from the in-scope application page.
2. Record whether an `Origin` value is present, the authentication mechanism category, and whether the server accepts the normal connection.
3. Compare observations with documented application expectations or approved source/configuration review, if available.
4. Mark a concern only where evidence shows a missing or inconsistent server-side control; otherwise mark the result inconclusive.

## Observation and Interpretation

- Browser WebSocket handshakes commonly include `Origin`; the server should apply an allowlist appropriate to the application.
- Cookie-associated authentication can require origin validation and additional anti-CSRF design. Token use does not remove the need to validate authorization.
- Do not infer acceptance of an untrusted origin from a normal same-origin connection.

## False-Positive Controls

- A missing header in a proxy display can be a tooling artifact. Corroborate with browser network metadata or server configuration evidence.
- CDN, reverse-proxy, and development environments may transform headers; identify the evaluated deployment and boundary.

## Cleanup and Stop Conditions

Do not alter headers, start external pages, or initiate connections from another origin. Stop and report an evidence gap if validating the control would require any of those actions.

## Evidence

Capture a redacted normal handshake summary, expected origin policy, authentication category, environment, and any approved configuration observation.

## Remediation

Enforce a strict server-side origin allowlist when browser-originated connections are supported, authenticate at connection establishment, and require per-message authorization after connection establishment.

## Sources

- [PortSwigger: WebSocket security](https://portswigger.net/web-security/websockets)
- [PortSwigger: Cross-site WebSocket hijacking](https://portswigger.net/web-security/websockets/cross-site-websocket-hijacking)
