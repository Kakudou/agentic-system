# Optional Prompt Optimization

Read immediately before the optimization phase.

If a prompt-optimization capability is installed, `98-external-prompt-master` is the preferred local integration. The create-skill capability remains usable without it.

## Purpose

Use an available prompt optimizer to improve instruction clarity, token efficiency, target-agent fit, and prompt structure **after** the candidate skill is semantically complete. When none is available, perform the same checks manually and skip external optimization.

The optimizer is not the authoring authority. The retrospective evidence and approved skill contract remain authoritative.

## Target Selection

When using an optimizer that expects a target AI/tool, resolve it from the candidate skill:

1. If the skill declares a specific runtime/tool, optimize for that runtime.
2. If it declares several compatible agent clients, state that portability across those clients is a hard constraint.
3. If it is intentionally generic Agent Skills content, target an “Agent Skills-compatible AI agent” and forbid tool-specific syntax unless already required by the candidate.

Do not let optimization silently specialize a portable skill to one vendor.

## Per-File Optimization Contract

For each instruction-bearing Markdown file, provide the optimizer with:

- target runtime/tool
- file role (`SKILL.md`, reference, or executable prompt asset)
- intended capability
- semantic invariants that must not change
- request to reduce ambiguity/redundancy while preserving behavior

Optimize one coherent file at a time unless the local optimizer implementation explicitly supports multi-file context without losing boundaries.

## Protected Invariants

Reject any optimized result that changes or removes:

- skill name or dependency names
- required input/output contract
- scope boundaries
- safety/correctness hard rules
- approval/persistence gates
- approval or authority boundary
- completion states
- resource-loading semantics
- user-significant terminology

The optimizer may suggest a better representation. It may not decide that a protected invariant is unnecessary.

## Prompt Assets

Optimize an asset only when the asset is itself a prompt/template whose wording drives model behavior.

Do not run pure schemas, lookup data, static example fixtures, or non-prompt assets through an optimizer merely for stylistic consistency.

## Post-Optimization Diff

For every changed file, check:

- semantic equivalence
- no new capability invented
- no requirement deleted
- no unsupported framework introduced
- no hidden tool-specific assumption
- fewer or equal unnecessary tokens unless extra wording clearly improves correctness

When optimization conflicts with the approved contract, keep the contract.
