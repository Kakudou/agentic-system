# Role Observation

## Purpose

Record role names and stated capabilities visible through normal in-scope documentation or approved-account interfaces. A label is not proof that a role has a particular permission.

## Preconditions

- The target and account are explicitly authorized.
- Observation uses normal navigation and does not alter role membership, invitations, settings, or data.

## Method

- Capture role labels, help text, settings descriptions, and documented permission summaries as displayed.
- Note where a role appears: account profile, workspace membership, project membership, or documentation.
- Record the source location, timestamp, and whether the statement is direct or inferred.

## Interpretation And Controls

- Treat marketing names, stale help text, and client-side labels as low confidence until corroborated by an independent in-scope source.
- Do not infer hierarchy from names such as `admin`, `owner`, or `viewer`.
- Do not invite users, alter memberships, edit claims, or attempt a role change.

## Privacy Safeguards

Redact names, email addresses, account IDs, tokens, and unrelated membership details. Capture the minimum text needed to support the observation.

## Evidence And Handoff

Add one worksheet row per observed role, with its source and confidence. Escalate only the bounded observation, not a claim of missing enforcement.

## Sources

- [PortSwigger: Access control](https://portswigger.net/web-security/access-control)
- [OWASP API Security: Broken Function Level Authorization](https://owasp.org/API-Security/editions/2023/en/0x11-t10/)
