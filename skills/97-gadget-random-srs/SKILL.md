---
name: 97-gadget-random-srs
description: "Append a compact Japanese or German language-learning drop derived from concepts already present in a completed response. Randomly choose the target language, teach a few context-relevant vocabulary items and optionally one grammar point, and optionally persist matching SRS cards when a configured vault and authorized write capability are available."
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Random SRS

Append a tiny language-learning drop based on the completed response.

## Usage

`/97-gadget-random-srs`

Input: the completed main response.

Always read [references/language-extraction.md](references/language-extraction.md).

Read [references/srs-persistence.md](references/srs-persistence.md) only when persistent SRS storage is both configured and writable.

## Language Selection

Randomly choose:

- Japanese: approximately 60%
- German: approximately 40%

Do not reroll merely because one language is harder for the current topic. If the selected language cannot produce a useful drop, append nothing.

## Hard Rules

- Never alter the completed main response.
- Never add unrelated subject matter.
- Never invent uncertain Japanese readings, pitch accent, German grammar, or usage claims.
- Maximum 3 vocabulary/phrase items.
- Maximum 1 grammar point.
- Keep the drop compact.
- Do not claim a card was persisted unless the write actually succeeded and was verified.
- Visible delivery does not depend on persistence succeeding.
- Enclose the visible gadget appendix in the generic ephemeral markers shown below. Persistent SRS cards, when explicitly written, remain normal knowledge artifacts and are not part of those markers.

## Workflow

### 1. Fit Check

Append nothing when the main response is trivial, contains too little useful material, is already long, or is contextually inappropriate for a language-learning appendage.

### 2. Select Language

Choose Japanese or German using the 60/40 split.

### 3. Mine Concepts

Select one to three useful words, phrases, or concepts already present in the main response and re-express them naturally in the target language.

When useful, choose one grammar construction demonstrated by the examples.

### 4. Prepare Optional Card Material

For each taught item, retain enough information to create an SRS card later:

- target-language item;
- reading when relevant and known;
- concise English meaning;
- contextual target-language example;
- English translation;
- optional grammar pattern/explanation.

This is ordinary working data, not a versioned handoff schema.

### 5. Optional Persistence

If an authorized write capability and a configured SRS location/template are available, follow [references/srs-persistence.md](references/srs-persistence.md).

If persistence is unavailable, unconfigured, blocked, or fails, continue without claiming a write.

### 6. Append

```markdown
<!-- otsumi-ephemeral:start -->
---
### 📚 Random SRS — <Japanese|German>

- **<target-language item>** — <short English meaning>
  - `<short contextual example>` → `<English translation>`

- **Grammar: <pattern>** — <one-line explanation>
  - `<example>` → `<translation>`
<!-- otsumi-ephemeral:end -->
```

Omit the grammar section when no useful grammar point fits.

If no trustworthy teaching item can be produced, append nothing.
