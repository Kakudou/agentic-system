# Scope, Known Behavior, And Duplicates

## Purpose

Prevent a documented observation from becoming an invalid finding because the asset is excluded, the behavior is documented or intended, or the issue already has an authoritative tracking record.

## Preconditions

- Current program scope and rules.
- Applicable known-issue, intended-behavior, or duplicate guidance supplied by the program.
- A stable finding reference and admitted evidence.

## Bounded Documentation Method

1. Compare the evidence's stated asset and observation date with the written scope, exclusions, and temporal limits.
2. Record exact references to relevant published limitations, accepted risks, or intended behavior; do not generalize them beyond their stated conditions.
3. Compare the candidate's affected asset, mechanism, and consequence boundary with available duplicate identifiers.
4. Classify each assessment as matched, not matched from available records, or unknown. Only the program owner resolves ambiguity.

## Interpretation And Uncertainty

An asset name match alone does not establish ownership or scope. A similar issue is not necessarily a duplicate if its affected boundary or mechanism differs. "No duplicate found in supplied records" is not a claim that no duplicate exists.

## False-Positive And Privacy Controls

- Do not disclose other researchers' reports, identities, or non-public tracking details.
- Do not infer accepted risk from silence, a generic policy statement, or an expired scope page.
- Stop if the assessment requires searching private systems or testing adjacent assets.

## Evidence And Handoff

Include the scope reference, known-behavior reference, duplicate comparison basis, decision status, and unresolved questions. Route disputed ownership, scope, or duplicate decisions to the program owner.

## Sources

- [ISO/IEC 29147:2018 Vulnerability Disclosure](https://www.iso.org/standard/72311.html)
- [OWASP Vulnerability Management Guide](https://owasp.org/www-project-vulnerability-management-guide/)
