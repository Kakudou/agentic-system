---
name: 03-kb-obsidian-vault-overview
description: "Describe and resolve configured Obsidian vault topology from a canonical vault registry without scanning the vault. Use when another KB skill needs a vault root, config root, named note root, template path, top-level structure, safety convention, or normalized vault descriptor. Returns an ObsidianVaultOverview/v1 contract and never mutates vault state."
metadata:
  version: 1.0
  opencode/slash: "true"
---

# KB Obsidian Vault Overview

Provide the canonical description of a configured Obsidian vault.

This skill is the **vault topology authority** for the KB skill family. Other skills should consume
its normalized output instead of hardcoding vault paths, roots, template locations, top-level
folders, or safety conventions.

It is configuration-driven and read-only. It does not discover the vault by crawling the filesystem.

## Usage

- `/03-kb-obsidian-vault-overview`
- `/03-kb-obsidian-vault-overview {vault-id}`
- `/03-kb-obsidian-vault-overview {vault-id} --section structure`
- `/03-kb-obsidian-vault-overview {vault-id} --section roots`
- `/03-kb-obsidian-vault-overview {vault-id} --section templates`
- `/03-kb-obsidian-vault-overview {vault-id} --section safety`
- `/03-kb-obsidian-vault-overview resolve {vault-id}`

When `{vault-id}` is omitted, resolve `default_vault` from the canonical registry.

## Canonical Source

Always read:

- [Vault registry](assets/vault-registry.yaml)
- [Overview contract](references/overview-contract.md)

Read when needed:

- [Resolution rules](references/resolution.md) when another skill needs a concrete root or template.
- [Vault conventions and safety](references/conventions-and-safety.md) when work may read, write,
  filter, link, generate, or edit vault material.

Use [Overview output schema](assets/overview-schema.yaml) for machine-facing or embedded output.

## Hard Rules

- MUST resolve vault identity from `assets/vault-registry.yaml`.
- MUST NOT hardcode a vault path outside the registry.
- MUST NOT scan, enumerate, grep, index, or infer the vault to fill missing configuration.
- MUST NOT invent an unconfigured root, template, folder, tag, or frontmatter field.
- MUST preserve configured spelling and casing exactly.
- MUST treat `null` roots and templates as explicitly unconfigured.
- MUST return a configuration error when a caller requires an unconfigured value.
- MUST distinguish configured topology from filesystem existence. Registry presence does not prove
  that a path currently exists on disk.
- MUST NOT read memory content, zettel content, note bodies, or arbitrary vault files.
- MUST NOT create, edit, move, rename, or delete any vault file.
- MUST NOT mutate counters, registries, frontmatter, Graph View state, or Git.
- MUST NOT transmit decrypted vault content.

## Workflow

### 1. Resolve Vault

Read `default_vault` and `vaults` from the registry.

If `{vault-id}` is omitted, use `default_vault`.

Reject an unknown vault identifier.

### 2. Build Normalized Descriptor

Map the registry entry into `ObsidianVaultOverview/v1` using
`assets/overview-schema.yaml`.

The descriptor exposes:

- vault identity and type;
- `vault_root`;
- relative `config_root`;
- top-level structure;
- named roots;
- root groups such as `all_zettel_roots`;
- template registry;
- content-model conventions;
- safety constraints;
- known submodule boundaries.

Do not add values that are absent from the registry.

### 3. Resolve Requested Section or Selector

For a human overview, render only the requested section or the compact full overview.

For `resolve`, follow `references/resolution.md` and return the machine-facing descriptor.

### 4. Report Configuration Gaps

If a requested root/template is `null`, report it as unconfigured.

Never convert `null` into a guessed path.

## Inter-Skill Contract

Consumer skills should depend on the normalized descriptor, not on this registry's current vault
names or paths.

A consumer may say:

> resolve the active/default vault and return `ObsidianVaultOverview/v1`

It should then use fields such as:

- `vault_root`
- `config_root`
- `named_roots`
- `root_groups`
- `templates`
- `top_level`
- `safety`

If the descriptor lacks a required field, the consumer fails closed rather than discovering a
replacement.

## Completion

A successful overview means configuration was resolved and described.

It does not mean:

- paths were checked on disk;
- templates were read;
- vault contents were searched;
- Obsidian was opened;
- any mutation occurred.
