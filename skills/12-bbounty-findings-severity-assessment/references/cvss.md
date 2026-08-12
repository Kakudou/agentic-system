# CVSS Reference Notes

## Purpose

Provide a concise source pointer when a supplied assessment process explicitly requires CVSS. CVSS is a communication framework, not evidence of impact, program acceptance, severity, or reward.

## Preconditions

- The recipient or supplied program policy names a CVSS version and expected use.
- Metric selections can be traced to admitted evidence and documented assumptions.

## Documentation Method

Record the exact framework version, selected vector or metrics, evidence reference for each selection, and unresolved metrics. Preserve the framework output separately from the finding evidence and from any platform decision.

## Bias And False-Claim Controls

- Do not select metrics by vulnerability label or a typical score.
- Do not use a calculator result as validation of the underlying claim.
- Leave mapping unperformed when the requested version, inputs, or applicability are unclear.

## Evidence And Handoff

Hand off the framework version, input rationale, source references, limitations, and the reviewer decision still required.

## Sources

- FIRST, [Common Vulnerability Scoring System](https://www.first.org/cvss/)
- OWASP, [Risk Rating Methodology](https://owasp.org/www-community/OWASP_Risk_Rating_Methodology)
