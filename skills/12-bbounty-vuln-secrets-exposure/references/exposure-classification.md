# Exposure Classification Without Use

## Purpose And Preconditions

Classify the handling urgency of a potential exposure from its observable context, not functionality. Use only after source admission and only for an authorized target.

## Documentation Methodology

Classify as one of: `suspected` when context is insufficient; `potentially sensitive` when material appears exposure-relevant; `confirmed exposure` only when the authorized owner confirms the material was exposed; or `out of scope`. Record the basis and uncertainty, not the material itself.

## Privacy And Scope Controls

Never authenticate, invoke, decode, replay, or otherwise use the material to determine class. Do not infer identity, privileges, owner, or validity from appearance. Escalate ambiguity rather than gathering more context.

## Evidence And Handoff

Include classification, redacted locator, source-admission status, and any owner confirmation reference. Route confirmed or potentially sensitive observations through the restricted channel.

## Sources

- [OWASP Sensitive Data Exposure](https://owasp.org/www-community/Improper_Error_Handling)
- [CISA Vulnerability Disclosure Policy Platform](https://www.cisa.gov/vulnerability-disclosure-policy-platform)
