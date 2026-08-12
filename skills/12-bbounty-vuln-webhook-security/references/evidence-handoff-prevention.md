# Evidence, Handoff, And Prevention

## Purpose And Preconditions

Use after a bounded concern is supported by admitted evidence. Require a named remediation owner, an approved channel, and redacted evidence references.

## Methodology

State the observed boundary, source provenance, control classification, confidence, alternative explanations, and limitations. Recommend owner-led prevention: authenticate the sender against the received message, enforce freshness and duplicate-handling policy, minimize event data, govern destinations, rotate secrets through managed processes, and monitor failed verification. Owners must validate implementation in their own authorized environment.

## Interpretation And Controls

Report an observed or documented control gap, not exploitability, unauthorized event acceptance, or impact. Do not assign severity from a missing artifact field, partial capture, or configuration view alone. Do not include instructions, data, or artifacts that enable event generation or authentication defeat.

## Evidence And Handoff

Provide the authorization reference, scope and ownership decisions, timestamps, redacted source locators, observation/inference separation, confidence, limitations, stop decisions, and requested owner verification. Use the handoff template and retain evidence only in the approved location.

## Sources

- [OWASP Webhook Security Guidelines](https://cheatsheetseries.owasp.org/cheatsheets/Webhook_Security_Guidelines_Cheat_Sheet.html)
- [OWASP API Security Top 10](https://owasp.org/API-Security/)
