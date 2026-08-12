# Confirmation And False-Positive Controls

## Purpose And Preconditions

Confirm a suspected controlled cache-key coverage gap without attempting to distribute a modified response. Owner telemetry and a reversible fixture are mandatory.

## Safe Controlled Methodology

Lock the fixture, route, approved dimension, and observation count. Correlate cache events, configured key dimensions, and origin rendering for the same marker. Repeat only the exact approved controlled observation if the owner requires it.

## Observations And Interpretation

A confirmed controlled gap requires evidence that an approved response-affecting variation was omitted or transformed in cache selection, plus cache and origin evidence. Similar responses or cache-status metadata alone are insufficient.

## False-Positive Controls

Rule out local cache state, service workers, response compression, experiments, session state, replication lag, and configuration changes. Ensure the marker did not persist at the origin independently of cache behavior.

## Cleanup And Stop Conditions

Stop after one conclusive result or any unresolved ambiguity. Remove the fixture marker, obtain invalidation confirmation, and escalate immediately if non-controlled content is observed.

## Evidence And Remediation

Preserve redacted telemetry correlation, configuration snapshot, fixture record, false-positive analysis, and cleanup proof. Add the required key dimension, normalize before keying, or prohibit shared caching.

## Sources

- [PortSwigger: Web cache poisoning](https://portswigger.net/web-security/web-cache-poisoning)
