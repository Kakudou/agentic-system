# SPA and Rendered Content

## Purpose and Preconditions

Use this reference when a public page appears to be client-rendered, navigation differs from its initial document, or a route depends on JavaScript. Confirm that any rendered observation is explicitly approved and remains within the same low-impact scope and budget.

## Low-Impact Methodology

First record the server-delivered public document and visible navigation. If approved, make a single ordinary public rendering observation of the same route without interacting with controls, entering data, or triggering application workflows. Compare only material differences: route names, public text, and references to same-scope resources.

## Observations and Interpretation

- A blank initial document can indicate client-side rendering, but also a blocked response, error, localization choice, or conditional delivery.
- Script names, source maps, route strings, and API-looking references are leads, not confirmed endpoints or permissions.
- A route visible after rendering may still require a separate boundary classification before it is observed.
- Record whether the observation is static, rendered, or indeterminate and explain the evidence.

## State-Change Avoidance

Do not automate browsers, click controls, scroll for infinite loading, grant permissions, accept consent flows, upload files, or exercise client-side API calls. Stop if rendering initiates authentication, payment, messaging, downloads, or other side effects.

## Limits, Evidence, and Handoff

Use one approved route comparison at a time and honor the engagement budget. Preserve timestamps, route, observation mode, visible differences, and redacted screenshots or text excerpts where approved. Hand unresolved routes to the scope owner. See [MDN: Client-side web APIs](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Client-side_APIs/Introduction) and [OWASP Testing Guide](https://owasp.org/www-project-web-security-testing-guide/).
