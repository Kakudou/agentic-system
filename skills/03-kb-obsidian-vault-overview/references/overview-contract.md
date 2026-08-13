# Vault Overview Contract

The overview is a normalized, read-only configuration descriptor.

## Semantic Fields

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

No `kind`, protocol version, caller, or routing field is required. Consumers should request the semantic data they actually need.

## Semantics

### `vault_root`

Absolute configured root of the Obsidian vault. Configuration is not proof of current filesystem existence.

### `config_root`

Vault-relative path to Obsidian configuration. Resolve it beneath `vault_root`; never treat it as an arbitrary external path.

### `top_level`

Configured human description of the vault's top-level information architecture. Preserve folder names and spelling exactly.

### `named_roots`

Mapping from stable semantic identifiers to absolute configured roots or `null`.

`null` means unconfigured, not discoverable or safe to guess.

### `root_groups`

Named groups composed from configured root identifiers. Resolve group members through `named_roots`.

### `templates`

Mapping from semantic template identifiers to vault-relative paths or `null`.

A configured path does not imply its file has been read or exists; a consumer that needs contents must read that exact resolved file under its own permissions.

### `conventions`

Stable vault-model facts intended for reuse by consumers.

### `safety`

Vault-wide boundaries that consumers must preserve.

## Consumer Rule

Consumers may narrow the descriptor to their task, but must not broaden missing configuration through filesystem discovery.
