---
name: 03-kb-obsidian-linter
description: "Inspect a configured Obsidian Zettelkasten corpus for structural and semantic health issues such as duplicates, overloaded notes, generic/derived drift, missing abstractions, broken relationships, weak linkage, and template drift. Read-only: report evidence-backed findings and concrete repair actions without mutating the vault."
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Obsidian Linter

Inspect the Zettelkasten corpus and report problems that make it harder to trust, reuse, or navigate.

This capability is read-only. It diagnoses; it does not repair.

## Vault Configuration Input

Require a trusted vault descriptor that resolves the vault, eligible zettel roots, zettel template, conventions, and safety boundaries. When `03-kb-obsidian-vault-overview` is installed, it is the preferred local provider; an equivalent caller-supplied descriptor is also valid.

If required configuration is missing, stop instead of guessing or falling back to an undeclared search path.

## Load Order

Always read:

- [lint rules](references/lint-rules.md)
- [evidence and severity](references/evidence-and-severity.md)
- [vault integration](references/vault-integration.md)

Use [finding shape](assets/lint-finding-schema.yaml) when a structured finding is useful.

## Hard Rules

- Read the actual configured zettel template before checking template conformance.
- Inspect only the descriptor-resolved configured zettel roots.
- Read only enough note content and relationships to support concrete findings.
- Apply only the stable rules in [lint rules](references/lint-rules.md).
- Every finding needs concrete evidence, severity, and confidence.
- Consolidate symptoms that share one root cause.
- Recommend the smallest useful **repair action**, not an internal routing or executor identity.
- Do not create, edit, rename, move, delete, merge, or rewrite notes.
- Do not mutate counters or frontmatter.
- Do not run Git.
- Do not turn style preference into a corpus-health defect.

## Workflow

### 1. Resolve the Corpus

Resolve from the trusted vault descriptor:

- `vault_root`;
- `root_groups.all_zettel_roots`;
- `templates.zettel_template`;
- relevant conventions/safety.

Read the actual configured zettel template.

Inventory only zettel files beneath the explicitly configured zettel roots. Do not broaden into unrelated vault roots.

### 2. Inspect

Read eligible notes as needed to evaluate:

- frontmatter/template conformance;
- atomicity;
- semantic overlap;
- generic/derived relationships;
- explicit wikilinks;
- corpus-level abstraction opportunities.

A missing optional field is not drift unless the actual template requires it.

### 3. Apply Rules

For each material issue record:

- stable rule ID;
- affected zettel(s);
- smallest supporting evidence;
- reasoning;
- impact;
- severity;
- confidence;
- concrete repair action.

Do not present speculation as an established defect.

### 4. Consolidate

Prefer one root-cause finding over repetitive symptoms.

Example: several domain notes encoding the same reusable principle with no generic parent should produce one `ZL006 missing-generic-abstraction` finding naming the affected notes.

### 5. Report

Return:

- `CLEAN`, `FINDINGS`, or `BLOCKED`;
- counts by severity;
- ordered findings;
- checks performed;
- material inspection limits.

Order findings by severity, confidence, then breadth of impact.

Prefer a short set of meaningful findings over cosmetic noise.

## Completion Check

- topology came from a trusted vault descriptor;
- actual template was read;
- corpus stayed inside configured zettel roots;
- every finding has evidence;
- no vault mutation occurred;
- no Git operation occurred.
