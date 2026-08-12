# Vault Overview Integration

`03-kb-obsidian-graph-search` knows no vault topology.

Its only topology source is a valid `ObsidianVaultOverview/v1` descriptor returned by
`03-kb-obsidian-vault-overview`.

## Required Fields

Graph Search requires:

- `vault_root`
- `config_root`
- `named_roots` when semantic roots are used
- `root_groups` when root groups are used
- `templates` when a template is explicitly needed
- `top_level` when a top-level selector is used
- `safety`

## Graph Target

Resolve:

`graph.json = vault_root / config_root / "graph.json"`

Requirements:

- `config_root` is relative;
- normalized target remains beneath `vault_root`;
- target is a literal regular file candidate for the proposal;
- missing target is an error.

## Named Root to Graph Query

When the user refers to a named root:

1. resolve it from `named_roots`;
2. reject unknown or `null`;
3. verify the configured absolute root is lexically beneath `vault_root`;
4. convert to vault-relative path;
5. express it as an Obsidian `path:` query.

Example abstraction:

```text
named root: zettel_root
resolved absolute: <overview value>
vault relative: <derived relative path>
graph query: path:<derived relative path>
```

Never embed the example's actual path in this skill.

## Root Groups

For a root group:

1. resolve each member from `root_groups`;
2. resolve every member through `named_roots`;
3. convert each to vault-relative `path:` query;
4. combine explicitly with `OR`.

If one member is unconfigured, fail unless the user explicitly narrows the group.

## Top-Level Selectors

A top-level folder name must come directly from `top_level`.

Graph Search may convert the exact configured folder key into `path:<folder>`.

It may not infer additional child folders from the description text.

## Templates

A template name resolves through `templates`.

Graph Search may use that literal file only when the proposal explicitly requires template evidence.
It may not infer all note locations of that type from the template.

## Safety Propagation

Graph Search inherits relevant overview safety constraints.

In particular:

- do not write outside `vault_root`;
- do not invent unconfigured values;
- do not transmit decrypted vault content;
- disclose configured submodule implications if a proposal ever touches one.

Graph View `graph.json` itself normally lives under `config_root`, but the check is descriptor-driven,
not hardcoded.
