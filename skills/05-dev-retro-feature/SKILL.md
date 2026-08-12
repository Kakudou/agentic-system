---
name: 05-dev-retro-feature
description: "Reverse-engineer existing code into source-grounded BDD feature drafts and constraints. Trace observable entry points, state transitions, failures, side effects, tests, and cross-call invariants; translate implementation vocabulary into domain language; separate implemented behavior from inferred gaps; and emit evidence-linked Gherkin without modifying the repository."
metadata:
  version: 1.0
  opencode/slash: "true"
---

# Retro Feature

Recover the behavior contract that the code currently supports.

The output is **reverse-engineered evidence**, not an approved future specification.

Remain read-only.

## Usage

`/05-dev-retro-feature {scope}`

## Load Order

Always read:

- [Feature recovery](references/feature-recovery.md)
- [Constraint recovery](references/constraint-recovery.md)
- [Gherkin drafting](references/gherkin-drafting.md)

Use [Retro feature schema](assets/retro-feature-schema.yaml).

## Hard Rules

- Never edit source, tests, configuration, or documentation.
- Never invent behavior to make the feature look complete.
- Never convert an implementation gap into an implemented scenario.
- Distinguish `observed`, `inferred`, and `unknown`.
- Every scenario and constraint requires concrete source/test evidence.
- Translate implementation identifiers into domain language before drafting Gherkin.
- Cluster by observable capability, not file layout.
- Recover cross-call invariants, not only single-function happy paths.
- Do not conduct user approval inside this skill.
- Do not claim runtime proof unless runtime evidence was actually supplied; static code inspection is
  source-supported behavior evidence, not execution evidence.

## Workflow

### 1. Bound the Feature Surface

Identify observable entry points relevant to `{scope}`:

- public APIs;
- routes;
- CLI commands;
- event/message consumers;
- scheduled jobs;
- externally visible service methods.

Include enough called/calling code to understand observable outcomes.

### 2. Recover Vocabulary

Build a small implementation → domain vocabulary map from:

- types/enums;
- handler names;
- tests;
- docs;
- user-visible strings;
- domain model names.

Prefer established test/documentation vocabulary when it exists.

### 3. Trace Observable Behavior

For each entry point capture:

- trigger;
- input/precondition;
- successful outcome;
- failure outcomes;
- authorization/validation;
- state mutation;
- external side effects;
- ordering/sequencing.

Record source references.

### 4. Recover Cross-Call Invariants

Perform a second pass for behavior that only appears across operations.

Follow `references/feature-recovery.md`.

### 5. Recover Constraints

Extract constraints that are actually encoded or strongly evidenced.

Examples:

- input/data validity;
- authorization;
- uniqueness;
- boundary/limit;
- sequencing;
- state transition;
- concurrency/idempotency;
- external-side-effect preconditions.

Separately report missing/undefined constraints as gaps.

Follow `references/constraint-recovery.md`.

### 6. Draft Gherkin

Draft only source-supported observable behavior.

Use domain language.

Place source-supported constraint scenarios under:

```text
# ---- Constraints identified ----
```

Do not promote an undefined gap into Gherkin fact.

### 7. Report Coverage Limits

State what was not inspected or could not be determined.

The caller may later use `05-dev-bdd-doctrine` to approve, challenge, and evolve the recovered
behavior.

## Output

Return one `RetroFeature/v1` containing:

- feature candidates;
- vocabulary map;
- observed constraints;
- gap/undefined behavior report;
- Gherkin drafts;
- source coverage limits.
