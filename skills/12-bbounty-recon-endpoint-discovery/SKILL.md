---
name: 12-bbounty-recon-endpoint-discovery
description: Record authorized, observed endpoint and route behavior without guessing paths, fuzzing, or active protocol discovery.
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Authorized Endpoint Observation

## Purpose

Build a defensible inventory of endpoints already exposed by authorized navigation, client artifacts, and published documentation. This skill observes; it does not guess routes, fuzz paths, enumerate services, run introspection, or send protocol probes.

## Scope First

1. Confirm the program authorization, in-scope hosts, allowed accounts, and request-rate or method restrictions.
2. Record the route identity as observed: scheme, host, path, method, source, and authenticated context. Do not generalize an observed route to a family of unobserved routes.
3. Stop when scope is unclear, a requested interaction would exceed passive observation, or evidence indicates an excluded system. Use the [scope and stop checklist](assets/scope-stop-checklist.md).

## Observation Workflow

1. Capture endpoints surfaced during ordinary authorized navigation, browser network inspection, delivered client artifacts, and official target documentation. See [endpoint observation](references/endpoint-observation.md).
2. Correlate each candidate to its source artifact and visible user action. Treat strings, comments, source maps, and stale documentation as leads rather than confirmed live routes. See [client artifact correlation](references/client-artifact-correlation.md).
3. Classify route, method, and parameter behavior only from directly observed requests or explicit, in-scope low-impact approval. Do not infer support from naming or framework conventions. See [route and method classification](references/route-method-classification.md).
4. Assign confidence, record contradictory evidence, and retain only claims supported by the evidence. Use the [route/method confidence matrix](assets/route-method-confidence-matrix.md) and [endpoint evidence worksheet](assets/endpoint-evidence-worksheet.md).
5. Prepare an evidence-bounded handoff, separating observations from hypotheses and requested follow-up authorization. See [validation and handoff](references/validation-handoff.md) and the [recon handoff template](assets/recon-handoff-template.md).

## Prerequisites

- Explicit authorization and a current scope statement.
- An authorized browser/session or target-provided documentation/artifacts.
- A safe evidence store that does not expose credentials, session tokens, or personal data.

## Evidence

- Scope source and observation time window.
- Redacted request/response metadata or captured browser-network record for each observed route.
- Source artifact, documentation URL, or navigation action that exposed the route.
- Method, parameter, and authentication-context observations, including uncertainty.
- Confidence rationale, false-positive controls, and stop/escalation decisions.

## Output

Deliver one inventory and handoff using the supplied templates. Each entry must distinguish `observed`, `documented`, and `hypothesized` claims; hypotheses are not endpoint findings. Include no credentials, tokens, sensitive response bodies, or unapproved validation results.

## Supplemental Index

- [Endpoint observation](references/endpoint-observation.md)
- [Route and method classification](references/route-method-classification.md)
- [Client artifact correlation](references/client-artifact-correlation.md)
- [Validation and handoff](references/validation-handoff.md)
- [Static assets](assets/)
