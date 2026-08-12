# Confirmation And False-Positive Controls

## Purpose And Preconditions

Independently establish whether a controlled response was stored under an unintended cache classification. Use only after a bounded observation and with owner escalation available.

## Safe Controlled Methodology

Freeze the hypothesis, fixture, route, and observation count. Ask the cache or application owner to correlate cache logs/telemetry with the controlled marker. Repeat only the already approved controlled observation when needed; do not expand paths, accounts, clients, or request inputs.

## Observations And Interpretation

Confirmation requires both origin-route evidence and cache-storage evidence for the same controlled response. A cache-status header, matching body, or timing change alone is insufficient.

## False-Positive Controls

Exclude local caches, service workers, replication lag, A/B variants, stale origin state, and intermediary retries. Record configuration/deployment changes during the observation window.

## Cleanup And Stop Conditions

Stop after one conclusive confirmation or any ambiguity that needs owner review. Remove the fixture and obtain cache invalidation confirmation. Never assess delivery to another user.

## Evidence And Remediation

Retain redacted request identifiers, telemetry correlation, route decision, cache decision, and cleanup proof. Recommend edge/origin normalization alignment and explicit non-shared policy for dynamic routes.

## Sources

- [PortSwigger: Web cache deception](https://portswigger.net/web-security/web-cache-deception)
