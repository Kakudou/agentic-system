# Lint Rules

These are the canonical corpus-health checks.

Do not invent additional rule classes during execution.

## ZL001 duplicate-claim

Two or more zettels appear to own the same atomic claim.

Evidence should include:

- overlapping titles/aliases;
- materially equivalent core claims;
- overlapping tags or links when useful.

Do not flag two notes merely because they discuss the same topic.

Recommended owner: `03-kb-obsidian-zettelize`.

## ZL002 overloaded-zettel

One zettel contains multiple independently useful ideas that could change separately.

Strong signals:

- several unrelated normative statements;
- multiple independent definitions;
- unrelated procedures in one note;
- sections that could stand as separate atomic notes.

A long note is not automatically overloaded.

Recommended owner: `03-kb-obsidian-zettelize`.

## ZL003 generic-contamination

A zettel marked or clearly functioning as generic still depends on incidental business/project
specificity.

Examples of contamination:

- project names that are irrelevant to the generic claim;
- local implementation identifiers that can be removed without changing the principle;
- business-specific examples presented as if they define the reusable rule.

Do not remove specificity when the specificity is intrinsic to the knowledge.

Recommended owner: `03-kb-obsidian-zettelize`.

## ZL004 derived-parent-missing

A derived zettel declares or embeds a generic parent that cannot be resolved in the eligible corpus.

Evidence must include the literal parent reference and the failure to resolve it.

Recommended owner: `03-kb-obsidian-zettelize`.

## ZL005 derived-duplicates-parent

A derived zettel substantially repeats the generic parent's prose instead of containing the
domain-specific binding/delta.

The derived note should normally embed/link the parent and add only what is specific to this context.

Do not flag short unavoidable restatements needed to make the application intelligible.

Recommended owner: `03-kb-obsidian-zettelize`.

## ZL006 missing-generic-abstraction

Two or more domain-specific zettels appear to encode the same reusable core principle, but no suitable
generic parent is present.

This is a corpus-level finding.

Require strong semantic overlap and a reusable domain-independent core.

Do not force genericization when the shared specificity is intrinsic.

Recommended owner: `03-kb-obsidian-zettelize`.

## ZL007 template-drift

A zettel materially violates the actual configured zettel template.

Examples:

- required frontmatter field absent;
- required key casing changed;
- malformed YAML;
- template marker inconsistent with the actual template contract;
- date field malformed when the template requires a fixed format.

Do not flag optional fields or cosmetic formatting that the template does not constrain.

Recommended owner: explicit KB maintenance/manual repair unless another owning skill is known.

## ZL008 weak-linkage

A zettel has no meaningful explicit relationship to the ordinary corpus, or its links are only
non-semantic/navigation links.

This is advisory, not automatically a defect.

Use low severity unless the note is clearly intended as generic or derived knowledge that should be
connected.

Recommended owner: usually `03-kb-obsidian-zettelize`; sometimes manual review.

## ZL009 broken-zettel-link

A semantic wikilink inside a zettel points to an unresolved ordinary zettel identity.

Do not flag links intentionally targeting non-zettel resources, headings, attachments, or external
material.

Recommended owner: manual repair or the note-owning KB workflow.

## Rule Interaction

Prefer one root-cause finding over several symptoms.

Examples:

- if a derived note points to a missing parent, `ZL004` normally subsumes weak-linkage;
- if four project-specific notes lack a generic parent, emit one `ZL006`, not four `ZL008`s;
- if two notes are duplicates because one is a stale copy, emit `ZL001`; do not also call both
  overloaded without separate evidence.
