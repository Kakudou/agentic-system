# RPG Markdown event / mechanics / chronicle pattern

## `events.md`: actual record, append-only

```markdown
# Event ledger
Last verified event: E-0002

## E-0001 — session opened
- Event type: session-start
- Established facts: Solo run opened at a night market; player controls the runner
- Origin: user character sheet; agreed opening scene
- Status: committed

## E-0002 — turn
- Player verbatim: > I try to open the office door without alerting security.
- GM verbatim: > The lock catches twice ... The guard's steps grow louder. What do you do?
- Provenance: actual conversation turn
- Mechanical result: pending; no roll claimed
- Established facts: A lock and approaching guard exist
- Status: committed
```

Do not fabricate verbatim text. In a real game, insert the exact conversation. Use `E-0003` and so on for subsequent turns or changes. If a mistake was written, a correction event with new ID supersedes the earlier field; never silently rewrite history.

## `mechanics.md`: evidence

```markdown
## M-0001
- Linked event: E-0003
- System: shadowrun-6e
- Intent: Quietly bypass lock
- Pool and threshold: calculated from documented sheet/rules
- Before roll: Edge spend declined
- Dice provenance: player-reported physical d6 (NOT independently verified)
- Faces: [insert exactly actual values supplied by player]
- Hits: [calculate]
- Glitch: [calculate]
- Outcome: [resolve from rules]
```

The example is a template, not a dice result or proof of an actual roll. For Cypher record natural d20 face, effective difficulty, declared Effort and actual Pool cost. `M-0001` cannot exist if nobody actually rolled. Keep receipts system-locked.

## `chronicle.md`: literary retelling

```markdown
# Chapter I — The office

The last neon pulse slipped beneath the door as the runner leaned over
its lock. Behind them the guard's footfalls drifted closer, unhurried
and inexorable.

*Adapted from E-0002 only. No success or failure has yet been resolved.*
```

Character thoughts, plans, past secrets and spoken lines must not be invented as confirmed events. Literary atmospheric details may enrich the prose so long as they don't commit new scene facts or expose GM-only information. A chapter must cite its covered event range in a small note, invisible to ordinary RP narration if player prefers.
