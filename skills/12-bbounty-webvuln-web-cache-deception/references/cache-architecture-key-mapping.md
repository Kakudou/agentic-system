# Cache Architecture And Key Mapping

## Purpose And Preconditions

Map the approved endpoint's origin, CDN/proxy/application-cache layers and the documented key inputs before testing. Written authorization and a controlled endpoint are required.

## Safe Controlled Methodology

Use architecture documentation, configuration review, or owner telemetry first. For ordinary baseline requests, record only the method, route class, response cache directives, documented cache-state indicator, and relevant key dimensions. Compare one controlled response at a time; do not vary credentials, forwarding metadata, or unapproved request fields.

## Observations And Interpretation

An explicit documented cache hit/miss indicator is stronger than timing. A stable response does not prove a shared cache key. A response that is private or non-storable is a boundary, not a reason to find a bypass.

## False-Positive Controls

Account for browser cache, service workers, load balancing, compression, localization, deploys, and application-level memoization. Have the owner confirm layer ownership when metadata is ambiguous.

## Cleanup And Stop Conditions

Stop if an unexpected shared-cache indicator appears, a response contains non-controlled data, or the layer/key cannot be identified. Preserve minimal metadata and request owner invalidation where appropriate.

## Evidence And Remediation

Capture architecture source, configured key dimensions, response metadata, and owner confirmation. Align cache policy and key construction with origin behavior; restrict shared caching to public static content.

## Sources

- [PortSwigger: Web cache deception](https://portswigger.net/web-security/web-cache-deception)
