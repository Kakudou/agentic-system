---
name: 12-bbounty-webvuln-request-smuggling
description: Authorization-bounded HTTP message-framing assessment for identifying and safely validating potential request desynchronization.
metadata:
  version: 2.0
  opencode/slash: "true"
---

# HTTP Message-Framing Assessment

Assess only targets explicitly authorized for request-framing testing. This workflow identifies parser disagreement without constructing smuggled requests, automating probes, exploiting downstream effects, or testing other users' traffic.

## Prerequisites

- Written scope authorizes low-impact HTTP message-framing assessment, named hosts, test window, and request budget.
- A controlled test environment is available. Production testing requires explicit authorization for its stricter stop conditions.
- A unique, harmless correlation value and a baseline endpoint that performs no state change are available.
- The assessor can preserve request/response metadata and timestamps without collecting credentials or personal data.

## Workflow

1. Confirm scope, request budget, safe endpoint, and escalation contact. If any is missing, stop and request authorization.
2. Map each authorized route through the delivery chain and record the apparent protocol boundaries using the [architecture and framing coverage worksheet](assets/architecture-framing-coverage-worksheet.md). If the path is not understood, record it as a coverage gap rather than probing.
3. Establish a small baseline set of ordinary requests. Compare status, headers, body class, latency, connection behavior, and upstream identifiers where available.
4. Select one controlled differential check from [low-impact differential checks](references/validation.md). Use only a benign marker and the approved request budget. Never send follow-up traffic intended to consume, redirect, or observe a desynchronized request.
5. Interpret the result against the applicable framing boundary: [HTTP/1 interpretation](references/h1-smuggling.md) or [HTTP/2 interpretation and downgrade boundaries](references/h2-smuggling.md). Record an anomaly as unconfirmed unless it is repeatable under the approved controls.
6. Apply [confirmation and false-positive controls](assets/confirmation-false-positive-decision-matrix.md). Stop immediately on timeout clusters, unexpected response association, cross-user indicators, state change, cache behavior, or budget exhaustion.
7. Assess only the authorized impact boundary with the [impact and stop-condition checklist](assets/impact-stop-condition-checklist.md). Do not test request hijacking, response queues, cache poisoning, authentication bypass, or client/browser impact.
8. Produce the evidence record and remediation guidance using [prevention and evidence requirements](references/prevention-evidence.md) and the [remediation lookup](assets/remediation-lookup.md).

## Evidence And Output

Capture scope authorization, environment, route/framing map, baseline and controlled-check metadata, timestamps, correlation values, request count, observed differences, false-positive controls, stop decision, and redacted response evidence. Do not retain session secrets, personal data, or raw traffic beyond the approved retention policy.

```yaml
http_message_framing_assessment:
  target: authorized-host-or-service
  authorization: scope-reference
  environment: controlled | explicitly-authorized-production
  routes: [route-and-framing-boundary]
  request_count: integer
  baseline_summary: string
  controlled_check_summary: string
  finding: not-observed | inconclusive | potential-desync | confirmed-in-controlled-environment
  false_positive_controls: [string]
  stop_condition: none | budget | instability | unexpected-impact | authorization-limit
  evidence_refs: [redacted-artifact-reference]
  remediation: [string]
```

## Reference Index

- [Architecture and framing coverage worksheet](assets/architecture-framing-coverage-worksheet.md)
- [HTTP/1 framing](references/h1-smuggling.md)
- [HTTP/2 framing](references/h2-smuggling.md)
- [Validation method](references/validation.md)
- [Prevention and evidence](references/prevention-evidence.md)
- [Background and boundaries](references/smuggling-techniques.md)
