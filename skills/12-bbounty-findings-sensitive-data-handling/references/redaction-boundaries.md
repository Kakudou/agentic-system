# Redaction Boundaries

## Purpose and Preconditions

Create a reviewer-approved derivative only when the restricted original is authorized, a derivative is necessary for the report, and the approved recipient and retention boundary are known. Redaction is not a substitute for authorization or a way to make out-of-scope content usable.

## Documentation Method

Describe the derivative's purpose, source artifact ID, removed categories, retained context, reviewer, and any residual risk. Preserve the fact that content was removed without identifying its value. Keep the original and derivative distinct in the manifest.

## Privacy, Legal, and Scope Controls

Use human review and conservative omission. Remove sensitive values and unnecessary identifiers while retaining only context needed for the stated claim. Do not automate transformation, provide replacement patterns, or create a derivative that enables replay, account access, correlation, or disclosure of the original content. If safe review is unavailable, use metadata-only handoff.

## Evidence and Handoff

Handoff the derivative only with its classification, review status, limitations, and approved audience. A report must state when a key detail was withheld and identify the authorized channel for a reviewer to request it.

## Sources

- OWASP, [Logging Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)
- NIST, [SP 800-122: Protecting PII](https://csrc.nist.gov/pubs/sp/800/122/final)
- ICO, [Anonymisation and pseudonymisation guidance](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-sharing/anonymisation-and-pseudonymisation/)
