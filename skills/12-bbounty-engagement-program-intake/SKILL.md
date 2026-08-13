---
name: 12-bbounty-engagement-program-intake
description: Build a source-traceable, rules-first intake packet for an authorized vulnerability disclosure or bug bounty program.
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Program Intake

## Purpose

Turn program documentation into a bounded engagement packet. This skill is documentation intake only: do not test targets, collect target data, submit reports, or infer authorization.

## Prerequisites

- A program page, policy document, or other authoritative program material.
- The source URL or document identity and access time.
- A named clarification/review channel for unresolved questions or the decision to stop.

## Rules-First Workflow

1. Capture the authoritative source, version or revision signal, access time, and relevant excerpts. See [source provenance](references/source-provenance.md).
2. Extract each in-scope and excluded asset exactly as stated. Record asset type, qualifier, and source locator; do not expand wildcards or ranges. See [scope and rules extraction](references/bounty-briefs.md).
3. Separate explicit authorization from restrictions on actions, systems, accounts, and data. An omitted permission is not permission. See [authorization restrictions](references/testing-restrictions.md).
4. Record safe-harbor conditions, reporting channel, confidentiality, disclosure, duplicate, and timing terms without treating them as testing authorization. See [safe harbor and disclosure](references/safe-harbor.md) and [disclosure interpretation](references/disclosure-policies.md).
5. Assign confidence to every material rule. Escalate ambiguity, source conflicts, or missing authorization before any downstream action. See [ambiguity and validation](references/ambiguity-validation.md).
6. Deliver the packet and explicit stop conditions through the authorized review channel. See [engagement handoff](references/handoff.md).

## Evidence

- Source identity, canonical URL or document identifier, access time, and version/revision evidence.
- Verbatim excerpts with stable locators for scope, exclusions, permissions, restrictions, safe harbor, and disclosure terms.
- Normalized rule entries linked to their excerpts, each marked `high`, `medium`, or `low` confidence.
- Open questions, contradictions, and the escalation route.

## Output

Use [program-intake-worksheet.md](assets/program-intake-worksheet.md) and attach [scope-rule-confidence-matrix.md](assets/scope-rule-confidence-matrix.md). Include the completed [ambiguity-stop-checklist.md](assets/ambiguity-stop-checklist.md) and use [engagement-handoff-template.md](assets/engagement-handoff-template.md) for transfer.

The final packet must state: `authorized scope`, `explicitly prohibited`, `conditional or unclear`, `safe-harbor limits`, `disclosure/timing terms`, `evidence references`, and `stop/escalation conditions`.

## Supplemental Index

- [Source provenance](references/source-provenance.md)
- [Scope and rules extraction](references/bounty-briefs.md)
- [Authorization restrictions](references/testing-restrictions.md)
- [Safe harbor and disclosure](references/safe-harbor.md)
- [Disclosure interpretation](references/disclosure-policies.md)
- [Ambiguity and validation](references/ambiguity-validation.md)
- [Engagement handoff](references/handoff.md)
