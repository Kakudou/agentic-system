# Safe Validation And Ethics

## Purpose

Prepare a safety-bounded handoff for separately authorized validation without providing testing instructions, payloads, or exploit paths.

## Preconditions

- A falsifiable hypothesis is tied to admitted evidence and an in-scope asset.
- Written authorization specifies permitted methods, limits, data handling, and escalation contacts.
- The authorized validation process has an explicit recipient or review channel.

## Evidence-Led Method

Define the minimum observation that could distinguish the hypothesis from normal behavior, required approvals, expected benign and concerning signals, and evidence to preserve. State a stop condition before any validation is considered.

## Interpretation And Uncertainty

An unexpected response may be environmental, account-specific, transient, or caused by an intermediary. A concerning signal requires responsible review and corroboration; it does not by itself establish impact.

## False-Positive And Bias Controls

- Predeclare what would disconfirm the hypothesis.
- Avoid destructive, high-volume, concurrent, privilege-changing, or third-party actions unless separately and explicitly authorized.
- Stop rather than expanding scope to resolve uncertainty.

## Scope And Privacy Limits

Protect service availability, customer data, credentials, and third parties. Capture the minimum necessary evidence and restrict it to the authorized recipient. Never use this reference to bypass program rules.

## Evidence And Handoff

Use the planning handoff template to identify the authorized review channel, authorization reference, hypothesis, minimum validation question, stop conditions, escalation path, and required evidence. Label the handoff `planning only` until validation is separately authorized and performed.

## Sources

- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [PortSwigger Web Security Academy](https://portswigger.net/web-security)
