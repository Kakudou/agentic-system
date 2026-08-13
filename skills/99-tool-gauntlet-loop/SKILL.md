---
name: 99-tool-gauntlet-loop
description: Adversarial quality-convergence loop for any task with a clear goal, measurable reference or bar, and constraints. Use when asked to build, improve, revise, design, analyze, write, plan, or produce an artifact that must meet or beat an explicit benchmark, rubric, exemplar, test suite, acceptance criteria, or quality threshold. Decomposes work, verifies concrete outputs, assembles evidence, invokes council-of-seven as an independent gate, routes only failed dimensions back for repair, checks regressions, and stops only on an evidence-backed pass or an explicit terminal condition.
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Gauntlet Loop

Drive a concrete result toward a user-defined quality bar through independent construction, evidence-backed verification, adversarial review, targeted repair, and regression checks.

The loop is domain-agnostic. The bar defines what "good" means; this skill defines how to converge on it.

## Preconditions: the three-part contract

Do not start building until all three are usable:

1. **Goal** — a concrete outcome or artifact.
2. **Reference / Bar** — observable criteria that determine whether the goal is good enough. This may be an exemplar, rubric, benchmark, test suite, acceptance criteria, source of truth, score threshold, or explicit comparison target.
3. **Constraints** — boundaries the result and process must respect: scope, tools, format, budget, time, safety, compatibility, audience, non-goals, or other hard limits.

If any part is missing or not testable enough to judge, ask only for the missing part. Do not invent a benchmark the user did not authorize.

Read [references/contract.md](references/contract.md) when normalizing ambiguous goals, mixed hard/soft criteria, comparative bars, or constraints.

## Non-negotiable principles

- **Judge the artifact, not the builder's story.** Claims such as "implemented", "fixed", or "should work" are not evidence.
- **The bar is locked for the run.** Do not lower, reinterpret, or move it because the candidate is difficult to improve. Only the user may change the contract.
- **Hard failures cannot be averaged away.** Every mandatory criterion must PASS. `UNVERIFIED` is not PASS.
- **Builders do not approve their own work.** Use fresh-context critics where the host supports subagents. If true separation is impossible, disclose degraded independence and lower confidence.
- **Critics see output and evidence, not excuses.** Hide builder identity, reasoning, attempt count, and prior verdicts unless required to investigate a regression.
- **Repair gaps, not everything.** Reopen only failed or regressed dimensions plus their dependencies.
- **Retest before re-gating.** A repair is not complete until its local criterion passes and previously passing affected criteria still pass.
- **Do not confuse exhaustion with success.** Hitting a budget, tool limit, or iteration fuse produces a terminal non-pass status.
- **Do not optimize beyond the contract by default.** Council suggestions that are merely "better" but not required by the bar are stretch work, not blockers.

## Resource loading map

Load only what the current stage needs:

- Contract/rubric design: [references/contract.md](references/contract.md)
- Workstream decomposition, builders, local critics, integration: [references/orchestration.md](references/orchestration.md)
- Evidence collection, grading, blindness: [references/evidence.md](references/evidence.md)
- Council invocation and verdict translation: [references/council-gate.md](references/council-gate.md)
- Repair routing, stagnation, stopping, final states: [references/convergence.md](references/convergence.md)
- Domain-specific adaptation: [references/domain-adaptation.md](references/domain-adaptation.md)
- Worked examples when translation is unclear: [references/examples.md](references/examples.md)
- Destructive, external, or high-stakes execution: [references/execution-guardrails.md](references/execution-guardrails.md)

Use templates from `assets/` only when creating the corresponding working artifact or report.

## Workflow

### 0. Lock the Gauntlet Contract

Normalize the user input into a concise contract containing:

- goal;
- candidate/output type;
- mandatory criteria;
- optional quality criteria, if any;
- comparison semantics (`meet`, `match`, or `beat`);
- constraints and non-goals;
- permitted evidence methods;
- resource/iteration limits if supplied.

For a reference exemplar, translate relevant qualities into observable criteria without silently adding unrelated requirements. Keep the original reference available for holistic comparison.

Use [assets/gauntlet-contract-template.md](assets/gauntlet-contract-template.md) when a persistent contract is useful.

### 1. Design the verification plan before building

For every mandatory criterion, decide how it can become `PASS`, `FAIL`, or `UNVERIFIED`, and what evidence is sufficient.

Prefer, in order:

1. deterministic/tool-produced evidence;
2. direct inspection of the actual artifact;
3. side-by-side comparison against the fixed reference;
4. structured qualitative judgment against an explicit rubric.

A builder assertion alone is never sufficient.

Read [references/evidence.md](references/evidence.md) for grading rules.

### 2. Decompose by quality and dependency

Derive workstreams from the contract and the structure of the problem, not from a fixed number of workers or review passes.

- Parallelize work that can be independently produced and independently verified.
- Keep tightly coupled work together.
- Assign each workstream explicit criteria and interfaces.
- Identify integration criteria separately; locally good pieces can still form a bad whole.
- Do not create seven workstreams merely because the Council has seven lenses.

Read [references/orchestration.md](references/orchestration.md) for decomposition and concurrency rules.

### 3. Build and locally verify

Each builder receives only what it needs: contract slice, dependencies, interfaces, relevant reference material, and constraints.

After producing real output, run a local verification loop:

`BUILD -> INSPECT/TEST -> FIND LARGEST GAP -> REPAIR -> RETEST`

Use an independent reviewer when practical. Keep local loops cheap and criterion-specific. Do not invoke the full Council for every edit.

