# Controlled Harmless-Marker Validation

## Purpose And Preconditions

Determine whether a controlled response is stored and served as expected without introducing active content or affecting anyone else. Require explicit authorization, an owner-approved test endpoint, and a marker that is inert, unique, and removable.

## Safe Controlled Methodology

Use a server-side test fixture or owner-provided diagnostic field that contains a short opaque marker. Observe it only through the same controlled account and endpoint. Make the minimum owner-approved observations needed to distinguish origin generation from documented cache storage.

## Observations And Interpretation

Record marker presence, response status, cache directive, documented cache-state indicator, and owner telemetry correlation. Marker persistence alone is inconclusive: it can arise from origin state, browser storage, or a non-shared cache. Treat controlled shared-cache storage as a finding only after independent confirmation.

## False-Positive Controls

Use a fresh controlled client profile, disable local caching only if approved, and compare with owner telemetry. Do not use another account as a probe.

## Cleanup And Stop Conditions

Remove the fixture marker or have the owner invalidate it immediately after observation. Stop on any unexpected audience, cache key, data, redirect, executable transformation, or inability to clean up.

## Evidence And Remediation

Capture marker approval, fixture change record, redacted observations, telemetry correlation, and cleanup confirmation. Remediate by marking dynamic controlled routes non-shared or correcting cache eligibility/key rules.

## Sources

- [PortSwigger: Web cache deception](https://portswigger.net/web-security/web-cache-deception)
