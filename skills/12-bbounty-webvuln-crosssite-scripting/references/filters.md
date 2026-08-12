# XSS Filter Analysis

Filter testing is evidence collection, not a contest to send the largest payload. The goal is to identify the complete transformation pipeline and decide whether untrusted data can reach an executable context after all parsing and normalization steps.

## Establish the baseline

For each mapped sink, submit a unique marker followed by one relevant character at a time: the context delimiter, angle bracket, ampersand, slash, percent sign, backslash, or scheme separator. Record four values: submitted bytes, response bytes, live DOM value, and sink argument when client code is involved. A rejection, WAF block, silent removal, entity encoding, URL decoding, Unicode normalization, canonicalization, or sanitizer rewrite has a different implication.

This sequence explains why a later proof worked or failed. For example, a server can store `&quot;`, the browser can decode it in an attribute, and client JavaScript can then insert it into HTML. Looking only at the response would miss the second and third stages.

## Analyze transformations

Test encoding and normalization narrowly. Compare literal delimiters with percent-encoded forms only where the transport or source decodes URLs. Compare entity representations only where HTML attribute/text decoding occurs. Check whether decoding happens once or repeatedly, whether case is folded, whether whitespace is collapsed, and whether a Unicode lookalike is normalized. Do not assume a transformation is exploitable merely because it changes input: it must produce meaningful syntax in the final parser context.

When a sanitizer is present, learn its policy by testing inert structure first. Identify allowed elements, allowed attributes on each element, URL-bearing attributes, and safe protocol rules. Verify the final DOM after the browser repairs malformed markup. Sanitizer output that looks harmless as a string can mutate when inserted into a document, while a stripped test proves only that particular input was rejected.

## Cautious bypass validation

Only after a known context and transformation are documented, choose a minimal authorized-test probe whose syntax depends on the specific observed gap. Confirm locally in the permitted browser and stop at a non-destructive signal. Do not use credential capture, data export, external collectors, destructive actions, or broad uncontextualized payload lists.

Useful findings distinguish: a blacklist that misses an alternate representation; encoding applied for the wrong output context; a sanitizer that permits an unsafe element/attribute/protocol combination; or a decode-then-insert client flow. False positives include WAF behavior that never reaches the application, encoded characters that remain text at the final sink, browser auto-correction that removes the intended construct, CSP blocking the only execution signal, and a probe requiring user interaction that was not documented.

## Remediation

Replace blacklist filtering with strict business-format validation and context-specific output encoding. For URLs, parse and allowlist safe protocols rather than blocking a few suspicious strings. Avoid accepting HTML; when it is required, use a maintained sanitizer with a minimal explicit allowlist and keep it updated. Do not decode untrusted data before passing it to an HTML or execution sink. Retest the exact transformation chain after the change.

## Sources

- https://portswigger.net/web-security/cross-site-scripting/contexts
- https://portswigger.net/web-security/cross-site-scripting/cheat-sheet
- https://portswigger.net/web-security/cross-site-scripting/preventing
