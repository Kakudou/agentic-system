# Browser and Content Behavior

## Purpose and Preconditions

Use this when a normal page, download, redirect, frame, or rendered resource may be interpreted differently by the browser than its declared response metadata suggests. Require an authorized route, supported browser, baseline, and permission to view the relevant content. This reference excludes crafted input, encoding payloads, and active parser probing.

## Bounded Safe Methodology

Open normal application flows in a supported browser and record the declared media type, declared character encoding where applicable, rendered document type, download versus render behavior, redirect destination, and console-visible policy messages. Review only content already served by the application through ordinary use. Compare the same authorized content in a second supported browser only when needed to distinguish browser-specific behavior.

## Observations and Interpretation

An unexpected render mode, content-type mismatch, blocked resource, frame refusal, or character corruption can identify a configuration or compatibility issue. It becomes security-relevant only when the mismatch changes a meaningful browser trust boundary, such as execution, origin isolation, framing, or sensitive content handling. Browser differences may be intentional or version-specific.

## False-Positive Controls

- Record browser version, extensions disabled/enabled state, locale, and response metadata.
- Confirm whether application code, a CDN, or a service worker transforms the response.
- Recheck using an ordinary fresh session and avoid treating visual corruption alone as exploitability.

## Stop Conditions

Stop if the next step would require modifying content, injecting markup or script, manipulating character encodings, bypassing browser protections, or causing a cross-origin action.

## Evidence

Preserve redacted screenshots or recordings where permitted, response metadata, browser/version details, console messages, normal reproduction steps, and the expected-versus-observed trust-boundary explanation.

## Remediation

Send accurate media types and character encodings, prevent unsafe MIME sniffing where relevant, align application and edge transformations, and test normal browser behavior in supported clients. Use CSP and frame controls as defense in depth, not as substitutes for correct content handling.

## Sources

- PortSwigger Web Security Academy, [Cross-site scripting contexts](https://portswigger.net/web-security/cross-site-scripting/contexts)
- OWASP Cheat Sheet Series, [HTTP Headers Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html)
