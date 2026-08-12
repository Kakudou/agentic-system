# Privacy And Stop Controls

## Purpose And Preconditions

Use throughout assessment. Require a secure evidence location, retention rules, and a stop contact before reviewing supplied webhook artifacts.

## Methodology

Collect metadata and redacted excerpts only. Stop immediately if a secret, token, personal data, payment data, private destination, unrelated tenant information, or evidence of unintended delivery appears. Preserve only the minimum locator needed for authorized triage and report the stop condition through the approved channel.

## Interpretation And Controls

Do not validate, decode, forward, store, or reuse sensitive material. Do not broaden collection to determine whose data it is. Treat a third-party destination or recipient as out of scope unless explicitly authorized.

## Evidence And Handoff

Record the stop time, artifact locator, data category without reproducing the data, minimization action, and notified recipient. Use the checklist to make handling decisions repeatable.

## Sources

- [OWASP Logging Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)
- [OWASP Webhook Security Guidelines](https://cheatsheetseries.owasp.org/cheatsheets/Webhook_Security_Guidelines_Cheat_Sheet.html)
