# Web

## Purpose

Use the open web for first-party announcements, official documentation, changelogs, press releases, filings, interviews, recent reporting, and external verification.

## When to use

Use by default for factual recency, primary-source discovery, news, documentation, and corroboration. It may be the only source needed for a narrow official-fact question.

## Entity resolution

Resolve official domains, canonical names, aliases, product/project names, and the responsible organization before relying on domain-restricted searches.

## Preferred access

Use the host's native web search with a freshness/date constraint when available, then open the underlying result page. Prefer official/primary pages for what an entity said or shipped and independent reporting for external verification.

## Fallback access

Use broader web search, exact phrases, domain restrictions, month/year terms, and reputable secondary reporting when the original is unavailable. Search snippets are discovery evidence only when the underlying page cannot be inspected.

## Query recipes

- `"{topic}" {current month} {year}`
- `"{topic}" announcement OR release OR update`
- `"{topic}" site:{official-domain}`
- `"{entity}" interview {current month} {year}`
- `"{topic}" review {current month} {year}`

## Evidence to extract

- page/title
- publisher or organization
- underlying publication/event date
- primary claim or reported fact
- exact citation target
- independent corroboration when a claim is surprising or disputed

## Freshness validation

Validate the publication date and, separately, the date of the event being described. A recent article about an old event does not make the event recent.

## Quality traps

- SEO/listicle pages that merely restate other sources
- syndicated copies counted as independent confirmation
- search snippets treated as complete evidence
- page update/crawl dates mistaken for event dates

## Coverage semantics

`covered` when reachable pages yield qualifying evidence; `covered-no-results` only after reliable searching; `partial` when mostly snippets/paywalls/index gaps prevent inspection; `unavailable` when the host cannot reliably search/open the needed web material.
