---
name: 01-doc-editorial-refactor
description: "Refactor technically correct Markdown into sharp, direct editorial prose while preserving structural and technical regions. Use for Markdown documents that need a TL;DR, cleaner typography, stronger verdicts, and more natural human writing."
metadata:
  version: "1.0"
  opencode/slash: "true"
---

# Doc - Editorial Refactor

Turn technically correct Markdown that reads like committee sludge into sharp, direct editorial prose without damaging its technical structure.

This skill owns **document structure, editorial intent, and the final natural-language quality of editable prose**.

## Usage

- `/01-doc-editorial-refactor {file}`
- `/01-doc-editorial-refactor {file} --output {target}`

## Optional Humaniser Integration

- If `99-tool-humaniser` or an equivalent prose-humanisation capability is available, it may be used as an **embedded prose pass**.
- Never hand the full Markdown file to an optional humaniser. Pass only prose that this skill has classified as editable.

The skill remains complete without that integration. When no humaniser is available, perform the local naturalness pass below.

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
5. Perform a naturalness pass on the drafted TL;DR and rewritten editable prose. When an optional humaniser is available, it may perform this pass under the boundary below. Otherwise do it locally: remove repetitive sentence shapes, canned transitions, artificial contrast, redundant restatement, and choppy paragraphing without changing claims or tone.
6. Reassemble the document with the exact original title, `## TL;DR` immediately after it, finalized TL;DR bullets, and protected regions unchanged.
7. Write in place unless `--output {target}` was supplied.

## Naturalness Boundary

The naturalness pass may improve rhythm, diction, sentence shape, and obvious machine-writing patterns.

It MUST NOT:

- add or remove claims;
- rewrite protected regions;
- rename headings;
- change table cells;
- alter code, Gherkin, frontmatter, links, or existing list items;
- weaken a supported editorial verdict;
- expand scope.

If an optional humaniser violates those constraints, reject that change and keep or repair the editorial draft instead.

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
