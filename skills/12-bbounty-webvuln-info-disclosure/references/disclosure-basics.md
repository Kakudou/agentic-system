# Disclosure Basics

## Purpose and Preconditions

Establish whether a normal in-scope response exposes more than is needed for its public function. Confirm written authorization, the permitted target and account posture, and applicable rate limits before observing responses.

## Bounded Marker-Based Methodology

Observe a small representative set of normal user journeys. Record only high-level markers: status family, content type, visible product or component identity, unintended internal naming, and public-versus-authenticated response differences. Compare equivalent intended responses; do not enumerate routes or alter access controls.

## Observations and Interpretation

Treat a marker as material when it reveals internals that meaningfully reduce uncertainty for an attacker or exposes data not required by the response. Routine branding, standardized headers, and public documentation are ordinarily informational.

## False-Positive Controls

- Check whether the information is intentionally public and documented.
- Confirm the marker is stable across an equivalent permitted response.
- Separate generic technology identification from version-specific or internal exposure.

## Sensitive-Data Stop Conditions

Stop collection immediately if credentials, session material, personal data, private keys, customer records, internal source content, or access tokens appear. Do not copy, validate, reuse, or share the value; retain only the minimum redacted marker allowed by program rules.

## Evidence and Redaction

Capture the timestamp, authorized target, response context, and a short redacted excerpt or structural description. Replace sensitive values with `[REDACTED: category]`; exclude bodies when metadata alone proves the issue.

## Remediation

Remove unnecessary response fields, standardize public error handling, and restrict operational details to authenticated administrative channels. Retest the same normal response after the change.

## Sources

- PortSwigger: https://portswigger.net/web-security/information-disclosure
- OWASP: https://owasp.org/www-project-web-security-testing-guide/
