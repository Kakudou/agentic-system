---
name: 03-kb-obsidian-zettelize
description: Atomize a source into reusable generic Zettelkasten notes and domain-derived zettels, deduplicate or update existing knowledge, reconstruct the source mainly from derived-note embeds, and verify near-complete semantic coverage before applying approved vault changes.
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Obsidian Zettelize

Compile one source into a reusable Zettelkasten graph.

```text
source
  ↓
atomic source units
  ↓
generic/core zettels
  ↓
domain-derived zettels
  ↓
source reconstruction
  ↓
coverage proof
```

The source is evidence. Generic zettels capture reusable knowledge stripped of incidental domain context. Derived zettels bind that knowledge back to the source's concrete context. Reconstruction proves the decomposition did not quietly lose important content.

This is a **loss-aware knowledge compiler**, not a summarizer.

## Usage

- `/03-kb-obsidian-zettelize {source}`
- `/03-kb-obsidian-zettelize {vault-id} {source}`
- `/03-kb-obsidian-zettelize {source} --lang {EN|FR|...}`
- `/03-kb-obsidian-zettelize {source} --dry-run`

## Vault Configuration Input

Require a trusted vault descriptor for vault roots, eligible zettel roots, templates, conventions, and safety metadata. When `03-kb-obsidian-vault-overview` is installed, it is the preferred local provider; an equivalent caller-supplied descriptor is also valid.

Do not depend on a separate search skill. Use available read-only search/file capabilities only inside the descriptor-resolved eligible zettel roots.

## Load Order

Always read:

- [knowledge model](references/knowledge-model.md)
- [atomization and genericization](references/atomization.md)
- [deduplication and update](references/dedup-and-update.md)
- [reconstruction and coverage](references/reconstruction-and-coverage.md)
- [vault integration](references/vault-integration.md)

Before mutation read [execution and safety](references/execution-and-safety.md).

Use the local candidate and coverage shapes when structured working data helps:

- [candidate shape](assets/zettel-candidate-schema.yaml)
- [coverage ledger](assets/coverage-ledger-schema.yaml)

## Core Invariants

- Source snapshot is immutable.
- One zettel contains one atomic idea.
- Every substantive source unit is accounted for.
- Generic zettels contain no accidental project/domain specificity.
- Genericization preserves meaning; fake abstraction is forbidden.
- Derived zettels link to and embed their generic parent.
- Derived zettels contain the domain-specific delta, not a copy of the generic note.
- Equivalent existing knowledge is reused or minimally updated instead of duplicated.
- Deduplication is limited to the descriptor-resolved zettel corpus.
- The actual configured zettel template is authoritative.
- No source claim may be invented, strengthened, weakened, or silently dropped.
- Reconstruction preserves source meaning and order closely enough to act as a coverage proof.
- No substantive source unit may be called decoration merely to avoid creating a missing zettel.
- No Git operation is performed.

## Workflow

### 1. Resolve Vault and Template

Resolve from the trusted vault descriptor:

- `vault_root`;
- `named_roots.zettel_root`;
- `root_groups.all_zettel_roots`;
- `named_roots.resources_root` when reconstruction will be persisted;
- `templates.zettel_template`;
- relevant conventions and safety metadata.

Read the actual configured zettel template before drafting notes.

### 2. Capture Source Snapshot

Acquire the complete source into an immutable working snapshot with provenance sufficient to locate every extracted unit.

Never mutate the source as a side effect.

### 3. Build Source Unit Ledger

Decompose the source into ordered units:

- `ZETTEL_GRADE` — durable claim, concept, rule, relationship, definition, procedure, constraint, decision, explanation, or materially reusable example;
- `DECORATION` — no independent durable knowledge;
- `STRUCTURE` — composition scaffolding such as headings, order, or table layout.

Follow [atomization](references/atomization.md).

### 4. Produce Generic Candidates

For every atomic `ZETTEL_GRADE` unit, attempt **lossless genericization**.

Remove incidental project names, proprietary nouns, local filenames, and accidental implementation context while preserving the core claim.

Prefer natural reusable language. Do not create placeholder soup.

If removing the domain destroys the claim's meaning, mark it `INTRINSICALLY_DOMAIN_BOUND` instead of manufacturing a fake generic parent.

### 5. Deduplicate Generic Knowledge

Search only the descriptor-resolved eligible zettel roots.

For each generic candidate decide:

- `REUSE`
- `UPDATE`
- `CREATE`
- `CONFLICT`

Follow [deduplication and update](references/dedup-and-update.md).

### 6. Produce Derived Candidates

For each source unit with a generic parent, create or update one domain-derived zettel.

The derived note:

- names the concrete domain binding;
- links the generic parent using the actual template's link field;
- embeds the generic parent near the beginning of the body;
- contains only the source-specific delta;
- preserves source provenance.

For `INTRINSICALLY_DOMAIN_BOUND`, create or update one domain-bound zettel with no fake parent.

Deduplicate derived/domain-bound candidates before creation.

### 7. Build Reconstruction

Reconstruct the source using:

- original structural order where available;
- primarily `![[derived-zettel]]` embeds for substantive content;
- domain-bound embeds where required;
- minimal original decoration and structural glue;
- original code, quotes, tables, examples, citations, or local details when they are not zettel-grade.

The reconstruction is a transclusion-first proof artifact, not a rewritten summary.

### 8. Run Coverage Gate

Populate [coverage ledger](assets/coverage-ledger-schema.yaml).

Every substantive unit maps to a derived/domain-bound zettel or has an explicit non-zettel justification.

Default pass bar:

- 100% of critical, normative, technical, and exception-bearing units mapped;
- at least 95% of substantive units represented through zettels;
- zero unexplained omissions;
- zero invented claims;
- source ordering and relationships materially recognizable.

If coverage fails, return uncovered units to atomization/deduplication. Do not lower the bar.

### 9. Preview Mutations

Before any write, present a closed mutation preview containing:

- generic reuse/update/create/conflict decisions;
- derived/domain-bound decisions;
- source-unit coverage result;
- reconstruction preview;
- exact diffs for existing-note updates;
- exact proposed new paths;
- any configured submodule implications.

`--dry-run` stops here.

Require explicit approval before applying vault mutations.

### 10. Apply Approved Mutations

Follow [execution and safety](references/execution-and-safety.md).

Apply only the approved creates/updates. If a target changed since preview, stop and rebuild the affected proposal instead of overwriting newer state.

Large decompositions may be applied in bounded batches, but do not reduce semantic coverage merely to make a batch smaller.

### 11. Verify and Finalize

Read every changed note back, confirm intended content/template/path, then finalize the reconstruction from verified note identities and rerun coverage.

Completion means the verified reconstruction is semantically near-equivalent to the source and the reusable knowledge graph owns its substantive content.

## Does Not

- rewrite the source;
- create generic notes merely for symmetry;
- zettelize every sentence;
- treat formatting as knowledge;
- duplicate generic prose in derived notes;
- mutate generic parents just to create reciprocal links;
- mutate usage counters because notes were read;
- silently resolve contradictory zettels;
- run Git.
