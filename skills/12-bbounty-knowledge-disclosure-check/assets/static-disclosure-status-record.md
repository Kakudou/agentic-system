# Static Disclosure-Status Record

Use one record per bounded subject. Document only admitted, supplied material. Do not include queries, retrieval instructions, comparison automation, exploit material, or testing steps.

```yaml
record_id: string
authorization_reference: string
scope_reference: string
subject_label: string
status: publicly_disclosed | publicly_unconfirmed | not_publicly_documented | unknown | restricted | stopped
sources:
  - source_reference: string
    source_owner_or_publisher: string | unknown
    source_date: date | unknown
    provenance: verified | partial | unknown | restricted
    public_access: public | supplied-private-summary | unavailable
    observed_status_fact: string
similarity_observations: [string]
material_differences: [string]
attribution: supported | partial | unknown | withheld
confidence: low | medium | high
limitations: [string]
handling: cleared | redacted | embargoed | restricted | stopped
validation_status: documented | reviewed | needs-clarification | stopped
```
