---
name: 00-agent-retro-prompt
description: Retrospect a completed or inspectable task, feature, artifact, or conversation and reconstruct a better natural-language starting prompt from what actually happened. Use to identify evidence-grounded friction, capture delivered scope and discovered constraints, and score how much the improved prompt would have reduced avoidable rework.
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Retro Prompt

Reconstruct the prompt that would have reached the **delivered outcome** more directly, using only evidence from the work that actually occurred.

This is retrospective analysis, not speculative prompt ideation.

## Usage

- `/00-agent-retro-prompt {source}` — analyze the named completed or inspectable work.
- `/00-agent-retro-prompt` — analyze the current task, conversation, files, or explicitly provided source.

## Hard Rules

- Ground every friction point in an observable event or source artifact.
- Distinguish delivered scope from ideas that were discussed, attempted, deferred, rejected, or unresolved.
- Keep the improved prompt within delivered scope. Do not retroactively ask for work that was not delivered.
- Preserve user-significant requirements and terminology that survived into the delivered result.
- Write the improved prompt as self-contained natural language suitable for a fresh context.
- Do not include internal tool choreography, agent routing, or retrospective narration unless the desired outcome was itself that workflow.
- Do not treat mere effort, exploration, or an unavoidable tool failure as prompt friction.
- Report zero friction honestly when the original ask already contained what successful execution needed.
- Mark material claims `UNVERIFIED` when available evidence cannot establish them.
- Score improvement magnitude, not the quality of the final artifact.

## Resource Loading

- Source selection and reconstruction: [references/reconstruction.md](references/reconstruction.md)
- Friction evidence: [references/evidence-model.md](references/evidence-model.md)
- Improved prompt construction: [references/prompt-rewrite.md](references/prompt-rewrite.md)
- Delta scoring: [references/scoring.md](references/scoring.md)
- Final presentation: [assets/retro-report-template.md](assets/retro-report-template.md)

## Workflow

### 1. Resolve the Source

Use the strongest available evidence for the original intent and the delivered outcome.

At minimum establish:

- the original ask or its best evidence-grounded reconstruction;
- the final delivered or inspectable result;
- enough evidence to distinguish delivered work from proposed work.

If that cannot be reconstructed with reasonable confidence, return `INSUFFICIENT_EVIDENCE` instead of guessing.

### 2. Reconstruct Delivered Scope

Record only what the evidence supports:

- delivered behaviors or capabilities;
- governing constraints;
- edge cases that materially changed the result;
- explicit exclusions;
- corrections and rework triggers;
- unresolved items.

Use the delivered-scope classifications in [references/reconstruction.md](references/reconstruction.md).

### 3. Identify Friction

A friction point exists only when:

1. an observed event shows avoidable ambiguity, missing context, missing boundary, contested assumption, or rework; and
2. information available at the start could plausibly have reduced that cost.

For each retained friction point state:

- what happened;
- the concrete evidence anchor;
- the observed cost;
- the preventive instruction that belonged in the starting prompt;
- confidence.

Prefer a few high-signal points over exhaustive commentary.

### 4. Compose the Improved Prompt

Write the request a fresh agent should have received at the beginning.

It should:

- state the desired outcome directly;
- include only context proven materially useful;
- include boundaries that prevent observed scope drift or rework;
- define success where delivery established a meaningful bar;
- preserve actual delivered scope;
- remain natural user language rather than a pipeline log.

### 5. Score Improvement

Use [references/scoring.md](references/scoring.md).

Score `specificity`, `boundary coverage`, `context clarity`, and `scope discipline` from `0–5`, then give an overall score.

A strong original prompt may correctly produce an overall `0/5`.

### 6. Return the Report

Use [assets/retro-report-template.md](assets/retro-report-template.md).

The report is human-readable evidence. Downstream work should consume its semantic content—source, delivered scope, friction, improved prompt, and score—not rely on a hidden versioned packet schema.

## Completion States

- `COMPLETE` — original ask and delivered outcome were reconstructed; report produced.
- `COMPLETE_NO_FRICTION` — same, with zero evidence-grounded friction points.
- `INSUFFICIENT_EVIDENCE` — the original ask or delivered outcome cannot be reconstructed safely.

Never convert `INSUFFICIENT_EVIDENCE` into a confident improved prompt.
