# Vault Integration

This skill contains no vault-specific paths.

Resolve topology through `03-kb-obsidian-vault-overview`.

## Required Values

- `vault_root`
- `named_roots.zettel_root`
- `root_groups.all_zettel_roots`
- `templates.zettel_template`

Normally also:

- `named_roots.resources_root`

Consume relevant safety and submodule configuration.

Unknown or unconfigured required values fail closed.

## Template Authority

Read the actual configured `zettel_template`.

It controls frontmatter keys/casing, Author, Lang, Template, dates, links/tags, and body scaffold.

Do not embed a stale template here.

## Stable Markers

If compatible with the actual template's tag field, add:

- `zettel/generic`
- `zettel/derived`
- `zettel/domain-bound`

If local conventions reject these or no tag field exists, do not invent a frontmatter field. Surface
the missing marker convention in the proposal.

## Default Roots

- generic → `zettel_root`
- derived → `zettel_root`
- domain-bound → `zettel_root`
- reconstruction → `resources_root`

A caller may explicitly select another overview-configured zettel root.

## Search Corpus

Dedup uses overview-resolved `all_zettel_roots` through `kb-obsidian-search`.

Its memory-isolation contract remains authoritative.

## Reconstruction

Reconstruction is a non-atomic resource/proof artifact. If a same-purpose reconstruction exists,
update with diff instead of blind overwrite.
