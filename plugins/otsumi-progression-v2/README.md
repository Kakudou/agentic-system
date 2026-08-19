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

Per-session execution diagnostics are deliberately volatile. They include the resolved agent/mode, whether an input is tracked, the input character count (never its text), execution generation, meaningful-work/gadget flags, and the last observed lifecycle event/time. They are cleared when the plugin unloads and are never written into progression state.

## Default scoring

Per eligible primary-agent user input, at most:

- `+1` interaction XP;
- `+1` successful-completion XP;
- `+3` effective-work XP when at least one meaningful tool/delegated-work action succeeds.

Retries can earn only components not already awarded to the same input. The component ledger is durable and is not evicted, so plugin restarts and old retries cannot silently re-enable XP. It stores only stable inbox/provider-message IDs or privacy-safe SHA-256 keys plus award booleans—never user text. Skill loading, TencentDB tools, progression bookkeeping, and work performed only for a `97-gadget-*` appendix do not create the effective-work bonus.

The public `session.inbox.*` lifecycle path remains authoritative when available. On every pre-model context hook, the plugin also reconciles the current runtime input from the mode-router request identity and the latest provider user message. This fallback repairs turns whose inbox event was missed by this plugin, while stable message IDs (or deterministic privacy-safe hashes when no ID exists) preserve continuation/reload deduplication.

Child/non-primary-agent sessions and modes outside `eligibleModes` receive no awards. Non-user inbox work clears the prior user award context. A `97-gadget-*` appendix cannot turn its own retrieval or delegation into effective-work XP.

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

## `/otsumi` command

The plugin registers a read-only slash controller through `command.transform`:

```text
/otsumi
/otsumi status
```

Both forms render a GameMaster/PNJ character sheet containing:

- level, lifetime XP, next threshold, and current-level progress;
- all activity counters;
- the pending evolution, current proposal, and rejected/reconsidered proposals;
- recent completed evolution history;
- durable award-ledger entry count, schema version, and state path;
- configured primary agent and eligible modes;
- tracked runtime-session count and current-session diagnostics.

Unknown actions return an explicit error. The context hook replaces the command marker prompt with the already-computed result and appends an exact-result/no-tools instruction without changing `event.tools`.

`/otsumi` is a slash control turn, so the response-gadget runtime suppresses ambient gadgets through its normal slash-command rule. The progression runtime also marks the input XP-neutral: success, interruption, lifecycle reordering, or continuation cannot add interaction, completion, effective-work, interrupted, or ledger state. Reading the sheet does not deliver a pending-evolution announcement or otherwise mutate durable state.

## Beta API seam

The project targets the shipped OpenCode V2 beta one-object `Tool.Info` transform shape (`tools.add(definition)`), with registration flags such as `codemode` nested under `definition.options`. `/otsumi` uses `command.transform`. Model-request injection, command rendering, and input reconciliation use the V2 `context` hook, the current mutable pre-model hook.

Run the focused progression tests with:

```bash
node --test plugins/otsumi-progression-v2/test/*.test.js
```

Run the runtime scenario with:

```bash
node plugins/otsumi-progression-v2/test-runtime.mjs
```

Run both as a combined local suite with:

```bash
node --test plugins/otsumi-progression-v2/test/*.test.js && \
  node plugins/otsumi-progression-v2/test-runtime.mjs
```
