---
name: 00-doc-editorial-refactor
description: "Refactor technically correct Markdown into sharp, direct editorial prose while preserving structural and technical regions. Use for Markdown documents that need a TL;DR, cleaner typography, stronger verdicts, and more natural human writing. Delegates prose humanization to the humaniser skill in embedded mode."
metadata:
  version: 1.0
  opencode/slash: "true"
---

# Doc - Editorial Refactor

Turn technically correct Markdown that reads like committee sludge into sharp, direct editorial prose without damaging its technical structure.

This skill owns **document structure and editorial intent**. The `99-tool-humaniser` skill owns the final natural-language cleanup of editable prose.

## Usage

- `/00-doc-editorial-refactor {file}`
- `/00-doc-editorial-refactor {file} --output {target}`

## Dependencies

- `99-tool-humaniser` MUST be available.
- Invoke `99-tool-humaniser` in **embedded mode** only.
- Never hand the full Markdown file to Humaniser. Pass only prose that this skill has classified as editable.

If `99-tool-humaniser` is unavailable, stop and report the missing dependency rather than silently substituting a weaker local imitation.

## Protected Regions

Preserve these exactly unless the user explicitly asks to change them:

- YAML frontmatter;
- the existing title;
- headings;
- tables;
- fenced code blocks;
- Gherkin specifications;
- blockquotes;
- horizontal rules;
- existing list items;
- inline code;
- link destinations and reference definitions.

Treat protected regions as immutable bytes where the runtime allows exact preservation.

## Editorial Contract

- MUST insert `## TL;DR` immediately after the title.
- TL;DR MUST contain 5-10 proportional bullets derived only from the source.
- NEVER invent facts, claims, numbers, dates, citations, or conclusions.
- NEVER soften a supported verdict merely to sound polite.
- NEVER leave an em dash (`—`) or en dash (`–`) in generated or rewritten prose.
- NEVER produce one-sentence-per-blank-line paragraph spam.
- Preserve natural paragraph grouping and semantic nuance.
- Preserve the document's original scope.
- If `--output` is specified, NEVER modify the source file.

## Workflow

1. Read the entire source before editing.
2. Identify the exact title, section hierarchy, protected regions, editable prose spans, and unusual Markdown constructs that must survive unchanged.
3. Draft the TL;DR from the source with 5-10 concrete, proportional bullets and no new claims.
4. Refactor editable prose:
   - state verdicts plainly;
   - remove hedging and committee language;
   - call out problems directly;
   - simplify bloated constructions;
   - keep technical precision;
   - use short punchy closers only when they genuinely help.
5. Run `99-tool-humaniser` in **embedded mode** on the drafted TL;DR bullet text and every rewritten editable prose span. Tell Humaniser to preserve source claims and this skill's editorial constraints. Do not include protected Markdown regions in the Humaniser input.
6. Reassemble the document with the exact original title, `## TL;DR` immediately after it, finalized TL;DR bullets, and protected regions unchanged.
7. Write in place unless `--output {target}` was supplied.

## Humaniser Boundary

Humaniser may improve rhythm, diction, sentence shape, and AI-pattern cleanup.

Humaniser MUST NOT:

- add or remove claims;
- rewrite protected regions;
- rename headings;
- change table cells;
- alter code, Gherkin, frontmatter, links, or existing list items;
- weaken a supported editorial verdict;
- expand scope.

If Humaniser output violates those constraints, reject that change and keep or repair the editorial draft instead.

## Verification

Before reporting completion, verify all of the following:

- source was fully read before editing;
- title is byte-identical to the original;
- `## TL;DR` is immediately after the title;
- TL;DR contains 5-10 bullets;
- protected regions are unchanged;
- no source claim was invented or dropped;
- search for `—` returns zero in generated or rewritten prose;
- search for `–` returns zero in generated or rewritten prose;
- paragraphs are naturally grouped;
- no prose was rewritten outside the editable spans;
- when `--output` was used, the source file is unchanged.

Do not report success if any verification fails.
