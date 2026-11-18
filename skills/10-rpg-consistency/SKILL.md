---
name: 10-rpg-consistency
description: "Independently audit RPG turns and Markdown state for factual continuity, rule source authority, player choice, NPC knowledge leaks, and discrepancies between events, character sheets and literary chronicle."
metadata:
  version: "1.0.0"
  opencode/slash: "true"
---

# RPG Consistency Check

`/10-rpg-consistency {events-and-proposed-change}`

Read only the relevant evidence: accepted game/edition, player character snapshot, committed event IDs, source mechanics receipts, proposed state change, chosen rules, NPC public/private knowledge and relevant chronicle passage. Use verdicts **PASS**, **FAIL**, **UNVERIFIED**. Do not fill absent evidence from plausibility, perform a mutation, or quietly turn a proposed scenario into canon.

Check: no player-choice seizure; correct ruleset and edition; properly sourced rulings vs house rules; actual (not invented) random results; pre-roll resource choices; inventory/currency/health/XP deltas once, not twice; no event gaps/rewrites; NPC presence and knowledge; hidden-fact disclosure only after discovery; chronicle fidelity; time and geography consistency; reward authority for imported characters; end-of-run progression changes cite committed events, apply once, carry player approval, and respect the record version; protagonist still has plausible options after a setback.

Return precise evidence references, issue severity, and the smallest correction needed. A failed or missing operation is never a successful state write. When narrative prose can be repaired without changing a committed result, recommend a prose correction rather than retconning the event ledger.
