# Cookie Inputs

## Purpose

Identify cookies the approved client naturally receives or returns while protecting session material.

## Preconditions

The session and target are authorized by the request contract. Do not create, modify, replay, or export cookies.

## Method

Record only cookie names, observed direction (`Set-Cookie` or `Cookie`), scope attributes where visible, and a redacted value shape. Do not retain values, tokens, or identifiers.

## Interpretation And Controls

`Set-Cookie` establishes client storage instructions; it does not prove an endpoint consumes the cookie. Third-party, consent, analytics, load-balancing, and framework cookies may be unrelated to the application feature under observation.

## Evidence And Handoff

Mark sensitivity and source direction in the worksheet. Hand off only names and non-secret metadata; exclude cookie values entirely.

## Sources

- RFC 6265, HTTP state management: https://www.rfc-editor.org/rfc/rfc6265
- MDN, Set-Cookie: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie
