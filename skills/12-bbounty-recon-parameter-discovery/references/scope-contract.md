# Scope And Request-Contract Baseline

## Purpose

Establish the authorization boundary before recording any target input.

## Preconditions

An official program policy, written authorization, or equivalent request contract is available. If it is absent or contradictory, stop.

## Method

Record in-scope hosts, paths, methods, accounts, observation window, rate limits, prohibited actions, data handling rules, and contact/escalation route. Resolve conflicts in favor of the narrower constraint. Observation is limited to ordinary approved navigation and existing client/documentation artifacts.

## Interpretation And Controls

Scope is not inferred from DNS, branding, links, redirects, third-party assets, or client code. Authenticated access does not expand method, account, or data authorization. Pause on a redirect, cross-origin call, sensitive data, unexpected state change, or unclear ownership.

## Evidence And Handoff

Keep the policy URL or authorization reference, retrieval timestamp, and a concise constraint summary. Do not include credentials or copied secrets. Pass the bound scope with every inventory item.

## Sources

- HackerOne Code of Conduct: https://www.hackerone.com/disclosure-guidelines
- Bugcrowd Vulnerability Rating Taxonomy overview: https://www.bugcrowd.com/vulnerability-rating-taxonomy/
