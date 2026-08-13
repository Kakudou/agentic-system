# Domain Adaptation Reference

Use this file to map the generic Gauntlet mechanics onto the current task. The contract remains authoritative; these are defaults, not extra requirements.

## Software / code

Candidate evidence may include:

- tests and test output;
- static analysis/type checks;
- runtime behavior;
- benchmarks;
- API/schema compatibility;
- security review;
- diffs and affected files;
- screenshots for UI behavior.

Typical Council emphasis:

- Keima: bugs, security, races, edge cases;
- Kakugyō: architecture, coupling, interfaces;
- Fuhyō: accidental complexity, duplication;
- Kyōsha: standards, idioms, established patterns;
- Hisha: API ergonomics, naming, UI polish;
- Kinshō: maintenance/operational cost.

Never treat "code compiles" as proof of behavioral correctness unless compilation is the criterion.

## Writing / documentation / creative text

Candidate evidence may include:

- required facts/sections present;
- source fidelity and citations where applicable;
- length/format checks;
- logical consistency;
- audience/rubric alignment;
- side-by-side blind comparison with reference prose;
- direct quotes from the candidate showing strengths/gaps.

Separate factual correctness from stylistic quality. A beautiful factual error is still a failure when correctness is mandatory.

## Research / analysis

Candidate evidence may include:

- authoritative source support;
- reproducible calculations;
- coverage of required questions;
- distinction between evidence and inference;
- recency/version checks where relevant;
- uncertainty and conflicting evidence;
- comparison against benchmark analysis or expected findings.

Council expansion ideas do not become requirements unless the research question or bar needs them.

## Product / UX / visual design

Candidate evidence may include:

- rendered artifact/screenshots;
- task flows;
- accessibility checks;
- responsive states;
- design-system constraints;
- reference comparison on hierarchy, clarity, density, consistency, and finish;
- usability observations.

A design description is not a substitute for inspecting the rendered result when the bar is visual.

## Data / analytics

Candidate evidence may include:

- schema validation;
- row/count reconciliation;
- query/calculation reproducibility;
- sampled records;
- invariants and edge cases;
- benchmark values;
- visualization correctness;
- lineage/source checks.

Do not let a plausible narrative compensate for incorrect numbers.

## Plans / strategy / architecture proposals

Candidate evidence may include:

- requirement coverage;
- feasibility against known resources/dependencies;
- risk register;
- milestones/ownership;
- scenario tests;
- consistency with constraints;
- comparison with a reference plan or rubric;
- explicit assumptions validated where possible.

A plan can pass without execution only if the goal is to produce a plan. Do not claim the planned real-world outcome itself is verified.

## Operations / workflows / infrastructure

Candidate evidence may include:

- dry-run or sandbox results;
- configuration validation;
- health/readiness evidence;
- rollback/recovery path;
- dependency checks;
- observability;
- capacity/latency/cost measurements;
- change-impact verification.

Read `references/execution-guardrails.md` before destructive changes.

## Recipes / physical procedures

Candidate evidence may include:

- ingredient/material constraints;
- ordered technique/steps;
- safety constraints;
- timing/temperature/quantity checks;
- substitution behavior;
- sensory or output rubric if actual execution can be observed.

If the agent cannot physically execute or observe the result, distinguish a well-specified procedure from a verified finished outcome.

## Images / media

Candidate evidence may include:

- direct visual/audio inspection;
- dimensions/technical format;
- composition and artifact checks;
- reference comparison;
- prompt/brief compliance;
- accessibility/legibility where required.

Do not grade an unseen asset from its prompt alone.

## Mixed-domain tasks

For projects spanning domains, create criteria and evidence plans per domain, then add integration criteria for the whole result. Invoke specialist tooling locally, but keep one locked Gauntlet Contract and one final Council gate.
