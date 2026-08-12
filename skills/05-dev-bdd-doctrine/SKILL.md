---
name: 05-dev-bdd-doctrine
description: "Apply Kakudou's BDD delivery doctrine to behavior-changing development: scale the six-phase Gherkin, trap-analysis, RED, GREEN, refactor, and quality sequence to the task; require real test evidence at RED/GREEN gates; suppress gold plating; and preserve explicit user approval where behavior or constraints are being defined."
metadata:
  version: 1.0
  opencode/slash: "true'
---

# BDD Delivery Doctrine

This skill is the development methodology.

Kakugyō loads it **before** decomposing behavior-changing development work.

The doctrine is:

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

- [Six phases](references/phases.md)
- [Evidence gates](references/evidence-gates.md)

When Phase 1 or 2 is required, also read:

- [Gherkin and trap rules](references/gherkin-and-traps.md)

## Scale the Doctrine

Kakugyō classifies the task before planning:

| Class | Required sequence |
|---|---|
| mechanical / trivial | `RED → GREEN → refactor` |
| standard behavior change | all six phases |
| major / high-risk change | all six phases plus requirements and independent-validation bracket |

A mechanical edit may use a very small RED/GREEN proof.

Do not manufacture a giant plan, a new test framework, or Gherkin when the repository already has a
simpler accepted representation for a truly mechanical change.

For any meaningful public behavior change, use all six phases.

## Non-Negotiable Invariants

- Never implement before actual RED evidence.
- Never treat generated test source or expected failure as RED evidence.
- Never refactor before actual GREEN evidence.
- Never weaken an approved behavioral assertion to obtain GREEN.
- Never silently add behavior not demanded by approved scenarios/tests.
- Never silently implement gold plating.
- Never let refactor change behavior.
- Never claim quality closure from code inspection alone.
- Continuation state belongs to the active conversation/work plan, not a filesystem state machine.

## Ownership

Kakugyō owns sequencing, dependency ordering, and phase transitions.

Typical board routing:

- **Phase 1:** Hisha renders the domain-language behavior contract; Ōshō obtains user approval.
- **Phase 2:** Keima challenges traps/edge cases; Ōshō obtains decisions.
- **Phase 3:** Fuhyō performs bounded test authoring and a separate test run produces RED evidence.
- **Phase 4:** Fuhyō performs bounded implementation and a separate test run produces GREEN evidence.
- **Phase 5:** Keima performs one preservation challenge; Fuhyō performs atomic refactors.
- **Phase 6:** Fuhyō produces mechanical quality evidence; Ginshō independently judges closure.

Kinshō brackets major/high-risk work when requirements, scope, or acceptance fairness need explicit
ownership.

## Gold Plating

When implementation discovers useful work that is not required by approved behavior:

1. suppress it;
2. record the concrete item and why it is out of scope;
3. let Ōshō surface it as a possible future feature.

Do not smuggle it into GREEN.

## Completion

The pipeline closes only when:

- required phases have completed in order;
- RED and GREEN are backed by actual distinct test evidence;
- refactors retained GREEN;
- quality evidence exists;
- the independent closure verdict accepts the result.

Documentation or law records are not automatic extra phases. Produce them only when required by the
accepted delivery contract or as separate post-close work.
