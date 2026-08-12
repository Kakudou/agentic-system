---
name: 00-agent-create-skill
description: Convert completed work, a resolved task, or a successful conversation into a reusable Agent Skill. Use when the user wants to capture what worked as a skill, derive a skill from the current session, or run the retro-prompt → skill-authoring → prompt-master optimization pipeline. Requires explicit approval before any persistent skill-directory write.
metadata:
  version: 1.0
  opencode/slash: "true"
---

# Agent Create Skill

Turn completed work into a reusable, portable Agent Skill without copying session history into a brittle prompt.

The pipeline is:

`retrospective evidence → reusable procedure → progressive-disclosure package → prompt optimization → validation → one final persistent write`

## Usage

- `/00-agent-create-skill` — derive a skill from the current completed task/conversation.
- `/00-agent-create-skill {source}` — derive a skill from the named feature, task, artifact, or available source context.

## Required Dependencies

- `00-agent-retro-prompt` reconstructs the delivered result and produces the canonical retrospective packet.
- `98-external-prompt-master` optimizes instruction-bearing prompt text after the skill package exists.

Do not duplicate either dependency's internal logic here. Invoke the installed skills.

## Hard Rules

- MUST ground the new skill in completed or demonstrably resolved work. Do not invent a workflow from an unfinished outcome.
- MUST invoke `00-agent-retro-prompt` before authoring the skill.
- MUST check for an existing skill with the same or materially overlapping intent before drafting a new persistent skill.
- MUST stop for user choice when overwrite/extend/new-name intent is ambiguous.
- MUST not persist the draft to the final skills directory before final approval.
- MUST transform observed friction into preventive instructions, invariants, or gotchas; do not preserve retrospective commentary as dead prose.
- MUST preserve delivered scope. Generalize the method, not the feature set.
- MUST design for fresh-context execution: no hidden reliance on this conversation, unstated paths, or remembered decisions.
- MUST use progressive disclosure: keep always-needed orchestration in `SKILL.md`; move conditional detail to focused `references/`; put reusable static templates/resources in `assets/`.
- MUST keep instruction-bearing resources shallow: `SKILL.md` references resource files directly; avoid reference-to-reference dependency chains.
- MUST treat Prompt Master as an optimizer, not an authority to change semantics, scope, safety rules, approval gates, or output contracts.
- MUST validate the optimized package before presenting it for final approval.
- MUST write to the persistent skills directory exactly once, after final approval.
- MUST report inability to invoke a required dependency or write destination instead of pretending the pipeline completed.

## Resource Loading

Read only what the current phase needs:

- Before authoring: [references/skill-specification.md](references/skill-specification.md) and [references/authoring-contract.md](references/authoring-contract.md).
- When an existing or similar skill is found: [references/existing-skill-resolution.md](references/existing-skill-resolution.md).
- When deciding whether content belongs in `SKILL.md`, `references/`, or `assets/`: [references/resource-design.md](references/resource-design.md).
- Before invoking Prompt Master: [references/prompt-master-integration.md](references/prompt-master-integration.md).
- Before final approval: [references/validation.md](references/validation.md).

Use assets only when rendering their corresponding checkpoint/output.

## Workflow

### Phase 1 — Retrospective Contract

1. Resolve the source from the current task/session or the explicitly named source.
2. Invoke `00-agent-retro-prompt` on that source.
3. Require its canonical packet fields:
   - `source`
   - `original_prompt`
   - `delivered_scope`
   - `friction_points`
   - `improved_prompt`
   - `delta_score`
   - `coaching_tips`
4. Reject invented or unsupported friction. If the retro packet marks evidence as insufficient, do not manufacture a skill from it.
5. Inspect the skills directory for exact-name and materially similar intent collisions.
6. If a collision exists, resolve it using [references/existing-skill-resolution.md](references/existing-skill-resolution.md).
7. Present the retrospective checkpoint using [assets/retro-approval-template.md](assets/retro-approval-template.md).
8. Wait for `approve`, requested edits, or `abort`.

### Phase 2 — Author the Candidate Package

After approval:

1. Derive the smallest coherent reusable capability from the improved prompt and delivered scope.
2. Create the candidate in a temporary/workspace location, not the persistent skills directory.
3. Treat `improved_prompt` as source material, not as text to paste verbatim into `SKILL.md`.
4. Convert:
   - repeated successful behavior → procedure/defaults
   - observed friction → preventive rule or gotcha
   - stable project/domain facts needed at runtime → focused reference
   - reusable output/prompt/config skeletons → asset
   - session-only detail → omit
5. Design the activation `description` for both what the skill does and when it should trigger.
6. Keep `SKILL.md` focused on identity, activation-critical constraints, orchestration, and explicit conditional resource-loading instructions.
7. Use [assets/skill-package-skeleton.md](assets/skill-package-skeleton.md) as the structural starting point when useful.

### Phase 3 — Optimize Without Semantic Drift

1. Snapshot the candidate package before optimization.
2. Read [references/prompt-master-integration.md](references/prompt-master-integration.md).
3. Invoke `98-external-prompt-master` on each instruction-bearing Markdown file that benefits from optimization:
   - `SKILL.md`
   - focused `references/*.md`
   - prompt/template assets only when their wording is itself executable prompt content
4. Do not optimize binary/static assets or rewrite data solely for style.
5. Compare optimized output against the pre-optimization snapshot.
6. Restore or reject any optimization that changes:
   - capability scope
   - hard constraints
   - dependency names
   - approval gates
   - output schemas/contracts
   - user-authored terminology that is semantically significant
   - progressive-disclosure boundaries without a clear benefit

### Phase 4 — Validate and Approve

1. Run the checks in [references/validation.md](references/validation.md).
2. If `skills-ref` is available, run `skills-ref validate ./<skill-name>` and resolve failures before approval.
3. Present the optimized candidate using [assets/final-approval-template.md](assets/final-approval-template.md).
4. Wait for `approve`, requested edits, or `abort`.
5. On final approval only, write/move the complete package into the persistent skills directory.
6. Confirm the final path and summarize created resources. Do not claim a write that did not occur.

## Completion States

- `CREATED` — final package validated, approved, and persisted.
- `DRAFTED` — candidate exists but final approval is pending.
- `EDIT_REQUESTED` — user requested changes; remain outside persistent destination.
- `ABORTED` — user cancelled.
- `BLOCKED` — required evidence, dependency, validation capability, or write access is unavailable.

`DRAFTED` and `BLOCKED` are not `CREATED`.
