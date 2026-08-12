# Static Artifact Exposure Manifest

Use for one already observed artifact. This is a reporting record, not a discovery inventory.

```yaml
artifact_exposure_manifest:
  authorization_reference: ""
  reporting_channel: ""
  observation_time_utc: ""
  approved_method: "passive-public-observation | approved-low-impact-check"
  target:
    stated_name: ""
    ownership_status: "confirmed | unconfirmed | conflicting"
    ownership_basis: ""
  artifact:
    locator_redacted: ""
    delivery_context: ""
    classification: ""
    visible_metadata_summary: ""
  boundary:
    expected_public_boundary: ""
    observed_boundary: ""
  handling:
    sensitive_data_stop: false
    redaction_applied: ""
  assessment:
    confidence: "low | medium | high"
    alternative_explanations: ""
    owner_confirmation_status: "awaiting-owner-review"
```

Never enter artifact content, secrets, personal data, credentials, internal paths, or access instructions.
