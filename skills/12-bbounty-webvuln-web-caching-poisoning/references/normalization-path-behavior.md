# Normalization And Path Behavior

## Purpose And Preconditions

Review how approved canonical route representations are normalized before origin routing and cache-key selection. Use only configuration review or owner-provided fixtures.

## Safe Controlled Methodology

Document edge and origin normalization order, route canonicalization, and cache-key construction. If a controlled alternate representation is explicitly approved, compare it to the canonical fixture route without adding unapproved parameters, headers, or ambiguous syntax.

## Observations And Interpretation

Equivalent representations must have deliberately consistent routing and key behavior. Different status codes or bodies can be caused by route handlers rather than cache normalization.

## False-Positive Controls

Confirm the exact origin route and edge decision with telemetry. Account for redirect policy, framework route fallback, and deploy differences.

## Cleanup And Stop Conditions

Stop if a route reaches sensitive data, creates an unexpected cache entry, or exits the fixture boundary. Request owner invalidation for stored fixture entries.

## Evidence And Remediation

Capture configuration excerpts, approved route comparison, origin/cache decision evidence, and cleanup. Canonicalize or reject ambiguous forms before cache lookup and keep cache rules aligned with origin routing.

## Sources

- [PortSwigger: Web cache poisoning](https://portswigger.net/web-security/web-cache-poisoning)
