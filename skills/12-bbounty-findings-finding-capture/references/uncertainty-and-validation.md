# Uncertainty And Validation

## Purpose

Keep evidence, observations, hypotheses, and reviewer decisions distinct so a plausible interpretation is not recorded as an established security claim.

## Preconditions

- At least one admitted artifact and one observation have been recorded.
- A reviewer or validation path is identified when a claim is proposed.

## Documentation Method

Use the confidence matrix for each claim. State the claim, supporting evidence identifiers, contradictions or missing information, confidence label, and the smallest validation question. Keep proposed vulnerability type, root cause, and impact as hypotheses unless independently validated.

## False-Claim And Privacy Controls

- Never convert an evidence count into proof of cause or impact.
- Do not assign a severity, reward expectation, CWE, CVSS score, or disclosure status in this skill.
- Use “unknown,” “unverified,” or “not assessed” rather than filling gaps with assumptions.

## Evidence And Handoff

Attach the completed matrix. The handoff must distinguish direct facts from claims awaiting validation and name any conflicting evidence.

## Sources

- OWASP Web Security Testing Guide, [Testing framework](https://owasp.org/www-project-web-security-testing-guide/)
- Bugcrowd, [Vulnerability Rating Taxonomy](https://bugcrowd.com/vulnerability-rating-taxonomy)
