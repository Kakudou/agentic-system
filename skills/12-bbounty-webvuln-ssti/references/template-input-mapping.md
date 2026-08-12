# Template and Input Mapping

## Purpose and Preconditions

Map the authorized input path before testing. Require written scope, an endpoint owner or program policy, a stable baseline, and a test account where applicable.

## Inert and Bounded Methodology

Record endpoint, method, input name, encoding, validation behavior, response placement, and whether the response is server-rendered. Send only a unique plain-text sentinel. Complete the [classification worksheet](../assets/engine-context-classification-worksheet.md) before any syntax-shaped marker.

## Observations and Interpretation

Determine whether the value is absent, rejected, reflected, stored, transformed, or rendered after a redirect. A reflected value alone is not SSTI. Classify the output as HTML text, attribute, URL, JavaScript, email, document, or unknown.

## False-Positive Controls

Use a control value with the same character classes, compare raw response with browser-rendered output where authorized, and account for CDN caching, localization, and client-side frameworks.

## Stop Conditions

Stop on stateful actions, cross-user visibility, unexpected persistence, rate limiting, or uncertainty about authorization.

## Evidence

Keep a redacted request/response pair, mapping notes, baseline hash or comparison, and account role.

## Remediation

Avoid treating request data as template source. Bind validated data to fixed templates and use context-aware encoding.

## Sources

- PortSwigger, [Server-side template injection](https://portswigger.net/web-security/server-side-template-injection)
