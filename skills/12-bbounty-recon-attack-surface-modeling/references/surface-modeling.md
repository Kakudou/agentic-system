# Asset, Route, And Identity Synthesis

## Purpose

Represent what admitted evidence supports about assets, observed routes, identity contexts, and declared dependencies in a static review model.

## Preconditions

- Admitted, normalized evidence with stable references.
- A scope decision for each represented asset.

## Method

1. List each observed asset as a distinct record with its scope state, evidence IDs, observation time, and ownership status: confirmed, asserted, or unknown.
2. Attach observed routes to the asset that evidence supports. State route purpose only when the evidence itself provides it; otherwise use a neutral label.
3. Record identity contexts such as unauthenticated, named user role, service identity, or unknown only when supplied evidence supports the context.
4. Add declared dependencies and external services as relationships, preserving direction and evidence. Use “relationship unconfirmed” when association is incomplete.

## Interpretation

The model is a map of observed relationships, not an inventory guarantee. Missing routes, assets, roles, or dependencies may reflect incomplete evidence rather than absence.

## False-Positive And Attribution Controls

- A route label does not prove implementation, access, or authorization behavior.
- A role name does not prove assigned permissions or a reachable workflow.
- A shared infrastructure provider does not establish a trust or ownership relationship.

## Privacy And Scope Limits

Do not describe non-admitted assets in detail. Omit sensitive route values and identity attributes unless necessary for the authorized recipient to validate the relationship.

## Evidence And Handoff

Use the [surface-model worksheet](../assets/surface-model-worksheet.md). Each row must cite evidence IDs and identify unknowns, conflicts, and required validation.

## Sources

- [NIST SP 800-154, Guide to Data-Centric System Threat Modeling](https://csrc.nist.gov/pubs/sp/800/154/ipd)
- [OWASP Application Security Verification Standard](https://owasp.org/www-project-application-security-verification-standard/)
