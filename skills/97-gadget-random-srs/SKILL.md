---
name: 97-gadget-random-srs
description: "Append a Japanese or German language-learning appendix to a completed response: the full response content translated in the target language, a level-based explanation to decipher selected parts, and the retained SRS cards (persisted to the configured vault deck when available). Randomly choose the target language with the host RNG."
metadata:
  version: "2.4"
  opencode/slash: "true"
---

# Random SRS

Append a three-part language-learning appendix based on the completed response: the full content translated in the target language, a level-based explanation, and the retained SRS cards.

## Usage

`/97-gadget-random-srs`

Input: the completed main response.

Always read [references/language-extraction.md](references/language-extraction.md).

Read [assets/learner-levels.yaml](assets/learner-levels.yaml) when present: it holds the targeted level per SRS language used to calibrate the explanation section.

Read [references/srs-persistence.md](references/srs-persistence.md) whenever the vault descriptor can be obtained — in this installation, by calling the `03-kb-obsidian-vault-overview` skill (or an equivalent caller-supplied descriptor): it defines how to determine whether persistent SRS storage is configured.

## Language Selection

Choose with the host RNG tool `otsumi_rng` (exposed by the response-gadgets runtime in this install):

- options: `["Japanese", "German"]`
- weights: `[0.6, 0.4]`

If the host RNG tool is unavailable, append nothing. Never simulate the draw, never choose the language yourself, and never expose the raw roll value. Do not reroll merely because one language is harder for the current topic. If the selected language cannot produce a useful drop, append nothing.

## Hard Rules

- Never alter the completed main response.
- Never add unrelated subject matter.
- Never invent uncertain Japanese readings, pitch accent, German grammar, or usage claims.
- Section 1 is a faithful full translation of the main response content in the target language: same claims, same structure, nothing added or dropped. Code, file paths, and identifiers stay as-is; translate the prose around them.
- Section 2 stays concise: it helps decipher and translate selected parts, not every word.
- Section 3 retains at most 3 vocabulary/phrase items and 1 grammar point.
- Do not claim a card was persisted unless the write actually succeeded and was verified.
- Visible delivery does not depend on persistence succeeding.
- Enclose the visible gadget appendix in the generic ephemeral markers shown below. Persistent SRS cards, when explicitly written, remain normal knowledge artifacts and are not part of those markers.

## Workflow

### 1. Fit Check

Append nothing when the main response is trivial, contains too little useful material, is already written in the target language, or is contextually inappropriate for a language-learning appendage. A long substantive response is prime material, not a reason to suppress.

### 2. Select Language

Call `otsumi_rng` with options `["Japanese", "German"]` and weights `[0.6, 0.4]`, then use the returned language. If the tool is unavailable, stop and append nothing.

### 3. Translate and Select Retained Items

- Translate the full content of the main response into the target language (section 1). Stay faithful: same claims, same structure, no new facts.
- From that content, select one to three useful words, phrases, or concepts to retain as SRS cards (section 3).
- Calibrate the selection and the explanation to the targeted level of the selected language from `assets/learner-levels.yaml`; if the asset or the language is missing, assume an absolute beginner who knows nothing at all.
- When useful, retain one grammar construction demonstrated by the translation alongside them.

### 4. Prepare Optional Card Material

For each taught item, retain enough information to create an SRS card later:

- target-language item;
- reading when relevant and known;
- concise English meaning;
- contextual target-language example;
- English translation;
- optional grammar pattern/explanation.

This is ordinary working data, not a versioned handoff schema.

### 5. Persistence (when configured)

Obtain the descriptor by calling the centralized vault overview capability — in this installation, the `03-kb-obsidian-vault-overview` skill — and request:

- `named_roots.srs_japanese_root` for Japanese, or `named_roots.srs_german_root` for German;
- `templates.srscard_template`.

This skill carries no vault paths and no registry copy; vault topology knowledge stays in the overview skill. When this skill is shared standalone, an equivalent caller-supplied descriptor may be used instead of the call.

- Both keys resolve → persist each taught item per [references/srs-persistence.md](references/srs-persistence.md) before appending.
- Either key is unconfigured, or no descriptor source is available → skip persistence.

If a persistence attempt is blocked or fails, continue without claiming a write.

### 6. Append

The appendix has exactly three sections, separated by `---` lines:

```markdown
<!-- otsumi-ephemeral:start -->
---
### 📚 Random SRS — <Japanese|German>

<Section 1: full content of the main response, translated in the target language.>

---

<Section 2: explanation tuned to the targeted level of the selected language from assets/learner-levels.yaml (missing asset or language → absolute beginner, no prior knowledge assumed): readings, key terms, and the retained grammar point — enough to decipher and translate selected parts.>

---

### 🗂 Retained SRS cards

- <target-language item> — <short English meaning> → <persisted: <deck-relative path> | skipped: <reason>>
<!-- otsumi-ephemeral:end -->
```

Rules for the sections:

- Section 1 is the target-language rendering of the main response, never a restatement of it in the original language. Code, file paths, and identifiers stay as-is.
- Section 2 explains selected parts, not every word; it may cite readings and the one retained grammar point.
- Section 3 lists every retained card with its actual persistence outcome (verified path or skip reason). Do not claim a path that was not written and verified.
- Omit a retained grammar entry when no useful grammar point fits.

If the main response cannot be usefully translated into the selected language, append nothing.
