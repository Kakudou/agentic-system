# Confidence, Validation, And Handoff

## Purpose

Turn observations into a privacy-preserving handoff without overstating authorization behavior or creating a testing recipe.

## Preconditions

The evidence worksheet and confidence matrix are complete, redacted, and limited to the approved scope.

## Method

- Classify each statement as observed, corroborated, inferred, or unknown.
- Seek corroboration from an independent permitted source such as published documentation and a normal assigned-account view.
- Use the stop checklist before capturing evidence and before delivery.

## Interpretation And Controls

- UI labels, HTTP status codes, and route names alone are insufficient to establish authorization behavior.
- Mark stale documentation, cached content, feature flags, localization, and client-side rendering as possible false-positive sources.
- Do not validate a suspected gap through bypass attempts, altered requests, object-ID substitution, or cross-account access.

## Privacy Safeguards

Minimize, redact, and securely retain evidence according to program rules. Do not include credentials, session artifacts, personal data, sensitive object content, or unrelated tenant information.

## Evidence And Handoff

Provide scope, sources, observations, confidence, gaps, stop conditions encountered, and a request for separately authorized follow-up if needed. Use the handoff template verbatim where practical.

## Sources

- [PortSwigger: Access control](https://portswigger.net/web-security/access-control)
- [OWASP API Security: Broken Object Level Authorization](https://owasp.org/API-Security/editions/2023/en/0x11-t10/)