A workstream becomes integration-ready only when its mandatory local criteria have evidence-backed PASS results or an explicit blocker is recorded.

### 4. Integrate the candidate

Assemble the candidate and verify cross-workstream behavior, coherence, compatibility, and regressions.

Treat integration as its own artifact. Re-run any criteria whose evidence may have been invalidated by integration.

### 5. Build the Evidence Pack

Create a compact, critic-facing packet containing:

- locked contract;
- actual candidate or direct access to it;
- criterion-by-criterion results;
- concrete evidence references;
- reference/bar material needed for comparison;
- known `FAIL` or `UNVERIFIED` items;
- constraint compliance evidence.

Exclude builder identity, builder reasoning, self-ratings, effort spent, and persuasive explanations.

Use [assets/evidence-pack-template.md](assets/evidence-pack-template.md) and read [references/evidence.md](references/evidence.md).

### 6. Run the Council Gate

Invoke the **`99-tool-council-of-seven`** skill on the integrated candidate, using the locked contract and Evidence Pack as context.

The Council is the independent adversarial gate, not the implementation team. Let its existing seven archetypes and three-round workflow operate normally. Use [assets/council-gate-packet-template.md](assets/council-gate-packet-template.md) when a concrete handoff packet is useful. The Gauntlet then translates the Council Report into a gate decision using the rules in [references/council-gate.md](references/council-gate.md).

The Council may discover missing criteria, but it may not silently redefine the user's bar. A newly discovered issue is a blocker only if it violates the goal, an existing criterion, a constraint, or a necessary property implied by successful operation. Otherwise record it as a stretch suggestion.

If `99-tool-council-of-seven` is unavailable, do not pretend it ran. Use the fallback seven-lens review in [references/council-gate.md](references/council-gate.md), label the gate `DEGRADED`, and lower confidence.

### 7. Decide: pass, repair, or terminate

A candidate **PASSES** only when:

- every mandatory criterion is `PASS` with concrete evidence;
- no required constraint is violated;
- no material Council finding demonstrates that a mandatory criterion was falsely passed or incompletely specified;
- the requested comparison semantics are satisfied (`meet`, `match`, or `beat`);
- affected regression checks pass.

If not, classify the result using the terminal-state rules below.

### 8. Route targeted repairs

For every blocking Council or verification finding, create a repair ticket containing:

- exact gap;
- affected criterion/constraint;
- evidence proving the gap;
- required outcome;
- allowed scope;
- dependencies;
- retest method;
- regression checks.

Use [assets/repair-ticket-template.md](assets/repair-ticket-template.md).

Route each ticket to the smallest appropriate workstream. Implementation work may retain local context; reviewers should remain fresh where possible.

After repairs, retest locally, reintegrate, update the Evidence Pack, and return to the Council Gate. Do not replay unrelated successful work.

### 9. Track convergence and stop correctly

Read [references/convergence.md](references/convergence.md) whenever a finding repeats, progress stalls, a regression appears, or limits are approached. Use [assets/checkpoint-template.md](assets/checkpoint-template.md) when the environment benefits from an explicit convergence ledger checkpoint.

Default strategy when the user gives no explicit iteration budget:

- prefer targeted local repair over another full rebuild;
- if the same material gap survives **two consecutive Council gates** without measurable improvement, change strategy rather than repeating the same repair;
- if it survives a third gate, stop as `HUMAN_DECISION_REQUIRED` unless a clearly different viable strategy remains;
- never continue an unbounded full-Council loop merely because the bar has not been reached.

## Terminal states

Return exactly one primary state:

- **PASSED** — the locked bar is satisfied with evidence.
- **FAILED** — evidence shows the goal/bar cannot be satisfied under the locked constraints with the available approach, and no viable repair remains.
- **BLOCKED** — required input, access, tool capability, dependency, or evidence is unavailable.
- **BUDGET_EXHAUSTED** — a user-specified resource/time/iteration limit was reached before PASS.
- **HUMAN_DECISION_REQUIRED** — progress requires a trade-off, requirement change, subjective choice, or repeated-gap decision the contract does not authorize the workflow to make.

`FAILED`, `BLOCKED`, `BUDGET_EXHAUSTED`, and `HUMAN_DECISION_REQUIRED` are never euphemisms for PASS.

## Final report

Use [assets/final-report-template.md](assets/final-report-template.md).

The final report must state:

- terminal state;
- what was produced;
- bar/criterion results with evidence;
- Council verdict and material dissent;
- repairs performed and regressions checked;
- unresolved gaps, if any;
- confidence and any degraded-review condition.

Keep the user-facing report concise. Preserve detailed evidence in the working artifacts when the environment supports files.

## Gotchas

- **Subjective reference does not mean vague grading.** Extract explicit dimensions, then retain holistic Council comparison as a second layer.
- **A numeric score is secondary.** Never let a weighted average override a mandatory FAIL or UNVERIFIED result.
- **Blind does not mean context-free.** Critics need the goal, bar, constraints, candidate, and evidence; they do not need builder history.
- **Do not leak prior verdicts into a fresh critic.** They anchor the next review and weaken independence.
- **Do not repair to Council taste.** Repair only issues tied to the locked contract or necessary correctness.
- **Do not mark inaccessible behavior as working.** If you cannot execute, inspect, or otherwise verify it, mark it UNVERIFIED and return BLOCKED if mandatory.
- **Do not let a reference violate constraints.** Constraints dominate imitation; compare only the dimensions the contract permits.
- **Do not fan out by habit.** Parallelism is useful only when work and verification are separable.
