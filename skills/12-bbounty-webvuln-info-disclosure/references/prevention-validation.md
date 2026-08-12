# Prevention and Validation

## Purpose and Preconditions

Translate a confirmed, redacted observation into a minimal corrective action and safe validation. Obtain owner approval for any retest and keep scope identical to the original observation.

## Bounded Marker-Based Methodology

Map the disclosure category to one control boundary: response construction, error handling, deployment packaging, access control, or logging. Define a pass marker that can be checked with the same permitted interaction, such as absence of an unnecessary field or replacement by a generic error identifier.

## Observations and Interpretation

A fix is confirmed only when the original exposure marker is absent or safely generalized and the intended user function remains available. A changed response alone is not proof if it merely relocates the sensitive value.

## False-Positive Controls

- Validate in the intended production-like configuration.
- Check both the original response condition and a normal success path.
- Do not treat access denial, network failure, or an unrelated deployment change as remediation.

## Sensitive-Data Stop Conditions

If retesting reveals sensitive data, stop and report it as a new or persistent exposure. Do not broaden validation, compare values, or test their usability.

## Evidence and Redaction

Record the remediation claim, authorized retest context, before/after marker categories, and redacted outcome. Retain no previously exposed sensitive values.

## Remediation

Apply least disclosure: minimize public metadata, use generic production errors, remove non-runtime artifacts, segregate diagnostics, and automate release checks for unintended sensitive material. Assign a control owner and regression test where the organization supports it.

## Sources

- PortSwigger: https://portswigger.net/web-security/information-disclosure
- OWASP Testing Guide: https://owasp.org/www-project-web-security-testing-guide/
