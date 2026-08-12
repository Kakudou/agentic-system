# API Security Prevention

## Purpose and Preconditions

Translate verified API assessment observations into owner-actionable controls. Requires a verified observation or a clearly labeled design-review gap; do not present generic recommendations as proof of a vulnerability.

## Bounded Authorized Methodology

Map the affected operation to one root-cause class: inventory/version control, authentication, object authorization, property authorization, function authorization, schema validation, resource control, or observability. Recommend the smallest server-side control that prevents the demonstrated behavior and a regression test using the approved role-object-action contract.

## Observations and Interpretation

Prioritize controls that eliminate the trust-boundary failure, rather than client validation or error-message masking. A single issue can require both an authorization rule and a schema allowlist.

## False-Positive Controls

Verify that the recommendation applies to the deployed API version, framework behavior, and stated business rule. Do not prescribe a control that would remove documented delegated access without owner review.

## Stop Conditions

Stop and request architecture-owner input when remediation changes tenant boundaries, role definitions, data retention, compatibility guarantees, or regulated data handling.

## Evidence

Link the remediation to the finding evidence, contract clause, affected operation/version, accountable owner, and a regression test expectation.

## Remediation

Maintain an authenticated, versioned API inventory; authenticate every request; authorize every action, object, and property server-side with deny-by-default policy; allowlist writable fields; validate schemas strictly; constrain resource use; retire old versions; log authorization decisions without secrets; and test the role-object-action matrix continuously.

## Sources

- [PortSwigger: API testing](https://portswigger.net/web-security/api-testing)
- [OWASP API Security Top 10](https://owasp.org/API-Security/)
