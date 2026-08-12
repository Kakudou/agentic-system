# Severity Assessment Handoff

```yaml
severity_assessment_handoff:
  finding_id: ""
  recipient: ""
  authorization_reference: ""
  scope_status: in_scope | unclear | stopped
  evidence:
    admitted: []
    excluded_or_redacted: []
  supported_impact:
    - dimension: ""
      observation: ""
      evidence_references: []
      limitations: []
  claims:
    - statement: ""
      basis: observed | bounded_inference | unsupported
      confidence: direct | corroborated | inconclusive
      alternatives: []
  policy_mapping:
    status: supplied_and_mapped | not_supplied | blocked
    policy_reference: ""
    relevant_sections: []
    limitations: []
  stop_events: []
  requested_decision: ""
  handling_notes: ""
```

This handoff records evidence and unresolved decisions. It does not assert severity, acceptance, eligibility, or reward.
