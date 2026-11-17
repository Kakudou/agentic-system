---
name: 10-rpg-session
description: "Start, record, checkpoint and resume solo RPG runs and full campaigns using only agent-directed Markdown reads/writes; no scripts for RPG state; only the authorized native dice plugin is executable."
metadata:
  version: "2.0.0"
  opencode/slash: "true"
---

# RPG session lifecycle — Markdown only

`/10-rpg-session {start|resume|checkpoint|end} {folder or existing character}`

**Everything is carried out by agents through their existing host Markdown file reading/writing capabilities.** No Python, JS, shell script, dice service, SQLite, RPG plugin or external HTTP request is needed. Read [session file schema and operations](references/session-layout.md) and copy/adapt `assets/*.md` templates. A model is not an OS transaction manager: agents must verify writes by reopening files, and never claim stronger atomicity than their file tools actually provide. An agent cannot create filesystem state if the host gives it no write permission.

## Start

1. Establish game (`shadowrun-6e` or `cypher-system`), adventure scale (single run or campaign), character source, player tone/boundaries and narrative point of view. Defaults: solo if alone, fiction first, official rules with manual player dice, no forced party or character recreation.
2. Choose one **active** rules family and load its local reference files only. Do not merge the systems.
3. Copy source character details into a **session-owned Markdown copy**; keep original untouched and mark unverified fields unknown. Prefer existing sheet over generic archetype.
4. Ask for/choose an unused session folder; prepare `session.md`, `events.md`, `state.md`, `characters/player.md`, `characters/npcs.md`, `mechanics.md`, `rules-rulings.md`, `gm-private.md`, `chronicle.md`, `recap.md`. A run may later become one episode under a campaign.
5. Author opening situation with at least two reasonable approaches; write **E-0001** as opening fact with record of player/GM exchange, then refresh `state.md`; verify every file exists and re-read its last event ID before reporting `saved`.
6. Begin in-world, with the designated sole player-facing narrator. A campaign outline is not required.

## Turn and persistence

Every played exchange is logged exactly under `events.md` by a single authorized writer. Uncertain actions require pre-roll options and a **`rpg_dice` native plugin receipt** or a player-provided die face list; never infer random faces. Append mechanic receipts in `mechanics.md` only from actual input/evidence. Commit confirmed in-world changes to `events.md` before updating derived sheet, state, recap and literary chronicle. Verify on-disk writes by reading back when supported. If a write fails, mark `PENDING WRITE`, do not advance the committed `last_event_id`, and report an unsaved checkpoint in plain Markdown.

## Pause, resume, end

- **Checkpoint**: append a checkpoint event, update `state.md` and `recap.md`, record unresolved actions, NPC motives, current danger, and last verified event ID. Don't publish private GM knowledge to players.
- **Resume**: load `session.md`, the last verified event and recaps, current character copy, mechanics receipts and private world state; reconcile with ordered events. Never infer a death, loot item or choice from literary prose.
- **End**: close the run, document consequences and tentative rewards. Imported external campaigns do not receive direct edits without explicit permission.

**No writable host?** Output each needed Markdown section as `NOT PERSISTED` for user copy and do not claim the run saved. In-fiction speech is not authorization to mutate files outside the established session directory.

