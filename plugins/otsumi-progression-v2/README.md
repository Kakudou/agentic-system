# Ōtsumi Progression V2

OpenCode V2 beta runtime plugin for Ōtsumi's RPG-like progression loop.

## Ownership

This plugin owns only durable game state:

- XP;
- level;
- activity counters;
- per-inbox award-component IDs and booleans;
- one unresolved evolution slot;
- the current evolution proposal;
- rejected/reconsidered proposals;
- completed evolution history.

It does not implement evolutions, grant permissions, replace TencentDB memory, or write Obsidian knowledge.

## Default scoring

Per primary-agent user inbox item, at most:

- `+1` interaction XP;
- `+1` successful-completion XP;
- `+3` effective-work XP when at least one meaningful tool/delegated-work action succeeds.

Retries can earn only components not already awarded to the same inbox input. The component ledger is durable and is not evicted, so plugin restarts and old inbox retries cannot silently re-enable XP. It stores only inbox-derived IDs and award booleans, never user text. Skill loading, TencentDB tools, progression bookkeeping, and work performed only for a `97-gadget-*` appendix do not create the effective-work bonus.

The first level requires 40 lifetime XP. Each subsequent per-level requirement is multiplied by `1.25` and rounded.

## State

Default state path:

```text
$XDG_STATE_HOME/opencode/otsumi-progression-v2/otsumi.json
```

When `XDG_STATE_HOME` is unset:

```text
~/.local/state/opencode/otsumi-progression-v2/otsumi.json
```

Writes use a temporary sibling file followed by rename.

## Options

When explicitly configuring the plugin, options may override:

```json
{
  "primaryAgent": "osho",
  "eligibleModes": ["dev", "dev-python", "video-edit"],
  "requireModeRouter": true,
  "stateFile": "~/.local/state/opencode/otsumi-progression-v2/otsumi.json",
  "historyLimit": 12,
  "xp": {
    "interaction": 1,
    "completion": 1,
    "effectiveWork": 3,
    "firstLevel": 40,
    "growth": 1.25
  }
}
```

With the repository's normal `plugins/` discovery/symlink setup, explicit configuration is unnecessary unless overriding defaults.

## Tools

- `otsumi_progression_status` — read the character sheet.
- `otsumi_progression_propose` — record one chosen evolution; no implementation authorization.
- `otsumi_progression_reject` — reject/reconsider the proposal while keeping the level slot.
- `otsumi_progression_complete` — record an explicitly approved, actually implemented, verified evolution.

All four tools fail closed unless the tool execution context resolves to the configured primary agent.

## Beta API seam

The project targets the shipped OpenCode V2 beta one-object `Tool.Info` transform shape (`tools.add(definition)`), with registration flags such as `codemode` nested under `definition.options`. Model-request injection uses the V2 `context` hook, the current mutable pre-model hook.

Run the local regression test with:

```bash
node plugins/otsumi-progression-v2/test-runtime.mjs
```
