---
name: 05-dev-bdd-doctrine
description: "Apply a six-phase BDD delivery doctrine to behavior-changing development: define observable behavior, challenge traps, prove RED, implement minimal GREEN, refactor without changing behavior, and close with independent quality evidence. Scale ceremony to the task while preserving the evidence gates."
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# BDD Delivery Doctrine

Use this methodology for behavior-changing development.

```text
behavior contract
      ↓
trap analysis
      ↓
RED evidence
      ↓
minimal GREEN
      ↓
behavior-preserving refactor
      ↓
independent quality closure
```

Discipline scales with the task. Ceremony does not.

## Usage

`/05-dev-bdd-doctrine {development-task}`

## Load Order

Always read:

- [six phases](references/phases.md)
- [evidence gates](references/evidence-gates.md)

When behavior definition or trap analysis is required, also read:

- [Gherkin and trap rules](references/gherkin-and-traps.md)

## Scale the Doctrine

| Change class | Minimum discipline |
|---|---|
| mechanical/trivial | focused RED → GREEN → optional behavior-preserving cleanup |
| meaningful behavior change | all six phases |
| major/high-risk change | all six phases plus stronger requirements definition and independent review |

Do not manufacture Gherkin, a new test framework, or a giant plan for a truly mechanical edit when an existing repository convention provides an equivalent executable contract.

Meaningful public behavior changes use the full sequence.

## Non-Negotiable Invariants

- Never implement before actual behavioral RED evidence.
- Generated tests or expected failure are not RED evidence.
- Never refactor before actual GREEN evidence.
- Never weaken an approved behavior assertion to obtain GREEN.
- Never silently add behavior not demanded by the accepted contract/tests.
- Never implement gold plating silently.
- Refactor is behavior-preserving.
- Quality closure requires observed evidence, not source inspection alone.

## Phase Ownership Is External

This skill defines the method, not who performs each phase.

Requirements, planning, execution, challenge, validation, and presentation may be performed by different actors. This methodology deliberately leaves those assignments unspecified.

## Gold Plating

When implementation reveals useful work not required by the accepted behavior:

1. suppress it from GREEN;
2. record the concrete item and why it is outside scope;
3. surface it separately as possible future work.

## Completion

The doctrine closes only when:

- every required phase occurred in order;
- RED and GREEN are backed by actual distinct execution evidence;
- behavior-preserving refactors retained GREEN;
- applicable quality evidence exists;
- an independent closure judgment accepts the evidence.

Documentation or decision/law records are not automatic extra phases unless the accepted delivery contract explicitly requires them.
