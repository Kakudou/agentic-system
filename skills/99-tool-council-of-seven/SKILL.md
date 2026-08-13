---
name: 99-tool-council-of-seven
description: "Run an independent seven-lens adversarial review of a submission such as code, writing, designs, research, plans, architectures, or other artifacts. Use when one review is not enough and the submission benefits from blind first impressions, targeted cross-fire, concrete alternatives, and evidence-weighted synthesis."
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Council of Seven

Review one submission through seven independent lenses, then reconcile the findings by evidence.

The Council is read-only. It reviews; it does not execute repairs or mutate the submission.

## Usage

`/99-tool-council-of-seven {submission}`

## Seven Lenses

1. **Skeptic** — failure modes, contradictions, edge cases, unsupported assumptions.
2. **Architect** — structure, boundaries, dependencies, feasibility, maintainability.
3. **Minimalist** — unnecessary complexity, duplication, accidental scope, simplification.
4. **Context Scout** — external evidence, precedent, standards, missing context.
5. **Aesthetician** — clarity, usability, coherence, presentation, finish.
6. **Economist** — effort/value, operational burden, maintenance cost, practical scope.
7. **Synthesizer** — evidence-weighted arbitration, dissent preservation, final verdict.

Read [references/archetypes.md](references/archetypes.md) before the first round.

## Inputs

Use what is actually available:

- submission;
- intended purpose and audience;
- requirements or comparison bar;
- constraints and non-goals;
- tests, measurements, screenshots, citations, diffs, logs, or other evidence.

Do not fabricate missing context. Make uncertainty visible.

## Workflow

### 1. Independent first round

Run all seven lenses independently. Do not expose one lens's findings to another before each has completed its first inspection.

Use [assets/round-1-prompt.md](assets/round-1-prompt.md).

Each lens should return only high-signal findings supported by the evidence standard in [references/evidence-and-severity.md](references/evidence-and-severity.md).

### 2. Neutral briefing

Combine the first round into a neutral briefing containing:

- material agreements;
- material disagreements;
- cited evidence;
- unresolved uncertainty;
- candidate topics for cross-fire.

Do not frame the briefing toward a preferred answer.

### 3. Targeted cross-fire

Challenge only material disagreements or findings whose severity is uncertain.

Dynamic pairings are preferred: pair the two lenses whose claims actually conflict.

Use [assets/cross-fire-prompt.md](assets/cross-fire-prompt.md) and [references/debate-protocol.md](references/debate-protocol.md).

Skip cross-fire when the first round is materially unanimous and no credible contradiction remains.

### 4. Alternatives

Ask the lenses for concrete improvements, mitigations, or simplifications that follow from the review.

Use [assets/alternatives-prompt.md](assets/alternatives-prompt.md).

Alternatives are suggestions, not automatic requirements.

### 5. Synthesis

The Synthesizer receives the complete review and resolves conflicts using [references/conflict-resolution.md](references/conflict-resolution.md).

Use [assets/synthesis-prompt.md](assets/synthesis-prompt.md) and [assets/council-report-template.md](assets/council-report-template.md).

Verdicts:

- **ACCEPT** — no material defect remains.
- **ACCEPT WITH RESERVATIONS** — usable as-is; meaningful non-blocking risk remains.
- **REVISE** — material defects should be corrected before relying on the submission.
- **REJECT** — the core approach is unsound, unsafe, or unfit for purpose.

Confidence: `high | medium | low`.

## Evidence Rules

- Evidence outranks vote count.
- Consensus is not proof.
- One verified critical defect can outweigh six unsupported positive opinions.
- A preference is not a blocker without a material consequence.
- Missing evidence remains unverified; do not convert uncertainty into confidence.
- Findings outside the stated purpose are stretch observations unless they expose a necessary prerequisite for the purpose to work.

## Domain Adaptation

Read [references/domain-adaptation.md](references/domain-adaptation.md) when the artifact requires domain-specific interpretation.

The seven lenses remain stable. Only the evidence and failure modes change.

## Optional Gauntlet Integration

When a consuming workflow uses the Council as a quality gate, read [references/gauntlet-integration.md](references/gauntlet-integration.md).

The Council still returns its own review verdict. A consuming workflow may translate that verdict into its own acceptance state, but must not rewrite Council findings.

## Output

Return one concise Council Report containing:

1. verdict and confidence;
2. strongest consensus points;
3. material findings with evidence;
4. material dissent and its resolution or unresolved status;
5. concrete alternatives;
6. evidence limits.

Do not dump internal debate transcripts unless explicitly requested.
