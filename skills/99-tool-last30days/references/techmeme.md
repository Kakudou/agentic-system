# Techmeme

## Purpose

Use Techmeme as a discovery layer for technology-news clusters and to identify which events dominated industry coverage.

## When to use

Use for technology news when clustering helps find the principal event and original sources. Do not use it merely to add another citation.

## Entity resolution

Resolve the company/product/person name only enough to distinguish the correct news cluster. No account identity is normally required.

## Preferred access

Use direct Techmeme pages/clusters, then open the principal original reporting or first-party announcement.

## Fallback access

Use domain-restricted web search on `techmeme.com` to discover relevant clusters.

## Query recipes

- `site:techmeme.com "{topic}"`
- `site:techmeme.com "{company}" "{product}"`

## Evidence to extract

- cluster/event date
- principal linked sources
- event framing only as discovery context
- original sources opened separately for factual claims

## Freshness validation

Use the underlying article/announcement/event dates for final claims. Techmeme cluster recency is a discovery hint, not a replacement for source-date validation.

## Quality traps

- aggregator treated as primary evidence
- multiple links in one cluster counted as independent corroboration
- syndicated coverage inflated into a trend
- headline-only conclusions

## Coverage semantics

`covered` when relevant clusters and originals can be inspected; `covered-no-results` when reliable Techmeme search finds no relevant cluster; `partial` when cluster/source access is incomplete; `unavailable` when Techmeme cannot be reached.
