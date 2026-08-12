# DOM-Based XSS

DOM XSS exists when client-side code moves attacker-controlled data from a source to a sink that parses HTML or executes code. The server response can be harmless because the dangerous operation happens after the browser loads it.

## Prioritize source-to-sink paths

Start with URL sources: `location.search`, `location.hash`, `location.pathname`, `location.href`, and `document.URL`. Also review `document.referrer`, `document.cookie`, `window.name`, `postMessage` data, Web Storage, API responses, and server-initialized state. A source is relevant only when an attacker can influence it in the delivery model.

Classify sinks before testing. HTML-parsing sinks include `document.write`, `document.writeln`, `innerHTML`, `outerHTML`, and `insertAdjacentHTML`; event property assignment and framework HTML renderers can also create executable DOM. JavaScript execution sinks include `eval`, `Function`, string forms of `setTimeout`/`setInterval`, and similar APIs. URL assignment is separately dangerous when an executable protocol is accepted. `textContent` and `innerText` are generally safe text sinks, so a marker reaching them is not XSS by itself.

## Static and runtime workflow

Search loaded and bundled JavaScript for the source and sink names, then trace assignments, decoding, templating, and sanitization between them. Minified code still benefits from pretty-printing and source maps. Static matches are leads, not proof: the source may be constant, gated, escaped, or never reach the sink.

For HTML sinks, put a unique alphanumeric marker into one source and search **Elements**, not View Source, after each relevant UI transition. Inspect the created node and its surrounding context. Browser differences matter: modern Chrome, Firefox, and Safari URL-encode `location.search` and `location.hash`, so values that remain encoded usually cannot form markup without a later decode. Verify the exact runtime value rather than assuming source behavior.

For execution sinks, DOM text search often finds nothing. Set a breakpoint on the source read or sink call, reproduce the navigation/action, and follow the value through variables. At the sink, inspect the actual argument and each decode/normalization step. Use a context-specific, non-destructive probe only after establishing the execution grammar.

Burp's DOM Invader can automate source injection and taint-flow investigation in Burp's browser. Treat its output as a hypothesis: reproduce the source, sink, decoded value, and browser result manually, because application state, event timing, and encoding can invalidate an automated candidate.

## Dependencies and mixed flows

jQuery calls such as `html`, `append`, `after`, `replaceWith`, `wrap`, `parseHTML`, and `$()` can parse attacker-controlled HTML. `attr()` is risky for URL-bearing attributes if untrusted input can select an executable protocol. Establish the actual library version and invocation: modern jQuery changed behavior around hash-prefixed selector input, while other input forms or legacy versions can remain risky.

AngularJS and other client-side templates may evaluate expressions when untrusted text is compiled rather than rendered as data. Do not label ordinary escaped interpolation as executable. Identify framework version, compiler boundary, template syntax, and whether the value is trusted/compiled before testing.

Server involvement does not remove DOM classification. Reflected-to-DOM XSS occurs when a request value is placed in server HTML or script data then consumed by a client sink. Stored-to-DOM XSS occurs when a saved value is later supplied to client code that uses a dangerous sink. In both cases document the complete writer/request -> response -> client source -> sink chain.

## Confirmation and prevention

Confirm with a visible or console-only signal in the target origin and capture the source, sink, decoded argument, and DOM snapshot. False positives include marker-only reflections, `innerHTML` receiving fully trusted constants, safe text sinks, blocked execution caused by CSP, and a source requiring attacker control that cannot be delivered.

Prevent DOM XSS by keeping untrusted values as data: use `textContent`, DOM constructors, typed APIs, and framework auto-escaping. Avoid parsing untrusted HTML; if rich HTML is required, sanitize with a maintained, correctly configured sanitizer at the trust boundary. Avoid string execution APIs and validate URLs against a safe protocol allowlist before assignment. CSP can reduce consequences but cannot make a source-to-dangerous-sink flow safe.

## Sources

- https://portswigger.net/web-security/cross-site-scripting/dom-based
- https://portswigger.net/web-security/cross-site-scripting/contexts
- https://portswigger.net/web-security/cross-site-scripting/preventing
