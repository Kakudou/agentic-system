# Session/State Boundary Interpretation

## Purpose

Classify observed session and state artifacts without collecting or replaying their values.

## Preconditions

- Observation is within the authorized host and account boundary.
- The program permits the relevant browser or proxy metadata view.

## Method

Record artifact categories only: browser cookie, storage key, anti-forgery field, redirect state label, logout control, or server-rendered account indicator. Note where it appears and whether it is public, supplied-account, or external. Use the normal UI; do not modify, replay, copy, decode, or transfer artifacts.

## Interpretation And Controls

An artifact name, `HttpOnly` flag, or UI state alone does not establish session security or authorization behavior. Mark observations as descriptive, not findings. Attribute artifacts to the host that presents them; do not assume a third-party cookie or redirect parameter belongs to the target.

## Privacy, Evidence, And Handoff

Never save cookie values, bearer material, authorization codes, state values, CSRF values, full headers, or browser exports. Use type, host, and redacted attribute names only. If sensitive material is exposed, stop capture and follow the stop checklist.

## Sources

- [PortSwigger: Authentication vulnerabilities](https://portswigger.net/web-security/authentication)
- [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
