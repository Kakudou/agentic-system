# Privacy, Redaction, And Knowledge Handoff

## Purpose And Preconditions

Use before storing or transferring a historical knowledge record. Require applicable handling rules, a completed minimization review, a named authorized recipient, and an approved destination.

## Documentation Methodology

Retain only the minimum source detail needed to support the bounded historical statement. Replace secrets, access material, personal data, customer content, internal hostnames, unique target details, and restricted excerpts with explicit redaction markers. Record the reason, handling classification, and any review limitation caused by redaction.

## Privacy And False-Claim Controls

Never include credentials, tokens, private keys, session material, raw customer data, or unnecessary identifying information. Redaction cannot substitute for a source reference or make an unsupported claim reliable. Stop and escalate if classification, recipient authority, or safe minimization is uncertain.

## Evidence And Handoff

Attach redaction status, handling caveats, limitations, and unresolved questions to the knowledge handoff. Transfer restricted source references only through an approved channel. The recipient acknowledges receipt and decides retention; the handoff does not authorize new access or a broader use.

## Authoritative Sources

- [NIST SP 800-122, Guide to Protecting PII](https://csrc.nist.gov/pubs/sp/800/122/final)
- [OWASP Logging Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)
