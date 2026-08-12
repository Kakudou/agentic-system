# Documentation And Client-Observed API Surface

## Purpose

Capture endpoints and operations that an authorized source already discloses without expanding the target surface.

## Preconditions

- The documentation artifact is linked or supplied by the program, or the client session is explicitly approved.
- Observations use the approved identity and ordinary client behavior.

## Methodology

Read declared endpoint, operation, media-type, and authentication descriptions from the supplied artifact. For an approved client, record only requests it naturally makes during a normal, non-mutating journey. Preserve endpoint templates and operation names as observed; do not alter methods, bodies, headers, identifiers, or navigation to produce more traffic.

## Interpretation

Documentation is a claimed contract. Client traffic is evidence of one environment and identity. Agreement increases confidence; disagreement is a documentation or environment gap, not proof that either surface is invalid.

## False-Positive And Scope Controls

- Do not follow unlinked documentation, source maps, embedded URLs, or client references outside the approved set.
- Do not replay, modify, or synthesize requests, and do not capture secrets or sensitive response data.
- Treat analytics, telemetry, identity-provider, CDN, and third-party calls as separate scope decisions.

## Evidence

Record source type, locator, timestamp, endpoint/operation, visible protocol indicators, and redacted request/response metadata sufficient to reproduce the observation source.

## Handoff

State which operations are documented, client-observed, both, or unresolved. Refer gaps to the program owner or a separately authorized validation step.

## Sources

- PortSwigger Web Security Academy, [API testing](https://portswigger.net/web-security/api-testing)
- OWASP, [API Security Project](https://owasp.org/API-Security/)
