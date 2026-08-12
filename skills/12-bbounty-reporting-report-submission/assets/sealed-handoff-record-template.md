# Sealed Handoff and Record Template

```yaml
submission_handoff:
  package_id: string
  finding_id: string
  readiness: ready-for-human-submission | not-ready | stopped
  authorization_reference: string
  scope_reference: string
  report_version_reference: string
  evidence_references: [string]
  policy_rule_references: [string]
  policy_format_review: passed | blockers-present | unavailable
  redaction_decisions: [string]
  final_authorization: granted | pending | denied
  approved_human_submitter: string
  permitted_channel: string
  blockers: [string]
  limitations: [string]
  external_action_performed: false
  post_submission:
    status: not-provided | reported-not-verified
    supplied_by: string | none
    supplied_at: RFC-3339 timestamp | none
    permitted_receipt_reference: string | none
    retention_owner: string | none
```

This record is a handoff and evidence ledger. It does not authorize submission or prove external delivery.
