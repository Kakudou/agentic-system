# Observed Route and Configuration Correlation

## Purpose

Connect a browser-observed route or configuration label to the exact authorized navigation and client artifact context that exposed it. This does not discover endpoints or validate configuration.

## Preconditions

- The page, origin, and session are explicitly in scope.
- The route or configuration label is visible in a browser-network record, rendered interface, approved target documentation, or already delivered client artifact.
- A redacted record of the related user action is available.

## Method

For each correlation, record the source artifact or network record, timestamp, visible user action, authenticated context category, and exact observed label. Classify it as `observed` only when the same session directly shows the behavior; otherwise classify it as `interpretation` or `needs-approval`. Do not navigate guessed paths, replay requests, enumerate route families, derive endpoints from strings, or test configuration values.

## Interpretation and Scope Controls

Static strings may be dead code, templates, localization text, feature flags, third-party code, or environment-specific configuration. A browser request can also originate from extensions, service workers, analytics, or redirects. Correlation supports a bounded hypothesis, not route availability, method support, authorization state, ownership, or impact. Capture competing explanations and do not extend the target set.

## Stop and Redaction

Stop if the evidence exposes personal data, credentials, session material, internal identifiers, or an out-of-scope destination. Replace values with stable placeholders only when necessary to explain the correlation; never include raw secrets or request bodies. Follow [sensitive-data handling](sensitive-data-handling.md).

## Evidence and Handoff

Include the redacted source, action-to-observation linkage, confidence rationale, and a precise approval request for any follow-up. Use the [provenance matrix](../assets/provenance-confidence-matrix.md) and [handoff template](../assets/recon-handoff-template.md).

## Sources

- [OWASP Web Security Testing Guide: Information Gathering](https://owasp.org/www-project-web-security-testing-guide/)
- [MDN: Network request analysis in browser developer tools](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Client-side_tools/Network_requests)
