---
name: 03-kb-obsidian-graph-search
description: "Configure an Obsidian Graph View by changing only requested search, color, force, display, or bounded UI fields in the vault's existing graph.json. Use a supplied/configured vault descriptor to resolve paths and semantic roots, preview the exact field changes, require explicit approval before mutation, preserve all untouched values, then write and verify the JSON."
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Obsidian Graph Search

Configure the existing Obsidian Graph View `graph.json` without knowing vault topology of your own.

This skill changes Graph View configuration. It does not search the vault for knowledge or discover missing topology.

## Usage

- `/03-kb-obsidian-graph-search search "{query}"`
- `/03-kb-obsidian-graph-search {vault-id} search "{query}"`
- `/03-kb-obsidian-graph-search reset-search`
- `/03-kb-obsidian-graph-search colors ...`
- `/03-kb-obsidian-graph-search display ...`
- `/03-kb-obsidian-graph-search forces ...`

## Vault Configuration Input

Require a trusted vault descriptor that provides `vault_root`, `config_root`, and any semantic root/group selector used by the request.

When `03-kb-obsidian-vault-overview` is installed, it is the preferred local source of that descriptor. A caller may instead supply an equivalent descriptor. If required configuration is unavailable, stop. Never fall back to remembered paths or filesystem discovery.

## Load Order

During inspection/proposal:

- [vault configuration](references/vault-configuration.md)
- [graph field contract](references/graph-fields.md)
- [graph query construction](references/graph-query.md)
- [proposal and mutation boundary](references/proposal-and-inventory.md)

Use [graph color palette](assets/graph-color-palette.yaml) only when color groups are requested.

Before mutation and delivery read [validation](references/validation.md).

## Hard Rules

- Resolve the target as `<vault_root>/<config_root>/graph.json` from the trusted vault descriptor.
- Ensure the normalized target remains beneath `vault_root`.
- Require the existing target to be a regular JSON file; do not create an Obsidian config directory or invent a new graph schema.
- Parse current JSON before proposing changes.
- Treat current `graph.json` as the schema authority for fields not explicitly defined by this skill.
- Change only fields explicitly requested or semantically required by the approved request.
- Preserve every untouched field/value.
- Never crawl the vault to invent search terms, tags, colors, folders, or groups.
- Resolve semantic roots/groups only from the supplied/configured descriptor.
- Require explicit user approval of the exact proposed changes before writing.
- After approval, apply only the approved field changes. Material proposal changes require a new approval.
- Do not use temporary files, Git, or unrelated vault mutation as part of this operation.
- Verify the written file by reading/parsing it after mutation.
- Never claim mutation success from a preview or approval alone.

## Workflow

### 1. Resolve the Vault and Target

Obtain the required semantic fields from the trusted vault descriptor. Use `03-kb-obsidian-vault-overview` when available locally; otherwise use the equivalent caller-supplied configuration.

Resolve:

`graph.json = vault_root / config_root / "graph.json"`

Read [vault configuration](references/vault-configuration.md).

### 2. Read Current Graph Configuration

Read only the exact target file.

Parse it as JSON. If parsing fails, stop and report the malformed current configuration rather than overwriting it.

### 3. Build the Requested Change

Use [graph field contract](references/graph-fields.md) and [graph query construction](references/graph-query.md).

Construct a complete proposed JSON object by copying the current object and changing only approved fields.

For semantic path selectors, resolve them through the descriptor before converting them to Obsidian `path:` queries.

### 4. Preview and Approve

Show a concise exact field-level diff:

- field;
- previous value;
- proposed value;
- any semantic selector resolution used;
- confirmation that untouched fields are preserved.

Do not write yet.

Require explicit approval before mutation.

### 5. Apply

Immediately before writing, re-read the target and ensure the relevant current state still matches the state used to produce the approved proposal.

If it changed, stop and rebuild the proposal rather than overwriting newer state.

Write the approved complete JSON object to the same target.

### 6. Verify

Read the target back and verify:

- JSON parses;
- requested fields equal approved values;
- untouched fields remain unchanged from the approved pre-write state;
- no unapproved field changed.

Use [validation](references/validation.md).

### 7. Deliver

Report:

- resolved vault ID;
- target path;
- changed fields;
- verification result;
- any blocked/unconfigured selector;
- reminder to reopen/reload Graph View when needed to observe the new configuration.

Do not require a versioned proposal/receipt schema for orchestration.
