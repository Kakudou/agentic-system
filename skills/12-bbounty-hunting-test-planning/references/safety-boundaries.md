# Safety Boundaries And Stop Conditions

## Purpose And Preconditions

Prevent authorized planning or validation from exceeding its approved boundary. Require a written scope decision, constraints, named stop recipient, and a plan-specific stop-condition checklist.

## Planning Methodology

1. Translate authorization exclusions into explicit stop conditions.
2. Define the immediate action on stop: cease activity, preserve minimal context, and notify the named recipient.
3. Include conditions for unexpected data, availability degradation, authentication anomalies, third-party contact, and scope mismatch.
4. Require written reauthorization before changing assets, methods, volume, accounts, data handling, or objectives.

## Interpretation And Uncertainty

Unexpected behavior may be a harmless control, a system fault, or a security-relevant condition. Treat it as a stop signal until a responsible owner assesses it. Do not investigate further merely to classify it.

## False-Positive And Scope Limits

No result justifies bypassing a stop condition. Rate limits, account access, and publicly reachable systems do not imply permission for broader activity. Planning documents must not include fallback or workaround procedures for rejected actions.

## Evidence And Handoff

Record the stop condition, timestamp, approved asset, minimal observed signal, actions ceased, and notified contact. Label the record as an operational safety event, not a confirmed finding.

## Sources

- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [PortSwigger: Ethical hacking](https://portswigger.net/web-security/ethical-hacking)
