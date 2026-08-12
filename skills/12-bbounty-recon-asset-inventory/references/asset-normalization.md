# Asset Identity And Ownership Normalization

## Purpose

Create stable, reviewable asset identities from supplied observations while preserving source form and ownership uncertainty.

## Preconditions

- Evidence has passed admission.
- The record includes its observed value and evidence locator.

## Method

1. Keep the exact observed value unchanged in `observed_identity`.
2. Derive a conservative `normalized_identity` appropriate to the supplied type, such as a hostname, URL origin, IP literal, certificate name, application identifier, or cloud resource identifier.
3. Record type, parent or relationship claim, and normalization rule. Separate an asset identity from a service, endpoint, organization, or operator claim.
4. Assign ownership as `confirmed`, `supported`, `unverified`, `disputed`, or `not-assessed`, with evidence IDs and a rationale.

## Interpretation And Controls

Canonicalization is for comparison, not proof. Do not collapse distinct schemes, ports, paths, tenants, names, IPs, or time periods unless the supplied evidence explicitly supports that relationship. Shared hosting, CDNs, resellers, stale DNS or certificates, and lookalike names are attribution hazards. Preserve both records when in doubt.

## Privacy, Scope, And Handoff

Normalize only the minimum identifiers needed for the authorized scope. Do not publish internal labels, account IDs, personal data, or secrets. Mark an asset `out-of-scope`, `scope-unclear`, or `in-scope` only from the written scope. Hand off original and normalized values, rule used, ownership state, and supporting evidence IDs.

## Authoritative Sources

- [RFC 3986, Uniform Resource Identifier Syntax](https://www.rfc-editor.org/rfc/rfc3986)
- [NIST SP 800-101 Rev. 1, Guidelines on Mobile Device Forensics](https://csrc.nist.gov/pubs/sp/800/101/r1/final)
