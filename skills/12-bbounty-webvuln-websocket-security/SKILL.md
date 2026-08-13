---
name: 12-bbounty-webvuln-websocket-security
description: Authorized, evidence-led assessment of WebSocket handshake, session, origin, message authorization, and validation controls.
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# WebSocket Security Assessment

## Purpose

Assess an in-scope WebSocket endpoint using an authorized test account and harmless, reversible observations. Establish whether the server enforces transport, session, origin, schema, and per-message authorization controls. Do not forge messages, use another user's data or session, create cross-site proof pages, bypass origin controls, automate traffic, or test destructive or high-volume behavior.

## Prerequisites

- Written authorization, scope, rate limits, and stop contacts.
- A dedicated test account and a known harmless application action or marker.
- Browser developer tools or an approved intercepting proxy configured for observation.
- A way to record timestamps, sanitized handshake metadata, and expected application state.

## Workflow

1. **Inventory one endpoint.** Record the page feature, endpoint, `ws` or `wss`, subprotocol, and the test account. Read [WebSocket basics](references/websocket-basics.md) for protocol boundaries and [coverage worksheet](assets/coverage-worksheet.md) to capture the inventory.
2. **Map handshake to session.** Observe one normal connection and document how the connection is associated with the authorized test session, negotiated subprotocol, and transport protection. Follow [handshake and session mapping](references/handshake.md). Stop if observing requires exposing credentials or if the endpoint is out of scope.
3. **Review origin and authentication controls.** Determine from the normal handshake and documented behavior whether the server receives and validates an origin and how it establishes the authorized session. Use [origin and authentication review](references/websocket-techniques.md). Do not attempt an origin bypass or cross-site connection.
4. **Map message schema and authorization.** Trigger only documented, harmless actions in the test account. For each observed message type, map fields, server response, and server-side authorization expectation with [message schema and authorization mapping](references/authorization.md) and the [coverage worksheet](assets/coverage-worksheet.md). Do not alter identity, role, ownership, recipient, or authorization fields.
5. **Validate one bounded hypothesis.** Where scope permits, use a unique harmless marker in a normal, test-account-only action and observe whether the service accepts, rejects, and renders it as designed. Apply [marker-based validation](references/message-manipulation.md) and record the result in the [confirmation matrix](assets/confirmation-matrix.md). Do not replay, reorder, duplicate, inject, or craft new message types.
6. **Preserve evidence and stop safely.** Sanitize captures, remove the marker through the normal application flow if it persisted, close the connection, and apply the [evidence and stop guide](references/evidence-stop-conditions.md) and [evidence checklist](assets/evidence-stop-checklist.md).
7. **Report and prevent.** State the observed control gap, affected endpoint and message type, bounded impact, and remediation. Consult [prevention and impact boundaries](references/prevention-impact-boundaries.md) and the [remediation lookup](assets/remediation-lookup.md).

## Evidence

- Scope authorization, endpoint, test account identifier, timestamps, and tool used.
- Sanitized normal-handshake facts: scheme, host, path, origin presence, authentication mechanism category, and negotiated protocol.
- A message map showing harmless test-account action, expected authorization, observed result, and correlation IDs with secrets redacted.
- Reproducible observation or bounded marker result, plus cleanup confirmation.
- Explicit stop conditions, limitations, and impact limited to demonstrated behavior.

## Output

```yaml
websocket_assessment:
  target: string
  endpoint: string
  authorization_scope: string
  test_account: redacted-string
  handshake_session_mapping: observed | not-observed | blocked
  origin_authentication_review: pass | concern | inconclusive
  message_authorization_mapping: pass | concern | inconclusive
  marker_validation: accepted-as-expected | rejected-as-expected | unexpected | not-run
  evidence: [sanitized-artifact]
  cleanup: complete | not-needed | blocked
  stop_conditions: [string]
  bounded_impact: string
  remediation: [string]
```

## Resource Index

- [WebSocket basics](references/websocket-basics.md)
- [Handshake and session mapping](references/handshake.md)
- [Origin and authentication review](references/websocket-techniques.md)
- [Message schema and authorization mapping](references/authorization.md)
- [Marker-based validation](references/message-manipulation.md)
- [Evidence and stop conditions](references/evidence-stop-conditions.md)
- [Prevention and impact boundaries](references/prevention-impact-boundaries.md)
- [Coverage worksheet](assets/coverage-worksheet.md)
- [Confirmation matrix](assets/confirmation-matrix.md)
- [Evidence and stop checklist](assets/evidence-stop-checklist.md)
- [Remediation lookup](assets/remediation-lookup.md)
