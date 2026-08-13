---
name: 01-doc-otsumi-voice
description: "Rewrite a provided Markdown or prose asset so it reads unmistakably as Ōtsumi's writing while preserving the source's structure, meaning, scope, technical content, ordering, and factual claims. Use when the content is already correct and organized but needs a strong Ōtsumi voice pass rather than an editorial refactor. Requires a canonical Ōtsumi persona/voice profile, then performs a voice-only rewrite with an optional final humanisation pass."
metadata:
  version: "1.0"
  opencode/slash: "true"
---

# Doc - Ōtsumi Voice

Rewrite an existing asset **in Ōtsumi's voice without refactoring the asset itself**.

This is a voice-transfer skill, not an editorial, structural, factual, or scope-changing rewrite.

The source already owns:

- what is said;
- what order it is said in;
- how it is structured;
- which technical details exist;
- which claims, caveats, examples, and conclusions belong.

This skill owns only **how the editable prose sounds**.

## Usage

- `/01-doc-otsumi-voice {file}`
- `/01-doc-otsumi-voice {file} --output {target}`
- invoke with pasted Markdown or prose when no file is available

Default voice intensity is **strong Ōtsumi**. If the user explicitly requests a different intensity,
honor it without changing the preservation contract.

## Persona Requirement and Optional Humaniser

A canonical Ōtsumi persona/voice profile is intrinsic to this capability because it defines the identity being transferred.

When `00-agent-load-persona` is installed locally, it is the preferred provider. Otherwise accept an equivalent caller-supplied canonical persona/voice profile.

Do not imitate or reconstruct the persona from memory when no canonical profile is available.

After the Ōtsumi rewrite is complete, `99-tool-humaniser` or an equivalent prose-humanisation capability may be used as an **embedded prose pass**. If none is available, perform the finishing checks in `references/humaniser-handoff.md` locally rather than blocking.

If no canonical persona definition is available from either source, stop. Do not silently substitute a local approximation of Ōtsumi.

## Read When Needed

Always read:

- [Preservation contract](references/preservation-contract.md)
- [Ōtsumi voice transfer](references/voice-transfer.md)
- [Humaniser handoff](references/humaniser-handoff.md)

These references are intentionally separate because structure preservation, persona rendering, and
humanisation have different authorities.

## Authority

When rules conflict, use this order:

1. explicit user constraints for this rewrite;
2. source meaning, factual content, scope, and structure;
3. protected technical content;
4. this skill's strong Ōtsumi voice target;
5. canonical persona style defaults;
6. optional humanisation stylistic preferences.

Humaniser may polish the voice. It may not neutralize it.

## Hard Rules

- MUST read the complete source before rewriting.
- MUST preserve source meaning and informational content.
- MUST preserve section order and document hierarchy.
- MUST preserve all technical values, identifiers, paths, commands, code, URLs, citations, numbers,
  dates, names, and literal data unless the user explicitly asks to change them.
- MUST preserve every material caveat, qualification, warning, verdict, and conclusion.
- MUST NOT add facts, arguments, examples, recommendations, requirements, or conclusions.
- MUST NOT remove facts, arguments, examples, recommendations, requirements, or conclusions.
- MUST NOT add a TL;DR, summary, section, heading, list item, table row, conclusion, or other new
  structural element.
- MUST NOT merge, split, reorder, or delete source sections or list items merely to improve flow.
- MUST NOT restructure the document, add summaries, reorder sections, or perform an editorial refactor.
- MUST make the editable prose recognizably Ōtsumi rather than applying a cosmetic synonym pass.
- MUST run any optional humanisation only after the voice rewrite is complete.
- MUST reject any humanisation change that weakens meaning, structure, technical precision, or the
  deliberate Ōtsumi voice.

## Workflow

### 1. Load Persona

Obtain the canonical Ōtsumi persona/voice profile from the local persona loader when available or from an equivalent caller-supplied profile.

Use its canonical identity, core behavior, and voice rendering as the source of truth.

For this skill, deliberately target a **high voice intensity** rather than the persona loader's
ordinary adaptive baseline. Strong does not mean theatrical: the prose should sound like Ōtsumi
wrote it, not like someone sprayed cyberpunk slang over it.

### 2. Read and Map the Source

Read the entire asset.

Build a preservation map containing:

- structural skeleton;
- protected technical spans;
- editable natural-language spans;
- source stance and confidence;
- repeated terminology that must stay stable.

Do not rewrite while still discovering the document.

### 3. Perform the Voice Transfer

Rewrite editable prose according to `references/voice-transfer.md`.

Preserve the exact information and local purpose of each source span.

The rewrite may change:

- sentence shape;
- rhythm;
- diction;
- transitions;
- rhetorical pressure;
- directness;
- expressive phrasing.

It may not change what the source asserts.

### 4. Structural and Semantic Check

Before Humaniser, compare the rewrite against the source using
`references/preservation-contract.md`.

Repair any:

- missing claim;
- new claim;
- changed meaning;
- lost caveat;
- altered technical literal;
- reordered structure;
- accidental scope expansion.

Do not continue until the voice draft passes.

### 5. Humanise the Finished Voice Draft

Follow `references/humaniser-handoff.md`. When `99-tool-humaniser` or an equivalent capability is available, it may perform the embedded prose pass; otherwise apply the same finishing checks directly.

Pass only content that Humaniser is allowed to modify. Keep immutable technical spans outside its
rewrite authority whenever the runtime permits span-level processing.

The task is to remove machine-writing tells while preserving the intentional Ōtsumi voice.

### 6. Final Verification

Compare final output against both:

- the original source; and
- the pre-Humaniser Ōtsumi draft.

Verify:

- same meaning;
- same scope;
- same structure;
- same ordering;
- same technical literals;
- no factual additions or omissions;
- strong Ōtsumi voice remains obvious;
- the finishing pass removed artificial phrasing without sanding the prose into generic assistant language.

If any check fails, repair and re-verify before completion.

## Output Behavior

### File input

Rewrite the file in place unless `--output {target}` was supplied.

When `--output` is supplied:

- write only to the target;
- leave the source unchanged.

Return a concise completion summary rather than pasting the entire rewritten file unless the user
asks to see it.

### Pasted input

Return only the final rewritten asset unless the user asks for commentary or a diff.

## Completion Standard

A successful result should make this true:

> The same authorial intent, information, structure, and technical substance survived intact, but
> the prose now sounds like Ōtsumi wrote every editable line herself.

If the result merely sounds "cleaner", the skill has not done enough.

If the result says anything materially different, the skill has gone too far.
