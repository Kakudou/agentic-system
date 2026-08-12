# Redaction and Final Authorization

## Purpose

Apply minimum-necessary disclosure and capture the authorized decision for the exact prepared package. This reference does not redact automatically, submit content, or make authorization decisions.

## Preconditions

- Admitted report and evidence package.
- Handling classifications, approved submitter, and applicable retention or disclosure rules.
- A reviewer authorized to approve redaction and final handoff.

## Documentation Process

1. Identify content that is not necessary to establish the supported claim: secrets, personal data, private content, internal identifiers, and unrelated system detail.
2. Record whether each item is omitted, replaced by permitted metadata, or represented by a reviewer-approved redacted derivative.
3. Confirm the exact package identifier, recipient, allowed channel, and known limitations after redaction.
4. Request explicit final authorization for that exact package. Record `pending` or `denied` without transferring it when approval is absent.

## Uncertainty and Privacy Controls

- Stop when an item may be sensitive or authorization is unclear; do not inspect, reproduce, or distribute it further.
- Never present a redaction as proof that the underlying content is safe to share.
- Final authorization applies only to the identified package, recipient, and stated reporting boundary.

## Evidence and Handoff

Provide redaction decisions, exclusions, final-authorization status, package identifier, recipient, and remaining blockers. A `ready` handoff requires explicit final authorization.

## Sources

- [NIST SP 800-122](https://csrc.nist.gov/pubs/sp/800/122/final)
- [CISA: Vulnerability Disclosure Policy Platform](https://www.cisa.gov/vulnerability-disclosure-policy-platform)
- [OWASP: Vulnerability Disclosure Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Vulnerability_Disclosure_Cheat_Sheet.html)
