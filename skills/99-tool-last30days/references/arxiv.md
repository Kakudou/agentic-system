# arXiv

## Purpose

Use arXiv for recent scientific and technical preprints, submissions, revisions, and author-reported research results.

## When to use

Use for recent research, methods, benchmarks, technical claims, papers, and literature-aware trend questions.

## Entity resolution

Resolve exact paper title, authors, arXiv identifier, and linked project/code when relevant. Distinguish similarly titled papers and versions.

## Preferred access

Use direct `arxiv.org/abs/{id}` abstract pages or host-native academic search, then inspect the paper/abstract metadata.

## Fallback access

Use domain-restricted web search on `arxiv.org`, ideally exact concepts/titles/authors.

## Query recipes

- `site:arxiv.org/abs "{topic}"`
- `site:arxiv.org "{exact concept}" {year}`
- `site:arxiv.org "{paper title}" "{author}"`

## Evidence to extract

- title
- authors
- submission date
- revision date when relevant
- abstract claims
- linked code/project when relevant
- exact paper/version citation target

## Freshness validation

Use original submission date for a new-paper claim and revision date only for claims specifically about a recent revision. A recent revision does not make every original result newly published.

## Quality traps

- preprint treated as peer-reviewed fact
- author-reported results treated as independent replication
- revision date misused as initial publication date
- third-party summaries preferred over the paper for technical claims

## Coverage semantics

`covered` when relevant paper metadata/abstracts can be inspected; `covered-no-results` after reliable academic/arXiv search; `partial` when only search snippets/metadata are available; `unavailable` when arXiv cannot be reached.
