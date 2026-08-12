# Configuration And Identity Boundaries

## Purpose

Interpret cloud-facing access boundaries without attempting to retrieve metadata, configuration, identity information, credentials, or protected content.

## Preconditions

- The asset and observation method are authorized.
- The assessor has an expected-boundary statement from scope, public documentation, or an owner contact.

## Method

1. Observe only the intended public interface or an owner-provided read-only console summary.
2. Describe the visible boundary in neutral terms: public delivery, authentication challenge, access denied, documented identity handoff, or indeterminate response.
3. Ask the owner to validate identity, policy, network, and logging controls in their account. Do not make requests to internal, link-local, administrative, or metadata endpoints.
4. Compare the owner's validation result with the public observation and update confidence without adding new probing.

## Interpretation And Scope Controls

- Authentication prompts, redirects, and denials often demonstrate a boundary, not a defect.
- The absence of a visible login does not prove anonymous data access; public content delivery may be intentional.
- Do not test server-side request behavior, redirect handling, alternate hosts, or identity flows unless a separate written authorization explicitly defines a safe method.

## Privacy Limits

Never collect identity tokens, account identifiers, instance details, policy documents, network topology, or configuration values. Use owner-provided conclusions rather than raw administrative data in reports.

## Evidence And Handoff

Record the expected and observed boundary, owner validation request, and result classification in the confidence matrix. If owner validation is unavailable, report the observation as unverified.

## Sources

- [AWS shared responsibility model](https://aws.amazon.com/compliance/shared-responsibility-model/)
- [Azure managed identities overview](https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview)
- [Google Cloud identity and access management overview](https://cloud.google.com/iam/docs/overview)
- [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)
