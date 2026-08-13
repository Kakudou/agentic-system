# Finding Validation Handoff

```yaml
finding_validation:
  finding_id: ""
  recipient: ""
  authorization_reference: ""
  asset_boundary: ""
  claim: ""
  decision: confirmed | needs-review | known-behavior | duplicate | unsupported
  admitted_evidence:
    - reference: ""
      supports: ""
      limitation: ""
  baseline_comparison: ""
  known_behavior_or_duplicate_review:
    record_reference: ""
    decision_basis: ""
  root_cause_assessment:
    status: supported | hypothesis | not-assessed
    evidence_references: []
    alternatives: []
  confidence:
    observation: low | medium | high
    inference: low | medium | high
    basis: ""
  uncertainties: []
  scope_limits: []
  evidence_that_could_change_decision: []
  required_decision: ""
```

Attach evidence references or approved redactions only. Do not include payloads, credentials, unnecessary sensitive content, or unverified conclusions.
