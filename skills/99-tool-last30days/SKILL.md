---
name: 99-tool-last30days
description: Research what was said, shipped, debated, recommended, published, or predicted about a topic during the last 30 days using only the host's existing web, search, browser, and connector capabilities. Use for recent developments, community sentiment, product research, software/project activity, people, research, comparisons, trends, or predictions where multi-source freshness and explicit coverage matter.
compatibility: Requires host-provided network/search/browser access to public sources. No bundled runtime, scripts, API keys, database, cache, or package installation.
metadata:
  version: "2.0"
  opencode/slash: 'true'
---

# Last 30 Days — Pure

Research a topic over an exact recent time window without shipping a search engine inside the skill.

This skill coordinates a bounded research workflow. Source-specific acquisition knowledge lives in `references/*.md` and is loaded only when that source is selected.

## Invariants

1. Use only capabilities already exposed by the host.
2. Do not install tools, require API keys, create databases/caches, or run bundled code.
3. Compute and state an exact research window internally before searching.
4. Resolve ambiguous entities before broad fan-out.
5. Select sources by information need, not by a fixed checklist.
6. Load only the source references actually needed.
7. Validate freshness on the underlying content/event date, not search-engine recency alone.
8. Prefer original artifacts and primary sources over summaries of them.
9. Treat engagement as attention, never as truth.
10. Distinguish source silence from source inaccessibility.
11. Deduplicate syndicated, reposted, quoted, or clustered coverage before synthesis.
12. Separate observed facts, attributed opinion, and inference.
13. Cite every material factual claim with the host's native citation/link mechanism.

## Workflow

### 1. Bound the request

Derive:

- `TOPIC`
- `WINDOW_START`
- `WINDOW_END`
- `INTENT`
- `ENTITIES`
- any explicit geography, language, audience, comparison target, or decision criterion

Default window: previous 30 calendar days through today.

If the user specifies another recent window, use it instead; the rest of the workflow stays unchanged.

Suggested intent labels:

- `news`
- `opinion`
- `product`
- `comparison`
- `how-to`
- `person`
- `project`
- `prediction`
- `trend`
- `research`
- `general`

### 2. Route sources

Read [references/source-map.md](references/source-map.md).

Choose the **smallest source set that can answer the question well**. Add a source only when it contributes a distinct evidence type or materially improves corroboration.

Typical minimum: 2-4 independent source families for broad claims. A single authoritative primary source may be sufficient for a narrow factual question.

### 3. Resolve entities

Before deep source search, establish only identities that affect retrieval, such as:

- official name/domain
- aliases or former names
- social handles
- GitHub `owner/repo`
- subreddit/community names
- creator/channel identity
- paper title/authors
- market wording

Do not guess unresolved identities. If ambiguity remains, search with disambiguators and keep conclusions bounded.

### 4. Build a compact query plan

Create 2-5 angles appropriate to the request, for example:

1. exact topic/entity
2. recent announcement/release/event
3. reactions, reviews, complaints, recommendations, or discussion
4. source-specific identity/community/repository
5. comparison/alternative wording

Prefer short human-like searches over giant Boolean expressions.

### 5. Load source adapters and collect

For every selected source:

1. Read its direct `references/<source>.md` file.
2. Follow its preferred access path first.
3. Use its documented fallbacks only when preferred access is unavailable or incomplete.
4. Apply the same evidence and coverage contract described in [references/evidence-model.md](references/evidence-model.md).
5. Keep only evidence whose actual content/event date falls inside the window, except clearly labeled background.

A source reference is procedural knowledge, not permission to invent a capability. If the host cannot reach that source, record the correct coverage state and continue.

### 6. Normalize evidence

Mentally normalize each useful item using [references/evidence-model.md](references/evidence-model.md).

Discard or downgrade:

- duplicates and reposts with no new evidence
- material outside the requested window unless needed as background
- SEO pages that merely restate other sources
- search snippets when the underlying page can be inspected
- items whose only recent date is a crawl/update timestamp unrelated to the event
- claims not supported by retrieved material

### 7. Corroborate and reason

Prefer evidence roughly in this order, adjusted for the question:

1. direct primary statements/artifacts
2. first-party releases, repositories, papers, filings, docs, videos
3. substantive community evidence and practitioner reports
4. independent reporting
5. aggregators/discovery layers

Increase confidence when **independent source families** converge.

Do not create a universal numeric score across incompatible metrics such as upvotes, views, stars, comments, ratings, or market prices.

### 8. Synthesize for the user's decision

Answer the question rather than narrating the search process.

A good default output contains:

- one concise top-line finding
- 3-7 evidence-backed findings ordered by importance
- disagreement or uncertainty where material
- community sentiment only when actual community evidence was retrieved
- concrete metrics only when directly observed and relevant
- a short coverage note when gaps materially affect confidence

For comparisons, organize around decision-relevant dimensions.

For trends, distinguish:

- multi-source momentum
- one-platform virality
- announcement/reporting spikes
- weak or uncertain signals

For people/projects, distinguish what the subject themselves said/shipped from what others said about them.

## Freshness rules

The requested time boundary is strict for findings labeled recent.

- A recent article about an old event does not make the event recent.
- A recently edited old page is not recent evidence unless the edit represents a substantive new event.
- A post, release, issue, pull request, commit, paper submission/revision, video, review, market movement, or announcement qualifies when that underlying event occurred inside the window.
- For `latest`, verify that a newer development has not superseded the candidate answer.

Older context is allowed only when clearly separated from recent findings.

## Coverage states

Use exactly these meanings:

- `covered` — source was reachable and yielded relevant qualifying evidence.
- `covered-no-results` — source was reachable enough to search reliably, but no qualifying evidence was found.
- `partial` — some evidence was retrievable, but access/indexing/search completeness was materially limited.
- `unavailable` — the host could not reliably reach or inspect the source.
- `not-selected` — the source was intentionally not used because it was not needed.

Never translate `partial` or `unavailable` into “nobody is talking about it there.”

## Failure behavior

- If evidence is sparse, say so.
- If a claim rests on one source family, label it as thin/single-source evidence.
- If social access is poor, do not infer community sentiment from journalism.
- If a source result is only a snippet, do not invent inaccessible content or engagement.
- If entity resolution fails, give the best bounded result and state the ambiguity.
- If sources conflict, surface the conflict and explain which evidence is primary, newer, or better corroborated.

## Reference index

Routing and shared contracts:

- [references/source-map.md](references/source-map.md) — source selection and routing
- [references/source-contract.md](references/source-contract.md) — required adapter shape and maintenance rules
- [references/evidence-model.md](references/evidence-model.md) — evidence normalization, confidence, freshness, coverage
- [references/test-matrix.md](references/test-matrix.md) — behavioral scenarios for regression testing

Source adapters:

- [references/web.md](references/web.md)
- [references/reddit.md](references/reddit.md)
- [references/x.md](references/x.md)
- [references/youtube.md](references/youtube.md)
- [references/tiktok.md](references/tiktok.md)
- [references/instagram.md](references/instagram.md)
- [references/hacker-news.md](references/hacker-news.md)
- [references/github.md](references/github.md)
- [references/polymarket.md](references/polymarket.md)
- [references/bluesky.md](references/bluesky.md)
- [references/arxiv.md](references/arxiv.md)
- [references/techmeme.md](references/techmeme.md)
- [references/trustpilot.md](references/trustpilot.md)
- [references/linkedin.md](references/linkedin.md)
- [references/threads.md](references/threads.md)
