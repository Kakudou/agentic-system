---
name: 12-bbounty-methodology
description: Authorization-first bug-bounty methodology orchestrator. Selects an engagement mode, admits scope and rules, and gates recon, hunting, validation, and reporting handoffs.
metadata:
  version: 2.0
  opencode/slash: "true"
---

# Bug Bounty Methodology

## Purpose

Coordinate authorized vulnerability research from engagement admission through a defensible report. This skill decides phase entry, handoffs, and stop conditions; focused sub-skills own their specialist work.

## Prerequisites

- A named target and a legitimate authorization basis.
- For a contractual engagement, current program scope and rules.
- For an independent engagement, written owner authorization that defines scope, permitted activity, and reporting contact.

## Decision Flow

1. Select an [engagement mode](references/engagement-modes-and-authorization.md). Contractual programs follow their published terms; independent work requires explicit authorization. Do not begin when authorization is absent, expired, ambiguous, or contradictory.
2. Admit the target using [scope and rules admission](references/scope-and-rules-admission.md). Record allowed assets, restrictions, safe-harbor terms, data handling, and stop triggers before any target interaction.
3. Hand authorized, in-scope assets to recon. Use the [recon-to-hunting handoff](references/recon-to-hunting-handoff.md) to decide whether the evidence supports a bounded hunting hypothesis. Recon remains an input to prioritization, not permission to test newly discovered assets.
4. Route only admitted hypotheses to the applicable specialist skill. Recheck scope whenever activity, asset ownership, impact, or testing method changes. Stop rather than escalate uncertainty.
5. Route suspected findings through the [finding-to-report handoff](references/finding-to-report-handoff.md). A report requires reproducible, minimally sufficient, safely handled evidence, not merely an observation.
6. Use [validation](references/validation.md) for independent decision checks and [uncertainty and ethics](references/uncertainty-and-ethics.md) whenever rules, ownership, safety, or impact are unclear.

## Phase Handoffs

- Admission -> Recon: authorization and scope are recorded; restrictions are actionable.
- Recon -> Hunting: an in-scope asset, evidence-grounded hypothesis, and safe test boundary are present.
- Hunting -> Finding: the observation is preserved without unnecessary impact or data collection.
- Finding -> Reporting: validation, evidence handling, and disclosure route are complete.
- Any phase -> Stop: scope change, authorization failure, unsafe impact, sensitive-data exposure, or unresolved uncertainty.

Use the [phase and handoff matrix](assets/phase-handoff-matrix.md), [scope and stop checklist](assets/scope-stop-checklist.md), [engagement decision worksheet](assets/engagement-decision-worksheet.md), and [evidence lifecycle template](assets/evidence-lifecycle-template.md) to record decisions.

## Evidence

Maintain the authorization source, scope/rules version, asset admission decision, phase handoff evidence, validation result, and evidence custody/redaction record. Preserve only the minimum information needed to support coordinated disclosure.

## Output

```yaml
methodology:
  engagement_mode: contractual | independent-authorized
  authorization_status: admitted | blocked | stopped
  current_phase: admission | recon | hunting | finding | reporting
  scope_basis: string
  handoff_decision: proceed | hold | stop
  evidence_refs: [string]
  next_owner: string
```

## Reference Index

- [Engagement modes and authorization](references/engagement-modes-and-authorization.md)
- [Scope and rules admission](references/scope-and-rules-admission.md)
- [Recon-to-hunting handoff](references/recon-to-hunting-handoff.md)
- [Finding-to-report handoff](references/finding-to-report-handoff.md)
- [Uncertainty and ethics](references/uncertainty-and-ethics.md)
- [Validation](references/validation.md)
