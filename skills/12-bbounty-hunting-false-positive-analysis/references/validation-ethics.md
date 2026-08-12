# Validation Ethics And Safety

## Purpose

Keep evidence-led validation within authorization, privacy, availability, and disclosure boundaries.

## Preconditions

- Written authorization, scope, exclusions, and handling rules are available.
- A named escalation or reporting route exists.

## Bounded Methodology

1. Review supplied evidence only within the approved boundary.
2. Minimize retained sensitive data and preserve references rather than duplicating content.
3. Stop and escalate for unexpected sensitive data, service degradation, third-party exposure, scope ambiguity, or a need for new interaction.
4. Limit the result to an evidence decision and handoff; do not transform validation into exploitation or remediation work.

## Observation Interpretation

A concerning observation warrants careful handling and authorized review, not broader access or an impact claim. Missing authorization is a stop condition, not a gap to work around.

## False-Positive, Bias, And Scope Controls

- Do not pursue destructive, high-volume, privilege-changing, or third-party activity through this skill.
- Do not treat a program exclusion as permission to test a neighboring asset.
- Do not disclose sensitive evidence outside the approved channel.

## Evidence And Handoff

Record the authorization reference, stop events, minimized evidence references, and escalation recipient. Mark any unresolved material as `needs-review`.

## Sources

- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [CISA Vulnerability Disclosure Policy Platform](https://www.cisa.gov/vulnerability-disclosure-policy-template)
