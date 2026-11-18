# Character progression records

Cross-run, cross-game persistent character records.

Run folders live only with their run. This folder keeps what a character **is** between runs: the current sheet, current inventory, persistent status, and an append-only trail of every permanent change.

## Authority

1. **Original baseline** — the sheet as created. Read-only, forever.
2. **This folder** (`<character>/`) — the canonical current record. New runs import from here.
3. **Run session copies** (`<run>/characters/player.md`) — per-run working copies. In-run changes stay there.

## Update rules

- The record changes **only at the end of a run**, through a debrief the player approves.
- `progression.md` is append-only: every update is a `P-####` entry with date, source run, approved and declined changes.
- `sheet.md`, `inventory.md` and `status.md` are replaced with the new current state; history lives in `progression.md`.
- Changes are applied as changes (`+2,000¥`, `+6 Karma`), never by copying a run's sheet over the record, so runs played in parallel cannot overwrite each other.
- Transient in-run state (wounds healed before the end, temporary heat, one-off items) never comes here.

## Multiple games

One rules family per record. A character played in another game gets a per-game subfolder; statistics are never converted between systems.
