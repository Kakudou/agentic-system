# Service Identity Observations

## Purpose and Preconditions

Build a cautious identity assessment from authorized passive or pre-existing evidence. Confirm the observation source, asset scope, and permitted retention before recording it.

## Authorized Bounded Method

Collect only public documentation, program-provided inventory, passive records, and already authorized artifacts. Record the asset identifier, source wording, time observed or published, and a normalized service class. Use descriptive labels such as `web edge`, `mail delivery boundary`, or `unknown service`; do not attempt product, version, banner, or configuration enumeration.

## Interpretation

Several independent, current signals may support a service-class assessment. One signal supports a hypothesis only. Infrastructure-provider names commonly identify an intermediary rather than the application owner. State whether the assessment is confirmed, likely, or unknown.

## False-Positive Controls

- Prefer two independent sources for a non-obvious identity assessment.
- Preserve source dates and downgrade stale evidence.
- Do not convert a DNS name, IP range, or port convention into a service claim.
- Keep aliases and retired assets distinct until ownership is validated.

## Rate and Scope Limits

Use passive sources or supplied artifacts only. Do not expand hostnames, addresses, accounts, or service categories beyond the written scope. Stop if the source requires authentication or reveals secrets.

## Evidence and Handoff

Keep a minimally sufficient excerpt or stable reference, source type, collection time, confidence, and competing explanation. Hand off low-confidence or conflicting observations as questions, not findings.

## Sources

- [OWASP Web Security Testing Guide: Information Gathering](https://owasp.org/www-project-web-security-testing-guide/)
- [NIST SP 800-115: Technical Guide to Information Security Testing](https://csrc.nist.gov/pubs/sp/800/115/final)
