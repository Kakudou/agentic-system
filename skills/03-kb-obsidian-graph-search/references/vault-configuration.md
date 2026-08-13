# Vault Configuration

Graph Search knows no vault topology of its own.

Consume a trusted vault descriptor. In the local installation, `03-kb-obsidian-vault-overview` is the preferred provider, but the capability does not depend on that sibling skill when an equivalent descriptor is supplied.

## Required Fields

Always:

- `vault_root`
- `config_root`
- `safety`

Conditionally:

- `named_roots` for named-root selectors;
- `root_groups` for group selectors;
- `templates` only when the explicit graph request genuinely needs a configured template;
- `top_level` for top-level selectors.

## Graph Target

Resolve:

`graph.json = vault_root / config_root / "graph.json"`

Requirements:

- `config_root` is vault-relative;
- normalized target stays beneath `vault_root`;
- missing target is an error rather than permission to invent configuration.

## Named Root to Graph Query

For a named root:

1. resolve the semantic key from `named_roots`;
2. reject unknown or `null` values;
3. require it to be beneath `vault_root`;
4. convert to vault-relative path;
5. express it as an Obsidian `path:` query.

## Root Groups

For a root group:

1. resolve each member from `root_groups`;
2. resolve those members through `named_roots`;
3. convert each to a vault-relative `path:` query;
4. combine explicitly with `OR`.

If a member is unconfigured, fail unless the request explicitly narrows the group.

## Top-Level Selectors

Use only exact keys configured in `top_level`. Do not infer child folders from descriptions.

## Safety

Preserve the descriptor's safety constraints, especially no writes outside the vault, no invented configuration, and no transmission of decrypted vault content.
