# SRS Persistence Handoff

Persistent storage is optional backend work.

The visible language drop is valid without it.

## Configuration First

Resolve the configured vault through `03-kb-obsidian-vault-overview`.

Require:

- a configured SRS deck/root for the selected language;
- the configured `srscard` template.

If the deck/root is not configured, stop persistence.

Never invent a vault path.

Never fall back to an unrelated zettel directory merely to force a write.

## Template Authority

Read the actual configured SRS card template before creating or updating a card.

Do not copy a stale frontmatter layout from this skill.

## Existing Card Match

Within the configured target-language deck, look for a card representing the same learning item.

Prefer the template's stable identity fields.

When the active template uses the legacy `NbEncounter` field:

- no existing card → candidate starts at `1`;
- existing value `< 3` → propose increment by exactly `1`;
- existing value `>= 3` → suppress that card candidate as already familiar.

Do not mutate `NbEncounter` merely because a card was read outside this gadget.

## Candidate Content

Preserve:

- learning item;
- language;
- card type;
- concise meaning;
- contextual sentence from this drop;
- translation;
- optional grammar explanation;
- provenance pointing to the current delivered response when the backend supports source tracing.

## Mutation Boundary

The gadget itself does not gain filesystem authority from being randomly selected.

Dispatch persistence only through the host's authorized vault-write path.

A failed, blocked, duplicate, or unavailable write must:

- remain backend-only when the gadget was optional;
- not change the visible drop;
- never be reported as successful.

## Chatbot Mode

If chatbot mode forbids local vault mutation, skip persistence.

Do not weaken chatbot file-access restrictions for an SRS drop.
