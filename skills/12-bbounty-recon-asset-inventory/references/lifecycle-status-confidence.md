# Lifecycle And Status Confidence

## Purpose

Describe what supplied evidence supports about an asset’s lifecycle or status without asserting current activity.

## Preconditions

- Admitted observations contain collection time and source context.
- Status vocabulary and intended decision use are stated.

## Method

1. Record the source’s exact status observation and timestamp.
2. Classify confidence as `high`, `medium`, `low`, or `unknown` based on provenance, specificity, corroboration, and recency within the supplied corpus.
3. Use bounded labels: `observed`, `historical`, `retired-claim`, `planned-claim`, `conflicting`, or `unknown`.
4. State the observation window and why the label does not prove present operation.

## Interpretation And Controls

Status is temporal. A past record, error code, DNS response, certificate, source listing, or third-party classification is not proof that an asset is currently live, owned, or authorized. Do not infer inactive from absence, or active from a historical trace. This skill does not perform checks to change the confidence state.

## Privacy, Scope, And Handoff

Avoid operational timelines that exceed the authorized audience. Mark records requiring owner confirmation rather than seeking it. Hand off status labels with source times, confidence rationale, and a clear `not currently verified` qualifier when applicable.

## Authoritative Sources

- [NIST SP 800-137, Information Security Continuous Monitoring](https://csrc.nist.gov/pubs/sp/800/137/final)
- [CISA, Cybersecurity Performance Goals](https://www.cisa.gov/cybersecurity-performance-goals)
