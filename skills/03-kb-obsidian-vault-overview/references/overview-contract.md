# ObsidianVaultOverview/v1 Contract

`ObsidianVaultOverview/v1` is a normalized, read-only configuration descriptor.

## Required Top-Level Fields

- `kind`: literal `ObsidianVaultOverview/v1`
- `version`: literal `v1`
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

## Semantics

### `vault_root`

Absolute configured root of the Obsidian vault.

It is configuration, not proof of current filesystem existence.

### `config_root`

Vault-relative path to Obsidian configuration, normally `.obsidian/`.

Consumers must resolve it beneath `vault_root`; they must not treat it as an arbitrary external
path.

### `top_level`

Configured human description of the vault's top-level information architecture.

Folder names and descriptions are authoritative configuration strings. Do not normalize spelling.

### `named_roots`

Mapping from stable semantic identifiers to absolute configured roots or `null`.

A `null` value means unconfigured, not absent, optional-to-guess, or discoverable.

### `root_groups`

Named groups composed from configured roots.

A group member references a key from `named_roots`; consumers resolve the members individually.

### `templates`

Mapping from semantic template identifiers to vault-relative template paths or `null`.

A non-null template path is still only configured location. A consumer that needs its contents must
read that literal file under its own permissions.

### `conventions`

Stable vault-model facts that help consumer skills reason without re-embedding the old system
contract.

### `safety`

Vault-wide boundaries that consumer skills must preserve.

## Consumer Rule

Consumers may narrow this contract for their own task, but they may not silently broaden it by
scanning the vault for information the overview does not provide.
