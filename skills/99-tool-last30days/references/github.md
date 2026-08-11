# GitHub

## Purpose

Use GitHub to establish what software projects or technical people actually shipped or changed through releases, tags, issues, pull requests, commits, repositories, and documentation.

## When to use

Use for software/project activity, release verification, bug/issue status, PRs, code artifacts, technical people, and developer-product research.

## Entity resolution

Resolve the canonical `owner/repo` before project claims. For people, resolve the correct GitHub account using bio, pinned projects, official links, organization membership, or other identity evidence.

## Preferred access

Use direct repository, release, issue, PR, commit, profile, and documentation pages; use host-native GitHub/code search when available.

## Fallback access

Use domain-restricted web search targeted at the resolved repository or user.

## Query recipes

- `"{topic}" github repo site:github.com`
- `"{person}" github profile site:github.com`
- `site:github.com/{owner}/{repo}/releases`
- `site:github.com/{owner}/{repo}/issues "{topic}"`
- `site:github.com/{owner}/{repo}/pull "{topic}"`

## Evidence to extract

- release/tag date and notes
- issue/PR state and timestamps
- commit/activity evidence only when directly observable
- repository stars/forks only as current snapshots unless historical data exists
- exact repository/artifact citation target

## Freshness validation

Use the timestamp of the release, issue, PR, commit, or documentation change supporting the claim. Current repo state or star count does not prove 30-day growth.

## Quality traps

- activity mistaken for adoption
- current stars mistaken for recent star growth
- forks/mirrors mistaken for canonical repo
- open issue mistaken for confirmed bug without context
- release pages or changelogs outside the window surfaced by current repo activity

## Coverage semantics

`covered` when the canonical repository/artifacts can be inspected; `covered-no-results` when reliable GitHub search finds no qualifying activity; `partial` when some artifact classes/search are inaccessible; `unavailable` when GitHub cannot be reliably reached.
