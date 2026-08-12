# Static Retrieval Record

Use one record per bounded historical statement. This template documents supplied material only; it must not contain search instructions, queries, payloads, automation, or live-target validation steps.

```yaml
record_id: string
authorization_reference: string
corpus_scope_reference: string
historical_statement: string
sources:
  - source_reference: string
    source_date: date | unknown
    provenance_status: verified | partial | unknown | restricted
    access_status: authorized | limited | unavailable
    observed_fact: string
relevance_question: string
relevance: supported | conditional | unsupported | unknown
material_differences: [string]
uncertainties: [string]
confidence: low | medium | high
privacy:
  redaction_status: none | redacted | restricted | stopped
  handling_caveats: [string]
limitations: [string]
review_status: documented | reviewed | needs-clarification | stopped
```
