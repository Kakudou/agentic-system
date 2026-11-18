# Progression record protocol

## Layout

```text
CharacterProgression/            # record root (default: beside the run folders)
  README.md                      # from assets/README.md
  <Character_Name>/
    sheet.md                     # current sheet (replaced on apply)
    inventory.md                 # current money, gear, implants, lifestyle (replaced on apply)
    status.md                    # current persistent status (replaced on apply)
    progression.md               # append-only history of P-#### entries
    <game-id>/                   # only if the character is played in a second game
```

`sheet.md` begins with a comment naming the read-only baseline and stating that it changes only through approved debriefs.

## Session links

At import, write the same line in the run's `characters/player.md` and `session.md`:

```markdown
- Progression record: ../CharacterProgression/<Character_Name>/ @ P-0003
```

`@ P-0003` is the last entry present when the run imported. It is the version the run started from.

## Change grammar

Write each proposed change as one line with its evidence:

```markdown
- currency: +2,000¥ (delivery fee) — E-0014
- currency: −50¥ (fence) — E-0010
- karma: +6 awarded — E-0015 (real GM approved)
- gear: + datashard (empty) — E-0014
- gear: − zombie commlink (left with an NPC) — E-0012
- injury: none persisting — E-0013 graceful logoff
- contact: Juno Voss loyalty 2 → 2 (unchanged) — E-0014
- reputation: + quiet reliable decker (local fixer circle) — E-0014
- advancement: Perception 2 → 3 (cost per active rules) — player choice, debrief
- run: + Run 001 completed — E-0014
```

Use `+` / `−` for amounts and items, `old → new` only for ratings. A change that cannot cite a committed event or receipt is not proposed; flag it as an open decision instead.

Transient items are listed separately under **stays in the run** and never applied.

## P-entry format

```markdown
## P-0004 — <date> — Debrief: <run name> (imported @ P-0003)
- Approved:
  - currency: +2,000¥ — E-0014
  - karma: +6 — E-0015
- Declined:
  - gear: + armor jacket upgrade — player declined
- Record version at apply: P-0003 (unchanged since import)
- Files replaced: sheet.md, inventory.md, status.md — verified by re-read
- Run event: E-0016 in <run folder>/events.md
```

If the record advanced since import, write `Record version at apply: P-0005 (advanced from P-0003; rebased on P-0004, P-0005)` and list any conflict and how the player resolved it.

## Version check (apply)

1. Re-read `progression.md`; take the latest entry ID.
2. Compare it with the run's `@ P-####`.
3. Same: apply the approved changes to the current files.
4. Advanced: show the newer entries to the player, apply the approved changes to the **current** files, never to the run's copy. Stop on conflict:
   - a spend of currency or gear the record no longer holds;
   - a rating changed by both runs from different starting values;
   - an item marked lost in one run and used in the other.
5. Append the entry, replace the current-state files, re-read all four files, then record the entry ID as an event in the run.

## Failure

- Partial write: mark the entry `PENDING WRITE`, list the files actually changed, and leave the run's event unwritten until the record verifies.
- No writable host: give the player the debrief and the entry labelled `NOT PERSISTED`.
