# Vault Integration

This skill contains no vault-specific path knowledge.

## Overview

Resolve through `03-kb-obsidian-vault-overview`.

Required:

- `vault_root`
- `root_groups.all_zettel_roots`
- `templates.zettel_template`

If a required value is unknown or unconfigured, return `BLOCKED`.

## Template Authority

Read the actual configured zettel template before applying `ZL007 template-drift`.

Never embed a copied template inside the linter.

## Corpus Discovery

Use `kb-obsidian-search` with the overview-resolved `all_zettel_roots` and no query to obtain the
eligible ordinary non-memory zettel inventory.

The search skill's memory-isolation contract remains authoritative.

Do not:

- enumerate vault directories directly;
- grep the vault independently;
- bypass search because a path is known;
- inspect excluded memory content.

## Relationship Inspection

Once the eligible inventory is known, the linter may read those returned zettel files to inspect:

- wikilinks;
- frontmatter;
- generic/derived markers;
- body structure;
- semantic content needed by lint rules.

Do not expand from a zettel link into a file outside the eligible corpus unless the rule explicitly
needs only to recognize that the target is non-zettel material.

## Generic / Derived Markers

When present, prefer explicit corpus markers such as:

- `zettel/generic`
- `zettel/derived`
- `zettel/domain-bound`

But markers are not the sole evidence.

A note may clearly function as generic/derived based on its parent link/embed and content even when a
marker is absent.

Do not invent a frontmatter field merely to classify it.

## Read-Only

No read performed by this linter increments any access/use counter.

No file is modified.
