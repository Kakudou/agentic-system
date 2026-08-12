# Reflected XSS

Reflected XSS occurs when data from the current HTTP request is included unsafely in the immediate response. Its practical distinction from stored XSS is delivery: a victim must make the crafted request, so a finding must be externally triggerable rather than requiring the victim to paste a value into a local developer-only field.

## Source-to-sink workflow

Enumerate each request-controlled input independently: query and body parameters, route segments, content types, and headers. Headers deserve inspection, but explain if a browser cannot normally set the relevant header cross-origin; that may reduce the finding to self-XSS or a narrower threat model.

Send a unique 8-12 character alphanumeric marker for one input at a time. Its purpose is to identify reflections without WAF noise or accidental matches. In Repeater, retain the marker beside any later probe and search the response for it. Record every occurrence, including hidden fields, script blocks, JSON bootstrap data, attributes, and error templates. One parameter may hit several sinks.

For each occurrence, inspect the raw response and the browser-rendered DOM. Identify surrounding syntax, quote type, attribute name, enclosing script/template, response `Content-Type`, and any server/client transformations. View Source proves server reflection; Elements and the debugger prove post-load behavior. A reflected marker absent from source but present in the DOM is often reflected-to-DOM flow, not a conventional server sink.

## Context-led confirmation

Use delimiter probes to learn the parser boundary before selecting an execution test. In text nodes, establish whether markup is entity encoded. In a quoted attribute, test whether its quote is escaped and whether the attribute is URL-valued or event-bearing. In script data, determine whether the marker is in a string, template literal, JSON value, or code position and whether escaping preserves JavaScript syntax. See `contexts.md` for the decision path.

Then issue the smallest authorized, non-destructive confirmation probe appropriate to the verified context. Confirm in a normal browser session with extensions disabled or accounted for. `print()` is useful where Chrome blocks `alert()` in cross-origin iframes; a labelled console signal is useful when a popup is unavailable. Success means the signal executed under the target origin, not merely that the response contains probe text.

If a probe is changed or blocked, compare its submitted, reflected, decoded, and DOM values. This reveals whether a filter, template encoder, WAF, URL decoder, or client library is relevant. Change one property per retry. Blindly cycling payloads obscures the actual control and can cause false conclusions.

## Reporting and mitigation

Capture the complete request, response excerpt with context, browser execution evidence, target origin, affected role, and prerequisites. State delivery conditions: public link, authenticated victim, user interaction, browser dependence, or impossible cross-origin header control. Do not claim stored impact unless persistence was shown.

Fix the relevant sink: context-specific output encoding immediately before output, safe URL protocol allowlists for navigational attributes, and data binding/text APIs instead of string-built markup or scripts. Validate input formats early but do not rely on blacklists. Apply correct response content types and `X-Content-Type-Options: nosniff` where content is not intended as HTML. CSP is a containment layer, not the primary fix.

## Sources

- https://portswigger.net/web-security/cross-site-scripting/reflected
- https://portswigger.net/web-security/cross-site-scripting/contexts
- https://portswigger.net/web-security/cross-site-scripting/preventing
