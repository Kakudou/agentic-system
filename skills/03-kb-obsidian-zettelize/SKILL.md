---
name: 03-kb-obsidian-zettelize
description: Atomize a source into reusable generic Zettelkasten notes and business-derived zettels, deduplicate or update existing knowledge, then reconstruct the source mainly from derived-note embeds and verify near-complete semantic coverage. Use for turning documents, notes, URLs, PDFs, or pasted text into a reusable Obsidian knowledge graph.
metadata:
  version: 1.0
  opencode/slash: "true"
---

# KB Obsidian Zettelize

Compile one source into a reusable Zettelkasten graph.

```text
SOURCE
  ↓
atomic source units
  ↓
generic/core zettels
  ↓
business-derived zettels
  ↓
source reconstruction
  ↓
coverage proof
```

The source is evidence. Generic zettels capture reusable knowledge stripped of incidental business
context. Derived zettels bind that generic knowledge back to the source's concrete domain. The final
reconstruction proves that the decomposition did not quietly lose important content.

This skill is not a summarizer. It is a **loss-aware knowledge compiler**.

## Usage

- `/03-kb-obsidian-zettelize {source}`
- `/03-kb-obsidian-zettelize {vault-id} {source}`
- `/03-kb-obsidian-zettelize {source} --lang {EN|FR|...}`
- `/03-kb-obsidian-zettelize {source} --dry-run`

When `{vault-id}` is omitted, use the default vault resolved by `03-kb-obsidian-vault-overview`.

## Dependencies

Required:

- `03-kb-obsidian-vault-overview`

The overview owns vault topology and template locations. Search owns ordinary non-memory zettel
discovery for deduplication. If either dependency cannot satisfy its contract, fail closed.

## Load Order

Always read:

- [Knowledge model](references/knowledge-model.md)
- [Atomization and genericization](references/atomization.md)
- [Deduplication and update](references/dedup-and-update.md)
- [Reconstruction and coverage](references/reconstruction-and-coverage.md)
- [Vault integration](references/vault-integration.md)

Before mutation or formal preflight, read [Execution and safety](references/execution-and-safety.md).

Use:

- [Candidate schema](assets/zettel-candidate-schema.yaml)
- [Coverage ledger schema](assets/coverage-ledger-schema.yaml)
- [Proposal schema](assets/zettelize-proposal-schema.yaml)

## Core Invariants

- Source snapshot is immutable.
- One zettel contains one atomic idea.
- Every substantive source unit is accounted for.
- Generic zettels contain no accidental project/business specificity.
- Genericization must preserve meaning; fake abstraction is forbidden.
- Derived zettels link to and embed their generic parent.
- Derived zettels contain the domain-specific delta, not a copy of the generic note.
- Existing equivalent knowledge is reused or updated instead of duplicated.
- Memory-scoped zettels never participate in generic deduplication.
- The actual configured zettel template is authoritative.
- No source claim may be invented, strengthened, weakened, or silently dropped.
- Reconstruction preserves source meaning and order closely enough to act as a coverage proof.
- No substantive source unit may be called decoration merely to avoid creating a missing zettel.
- No Git operation is performed.

## Workflow

### 1. Resolve Vault and Template

Invoke `03-kb-obsidian-vault-overview` and obtain `ObsidianVaultOverview/v1`.

Resolve `vault_root`, `zettel_root`, `all_zettel_roots`, `resources_root`, `zettel_template`, and
relevant safety/submodule information.

Read the actual configured `zettel_template` before drafting any zettel. Never guess fields or paths.

### 2. Capture Source Snapshot

Acquire the entire source into one immutable snapshot with provenance. Record enough provenance to
locate every extracted source unit. Never mutate the source.

### 3. Build Source Unit Ledger

Decompose the source into ordered units and classify each as:

- `ZETTEL_GRADE`
- `DECORATION`
- `STRUCTURE`

