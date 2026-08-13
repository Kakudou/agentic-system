# Vault Integration

This skill contains no vault-specific path knowledge.

## Required Descriptor Values

Require:

- `vault_root`
- `root_groups.all_zettel_roots`
- `templates.zettel_template`

Missing required values block the lint run.

The local `03-kb-obsidian-vault-overview` capability may provide this descriptor when installed, but the linter does not require that specific sibling skill.

## Template Authority

Read the actual configured zettel template before applying `ZL007 template-drift`.

Never embed a copied template in the linter.

## Corpus Boundary

The corpus is the union of Markdown zettels found beneath the explicitly configured `all_zettel_roots`.

Use available read-only file/search capabilities to resolve files inside those roots. Do not widen the search to the whole vault and do not use an unrelated external store as a fallback source.

Do not follow a zettel link into material outside the eligible corpus unless a rule needs only to classify the target as non-zettel material.

## Generic / Derived Markers

Prefer explicit compatible markers when present, such as:

- `zettel/generic`
- `zettel/derived`
- `zettel/domain-bound`

Markers are evidence, not the only possible evidence. Do not invent a frontmatter field merely to classify a note.

## Read-Only

No read performed by this linter changes counters or files.
