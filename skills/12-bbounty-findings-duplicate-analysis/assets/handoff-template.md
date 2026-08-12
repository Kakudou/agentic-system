# Duplicate Analysis Handoff

```yaml
duplicate_analysis_handoff:
  comparison_id: string
  authorization_reference: string
  duplicate_policy_reference: string
  findings_compared:
    - finding_id: string
      evidence_references: [string]
      observation_context: string
  comparison_boundary: string
  dimension_results:
    - dimension: asset-and-route | authorization-boundary | observed-behavior | input-or-precondition | time-and-environment | security-property | bounded-consequence
      result: match | difference | unknown | incomparable
      evidence_references: [string]
      limitations: [string]
  symptom_relationship: same-symptom | different-symptom | unknown
  shared_condition_status: direct-evidence | unconfirmed | not-supported
  conflicts_and_alternatives: [string]
  confidence: high | medium | low
  outcome: possible-duplicate-for-review | keep-separate | inconclusive
  privacy_and_handling: string
  unanswered_questions:
    - question: string
      authorized_owner: string
  recipient: string
  approved_channel: string
```

The outcome is a bounded comparison result, not a decision to merge, accept, prioritize, remediate, or disclose.
