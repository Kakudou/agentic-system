# Source Correlation And Conflict Resolution

## Purpose

Correlate independent supplied observations without automatic merging or unsupported reconciliation.

## Preconditions

- Each record has admitted evidence, a normalized identity, and collection time.
- The correlation question is explicit: same asset, related assets, ownership, scope, or lifecycle.

## Method

1. Compare records on stable identity attributes and time, retaining every source reference.
2. Label the relationship `same-supported`, `related-supported`, `possible-match`, `conflict`, or `no-link`.
3. Merge only `same-supported` records. Keep a correlation rationale and all underlying observations.
4. For conflicts, describe the competing claims, their times, and the missing evidence needed to resolve them. Do not choose a winner merely by source count.

## Interpretation And Controls

Independent sources can repeat the same underlying error. Treat copied datasets, vendor enrichment, historical observations, certificate reuse, address reuse, and aliases as potentially non-independent. Contradictions may reflect timing rather than error. A conflict remains visible until authorized evidence resolves it; this skill performs no active resolution.

## Privacy, Scope, And Handoff

Correlate only in-scope identifiers and do not expand the target boundary through association. Limit sharing to the recipient’s authorization. Hand off relationship labels, record IDs, rationale, and unresolved conflicts separately from confirmed inventory rows.

## Authoritative Sources

- [NIST SP 800-92, Guide to Computer Security Log Management](https://csrc.nist.gov/pubs/sp/800/92/final)
- [NIST SP 800-53 Rev. 5, Assessment Procedures](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final)
