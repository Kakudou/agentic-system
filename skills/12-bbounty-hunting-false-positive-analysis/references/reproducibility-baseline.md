# Reproducibility Baseline

## Purpose

Assess whether the claimed behavior is distinguishable from documented normal, transient, or environmental behavior. This is a review of supplied observations, not a retest procedure.

## Preconditions

- Admitted evidence identifies the claimed behavior, asset, and collection context.
- A comparable documented baseline or an explicit statement that none is available exists.

## Bounded Methodology

1. Define the narrow security property claimed to fail.
2. Compare the observation with the closest equivalent baseline, preserving differences in account state, authorization, configuration, release state, timing, and intermediaries.
3. Identify which recorded differences could explain the result without a security failure.
4. Mark reproducibility as supported only when the supplied record demonstrates the same material behavior under comparable documented conditions; otherwise mark it unestablished.

## Observation Interpretation

A consistent difference from a comparable baseline strengthens the observation. A one-off error, cached artifact, timing anomaly, or unmatched account state is ambiguous, not disproof or confirmation. Lack of a baseline limits validation to the original observation.

## False-Positive, Bias, And Scope Controls

- Repeated renderings or exports of one event are one source, not independent corroboration.
- Do not infer repeatability from a generic vulnerability class or product version.
- Do not request or perform active repetition through this reference; flag the gap as requiring separately authorized validation.

## Evidence And Handoff

Preserve the claim, baseline source, comparison conditions, material differences, and resulting limitation. Handoff any requested validation as a bounded question, not a testing recipe.

## Sources

- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [NIST SP 800-115, Technical Guide to Information Security Testing and Assessment](https://csrc.nist.gov/pubs/sp/800/115/final)
