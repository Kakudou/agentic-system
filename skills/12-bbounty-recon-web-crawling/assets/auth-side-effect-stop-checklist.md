# Authentication and Side-Effect Stop Checklist

Stop and escalate before any of the following:

- Login, logout, registration, recovery, consent, MFA, or identity-provider redirect.
- Cookies, tokens, authorization headers, anti-forgery values, or role-specific content.
- Form submission, reset, upload, download, payment, purchase, message, subscription, or account change.
- API invocation, stateful link, destructive control, webhook, or unknown external host.
- Rate limiting, errors suggesting service strain, scope ambiguity, or accidental sensitive-data exposure.

Record the route, trigger, timestamp, scope classification, and engagement-owner handoff. Do not retain secrets in the worksheet or handoff.
