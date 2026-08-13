---
name: 05-dev-retro-feature
description: "Reverse-engineer existing code into source-grounded BDD feature drafts and constraints. Trace observable entry points, state transitions, failures, side effects, tests, and cross-call invariants; translate implementation vocabulary into domain language; separate implemented behavior from inferred gaps; and emit evidence-linked Gherkin without modifying the repository."
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Retro Feature

Recover the behavior contract that existing code currently supports.

The result is **reverse-engineered evidence**, not an approved future specification.

Remain read-only.

## Usage

`/05-dev-retro-feature {scope}`

## Load Order

Always read:

- [feature recovery](references/feature-recovery.md)
- [constraint recovery](references/constraint-recovery.md)
- [Gherkin drafting](references/gherkin-drafting.md)

## Hard Rules

- Never edit source, tests, configuration, or documentation.
- Never invent behavior to make a feature look complete.
- Never convert an implementation gap into an implemented scenario.
- Distinguish observed, inferred, and unknown behavior.
- Every scenario/constraint requires concrete source or test evidence.
- Translate implementation identifiers into domain language before drafting Gherkin.
- Cluster by observable capability, not file layout.
- Recover cross-call invariants, not only single-function happy paths.
- Do not conduct requirement approval inside this skill.
- Static inspection is source-supported behavior evidence, not runtime execution proof.

## Workflow

### 1. Bound the Feature Surface

Identify observable entry points relevant to scope: public APIs, routes, CLI commands, consumers, scheduled jobs, or externally visible service methods.

Read enough called/calling code to understand observable outcomes.

### 2. Recover Vocabulary

Build a small implementation-to-domain vocabulary map from types/enums, handler names, tests, docs, user-visible strings, and domain model names.

Prefer established test/documentation vocabulary when available.

### 3. Trace Observable Behavior

For each entry point capture:

- trigger;
- input/precondition;
- successful outcome;
- failure outcomes;
- authorization/validation;
- state mutation;
- external side effects;
- ordering/sequencing;
- source references.

### 4. Recover Cross-Call Invariants

Perform the mandatory second pass in [feature recovery](references/feature-recovery.md) for shared state, accumulators, probabilistic selection, and sequencing relationships.

### 5. Recover Constraints and Gaps

Use [constraint recovery](references/constraint-recovery.md).

Separate constraints actually encoded by the implementation from undefined/missing behavior.

### 6. Draft Gherkin

Use [Gherkin drafting](references/gherkin-drafting.md).

Draft only source-supported observable behavior in domain language.

Place source-supported constraint scenarios under:

```text
# ---- Constraints identified ----
```

Undefined behavior stays in the gap report.

### 7. Report Coverage Limits

State what was not inspected or could not be determined.

## Output

Return a human-readable recovery report containing:

- vocabulary map;
- feature candidates and evidence;
- observed constraints;
- gaps/undefined behavior and evidence;
- draft Gherkin features;
- confidence and source references;
- coverage limits.

Do not require a versioned schema or downstream workflow token. A later BDD process can consume these semantics directly.
