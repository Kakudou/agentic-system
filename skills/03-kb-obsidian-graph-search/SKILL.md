---
name: 03-kb-obsidian-graph-search
description: "Prepare, validate, and formally apply a closed Obsidian Graph View search/filter and visual configuration for any vault resolved through 03-kb-obsidian-vault-overview. Uses the normalized ObsidianVaultOverview/v1 contract instead of hardcoded vault paths. Kyōsha owns read-only proposal and preflight; Ōshō owns activation approval; Fuhyō may execute only the approved exact-byte manifest."
metadata:
  version: 1.0
  opencode/slash: "true"
---

# KB Obsidian Graph Search

Configure the existing Obsidian Graph View `graph.json` for a vault resolved through
`03-kb-obsidian-vault-overview`.

This skill owns the Graph View search/filter lens and its immediate visual configuration. It does not
retrieve knowledge from the vault and knows no vault topology of its own.

## Usage

- `/03-kb-obsidian-graph-search search "{query}"`
- `/03-kb-obsidian-graph-search {vault-id} search "{query}"`
- `/03-kb-obsidian-graph-search reset-search`
- `/03-kb-obsidian-graph-search colors ...`
- `/03-kb-obsidian-graph-search display ...`
- `/03-kb-obsidian-graph-search forces ...`

When `{vault-id}` is omitted, resolve the overview's configured default vault.

## Dependency

`03-kb-obsidian-vault-overview` is mandatory.

Kyōsha MUST obtain a valid `ObsidianVaultOverview/v1` descriptor before inspecting `graph.json`.

If the overview is unavailable, unknown, invalid, or lacks a required configured value, fail closed.

Never fall back to hardcoded paths, vault discovery, directory enumeration, or remembered topology.

## Roles

**Kyōsha** owns vault-overview resolution, proposal, bounded inventory, `graph.json` inspection,
query/field reasoning, final-byte construction, JSON validation, exact diff, and formal preflight.

**Ōshō** owns presentation of the exact activation record and approval message.

**Fuhyō** owns execution only after valid activation approval and one-time claim.

## Load Order

During proposal:

- invoke `03-kb-obsidian-vault-overview resolve {vault-id|default}`;
- read [Vault overview integration](references/vault-overview-integration.md);
- read [Graph field contract](references/graph-fields.md);
- read [Graph query construction](references/graph-query.md);
- read [Proposal and inventory](references/proposal-and-inventory.md).

When colors are requested, use [Graph color palette](assets/graph-color-palette.yaml).

Before proposal publication or terminal reporting, read [Validation](references/validation.md).

Use [Proposal schema](assets/graph-proposal-schema.yaml).

## Hard Rules

- MUST resolve `vault_root` and `config_root` from `ObsidianVaultOverview/v1`.
- MUST derive the literal target as `<vault_root>/<config_root>/graph.json`.
- MUST ensure `config_root` resolves beneath `vault_root`.
- MUST NOT contain a vault-specific path, root name, template path, folder taxonomy, or default vault.
- MUST confirm Graph View is closed before a writable proposal proceeds.
- MUST inspect the existing literal `graph.json`.
- MUST preserve every untouched JSON value.
- MUST build and validate complete final JSON before preflight.
- MUST present exact changed fields and exact diff before activation.
- MUST close the candidate inventory before preflight.
- MUST NOT scan or enumerate the vault.
- MUST NOT infer folders, tags, templates, note types, or groups from vault discovery.
- MUST NOT create directories, files, backups, temporary files, or alternate targets.
- MUST NOT write during proposal or preflight.
- MUST NOT execute Git.
- MUST reject malformed JSON, missing targets, open Graph View, unsafe overview resolution, unbounded
  requests, or requests exceeding formal limits.
- No proposal, diff, confirmation, summary, or displayed choice authorizes execution.

## Semantic Resolution

Graph requests may refer to semantic vault selectors supplied by the overview.

Examples:

- named root `zettel_root`;
- root group `all_zettel_roots`;
- top-level folder configured by the overview;
- configured template name when the request explicitly concerns that literal file.

Kyōsha resolves these only through the overview contract and
`references/vault-overview-integration.md`.

Unknown or unconfigured selectors fail closed.

## Proposal Surface

The proposal may change only fields allowed by `references/graph-fields.md`.

