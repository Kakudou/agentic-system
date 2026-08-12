# Scope And Test-Account Boundaries

## Purpose

Establish the non-negotiable authorization boundary before collecting role or object observations.

## Preconditions

Obtain the program rules, in-scope targets, approved time window, assigned test account, and any explicit low-impact-action approval.

## Method

- Record what is in scope, excluded, rate-limited, and prohibited.
- Assign a neutral alias to each approved account and tenant context.
- Stop when a task would require a new account, a different tenant, an object not owned by the assigned account, or a state-changing action not explicitly approved.

## Interpretation And Controls

Ambiguous scope is not permission. Authorization for reconnaissance does not authorize bypass attempts, account changes, identifier substitution, enumeration, or cross-account comparison.

## Privacy Safeguards

Keep credentials, tokens, account identifiers, and customer data out of notes and handoffs.

## Evidence And Handoff

Include the source and date of the scope authorization, plus all limitations, at the top of the handoff.

## Sources

- [PortSwigger: Access control](https://portswigger.net/web-security/access-control)
- [OWASP API Security Project](https://owasp.org/www-project-api-security/)
