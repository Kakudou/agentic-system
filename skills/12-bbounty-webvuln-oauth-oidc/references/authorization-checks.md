# Authorization Binding Checks

## Purpose And Preconditions

Assess whether authentication, consent, identity mapping, and resource authorization stay bound to the intended user, client, and tenant. Use only accounts, tenants, roles, and actions explicitly provided for testing.

## Safe Bounded Method

1. Define a controlled matrix of two test accounts and their permitted roles or tenants.
2. Perform normal login and consent journeys separately for each account.
3. Verify the local account, displayed identity, granted scopes, organization context, and harmless authorized action match the initiating account and client.
4. If account linking exists, review its documented confirmation and re-authentication requirements. Do not create, alter, or attempt links outside sanctioned test cases.
5. Confirm resource servers independently enforce scope, subject, tenant, and object authorization rather than relying solely on successful login.

## Observations And Interpretation

| Observation | Interpretation |
| --- | --- |
| Local identity follows validated provider subject and intended tenant | Expected binding. |
| Email or display name alone determines account ownership | Risk depends on verification, uniqueness, and provider trust model; review evidence before reporting. |
| Login success grants a broader role than the controlled account owns | Potential authorization mapping defect; confirm with a harmless action. |
| API denies an action despite UI exposure | UI state alone is not an authorization finding. |

## False-Positive Controls

- Separate provider SSO session selection from the relying party's local account mapping.
- Test tenants and roles can have intentional support privileges; verify the program's role model.
- Do not claim cross-account impact without demonstrating a controlled, harmless authorization result.

## Evidence

Record test-account role descriptions, client and tenant context, expected and observed local identity, harmless action result, and any documented account-linking policy. Redact identifiers and session data.

## Remediation

Bind local accounts to validated issuer-plus-subject identifiers; require explicit, authenticated confirmation for account linking; enforce consented scopes and tenant/object authorization at each resource server; and log binding decisions without storing secrets.

## PortSwigger Sources

- [OAuth 2.0 authentication vulnerabilities](https://portswigger.net/web-security/oauth)
