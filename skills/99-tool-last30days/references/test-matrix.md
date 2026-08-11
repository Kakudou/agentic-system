# Behavioral test matrix

Use these scenarios to regression-test the skill manually or with any host agent. Passing means the behavior is correct; exact wording and exact sources may vary.

## 1. Recent software project

Prompt shape: `What changed with FastAPI in the last 30 days?`

Expected:
- routes strongly to GitHub + Web; Reddit/HN only if discussion adds value
- resolves canonical repository before making release/activity claims
- distinguishes releases/commits from adoption or sentiment
- rejects old releases surfaced by recently crawled pages

## 2. Product/community opinion

Prompt shape: `What are people saying about Claude Code lately?`

Expected:
- routes to community-heavy sources such as Reddit/X/YouTube/HN plus Web for factual context
- does not infer broad sentiment from news coverage alone
- includes disagreement when evidence is mixed
- reports partial social coverage when direct platform access is incomplete

## 3. Security developments

Prompt shape: `What new Kubernetes CVEs matter this month?`

Expected:
- prefers authoritative security/project/vendor sources and Web; GitHub only where artifacts matter
- separates disclosure/publication date from older vulnerability history
- does not equate social attention with severity
- uses older material only as labeled context

## 4. Tool discovery/trend

Prompt shape: `What local LLM tools are gaining momentum this month?`

Expected:
- uses GitHub + Reddit/HN + Web, optionally YouTube
- distinguishes current stars from 30-day star growth unless historical evidence exists
- clusters repeated coverage of the same launch
- distinguishes multi-source momentum from one-platform virality

## 5. Latest official announcement

Prompt shape: `What's the latest OpenAI announcement?`

Expected:
- prioritizes first-party Web evidence
- verifies no newer official announcement supersedes the candidate
- does not fan out to every social source unless reactions are requested

## 6. Research advances

Prompt shape: `Recent advances in agentic RAG`

Expected:
- routes to arXiv + Web, optionally GitHub when code/artifacts matter
- identifies paper submission/revision dates correctly
- labels preprints as non-peer-reviewed when relevant
- distinguishes author-reported results from independent validation

## 7. Prediction question

Prompt shape: `What are prediction markets saying about <future event>?`

Expected:
- resolves exact market wording and resolution rules
- reports only directly observed current probability/price
- never treats market price as established fact
- does not invent historical movement when no time series was retrieved

## 8. Inaccessible social platform

Prompt shape: topic where TikTok/Instagram/X would be useful but direct access fails.

Expected:
- may use indexed snippets for discovery
- marks affected source `partial` or `unavailable`
- never reports `covered-no-results` solely because access failed
- never reconstructs unseen video/post content

## 9. Entity collision

Prompt shape: ambiguous person/product/project name.

Expected:
- resolves identity before fan-out
- uses domain/role/repository/company disambiguators
- bounds the answer if identity remains uncertain instead of guessing

## 10. Duplicate news wave

Prompt shape: a launch covered by many outlets from one press release.

Expected:
- clusters syndication/reposts as one evidence family
- does not count ten rewrites as ten independent confirmations
- prefers the announcement plus genuinely independent reporting/reaction

## Global assertions

Every scenario should also satisfy:

- exact requested window
- source selection proportional to the question
- direct source references loaded only when selected
- no runtime/install/API-key requirement
- no invented metrics/quotes/dates
- no universal cross-platform score
- material claims cited to inspectable evidence
