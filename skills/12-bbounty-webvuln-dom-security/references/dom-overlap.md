# Overlap Review

## Purpose and Preconditions

Assess whether multiple independently sourced values converge at one receiver, which can invalidate a single-source safety conclusion. Require completed source inventory entries and a classified receiver.

## Bounded Process

1. Map every contributor to the receiver, including route data, server bootstrap data, DOM state, and client persistence.
2. Trace each contributor separately through transformations and joins.
3. Check ordering, defaults, feature flags, and asynchronous updates that select a different contributor at runtime.
4. Use one inert marker at a time. Do not combine inputs, mutate state, or test cross-context interactions.

## Browser/Runtime Observations

- A safe treatment of one contributor does not establish safety for another that reaches the same receiver later.
- Record whether the receiver is overwritten, appended, templated, or rendered by a framework after initial load.
- Treat server reflection and client-side processing as distinct steps with separate evidence.

## False-Positive Controls

- Do not claim an overlap solely because values share an element or variable name.
- Confirm temporal ordering and the active branch before associating a contributor with the observed result.
- Keep separate worksheet rows for independent sources and mark a join only when code or runtime evidence proves it.

## Evidence

Capture the contributor map, join location, ordering observation, marker result for each contributor, and the final receiver state.

## Sources

- PortSwigger, [DOM-based vulnerabilities](https://portswigger.net/web-security/dom-based)
- OWASP, [DOM based XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html)
