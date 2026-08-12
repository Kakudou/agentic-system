# Baseline Methodology

## Purpose and Preconditions

Use this before any assessment observation to establish what normal, authorized use looks like. Require written scope, allowed origin and paths, account role, testing window, and an escalation contact.

## Bounded Safe Methodology

Use a normal browser session or a program-approved observation method. Visit only in-scope routes using ordinary navigation. Record the initial URL, redirect destination, status category, media type, visible behavior, and relevant response metadata. Compare authenticated and unauthenticated views only when both roles are supplied and explicitly authorized.

## Observations and Interpretation

A stable baseline lets later differences be attributed to a specific, permitted condition. Redirects, cache behavior, localization, A/B experiments, CDN variation, and login state can all legitimately change a response. A difference is an observation, not a finding, until its security consequence is demonstrated safely.

## False-Positive Controls

- Repeat the same normal interaction at least once within the authorized window.
- Record account state, browser, locale, and whether a cache, CDN, or feature flag may vary output.
- Compare with documented intended behavior or ask the target contact when available.

## Stop Conditions

Stop and escalate when scope is ambiguous, a route is out of scope, normal observation exposes sensitive data unexpectedly, or further checking would change state or affect availability.

## Evidence

Keep a redacted baseline record with authorization reference, timestamp, route, role, browser/environment, expected behavior, observed behavior, and immutable capture reference where permitted.

## Remediation

For unexpected normal-use behavior, recommend documenting the expected flow and adding regression coverage. Do not prescribe a security control until the affected trust boundary is known.

## Sources

- PortSwigger Web Security Academy, [Essential skills](https://portswigger.net/web-security/essential-skills)
- OWASP Web Security Testing Guide, [Introduction and objectives](https://owasp.org/www-project-web-security-testing-guide/)
