# Evidence model

This is a reasoning contract, not a required user-visible serialization format.

## Conceptual evidence record

For each useful item, track as much of the following as the source actually exposes:

```yaml
source: <source family>
kind: <post|thread|video|release|issue|paper|article|review|market|...>
title_or_claim: <short identifier>
author_or_origin: <person/channel/community/org>
published_at: <underlying content/event date>
url_or_citation_target: <exact item>
provenance: <primary|first-party|community|reporting|aggregation>
engagement: <source-native metrics only when visible>
summary: <what this item actually supports>
corroborates: <independent claim/event cluster, if any>
```

Missing fields stay unknown. Never manufacture them for schema completeness.

## Evidence classes

### Primary

The person, project, company, organization, repository, paper, filing, or market directly involved.

Best for: what was said, shipped, published, filed, changed, or priced.

### Community

Threads, comments, reviews, creator/user reactions, practitioner reports.

Best for: experience, sentiment, friction, recommendations, disagreement.

Not automatically representative of a population.

### Reporting

Independent journalism, analysis, interviews, or specialist reporting.

Best for: external verification, context, controversy, synthesis across actors.

### Aggregation

Discovery pages, clusters, search indexes, reposts.

Best for: finding originals. Usually weak as final evidence.

## Independence

Do not count these as independent corroboration:

- syndications of the same article
- articles quoting the same original post without new reporting
- reposts/quote-posts with no additional evidence
- multiple pages from one announcement bundle
- multiple links inside one aggregator cluster when they all derive from the same source

Independent corroboration means materially separate observation, reporting, artifact, or community evidence.

## Engagement semantics

Keep metrics source-native:

- Reddit: score/upvotes, comments
- X: likes, reposts, replies, views when exposed
- YouTube/TikTok/Instagram: views, likes, comments, shares when exposed
- Hacker News: points, comments
- GitHub: stars, forks, issue/PR activity — current snapshots unless historical data is directly available
- Trustpilot: review rating and current aggregate score
- Polymarket: price/probability, volume/liquidity when shown

Never normalize these into a fake cross-platform score.

## Confidence reasoning

Confidence should rise with:

- direct primary evidence
- precise, inspectable provenance
- multiple independent source families
- agreement across different evidence types
- recent evidence that directly addresses the user's question

Confidence should fall with:

- single-source dependence
- inaccessible underlying content
- ambiguous entity resolution
- search snippets only
- obvious sampling bias
- contradictory high-quality evidence
- stale or uncertain dates

Use qualitative language (`strong`, `moderate`, `thin`, `uncertain`) only when useful to the user; do not force labels onto every finding.

## Freshness

Use the date of the underlying content/event.

Search-result recency, crawl date, page update date, current aggregate metric, or current repository state does not by itself prove a change occurred inside the requested window.

When an item has multiple relevant dates, retain the date tied to the claim being made. Example: a paper revision date can support a claim about the revision, but not necessarily about the original publication.

## Coverage

Coverage is tracked per selected source family:

- `covered`
- `covered-no-results`
- `partial`
- `unavailable`

`not-selected` means the orchestrator intentionally did not use the source.

Coverage describes retrieval quality, not the popularity of the topic.
