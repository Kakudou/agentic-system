# Reproducibility Baseline

## Purpose

Describe what the original record establishes about repeatability without replaying a request, executing a payload, or interacting with a target.

## Preconditions

- Admitted original evidence with observation time and collection context.
- The recorded prerequisites, such as account state, configuration, or environmental conditions, when available.

## Bounded Documentation Method

1. Inventory the original observation's time, asset, route or feature, actor context, and recorded result.
2. Compare records for internally documented consistency: matching identifiers, timestamps, response references, and stated prerequisites.
3. Record whether the evidence shows one observation, repeated historical observations, or no repeatability record.
4. Identify variables that may limit reproducibility, including expiration, authorization state, deployment changes, caching, concurrency, or unavailable context.

## Interpretation And Uncertainty

Historical repetition supports confidence in the record, not a claim that behavior is currently live. A single observation may be sufficient for handoff when material, but it remains single-source. Absence of replay is "not assessed," never "not reproducible."

## False-Positive And Privacy Controls

- Do not equate reflected content, an error message, or a scanner label with execution, access, or impact.
- Do not compare or retain session values, secrets, or personal data beyond approved evidence references.
- Preserve disagreements between artifacts instead of selecting the favorable result.

## Evidence And Handoff

For each reproducibility statement, include evidence IDs, observation windows, prerequisites, conflicts, and a confidence label. State whether an authorized recipient must independently assess current behavior.

## Sources

- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [NIST SP 800-115](https://csrc.nist.gov/pubs/sp/800/115/final)
