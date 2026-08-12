---
name: 00-agent-retro-prompt
description: Retrospect a completed or inspectable task, feature, pipeline, artifact, or conversation and reconstruct a better natural-language starting prompt from what actually happened. Use to identify evidence-grounded friction, capture delivered scope and discovered constraints, score the improvement opportunity, or feed a downstream skill-authoring workflow.
metadata:
  version: 1.0
  opencode/slash: "true"
---

# Agent - Retro Prompt

Reconstruct the prompt that would have reached the **delivered outcome** more directly, using only evidence from the work that actually occurred.

This is retrospective analysis, not speculative prompt ideation.

## Usage

- `/00-agent-retro-prompt {feature-name}` — analyze an available feature/pipeline by name.
- `/00-agent-retro-prompt` — analyze the current task, conversation, files, or explicitly provided source.

## Hard Rules

- MUST ground every friction point in an observable event or source artifact. Never invent friction to make the retrospective look useful.
- MUST distinguish **delivered scope** from ideas that were discussed, attempted, deferred, or never completed.
- MUST keep the improved prompt within delivered scope. Do not retroactively ask for work that was not delivered.
- MUST preserve user-significant requirements and terminology that survived into the delivered result.
- MUST write the improved prompt as self-contained natural language suitable for a fresh context.
- MUST NOT include pipeline commands, stage numbers, internal tool choreography, or retrospective narration in the improved prompt unless the user's actual desired outcome was itself a workflow using those constructs.
- MUST NOT treat mere effort, tool failure, or exploration as prompt friction unless a better starting prompt could reasonably have prevented or reduced it.
- MUST report zero friction honestly when the original ask already contained what the successful execution needed.
- MUST label material facts as `UNVERIFIED` when the available source cannot establish them.
- MUST score **improvement magnitude**, not reward the original prompt for already being good.
- MAY be invoked before formal pipeline closure if the available evidence is sufficient to reconstruct an outcome.

## Resource Loading

- For source selection and reconstruction: [references/reconstruction.md](references/reconstruction.md).
- When deciding whether an event qualifies as friction and how to cite it: [references/evidence-model.md](references/evidence-model.md).
- Before writing the improved prompt: [references/prompt-rewrite.md](references/prompt-rewrite.md).
- Before scoring: [references/scoring.md](references/scoring.md).
- Use [assets/retro-report-template.md](assets/retro-report-template.md) for the final report.
- Use [assets/retro-packet-schema.md](assets/retro-packet-schema.md) as the canonical field contract for downstream callers such as `00-agent-create-skill`.

## Workflow

### 1. Resolve the Source

Choose the strongest available evidence source.

- **Feature-scoped:** inspect the named feature/specification, relevant decisions, implementation/test evidence, and completion records when available.
- **Standalone:** inspect the current conversation/task, attached files, artifacts, and any explicitly stated original request.

Identify at minimum:

- original ask
- final delivered result or current inspectable result
- evidence sufficient to distinguish delivered work from proposed work

If the original ask or outcome cannot be reconstructed with reasonable confidence, return `INSUFFICIENT_EVIDENCE` instead of guessing.

### 2. Reconstruct Delivered Scope

Build a compact factual reconstruction:

- behaviors/capabilities delivered
- constraints discovered or confirmed
- edge cases that materially changed the result
- explicit exclusions or suppressed scope
- corrections/rework and their triggers
- unresolved items that remained unresolved

Do not count an idea as delivered merely because it appeared in discussion.

### 3. Identify Friction

A friction point exists only when:

1. an actual event shows avoidable ambiguity, missing context, missing boundary, contested assumption, or rework; and
2. putting information into the original prompt would plausibly have reduced that cost.

For each friction point capture:

- `type`
- `event`
- `evidence_anchor`
- `cost`
- `preventive_instruction`
- `confidence`

Prefer a few high-signal friction points over exhaustive commentary.

### 4. Compose the Improved Prompt

Write the prompt a fresh agent should have received at the beginning.

It should:

- state the desired outcome directly
- include only context proven necessary by the retrospective
- include constraints/boundaries that prevented observed friction
- define success where the delivered result established a meaningful bar
- preserve actual delivered scope
- remain natural language rather than a replay of the implementation process

Do not explain why each sentence was added inside the improved prompt.

### 5. Score Improvement Magnitude

Use [references/scoring.md](references/scoring.md).

Score each dimension from `0–5`, where `0` means the improved prompt offers no meaningful gain over the original on that dimension and `5` means it removes substantial avoidable ambiguity/friction.

Dimensions:

- `specificity`
- `boundary_coverage`
- `context_clarity`
- `scope_discipline`
- `overall`

A clean run may legitimately score near zero because little improvement was needed.

### 6. Return the Canonical Report

Render [assets/retro-report-template.md](assets/retro-report-template.md) and ensure every field required by [assets/retro-packet-schema.md](assets/retro-packet-schema.md) can be recovered unambiguously.

If feature-scoped and an append-only logging mechanism is available, append:

`retro-prompt.completed friction_points={n} overall_delta={n}`

Do not fail the retrospective solely because logging is unavailable.

## Completion States

- `COMPLETE` — original ask and delivered outcome were reconstructed; report produced.
- `COMPLETE_NO_FRICTION` — same, with zero evidence-grounded friction points.
- `INSUFFICIENT_EVIDENCE` — cannot safely reconstruct the original ask or delivered outcome.

Never convert `INSUFFICIENT_EVIDENCE` into a confident improved prompt.
