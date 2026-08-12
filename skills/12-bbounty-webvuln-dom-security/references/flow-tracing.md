# Static and Runtime Flow Tracing

## Purpose and Preconditions

Establish a source-to-context path without generating active content or changing browser/application state. Require an authorized route, a source inventory row, a sink classification, and an inert marker.

## Bounded Process

1. Trace assignment, function calls, framework bindings, decoding, validation, encoding, and concatenation from the source to the classified receiver.
2. Record each transformation and whether it is context-appropriate at the final receiver.
3. Use normal navigation and permitted developer tooling to observe the marker at existing breakpoints or rendered output; do not inject scripts or modify page code.
4. Stop when the flow is disproven, the marker is safely rendered/rejected, the route leaves scope, or a stop condition occurs.

## Browser/Runtime Observations

- A marker visible in page text establishes propagation, not unsafe parsing.
- Encoded, normalized, removed, or rejected marker data can demonstrate a control only for the observed path.
- Record asynchronous callbacks, route transitions, and feature flags that prevent a claimed path from executing.

## False-Positive Controls

- Confirm the same value crosses the whole path; similarly named variables are insufficient.
- Distinguish a source-to-log or analytics path from a source-to-security-sensitive receiver.
- Do not infer runtime behavior from minified code when source maps or a controlled observation contradict it.

## Evidence

Save source and receiver locations, ordered transformations, navigation state, sanitized observation, and an explicit conclusion for the exact path.

## Sources

- PortSwigger, [Testing for DOM-based vulnerabilities](https://portswigger.net/web-security/dom-based/testing)
- OWASP, [DOM based XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html)
