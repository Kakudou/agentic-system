# Transfer Exposure Handling

## Purpose and Preconditions

Use this guide when documentation, owner disclosure, or an authorized assessment result indicates possible DNS transfer exposure. Do not request DNS transfers under this skill. Any transfer validation requires a separately documented authorization and an owner-approved procedure.

## Methodology

Document the relevant zone, authoritative-service context, source of the indication, and whether the evidence is owner-provided, passive, or separately authorized. Review only the minimum disclosed metadata required to assess whether transfer controls need owner review.

## Interpretation and Attribution

An indication of transfer capability is not evidence that a zone was transferred, that all records were exposed, or that a third-party DNS operator is at fault. Authority may be delegated to a managed provider. Distinguish configuration ownership, service operation, and customer-zone responsibility before assigning a finding.

## False-Positive Controls

Do not treat timeout messages, documentation examples, stale disclosures, or a provider's normal authority role as exposure evidence. Require an owner-provided or separately authorized evidence reference that identifies the zone and observation time.

## Limits, Evidence, and Handoff

Do not make transfer requests, parse disclosed zone contents beyond the approved purpose, or follow discovered names into new scope. Follow the engagement rate and scope limits for any related low-impact observation. Record the authorization boundary, authoritative context, minimal evidence reference, and confidentiality handling. Escalate possible transfer-control issues directly to the asset owner or authorized DNS operator.

## Authoritative Sources

- [RFC 5936: DNS Zone Transfer Protocol](https://datatracker.ietf.org/doc/html/rfc5936)
- [RFC 1996: A Mechanism for Prompt Notification of Zone Changes](https://datatracker.ietf.org/doc/html/rfc1996)
- [NIST SP 800-81r3: Secure Domain Name System Deployment Guide](https://csrc.nist.gov/pubs/sp/800/81/r3/final)
