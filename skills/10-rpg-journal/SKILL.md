---
name: 10-rpg-journal
description: "Have agents keep an append-only Markdown transcript, mechanical receipts, durable state, and a second novel-style chronicle without any scripts or services."
metadata:
  version: "2.0.0"
  opencode/slash: "true"
---

# Two-track RPG recording (Markdown only)

Read [event and chronicle schema](references/journal-format.md) and [state protocol](../10-rpg-session/references/session-layout.md). Every exchange between player and the game narrator should be captured in `events.md` **verbatim**, not just summarized. Substantive state transitions get stable ordered event IDs. All writes are performed via normal agent file-write capability; no CLI, script or plugin. When an existing character file is imported, only the **session copy** changes.

`events.md` = factual append-only game transcript with decisions, changes, actual dice provenance and references. `mechanics.md` = receipts. `chronicle.md` = **novelistic narrative** synthesized from committed, player-visible facts; it cannot write new canon, secretly spend items, decide new player actions or reveal GM secrets. `state.md`, `recap.md` and sheets are derived read models. If a chronicler makes an interesting but unconfirmed addition, classify it as atmospheric noncanon or revise it, never make it real retroactively.

A writer must read existing event ID, append with the next ID, re-read to confirm, update projections, and only then mark saved. When writes are unavailable, produce Markdown marked `NOT WRITTEN` and never assert that the session persisted. See [Markdown example](references/journal-format.md).

