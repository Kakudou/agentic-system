# Source Inventory

## Purpose and Preconditions

Build a finite inventory of data the page may receive from outside its current trust boundary. Use only on an authorized target with a recorded route and an inert engagement marker.

## Bounded Process

1. Review loaded first-party scripts and route code for reads from URL components, referrer, DOM attributes, bootstrap data, frame state, messages, and client persistence.
2. For each read, record its exact API, script location, receiving variable, and the feature that consumes it.
3. Mark whether the source is user-controlled, server-controlled, same-origin persistent, or cross-window. Do not alter a source to prove control.
4. Stop at the declared route and script set; open a new worksheet row rather than expanding scope.

## Browser/Runtime Observations

- A source read is only a candidate. Confirm its runtime reachability through normal, authorized navigation or an existing test fixture.
- Record whether the approved inert marker is observed at the read boundary, is absent, or is transformed before use.
- A static occurrence in a dead branch, vendor bundle, or unused route is not a finding.

## False-Positive Controls

- Separate source declarations from reads that actually feed a consumer.
- Attribute bundled code to the target feature only when source maps, runtime use, or ownership establishes the connection.
- Treat trusted server bootstrap values as a separate trust-boundary question, not automatically attacker-controlled.

## Evidence

Capture route, script URL/version or hash, line or function reference, source classification, runtime observation, and the worksheet row ID.

## Sources

- PortSwigger, [DOM-based vulnerabilities](https://portswigger.net/web-security/dom-based)
- OWASP, [DOM based XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html)
