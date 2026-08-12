---
name: 99-tool-humaniser
description: "Remove common AI-writing patterns while preserving facts, scope, author voice, and technical content. Use when editing or reviewing prose that should sound naturally human, including pasted text, files, or embedded calls from other skills. Supports writing-sample calibration and a draft-audit-final verification loop."
metadata:
  version: 1.0
  opencode/slash: "true"
---

# Tool - Humaniser

Remove signs of AI-generated writing without turning every author into the same minimalist editor.

This skill owns **prose naturalness**. It does not own document architecture. When another skill invokes Humaniser, the caller's structural and preservation constraints are binding.

The detailed pattern catalog remains based on Wikipedia's "Signs of AI writing" guide, maintained by WikiProject AI Cleanup.

## Core Contract

When given text to humanize:

1. Identify **clusters** of AI-writing patterns, not isolated tokens.
2. Preserve the information, not necessarily the original sentence shape.
3. NEVER invent facts, names, numbers, dates, quotes, citations, sources, or unsupported specifics.
4. Match the intended register and, when available, the author's own writing sample.
5. Preserve legitimate human quirks instead of mechanically normalizing them.
6. Run the draft → audit → final loop before delivering output.

Opinions and reactions may be part of voice when the source and genre support them. They must never smuggle in new factual claims.

## Voice Calibration

If the user provides their own writing sample:

1. Read the sample before rewriting.
2. Note sentence length, vocabulary, paragraph openings, punctuation, recurring phrases, and transitions.
3. Match those habits instead of merely deleting watched patterns.
4. Do not upgrade casual wording or regularize deliberate quirks.

A genuine writing sample outranks generic Humaniser style defaults. Explicit caller constraints still outrank the sample.

## Personality and Soul

Sterile prose can sound as synthetic as over-polished prose.

For blogs, essays, opinion, and personal writing, preserve or restore personality where the source supports it: uneven rhythm, genuine stance, humor, uncertainty, asides, and mixed feelings.

For technical, legal, encyclopedic, procedural, or reference text, neutral plain prose may be the correct human voice. Do not inject opinions or first person merely to sound human.

## Invocation Modes

### Pasted text

The user provides text directly.

Run the full loop and return:

1. draft rewrite;
2. brief audit;
3. final rewrite.

Use [the audit template](assets/audit-template.md).

### File mode

The user points to a file.

- Read the full file before rewriting.
- Run the draft → audit → final loop internally.
- Rewrite the file with only the final version.
- Humanize prose only.
- Preserve code blocks, frontmatter, structured data, and link targets.
- Preserve any additional immutable regions declared by an active caller skill.
- In conversation, report a short summary rather than pasting the whole rewrite.

### Embedded mode

Another skill or agent invokes Humaniser as one stage of a larger workflow.

- Run the loop internally.
- Return only the final humanized text.
- Do not emit draft, audit bullets, summaries, or ceremony.
- Treat caller-provided structural, scope, typography, and preservation constraints as hard requirements.

## Pattern References

Load only the groups that match the observed prose. For broad or full-document cleanup, read all pattern references.

- Read [content patterns](references/content-patterns.md) for inflated significance, promotional framing, vague attribution, superficial analysis, or formulaic challenge/future sections.
- Read [language and grammar patterns](references/language-and-grammar-patterns.md) for AI vocabulary clusters, copula avoidance, negative parallelisms, forced triads, synonym cycling, false ranges, passive voice, or subjectless fragments.
- Read [style patterns](references/style-patterns.md) for dashes, boldface, list formatting, heading capitalization, emoji, or quotation typography.
- Read [communication patterns](references/communication-patterns.md) for chatbot residue, speculative gap filling, or sycophantic tone.
- Read [filler and rhetoric patterns](references/filler-and-rhetoric-patterns.md) for filler, hedging, generic conclusions, fake authority, signposting, diff narration, manufactured punchlines, or canned rhetorical openers.
- Read [detection guidance](references/detection-guidance.md) before aggressive edits, whenever evidence is ambiguous, or when human quirks may be false positives.

## Process

1. Read the full input.
2. Identify the relevant pattern clusters and load only the references needed to evaluate them.
3. Write a draft rewrite that:
   - preserves all supported claims;
   - keeps specific details;
   - prefers simple constructions when they are clearer;
   - varies sentence length naturally;
   - respects the source's register and caller constraints.
4. Audit the draft by asking:
   - **What still makes this read like AI-generated prose?**
   - **Did the rewrite introduce any fact, name, number, date, quote, citation, source, or specific claim absent from the source?**
5. Fix every material audit finding.
6. Run the final preservation checks.
7. Deliver only what the invocation mode requires.

## Preservation Rules

Never silently alter:

- factual values;
- proper names;
- quotes merely because they contain watched phrases;
- titles or examples being discussed;
- code;
- citations;
- technical identifiers;
- link targets.

In file or embedded mode, also preserve every region the caller marks immutable.

When keeping source information and mirroring source structure conflict, information preservation wins unless the caller explicitly freezes the structure.

## Dash Rule

By default, generated rewrites contain no em dash (`—`) or en dash (`–`). Use punctuation or sentence restructuring instead.

An authentic user writing sample may override this default when dash usage is demonstrably part of the author's voice. A caller's explicit zero-dash constraint overrides the sample.

## Final Checks

Before returning the final rewrite, verify:

- no invented fact, name, number, date, quote, citation, source, or unsupported specificity;
- no material source claim was accidentally lost;
- voice matches the requested register or authentic sample;
- caller constraints are still satisfied;
- edits targeted clusters of AI tells rather than harmless isolated features;
- protected content remains unchanged;
- dash policy is satisfied for this invocation.

If a sentence cannot be improved without changing a fact, keep the fact and simplify around it.

## Reference Basis

This skill is based on Wikipedia's "Signs of AI writing" guide maintained by WikiProject AI Cleanup. The catalog is a heuristic editing reference, not an AI-authorship detector.
