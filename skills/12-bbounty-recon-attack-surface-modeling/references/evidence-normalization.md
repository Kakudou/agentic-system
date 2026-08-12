# Evidence Normalization

## Purpose

Create consistent, traceable model records from admitted evidence without changing what the evidence asserts.

## Preconditions

- Evidence has passed the admission decision in [scope and evidence admission](scope-evidence-admission.md).
- The original record or an approved immutable reference remains available to the reviewer.

## Method

1. Assign a stable evidence ID; retain source, locator, observation time, and collection context.
2. Separate observed values from analyst labels. Normalize presentation only, such as case or URL formatting, and retain the original value when normalization changes it.
3. Link each model claim to one or more evidence IDs. Record absent fields as unknown, not negative.
4. Deduplicate only records that identify the same observed entity with compatible context. Keep competing records distinct.

## Interpretation

Normalized records support comparison. They do not increase confidence or establish identity, ownership, reachability, implementation, or security posture.

## False-Positive And Attribution Controls

- Do not merge identities based solely on a similar name, address, certificate, provider, or route shape.
- Do not infer a product, deployment role, or relationship from a banner-like label alone.
- Record temporal differences and source disagreement explicitly.

## Privacy And Scope Limits

Use references and minimal excerpts instead of copying sensitive evidence. Do not include secrets, personal data, or out-of-scope assets merely to complete a record.

## Evidence And Handoff

Provide the normalized record set with a source map, retained originals, and a list of transformations. Flag records that cannot be traced to their source.

## Sources

- [NIST SP 800-115, Technical Guide to Information Security Testing and Assessment](https://csrc.nist.gov/pubs/sp/800/115/final)
- [NIST SP 800-61r2, Computer Security Incident Handling Guide](https://csrc.nist.gov/pubs/sp/800/61/r2/final)
