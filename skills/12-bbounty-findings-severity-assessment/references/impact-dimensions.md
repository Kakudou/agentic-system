# Impact Dimensions

## Purpose

Document what the admitted evidence shows may be affected, without converting a technical condition into a severity conclusion.

## Preconditions

- Evidence is admitted and tied to an authorized finding record.
- The assessed asset, affected party, and observed condition are identified to the extent evidence permits.

## Documentation Method

Review confidentiality, integrity, availability, affected users or tenants, operational disruption, and relevant safety or business context. For each dimension, state the observation, evidence ID, affected boundary, prerequisites, and explicit limit. Record no observed effect rather than filling a dimension from a vulnerability category.

## Bias And False-Claim Controls

- Do not equate access to a route, response, or error with access to sensitive data or control.
- Do not aggregate hypothetical downstream effects into an observed impact.
- Treat the maximum possible consequence as an unverified scenario unless evidence supports its prerequisites and boundary.

## Evidence And Handoff

Hand off a per-dimension worksheet, unsupported dimensions, affected-party uncertainty, and the smallest question an authorized reviewer must answer.

## Sources

- FIRST, [CVSS](https://www.first.org/cvss/)
- OWASP, [Risk Rating Methodology](https://owasp.org/www-community/OWASP_Risk_Rating_Methodology)
