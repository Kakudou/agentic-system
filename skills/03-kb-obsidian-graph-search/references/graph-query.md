# Graph Query Construction

Graph View's `search` value is a literal Obsidian search expression.

Queries may be built from:

- explicit user literals; or
- semantic selectors resolved through the vault overview.

## Supported Forms

- `path:folder/`
- `file:name`
- `tag:#tagname`
- `OR`
- `-path:folder/`
- `-tag:#noise`

Parenthesize boolean combinations when needed.

## Rules

- Preserve literal user paths, filenames, and tags.
- Never invent paths/tags.
- Never scan the vault to discover likely filters.
- Never broaden a query merely to show more nodes.
- Never silently drop exclusions.
- `reset-search` is exactly empty string.
- Preserve raw user Obsidian search syntax unless invalid.
- Convert semantic roots only through `references/vault-overview-integration.md`.

## Examples

These illustrate syntax only:

```text
-path:some/private/root/ -path:Templates/
```

```text
(path:some/zettel/root/ OR path:another/zettel/root/)
```

```text
tag:#project -tag:#archive
```
