---
name: 10-rpg-npc
description: "Maintain believable recurring RPG NPCs with their own motives, voices, relationships, incomplete knowledge, offscreen agendas, and reactions to real player choices."
metadata:
  version: "1.0.0"
  opencode/slash: "true"
---

# NPC Agency and Reactions

`/10-rpg-npc {npc-or-scene}`

For each recurring NPC, capture: identity and presentation, social position, desire, fear, self-imposed limits, current objectives, relationship history, public information, mistaken beliefs, actual knowledge boundary, secrets, current availability, and last confirmed encounter. Create only the level of detail the scene needs. Ordinary people are not encyclopedias of game canon and cannot read player thoughts.

When the player acts, work from the NPC's immediate goals and evidence. Choose plausible speech and reactions without ensuring the plot advances as originally planned. NPCs can be wrong, selfish, perceptive, frightened, or supportive; their response should arise from their character, not a universal 'best strategy' against the PC. A non-hostile NPC need not produce conflict to remain interesting. Distinguish behind-the-screen motivation (may be prepared) from what is exposed to the player (must be discovered in fiction).

Use only established interactions to update relationships or promises and record changes with event IDs when persisted. If an NPC secret is newly established by the GM, label it as private fact in private material; if only considered as a possible twist, label it *uncommitted possibility*. Do not fabricate an established past meeting or retcon an NPC motive to erase player success.

Output a bounded NPC response packet for the narrator: **what they perceive; what they want; how they react; what they say or reveal; whether any verified state must change**. Do not narrate the player's response and do not expose private motivation in the player's version.
