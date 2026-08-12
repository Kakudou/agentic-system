# Client Artifact Correlation

## Purpose

Relate endpoint candidates in authorized client artifacts to observed application behavior while preserving their evidentiary limits.

## Preconditions

- The artifact was delivered by an in-scope origin or supplied by the program.
- Collection is limited to normal browser caching, authorized downloads, or published documentation.

## Methodology

Record the artifact URL, retrieval time, content identifier or hash when available, and the exact contextual location of the route reference. Compare it with an observed browser request or official documentation. Treat artifact review as passive: do not deobfuscate protected material, access source-control history, or invoke embedded endpoints.

## Interpretation

Correlation between an artifact and an observed request increases confidence in route identity and client use. It does not prove that every referenced route is live, public, in scope, or authorized for the current account. Version labels and build identifiers help explain disagreement.

## False-Positive And Scope Controls

Bundled code can include dead code, test fixtures, tenant-specific configuration, third-party SDKs, and previous releases. Source maps and comments can expose non-production references. Do not contact a referenced host until its scope is confirmed.

## Evidence And Handoff

Keep a minimal quoted context or line/location reference, artifact identifier, associated observed route ID, and confidence rationale. Hand off uncorroborated candidates as hypotheses with their source, never as discovered endpoints.

## Authoritative Sources

- [OWASP: Testing for Client-side Resource Manipulation](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/01-Information_Gathering/10-Testing_for_Weak_Transport_Layer_Security)
- [MDN: JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
