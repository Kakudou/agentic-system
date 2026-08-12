# Public Artifact Classification

## Purpose

Classify the security relevance of an already observed public artifact while separating normal client-delivered material from potentially unintended publication.

## Preconditions

- Source and ownership admission is complete or explicitly marked unconfirmed.
- The artifact is already visible through the authorized observation method.

## Method

Classify only visible, non-sensitive characteristics: artifact family, public delivery context, declared content type, and whether its visible metadata indicates build, debug, source-reference, backup, or deployment provenance. Use the [classification and confidence matrix](../assets/classification-confidence-matrix.md). Do not retrieve the artifact body, decode embedded data, reconstruct source, or test for related files.

## Interpretation And Controls

Client-side code and public version labels may be intentional. A source-reference or diagnostic indicator is not proof that protected source or operational data is exposed. Consider caching, stale deployment, generic error pages, documentation samples, and vendor-managed assets as alternatives. State impact as potential until authorized owner review confirms it.

## Evidence And Handoff

Capture the smallest redacted description of the visible indicator, delivery context, classification, confidence, and alternative explanations. Escalate only the classification and expected-versus-observed boundary, not artifact content.

## Sources

- OWASP, [Secure Headers Project](https://owasp.org/www-project-secure-headers/)
- OWASP, [Application Security Verification Standard](https://owasp.org/www-project-application-security-verification-standard/)
