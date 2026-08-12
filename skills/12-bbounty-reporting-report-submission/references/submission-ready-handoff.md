# Submission-Ready Handoff

## Purpose

Package a readiness decision for a named human submitter. The handoff terminates this skill: no platform access, upload, submission, verification, or communication follows.

## Preconditions

- Report and evidence admission passed.
- Policy/format review passed with no unresolved blockers.
- Redaction complete and final authorization granted for the exact package.

## Documentation Process

1. Seal the report version, permitted evidence references, applicable rule sources, and redaction decisions in the [sealed handoff/record template](../assets/sealed-handoff-record-template.md).
2. Identify the authorized human submitter and authorized reporting channel without including credentials or access instructions.
3. State only the package identifier, readiness decision, limitations, and the fact that submission remains a human action.
4. If any precondition is absent, produce a `not-ready` handoff that lists blockers and required reviewer decisions.

## Uncertainty and Privacy Controls

- Do not claim the package was submitted, accepted, uploaded, or received.
- Do not include secrets, authentication material, raw restricted artifacts, or message text.
- An altered report, evidence set, recipient, or rule source invalidates the handoff and requires renewed review.

## Evidence and Handoff

The output is the sealed handoff record. It must contain traceable admission, review, redaction, and authorization references sufficient for the human submitter to assess readiness.

## Sources

- [HackerOne: Disclosure Guidelines](https://www.hackerone.com/disclosure-guidelines)
- [Bugcrowd: Code of Conduct](https://www.bugcrowd.com/code-of-conduct/)
- [CERT/CC Vulnerability Disclosure Guidance](https://www.kb.cert.org/vuls/id/806280)
