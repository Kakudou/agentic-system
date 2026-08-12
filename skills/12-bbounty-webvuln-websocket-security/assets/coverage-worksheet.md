# WebSocket Handshake, Message, and Role Coverage Worksheet

## Use

Complete this for one authorized endpoint and dedicated test account. Record observations only; do not create or mutate protocol messages.

| Area | Observation | Expected control | Status | Evidence reference |
|---|---|---|---|---|
| Scope and test account |  |  |  |  |
| Endpoint and feature |  |  |  |  |
| Transport and subprotocol |  | TLS; expected negotiation |  |  |
| Handshake session mapping |  | Validated server-side session |  |  |
| Origin review |  | Server-side policy appropriate to browser use |  |  |
| Authentication category |  | Connection authentication |  |  |
| Message type or operation |  | Schema accepted or rejected server-side |  |  |
| Test-owned resource category |  | Resource authorization |  |  |
| Expected test-account role |  | Per-message action authorization |  |  |
| Server acknowledgement or rejection |  | Correlated, non-sensitive response |  |  |
| Cleanup state |  | Test marker removed or not persisted |  |  |

## Stop

Mark the worksheet `blocked` and stop if an observation would require another account, role, recipient, tenant, altered header, altered message, or sensitive data capture.
