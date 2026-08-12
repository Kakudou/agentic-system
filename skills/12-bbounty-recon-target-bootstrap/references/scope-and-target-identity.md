# Scope And Target Identity

## Purpose

Establish that a proposed observation concerns the exact asset and authorization granted by the program.

## Preconditions

- Current policy or written authorization is available.
- The operator has one literal target input and an authorized time window.

## Methodology

Read the program's scope expression, exclusions, testing restrictions, safe-harbor terms, and contact route. Record the literal target input separately from any later canonical hostname or redirect destination. Compare each observed hostname against the published scope rules; when wildcard semantics, subsidiaries, CDN endpoints, or third-party providers are unclear, pause for program clarification.

## Observations And Interpretation

An in-scope string authorizes only the behavior and asset types stated by the program. DNS resolution, a certificate name, or shared IP address can indicate an association, not ownership or permission. Treat scope as a constraint on actions, not as evidence of a finding.

## False-Positive Controls

- Quote the applicable scope language and retain its source URL and retrieval time.
- Do not expand from a parent domain to a hostname unless the policy explicitly permits it.
- Do not treat certificate SANs, redirects, analytics tags, or cloud-provider names as authorization.

## Rate And Scope Limits

Use the program's limits. If none are stated, make one-at-a-time, browser-equivalent observations of the declared target only and stop at the first uncertainty.

## Evidence

Record policy URL, quoted scope and exclusions, target input, operator, timestamp, authorization window, and every clarification request or stop decision.

## Handoff

Escalate scope ambiguity to the program's published channel. Pass only confirmed in-scope targets to subsequent reconnaissance.

## Sources

- PortSwigger Web Security Academy, [Information gathering](https://portswigger.net/web-security/information-gathering)
- OWASP Web Security Testing Guide, [Introduction and objectives](https://owasp.org/www-project-web-security-testing-guide/)
