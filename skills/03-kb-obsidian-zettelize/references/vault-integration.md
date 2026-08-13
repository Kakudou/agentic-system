# Vault Integration

This skill contains no vault-specific paths.

Consume a trusted vault descriptor. The local `03-kb-obsidian-vault-overview` capability is the preferred provider when installed, but this skill remains usable with an equivalent caller-supplied descriptor.

## Required Values

- `vault_root`
- `named_roots.zettel_root`
- `root_groups.all_zettel_roots`
- `templates.zettel_template`

Usually also:

- `named_roots.resources_root`

Consume relevant conventions, safety, and submodule configuration.

Unknown or unconfigured required values block the operation.

## Template Authority

Read the actual configured zettel template.

It controls frontmatter keys/casing, author/language fields, dates, tags/links, and body scaffold. Do not embed a copied template here.

## Stable Markers

When compatible with the actual template's tag field, the following semantic markers may be used:

- `zettel/generic`
- `zettel/derived`
- `zettel/domain-bound`

If the local template does not support them, do not invent a field. Record the limitation in the preview.

## Default Roots

- generic → configured `zettel_root`
- derived → configured `zettel_root`
- domain-bound → configured `zettel_root`
- reconstruction → configured `resources_root`

An alternate output root must be explicitly requested and must itself be present in the supplied/configured descriptor.

## Deduplication Corpus

Search only Markdown zettels beneath the descriptor-resolved `all_zettel_roots` using available read-only file/search capabilities.

Do not widen the corpus to unrelated vault roots.

## Reconstruction

Reconstruction is a non-atomic resource/proof artifact. If a same-purpose reconstruction already exists, preview an exact update diff instead of blindly overwriting it.
