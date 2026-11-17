---
name: 10-rpg-resume
description: "Resume a tabletop RPG from Markdown records with continuity reconstruction, unambiguous open decisions, NPC knowledge bounds, and no invented prior events."
metadata:
  version: "1.0.0"
  opencode/slash: "true"
---

# RPG Resumption

`/10-rpg-resume {session-path}`

Read `session.md`, `events.md`, `state.md`, `characters/player.md`, `characters/npcs.md`, `rules-rulings.md`, `recap.md`, and, for GM-side preparation only, `gm-private.md`. The latest committed events override a stale snapshot, which must be reconciled; a novel-style `chronicle.md` cannot supply unseen character choices or new canon. Preserve exact system and edition; do not interchange Shadowrun and Cypher characters or mechanics. Inspect any pending die/result, consent, resource spend, or narrative offer and pause the action until resolved.

Produce a brief in-world reminder of where the character is and what is immediately happening, then invite their next act. After an actual successful reconciliation write, update the derived recap and state; if the host cannot read or write Markdown, explain which continuity claims are unverifiable and do not invent prior session history.
