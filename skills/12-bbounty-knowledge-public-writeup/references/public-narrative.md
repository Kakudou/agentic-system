# Public Narrative Structure

## Purpose

Create an educational, accurate public narrative that explains a security lesson without becoming a target-specific operational guide.

## Preconditions

- Public disclosure has passed authorization and embargo admission.
- The claim/evidence set has a verified learning goal and allowed audience.

## Documentation Method

Structure the draft as: context and scope, security lesson, verified impact at an approved level of abstraction, remediation principles, defensive takeaways, and limitations. Use the static outline. Prefer generalized architecture and sanitized diagrams over target names, request traces, or reproducible sequences. State what the writeup does not establish.

## Privacy And False-Claim Controls

Use only the minimum technical detail needed to support the learning goal. Exclude active paths, credentials, identifiers, internal topology, timing-sensitive details, and procedural material that could enable misuse. Separate observed facts from interpretation and avoid universal claims based on one case.

## Evidence And Handoff

Map each section to the claim/evidence matrix. Flag sections needing legal, program-owner, or technical review. Deliver a draft marked `review required`, never `published`.

## Responsible-Disclosure Sources

- [OWASP Vulnerability Disclosure Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Vulnerability_Disclosure_Cheat_Sheet.html)
- [FIRST Guidelines for Multistakeholder Vulnerability Coordination](https://www.first.org/global/sigs/vulnerability-coordination/guidelines)
