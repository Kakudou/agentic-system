# Source map

Use this file for routing. Load individual source adapters only after selecting them.

| Source | Distinct signal | Best for | Default cost | Common limitation |
|---|---|---|---|---|
| Web | primary facts + independent reporting | announcements, news, docs, verification | low | community signal is weak |
| Reddit | threaded community experience | opinion, troubleshooting, recommendations, complaints | medium | access/indexing may be partial |
| X | fast public statements/reactions | breaking narratives, direct statements, expert reaction | medium | indexing/search completeness varies |
| YouTube | long-form creator evidence | demos, reviews, tutorials, interviews | medium | transcript/comments may be unavailable |
| TikTok | short-form cultural/usage signal | demos, memes, fast-moving trends | high | often blocked/incompletely indexed |
| Instagram | visual creator/company signal | launches, reels, creator/brand reaction | high | unauthenticated access often partial |
| Hacker News | technical/startup discussion | developer reaction, launches, AI/security/startups | medium | audience is highly non-representative |
| GitHub | inspectable software artifacts | releases, issues, PRs, commits, repo facts | low | activity is not adoption |
| Polymarket | market-implied expectations | resolvable future events | low | price reflects market beliefs/rules, not fact |
| Bluesky | public social discussion | tech, media, science, community reaction | medium | indexing varies |
| arXiv | technical research artifacts | recent papers and revisions | low | preprints may not be peer reviewed |
| Techmeme | clustered tech-news discovery | identifying major tech news waves | low | aggregator, not preferred final evidence |
| Trustpilot | self-selected customer reviews | service/product experience | medium | review-selection/manipulation bias |
| LinkedIn | professional/company signal | company posts, hiring, launches, executives | high | public access frequently partial |
| Threads | public creator/social discussion | culture, brands, tech, entertainment | medium | indexing varies |

## Intent routes

Start with these routes, then prune or expand based on the actual question.

- `news` → Web; add X/Reddit for reaction; Techmeme for technology news discovery.
- `opinion` → Reddit + X + YouTube; add HN for technical audiences; TikTok/Instagram/Threads/Bluesky only when the audience lives there.
- `product` → Web + Reddit + YouTube; add Trustpilot for service experience, GitHub for developer products, TikTok/Instagram for creator-driven consumer products.
- `comparison` → Web + Reddit + YouTube; add GitHub for software. Organize synthesis by decision criteria, not by source.
- `how-to` → first-party Web/docs + YouTube + Reddit; add GitHub for code/config examples.
- `person` → Web + the person's primary public channel; add YouTube for interviews and GitHub for technical work.
- `project` → GitHub + Web; add Reddit/HN/X/YouTube when user/community reaction matters.
- `prediction` → Polymarket + Web; add X/Reddit only for narrative context, not as probability substitutes.
- `trend` → at least two independent signal families, usually Web + community + artifact/creator source appropriate to the domain.
- `research` → arXiv + Web; add GitHub for code and HN/Reddit only for practitioner reaction.
- `general` → Web plus the single most relevant community/artifact source; expand only when needed.

## Selection rules

Prefer the smallest useful set.

Add a source when it provides at least one of:

- primary evidence unavailable elsewhere
- a distinct audience/community
- independent corroboration
- a materially different signal type
- a necessary artifact (repository, paper, market, video)

Do not add sources merely to make the answer look comprehensive.

## Domain hints

- software/developer tools → GitHub, HN, Reddit, Web, YouTube
- cybersecurity → Web/authoritative advisories, GitHub when relevant, HN/Reddit for practitioner context
- AI/research → arXiv, GitHub, Web, HN, X/Reddit when reaction matters
- consumer products → Web, Reddit, YouTube, TikTok/Instagram, Trustpilot where appropriate
- startups/tech companies → Web, X, HN, LinkedIn, Techmeme
- entertainment/culture → Web, YouTube, TikTok, Instagram, X/Threads/Bluesky depending on community
- elections/future events → Web + exact relevant market(s); social sources only for discourse/context
