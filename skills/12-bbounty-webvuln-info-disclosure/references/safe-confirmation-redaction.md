# Safe Confirmation and Redaction

## Purpose and Preconditions

Confirm an observed disclosure without expanding collection. Authorization must explicitly permit the target and the reporting channel must support protected evidence handling.

## Bounded Marker-Based Methodology

Classify one observed marker as informational, implementation detail, or sensitive exposure. Confirm only that the same marker appears in an equivalent permitted response. Prefer response shape, field name, type, or byte count over the value itself. Make no credential use, access-control test, bulk retrieval, decoding, or correlation across users.

## Observations and Interpretation

Evidence is sufficient when an independent reviewer can understand what was exposed, why it was unintended, and its plausible impact without receiving the sensitive value. If this cannot be demonstrated safely, report the observation and the collection limit.

## False-Positive Controls

- Confirm the marker is not test data supplied by the assessor.
- Check stated program documentation and intended public behavior.
- Do not elevate severity solely because a string looks secret; classify as unverified and stop.

## Sensitive-Data Stop Conditions

Immediately stop on any secret, authentication material, payment data, personal data, private source, or another user's content. Do not save, transmit, transform, validate, or attempt to revoke it. Follow the program's incident contact path if one exists.

## Evidence and Redaction

Redact values at capture time using a category placeholder, retain only a minimal surrounding marker, and avoid screenshots containing unrelated data. State the redaction method and any evidence limitation in the report. Remove local working copies according to program policy after reporting.

## Remediation

Limit response data by audience, protect diagnostics, rotate or invalidate exposed secrets through the owner, and add release-time secret and response-review controls. Retest only after owner authorization.

## Sources

- PortSwigger: https://portswigger.net/web-security/information-disclosure
- OWASP Data Exposure: https://owasp.org/www-project-top-ten/
