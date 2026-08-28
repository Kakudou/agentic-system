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

Retries can earn only components not already awarded to the same input. The component ledger is durable and is not evicted, so plugin restarts and old retries cannot silently re-enable XP. It stores only stable inbox/provider-message IDs or privacy-safe SHA-256 keys plus award booleans—never user text. Skill loading, host RNG rolls (`otsumi_rng`), TencentDB tools, progression bookkeeping, and work performed only for a `97-gadget-*` appendix do not create the effective-work bonus.

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

The store is convergence-safe across instances: it re-reads the state file before every read and write, and merges the durable award ledger, XP, counters, level, and evolution state monotonically (union of per-input components; max of totals). Multiple OpenCode server processes sharing the default state path therefore converge to the union of their grants instead of one silently clobbering the other. A concurrent in-flight write from another process is an edge case; the ledger merge recovers it on the next write from an instance that observed the grant.

The evolution slot carries three additive announcement-lifecycle fields. A fresh unlock writes `announcementDelivered: false` alongside `announcedAt: null` (ISO timestamp) and `announcementInFlight: null` (advisory `{sessionID, at}` marker); state written before the feature may omit the keys entirely, and that is the normal unconfirmed shape. Across instances the fields merge monotonically with the rest of the pending state: `announcementDelivered` is the OR of both sides, `announcedAt` is the surviving string value (disk first, then memory; absent when neither survives), and `announcementInFlight` is advisory with the later `at` winning (disk wins ties). Malformed values of the new fields—wrong types or a missing `at`—read as absent/unconfirmed and never crash, and the one-side-only pending rules are unchanged.

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
- the pending evolution, current proposal, and rejected/reconsidered proposals, with an honest announcement line—confirmed (with `announcedAt`), in-flight (with session and since), or pending when unconfirmed (including legacy);
- recent completed evolution history;
- durable award-ledger entry count, schema version, and state path;
- configured primary agent and eligible modes;
- tracked runtime-session count and current-session diagnostics.

Unknown actions return an explicit error. The context hook replaces the command marker prompt with the already-computed result and appends an exact-result/no-tools instruction without changing `event.tools`.

`/otsumi` is a slash control turn, so the response-gadget runtime suppresses ambient gadgets through its normal slash-command rule. The progression runtime also marks the input XP-neutral: success, interruption, lifecycle reordering, or continuation cannot add interaction, completion, effective-work, interrupted, or ledger state. Reading the sheet does not deliver a pending-evolution announcement or otherwise mutate durable state.

## Evolution announcement lifecycle

A pending level-up is announced through the pre-model directive, and the durable state tracks that announcement across session executions so it is announced once, confirmed once, and never silently lost.

The announcement counts as confirmed only when `announcementDelivered === true` and `announcedAt` is a string. `announcementDelivered` alone is unconfirmed, including legacy state written before `announcedAt` existed.

`announcementDelivered` means the announcing execution succeeded, not that a directive was injected. Injection marks `announcementInFlight`—a level-scoped, advisory `{sessionID, at}` marker—and never sets `delivered`. Within the automatic lifecycle, confirmation happens only on `session.execution.succeeded` of the in-flight session: `delivered` becomes true, `announcedAt` is stamped, and the in-flight marker is cleared. `session.execution.interrupted`, `session.execution.failed`, and `session.error` of the in-flight session roll back instead (in-flight cleared, `delivered` untouched) on the instance holding the binding—its in-memory snapshot skip means an instance whose memory predates the binding ignores the event—and either way the next eligible request rebinds the marker; re-injecting over an orphaned in-flight marker from another session logs an orphan-rebind. A recorded rejection likewise marks the announcement confirmed (`announcedAt` stamped when absent), because the user has already seen the proposal. The marker is advisory: it may outlive confirmation until the bound session's next failure-class terminal event (interrupted, failed, or `session.error`) or until the pending evolution resolves—reachable via a rejection recorded while the marker is in flight, or a cross-instance `succeeded` that the instance already reads as confirmed.

While a pending evolution has no locked proposal and the announcement is confirmed, every eligible top-level request carries a directive mandating that the evolution choice be made and recorded in the same turn—there is no "natural breakpoint" deferment—and the directive re-injects until a proposal exists. While a proposal exists, the announcement lifecycle is frozen: no re-announce injection occurs (a still-present in-flight marker still finalizes on that session's `succeeded`), and the proposal-pending directive is injected instead.

A state with `announcementDelivered: true` but no `announcedAt` (the pre-feature shape) self-heals without manual surgery: it reads as unconfirmed, is re-announced on the next eligible request, and confirms on that session's `succeeded` through the same code path as a fresh unlock.

Directive injection is top-level-only: it is skipped for child sessions (a non-empty OpenCode V2 `Session.Info.parentID`—subagent children (and forks when they carry a parentID)) and fails closed for the one dispatch when the session lookup fails; the announcement simply re-injects on the next eligible top-level request. The gate affects injection only; state mutation (XP awards and terminal-event confirmation/rollback) is unaffected.

The pre-model hook's slash-command path retains its pre-existing behavior: `/otsumi` turns never receive an announcement directive (see the `/otsumi` command section above).

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

Equivalent from the plugin directory: `npm test`.
