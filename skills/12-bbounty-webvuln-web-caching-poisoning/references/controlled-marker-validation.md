# Controlled Harmless-Marker Validation

## Purpose And Preconditions

Safely determine whether an approved benign variation is partitioned correctly for a controlled fixture. Require an inert, removable marker and an owner-approved variation that cannot alter active content, routing, security policy, or other users' data.

## Safe Controlled Methodology

Use a dedicated diagnostic field or server-side fixture value. Compare the canonical controlled response with the one approved benign variation, then correlate both with owner cache telemetry. Keep the number of observations predeclared and minimal.

## Observations And Interpretation

Correct partitioning means telemetry and response behavior agree with the documented key. A marker appearing unexpectedly is a hypothesis until owner telemetry confirms the cache decision and origin behavior.

## False-Positive Controls

Exclude browser state, service workers, origin persistence, variant assignment, compression, and stale replicas. Do not use a second account or external client to validate sharing.

## Cleanup And Stop Conditions

Remove the marker and invalidate any fixture object immediately after the test. Stop if the marker reaches a non-controlled context, response behavior becomes executable or redirecting, or cleanup cannot be verified.

## Evidence And Remediation

Retain marker approval, fixture identifier, redacted observations, telemetry correlation, and cleanup proof. Correct missing key dimensions or make the response non-shared.

## Sources

- [PortSwigger: Web cache poisoning](https://portswigger.net/web-security/web-cache-poisoning)
