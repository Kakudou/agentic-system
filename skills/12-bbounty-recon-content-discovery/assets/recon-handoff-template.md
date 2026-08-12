# Content Reconnaissance Handoff

```yaml
content_recon_handoff:
  authorization_reference: ""
  scope_snapshot: ""
  observed_at: ""
  operator_context: ""
  observations:
    - locator: ""
      discovered_from: ""
      scope_status: in-scope | stopped | needs-review
      permitted_method: ""
      request_count: 0
      content_class: navigation | public-document | static-asset | metadata-signal | unknown
      direct_observation: ""
      evidence_reference: ""
      redaction_or_handling: ""
      alternate_explanations: []
      confidence: observed | corroborated | inconclusive
      limitations: []
  stop_decisions: []
  recommended_owner: ""
  next_step_boundary: "Further validation requires independent authorization."
```
