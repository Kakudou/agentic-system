# Privacy And Redaction Controls

## Purpose And Preconditions

Use before storing, sharing, or handing off a technique record. Require the applicable data-handling rules, recipient authorization, and a secure approved destination. Privacy review applies to source excerpts, metadata, screenshots, and derived summaries.

## Documentation Methodology

Retain only evidence necessary to support the bounded claim. Replace secrets, access material, personal data, customer content, internal hostnames, and unique target details with explicit redaction markers. Record what was removed, why, and whether the redaction limits independent review.

## False-Claim And Privacy Controls

Never preserve credentials, session material, private keys, tokens, raw customer records, or unnecessary identifying data. Do not use redaction to conceal a missing evidence basis. Stop and escalate when sensitive content cannot be safely minimized, the classification is unknown, or the intended recipient is not authorized.

## Evidence And Handoff

Include the redaction status and handling caveats in every handoff. Provide restricted source references only through the approved channel, never by reproducing restricted content in the general knowledge record.

## Authoritative Sources

- [NIST SP 800-122, Guide to Protecting PII](https://csrc.nist.gov/pubs/sp/800/122/final)
- [OWASP Logging Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)
