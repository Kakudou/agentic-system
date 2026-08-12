# API Basics

## Purpose and Preconditions

Use this reference to establish shared vocabulary before assessment. Confirm a written authorization and an owner-provided API description or capture; this guide does not authorize discovery beyond those materials.

## Bounded Authorized Methodology

Identify the documented operation as method, path, version, request media type, request fields, response fields, authentication mechanism, and expected authorization decision. Treat an operation as a contract between caller and service, not as permission to infer adjacent routes or capabilities.

## Observations and Interpretation

Record whether the supplied contract states ownership, role, tenant, or workflow constraints. A missing statement is a documentation gap, not evidence that access is intended. Separate authentication (who is calling) from authorization (what that caller may do).

## False-Positive Controls

Do not infer production behavior from a sample response, SDK, or stale document. Confirm version and environment with the owner when they differ.

## Stop Conditions

Stop if no approved API surface, test identity, or owner-approved test data is available.

## Evidence

Preserve the document or capture reference, version, operation identifier, and redacted request/response metadata.

## Remediation

Maintain versioned, owner-reviewed contracts that state authentication, authorization, data classification, and error behavior for every operation.

## Sources

- [PortSwigger: API testing](https://portswigger.net/web-security/api-testing)
- [OWASP API Security Top 10](https://owasp.org/API-Security/)
