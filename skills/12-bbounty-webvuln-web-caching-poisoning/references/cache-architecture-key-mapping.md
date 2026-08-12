# Cache Architecture And Key Mapping

## Purpose And Preconditions

Identify the cache layers and the configuration-approved request dimensions used to select a controlled response. Written authorization and owner access to configuration or telemetry are required.

## Safe Controlled Methodology

Record the route class, shared-cache eligibility, cache owner, and documented key dimensions. Use only ordinary baseline observations against the controlled fixture. Treat any variation dimension not expressly approved as out of scope.

## Observations And Interpretation

A documented cache key or telemetry event provides stronger evidence than response timing or a generic cache header. A dimension absent from a key is not inherently a defect; it matters only when it changes a shared controlled response.

## False-Positive Controls

Separate CDN, reverse-proxy, application, browser, and service-worker behavior. Account for configuration inheritance, deploy propagation, localization, compression, and experiment assignment.

## Cleanup And Stop Conditions

Stop if ownership, key scope, or response eligibility is unclear, or if any non-controlled content appears. Preserve minimal evidence and ask the owner to invalidate the fixture if stored.

## Evidence And Remediation

Capture the architecture source, route classification, key map, and owner confirmation. Include every response-affecting approved dimension in the cache key or remove the response from shared caching.

## Sources

- [PortSwigger: Web cache poisoning](https://portswigger.net/web-security/web-cache-poisoning)
