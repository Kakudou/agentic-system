# Request-Contract Evidence Template

```yaml
evidence_id: string
authorization_reference: string
timestamp_utc: RFC-3339 timestamp
environment_and_api_version: string
operation: method and documented path template
contract_source: document section or specification operation identifier
approved_role_label: string
approved_test_object_label: string
expected_policy_result: string
baseline:
  redacted_request_metadata: method, path template, media type, documented field names only
  response: status and response category
variation:
  single_documented_contract_difference: string
  redacted_request_metadata: method, path template, media type, documented field names only
  response: status and response category
observed_test_object_state: unchanged | reversible change | not observed
result: verified | inconclusive | expected_behavior
false_positive_checks: [string]
stop_event: none | string
redactions_applied: [string]
```

Do not include tokens, cookies, full bodies, personal data, or non-test object identifiers.
