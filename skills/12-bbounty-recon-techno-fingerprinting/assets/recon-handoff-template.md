# Recon Handoff Template

```yaml
recon_handoff:
  target: ""
  scope_reference: ""
  collected_at_utc: ""
  original_limits: ""
  observations:
    - hypothesis: ""
      layer: "transport-server|client-framework|infrastructure-edge"
      confidence: "high|moderate|low|unknown"
      evidence_references: []
      alternatives: []
      limitations: ""
  conflicts_or_gaps: []
  excluded_actions: []
  recipient_next_step: "Review authorization and corroborate only with separately permitted methods."
  sensitive_data_handling: ""
```

The receiving owner must independently confirm scope and authorization. This template conveys observations, not a technology guarantee, finding, or permission for active testing.
