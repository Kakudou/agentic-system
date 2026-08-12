# Asset, Action, Rate, And Data Restrictions

## Purpose

Classify a proposed activity against documented limits before any action is taken.

## Preconditions

- An admitted scope source.
- A concrete proposed asset, action category, anticipated rate or volume, and data boundary.

## Documentation Process

1. Record the asset exactly as named in the scope source; do not translate it into implied related assets.
2. Compare the action category with explicit prohibitions, permitted methods, account requirements, time windows, and rate limits.
3. Identify the least sensitive data boundary needed for the decision. Treat credentials, personal data, production records, and third-party data as restricted unless explicitly authorized.
4. Record each comparison in the restriction/conflict matrix and select `authorized` only when every applicable condition is explicit and satisfied.

## Uncertainty Controls

- Specific exclusions and restrictive limits control over general inclusions.
- Rate limits include qualitative constraints such as "non-disruptive" or "manual review required"; do not invent a numeric allowance.
- If the proposed action, data, or rate is not addressed, it is unresolved rather than permitted.

## Evidence And Handoff

Preserve the exact restriction text, the proposed activity description, and the resulting decision. Escalate unanswered constraints without attempting a lower-impact substitute unless that substitute is independently authorized.

## Sources

- [OWASP Web Security Testing Guide: Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [HackerOne: Program Policy](https://docs.hackerone.com/en/articles/8494414-program-policy)
- [Bugcrowd: Researcher Code of Conduct](https://www.bugcrowd.com/resources/essentials/code-of-conduct/)
