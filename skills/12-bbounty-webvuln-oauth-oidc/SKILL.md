---
name: 12-bbounty-webvuln-oauth-oidc
description: OAuth/OIDC testing. Flow hijacking, token exchange, claim manipulation, authorization code reuse, and provider misconfiguration.
metadata:
  version: 1.0
  opencode/slash: "true"
---

# OAuth/OIDC Assessment

Assess OAuth 2.0 and OpenID Connect implementations only within the program's written scope and rules. Prefer configuration review, normal test-account flows, and low-impact validation. Do not collect or replay credentials, tokens, authorization codes, or data belonging to another user; do not register clients, change provider configuration, bypass redirects, or induce authentication actions unless the program explicitly authorizes that exact activity.

## Prerequisites

- Written authorization, in-scope hosts, permitted test accounts, and reporting rules.
- A controlled browser session and a way to capture redacted request/response metadata.
- Confirmation that the target flow is safe to exercise without affecting other users or production data.

## Workflow

### 1. Inventory the implementation

Map the client, authorization server, resource server, relying party, grant/response type, requested and granted scopes, and user-facing callback. Record observed behavior from one normal controlled login; do not probe unadvertised endpoints.

Read [flow inventory](references/oauth-flows.md) and complete the [flow, role, and client coverage worksheet](assets/flow-role-client-coverage.md).

### 2. Assess callback and transaction binding

For a controlled test account, verify that the application binds the login transaction to its original browser session and that its registered callback handling is exact. Test only documented validation behavior with inert, non-routable values when explicitly permitted. Stop if a test could send an artifact to a destination you do not control.

Read [redirect URI validation](references/redirect-uri.md), [state validation](references/state.md), [PKCE validation](references/pkce.md), and use the [state, PKCE, and redirect matrix](assets/state-pkce-redirect-matrix.md).

### 3. Validate tokens and claims

Inspect only tokens issued to your test account and redact them immediately. Establish whether each consumer validates signature and key provenance, issuer, audience, authorized party where applicable, time bounds, nonce where applicable, subject-to-account binding, and scopes. Compare accepted claims with the application's resulting identity and permissions without altering token contents.

Read [token and claim validation](references/token-testing.md) and use the [token and claim evidence checklist](assets/token-claim-evidence-checklist.md).

### 4. Review OIDC discovery and provider configuration

Compare published or documented metadata with the configured client behavior: issuer, endpoints, key source, supported response/grant types, signing algorithms, registered callbacks, and client authentication method. Treat metadata as declarative evidence, not authority to invoke every advertised capability.

Read [OIDC discovery and provider configuration](references/provider-configuration.md) and [OIDC flows](references/oidc-flows.md).

### 5. Confirm authorization binding

Using only separate accounts you control and explicitly authorized test cases, confirm that login/account linking, scope consent, API authorization, and tenant or organization membership remain bound to the intended subject and client. Do not attempt cross-account access or account linkage changes.

Read [authorization binding checks](references/authorization-checks.md).

### 6. Preserve evidence and report remediation

Capture timestamps, in-scope URLs, redacted request/response metadata, configuration observations, account roles, expected versus observed results, and reproducibility constraints. Classify a finding only after ruling out session confusion, test-environment variance, and documented program behavior. Provide a minimal remediation and validation plan.

Read [evidence and remediation](references/prevention-validation.md) and consult the [remediation lookup](assets/remediation-lookup.md).

## Evidence And Output

Do not include secrets, live tokens, authorization codes, cookies, personal data, or full raw authentication traffic in reusable notes or reports. Use placeholders and securely retain any program-required raw evidence separately.

```yaml
oauth_oidc_assessment:
  target: string
  authorization_basis: string
  flows_reviewed: [string]
  test_accounts: redacted-description
  observations:
    - control: string
      expected: string
      observed: string
      evidence_reference: string
      false_positive_controls: [string]
  findings:
    - title: string
      impact: informational | low | medium | high | critical
      affected_component: string
      remediation: string
      validation_plan: string
```

## Resource Index

- [OAuth flow inventory](references/oauth-flows.md)
- [OIDC flow and claim model](references/oidc-flows.md)
- [Redirect URI validation](references/redirect-uri.md)
- [State validation](references/state.md)
- [PKCE validation](references/pkce.md)
- [Token and claim validation](references/token-testing.md)
- [OIDC discovery and provider configuration](references/provider-configuration.md)
- [Authorization binding checks](references/authorization-checks.md)
- [Evidence and remediation](references/prevention-validation.md)
