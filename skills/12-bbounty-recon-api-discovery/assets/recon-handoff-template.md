# API Reconnaissance Handoff

```yaml
authorization_reference: ""
observer: ""
observed_at: ""
scope:
  approved_targets: []
  approved_sources: []
  rate_limit: ""
observations:
  - endpoint_or_service: ""
    operation: ""
    source: documented | client-observed
    source_locator: ""
    protocol: http-api | graphql | grpc | other | unconfirmed
    version: ""
    contract_observations: []
    confidence: direct | corroborated | inconclusive
    evidence_references: []
    confounders: []
    limitations: []
stop_or_escalation: ""
requested_follow_up: ""
receiving_owner: ""
```
