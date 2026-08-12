# Risk-Indicator Framing Without Vulnerability Claims

## Purpose

Describe evidence-backed conditions that may merit authorized review without asserting a defect, exploitability, impact, severity, or vulnerability.

## Preconditions

- The modeled relationship is admitted, traceable, and confidence-labelled.
- The condition is stated as an observation rather than an inferred technical conclusion.

## Method

1. State the indicator neutrally: what was observed, where, when, and under what identity or trust context.
2. Cite the evidence IDs and confidence level.
3. Name the uncertainty and a validation question for the authorized recipient.
4. Use neutral terms such as “review indicator” or “unconfirmed boundary condition,” never “vulnerability,” “attack vector,” or “severity.”

## Interpretation

An indicator prioritizes review of an observed condition. It does not demonstrate that a security control is absent, that the condition is reachable, or that harm is possible.

## False-Positive And Attribution Controls

- Do not infer weaknesses from technology identity, route naming, or an incomplete record.
- Do not turn unknown authorization, encryption, ownership, or data classification into a negative assertion.
- Separate the observation from any recipient-supplied risk decision.

## Privacy And Scope Limits

Avoid sensitive implementation details and do not extend beyond admitted assets. Escalate material uncertainty through the handoff rather than collecting new evidence.

## Evidence And Handoff

For every indicator, provide observation, evidence IDs, confidence, conflict status, limitations, and the specific validation question. The recipient owns any later assessment.

## Sources

- [NIST SP 800-30r1, Guide for Conducting Risk Assessments](https://csrc.nist.gov/pubs/sp/800/30/r1/final)
- [OWASP Risk Rating Methodology](https://owasp.org/www-community/OWASP_Risk_Rating_Methodology)
