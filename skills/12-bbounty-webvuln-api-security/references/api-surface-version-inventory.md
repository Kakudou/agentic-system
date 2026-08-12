# API Surface and Version Inventory

## Purpose and Preconditions

Create a finite assessment inventory from owner-provided specifications, endpoint lists, approved traffic captures, or documentation. Written authorization must explicitly cover each host and version.

## Bounded Authorized Methodology

Transcribe only supplied operations into the coverage worksheet. For each, record host, base path, version, method, operation name, object type, media type, and stated lifecycle status. Ask the owner to resolve omissions or version conflicts; do not probe likely documentation paths, derive neighboring versions, crawl, or enumerate.

## Observations and Interpretation

An operation present in an approved source but absent from the current contract may indicate documentation drift or an assessment target requiring owner confirmation. A deprecated version remains in scope only when explicitly authorized.

## False-Positive Controls

Distinguish gateway routes from application operations and test, staging, and production environments. Do not treat a client-side reference as proof an endpoint is reachable or permitted.

## Stop Conditions

Stop at an undocumented operation, a host or version outside authorization, or an inconsistency the owner has not resolved.

## Evidence

Record the source reference, retrieval date, approved scope reference, and inventory row. Do not retain unneeded response bodies.

## Remediation

Publish a controlled inventory with version lifecycle, owner, authentication requirements, and retirement dates; remove or block retired versions.

## Sources

- [PortSwigger: API testing](https://portswigger.net/web-security/api-testing)
- [OWASP API8:2023 Security Misconfiguration](https://owasp.org/API-Security/editions/2023/en/0xa8-security-misconfiguration/)
