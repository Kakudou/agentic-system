# Logic Puzzles for Business Rules

## Purpose and Prerequisites

Use this guide when documentation is incomplete or an observed behavior seems inconsistent. It helps formulate a testable rule hypothesis without guessing intent or escalating impact. Use only approved test objects and reversible checks.

## Map Intended Business Rules

Express the observation as: `Given [actor and object state], when [permitted action], then [server outcome] because [rule source].` List unknowns separately. For example, a test subscription may have different renewal options because of plan terms, not because a guard is missing.

## Safe State, Role, and Object Testing

Change one variable at a time across designated objects: actor role, object state, eligibility condition, or workflow step. Keep all other variables fixed. Use ordinary UI or documented test interfaces where possible and stop if an outcome could grant value or alter a real record.

## Observations and Interpretation

Prefer hypotheses that explain both the baseline and comparison result. A useful result narrows the rule, confirms a server-side contradiction, or identifies missing information. Do not label unexplained behavior as a vulnerability.

## False-Positive Controls

- Check feature flags, rollout cohorts, localization, account tier, timing, and asynchronous updates.
- Ask the program owner to clarify undocumented high-impact rules before further testing.
- Do not infer authorization or financial impact from response text alone.

## Evidence

Keep the question, rule source, variables held constant, controlled difference, observed server result, and disposition: confirmed, explained, or inconclusive.

## Remediation

For confirmed ambiguity-driven defects, document the intended rule, enforce it server-side at the decision point, and add regression coverage for the distinguishing condition.

## Sources

- [PortSwigger: Business logic vulnerabilities](https://portswigger.net/web-security/logic-flaws)
- [OWASP: Application Security Verification Standard](https://owasp.org/www-project-application-security-verification-standard/)
