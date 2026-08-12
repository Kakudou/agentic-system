# Crawl Boundaries

## Purpose and Preconditions

Use this reference to turn written authorization into an observable boundary. Obtain the program policy or owner approval, approved hosts and paths, exclusions, time window, rate/request budget, and escalation contact before beginning.

## Low-Impact Methodology

Work from explicitly approved seeds only. For each discovered URL, compare its scheme, registrable host, port, path, and route purpose with the approved boundary. Record redirects and third-party destinations as observations; do not follow them unless expressly covered. Keep observation volume within the agreed rate and request budget, and stop if controls indicate strain or a boundary is unclear.

## Observations and Interpretation

- A link or sitemap entry is a discovery lead, not access authorization.
- Redirects, asset hosts, identity providers, APIs, preview environments, and alternate ports require independent scope confirmation.
- `robots.txt` can describe crawler preferences but does not grant authorization or override engagement rules.
- Record an unknown route as `requires approval`, not as in scope or inaccessible.

## State-Change Avoidance

Do not submit forms, follow logout or deletion links, download potentially executable content, invoke APIs, create accounts, or use credentials. Stop before any route that could change server or account state.

## Limits, Evidence, and Handoff

Record the authorization reference, exact boundary, classification rationale, timestamp, source URL, and redacted observation. Escalate scope ambiguities, redirects beyond the approved target, rate-limit responses, and suspected side-effect routes to the engagement owner. See [RFC 9309](https://www.rfc-editor.org/rfc/rfc9309) for the Robots Exclusion Protocol and [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/) for authorized testing context.
