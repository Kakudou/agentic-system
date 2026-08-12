# Evidence And Handoff

## Purpose

Deliver a minimal, reproducible API-surface inventory without exposing sensitive data or overstating discovery results.

## Preconditions

- Scope decisions and source records are complete.
- Evidence has been minimized and redacted according to program policy.

## Methodology

Use the handoff template for each surface observation. Link to the approved documentation or client-session record, identify the exact visible operation and protocol/version signals, and distinguish direct facts from gaps. Include only redacted excerpts or stable evidence references needed for review.

## Interpretation

The handoff is an observation record, not a vulnerability report, permission expansion, service inventory, or testing plan. Missing operations and undocumented behavior remain unknown unless an approved source supports them.

## False-Positive And Scope Controls

- Do not include credentials, tokens, personal data, full sensitive bodies, or unverified endpoint claims.
- Do not characterize a source as authoritative without a program basis.
- Escalate unexpected sensitive exposure, scope ambiguity, or possible impact through the program's stop contact instead of broadening observation.

## Evidence

Retain authorization reference, source locator, timestamp, redacted observation, confidence, limitations, and stop or escalation decision.

## Handoff

Name the receiving owner, required approval for any follow-up, and the smallest unresolved question. Use the static handoff template.

## Sources

- PortSwigger Web Security Academy, [API testing](https://portswigger.net/web-security/api-testing)
- OWASP, [API Security Project](https://owasp.org/API-Security/)
