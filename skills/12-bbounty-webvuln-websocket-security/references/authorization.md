# Message Schema and Authorization Mapping

## Purpose and Preconditions

Build an evidence-backed map of observed message types and their expected server-side permissions without changing message fields or crossing account, role, or ownership boundaries. Use a dedicated authorized test account.

## Bounded Methodology

1. Trigger each documented harmless action once through the ordinary UI.
2. Record message direction, type or operation label, non-sensitive field names, affected test-owned resource category, and expected permission.
3. Record the corresponding server acknowledgement, rejection, or state update.
4. Use the coverage worksheet to identify message types that were not observable or are unsafe to test.

## Observation and Interpretation

- A UI-hidden action is not proof that the server enforces authorization; only server-side evidence or an approved review can establish it.
- An accepted normal action confirms the test account's expected permission only.
- Map authorization by action and resource, not by connection: a valid connection must not imply universal permission.

## False-Positive Controls

- Do not alter identifiers, roles, ownership, recipients, action names, or message structure.
- Separate client-side UI restrictions from server responses. Mark unobservable controls as inconclusive rather than speculating.

## Cleanup and Stop Conditions

Use only reversible actions on test-owned data. Stop if an action could notify, affect, or disclose data to another user, tenant, integration, or production workflow.

## Evidence

Keep a sanitized action-to-message table with expected permission, observed server result, test data ownership, timestamp, and correlation ID where available.

## Remediation

Define explicit server-side schemas per operation, derive actor identity from validated session context, and authorize the actor against the requested action and resource on every message.

## Sources

- [PortSwigger: WebSocket security](https://portswigger.net/web-security/websockets)
- [PortSwigger: Manipulating WebSocket messages](https://portswigger.net/web-security/websockets/manipulating-websocket-messages)
