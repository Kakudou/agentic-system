---
name: 03-kb-obsidian-linter
description: "Inspect the configured ordinary non-memory Obsidian Zettelkasten corpus for structural and semantic health issues such as duplicates, overloaded notes, generic/derived drift, missing abstractions, broken parent relationships, weak linkage, and template drift. Read-only: reports evidence-backed findings and recommends the owning skill for repair without mutating the vault."
metadata:
  version: 1.0
  opencode/slash: "true"
---

# KB Obsidian Linter

Inspect the Zettelkasten corpus and report the problems that make it harder to trust, reuse, or
navigate.

This skill is a **read-only corpus-health checker**.

It does not repair notes. It identifies concrete issues, shows the evidence, and routes the repair to
the skill that owns that kind of mutation.

## Usage

`/03-kb-obsidian-linter`

Lint the configured default vault's eligible ordinary non-memory zettel corpus.

## Dependencies

Required:

- `03-kb-obsidian-vault-overview`

The overview owns vault topology and template resolution.

If either dependency is unavailable, fail closed. Do not replace it with ad-hoc directory scanning.

## Load Order

Always read:

- [Lint rules](references/lint-rules.md)
- [Evidence and severity](references/evidence-and-severity.md)
- [Vault integration](references/vault-integration.md)

Use:

- [Finding schema](assets/lint-finding-schema.yaml)
- [Report schema](assets/lint-report-schema.yaml)

## Core Contract

The linter must:

- resolve the vault through `03-kb-obsidian-vault-overview`;
- read the actual configured zettel template;
- inspect only enough note content and relationships to support concrete findings;
- apply the stable lint rules from `references/lint-rules.md`;
- attach evidence and confidence to every finding;
- avoid duplicate findings for the same underlying defect;
- recommend the smallest owning skill or manual action that can fix the issue;
- leave the entire vault unchanged.

The linter must not:

- create, edit, rename, move, or delete any note;
- mutate counters or frontmatter;
- rewrite a note "for convenience";
- merge zettels;
- create missing generic parents;
- repair broken links;
- invoke Git;
- inspect or expose memory-scoped canonical zettels;
- invent missing evidence;
- call a stylistic preference a structural defect.

## Workflow

### 1. Resolve Vault

Invoke `03-kb-obsidian-vault-overview`.

Resolve:

- `vault_root`;
- `zettel_root`;
- `all_zettel_roots`;
- `zettel_template`;
- relevant conventions and safety boundaries.

Read the actual configured zettel template before checking template conformance.

Never hardcode vault paths or frontmatter fields.

### 2. Resolve Eligible Corpus

Do not enumerate the vault independently.

Memory-scoped canonical zettels remain opaque and excluded.

### 3. Inspect Corpus

Read the returned zettels as needed to evaluate:

- frontmatter/template conformance;
- atomicity;
- semantic overlap;
- generic/derived relationships;
- explicit wikilinks;
- obvious corpus-level abstraction opportunities.

Do not interpret a missing optional field as a defect unless the actual template requires it.

### 4. Apply Stable Rules

Apply only the rules in `references/lint-rules.md`.

A finding must identify:

- stable rule ID;
- affected zettel or zettels;
- evidence;
- why the issue matters;
- confidence;
- severity;
- recommended owner.

Do not emit speculative findings as established defects.

### 5. Consolidate

Merge findings that describe the same underlying issue.

Example:

If three derived zettels all encode the same reusable principle and no generic parent exists, prefer
one `ZL006 missing-generic-abstraction` finding naming all three notes rather than three nearly
identical findings.

### 6. Report

Return the compact report shape from `assets/lint-report-schema.yaml`.

Order findings by:

1. severity;
2. confidence;
3. breadth of impact.

Prefer a short set of meaningful findings over a flood of cosmetic noise.

If no material issue is found, return `CLEAN` with the checks performed.

## Repair Ownership

The linter recommends repairs but never performs them.

Default routing:

- duplicate/near-duplicate knowledge → `03-kb-obsidian-zettelize`
- overloaded multi-idea zettel → `03-kb-obsidian-zettelize`
- generic/derived relationship defect → `03-kb-obsidian-zettelize`
- missing generic abstraction → `03-kb-obsidian-zettelize`
- template/frontmatter drift → note-owning KB maintenance workflow or explicit manual repair
- vault topology/configuration issue → `03-kb-obsidian-vault-overview`

Do not route semantic repairs to `03-kb-obsidian-serendipity`; that skill synthesizes knowledge and
does not own corpus mutation.

## Completion Check

Before returning:

- vault topology came from the overview;
- actual zettel template was read;
- memory isolation was preserved;
- every finding cites concrete evidence;
- severity/confidence are justified;
- no vault mutation occurred;
- no counter changed;
- no Git operation occurred.
