# Harmless Confirmation

## Purpose and Preconditions

Confirm a suspected path using an approved, unique inert marker only. This is not an exploitation procedure. Require completed source, sink, and flow records plus explicit authorization for the route.

## Bounded Process

1. Introduce the approved marker only through the already authorized, normal input channel.
2. Observe the existing page output, DOM inspector, network navigation record, or debugger state without executing content, editing storage, or sending cross-window data.
3. Classify the outcome: marker rendered as text, encoded, rejected, absent, unexpectedly parsed, or indeterminate.
4. Stop and preserve evidence if behavior is unexpected, sensitive data appears, application state changes, or the observation exceeds scope.

## Browser/Runtime Observations

- Text rendering and context-aware encoding normally disconfirm DOM XSS for the tested path.
- Marker placement in a parsed structure warrants review but is not proof of code execution.
- An inability to observe a path is `not confirmed`, not a negative finding.

## False-Positive Controls

- Use a unique marker to avoid matching page content, cache entries, or analytics data.
- Repeat only within the approved test window and distinguish client rendering from server reflection.
- Do not claim impact from a parser transition without evidence of an unsafe, reachable browser behavior.

## Evidence

Capture the marker identifier, permitted input channel, URL/route, timestamp, rendered or inspected outcome, stop status, and redacted screenshots when allowed.

## Sources

- PortSwigger, [DOM-based cross-site scripting](https://portswigger.net/web-security/cross-site-scripting/dom-based)
- OWASP, [Testing for Cross Site Scripting](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Input_Validation_Testing/01-Testing_for_Reflected_Cross_Site_Scripting)
