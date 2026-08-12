# Remediation Lookup

| Observation | Preferred remediation | Validation evidence |
|---|---|---|
| Response variation omitted from key | Include approved dimension in key or remove shared caching | Fixture variants partition as configured |
| Normalization differs by layer | Canonicalize/reject before cache lookup | Edge and origin logs agree |
| Dynamic response is publicly cacheable | Set private/no-store policy and remove edge override | No shared fixture storage |
| Layer ownership unclear | Define cache policy and invalidation owner | Approved runbook and telemetry |