- `search "{query}"` sets literal Graph View `search`.
- `reset-search` sets `search` to the empty string.
- `colors` replaces complete `colorGroups` from explicit user groups or already bounded,
  overview-resolved evidence.
- `forces` changes explicitly requested supported force fields.
- `display` changes explicitly requested supported display/filter fields.

UI-state fields are out of scope unless explicitly requested and permitted.

## Proposal Workflow

### 1. Resolve Vault Overview

Kyōsha obtains `ObsidianVaultOverview/v1`.

Resolve:

- `vault_root`;
- `config_root`;
- semantic selectors needed by this request;
- relevant safety constraints.

No filesystem discovery substitutes for missing overview configuration.

### 2. Resolve Literal Target

Construct the literal existing Graph View target beneath the resolved vault:

`<vault_root>/<config_root>/graph.json`

Confirm lexical containment and Graph View closure.

### 3. Inspect Bounded Evidence

Kyōsha may read only:

- the literal resolved `graph.json`;
- literal template files explicitly resolved from the overview and required by the proposal;
- this skill's references/assets;
- the exact overview descriptor used by the proposal.

No vault scan is allowed.

### 4. Build Complete Proposal

Kyōsha:

1. parses current `graph.json`;
2. validates current JSON;
3. applies only requested supported changes;
4. preserves untouched values;
5. serializes complete final bytes;
6. validates final JSON;
7. computes exact diff;
8. closes finite ordered candidates.

### 5. Publish Proposal

Return `assets/graph-proposal-schema.yaml`.

State explicitly that execution has not occurred.

## Formal Bounded-Workflow Kernel

This remains in `SKILL.md` because the central formal preflight binds the published skill contract.

The central formal protocol is authoritative. Any primitive, capability, lifecycle, or exception not
defined there is rejected.

### Closed Preflight

Kyōsha performs read-only `FormalWorkflowPreflight/v1` only after proposal and inventory closure.

Preflight MUST bind:

- complete byte snapshot and JCS SHA-256 hash of this literal `SKILL.md` as `skill_contract`;
- 1-16 ordered input candidates;
- 0-4 ordered output candidates;
- complete byte-state objects and JCS SHA-256 hashes for every candidate;
- a 1-12 step ordered manifest;
- actions restricted exactly to:
  - `read_exact_bytes`
  - `write_exact_bytes`
  - `move_exact_bytes`
- exact literal paths, candidate references, arguments, output preconditions, complete final byte
  states, final hashes, success checks, and evidence requirements.

The resolved existing `graph.json`, when changed, is a closed input/output candidate:

- pre-effect state is bound to input snapshot;
- current bytes are bound to output precondition;
- complete replacement bytes are bound as final state.

Any overview descriptor, template, or proposal resource read by the formal manifest must already be
a closed input candidate.

`SKILL.md` is the fixed `skill_contract`, not an I/O candidate.

Nothing may be added, derived, selected, or changed after preflight. Exceeding formal limits requires
a fresh proposal.

### Activation and Claim

Ōshō may present only the exact central `FormalWorkflowActivation/v1` record and required approval
message.

Execution requires:

1. exact serialized user approval for that activation ID;
2. approval inside its valid UTC window;
3. one-time conversation-local claim from `unused` to `consumed`.

Missing, altered, expired, or consumed activation records fail closed.

### Exact-Byte Execution

After valid claim, Fuhyō may execute only the approved manifest in order.

Allowed primitives:

- `read_exact_bytes`
- `write_exact_bytes`
- `move_exact_bytes`

Fuhyō MUST NOT scan, enumerate, resolve new paths, inspect undeclared files, create directories or
temporary files, use generic writes, invoke commands/tests, parse or format JSON, branch, loop,
retry, reorder, resume, select strategy, authenticate, communicate externally, or use Git.

Before each write or move, the declared contiguous recheck block must read:

- bound `SKILL.md`;
- referenced inputs;
- every affected output precondition.

After each effect, declared reads must verify every written output's complete final state and hash
before success evidence is emitted.

Any mismatch or interruption is terminal. The claim is never released. Another attempt requires a
new proposal, preflight, activation, approval, and claim.

### Receipt

The only successful terminal execution record is `FormalWorkflowReceipt/v1`.

It may report only evidence actually produced by the approved manifest.

## Completion

After successful write, remind the controller to tell the user to reopen Graph View.

Never claim configuration success from proposal, preflight, activation, or approval alone.
