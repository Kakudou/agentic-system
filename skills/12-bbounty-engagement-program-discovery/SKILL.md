---
name: 12-bbounty-engagement-program-discovery
description: Establish source-traceable authorization and public rules evidence before a program is handed to intake.
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Program Discovery

## Purpose

Create a bounded discovery record for a publicly documented vulnerability disclosure or bug bounty program. This skill establishes documentation evidence only. It does not authorize testing, expand scope, access private programs, collect target data, submit reports, or assess program suitability.

## Prerequisites

- A public program page, policy, or official program document.
- The source URL or document identity, access time, and an authorized downstream intake/review channel.
- Authority to review the public material. Private or authenticated material requires explicit authorization.

## Workflow

1. Record the official source, publisher relationship, access time, and revision signal. See [source provenance](references/source-provenance.md).
2. Screen whether the material grants public eligibility and testing authorization. Stop when authorization, identity requirements, access conditions, or program status are unclear. See [eligibility and authorization screening](references/eligibility-authorization.md).
3. Capture public scope, exclusions, permitted actions, restrictions, reporting channel, and safe-harbor terms verbatim with locators. See [public rules and scope evidence](references/public-rules-capture.md).
4. Mark every material claim with source attribution, confidence, and recency status. Do not resolve conflicts by inference. See [uncertainty and recency controls](references/confidence-validation.md).
5. Complete the record and transfer only documented, bounded facts and stop conditions to intake. See [intake handoff](references/handoff.md).

## Evidence

- Canonical source identity, publisher relationship, access time, and version or revision evidence.
- Verbatim, locator-backed excerpts for authorization, eligibility, status, scope, exclusions, restrictions, and reporting terms.
- Claim-level source attribution, confidence, recency assessment, conflicts, and unresolved questions.
- A completed eligibility/stop checklist and named handoff recipient.

## Output

Complete [program-discovery-record.md](assets/program-discovery-record.md), [source-confidence-matrix.md](assets/source-confidence-matrix.md), and [eligibility-stop-checklist.md](assets/eligibility-stop-checklist.md). Transfer the result using [program-intake-handoff.md](assets/program-intake-handoff.md).

The output must distinguish `documented authorization`, `documented restrictions`, `unknown or conflicting`, and `stop/escalation conditions`. It is not permission to test.

## Supplemental Index

- [Source provenance](references/source-provenance.md)
- [Eligibility and authorization screening](references/eligibility-authorization.md)
- [Public rules and scope evidence](references/public-rules-capture.md)
- [Uncertainty and recency controls](references/confidence-validation.md)
- [Intake handoff](references/handoff.md)
