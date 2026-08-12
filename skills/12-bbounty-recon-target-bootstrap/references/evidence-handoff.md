# Evidence And Handoff

## Purpose

Produce a bounded, reproducible record that another authorized operator can review without repeating unneeded traffic or mistaking an observation for a finding.

## Preconditions

- All observations were made under recorded authorization.
- Scope decisions and stop conditions have been captured.

## Methodology

Preserve the minimum evidence necessary to support each observation: source policy, target input, timestamps, request context, response excerpts or approved artifacts, and interpretation. Redact tokens, personal data, session identifiers, and sensitive program information. Use stable labels for facts, hypotheses, exclusions, and questions.

## Observations And Interpretation

Evidence supports what was observed at a stated time. It does not make a security claim, establish root cause, or authorize further testing. An unavailable or conflicting observation is a handoff item, not a gap to fill by expanding collection.

## False-Positive Controls

- Pair every conclusion with its exact supporting observation.
- State time sensitivity for DNS, redirects, headers, and certificates.
- Include negative scope decisions and stop conditions.
- Do not retain secrets or claim access to data not deliberately and lawfully observed.

## Rate And Scope Limits

Do not recollect evidence solely to improve formatting. Any repeat observation remains subject to the original program limits and scope decision.

## Evidence

Complete the supplied handoff template and attach only policy-permitted artifacts. Include collection count or an explicit statement that it is unavailable.

## Handoff

Route unclear scope, ownership, and authorization questions to the program. Route confirmed in-scope baseline facts to the next authorized recon owner. Route suspected vulnerabilities only after an authorized validation workflow has produced supporting evidence.

## Sources

- PortSwigger Web Security Academy, [Information gathering](https://portswigger.net/web-security/information-gathering)
- OWASP Web Security Testing Guide, [Reporting](https://owasp.org/www-project-web-security-testing-guide/)
