---
name: 99-toolcouncil-of-seven
description: Run a rigorous seven-lens adversarial review of a submission such as code, writing, designs, images, research, plans, recipes, architectures, or other artifacts. Use when the user asks for a council review, critique, stress test, multi-angle review, or when an important submission benefits from independent scrutiny beyond a single-pass review. Can operate standalone or as the independent quality gate for gauntlet-loop.
metadata:
  version: 1.0
  opencode/slash: "true"
---

# Council of Seven

Seven bounded archetypes independently inspect a submission, challenge material disagreements, propose concrete alternatives, and deliver an evidence-weighted verdict through Ginshō.

The Council is a **review and judgment protocol**. It does not execute code, mutate files, make purchases, change external state, or replace domain-specific validators. It may inspect evidence produced by tools or other skills.

## Constitutional Principles

1. **Independent first impressions.** Round 1 is blind between seats. No seat sees another seat's analysis before submitting its own findings.
2. **Evidence outranks consensus.** Six weak opinions do not override one verified critical defect.
3. **Role boundaries matter.** Each seat analyzes from its assigned lens and must not invent requirements merely because another design is possible.
4. **Severity is evidence-backed.** Critical and major findings require a concrete claim, evidence, consequence, and confidence.
5. **Critique is not scope expansion.** Suggestions outside the submission's stated purpose are non-blocking unless they expose a prerequisite necessary for that purpose to work.
6. **Ginshō synthesizes; Ginshō does not erase dissent.** Material unresolved disagreements must remain visible in the report.
7. **Standalone judgment is not Gauntlet acceptance.** The Council returns review judgments; `gauntlet-loop` owns contract-level PASS/FAIL when the Council is used as a gate.

## The Seven Seats

| Seat | Agent | Lens | Core question |
|---|---|---|---|
| 1 | Keima | Skeptic | How can this fail, contradict itself, or break under edge conditions? |
| 2 | Kakugyō | Architect | Is the structure coherent, feasible, maintainable, and internally sound? |
| 3 | Fuhyō | Minimalist | What is unnecessary, duplicated, overcomplicated, or insufficiently atomic? |
| 4 | Kyōsha | Visionary | What outside evidence, precedent, pattern, or missing context changes the judgment? |
| 5 | Hisha | Aesthetician | Does the submission communicate, feel, read, or operate as a finished artifact? |
| 6 | Kinshō | Economist | Is the cost, scope, effort, complexity, and maintenance burden justified? |
| 7 | Ginshō | Synthesizer | What survives evidence-weighted arbitration, and what should happen next? |

Before Round 1, read [references/archetypes.md](references/archetypes.md). It defines the authority and anti-patterns of every seat.

## Inputs

Use as much of the following as the user or calling skill provides:

- **Submission** — the artifact, idea, plan, code, image, text, or candidate to review.
- **Context** — intended audience, environment, objective, assumptions, or background.
- **Reference / bar** — requirements, examples, benchmarks, rubrics, standards, or comparable artifacts.
- **Evidence** — tests, measurements, screenshots, citations, runtime results, diffs, logs, or observations.
- **Constraints** — time, budget, safety, compatibility, scope, format, or non-negotiables.

Do not fabricate missing context. Review what exists and make uncertainty visible.

If invoked by `gauntlet-loop`, also read [references/gauntlet-integration.md](references/gauntlet-integration.md) before any seat evaluates the candidate.

## Workflow

### Round 1 — Independent Critique

Run all seven seats independently and, where the host supports it, in parallel. Each seat receives the same submission packet plus only its own lens contract.

Use [assets/round-1-prompt.md](assets/round-1-prompt.md) as the prompt contract.

Each non-Ginshō seat returns 1–5 findings. Ginshō performs an independent synthesis-oriented inspection in Round 1 but **must not issue the final verdict yet**.

Each finding uses the severity rules in [references/evidence-and-severity.md](references/evidence-and-severity.md).

### Round 1 Briefing

Ōshō or the orchestration layer compresses Round 1 into a neutral briefing containing:

- material findings,
- evidence cited,
- agreements,
- contradictions,
- unresolved uncertainty,
- candidate cross-fire topics.

Do not editorialize the briefing toward a preferred outcome.

### Round 2 — Cross-Fire

Run targeted clashes on material disagreements.

