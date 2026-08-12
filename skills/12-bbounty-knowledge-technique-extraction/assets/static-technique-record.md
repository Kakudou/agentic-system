# Static Technique Record

Use one record per bounded concept. This template documents knowledge; it must not contain instructions, payloads, commands, automation, or live-target validation steps.

```yaml
record_id: string
title: string
authorization_reference: string
technique_statement: string
observed_facts:
  - fact: string
    evidence_reference: string
interpretations:
  - statement: string
    evidence_references: [string]
    confidence: low | medium | high
applicability:
  supported_conditions: [string]
  assumptions: [string]
  exclusions: [string]
  counterexamples_or_unknowns: [string]
privacy:
  redaction_status: none | redacted | restricted
  handling_caveats: [string]
limitations: [string]
review_status: documented | reviewed | needs-clarification | stopped
```
