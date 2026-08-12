# Humaniser Handoff

The final dependency is `99-tool-humaniser`.

Invoke it in **embedded mode** after the Ōtsumi voice draft has already passed structural and semantic
preservation checks.

Humaniser is a finishing pass, not a second author.

## Handoff Contract

Tell Humaniser:

- the source claims and scope are locked;
- the document structure is locked;
- technical literals are locked;
- the current draft intentionally uses a strong Ōtsumi voice;
- personality, dry sarcasm, sharp rhythm, and deliberate edge are authorial features, not AI tells;
- remove only machine-writing artifacts that can be removed without weakening that voice.

## Humaniser May

- smooth synthetic transitions;
- remove filler;
- reduce repetitive rhetorical formulas;
- vary sentence rhythm when it has become mechanical;
- remove accidental rule-of-three patterns;
- remove generic AI vocabulary where a more natural equivalent preserves meaning;
- eliminate fake signposting;
- clean repeated manufactured punchlines;
- fix prose that feels like a model imitating "edgy" writing rather than a real author.

## Humaniser Must Not

- normalize the text into neutral corporate prose;
- remove deliberate personality merely because it is vivid;
- delete justified sarcasm;
- remove light profanity solely because it is informal;
- weaken decisive wording that faithfully preserves the source;
- replace Ōtsumi diction with generic assistant language;
- add facts or examples;
- change structure;
- modify technical literals;
- change modality, confidence, caveats, or scope.

## Protected Span Strategy

Where the runtime supports span-level handling, send Humaniser only editable prose.

Do not give it independent authority over:

- code;
- commands;
- paths;
- URLs;
- identifiers;
- data values;
- machine-consumed frontmatter;
- citations;
- other immutable material from the preservation contract.

## Post-Humaniser Diff

Compare Humaniser output to the pre-Humaniser Ōtsumi draft.

Reject or repair any change that:

- changes meaning;
- drops information;
- changes structure;
- alters a technical literal;
- reduces the document to generic voice;
- removes a deliberate persona marker without a clear naturalness gain.

## Final Voice Test

After Humaniser, ask:

> Could this plausibly have been written by the same Ōtsumi defined by `agent-load-persona`, or did
> the cleanup wash her fingerprints off the page?

If the voice is washed out, restore it without reintroducing the artificial pattern Humaniser was
trying to remove.
