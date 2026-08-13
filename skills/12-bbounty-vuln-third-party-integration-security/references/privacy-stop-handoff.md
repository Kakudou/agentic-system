# Privacy, Stop Controls, and Handoff

## Purpose

Prevent sensitive-data exposure and ensure a timely, attributable handoff when observation reaches a prohibited boundary.

## Preconditions

- Named stop/escalation contacts.
- Defined handling rules for evidence and a permitted storage location.

## Method

Use the minimum metadata needed to support an observation. Redact identifiers, secrets, payloads, and customer content. Stop immediately on unexpected sensitive data, credentials, unapproved third-party traffic, a tenant boundary, an availability concern, or ambiguity about authorization. Preserve only a timestamp, high-level condition, and approved reference, then notify the named owner.

## Interpretation and Scope Controls

An apparent secret or personal-data value must not be copied, validated, reused, or reported broadly. A stopped observation is not confirmation of exploitability. Do not continue to determine impact after a stop condition.

## Evidence and Handoff

Record the stop reason, minimal redacted evidence, recipients, and requested owner action. Use the remediation handoff template; disclose limitations and any material not retained.

## Sources

- [OWASP Vulnerability Disclosure Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Vulnerability_Disclosure_Cheat_Sheet.html)
- [OWASP Logging Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)
