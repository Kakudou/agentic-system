# Safe Validation And Evidence

## Purpose And Preconditions

Use to decide whether an observation can be safely repeated and documented. Require explicit authorization, a benign baseline, and a known escalation contact.

## Bounded Benign Methodology

Repeat only the identical normal-use or approved fixture observation. Compare the result with the baseline, record environmental conditions, and redact all content and identifiers not necessary to explain the result. Use the [evidence and stop checklist](../assets/evidence-stop-checklist.md).

## Observations And Interpretation

A repeatable difference under controlled benign conditions supports a design or control observation. It does not establish sensitive-data exposure, unauthorized access, or action impact unless those effects were safely and explicitly authorized and observed.

## False-Positive Controls

Check account role, tenant, session state, fixture version, application release, retrieval state, and model variability. State limitations where no independent control can be observed.

## Stop Conditions

Stop without further capture if sensitive data appears, an action is proposed or initiated, availability degrades, another user could be affected, or the result exceeds scope. Preserve only the minimum metadata needed for escalation.

## Evidence

Store authorization reference, timestamps, redacted baseline and comparison, repeat result, false-positive checks, limitation, and stop/escalation record.

## Sources

- PortSwigger, [Web LLM attacks](https://portswigger.net/web-security/llm-attacks)
- OWASP, [LLM Top 10](https://genai.owasp.org/llm-top-10/)