`ZETTEL_GRADE` carries durable knowledge: claim, concept, rule, relationship, definition, procedure,
constraint, decision, explanation, or materially reusable example.

`DECORATION` carries no independent durable knowledge.

`STRUCTURE` is composition scaffolding such as headings/order/table layout.

Follow `references/atomization.md`.

### 4. Produce Generic Candidates

For every `ZETTEL_GRADE` atomic unit, attempt a **lossless genericization**.

Remove incidental business names, project identifiers, proprietary nouns, local filenames, and
accidental implementation context while preserving the core claim.

Prefer natural general language. Do not create `<PLACEHOLDER>` soup unless the source itself defines
a parameterized pattern.

If removing the domain destroys the claim's meaning, mark it `INTRINSICALLY_DOMAIN_BOUND` and do not
manufacture a fake generic parent.

### 5. Deduplicate Generic Knowledge

For every generic candidate, search across overview-resolved eligible non-memory
zettel roots.

Classify:

- `REUSE`
- `UPDATE`
- `CREATE`
- `CONFLICT`

Follow `references/dedup-and-update.md`.

### 6. Produce Derived Candidates

For each source unit with a generic parent, create or update one business-derived zettel.

The derived zettel:

- names the concrete domain/business binding;
- links the generic parent using the actual template's link field;
- embeds the generic parent near the beginning of the body;
- contains only the source-specific delta;
- preserves source provenance.

Do not copy generic prose into the derived note.

For `INTRINSICALLY_DOMAIN_BOUND`, create/update one domain-bound zettel with no fake parent.

Deduplicate derived/domain-bound candidates before creation.

### 7. Build Reconstruction

Reconstruct the source using:

- original structural order where available;
- mostly `![[derived-zettel]]` embeds for substantive content;
- domain-bound embeds where required;
- minimal source decoration and structural glue;
- original code, quotes, tables, examples, citations, or local details when they are not zettel-grade.

The reconstruction is a **transclusion-first proof artifact**, not a rewritten summary.

### 8. Run Coverage Gate

Build `assets/coverage-ledger-schema.yaml`.

Every substantive source unit must map to:

- a derived zettel;
- a domain-bound zettel; or
- an explicitly justified non-zettel decoration unit.

Default pass bar:

- 100% of critical, normative, technical, and exception-bearing units mapped;
- at least 95% of substantive units represented through zettels;
- zero unexplained omissions;
- zero invented claims;
- source ordering and relationships materially recognizable.

If the gate fails, return uncovered units to atomization and create/reuse/update the missing zettels.

Do not lower the bar to make an incomplete decomposition pass.

### 9. Present Closed Proposal

Present:

- generic reuse/update/create/conflict decisions;
- derived/domain-bound decisions;
- source-unit coverage;
- reconstruction preview;
- exact diffs for updates;
- proposed new paths;
- submodule disclosure;
- bounded formal execution batches.

Use `assets/zettelize-proposal-schema.yaml`.

`--dry-run` stops here.

### 10. Formal Write

Only after semantic proposal completion and approval may mutation enter the bounded workflow in
`references/execution-and-safety.md`.

Large decompositions may require multiple independently approved execution batches. Never trim
knowledge coverage merely to fit one batch.

### 11. Final Verification

After all approved zettel batches succeed, finalize the reconstruction from verified zettel
identities and rerun coverage.

`COMPLETED` means the reconstruction is semantically near-equivalent to the source and the reusable
knowledge graph owns the substantive content.

## What This Skill Does Not Do

- Does not rewrite the source.
- Does not create a generic note merely for symmetry.
- Does not zettelize every sentence.
- Does not treat headings/formatting as knowledge.
- Does not duplicate generic content in derived notes.
- Does not mutate generic parents for reciprocal links.
- Does not increment access/use counters merely because notes were searched or embedded.
- Does not use memory-scoped zettels for deduplication.
- Does not silently resolve contradictory zettels.
- Does not replace topical resource assembly; reconstruction exists to prove source coverage.
