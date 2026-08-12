# Canonical Retro Packet

Downstream callers may rely on these fields. Keep names stable unless the skill version makes an explicit breaking change.

```yaml
status: COMPLETE | COMPLETE_NO_FRICTION | INSUFFICIENT_EVIDENCE
source: <feature/task/conversation/artifact identifier>
original_prompt: |
  <reconstructed original ask>
delivered_scope:
  - <delivered capability or governing constraint>
friction_points:
  - type: <friction type>
    event: <what actually happened>
    evidence_anchor: <concrete source/event>
    cost: <observed effect>
    preventive_instruction: <what belonged in the starting prompt>
    confidence: high | medium | low
improved_prompt: |
  <fresh-context natural-language prompt>
delta_score:
  specificity: 0
  boundary_coverage: 0
  context_clarity: 0
  scope_discipline: 0
  overall: 0
coaching_tips:
  - <optional event-grounded prompt-writing lesson>
```

For `INSUFFICIENT_EVIDENCE`, `improved_prompt` may be empty and the report must state which evidence is missing. Do not fabricate fields merely to satisfy the schema.
