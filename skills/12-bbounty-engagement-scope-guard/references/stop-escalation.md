# Immediate Stop And Escalation

## Purpose

Provide a safe response when authorization fails, becomes unclear, or an unexpected boundary is encountered.

## Preconditions

- An observed authorization concern, restriction breach risk, scope change, or unexpected sensitive-data exposure.

## Documentation Process

1. Cease the affected activity without attempting confirmation, reproduction, cleanup, or a workaround beyond what is explicitly authorized.
2. Record the time, proposed asset and action, trigger, and the minimum non-sensitive context needed to explain the stop.
3. Preserve only redacted metadata and authorized evidence references; avoid copying data, credentials, or broad response bodies.
4. Use the program's documented contact or reporting channel to request direction. Resume only after documented authorization covers the exact boundary.

## Uncertainty Controls

- An automated process, a discovery result, or a suspected vulnerability does not override the stop condition.
- Do not use urgency, possible impact, or a presumed safe-harbor clause to continue unclear work.
- If no escalation route is documented, retain the stopped state and state that a route is unavailable.

## Evidence And Handoff

Use the stop/escalation checklist and handoff template. Include the no-action status, exact authorization question, and any time-sensitive concern without making unsupported impact claims.

## Sources

- [CISA: Vulnerability Disclosure Policy Platform](https://www.cisa.gov/vulnerability-disclosure-policy-platform)
- [CERT Guide to Coordinated Vulnerability Disclosure](https://insights.sei.cmu.edu/library/the-cert-guide-to-coordinated-vulnerability-disclosure/)
- [Bugcrowd: Safe Harbor](https://www.bugcrowd.com/resources/essentials/safe-harbor/)
