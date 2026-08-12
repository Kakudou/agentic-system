---
name: 12-bbounty-recon-api-discovery
description: Record an authorized API surface from declared documentation and naturally observed client traffic without probing, enumeration, or introspection.
metadata:
  version: 2.0
  opencode/slash: "true"
---

# Authorized API Surface Reconnaissance

## Purpose

Create a bounded, evidence-backed inventory of APIs already declared by the program or naturally used by an approved client. This skill observes a known surface; it does not guess endpoints, enumerate paths or parameters, retrieve unlinked specifications, request schemas or introspection, authenticate, alter requests, or automate traffic.

## Prerequisites

- Written authorization, exact in-scope API targets, permitted identities, rate limits, and stop contacts.
- A program-provided API contract, approved documentation, or an approved client session that naturally exposes the surface.
- Permission for every observation that is not wholly passive.

## Workflow

1. Confirm the approved targets, evidence sources, identities, and stop conditions before observing anything. Start the [scope/API contract inventory](references/scope-api-contract-inventory.md) and [scope/stop checklist](assets/scope-stop-checklist.md).
2. Record only endpoints, operations, and request/response details explicitly documented or naturally visible in approved client activity. Use [documentation and client-observed API surface](references/documentation-client-surface.md) and the [API surface/evidence worksheet](assets/api-surface-evidence-worksheet.md).
3. Classify a surface as HTTP API, GraphQL, gRPC, or another declared protocol only from reliable documentation or observed normal traffic. Record version evidence without deriving version paths. Use [version and protocol classification](references/version-protocol-classification.md) and the [protocol/version confidence matrix](assets/protocol-version-confidence-matrix.md).
4. Capture only parameters, fields, schemas, and operation semantics already exposed by the approved source. Do not solicit additional structure. Apply [schema and parameter observation boundaries](references/schema-parameter-boundaries.md).
5. Corroborate material claims, retain alternatives, and label uncertainty rather than treating framework markers as endpoints. Apply [confidence and false-positive controls](references/confidence-false-positive-controls.md).
6. Preserve minimal, redacted evidence and hand off facts, gaps, and approved follow-up requests. Use [evidence and handoff](references/evidence-handoff.md) and the [recon handoff template](assets/recon-handoff-template.md).

## Evidence

- Authorization and scope snapshot, including rate and identity constraints.
- Source URL, artifact identity, or approved client-session reference with timestamp.
- Exact observed endpoint/operation, protocol and version indicators, and redacted contract details.
- Corroboration, confidence, limitations, confounders, and stop decisions.

## Output

```yaml
api_recon_handoff:
  authorization_reference: string
  observed_at: RFC-3339 timestamp
  surface:
    - endpoint_or_service: string
      operation: string
      source: documented | client-observed
      protocol: http-api | graphql | grpc | other | unconfirmed
      version: string | unconfirmed
      contract_observations: [string]
      confidence: direct | corroborated | inconclusive
      limitations: [string]
  follow_up: string
```

## Supplemental Resources

- [Scope/API contract inventory](references/scope-api-contract-inventory.md)
- [Documentation and client-observed API surface](references/documentation-client-surface.md)
- [Version and protocol classification](references/version-protocol-classification.md)
- [Schema and parameter observation boundaries](references/schema-parameter-boundaries.md)
- [Confidence and false-positive controls](references/confidence-false-positive-controls.md)
- [Evidence and handoff](references/evidence-handoff.md)
- [Static assets](assets/)
