# Context Exposure Boundary

## Purpose and Preconditions

Use this guide to document why context enumeration is excluded from a safe SSTI assessment. It applies after an inert parser-boundary observation and does not authorize inspection of template variables, request objects, configuration, files, environment, or secrets.

## Inert and Bounded Methodology

Document the application-owned data already visible to the authorized test account and identify its rendering context with [context and escaping](context-escaping.md). Record only the presence of a server-side interpretation boundary. For impact, use code review, vendor documentation, or a separate owner-approved test environment rather than attempting context access on the target.

## Observations and Interpretation

A confirmed parser boundary means untrusted input may influence template interpretation. It does not demonstrate accessible objects, sensitive data exposure, or execution capability. Treat any sensitive value appearing unexpectedly as an immediate stop and redaction event, not a lead for further probing.

## False-Positive Controls

Separate values supplied by the test account from server-originated content. Account for debug pages, client-side state hydration, cached fragments, and error middleware. Do not label reflected or public data as context exposure.

## Stop Conditions

Stop if a response exposes credentials, tokens, personal data, internal topology, configuration, or content belonging to another user. Do not retain the value; preserve only the minimum redacted evidence required by the program.

## Evidence

Record the confirmed boundary, visible rendering context, whether sensitive output was observed, redaction action, and the reason no extraction was attempted.

## Remediation

Minimize data supplied to templates, disable debug output in production, apply least privilege to the rendering process, and prevent user input from becoming template source. See [prevention](prevention.md).

## Sources

- PortSwigger, [Server-side template injection](https://portswigger.net/web-security/server-side-template-injection)
- PortSwigger, [Impact of SSTI](https://portswigger.net/web-security/server-side-template-injection#what-is-the-impact-of-server-side-template-injection)
