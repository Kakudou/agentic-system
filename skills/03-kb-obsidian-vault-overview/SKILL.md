---
name: 03-kb-obsidian-vault-overview
description: "Describe and resolve configured Obsidian vault topology from a canonical vault registry without scanning the vault. Use when work needs a vault root, config root, named note root, root group, template path, top-level structure, convention, safety boundary, or normalized vault descriptor. Read-only and configuration-driven."
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Obsidian Vault Overview

Provide the canonical description of a configured Obsidian vault.

This skill is the topology/configuration authority for vault-aware capabilities. Consumers use its semantic fields instead of hardcoding vault paths, roots, template locations, top-level folders, or safety conventions.

It is configuration-driven and read-only. It does not discover missing configuration by crawling the filesystem.

## Usage

- `/03-kb-obsidian-vault-overview`
- `/03-kb-obsidian-vault-overview {vault-id}`
- `/03-kb-obsidian-vault-overview {vault-id} --section structure|roots|templates|safety`
- `/03-kb-obsidian-vault-overview resolve {vault-id}`

When `{vault-id}` is omitted, use `default_vault` from the registry.

## Canonical Source

Always read:

- [vault registry](assets/vault-registry.yaml)
- [overview contract](references/overview-contract.md)

Read when needed:

- [resolution rules](references/resolution.md) for a concrete root/template selector;
- [vault conventions and safety](references/conventions-and-safety.md) when downstream work may inspect or mutate vault material.

Use [overview schema](assets/overview-schema.yaml) when a normalized structured descriptor is useful.

## Hard Rules

- Resolve vault identity only from `assets/vault-registry.yaml`.
- Do not hardcode a vault path outside the registry.
- Do not scan, enumerate, grep, index, or infer the vault to fill missing configuration.
- Do not invent an unconfigured root, template, folder, tag, or frontmatter field.
- Preserve configured spelling and casing exactly.
- Treat `null` roots/templates as explicitly unconfigured.
- Return a configuration error when required configuration is unavailable.
- Distinguish configuration from filesystem existence; registry presence does not prove a path exists.
- Do not read note bodies or arbitrary vault content.
- Do not mutate vault files, Graph View state, counters, registries, or Git.
- Do not transmit decrypted vault content.

## Workflow

### 1. Resolve Vault

Read `default_vault` and `vaults` from the registry.

Use the requested vault ID or the configured default. Reject unknown identifiers.

### 2. Normalize Configuration

Expose only configured semantic fields:

- `vault_id`
- `is_default`
- `type`
- `vault_root`
- `config_root`
- `top_level`
- `named_roots`
- `root_groups`
- `templates`
- `conventions`
- `safety`

Do not add values absent from the registry.

### 3. Resolve Requested Selector

For a human overview, render only the requested section or a compact full overview.

For a machine/embedded use, return the normalized semantic descriptor and apply [resolution rules](references/resolution.md) to any requested selector.

### 4. Report Gaps

If a required root/template is `null`, report it as unconfigured. Never convert `null` into a guessed path.

## Consumer Contract

Consumers depend on semantic fields, not on a versioned orchestration envelope.

If a consumer needs `vault_root`, `root_groups.all_zettel_roots`, or `templates.zettel_template`, it requests that field and fails closed when it is unavailable.

A successful overview means configuration was resolved. It does not prove filesystem existence, read template contents, search vault contents, or perform mutation.
