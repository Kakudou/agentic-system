# Evidence And Stop Checklist

## Before Observation

- [ ] Written scope identifies target, role, methods, window, and exclusions.
- [ ] A benign baseline and non-sensitive fixture are available.
- [ ] Owner and escalation channel are known.

## Preserve

- [ ] Authorization reference and timestamp.
- [ ] Redacted baseline and identical benign comparison.
- [ ] Environment, role, fixture, and application-version metadata.
- [ ] False-positive controls, limitation, and confidence rationale.

## Stop And Escalate

- [ ] Sensitive data, credentials, hidden instructions, or another user's content appears.
- [ ] A data retrieval, tool invocation, external action, or state change is proposed or initiated.
- [ ] Scope, authorization, or impact is uncertain.
- [ ] Availability, integrity, privacy, or another user could be affected.

Keep the minimum metadata needed to notify the owner. Do not capture or redistribute sensitive content.
