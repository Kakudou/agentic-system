# Recon Handoff

## Purpose

Transfer bounded technology observations to an authorized recon or triage owner without expanding scope or implying that active validation is approved.

## Preconditions

- The observations have source locators, timestamps, confidence ratings, and conflicts recorded.
- The receiving owner and allowed next-stage scope are known.

## Method

Use the [recon handoff template](../assets/recon-handoff-template.md). State observations as hypotheses, attach only permitted evidence references, and identify what the recipient must confirm before any further work. Do not include replayable sensitive content, test payloads, or instructions to bypass controls.

## Interpretation

The recipient may prioritize review from the handoff, but must independently confirm authorization and evidence. A handoff is neither a finding nor permission for active testing.

## False-Positive Controls

- Carry forward alternative explanations and conflicts unchanged.
- Separate observed delivery layers from claims about origin systems.
- Mark claims unknown when evidence cannot be safely shared or independently reviewed.

## Scope and Rate Limits

The handoff inherits no authority. Name the original limits and require the recipient to obtain new authorization for any active or higher-impact method.

## Evidence

Include scope reference, source locators, collection times, confidence rationale, redaction notes, and explicit exclusions. Retain evidence only in approved program systems.

## Sources

- https://www.cisa.gov/resources-tools/resources/vulnerability-disclosure-policy-template
- https://owasp.org/www-project-web-security-testing-guide/
