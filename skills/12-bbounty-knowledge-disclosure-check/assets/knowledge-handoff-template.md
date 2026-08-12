# Knowledge Handoff Template

Use for a reviewed, minimum-necessary disclosure-status record. This handoff documents status and uncertainty; it does not authorize submission, publication, access, or follow-up testing.

```yaml
handoff_id: string
record_id: string
recipient: string
approved_destination: string
authorization_reference: string
status_summary: string
source_references: [string]
similarity_and_attribution_limits: [string]
confidence: low | medium | high
handling: cleared | redacted | embargoed | restricted
validation:
  reviewer_role: string
  reviewed_at: date
  disposition: reviewed | needs-clarification | stopped
limitations_and_open_questions: [string]
```
