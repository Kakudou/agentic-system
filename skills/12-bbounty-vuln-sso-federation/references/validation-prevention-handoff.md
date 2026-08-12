# Safe Confirmation, Prevention, and Handoff

## Purpose

Distinguish an observed configuration concern from a confirmed server-side trust failure and prepare actionable remediation.

## Preconditions

- A documented expected control and a bounded concern exist.
- Any active confirmation is explicitly authorized, uses a designated test identity, and has a harmless action and stop condition.

## Method

Prefer supplied server logs, configuration review, or a normal sign-in by the designated account. If an approved low-impact check is necessary, perform only the predeclared normal action and record the result; do not modify authentication artifacts, account associations, or authorization inputs. Compare the observed server decision to the documented policy.

## Interpretation

Confirm only a demonstrated policy violation. Client-side state, a redirect, an error variation, or an unverified metadata value is inconclusive. State the exact boundary demonstrated and do not extrapolate impact to other identities, tenants, or providers.

## False-Positive and Scope Controls

Account for intended provisioning, migration, delegated administration, support access, and environment differences. Stop and escalate on unexpected access, sensitive data, or a test account leaving its assigned tenant.

## Evidence and Handoff

Provide expected policy, minimal authorized observation, server-side result where available, redacted proof, limitations, and validation criteria. Recommend issuer/audience/recipient and signature validation, stable subject-to-account binding, tenant binding, redirect ownership controls, and monitoring appropriate to the architecture.

## Sources

- [PortSwigger: OAuth 2.0 authentication vulnerabilities](https://portswigger.net/web-security/oauth)
- [OWASP OAuth2 Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/OAuth2_Cheat_Sheet.html)
- [OWASP SAML Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SAML_Security_Cheat_Sheet.html)
