---
name: 12-bbounty-recon-attack-surface-priorisation
description: Synthesize already authorized reconnaissance evidence into a transparent, non-exploitative surface review and handoff.
metadata:
  version: 2.0
  opencode/slash: "true"
---

# Authorized Attack Surface Prioritisation

## Purpose

Organize already authorized reconnaissance evidence into a bounded, transparent order for review. This skill does not discover assets, send requests, automate scoring, estimate vulnerabilities, assess exploitability, or prescribe testing.

## Prerequisites

- Written authorization with exact scope, evidence-handling rules, and stop contact.
- Existing, attributable reconnaissance evidence gathered within that authorization.
- A receiving owner or approved review process for the handoff.

## Workflow

1. Confirm each candidate and source are in scope, admissible, and minimally retained. Use [admissible evidence and scope](references/admissible-evidence-scope.md) and the [scope and stop checklist](assets/scope-stop-checklist.md).
2. Describe only observable surface indicators, separating direct facts from interpretation. Use [transparent surface indicators](references/surface-indicators.md) and the [indicator-confidence matrix](assets/indicator-confidence-matrix.md).
3. Classify support, alternatives, and gaps without converting indicators into security claims. Use [confidence and uncertainty](references/confidence-uncertainty.md).
4. Order review attention using scope relevance, evidence quality, operational ownership, and unresolved ambiguity, not predicted security outcomes. Use [non-exploitative prioritization rationale](references/prioritization-rationale.md) and the [static prioritization worksheet](assets/prioritization-worksheet.md).
5. Recheck material entries, redact sensitive details, record stop decisions, and hand off evidence with limitations and requested decisions. Use [evidence and handoff](references/validation-handoff.md) and the [recon handoff template](assets/recon-handoff-template.md).

## Evidence

- Authorization and scope snapshot.
- Source references, timestamps, collection context, and permitted handling classification.
- Observed indicators, corroboration, alternatives, confidence, and limitations.
- Review order rationale, stop decisions, and follow-up requests.

## Output

```yaml
attack_surface_review:
  authorization_reference: string
  reviewed_at: RFC-3339 timestamp
  entries:
    - asset_or_surface: string
      evidence_references: [string]
      observed_indicators: [string]
      confidence: direct | corroborated | inconclusive
      review_order: now | next | hold
      rationale: string
      limitations: [string]
  handoff_owner: string
  requested_decision: string
```

## Supplemental Resources

- [Admissible evidence and scope](references/admissible-evidence-scope.md)
- [Transparent surface indicators](references/surface-indicators.md)
- [Confidence and uncertainty](references/confidence-uncertainty.md)
- [Non-exploitative prioritization rationale](references/prioritization-rationale.md)
- [Evidence and handoff](references/validation-handoff.md)
- [Static assets](assets/)
