---
name: 00-agent-create-skill
description: Convert completed or demonstrably resolved work into a reusable Agent Skill. Use when the user wants to capture a successful procedure as a portable skill. Retrospect the delivered outcome, check for overlapping skills, author a progressive-disclosure package, optionally optimize instruction text, validate it, and require explicit approval before the final persistent write.
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Create Agent Skill

Turn completed work into a reusable, portable Agent Skill without copying session history into a brittle prompt.

The workflow is:

`retrospective evidence → reusable procedure → progressive disclosure → optional prompt optimization → validation → approval → persistent write`

## Usage

- `/00-agent-create-skill` — derive a skill from the current completed work.
- `/00-agent-create-skill {source}` — derive a skill from the named completed task, artifact, or available source context.

## Optional Integrations

- If `00-agent-retro-prompt` is available, it may provide the evidence-grounded retrospective checkpoint.
- If `98-external-prompt-master` is available, it may optimize instruction-bearing prose after the capability contract is already correct.

Neither integration is required for this skill's core capability. When absent, perform the equivalent semantic step locally using this skill's references. Never depend on either integration's internal schemas or implementation fields.

## Hard Rules

- Ground the skill in completed or demonstrably resolved work. Do not invent a reusable procedure from an unfinished outcome.
- Run a retrospective before authoring.
- Check for an existing skill with the same or materially overlapping intent.
- Stop for user choice when overwrite, extend, or new-name intent is ambiguous.
- Do not persist a candidate to the final skills directory before final approval.
- Convert observed friction into preventive instructions, invariants, or gotchas; do not preserve retrospective commentary as dead prose.
- Preserve delivered scope. Generalize the method, not the feature set.
- Design for fresh-context execution: no hidden dependence on this conversation, host-specific routing, unstated paths, or remembered decisions.
- Keep the skill portable: describe the capability, not host-specific orchestration.
- Use progressive disclosure: always-needed procedure in `SKILL.md`, conditional detail in focused `references/`, reusable static material in `assets/`, deterministic executable helpers in `scripts/` only when code is justified.
- Keep resource links shallow and directly reachable from `SKILL.md`.
- Treat prompt optimization as wording optimization, never authority to alter semantics, safety, scope, approval gates, or portable interfaces.
- Validate the complete package before final approval.
- Write to the persistent destination only after approval and report only writes that actually occurred.

## Resource Loading

- Agent Skills rules: [references/skill-specification.md](references/skill-specification.md)
- Translation from retrospective to capability: [references/authoring-contract.md](references/authoring-contract.md)
- Existing-skill collisions: [references/existing-skill-resolution.md](references/existing-skill-resolution.md)
- Resource placement: [references/resource-design.md](references/resource-design.md)
- Prompt optimization: [references/prompt-master-integration.md](references/prompt-master-integration.md)
- Final validation: [references/validation.md](references/validation.md)

Use assets only for the checkpoint they represent.

## Workflow

### 1. Retrospect the Delivered Work

1. Resolve the source.
2. Build an evidence-grounded retrospective. If `00-agent-retro-prompt` is installed, it may be used; otherwise reconstruct the same semantic evidence directly from the source and completed work.
3. Require enough semantic evidence to identify:
   - source and original intent;
   - delivered scope and governing constraints;
   - evidence-grounded friction, if any;
   - improved fresh-context prompt;
   - improvement magnitude.
4. If evidence is insufficient, stop. Do not manufacture a skill.
5. Check the installed skill set for exact-name and materially similar intent collisions.
6. Resolve collisions using [references/existing-skill-resolution.md](references/existing-skill-resolution.md).
7. Present the retrospective checkpoint using [assets/retro-approval-template.md](assets/retro-approval-template.md).
8. Continue only after approval.

### 2. Author the Candidate Package

1. Derive the smallest coherent reusable capability from delivered scope and the improved prompt.
2. Draft in a temporary/workspace location rather than the persistent skills directory.
3. Treat the improved prompt as source material, not text to paste verbatim.
4. Translate:
   - repeated successful behavior → workflow/default;
   - observed friction → preventive rule/gotcha;
   - stable runtime/domain facts genuinely needed by the capability → focused reference;
   - reusable templates/resources → asset;
   - session-only detail → omit.
5. Write an activation description that says both what the capability does and when to use it.
6. Apply the portability check: no host-specific role routing, hidden orchestration state, or pipeline-only handoff variables.
7. Use [assets/skill-package-skeleton.md](assets/skill-package-skeleton.md) when useful.

### 3. Optimize Without Semantic Drift

1. Snapshot the candidate.
2. Read [references/prompt-master-integration.md](references/prompt-master-integration.md).
3. When `98-external-prompt-master` or an equivalent prompt optimizer is available, use it only on instruction-bearing text that benefits from it. Otherwise perform a local clarity/redundancy pass and continue; optimization is not a blocking dependency.
4. Do not optimize binary/static data merely for prose style.
5. Compare the result with the snapshot.
6. Reject any optimization that changes capability scope, safety, required dependencies, approval boundaries, portable interfaces, or significant user terminology.

### 4. Validate and Approve

1. Run [references/validation.md](references/validation.md).
2. If `skills-ref` is available, run `skills-ref validate ./<skill-name>` and resolve its failures.
3. Present the candidate using [assets/final-approval-template.md](assets/final-approval-template.md).
4. Continue only after final approval.
5. Write or move the complete package to the persistent skills directory.
6. Confirm the final path and resources actually created.

## Completion

Use plain completion language:

- created and persisted;
- drafted, awaiting approval;
- edits requested;
- aborted;
- blocked by missing evidence, dependency, validation, or write access.

Do not invent a machine-state envelope unless the host actually requires one.
