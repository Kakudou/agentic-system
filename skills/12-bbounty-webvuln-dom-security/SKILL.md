---
name: 12-bbounty-webvuln-dom-security
description: Authorized, evidence-led assessment of client-side DOM data flows and boundary handling.
metadata:
  version: 2.0
  opencode/slash: "true"
---

# DOM Security Assessment

## Purpose

Assess authorized web targets for client-side flows in which externally influenced data reaches a security-sensitive DOM, URL, or code-like context. Confirm only observable, non-destructive behavior. Do not use execution payloads, data collection, browser-state manipulation, or unapproved cross-origin interaction.

## Prerequisites

- Written authorization and a defined target, environment, and test window.
- A browser/runtime observation method and an isolated test account when authentication is needed.
- A unique inert marker approved for the engagement, plus a way to preserve URLs, script versions, and timestamps.

## Workflow

1. **Set boundaries.** Record authorization, target origin, allowed routes, account scope, and stop conditions. Use only the supplied inert marker; do not change cookies, storage, messages, or application state.
2. **Inventory candidate inputs.** Identify URL-derived, document-derived, runtime, and cross-context inputs used by the target. Record the owning script and consumer before testing. See [source inventory](references/source-inventory.md).
3. **Classify the receiving context.** Determine whether each candidate flow reaches text, structured HTML, URL/navigation, script-like, or framework rendering behavior. Do not equate a keyword hit with exploitability. See [sink classification](references/sink-classification.md); when a DOM update is involved, review the [mutation boundary](references/dom-mutations.md).
4. **Trace the flow.** Use static review first, then runtime observation only where allowed, to establish whether the marker reaches the candidate context and what transformations occur. Split multi-source cases rather than combining them. See [static and runtime flow tracing](references/flow-tracing.md) and [overlap review](references/dom-overlap.md).
5. **Confirm harmlessly or stop.** Confirm only marker presence, text rendering, encoding, rejection, or documented navigation handling. Stop immediately on unexpected execution, state change, sensitive exposure, or scope uncertainty. See [harmless confirmation](references/harmless-confirmation.md) and the [browser evidence and stop checklist](assets/browser-evidence-stop-checklist.md).
6. **Review boundaries when present.** For frames, messages, redirects, referrers, or persistent client data, assess origin checks, schema validation, lifecycle, and downstream context without sending messages or altering storage. See [cross-window and storage boundary review](references/boundary-review.md).
7. **Assess prevention and report.** Distinguish a proven unsafe flow from a reachable-but-safely-encoded path. Recommend context-appropriate controls and retain reproducible evidence. See [prevention and evidence](references/prevention-evidence.md) and the [remediation lookup](assets/remediation-lookup.md).

## Evidence

- Authorization scope, target URL, timestamp, and browser/runtime version.
- Source, sink/context, code location or script hash, and transformation trace.
- Sanitized marker observation, DOM/runtime interpretation, and stop-condition result.
- False-positive analysis, reproduction boundaries, impact rationale, and remediation recommendation.

## Output

```yaml
dom_security_report:
  target: string
  assessed_at: timestamp
  authorization_scope: string
  flows:
    - source: string
      sink_context: string
      trace_status: observed | static_only | blocked
      harmless_confirmation: rendered_as_text | encoded | rejected | not_confirmed
      evidence_refs: [string]
      false_positive_controls: [string]
      remediation: string
  stop_conditions_triggered: [string]
  conclusion: no_unsafe_flow_confirmed | needs_review | unsafe_flow_confirmed
```

## Reference Index

- [Source inventory](references/source-inventory.md)
- [Sink classification](references/sink-classification.md)
- [Static and runtime flow tracing](references/flow-tracing.md)
- [Harmless confirmation](references/harmless-confirmation.md)
- [Boundary review](references/boundary-review.md)
- [Prevention and evidence](references/prevention-evidence.md)
- [DOM mutation review](references/dom-mutations.md)
- [Flow worksheet](assets/source-sink-flow-worksheet.md)
- [Context and confirmation matrix](assets/context-confirmation-matrix.md)
