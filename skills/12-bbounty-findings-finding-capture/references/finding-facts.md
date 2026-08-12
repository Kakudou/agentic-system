# Finding Facts

## Purpose

Capture a neutral account of what the admitted evidence directly shows, without deciding cause, exploitability, severity, or remediation.

## Preconditions

- Scope and evidence have passed the admission check.
- The recorder can distinguish direct observation from interpretation.

## Documentation Method

Use a specific title based on the affected asset and observed behavior. For each observation, record the asset identifier, time or evidence reference, the observable condition, and the resulting visible state. Quote or summarize only the minimum necessary material. Link every factual statement to one or more evidence identifiers.

## False-Claim And Privacy Controls

- Write “observed” only for facts visible in admitted evidence.
- Keep causal language, vulnerability labels, and impact assertions in the claims section, not the facts section.
- Do not include credentials, personal data, session material, or confidential business content in the observation text.

## Evidence And Handoff

An observation without an evidence reference is an open question, not a finding fact. Give the reviewer enough asset and artifact context to independently inspect the record without adding active-test instructions.

## Sources

- OWASP Web Security Testing Guide, [Reporting](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/91-Reporting/README)
- Bugcrowd, [Vulnerability Rating Taxonomy](https://bugcrowd.com/vulnerability-rating-taxonomy)
