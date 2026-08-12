# Scope, Vendor, and Ownership Admission

## Purpose

Establish that each observed integration is in scope and has an accountable application owner, vendor owner, and escalation route before assessment.

## Preconditions

- Written authorization and exclusions.
- Named application owner and vendor-contact path.
- A permitted source such as architecture documentation, contract inventory, or owner-supplied configuration.

## Method

Passively compare the authorized scope with documentation and normal-use evidence. Record the service name, direction, owner, purpose, and whether the vendor relationship is confirmed, inferred, or unknown. Ask the owner to resolve conflicts; do not contact vendors or discover undisclosed integrations.

## Interpretation and Scope Controls

A brand name, DNS name, or client-side library is not proof of an active vendor relationship. Mark shared infrastructure, resellers, and unknown ownership as unverified. Stop if the integration crosses an excluded tenant, environment, or legal boundary.

## Evidence and Handoff

Preserve authorization references, redacted owner statements, and document locations. Hand unresolved ownership to the named application owner, not an unverified vendor contact.

## Sources

- [OWASP Third Party Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Third_Party_Management_Cheat_Sheet.html)
- [NIST SP 800-161r1, Cybersecurity Supply Chain Risk Management](https://csrc.nist.gov/pubs/sp/800/161/r1/final)
