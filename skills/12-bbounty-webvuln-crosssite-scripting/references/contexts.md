# XSS Context Selection and Escaping

Payload selection starts with the parser that receives the value, not the input field name. Locate the marker in raw response and in the live DOM, copy the immediate surrounding syntax, then introduce only the delimiter needed to determine whether that parser boundary is controllable. A value can pass through HTML parsing, attribute decoding, JavaScript parsing, and a client template, so inspect every stage.

## Decision table

| Observed destination | Determine | Test objective | Required defense |
| --- | --- | --- | --- |
| HTML text between tags | Are `<`, `>`, and `&` encoded in the parsed DOM? | Can a new element be created? | HTML entity encoding at output; text APIs. |
| Quoted/unquoted attribute | Which quote/whitespace terminates it, and is it a URL or event attribute? | Can the value end the attribute or alter its semantics? | Attribute encoding including quotes; quoted attributes; attribute allowlist. |
| URL-valued attribute | Is it navigation, resource loading, or CSS, and which protocols survive normalization? | Can an unsafe scheme be assigned? | Parse and allowlist `https`/`http` as appropriate; do not concatenate URLs. |
| JavaScript string or code | Quote type, escaping, script terminator, and code reachability. | Can syntax be changed without breaking the enclosing script? | JavaScript string escaping; preferably serialize data and avoid inline scripts. |
| Template literal | Is the marker literal text or inside an evaluated interpolation? | Can template-expression syntax be interpreted? | JavaScript escaping and safe data binding. |
| JSON/client template | Is it inert JSON, parsed data, or compiled template syntax? | Does a later consumer turn it into HTML/code? | JSON serialization, content type, and framework auto-escaping. |

## How to determine the exact context

Use a unique marker, then add one delimiter at a time. For example, a quote probe tells whether a double-quoted attribute is escaped; a slash and angle-bracket probe tells whether data lies in HTML text; a backtick or `${...}`-shaped inert marker identifies a template literal. Compare request value, raw response bytes, DOM property/attribute value, and sink argument. This separates server encoding from browser entity decoding and later client decoding.

### HTML text

Text between tags is interpreted as markup only if output encoding fails. A tag-shaped authorized probe is appropriate after confirming literal angle brackets survive; an apparent tag in View Source may still be safe when the DOM shows a text node. Remediate with context-specific HTML entity encoding immediately before output, not a stored pre-encoded value that may be decoded or reused elsewhere.

### Attributes and URLs

Quoted attributes are easier to reason about; unquoted attributes add whitespace and delimiter constraints. First identify the attribute name. An `href` or `src` has URL semantics, while an event handler has JavaScript semantics, so the same quote escape result has different consequences. HTML encoding alone does not validate a URL protocol. Decode and parse the URL, then allowlist the protocols and destinations the feature requires.

### JavaScript strings and template literals

Inside a script, HTML parsing happens before JavaScript parsing. A script-end sequence may alter HTML parsing even if it leaves the original JavaScript syntactically broken. Inside a quoted JavaScript string, a proof must escape the string and preserve the remaining script grammar; backslash handling is therefore evidence to inspect, not a generic bypass trick. Template literals evaluate `${...}` expressions without ending the backticks, making the interpolation boundary decisive. Use a serializer/JavaScript encoder for data in script contexts and avoid placing untrusted data in executable inline code.

### JSON and client-side templates

Valid JSON delivered as `application/json` is data, not automatic XSS. Risk appears when JSON is embedded in HTML incorrectly, parsed then assigned to an HTML sink, or handed to a client-side compiler. Establish the consumer path and framework/version. Treat template expression rendering as a distinct injection class and rely on normal escaped interpolation rather than compilation of user-controlled template strings.

## Sources

- https://portswigger.net/web-security/cross-site-scripting/contexts
- https://portswigger.net/web-security/cross-site-scripting/preventing
