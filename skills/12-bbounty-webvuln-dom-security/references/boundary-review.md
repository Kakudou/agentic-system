# Cross-Window and Storage Boundary Review

## Purpose and Preconditions

Review client-side trust boundaries involving frames, message listeners, redirects, referrers, and persistent browser data without transmitting messages, changing storage, or modifying authentication state. Require authorization and a known relevant feature.

## Bounded Process

1. Identify the boundary, producer, receiver, expected origin, data schema, and lifecycle from code and normal runtime observation.
2. Check whether message receivers validate `origin` and data shape before use; record downstream DOM or navigation contexts.
3. For storage and referrer reads, determine writer ownership, integrity assumptions, scope, expiry, and downstream receiver without altering values.
4. For navigation decisions, identify the allowlist or same-origin policy and whether it is applied before navigation.
5. Stop at passive observation if proof would require sending a message, writing state, or crossing an unapproved origin.

## Browser/Runtime Observations

- A message listener or storage read is not a vulnerability by itself; the relevant evidence is boundary validation plus downstream use.
- Same-origin persistence can still be untrusted when another feature writes the value; document the writer rather than assuming control.
- A navigation handler needs a demonstrated, reachable policy gap, not merely a parameter name.

## False-Positive Controls

- Distinguish outbound messaging from inbound trust decisions.
- Verify origin comparison semantics and schema validation on the executed branch.
- Do not treat `postMessage`, storage APIs, referrers, or redirects as DOM XSS without a traced unsafe receiver.

## Evidence

Record boundary diagram, listener/writer/consumer locations, expected and observed origins, validation branch, downstream context, and why active proof was not needed or was out of scope.

## Sources

- PortSwigger, [Web messages](https://portswigger.net/web-security/dom-based/controlling-the-web-message-source)
- OWASP, [HTML5 Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html)
