---
name: 10-rpg-resolution
description: "Keep roleplaying fiction-first with player-controlled decisions, native RPG dice plugin receipts, explicit edition-specific rule checks and Markdown audit trails."
metadata:
  version: "2.0.0"
  opencode/slash: "true"
---

# RPG uncertainty and dice boundary

Load [dice-free and dice-verified play policy](references/resolution-policy.md) and exactly one local ruleset: `11-shadowrun-rules` or `12-cyphersystem-rules`.

1. Identify player intent, true obstacle, meaningful stakes, relevant sheet, and whether uncertainty actually calls for a roll. Routine ability works without dice.
2. Resolve relevant system action prerequisites, declared conditions, modifiers and **player-controlled pre-roll resource decisions** (Shadowrun Edge; Cypher Effort/Pool/XP).
3. If a roll is required, use the native `rpg_dice` plugin by default in a configured gamemaster host, or request actual die faces from the player when it is unavailable. Never invent a tool receipt. Never count a model guess, a written result template or an 'agent toss' as a genuine random outcome.
4. Mechanically evaluate faces per *exact* rules. Prepare a receipt for `mechanics.md`; commit the corresponding event and update state only through the authorized Markdown writer. On a dice dispute, preserve data and ask for clarification rather than replacing it.
5. Narrate what happened in the world. Do not lead with threshold/DC or table mechanics; show cost choices honestly when relevant.

**No dice available (plugin denied/unavailable and player has not supplied faces):** don't leave the player guessing whether dice were rolled. Either defer outcome or, with explicit player agreement, use an openly recorded *deterministic cinematic house rule*, never call it RAW or random.

