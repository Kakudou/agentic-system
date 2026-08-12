# Public Code And Repository Review

## Purpose

Review public repository metadata and intentionally public project material to identify target-associated technology or asset hypotheses without searching for secrets or testing any referenced system.

## Preconditions

- Establish a documented link between the repository or organization and the in-scope target.
- Use only material presented publicly by the hosting service.
- Confirm program rules permit public-source review.

## Passive Authorized Method

Review repository ownership, stated project purpose, release notes, issue or documentation references, and publicly visible configuration descriptions relevant to scope. Record stable URLs and revision identifiers. Do not clone private material, use credentials, automate broad collection, search for secrets, or follow discovered endpoints.

## Interpretation And Controls

- Forks, templates, mirrors, examples, archived projects, and contributor affiliations do not prove target ownership or deployment.
- A hostname or endpoint string in code can be test data, documentation, or historical configuration.
- Attribute a claim only when repository ownership and claim context independently support it; otherwise label it unverified.

## Privacy And Scope Limits

Do not collect access tokens, keys, personal contact data, or bulk source code. If such data appears, stop, minimize the record to a safe locator and notification context, and use the program's sensitive-data reporting process.

## Evidence And Handoff

Record repository URL, owner relationship evidence, commit or release identifier, observed context, date, and attribution confidence. Handoff possible exposure only through the authorized disclosure route, without reproducing sensitive values.

## Sources

- [GitHub Docs, About code search](https://docs.github.com/en/search-github/github-code-search/about-github-code-search)
- [GitHub Docs, Responsible disclosure of security vulnerabilities](https://docs.github.com/en/code-security/security-advisories/working-with-repository-security-advisories/about-repository-security-advisories)
