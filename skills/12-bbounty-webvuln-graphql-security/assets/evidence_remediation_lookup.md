# GraphQL Evidence And Remediation Lookup

Capture minimum necessary redacted evidence. A class is reportable only when its proof and false-positive controls are complete.

| Finding class | Minimum evidence | False-positive controls | Remediation |
|---|---|---|---|
| Schema exposure | Approved role context, relevant redacted metadata, expected metadata policy, material impact rationale | Public-schema policy, normal-client availability, execution authorization separate from metadata | Restrict metadata by environment/role where appropriate; remove sensitive descriptions and unused operations |
| Object authorization | Expected ownership policy, controlled owner/non-owner labels, minimal server responses proving unauthorized object access | Session identity, tenant membership, shared/delegated access, cache state | Deny by default in resolvers; validate ownership/tenant relationship server-side |
| Field authorization | Allowed object context, requested protected field, redacted result showing unauthorized field exposure | Field policy, role freshness, client-side masking versus server result | Enforce field-level resolver/policy checks; return only authorized fields |
| Relationship authorization | Controlled parent/related object labels, relationship policy, minimal response showing improper traversal | Documented sharing, tenant/role relationships, result-size controls | Authorize relationship resolvers and filter related records by policy |
| Mutation authorization | Written write permission, before/after controlled state, cleanup record, server-confirmed prohibited action | Role/session state, idempotency, asynchronous processing, cleanup verification | Enforce action-level authorization and server-derived object relationships; add policy tests |
| Query-cost control | Approved limit, one baseline and one bounded comparison, visible policy mismatch or server cost decision | Cache/network variance, documented bulk behavior, no timing-only conclusion | Pre-execution depth/breadth/alias/batch/cost limits; operation-aware quotas; pagination caps |

## Evidence Hygiene

- Label accounts and objects rather than storing credentials, full identifiers, or unrelated records.
- Keep request/response excerpts minimal and redact tokens, personal data, secrets, internal hostnames, and opaque identifiers.
- Record timestamps, request correlation IDs when available, and cleanup status without reproducing sensitive payloads.
- State uncertainty explicitly when server-side accounting or policy documentation is unavailable.

## Source Links

- PortSwigger GraphQL: https://portswigger.net/web-security/graphql
- OWASP GraphQL Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html
- OWASP API Security: https://owasp.org/www-project-api-security/
