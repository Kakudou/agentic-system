# Redirect And Hostname Normalization

## Purpose

Document how an authorized starting URL resolves to a canonical web endpoint while preventing redirects or certificate names from silently expanding scope.

## Preconditions

- Scope is documented for the starting target.
- Minimal baseline collection is authorized.

## Methodology

For each normal browser redirect observed from the starting URL, record source URL, status, literal destination, and whether the destination is explicitly in scope. Compare hostname spelling, case-normalized DNS labels, scheme, port, and certificate-presented names as observations. Stop before requesting a destination that is not clearly in scope.

## Observations And Interpretation

A redirect can identify the program's preferred entry point, an identity provider, a CDN, or a third party. A certificate may present multiple names. Neither relationship confirms testing authorization for every endpoint named.

## False-Positive Controls

- Preserve the literal `Location` value before normalization.
- Treat relative redirects as relative to the observed source URL.
- Record redirect loops and malformed destinations without attempting bypasses.
- Do not use alternate host headers, direct IP access, URL rewriting, or scheme/port permutations.

## Rate And Scope Limits

Follow only a short, documented chain from the declared URL, subject to program limits. One observation per confirmed in-scope hop is sufficient. Stop on an out-of-scope hop, a loop, an authentication boundary, or rate limiting.

## Evidence

Capture hop order, source and destination URLs, response status, scope decision, timestamp, and the certificate identity seen for each in-scope HTTPS hop.

## Handoff

List canonical confirmed endpoints separately from out-of-scope or unverified destinations. Request written clarification rather than carrying unverified destinations into testing.

## Sources

- RFC 9110, [Redirection status codes](https://www.rfc-editor.org/rfc/rfc9110#name-redirection-3xx)
- RFC 3986, [Uniform Resource Identifier syntax](https://www.rfc-editor.org/rfc/rfc3986)
- PortSwigger Web Security Academy, [Information gathering](https://portswigger.net/web-security/information-gathering)
