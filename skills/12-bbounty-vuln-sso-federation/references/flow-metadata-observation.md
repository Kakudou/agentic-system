# Federation Flow and Metadata Observation

## Purpose

Create a provenance-bound record of the normal in-scope federation journey and supplied metadata without expanding interaction.

## Preconditions

- Boundary admission is complete.
- Browser captures, logs, documentation, or metadata artifacts are supplied or explicitly approved.

## Method

Record only observed transitions: relying party, IdP, return destination, environment, timestamp, and artifact source. For supplied OIDC discovery or SAML metadata, record the artifact identity, retrieval provenance, and relevant documented trust fields without extracting secrets or raw assertions. Use the [IdP/SP flow evidence worksheet](../assets/idp-sp-flow-evidence-worksheet.md).

## Interpretation

Missing fields can result from redaction, brokered federation, application routing, or incomplete capture. A metadata inconsistency is a lead until ownership and server-side behavior are confirmed through an approved method.

## False-Positive and Scope Controls

Do not fetch alternate metadata locations, enumerate clients, follow redirects outside scope, or preserve credentials, cookies, codes, tokens, or assertions. Mark unknowns explicitly.

## Evidence and Handoff

Store redacted artifacts by reference, with timestamp, collector, source, and integrity handling. Hand off discrepancies with expected configuration, observed fact, limitation, and owner.

## Sources

- [PortSwigger: OpenID Connect](https://portswigger.net/web-security/oauth/openid-connect)
- [OWASP OAuth2 Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/OAuth2_Cheat_Sheet.html)
- [OWASP SAML Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SAML_Security_Cheat_Sheet.html)
