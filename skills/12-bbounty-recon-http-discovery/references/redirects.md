# Redirect and Canonical-Host Observation

## Purpose and Preconditions

Document redirects and canonical-host behavior encountered while observing an approved endpoint. The initial URL and every followed destination must be explicitly in scope, or the observation stops at the boundary.

## Bounded Safe Methodology

For an ordinary request to the approved endpoint, record each observed status, `Location` value, and effective destination. Follow only the minimum hops needed to establish the approved chain and only within declared host, scheme, port, and path boundaries. Do not manipulate redirect parameters or test user-controlled destinations.

## Observations and Interpretation

HTTP-to-HTTPS, apex-to-canonical-host, locale, and trailing-slash redirects may be intended. A redirect to an unapproved identity, downgrade to HTTP, loop, or inconsistent canonical destination merits review, but does not by itself prove a security defect.

## False-Positive Controls

Distinguish an absolute destination from relative resolution. Note caching, regional routing, authentication state, and client defaults. Confirm a material chain once under the same neutral context if permitted; do not infer an open redirect without an authorized, non-exploitative validation plan.

## Scope, Evidence, and Handoff

Stop before any out-of-scope hop. Capture the source endpoint, hop order, statuses, exact `Location` values, final in-scope endpoint or stop reason, and authorization boundary. Use the [interpretation matrix](../assets/redirect-tls-service-matrix.md) and send uncertain cases through the [handoff template](../assets/recon-handoff-template.md).

## Sources

- [RFC 9110: Redirection](https://www.rfc-editor.org/rfc/rfc9110#section-15.4)
- [OWASP Unvalidated Redirects and Forwards Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.html)
