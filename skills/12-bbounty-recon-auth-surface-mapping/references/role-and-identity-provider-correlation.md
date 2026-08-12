# Role And Identity-Provider Correlation

## Purpose

Correlate explicitly displayed account roles, identity labels, and providers without inferring authorization or organizational membership.

## Preconditions

- The role or provider label is visible in an authorized public or supplied-account view.

## Method

Record exact displayed labels, their page context, and the associated journey. Associate a provider only when the UI or program documentation names it. Associate a role only with the supplied account state that displays it.

## Interpretation And Controls

Branding, domain names, and button icons are weak indicators. Record them as unconfirmed presentation cues, not provider identity. A role label is not evidence of accessible functions, tenant membership, or privilege boundaries. Do not switch roles, edit identity links, or inspect assertions or claims.

## Privacy, Evidence, And Handoff

Avoid names, emails, tenant IDs, employee data, and avatar images. Use generic account classes or program-approved pseudonyms. Hand off confidence and the source of each correlation so a permitted owner can validate it.

## Sources

- [PortSwigger: OAuth authentication](https://portswigger.net/web-security/oauth)
- [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)
