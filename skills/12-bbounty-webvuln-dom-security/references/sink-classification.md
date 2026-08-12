# Sink Classification

## Purpose and Preconditions

Classify the receiving operation by its browser parsing context so evidence and remediation match the actual risk. Start only with an inventory row and a known consumer.

## Bounded Process

1. Identify whether the operation renders text, parses HTML, constructs a URL, assigns an attribute, evaluates code-like content, or delegates to a framework abstraction.
2. Record the exact property, method, or component boundary and its expected data type.
3. Determine whether a fixed template, a safe API, allowlisted value, or context-aware encoder constrains the data before receipt.
4. Classify the path as safe-text candidate, structured-content candidate, navigation candidate, code-like candidate, or unresolved. Do not test beyond marker observation.

## Browser/Runtime Observations

- Text APIs should preserve the marker as text; markup-like APIs require evidence of parsing behavior, not a name-based assumption.
- URL and attribute handling must be interpreted with their element, scheme policy, and subsequent consumer.
- Framework APIs can be safe by default or unsafe when an explicit raw-HTML escape hatch is used; verify the rendered outcome and configuration.

## False-Positive Controls

- `textContent` and equivalent text rendering are not HTML parsing sinks.
- A string passed to a URL API is not automatically script execution or an open redirect.
- Do not classify parsers, JSON handling, or regular expressions as DOM XSS sinks without a demonstrated unsafe downstream context.

## Evidence

Preserve the receiving API, DOM element or component, expected context, observed marker treatment, and any relevant policy or framework configuration.

## Sources

- PortSwigger, [DOM-based cross-site scripting](https://portswigger.net/web-security/cross-site-scripting/dom-based)
- OWASP, [Cross Site Scripting Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
