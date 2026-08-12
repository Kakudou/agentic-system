# Client and Framework Signals

## Purpose

Interpret technologies visibly declared in a normal page experience or public project material without automating asset inspection or using framework signatures.

## Preconditions

- The normal page and any referenced public material are in scope.
- The program permits ordinary browser access; unlinked asset retrieval or tooling requires separate authorization.

## Method

Observe only what a normal visit renders or what the organization publicly states. Capture a human-readable declaration, visible attribution, or source URL. Do not crawl scripts, unpack bundles, inspect runtime globals, or use technology-detection extensions or automation unless separately authorized.

## Interpretation

- A public declaration supports that the organization uses or has used the named technology, subject to its date and stated scope.
- A visible client artifact may support a client-layer hypothesis, not an origin implementation claim.
- A CMS, generator, or library reference can originate in content, a theme, analytics, or an embedded third-party component.

## False-Positive Controls

- Separate first-party pages from embedded third-party content.
- Check whether the source identifies the target, environment, and date.
- Require independent current evidence before assigning high confidence; otherwise use moderate, low, or unknown.

## Scope and Rate Limits

Use the minimum normal pages needed for the stated observation. Do not authenticate, enumerate routes, submit forms, or retrieve unlinked client assets. Stop on rate-limit indicators or when the source no longer clearly maps to the authorized target.

## Evidence

Record the visible declaration or artifact description, source locator, time, target relationship, and plausible alternative source. Redact user data and session material.

## Sources

- https://www.w3.org/TR/html52/
- https://owasp.org/www-project-web-security-testing-guide/
