# Remediation Handoff Template

```text
Subject: Authorized observation: possible public artifact exposure

Authorization reference: <reference>
Asset ownership: <confirmed | unconfirmed | conflicting>; basis: <redacted basis>
Observation time (UTC): <time>
Approved method: <method>
Artifact locator: <redacted locator>
Classification: <classification>
Observed boundary: <minimum redacted summary>
Expected boundary: <expected public-release boundary>
Confidence and alternatives: <level; alternatives>
Sensitive-data stop: <yes/no; category only if yes>

Requested owner actions:
1. Confirm ownership and whether publication is intended.
2. Validate impact using internal controls; no artifact content was retrieved or tested.
3. If unintended, remove the artifact from public release, review build/deployment allowlists, invalidate caches, and apply owner-directed incident handling.

Handoff status: <awaiting-owner-review | owner-confirmed | not-reproducible | out-of-scope>
```

Do not attach artifact content, credentials, personal data, internal paths, or reproduction instructions.
