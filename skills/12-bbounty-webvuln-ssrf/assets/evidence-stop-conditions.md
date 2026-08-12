# Evidence And Stop Conditions

## Minimum Evidence

- Written scope and authorization reference.
- A sanitized application request and timestamp.
- A unique correlation value.
- Controlled endpoint or fixture evidence showing the server-side request, or an equivalent response-side confirmation.
- A short account of false-positive checks and the affected boundary class.

## Stop Immediately When

- The request could reach a third party, live internal service, metadata service, or sensitive data source.
- A test would require enumeration, port probing, non-HTTP protocols, authentication, state change, or automated scanning.
- Scope, rate, attribution, or callback ownership is uncertain.
- The minimum proof has been obtained.

Sanitize URLs, headers, bodies, tokens, identities, and infrastructure details before storage or reporting.
