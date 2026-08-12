# DOM Mutation Review

## Purpose and Preconditions

Review existing DOM changes to determine which mutation creates the final receiver context and whether a traced value reaches it. Require an authorized route, a classified flow, and an inert marker; this reference does not authorize injecting markup, attributes, or handlers.

## Bounded Process

1. Identify the mutation operation, affected node, attribute or text field, and feature lifecycle that triggers it.
2. Trace the value immediately before and after the mutation, including template or framework rendering steps.
3. Passively observe the normal route with the approved marker to determine whether the result is text, encoded output, structured output, or absent.
4. Stop if observation would require editing the DOM, triggering active content, changing state, or leaving the approved route.

## Browser/Runtime Observations

- DOM changes are ordinary application behavior; only the final parsing context determines their security relevance.
- Record whether later rendering overwrites, appends to, or reinterprets the mutated node.
- Attribute and URL behavior must be interpreted by their actual element consumer and policy, not by mutation API name alone.

## False-Positive Controls

- Do not treat every attribute assignment or node creation as HTML parsing.
- Separate safe text updates from structured-content rendering and from code-like contexts.
- Confirm that the traced value, rather than static template content, caused the observed mutation.

## Evidence

Capture the mutation location, trigger, target node/context, before-and-after trace, marker observation, and any subsequent renderer that consumes the node.

## Sources

- PortSwigger, [DOM-based cross-site scripting](https://portswigger.net/web-security/cross-site-scripting/dom-based)
- OWASP, [DOM based XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html)
