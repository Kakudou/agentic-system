---
name: 12-bbounty-findings-severity-assessment
description: Assess the evidence-supported impact and uncertainty of an authorized finding for review without assigning a preset severity, reward, or exploit claim.
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Evidence-Led Severity Assessment

## Purpose

Prepare a bounded, reviewable severity assessment from already collected, authorized finding evidence. It distinguishes observed impact from likelihood and uncertainty, and applies program policy only when that policy is supplied. It does not contact targets, reproduce a finding, calculate scores, assign a fixed severity, determine eligibility, or predict rewards.

## Scope And Prerequisites

- Current written authorization, program scope, handling restrictions, and escalation contact.
- A validated finding packet with attributable evidence, collection context, and time.
- Any platform policy or scoring framework to be used, if supplied by the program or recipient.
- A named authorized reviewer and approved handoff channel.

## Workflow

1. Admit only in-scope, traceable material; stop for missing authority, provenance, or safe handling. Read [admissible evidence and scope](references/admissible-evidence-scope.md) and complete the [policy and stop checklist](assets/policy-stop-checklist.md).
2. Record supported effects across affected people, data, integrity, availability, and business or safety context without inferring an outcome. Use [impact dimensions](references/impact-dimensions.md) and the [impact-evidence worksheet](assets/impact-evidence-worksheet.md).
3. Keep observed prerequisites, reliability, reach, and constraints separate from impact. Classify unsupported links as uncertainty, not likelihood. Use [likelihood and uncertainty controls](references/uncertainty-controls.md) and the [confidence and claim matrix](assets/confidence-claim-matrix.md).
4. Map evidence to a platform policy or CVSS/OWASP framework only when its exact version and applicable rules are supplied. Use [platform-policy interpretation](references/platform-policy-interpretation.md); do not substitute generic mappings or payout expectations.
5. Independently recheck every material claim, redact unnecessary sensitive content, and prepare a decision-ready packet. Read [claim review and handoff](references/validation-handoff.md) and use the [severity handoff template](assets/severity-handoff-template.md).

## Evidence

- Authorization, scope, policy version, and evidence-handling references.
- Evidence IDs, source locators, observation times, collection context, and redaction status.
- Per-dimension observed effects, affected parties or assets, constraints, alternatives, and unknowns.
- Separate confidence for each claim and a policy-mapping rationale when one was supplied.
- Review decision, stop conditions, and recipient handoff.

## Output

```yaml
severity_assessment:
  finding_id: string
  authorization_reference: string
  assessed_at: RFC-3339 timestamp
  policy_reference: string | not_supplied
  supported_impact_dimensions:
    - dimension: string
      evidence_references: [string]
      observation: string
      limitations: [string]
  claim_assessment:
    - claim: string
      basis: observed | bounded_inference | unsupported
      confidence: direct | corroborated | inconclusive
      alternatives: [string]
  framework_mapping: string | not_performed
  review_decision: hand_off | hold | close
  authorized_review_recipient: string
  requested_decision: string
```

## Supplemental Resources

- [Admissible evidence and scope](references/admissible-evidence-scope.md)
- [Impact dimensions](references/impact-dimensions.md)
- [Likelihood and uncertainty controls](references/uncertainty-controls.md)
- [Platform-policy interpretation](references/platform-policy-interpretation.md)
- [Claim review and handoff](references/validation-handoff.md)
- [CVSS reference notes](references/cvss.md)
- [Impact-evidence worksheet](assets/impact-evidence-worksheet.md)
- [Confidence and claim matrix](assets/confidence-claim-matrix.md)
- [Policy and stop checklist](assets/policy-stop-checklist.md)
- [Severity handoff template](assets/severity-handoff-template.md)
