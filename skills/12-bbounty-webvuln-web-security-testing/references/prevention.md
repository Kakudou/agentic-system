# Prevention Guidance

## Purpose and Preconditions

Use after an observation has been validated or logged as a hardening opportunity. Require an identified affected route or layer and evidence sufficient to state the desired security property. Remediation is not a substitute for validation.

## Bounded Safe Methodology

Map the observation to the narrowest responsible layer: application response construction, authentication/session handling, reverse proxy/CDN, or deployment configuration. Propose a configuration or code change, its intended browser or transport effect, and a benign regression check. Keep changes scoped to the affected routes and avoid broad policy changes without owner review.

## Observations and Interpretation

Controls interact. A transport policy may affect subdomains; a content policy may affect legitimate third parties; cache directives depend on the data served. Prefer a defense-in-depth improvement that preserves documented behavior over an indiscriminate header template.

## False-Positive Controls

- Verify ownership of the configuration layer before assigning a fix.
- Identify legitimate integrations, supported browsers, and route-specific exceptions.
- Review staged behavior before production rollout and retain rollback criteria.

## Stop Conditions

Do not apply changes during an assessment without explicit implementation authorization. Stop a rollout when it breaks normal flows, interrupts third-party dependencies, or introduces unexplained browser policy violations.

## Evidence

Record the original observation, proposed property, affected layer, change owner, rollout constraints, and benign regression evidence. Redact configuration secrets and internal addresses.

## Remediation

Use the [remediation lookup](../assets/remediation-lookup.md) to select a property-focused recommendation, then verify on representative public, authenticated, and sensitive routes where applicable.

## Sources

- PortSwigger Web Security Academy, [Web security topics](https://portswigger.net/web-security)
- OWASP Cheat Sheet Series, [Content Security Policy Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html)
