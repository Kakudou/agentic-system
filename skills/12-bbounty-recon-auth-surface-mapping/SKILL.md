---
name: 12-bbounty-recon-auth-surface-mapping
description: Observe and document authorized authentication surfaces, boundaries, and handoff evidence without attempting account access or bypass.
metadata:
  version: 2.0
  opencode/slash: "true"
---

# Authentication Surface Mapping

## Purpose

Produce a bounded, evidence-backed map of authentication-related user journeys for an authorized target. This skill is observation-oriented: it records what an authorized user can see and the declared boundaries between public, authenticated, and identity-provider surfaces.

## Scope And Safety

Before observing anything, record the program's written scope, allowed hosts, permitted account types, rate limits, and stop contacts. Use only supplied accounts and test users. Do not create accounts, submit credentials, initiate recovery, enroll MFA, follow federation redirects into third-party tenants, alter session state, or attempt authentication bypass.

Use [scope and account boundary](references/scope-and-account-boundary.md) to establish those limits. Apply [sensitive-data and stop controls](references/sensitive-data-stop-controls.md) before retaining evidence.

## Prerequisites

- Written authorization and a defined target boundary.
- A named point of contact and stop/escalation channel.
- Explicit approval for any interaction beyond viewing public pages or a supplied test account's normal UI.
- A redacted evidence location approved by the program.

## Observation Workflow

1. Record scope, account boundary, and observation time in the [authentication-surface worksheet](assets/authentication-surface-worksheet.md).
2. Observe linked, documented, or normally presented sign-in, registration, recovery, MFA, and federation entry points. Classify each journey using [flow observation](references/flow-observation.md) and [recovery, MFA, and federation mapping](references/recovery-mfa-federation-mapping.md).
3. Record visible session and state artifacts by category, not value, with [session/state boundary interpretation](references/session-state-boundary-interpretation.md).
4. Correlate only displayed roles, account states, and named identity providers. Do not infer privileges or tenant membership. See [role and identity-provider correlation](references/role-and-identity-provider-correlation.md).
5. Stop on sensitive data, unexpected account access, third-party identity-provider content, or any ambiguous scope condition. Follow the [stop checklist](assets/sensitive-data-stop-checklist.md).
6. Assign confidence and hand off facts, uncertainties, and proposed follow-up separately using the [flow/state confidence matrix](assets/flow-state-confidence-matrix.md) and [recon handoff template](assets/recon-handoff-template.md).

## Evidence

Capture only the minimum needed to reproduce the observation:

- Authorization reference, target host, time, observer, and permitted account class.
- Page title or visible journey label, redacted URL path, and navigation source.
- Visible controls, stated identity provider, disclosed role/account state, and response category.
- Redacted screenshots or headers only when permitted; never retain credentials, tokens, cookies, recovery codes, personal data, or full authorization artifacts.

## Output

Use [validation and handoff](references/validation-handoff.md) before returning a completed [recon handoff](assets/recon-handoff-template.md) with one row per observed journey, its confidence, scope status, redaction status, and any required owner follow-up. The handoff is a surface inventory, not a vulnerability claim or a test plan.

## Supplemental Index

- [Scope and account boundary](references/scope-and-account-boundary.md)
- [Flow observation](references/flow-observation.md)
- [Recovery, MFA, and federation mapping](references/recovery-mfa-federation-mapping.md)
- [Session/state boundary interpretation](references/session-state-boundary-interpretation.md)
- [Role and identity-provider correlation](references/role-and-identity-provider-correlation.md)
- [Sensitive-data and stop controls](references/sensitive-data-stop-controls.md)
- [Validation and handoff](references/validation-handoff.md)
- [Authentication-surface worksheet](assets/authentication-surface-worksheet.md)
- [Flow/state confidence matrix](assets/flow-state-confidence-matrix.md)
- [Sensitive-data stop checklist](assets/sensitive-data-stop-checklist.md)
- [Recon handoff template](assets/recon-handoff-template.md)
