# Sensitive-Data Stop and Redaction Checklist

- Confirm the observed material does not include credentials, tokens, session identifiers, personal/customer data, payment data, private keys, or internal-only configuration.
- If it does or classification is uncertain, stop collection and do not copy, decode, test, replay, or validate the value.
- Record only category, minimal redacted locator, artifact context, timestamp, scope status, and approved escalation channel.
- Remove sensitive values, request/response bodies, and identifying details before ordinary handoff.
- Restrict any essential evidence to the program-approved channel and state that no validity test occurred.
- Escalate when redaction removes required context or the observation is outside scope.
