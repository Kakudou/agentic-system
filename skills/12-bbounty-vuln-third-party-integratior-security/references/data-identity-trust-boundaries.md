# Data, Identity, and Trust-Boundary Classification

## Purpose

Classify what crosses each admitted integration boundary and which identity or authorization decision governs the transfer.

## Preconditions

- An observed integration inventory.
- Redacted data-flow material or owner explanation sufficient to identify data classes and actors.

## Method

Map the source identity, receiving identity, data class, direction, transformation, and decision point for each flow. Classify data conservatively as public, internal, confidential, sensitive, or unknown. Note whether the vendor receives data directly, through a processor, or via an intermediary. Treat all undocumented transformations and authorization assumptions as unknown.

## Interpretation and Scope Controls

Encryption in transit does not establish authorization, minimization, retention, or downstream isolation. A service account name does not prove its effective privilege. Do not inspect payloads beyond approved redacted fixtures or owner-provided samples, and do not attempt cross-identity access.

## Evidence and Handoff

Keep a redacted boundary map and confidence rating. Escalate sensitive or unknown data leaving the approved boundary, unclear identity transitions, and absent ownership records through the designated privacy or security route.

## Sources

- [OWASP API2:2023 Broken Authentication](https://owasp.org/API-Security/editions/2023/en/0xa2-broken-authentication/)
- [OWASP API3:2023 Broken Object Property Level Authorization](https://owasp.org/API-Security/editions/2023/en/0xa3-broken-object-property-level-authorization/)
- [NIST Privacy Framework](https://www.nist.gov/privacy-framework)
