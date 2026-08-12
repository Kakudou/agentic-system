# Evidence And Handoff

## Purpose And Preconditions

Prepare a bounded, reviewable handoff of authorized planning or validation evidence. Require an admitted scope record, plan ID, provenance for each observation, and a named receiving owner.

## Planning Methodology

1. Separate observed facts from interpretation and recommended next decision.
2. Record asset identifier, timestamp, plan ID, authorized conditions, evidence locator, and collection limitations.
3. State confidence, plausible benign explanations, and whether the result is unverified, inconclusive, or corroborated.
4. Request a specific owner decision: close, clarify scope, approve limited retest, or begin the recipient's disclosure process.

## Interpretation And Uncertainty

Evidence may be incomplete, environment-specific, transient, redacted, or influenced by account state. Do not label a hypothesis as a vulnerability solely from a single observation. Preserve uncertainty rather than filling gaps with assumptions.

## False-Positive And Scope Limits

Exclude unnecessary personal data, credentials, secrets, customer content, and unrelated system details. Do not attach exploit instructions, payloads, scan output, or claims beyond the approved asset and conditions.

## Evidence And Handoff

Use the [handoff template](../assets/handoff-template.md). Include the authorization reference and stop events. Transfer only to the approved recipient, and retain only evidence permitted by the authorization.

## Sources

- [OWASP Vulnerability Disclosure Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Vulnerability_Disclosure_Cheat_Sheet.html)
- [PortSwigger: Responsible disclosure](https://portswigger.net/web-security/ethical-hacking)
