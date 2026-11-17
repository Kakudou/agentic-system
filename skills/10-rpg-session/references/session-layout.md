# Session Markdown layout, invariants and update protocol

All files are plain `.md`. Required session folder:

```text
my-run/
  session.md           # one selected system, narrative / dice / house-rule contract
  events.md            # append-only transcript + events; primary truth
  mechanics.md         # only actual dice faces and verified calculations
  state.md             # current scene, time, resources, NPC clocks, public facts
  rules-rulings.md     # exact local rules, official interpretation and explicit house rules
  gm-private.md        # motives, secrets and uncommitted scenario possibilities
  chronicle.md         # literary prose derived from confirmed events (not truth source)
  recap.md             # compact resume summary, with last verified event ID
  characters/player.md # imported session copy; never overwrite the external sheet
  characters/npcs.md   # known and private NPC states / relationships / motives
```

## Event format

Append sequential IDs `E-0001`, `E-0002`, etc. Reserve one ID per successfully written full player/GM exchange or committed state-change entry; use both when events contain multiple large changes. Each entry records:

```markdown
## E-0002 — dialogue / scene turn
- Session time: [fictional scene time or unknown]
- PC utterance, verbatim: > [actual player message]
- GM narration, verbatim: > [actual GM message]
- World fact / change: [only established facts]
- Mechanical receipt: [M-0001 or 'none']
- Provenance: [player statement, confirmed GM ruling, receipt]
- Status: committed
```

Never write `committed` before the actual successful disk write. For missing or disputed entries add a new correction event citing the old ID; **do not edit old events** silently. Stable IDs and a single writer help, but Markdown is not a transactional database—there is no guaranteed atomic multi-file commit. Avoid concurrently delegating two write jobs for the same session; writer serializes all events and re-reads latest ID before appending.

## Source of truth and recovery

`events.md` is factual history. `mechanics.md` holds actual dice evidence (the original faces, source, pre-roll decisions, outcomes). `state.md`, `recap.md`, player and NPC sheets are recoverable snapshots. `chronicle.md` is a literary derivative. `gm-private.md` is private only by convention; use host access separation if other users can open it.

Writer procedure: (1) read latest committed event ID and relevant existing files; (2) receive canonical facts + actual dice evidence; (3) append event with next ID; (4) verify event by re-reading last section; (5) reconcile sheets/state and recap, citing event ID; (6) request literary chronicle from the confirmed public portion; (7) append chronicle and verify; (8) report exactly which writes succeeded. Never claim the whole batch atomic. If a derived file fails, mark it stale by ID and replay from events.

## Native RPG dice plugin and manual fallback

- Default on configured OpenCode 2 or Claude: Fuhyō calls the native in-process `rpg_dice` tool after confirming player-controlled pre-roll decisions. Record its unaltered JSON receipt and full faces in `mechanics.md`.
- If the dice plugin is unavailable, the player may report actual faces for Shadowrun D6 pools or Cypher d20. Record `player-reported` provenance; do not imply an independently verified host roll.
- If neither is available, **do not simulate randomness by storytelling**, by claiming 'the agent rolled', or by hashing a timestamp/chat message. Offer a pre-agreed deterministic cinematic adjudication under `rules-rulings.md`, and label the result nonrandom and non-official; or keep the attempt unresolved until dice are available.
- The player remains entitled to optional Edge/Effort/XP and other tactical choices before resolution.

## Import

Read the player's existing `.md`; never mutate that source. Copy its content into `characters/player.md` or transcribe fields with `Origin: <path or user-provided sheet>` and an explicit `Imported copy on <date or unspecified>`. Unknown values remain unknown. Separate the session record from rewards/changes accepted into the original campaign.
