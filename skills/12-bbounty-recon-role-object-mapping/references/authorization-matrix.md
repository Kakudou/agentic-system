# Object And Action Classification

## Purpose

Create an observation-backed inventory of object types and ordinary actions for later authorized review. This is not a permission test matrix.

## Preconditions

- Scope and permitted normal actions are recorded.
- Any authenticated observation uses only the assigned test account and its own visible objects.

## Method

- Identify object types from labels, URLs, API documentation, forms, and normal views.
- Classify visible actions in neutral terms: view, create, update, export, share, or administer.
- Record whether an identifier, owner indicator, organization/workspace context, or lifecycle state is visible. Do not alter identifiers or replay requests.

## Interpretation And Controls

- A visible control, route name, or documentation entry does not prove the action is available or authorized.
- Separate object type from instance data and distinguish normal UI behavior from a documented API capability.
- Exclude endpoints and actions outside the published scope; mark unavailable context as unknown.

## Privacy Safeguards

Use object categories and redacted examples. Do not retain payload bodies, exports, attachments, or identifiers unnecessary for the inventory.

## Evidence And Handoff

Connect each object/action pair to an exact source location and confidence rating in the worksheet. Flag ambiguous terminology for validation rather than resolving it by experimentation.

## Sources

- [PortSwigger: Access control](https://portswigger.net/web-security/access-control)
- [OWASP API Security: Broken Object Property Level Authorization](https://owasp.org/API-Security/editions/2023/en/0x11-t10/)
