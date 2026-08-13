---
name: 97-gadget-random-srs
description: "Append a compact random Japanese or German SRS language drop derived from concepts already present in a completed response. Use only when the response-finalizer selects this gadget. Randomly choose the target language, teach a few context-relevant vocabulary items and optionally one grammar point, and emit bounded SRS card candidates for optional backend persistence."
metadata:
  version: 1.0
  opencode/slash: "true"
---

# Random SRS

Append a tiny language-learning drop based on the completed response.

This gadget does not own its outer trigger.

## Usage

`/97-gadget-random-srs`

The caller supplies the completed main response.

## Load Order

Always read:

- [Language extraction](references/language-extraction.md)

Read only when persistent SRS storage is available and authorized:

- [SRS persistence handoff](references/srs-persistence.md)

Use:

- [SRS candidate schema](assets/srs-candidate-schema.yaml)

## Language Selection

Randomly choose:

- Japanese: approximately 60%
- German: approximately 40%

Do not reroll merely because one language is harder for the current topic.

If the selected language cannot produce a useful drop from the response, suppress the gadget.

## Hard Rules

- Never alter the completed main response.
- Never trigger or reroll another gadget.
- Never fabricate a fact from the main response.
- Language teaching may translate/re-express concepts already present, but must not add unrelated
  subject matter.
- Never invent uncertain Japanese readings, pitch accent, German grammar, or usage claims.
- Maximum 3 vocabulary/phrase items.
- Maximum 1 grammar point.
- Keep the drop compact.
- Do not claim a card was persisted unless a separate backend write actually succeeded.
- Visible delivery must not depend on vault persistence succeeding.

## Workflow

### 1. Fit Check

Suppress when:

- the main response is trivial;
- there is too little meaningful content to mine;
- a language-learning appendage would be contextually inappropriate;
- the answer is already too long.

### 2. Select Language

Choose Japanese or German using the 60/40 split.

Randomness occurs after invocation only.

### 3. Mine Concepts from the Main Response

Select one to three useful words/phrases/concepts already present in the response.

Re-express them naturally in the selected target language.

When useful, choose one grammar pattern demonstrated by the mini examples.

Follow `references/language-extraction.md`.

### 4. Build Card Candidates

For each taught item emit an internal candidate conforming to
`assets/srs-candidate-schema.yaml`.

The candidate is a persistence handoff, not proof of a write.

### 5. Optional Persistence

When the current mode/backend permits vault mutation and the required SRS root/template are
configured, follow `references/srs-persistence.md`.

If persistence is unavailable, unconfigured, blocked, or fails, continue with the visible drop
without claiming persistence.

### 6. Append

Append:

```markdown
---
### 📚 Random SRS — <Japanese|German>

- **<target-language item>** — <short English meaning>
  - `<short contextual example>` → `<English translation>`

- **Grammar: <pattern>** — <one-line explanation>
  - `<example>` → `<translation>`
```

Omit the grammar section when no useful grammar point fits.

Do not expose internal card/persistence metadata in the visible drop.

## Suppression

Return `NO_DROP` internally when fewer than one useful, trustworthy teaching item can be produced.

Never force vocabulary merely to satisfy the gadget slot.
