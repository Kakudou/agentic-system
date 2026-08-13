# SRS Persistence

Persistent SRS storage is optional. The visible language drop is valid without it.

## Configuration

Consume a trusted vault descriptor. If `03-kb-obsidian-vault-overview` is installed locally, it may provide that descriptor; otherwise an equivalent caller-supplied descriptor is sufficient.

Require:

- `named_roots.srs_japanese_root` for Japanese or `named_roots.srs_german_root` for German;
- `templates.srscard_template`.

If either is unconfigured, skip persistence. Never invent a vault path or fall back to an unrelated zettel directory.

## Template Authority

Read the actual configured SRS card template before creating or updating a card.

The template owns frontmatter keys and sections. Do not carry a copied card schema here.

## Existing Card Match

Within the configured target-language deck, look for a card representing the same learning item using the template's stable identity fields.

When the active template contains `NbEncounter`:

- no existing card → create with the template's initial value;
- existing value `< 3` → increment by exactly 1 when the new encounter is worth recording;
- existing value `>= 3` → normally skip the update as already familiar.

Do not mutate a counter merely because a card was read.

## Card Content

Populate only information supported by the current language drop:

- learning item;
- language/card type required by the template;
- concise meaning;
- contextual sentence;
- translation;
- optional grammar explanation;
- provenance when the template supports it.

## Write Boundary

Persistence requires an authorized file-write capability independent of this skill.

Before writing:

1. read the current target/template state;
2. preserve unrelated existing card content;
3. avoid overwriting an unexpected conflicting card.

After writing, read the changed card back and verify the intended fields/content.

A blocked, duplicate, unavailable, or failed write does not invalidate the visible language drop and must never be reported as successful.
