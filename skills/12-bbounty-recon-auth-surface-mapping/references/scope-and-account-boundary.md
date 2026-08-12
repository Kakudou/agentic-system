# Scope And Account Boundary

## Purpose

Translate the program authorization into a written observation boundary before mapping authentication surfaces.

## Preconditions

- Written program scope and rules are available.
- A contact can resolve ambiguity or receive a stop notice.

## Method

Record allowed hosts, excluded systems, approved observation methods, permitted hours or rates, and each supplied account or test-user class. Treat unlisted subdomains, identity-provider tenants, mobile apps, APIs, and account types as out of scope until explicitly confirmed.

## Interpretation And Controls

A visible link does not expand scope. A redirect to a third-party identity provider is an observation boundary, not permission to continue. Do not infer a role, tenant, or account relationship from a label alone.

## Privacy, Evidence, And Handoff

Store authorization references separately from target evidence. Record account class and owner, never credentials or personal identifiers. Hand off unresolved scope questions before further observation.

## Sources

- [OWASP Web Security Testing Guide: Information Gathering](https://owasp.org/www-project-web-security-testing-guide/)
- [PortSwigger: Authentication](https://portswigger.net/web-security/authentication)
