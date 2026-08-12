# Normalization And Path Behavior

## Purpose And Preconditions

Compare cache and origin treatment of benign, owner-approved path forms. This is a configuration-consistency review, not a request-construction guide.

## Safe Controlled Methodology

Start with route definitions and proxy/CDN normalization settings. Where the owner approves a controlled fixture, compare the canonical route with one predeclared benign alternate representation. Test one behavior class at a time: trailing-path mapping, delimiter treatment, percent-decoding, or dot-segment normalization. Record the intended origin route and cache classification.

## Observations And Interpretation

A mismatch matters only when the origin selects a controlled dynamic response while the cache classifies its request representation as shareable. Redirects, framework route fallbacks, and error handlers frequently mimic mapping differences.

## False-Positive Controls

Verify exact route resolution in application logs or owner telemetry. Separate CDN normalization from browser normalization and avoid interpreting status-code equality as route equivalence.

## Cleanup And Stop Conditions

Stop if a comparison reaches an authenticated or sensitive route, if cache storage is unexpected, or if a test representation leaves the approved fixture. Request invalidation of any stored controlled object.

## Evidence And Remediation

Capture canonical and alternate route classifications, origin route evidence, cache decision evidence, and cleanup. Normalize consistently at the edge and origin; deny ambiguous forms before cache classification; never apply static cache rules to dynamic route families.

## Sources

- [PortSwigger: Web cache deception](https://portswigger.net/web-security/web-cache-deception)
- [PortSwigger Research: Gotta cache 'em all](https://portswigger.net/research/gotta-cache-em-all)
