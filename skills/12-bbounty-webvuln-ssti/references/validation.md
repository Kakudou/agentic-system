# Validation

## Purpose and Preconditions

Validate an inert SSTI observation with reproducible controls, not additional capability probes. Require prior authorization, captured baseline, and no active service-health concern.

## Inert and Bounded Methodology

Repeat the one approved inert observation once, then repeat its plain-text control. Hold request method, identity, and unrelated inputs constant. Compare status, headers, body placement, encoding, and server-generated correlation behavior. Use [evidence and stop checklist](../assets/evidence-stop-checklist.md).

## Observations and Interpretation

Only a stable marker-specific server-side difference that survives controls supports confirmed inert interpretation. Inconsistent outcomes, errors, blocks, or client-only changes are inconclusive.

## False-Positive Controls

Rule out cache variation, WAF rewriting, A/B tests, localization, response compression, dynamic timestamps, and validation messages. Do not normalize away the only meaningful difference.

## Stop Conditions

Stop after the defined repeat, or sooner on throttling, instability, sensitive output, elevated errors, or scope uncertainty.

## Evidence

Preserve the three redacted comparisons, delta summary, control rationale, and conclusion confidence.

## Remediation

Report only the proven boundary and direct remediation to fixed-template rendering and data binding. See [prevention](prevention.md).

## Sources

- PortSwigger, [Server-side template injection](https://portswigger.net/web-security/server-side-template-injection)
