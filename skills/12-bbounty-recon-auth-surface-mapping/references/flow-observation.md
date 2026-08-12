# Flow Observation

## Purpose

Map the visible sign-in and registration journeys without submitting data or trying alternate paths.

## Preconditions

- Scope and account boundary are recorded.
- The page is publicly visible or available through a supplied test account's ordinary UI.

## Method

Observe normal navigation, labels, page titles, displayed form fields, accessibility text, links, and declared providers. Record the journey source, destination category, visible transition, and whether it is public, supplied-account, or external. Registration is only a visible entry point unless account creation is specifically approved.

## Interpretation And Controls

Classify a control by its displayed purpose, not its URL or assumed backend endpoint. A generic "Continue" control may begin sign-in, registration, federation, or account linking; mark it ambiguous until the UI states otherwise. Do not submit forms, enumerate variants, or guess routes.

## Privacy, Evidence, And Handoff

Redact email addresses, identifiers, prefilled values, and query parameters. Preserve a minimal screenshot or textual description when permitted. Hand off each observed journey with source, destination category, confidence, and ambiguity.

## Sources

- [PortSwigger: Authentication](https://portswigger.net/web-security/authentication)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
