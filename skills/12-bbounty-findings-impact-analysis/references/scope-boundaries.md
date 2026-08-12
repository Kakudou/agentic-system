# Scope and Affected-Party Boundaries

## Purpose and Preconditions

Use before impact documentation. Obtain the program's current in-scope assets, authorized accounts or tenants, prohibited actions, and disclosure route.

## Documentation Method

Record the tested asset and environment, the authorized identity or test data, the stated boundary, and parties directly represented by the evidence. Identify whether a claim concerns a resource, role, account, tenant, or service, without naming unrelated parties.

## Interpretation

Evidence from one authorized account or tenant establishes only that instance unless the program or evidence explicitly defines broader applicability. Treat staging, preview, and production as separate environments. Stop rather than crossing an unclear boundary.

## False-Claim and Privacy Controls

Never infer population size, customer exposure, or cross-tenant impact from naming, routing, or implementation patterns. Do not test third-party identities, real customer data, or out-of-scope systems. Use synthetic data where the program provides it.

## Evidence and Handoff

Complete the [scope and stop checklist](../assets/scope-stop-checklist.md) and include it with the report when scope affects interpretation.

## Sources

- [OWASP Vulnerability Disclosure Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Vulnerability_Disclosure_Cheat_Sheet.html)
- [CVSS v4.0 specification](https://www.first.org/cvss/v4-0/specification-document)
