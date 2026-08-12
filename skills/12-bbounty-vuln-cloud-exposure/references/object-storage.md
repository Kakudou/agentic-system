# Sensitive Data Handling And Stop Controls

## Purpose

Prevent an exposure assessment from expanding into unauthorized access, retention, disclosure, or handling of sensitive cloud-hosted data.

## Preconditions

Apply this reference whenever an observation could reveal content, identifiers, access material, internal configuration, or a boundary that is not clearly intended to be public.

## Method

1. Stop the observation when sensitive material is displayed or reasonably suspected. Do not download, copy, search within, validate, replay, or share it.
2. Record a minimal redacted stop event: time, in-scope asset, observation method, material category, and whether content was rendered. Do not preserve the material itself.
3. Notify the authorized reporting channel promptly using the remediation handoff template. Follow program-specific incident escalation rules where provided.
4. Resume only with explicit written authorization that defines the additional permitted action and handling safeguards.

## Interpretation And Scope Controls

- Treat credentials, session material, private keys, personal data, confidential documents, internal configuration, and security-sensitive identifiers as sensitive.
- A filename, object name, or error label is not proof of sensitive data. Do not inspect content to resolve uncertainty.
- Publicly delivered assets may be intentional; a stop event is not proof of a vulnerability.

## Privacy Limits

Keep sensitive material out of notes, screenshots, tickets, chat, logs, and reusable references. Use category labels and redacted excerpts only when approved. Preserve no credentials or tokens, even for validation.

## Evidence And Handoff

Complete `assets/sensitive-data-stop-checklist.md` and attach only allowed redacted evidence. Request owner-side confirmation of classification, intended audience, containment, and remediation priority.

## Sources

- [AWS data protection](https://docs.aws.amazon.com/whitepapers/latest/aws-overview/security-and-compliance.html)
- [Azure data security and encryption](https://learn.microsoft.com/en-us/azure/security/fundamentals/data-encryption-best-practices)
- [OWASP Data Exposure](https://owasp.org/www-project-top-ten/)
