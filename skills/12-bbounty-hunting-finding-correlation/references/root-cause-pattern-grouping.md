# Root-Cause And Pattern Grouping

## Purpose And Preconditions

Form bounded hypotheses about relationships among admitted findings. Start with at least two admitted items and a declared comparison question, such as whether they share a control boundary, implementation component, or observable behavior.

## Evidence-Led Method

1. Compare only recorded attributes: affected surface, control boundary, observable behavior, relevant conditions, component/version evidence, and evidence quality.
2. State the relationship as one of: observed similarity, supported recurring pattern, possible shared cause, or unresolved.
3. A supported pattern requires repeatable shared characteristics and citations for each member. A possible shared cause additionally needs direct implementation, configuration, or owner-confirmed evidence; otherwise retain it as a hypothesis.
4. Record disconfirming attributes, including different authorization paths, components, environments, or conditions.
5. Keep every finding independently traceable even when it belongs to a proposed group.

## Interpretation And Uncertainty

Similar labels, endpoints, parameters, or scanner signatures do not establish a root cause. A group describes an analytical relationship, not remediation ownership, severity aggregation, or a combined report. Do not infer an exploit path from co-occurrence.

## Controls

- Use the same comparison fields for every candidate to reduce anchoring on the first finding.
- Seek disconfirming evidence before naming a shared cause.
- Do not use frequency as a proxy for impact or confidence.
- Redact component names or architecture details when the recipient lacks a need to know.

## Evidence And Handoff

Hand off the comparison question, member IDs, shared and conflicting attributes, relationship label, confidence, evidence locators, and the specific evidence needed to resolve uncertainty.

## Sources

- [NIST SP 800-61 Rev. 2, Computer Security Incident Handling Guide](https://csrc.nist.gov/pubs/sp/800/61/r2/final)
- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
