# SAML Observation

## Purpose

Provide protocol context for interpreting an already observed SAML service-provider and identity-provider trust relationship.

## Preconditions

- SAML is identified in supplied documentation, an authorized normal-flow capture, or an authorized prior artifact.
- Any metadata used was supplied or explicitly approved for review; metadata endpoint probing is out of scope unless separately authorized.

## Method

Record the observed entity identities, role of each party, normal browser journey, assertion consumer context, signing or encryption policy as documented, and metadata provenance. Compare the documented recipient, audience, time, signature, and subject-binding expectations with approved evidence. Do not construct, modify, post, replay, decode, or validate assertions.

## Interpretation

Metadata presence, unsigned-looking browser fields, clock messages, and identifier display differences are not proof of an acceptance failure. A concern requires a documented policy mismatch plus authorized evidence that the service provider accepted an unintended trust or identity outcome.

## False-Positive and Scope Controls

Keep IdP and service-provider ownership distinct, account for brokered or multi-IdP deployments, and avoid recording assertion contents or personal attributes. Stop when evidence includes another user's session or an unapproved partner boundary.

## Evidence and Handoff

Provide redacted metadata references, flow chronology, expected and observed controls, uncertainty, and the responsible IdP/SP owner. Use the [IdP/SP flow evidence worksheet](../assets/idp-sp-flow-evidence-worksheet.md).

## Sources

- [OWASP SAML Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SAML_Security_Cheat_Sheet.html)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [PortSwigger: OAuth 2.0 authentication vulnerabilities](https://portswigger.net/web-security/oauth)
