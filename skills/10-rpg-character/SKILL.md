---
name: 10-rpg-character
description: "Import, reconcile, and track player character sheets, NPC records, possessions, injuries, money, progression, and social relationships in tabletop RPG sessions without silently changing original source files."
metadata:
  version: "1.0.0"
  opencode/slash: "true"
---

# RPG Characters and Inventory

`/10-rpg-character {import|status|update} {source-or-event}`

Require an explicit character source or player-supplied facts for an existing character. Never require starting a fresh sheet to play a single run. Keep name and source/edition identifier, as well as a clear list of known versus unknown fields. Import data without converting system semantics: Shadowrun `Edge`, nuyen, Essence, qualities, cyberware and damage tracks are not Cypher `Edge`, Pools, Effort, cyphers, or recovery rolls.

Track PCs and NPCs separately. Do not confuse an NPC's concealed knowledge with publicly known character facts. Maintain gear quantity and provenance, currency delta, conditions, skills/abilities, active modifiers, contacts/relationships, XP/Karma, and contested changes when relevant. When a player's external sheet and session copy conflict, preserve both and state the discrepancy; do not arbitrarily overwrite either.

Apply a change only from a confirmed player decision, observed mechanical resolution, established in-fiction exchange, or separately authorized GM advancement. Reference its event ID. Importing an external character does not grant this game authority to change a shared campaign's permanent canon or rewards. Permanent cross-run changes reach the character's progression record only through the end-of-run debrief, as player-approved changes (`10-rpg-progression`); the session copy is never copied over the record.

For a status request, present a concise in-world summary first, with a structured mechanical sheet on request. Report unverified values as unknown rather than filling in a plausible number.
