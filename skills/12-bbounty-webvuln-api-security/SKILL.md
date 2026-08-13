---
name: 12-bbounty-webvuln-api-security
description: Conduct an explicitly authorized, low-impact API security assessment using documented or owner-provided API surfaces and controlled evidence collection.
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Authorized API Security Assessment

## Purpose

Assess an approved API surface for contract enforcement, authorization, and input-handling weaknesses without endpoint guessing, high-volume activity, data extraction, or destructive actions.

## Prerequisites

- Written scope authorization naming permitted hosts, API versions, accounts or roles, permitted methods, time window, rate limits, and stop contacts.
- Owner-provided documentation, API specification, traffic capture, or an explicitly supplied endpoint list.
- Dedicated test identities and test objects for every role or ownership comparison.
- A safe request tool capable of manual, single-request replay. Do not use scanners, fuzzers, brute-force, or enumeration automation.

## Evidence

Record only the minimum request and response metadata needed to reproduce the result. Redact credentials, tokens, personal data, and unrelated object content. Use the [request-contract evidence template](assets/request-contract-evidence-template.md).

## Workflow

1. Confirm written authorization, approved accounts and objects, rate limits, and stop contacts. If any are absent or ambiguous, stop and request clarification. Use the [confirmation and stop checklist](assets/confirmation-stop-checklist.md).
2. Build a bounded inventory solely from supplied documentation, specifications, approved captures, and owner-provided endpoint lists. Record endpoint, version, method, object, and expected roles in the [API surface and version inventory guide](references/api-surface-version-inventory.md) and the [coverage worksheet](assets/endpoint-role-object-action-coverage-worksheet.md).
3. Map the documented request and response contract for each selected operation before sending a variation. Use the [schema and parameter contract mapping guide](references/schema-parameter-contract-mapping.md).
4. Compare the documented authorization outcome for the approved test roles, test objects, and actions. Use the [authorization coverage guide](references/authentication-authorization-coverage.md). Do not access non-test objects, alter privileges, or invoke destructive actions.
5. Assess one controlled, contract-relevant input behavior at a time against a dedicated test object. Observe validation, type, format, boundary, and unexpected-property handling without attempting exploit chains. Use the [controlled input behavior guide](references/controlled-input-behavior.md).
6. Confirm a suspected issue with the smallest reversible comparison using only approved identities and objects. Stop immediately on unexpected sensitive data, state change, rate limiting, instability, or scope uncertainty. Follow the [safe confirmation and evidence guide](references/safe-confirmation-evidence.md).
7. Report verified and inconclusive observations separately, then map verified root causes to corrective controls with the [prevention guide](references/prevention.md) and [remediation lookup](assets/remediation-lookup.md).

## Output

```yaml
api_security_assessment:
  authorization_reference: string
  scope: { hosts: [string], versions: [string], operations: [string] }
  test_accounts_and_objects: redacted identifiers
  coverage: [endpoint_role_object_action rows]
  observations:
    - contract: string
      expected_result: string
      observed_result: string
      evidence_reference: string
      status: verified | inconclusive | not_tested
      impact: none | low | medium | high | critical
      remediation: string
  stop_events: [string]
  limitations: [string]
```

## Resource Index

- [API basics](references/api-basics.md)
- [API surface and version inventory](references/api-surface-version-inventory.md)
- [Schema and parameter contract mapping](references/schema-parameter-contract-mapping.md)
- [Authentication and authorization coverage](references/authentication-authorization-coverage.md)
- [Controlled input behavior](references/controlled-input-behavior.md)
- [Safe confirmation and evidence](references/safe-confirmation-evidence.md)
- [Prevention](references/prevention.md)
