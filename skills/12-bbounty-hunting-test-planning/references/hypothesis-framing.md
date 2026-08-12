# Hypothesis Framing

## Purpose And Preconditions

Turn admitted evidence into a falsifiable, low-impact test hypothesis. Require an admitted asset, a provenance-labeled observation, an authorization constraint set, and an intended reviewer.

## Planning Methodology

1. State the observation separately from the inference.
2. Phrase one hypothesis as a condition that could be supported or weakened by a safe observation.
3. Define the minimum distinguishing signal, expected normal alternative, and confidence before validation.
4. Link the hypothesis to a single bounded test-plan ID, required approval, and stop condition.

## Interpretation And Uncertainty

Technology labels, error wording, client-side behavior, and documentation can have multiple explanations. Record confidence as low, medium, or high based on evidence quality and recency, not assumed severity. Unknown conditions remain unknown rather than being promoted to a finding.

## False-Positive And Scope Limits

Do not generalize a hypothesis across assets, users, environments, endpoints, or configurations. Avoid claims of exploitability, impact, or exposure until authorized validation produces corroborated evidence.

## Evidence And Handoff

Retain the evidence reference, observation quote or locator, hypothesis, normal alternative, confidence rationale, and reviewer question. Escalate only the bounded hypothesis, not a vulnerability assertion.

## Sources

- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [PortSwigger: How to test for vulnerabilities](https://portswigger.net/web-security/learning-paths)
