---
name: 10-rpg-progression
description: "Keep a character's canonical cross-run record (sheet, inventory, status, append-only progression log) and update it only at the end of a run, through a player-approved debrief of what happened and what to keep. Markdown only; game-agnostic; safe when runs are played in parallel."
metadata:
  version: "1.0.0"
  opencode/slash: "true"
---

# Character progression across runs — Markdown only

`/10-rpg-progression {init|import|debrief|apply|status} {character or run folder}`

Read the [record protocol](references/record-protocol.md) for file formats, the change grammar and the version check. Copy record templates from `assets/`. Everything is ordinary Markdown reads and writes; verify every write by reading it back.

## Three tiers of authority

1. **Original baseline** — the sheet as the player created it. Read-only, forever; never the working sheet again.
2. **Canonical record** — `<record root>/<character>/` with `sheet.md`, `inventory.md`, `status.md` (current state, replaced on update) and `progression.md` (append-only `P-####` entries). Default record root: a `CharacterProgression/` folder beside the run folders; the player may name another. New runs import from here.
3. **Run session copy** — `characters/player.md` in the run folder. Everything that changes during a run stays here and in the run's event log.

## When the record changes

**Only at the end of a run, in the debrief.** Mid-run rewards, purchases, injuries and spends live in the session copy and the event log until then. A run that has not ended never writes to the record.

## Operations

- **init** — create the record from the baseline: copy the sheet verbatim, derive inventory and status, mark unknown values `unknown`, append `P-0001 — Baseline import`. Create the record-root README from `assets/README.md` if missing.
- **import** — at run start, copy the current record into the run's session copy, and note `Progression record: <path> @ P-####` (the last entry ID) in the session copy and the session contract. Without a record, import from the baseline and offer **init**.
- **debrief** — at run end, build a debrief from committed events, mechanics receipts and the session copy (never from chronicle prose):
  - **what happened:** a short recap with event IDs;
  - **what to keep:** proposed permanent changes as **changes, not snapshots**, each citing its events or receipts — currency, Karma/XP awarded or spent, gear gained, lost or consumed, lasting injuries or conditions, contacts and relationships, persistent reputation or heat, advancement chosen under the active game's rules, the completed run;
  - **what stays in the run:** transient state that does not persist (wounds healed before the end, temporary heat, one-off scene items, expired effects);
  - **open decisions:** rewards offered but not chosen, contested values, anything needing the real GM.

  Present the debrief to the player. It writes nothing.
- **apply** — only after the player explicitly approves each change (and the real GM, for shared-campaign characters or rewards). Re-read the record and run the version check (below). Append one `P-####` entry listing the approved changes, the declined ones and the source run, then replace `sheet.md`, `inventory.md` and `status.md` with the new current state. Re-read every file, then record the applied entry ID as an event in the run's `events.md`.
- **status** — summarize the current record and its latest entries; report unknowns as unknown.

## Runs played in parallel

Two runs can import the same record and end at different times. On **apply**, compare the record's latest entry ID with the one the run imported:

- **same** — apply the approved changes;
- **advanced** — another run's debrief landed first: show its entries, apply this run's changes **on top of the current record** (never the run's stale copy), and stop on any conflict — the same item or value changed incompatibly, a spend of money or gear that no longer exists — until the player resolves it.

The record is never overwritten with a session copy.

## Rules

- Every change cites committed evidence; no plausible filler.
- Each change applies once; a declined change is recorded as declined, not applied.
- Advancement costs and options come from the active game's rules; the player chooses.
- One rules family per record. A character played in another game gets a per-game subfolder; statistics are never converted between systems.
- An imported external or shared-campaign character is recorded only with the authority that owns it.
- If a write fails, mark the entry `PENDING WRITE`, say exactly which files changed, and do not report the record as updated.
- No writable host: output the debrief and the `P-####` entry as `NOT PERSISTED` for the player to keep.
