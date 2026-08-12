# Symptom And Root-Cause Boundaries

## Purpose And Preconditions

Prevent a shared visible symptom from being represented as a shared underlying condition. Use after admitting direct evidence for the compared observations; this guide does not authorize investigation, replay, or testing.

## Documentation Methodology

State the symptom as the observed behavior and keep it separate from any explanation. Record a shared condition only when the supplied evidence directly identifies the same bounded component, configuration, rule, or documented causal mechanism for both findings. If the records establish only similar effects, label the relationship `same-symptom-only`; if the explanation is absent or indirect, label it `root-cause-unconfirmed`.

## Bias, Privacy, And False-Claim Controls

Matching payload shapes, parameters, routes, response text, vulnerability labels, or remediation guesses do not establish a shared root cause. Do not infer implementation details, customer impact, exploitability, or remediation from similarity. Preserve competing explanations, including separate defects producing the same effect.

## Evidence And Handoff

Link every shared-condition statement to direct evidence in the [similarity and confidence matrix](../assets/similarity-confidence-matrix.md). Escalate any proposed merge that depends on a root-cause assertion for program-owner review.

## Disclosure And Triage Sources

- [OWASP Vulnerability Management Guide](https://owasp.org/www-project-vulnerability-management-guide/)
- [CISA Vulnerability Disclosure Policy Platform](https://www.cisa.gov/vulnerability-disclosure-policy)
