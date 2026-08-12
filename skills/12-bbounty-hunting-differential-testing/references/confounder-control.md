# False-Positive And Confounder Controls

## Purpose

Identify plausible non-security causes for an observed difference and determine when assessment must stop.

## Preconditions

- A documented difference and its collection context.
- Applicable scope, privacy, and impact limits.

## Low-Impact Methodology

Check supplied evidence for differences in environment, time, identity, role, tenant, session state, deployment version, localization, intermediary behavior, and capture completeness. Record each control as supported, unresolved, or not assessable; do not create new interactions to resolve it.

## Interpretation And Uncertainty

One unresolved material confounder lowers confidence. Several confounders, or a missing provenance chain, make the comparison inconclusive. A benign explanation need not be proven to prevent a vulnerability claim.

## False-Positive And Scope Controls

Never treat missing evidence as confirmation. Stop when resolving a confounder would require unapproved access, state change, sensitive-data exposure, third-party interaction, or availability risk.

## Evidence And Handoff

List the confounder, supporting or missing evidence, its effect on confidence, and the designated owner question in the matrix and handoff packet.

## Sources

- [NIST SP 800-115](https://csrc.nist.gov/pubs/sp/800/115/final)
- [OWASP Vulnerability Management Guide](https://owasp.org/www-project-vulnerability-management-guide/)
