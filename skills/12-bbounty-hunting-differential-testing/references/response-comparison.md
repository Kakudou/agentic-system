# Response-Difference Interpretation

## Purpose

Classify supplied response differences without mistaking ordinary variability for a security finding.

## Preconditions

- Admitted baseline and variation records.
- Defined comparison fields and known material collection conditions.

## Low-Impact Methodology

Compare provenance-preserved observations at the field level. Record stable outcome differences separately from cosmetic, formatting, volatile, or omitted fields. State the observed fact before any conditional impact hypothesis.

## Interpretation And Uncertainty

An outcome, structure, header, or timing difference may indicate an implementation distinction, but it does not establish exploitability, impact, or affected ownership. Use `insufficient` confidence where observations cannot be compared or where a difference is not reproducible in the supplied evidence.

## False-Positive And Scope Controls

Account for dynamic identifiers, timestamps, localization, personalization, deployment state, intermediaries, and capture truncation. Do not infer inaccessible data, bypassed controls, or a security impact from a difference alone.

## Evidence And Handoff

Use the comparison/confounder matrix to cite each field, preserve redactions, and list alternate explanations. Handoff a bounded validation question rather than a vulnerability conclusion.

## Sources

- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [RFC 9110: HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110)
