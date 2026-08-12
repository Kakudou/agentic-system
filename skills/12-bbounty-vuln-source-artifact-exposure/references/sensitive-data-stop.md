# Sensitive-Data Handling And Immediate Stop

## Purpose

Prevent unnecessary collection, retention, or disclosure when an approved observation displays possible sensitive material.

## Preconditions

- An observation is in progress within confirmed authorization.
- A designated restricted reporting channel is known.

## Method

At the first sign of credentials, tokens, personal data, private keys, internal source content, customer data, session material, or similarly sensitive information: stop viewing and do not reload, download, copy, validate, or use it. Record only that a stop event occurred, its time, the redacted artifact locator, and the data category. Use the [sensitive-data stop checklist](../assets/sensitive-data-stop-checklist.md).

## Interpretation And Controls

Do not decide sensitivity by attempting to decode, authenticate, or test material. A suspected secret remains unverified. Screenshots, browser history, logs, and report attachments can amplify exposure; omit them unless the authorized owner explicitly requests a minimized, secure submission.

## Evidence And Handoff

Notify the designated recipient through the restricted channel with the category, locator in approved redacted form, stop action, and request for handling instructions. Retain no sensitive payload in reusable notes or general issue trackers.

## Sources

- OWASP, [Secrets Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
- CISA, [Vulnerability Disclosure Policy Template](https://www.cisa.gov/resources-tools/resources/vulnerability-disclosure-policy-template)
