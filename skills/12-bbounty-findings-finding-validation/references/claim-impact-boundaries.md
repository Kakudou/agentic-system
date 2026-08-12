# Claim And Impact Boundaries

## Purpose

Translate evidence into the smallest defensible claim and prevent assumptions about exploitability, affected population, confidentiality, integrity, availability, or business impact.

## Preconditions

- Admitted evidence and a completed scope assessment.
- An observation stated separately from interpretation.

## Bounded Documentation Method

1. Write the observed behavior, affected asset or feature, actor context, and time as distinct factual statements with evidence IDs.
2. State the mechanism only when direct evidence supports it; otherwise label it a hypothesis or omit it.
3. State a consequence boundary: observed consequence, plausible but unverified consequence, and consequences not assessed.
4. Record alternative explanations and the evidence that would distinguish them, without seeking new evidence.

## Interpretation And Uncertainty

An observable anomaly is not automatically unauthorized access, code execution, data exposure, or account compromise. Plausible impact is useful handoff context only when labelled as unverified. This skill does not calculate or assign severity.

## False-Positive And Privacy Controls

- Do not claim access to data that was not evidenced, or infer data sensitivity from field names alone.
- Do not extrapolate one account, tenant, object, route, or deployment to others.
- Use aggregate descriptions and redacted references for sensitive artifacts.

## Evidence And Handoff

Map every factual clause to evidence IDs. Include the impact boundary, alternatives, unassessed conditions, and the decision owner for any impact or severity determination.

## Sources

- [CVSS v4.0 Specification](https://www.first.org/cvss/v4.0/specification-document)
- [OWASP Vulnerability Management Guide](https://owasp.org/www-project-vulnerability-management-guide/)
