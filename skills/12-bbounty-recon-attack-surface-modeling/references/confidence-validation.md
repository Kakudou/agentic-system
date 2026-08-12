# Confidence, Conflict, And Validation

## Purpose

Make uncertainty visible and give recipients a bounded basis to review modeled claims.

## Preconditions

- Claims link to normalized evidence IDs.
- The analyst has preserved source timing and collection context.

## Method

1. Rate confidence as high, medium, or low based on traceability, directness, corroboration, recency, and source independence.
2. Use high only for directly supported, traceable claims with no material unresolved conflict.
3. Use medium for traceable but indirect, aging, or partially corroborated claims.
4. Use low for single-source, ambiguous, or attribution-limited claims. Preserve them as leads for review, not facts.
5. Record conflicting evidence verbatim enough to distinguish it, along with timestamps and a validation question. Do not average conflicts away.

## Interpretation

Confidence measures the model claim, not the importance of an asset or the severity of any outcome. A lack of evidence cannot be scored as evidence of absence.

## False-Positive And Attribution Controls

- Corroboration from copies of the same upstream source is not independent confirmation.
- Later evidence does not automatically supersede earlier evidence without explaining the changed context.
- Do not elevate confidence due to a familiar technology name, route pattern, or assumed organization ownership.

## Privacy And Scope Limits

Keep conflict excerpts minimal and redacted. Escalate scope or privacy ambiguity rather than seeking additional evidence under this synthesis skill.

## Evidence And Handoff

Complete the [evidence/confidence matrix](../assets/evidence-confidence-matrix.md) and include the validation owner, question, and status for every material low-confidence or conflicting claim.

## Sources

- [NIST SP 800-115, Technical Guide to Information Security Testing and Assessment](https://csrc.nist.gov/pubs/sp/800/115/final)
- [NIST SP 800-30r1, Guide for Conducting Risk Assessments](https://csrc.nist.gov/pubs/sp/800/30/r1/final)
