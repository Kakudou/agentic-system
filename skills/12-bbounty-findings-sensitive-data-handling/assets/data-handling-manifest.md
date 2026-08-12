# Data-Handling Manifest

```yaml
finding_id: string
authorization_reference: string
scope_reference: string
observation_window: RFC-3339 interval
artifact_id: string
artifact_form: restricted-original | reviewed-redacted-derivative | metadata-only
classification: public | internal | confidential | restricted
admission_decision: admitted | metadata-only | stopped
necessity_for_supported_fact: string
excluded_content_or_views: [string]
provenance: string
integrity_identifier: string | unavailable-with-reason
approved_recipient_or_channel: string
retention_disposition: string
access_boundary: string
reviewer_or_decision_owner: string
limitations: [string]
```

Do not include sensitive values, secret material, personal data, or storage locations.
