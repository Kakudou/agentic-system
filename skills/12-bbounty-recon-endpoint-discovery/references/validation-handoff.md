# Validation And Handoff

## Purpose

Turn observations into a reviewable inventory without overstating confidence or authorizing follow-on testing.

## Preconditions

- Each proposed entry has a scope decision and source evidence.
- Sensitive values have been removed or replaced with stable redaction markers.

## Methodology

Review entries against the worksheet and confidence matrix. Reconcile duplicates by exact route identity and context, retaining conflicting observations. Use only passive corroboration or a separately approved low-impact action. Do not validate candidates by broadening paths, changing methods, replaying state-changing requests, or contacting unconfirmed origins.

## Interpretation

Label evidence as `observed`, `documented`, or `hypothesized`; label confidence separately. A high-confidence route observation is not a vulnerability finding or permission to test authorization, input handling, or business logic.

## False-Positive And Scope Controls

Preserve account, tenant, release, and time context. Rate limits, authorization changes, and deployment drift can explain inconsistent evidence. Stop and request direction where scope, data sensitivity, or the impact of a confirmation action is uncertain.

## Evidence And Handoff

Use the handoff template to provide the bounded inventory, evidence references, unresolved conflicts, and exact approvals needed next. Recipients must be able to reproduce the classification from the supplied evidence without recovering secrets.

## Authoritative Sources

- [OWASP Vulnerability Disclosure Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Vulnerability_Disclosure_Cheat_Sheet.html)
- [ISO/IEC 29147:2018 Vulnerability Disclosure](https://www.iso.org/standard/72311.html)
