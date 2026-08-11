# LinkedIn

## Purpose

Use LinkedIn for public company/professional announcements, hiring signals, product launches, executive statements, and practitioner discussion.

## When to use

Use when professional/company communication, hiring, executive posts, B2B launches, or practitioner discussion is materially relevant.

## Entity resolution

Resolve the correct company page or person profile and distinguish duplicate names, subsidiaries, former employers, and similarly named organizations.

## Preferred access

Use direct public company/person/post pages or host-native LinkedIn search when available and readable.

## Fallback access

Use domain-restricted web search against posts, company pages, or profiles. Treat snippet-only access as partial.

## Query recipes

- `site:linkedin.com/posts "{topic}"`
- `site:linkedin.com/company "{company}" "{topic}"`
- `site:linkedin.com/in "{person}" "{topic}"`

## Evidence to extract

- author/company
- post date
- retrieved post text or accurate paraphrase
- job/hiring/product signal when directly observable
- engagement only when visible
- exact post/profile/company citation target

## Freshness validation

Use the post/job/announcement timestamp supporting the claim. Search snippets or profile update dates are not substitutes.

## Quality traps

- unauthenticated access limits
- professional self-presentation bias
- snippets treated as full posts
- job listings over-interpreted as strategy
- engagement treated as truth

## Coverage semantics

`covered` when relevant public content can be inspected; `covered-no-results` requires reliable search; snippet-only/login-limited access means `partial`; `unavailable` when usable LinkedIn content cannot be reached.
