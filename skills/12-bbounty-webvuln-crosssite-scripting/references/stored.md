# Stored XSS

Stored, persistent, or second-order XSS occurs when untrusted data is accepted in one interaction and later emitted into an HTTP response in a browser-executable context. Unlike reflected XSS, the payload can remain inside the application and execute whenever an affected viewer reaches an exit point. That makes viewer population, permissions, and persistence important to impact, not just the writer's account.

## Build an entry-to-exit map

Inventory inputs before testing payloads. Include create and update forms, profile fields, comments, chat, imports, API bodies, URL paths and parameters, request headers, uploads whose metadata is rendered, and out-of-band feeds such as email, social posts, or monitored network data. Headers and integrations matter here even when they would be impractical reflected-XSS delivery vectors: the application may store and show them later.

Inventory exits separately: public content, staff dashboards, moderation queues, audit logs, search/history pages, notifications, exports rendered as HTML, preview pages, and administrative views. Test role-specific and delayed views. A display name may never appear on its own profile yet appear in an administrator's audit trail.

For each input, submit one short unique alphanumeric marker, for example `sxA71mQ9`. Record entry endpoint, field, authenticated role, object identifier, time, expected retention, and cleanup method. Search responses and the live DOM for that exact marker while exercising likely workflows. The marker is deliberately boring: it survives validation and avoids confusing a rejected special character with an absent data flow.

When a marker appears, record every exit URL, response/DOM location, viewer role, delay, and transformation. Retest the exit in a fresh request and, where authorized, a separate viewer account. It is stored only when the value survives beyond the submission response or is reachable through a different request/state transition. An immediate confirmation page that echoes the submission is reflected behavior until persistence is demonstrated.

## Test a confirmed link

Inspect the actual response and rendered DOM to determine the exact context: text node, quoted or unquoted attribute, URL-valued attribute, JavaScript string, JSON data later consumed by a client, or framework template. A safe marker may appear in multiple contexts, each requiring its own assessment. Use the smallest context-appropriate, non-destructive execution probe from `../assets/payload_catalog.md`; do not reuse an HTML-tag probe in a JavaScript string merely because the field is called a comment.

First observe how delimiter characters are handled. Compare a marker with a marker containing the relevant delimiter, such as a quote in an attribute or a backtick in a template literal. Determine whether the server rejects, removes, encodes, stores encoded text, decodes on display, or client-side code changes the value after load. Then use a benign proof that only signals execution in the test browser, such as `print()` or a clearly labelled `console.log` marker. Capture the output state and remove the record immediately after confirmation.

Treat a harmless visible HTML rendering as evidence of unsafe content handling, not execution. Conversely, seeing escaped markup in raw response is not conclusive if client-side code later decodes it into an HTML sink. Inspect the rendered DOM and use DevTools breakpoints or the DOM workflow when a client renderer is involved.

## Coverage and false positives

Repeat mapped exits after refresh, relogin, cache bypass, background-job completion, pagination, sorting, search, moderation approval, and object edits. Cover ordinary users, authors, moderators, support staff, and administrators only where scope permits. Stored values are often overwritten by later activity, so keep a state-transition log and test one marker per durable field where possible.

Common false positives are a submission echo mistaken for storage, a marker found in a request log rather than a browser response, a cached response, server-side escaped markup that remains text in the live DOM, an execution signal caused by an extension, and self-XSS that requires the victim to paste content into a privileged tool. A valid finding needs reproducible writer-to-viewer flow, exact context, and browser execution without an impermissible user action.

## Remediation

Validate input against the field's business format, but treat validation as defense in depth. Encode untrusted data immediately before every output using the encoder for that output context; a field can be safe in a text node and unsafe in an attribute or script. Avoid HTML storage/rendering when plain text meets the requirement. If limited rich text is required, use a maintained allowlist sanitizer and test its configured tags, attributes, URL protocols, and mutation behavior. Client renderers should use text APIs and avoid dangerous sinks. CSP can limit impact but does not repair the writer-to-exit data flow.

## Sources

- https://portswigger.net/web-security/cross-site-scripting/stored
- https://portswigger.net/web-security/cross-site-scripting/contexts
- https://portswigger.net/web-security/cross-site-scripting/preventing
