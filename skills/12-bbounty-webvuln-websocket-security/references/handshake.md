# Handshake and Session Mapping

## Purpose and Preconditions

Map the normal, authorized test-account handshake to its server-side session context. Have written scope and a redaction plan before recording request metadata.

## Bounded Methodology

1. Observe one normal connection from the in-scope application feature.
2. Record the endpoint, `ws` or `wss`, origin presence, authentication mechanism category, subprotocol, and upgrade outcome without retaining secret values.
3. Note whether the application reconnects after an ordinary session renewal or logout event only when that behavior is part of normal test-account use.

## Observation and Interpretation

- Document whether the server accepts the normal authenticated connection and associates it with the expected test account.
- Note whether session expiry, logout, or reconnect behavior is explicitly visible in normal use; absence of an observed transition is inconclusive.
- A browser-generated `Sec-WebSocket-Key` is protocol negotiation material, not a credential and not a session-reuse test target.

## False-Positive Controls

- Do not treat the presence of a cookie as proof that cookies are the sole control.
- Do not copy, alter, or reuse authentication material. Proxy redaction or a screenshot with secrets masked is sufficient evidence.

## Cleanup and Stop Conditions

Close the observed connection and clear proxy history according to the engagement data-handling rules. Stop if credentials cannot be safely redacted or a session change would affect non-test data.

## Evidence

Preserve a sanitized handshake summary, HTTP upgrade status, test-account state, and observation time. Never include cookies, bearer tokens, keys, or full private URLs in a report attachment.

## Remediation

Require TLS, bind connections to validated server-side sessions, expire or revalidate connections consistent with session policy, and log security-relevant connection lifecycle events without logging secrets.

## Sources

- [PortSwigger: WebSocket security](https://portswigger.net/web-security/websockets)
- [PortSwigger: Cross-site WebSocket hijacking](https://portswigger.net/web-security/websockets/cross-site-websocket-hijacking)
