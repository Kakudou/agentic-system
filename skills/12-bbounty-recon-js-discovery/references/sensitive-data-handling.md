# Sensitive-Data Stop and Redaction Controls

## Purpose

Prevent sensitive data exposed during authorized client-artifact observation from being copied, expanded, or disclosed in working notes and handoffs.

## Preconditions

- The engagement provides an authorized reporting channel and stop contact.
- Evidence storage has access controls appropriate to the program.
- The observer can halt collection immediately.

## Method

Treat credentials, session material, personal data, payment data, private keys, internal-only configuration values, and unapproved customer content as sensitive. Stop viewing or collecting the value, avoid copying it, and record only the category, artifact context, timestamp, scope status, and minimal redacted locator needed for escalation. Use the [stop and redaction checklist](../assets/sensitive-data-stop-redaction-checklist.md).

## Interpretation and Scope Controls

A value-like string is not proof of a valid secret and must not be tested. Public client configuration can still be sensitive in context. Do not decode, transform, validate, replay, or use observed values. When classification is uncertain, handle it as sensitive and request program guidance.

## Stop and Redaction

Immediately stop on live-looking credentials, authentication material, personal or customer data, private source content, or evidence outside authorization. Redact at source before broad sharing, preserve only the minimum evidentiary context, and use the program's secure channel rather than issue comments or general logs. Do not retain raw values in reusable skill assets.

## Evidence and Handoff

Record the sensitivity category, minimal redacted locator, stop time, people or channel notified, and any evidence-access restriction. The handoff must state that no validity test occurred.

## Sources

- [OWASP Web Security Testing Guide: Data Exposure](https://owasp.org/www-project-web-security-testing-guide/)
- [CISA: Protecting Sensitive and Personal Information](https://www.cisa.gov/topics/cyber-threats-and-advisories)
