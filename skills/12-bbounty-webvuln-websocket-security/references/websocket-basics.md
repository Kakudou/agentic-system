# WebSocket Basics

## Purpose and Preconditions

Use this guide to recognize a WebSocket connection before assessing it. Work only on an authorized endpoint with a dedicated test account; this guide supports observation, not message construction or mutation.

## Bounded Methodology

1. Open the in-scope feature normally and identify the upgraded connection in browser network tools or an approved proxy.
2. Record only endpoint path, transport scheme, negotiated subprotocol, connection timing, and message direction or type.
3. Treat the HTTP upgrade as the authentication boundary and the subsequent bidirectional messages as separate application actions.

## Observation and Interpretation

- `wss` indicates TLS is used for the WebSocket transport; it does not itself establish authorization.
- The opening upgrade and every server-processed message can have distinct security controls.
- A message that reaches the browser is not proof that an unauthorized party can obtain it.

## False-Positive Controls

- Distinguish application-generated reconnects and load-balancer changes from security decisions.
- Do not infer a missing control from a browser UI alone; capture the relevant sanitized protocol fact and expected behavior.

## Cleanup and Stop Conditions

Close the test connection after observation. Stop if a connection exposes credentials, private data outside the test account, or an endpoint outside the written scope.

## Evidence

Keep a sanitized endpoint inventory, timestamps, feature name, transport, and subprotocol. Redact cookies, tokens, keys, message content, and personal data.

## Remediation

Use TLS (`wss`), minimize sensitive data in messages, and enforce authorization at the server for every action rather than relying on the connection alone.

## Sources

- [PortSwigger: WebSocket security](https://portswigger.net/web-security/websockets)
- [PortSwigger: Manipulating WebSocket messages](https://portswigger.net/web-security/websockets/manipulating-websocket-messages)
