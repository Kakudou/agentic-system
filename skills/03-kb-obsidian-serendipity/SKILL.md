---
name: 03-kb-obsidian-serendipity
description: "Start from one or more Obsidian zettels, expand into a small set of related configured zettels, and synthesize a coherent, evidence-grounded output from what the knowledge graph already contains. Use when the user wants to think with the vault rather than merely retrieve individual notes."
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# KB Obsidian Serendipity

Think with the vault.

Start from one or more seed zettels, expand only far enough to gather useful neighboring knowledge,
then synthesize one coherent output grounded in those notes.

This skill is read-only.

It does not create, edit, move, rename, or delete vault files.

## Usage

`/03-kb-obsidian-serendipity {zettel-or-zettels}`

The input may contain one seed zettel or several.

## Vault Configuration Input

Require a trusted vault descriptor that resolves the target vault and eligible zettel roots. When `03-kb-obsidian-vault-overview` is installed, it is the preferred local provider; an equivalent caller-supplied descriptor is also valid.

If required roots are unavailable or unconfigured, stop rather than guessing.

## Read When Needed

Always read:

- [Exploration and synthesis](references/exploration-and-synthesis.md)
- [Evidence contract](references/evidence-contract.md)

No assets are required.

## Core Contract

The skill must:

- begin with the supplied seed zettel or zettels;
- preserve the seed meaning and context;
- read their explicit outgoing zettel links when available;
- prefer useful diversity over collecting many near-duplicates;
- synthesize a coherent result rather than returning a search dump;
- distinguish source-backed facts from synthesis or hypothesis;
- keep every material conclusion traceable to the zettels that support it;
- stop when the available graph no longer supports useful expansion.

The skill must not:

- scan the entire vault;
- invent missing knowledge;
- treat semantic similarity as proof of a relationship;
- mutate access/use counters;
- modify the vault;
- perform Git operations.

## Workflow

### 1. Resolve Vault

Resolve the requested or default vault and its eligible configured zettel roots from the trusted descriptor. Use `03-kb-obsidian-vault-overview` when available locally, otherwise consume equivalent supplied configuration.

Do not hardcode vault paths.

### 2. Read Seeds

Resolve and read the supplied seed zettel or zettels.

Capture:

- title;
- aliases;
- tags;
- body;
- explicit zettel links;
- generic/derived relationship markers when present.

If a seed cannot be resolved unambiguously, report the bounded ambiguity instead of guessing.

### 3. Expand a Small Neighborhood

For each seed:

1. consider directly linked configured zettels;
2. do a search using the seed's core concepts;
3. keep only notes that materially add context, explanation, contrast, application, or a reusable
   parent/derived relationship.

Do not keep expanding merely because another note exists.

Default to a compact working set. The goal is enough material to think with, not exhaustive graph
coverage.

### 4. Identify the Coherent Thread

Read the selected notes together.

Find the strongest coherent thread supported by the set.

The thread may be:

- an explanation;
- an argument;
- a model;
- a design principle;
- a technical narrative;
- a structured set of observations.

Do not force novelty. If the notes support only a straightforward synthesis, write the straightforward
synthesis.

### 5. Synthesize

Write one coherent output.

Use the zettels as evidence, not as paragraphs to mechanically concatenate.

You may write new connective reasoning when it follows from the notes, but classify the epistemic
status correctly:

- `direct`: explicitly supported by one or more zettels;
- `synthesis`: reasonably follows from combining the zettels;
- `hypothesis`: plausible but not established by the current graph.

Do not present a hypothesis as fact.

### 6. Stop at the Evidence Boundary

When a useful argument requires knowledge not present in the selected zettels, say so.

Do not fill the gap from general model knowledge unless the user explicitly asks for outside
research.

## Output

Return:

1. a coherent synthesis;
2. the zettels that materially supported it;
3. any important unresolved gap or hypothesis.

Keep the source list compact. Do not dump every candidate considered.

## Completion Check

Before returning:

- every material factual statement is supported by selected zettels;
- synthesis is distinguishable from direct source claims where needed;
- the result is coherent rather than a list of note summaries;
- the expansion remained bounded;
- no vault mutation or Git operation occurred.
