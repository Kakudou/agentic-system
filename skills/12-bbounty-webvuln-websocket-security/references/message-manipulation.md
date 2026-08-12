# Harmless Marker-Based Validation

## Purpose and Preconditions

Confirm one documented message path using a unique, harmless marker through the application's normal test-account workflow. Use only when the program permits this action and the feature has no external recipients, irreversible effects, or production impact.

## Bounded Methodology

1. Choose a documented, reversible action owned solely by the dedicated test account.
2. Create a short unique marker that contains no executable syntax, personal data, or security-sensitive content.
3. Submit it through the ordinary application UI once and observe the corresponding client-to-server and server-to-client records.
4. Confirm whether the service accepted, rejected, normalized, or displayed the marker as expected.
5. Remove any persisted marker via the same normal application workflow.

## Observation and Interpretation

- Acceptance in the expected field confirms only the normal message path and server response observed.
- Clear schema rejection can evidence input validation; it does not establish complete authorization coverage.
- Unexpected routing, persistence, or display is a concern only within the test account and must not be extended to other users or objects.

## False-Positive Controls

- Correlate UI action, timestamp, and connection record to avoid attributing background traffic to the marker.
- Test once. Retries, replay, reordering, duplicate delivery, and alternate message creation are out of bounds for this workflow.

## Cleanup and Stop Conditions

Immediately remove the marker if it persisted. Stop before sending content to another user, shared channel, external integration, or any irreversible workflow. Stop if cleanup fails and notify the program contact.

## Evidence

Record the marker identifier, test-account-only object, expected result, observed result, sanitized message type and correlation ID, and cleanup result. Do not retain full message bodies if unnecessary.

## Remediation

Apply server-side schema validation, reject unknown or invalid message shapes, safely encode any reflected data for its rendering context, and authorize every message action independently.

## Sources

- [PortSwigger: Manipulating WebSocket messages](https://portswigger.net/web-security/websockets/manipulating-websocket-messages)
- [PortSwigger: WebSocket security](https://portswigger.net/web-security/websockets)
