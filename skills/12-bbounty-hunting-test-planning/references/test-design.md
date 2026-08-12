# Low-Impact Test Design

## Purpose And Preconditions

Design an authorized validation that minimizes service, data, and third-party risk. Require an admitted hypothesis, exact authorization constraints, approved test identity or account rules, and predeclared stop recipient.

## Planning Methodology

1. Select the least invasive observation that could distinguish the hypothesis from expected behavior.
2. Define the asset, approved conditions, data classification, request-volume limit, concurrency limit, and time window from authorization.
3. Describe benign and concerning signals without payloads, exploit paths, or execution instructions.
4. Define manual evidence capture, independent review needs, and the condition requiring a separate approval before any escalation.

## Interpretation And Uncertainty

A changed response, error, delay, or access difference may arise from normal controls, caching, account state, deployment changes, or instrumentation. Require repeatability only within the approved constraints and preserve environmental context before interpreting a signal.

## False-Positive And Scope Limits

This guide plans validation only. It does not permit scanning, enumeration, fuzzing, bypass attempts, exploitation, data extraction, persistence, lateral movement, or interaction with a third party. A test plan cannot extend written authorization.

## Evidence And Handoff

For each plan item, retain the hypothesis ID, authorization reference, approved constraints, expected signals, stop conditions, and reviewer. Handoff observations with their limitations and request a decision before further action.

## Sources

- [OWASP Web Security Testing Guide: Testing Framework](https://owasp.org/www-project-web-security-testing-guide/)
- [PortSwigger: Responsible disclosure](https://portswigger.net/web-security/ethical-hacking)
