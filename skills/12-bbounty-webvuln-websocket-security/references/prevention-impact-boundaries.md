# Prevention and Impact Boundaries

## Purpose and Preconditions

Translate an observed WebSocket control gap into a bounded report without claiming exploitation that was neither authorized nor demonstrated.

## Bounded Methodology

1. Identify the exact endpoint, connection control, or message operation involved.
2. State only the effect observed with the dedicated test account or approved configuration evidence.
3. Describe plausible wider impact as conditional, naming the server-side control that would need to be absent.
4. Select remediation tied to the observed layer using the [remediation lookup](../assets/remediation-lookup.md).

## Observation and Interpretation

- Missing TLS can expose connection content in a network position capable of observing the traffic; it does not prove data compromise.
- An unverified origin policy is a design concern until evidence establishes the server behavior under an approved test.
- A normal accepted action is not authorization bypass evidence. Authorization impact requires an observed server-side permission failure within explicit scope.

## False-Positive Controls

- Separate client-side symptoms from server enforcement.
- Do not assign severity from a generic vulnerability label; account for authentication, resource sensitivity, required preconditions, and demonstrated scope.

## Cleanup and Stop Conditions

Do not extend validation to another account, role, tenant, or recipient to determine impact. Stop at the evidence boundary and report the remaining uncertainty.

## Evidence

Include sanitized handshake or message facts, expected control, observed result, environment, test-account ownership, cleanup result, and a clear statement of untested conditions.

## Remediation

Use TLS, validate browser origins where applicable, authenticate connection establishment, validate message schemas, authorize every action and resource server-side, apply rate and size limits, and log security-relevant decisions with secret-safe telemetry.

## Sources

- [PortSwigger: WebSocket security](https://portswigger.net/web-security/websockets)
- [PortSwigger: Cross-site WebSocket hijacking](https://portswigger.net/web-security/websockets/cross-site-websocket-hijacking)
