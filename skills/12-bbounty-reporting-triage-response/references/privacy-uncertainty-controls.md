# Privacy And Uncertainty Controls

## Purpose

Prevent unnecessary disclosure and prevent incomplete evidence from becoming a factual assertion.

## Preconditions

- Supplied evidence has been mapped to intended factual points.
- Applicable program handling rules are available or their absence is recorded.

## Documentation Methodology

Minimize each attachment or excerpt to what supports the mapped point. Redact credentials, tokens, cookies, personal data, account identifiers, internal hostnames, source code, logs, and exploit-enabling detail unless explicitly authorized and necessary. Label statements as observed, bounded inference, inconclusive, or unsupported. Record the reason for every redaction, exclusion, and stop.

## Boundary

Do not expose secrets to obtain review, infer absence from missing evidence, or use active testing to reduce uncertainty. Stop when authority, handling, scope, or the safety of disclosure is unclear.

## Evidence And Handoff

Attach the completed checklist and identify unredacted evidence location, redaction rationale, uncertainty, and the reviewer decision needed to proceed.

## Sources

- [OWASP Vulnerability Disclosure Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Vulnerability_Disclosure_Cheat_Sheet.html)
- [NIST SP 800-61r3](https://csrc.nist.gov/pubs/sp/800/61/r3/final)