Default pairings when no stronger contradiction exists:

- Keima ↔ Kakugyō
- Fuhyō ↔ Kyōsha
- Hisha ↔ Kinshō

If two seats directly conflict on the same material point, prefer that **dynamic pairing** over the static default. Read [references/debate-protocol.md](references/debate-protocol.md) for pairing and skip rules.

Use [assets/cross-fire-prompt.md](assets/cross-fire-prompt.md).

Round 2 is for testing findings, not generating entirely new review scopes.

### Round 3 — Alternatives

Each seat proposes exactly one concrete improvement, alternative, mitigation, or simplification based on the debate.

Use [assets/alternatives-prompt.md](assets/alternatives-prompt.md).

Alternatives are proposals. They do not automatically become requirements.

### Synthesis — Ginshō

Ginshō receives the complete debate and resolves it using the evidence hierarchy in [references/conflict-resolution.md](references/conflict-resolution.md).

Use [assets/synthesis-prompt.md](assets/synthesis-prompt.md) and format the final result with [assets/council-report-template.md](assets/council-report-template.md).

Standalone Council verdicts are:

- **ACCEPT** — no material defect remains.
- **ACCEPT WITH RESERVATIONS** — usable as-is, but meaningful non-blocking risks remain.
- **REVISE** — one or more material defects should be corrected before relying on the submission.
- **REJECT** — the core approach is unsound, unsafe, unfit for purpose, or repair would require fundamental replacement.

Use confidence: **high / medium / low**.

## Domain Adaptation

When the submission requires domain-specific interpretation, read [references/domain-adaptation.md](references/domain-adaptation.md).

The seven lenses stay constant; only what counts as relevant evidence changes.

## Edge Conditions

### Tiny input

For trivially small submissions where cross-fire adds no information, run Round 1 then Synthesis. State that cross-fire was skipped as unnecessary.

### Near-unanimous or unanimous Round 1

If all seven independently reach materially the same conclusion and no credible contradiction exists, skip Round 2. Round 3 may also be skipped if the submission is already ACCEPT-worthy; Ginshō should include at most one stretch alternative.

### Material conflict

If seats disagree on the same material claim, do not average the opinions. Cross-fire the conflicting evidence and preserve unresolved dissent if evidence remains inconclusive.

### Missing evidence

Do not convert uncertainty into confidence. A claim that depends on unavailable evidence should be marked **unverified** or reduced in confidence.

### External research

Kyōsha may seek external context only when tools are available and the task permits research. External information must be attributable. Other seats may also use supplied research evidence but should not duplicate Kyōsha's contextual role without cause.

### Images and media

Review the actual artifact when available. Do not infer visual defects solely from a textual description if the image itself can be inspected.

## Hard Rules

- All seven seats participate in Round 1 unless the host environment cannot support seven independent calls. If degraded, disclose it.
- Round 1 outputs must be independent.
- Ginshō alone issues the final Council verdict.
- A seat cannot promote personal preference into a critical or major defect without showing material consequence.
- A verified fact can outweigh majority opinion.
- Council consensus is not proof.
- The Council may recommend edits or actions but does not perform mutations itself.
- Do not claim a specialized validator, test, benchmark, or external source was used unless evidence shows that it was.
- In Gauntlet mode, Council findings cannot rewrite the locked goal, reference/bar, or constraints.

## Output Discipline

The final Council Report should emphasize:

1. verdict and confidence,
2. consensus,
3. material findings with evidence,
4. dissent and its resolution,
5. concrete alternatives,
6. Ginshō's reasoning,
7. stretch observations separately from blocking issues.

Do not dump the raw transcript unless the user asks for it.

## Resource Loading Map

- Always before Round 1: [references/archetypes.md](references/archetypes.md)
- When assigning severity or checking support: [references/evidence-and-severity.md](references/evidence-and-severity.md)
- When coordinating rounds or pairing conflicts: [references/debate-protocol.md](references/debate-protocol.md)
- When the artifact needs domain-specific interpretation: [references/domain-adaptation.md](references/domain-adaptation.md)
- When material findings conflict: [references/conflict-resolution.md](references/conflict-resolution.md)
- When called by `gauntlet-loop`: [references/gauntlet-integration.md](references/gauntlet-integration.md)
- When producing round prompts or the final report: load the corresponding file in `assets/`
