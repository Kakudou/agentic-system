# Attribution and Validation

## Purpose and Preconditions

Decide whether an observation can be associated with the authorized organization without claiming more than the evidence supports. Confirm that attribution data is allowed to be retained and shared.

## Authorized Bounded Method

Compare independent, current sources such as the program asset list, organization-controlled documentation, and provider disclosures. Record the relationship as `confirmed`, `likely`, `unverified`, or `third_party`, with the basis for each. Do not contact providers, authenticate, alter DNS, or interact with the service.

## Interpretation

Only an explicit program statement or organization-controlled source can confirm program ownership. Shared hosting, CDNs, cloud platforms, and SaaS providers commonly serve unrelated tenants. A technical association can support a lead but does not establish bounty eligibility.

## False-Positive Controls

- Require a source controlled by the program or organization for `confirmed`.
- Treat provider metadata and network location as contextual, not dispositive.
- Check that source dates and asset identifiers agree.
- Keep third-party and customer assets out of the handoff except as excluded context.

## Rate and Scope Limits

Use only passive or already supplied evidence. Stop when attribution remains ambiguous, when an asset crosses a tenant boundary, or when validation would require active interaction.

## Evidence and Handoff

Include the sources, dates, relevant excerpts, assessment, confidence, and unresolved ownership question. Send ambiguous cases to the program owner; do not report them as confirmed exposure.

## Sources

- [CISA: Asset, Attribute, and Relationship Management](https://www.cisa.gov/resources-tools/resources/asset-attribute-and-relationship-management)
- [NIST SP 800-53 Rev. 5, CM-8 System Component Inventory](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final)
