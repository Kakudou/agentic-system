---
name: 12-bbounty-recon-role-object-mapping
description: Build an authorized, observation-only map of roles, objects, actions, ownership, and tenant boundaries for later access-control review.
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Authorized Role/Object Recon

## Purpose

Produce a traceable inventory of observed authorization concepts without attempting access-control bypass, modifying data, or accessing accounts, objects, or tenants outside the approved scope.

## Prerequisites

- Written program authorization and a defined target scope.
- Confirmed [scope and test-account boundaries](references/scope-and-test-accounts.md), including approved accounts and allowed low-impact actions.
- A safe place to store redacted evidence.

## Workflow

1. Record the approved target, time window, accounts, and prohibited actions before observing anything.
2. Use normal, documented navigation and passive review of in-scope public material or approved-account views to record role labels and capability descriptions. See [role observation](references/user-roles.md).
3. Inventory object types, visible identifiers, lifecycle states, and normal actions without substituting identifiers or changing requests. See [object/action classification](references/authorization-matrix.md).
4. Model only observed ownership and organization/workspace context. Treat a displayed boundary as a hypothesis until supported by evidence. See [ownership and tenant-boundary modeling](references/ownership.md) and [tenant-boundary interpretation](references/tenant-boundaries.md).
5. Rate each entry, eliminate ambiguous signals, and stop when sensitive data or an unapproved boundary appears. See [confidence and false-positive controls](references/validation-handoff.md) and the [sensitive-data stop checklist](assets/sensitive-data-stop-checklist.md).
6. Complete the [role/object/action evidence worksheet](assets/role-object-action-evidence-worksheet.md), [ownership/tenant confidence matrix](assets/ownership-tenant-confidence-matrix.md), and [recon handoff template](assets/recon-handoff-template.md).

## Evidence

- Authorization scope, approved account class, timestamp, and observation method.
- Redacted UI text, documentation excerpts, or approved low-impact response metadata with source location.
- Observed role, object, action, ownership, and tenant-context statements, each marked as observed or inferred.
- Confidence rationale, false-positive controls, privacy actions, and explicit gaps.

## Output

Deliver a bounded handoff using the supplied template. It must distinguish facts from hypotheses, identify the source for each claim, state what was not tested, and contain no credentials, session material, personal data, or full sensitive records.

## Supplemental Index

- [Scope and test-account boundaries](references/scope-and-test-accounts.md)
- [Role observation](references/user-roles.md)
- [Object/action classification](references/authorization-matrix.md)
- [Ownership modeling](references/ownership.md)
- [Tenant-boundary modeling](references/tenant-boundaries.md)
- [Validation and handoff](references/validation-handoff.md)
- [PortSwigger: Access control](https://portswigger.net/web-security/access-control)
- [OWASP API Security: Broken Object Level Authorization](https://owasp.org/API-Security/editions/2023/en/0x11-t10/)
