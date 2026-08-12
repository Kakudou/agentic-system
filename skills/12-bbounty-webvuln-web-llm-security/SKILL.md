---
name: 12-bbounty-webvuln-web-llm-security
description: Explicitly authorized, observation-first security assessment of LLM-enabled web applications.
metadata:
  version: 2.0
  opencode/slash: "true"
---

# LLM-Enabled Web Application Assessment

## Purpose

Assess an explicitly authorized LLM-enabled web application for instruction-handling, data, and tool authorization risks. Use normal-use or benign controlled observations only. Do not use adversarial prompt catalogs, retrieve data, invoke tools, alter state, bypass controls, or test beyond written authorization.

## Prerequisites

- Written authorization naming the application, routes, test account roles, permitted methods, testing window, and excluded actions.
- A named owner and stop/escalation path.
- A normal-use baseline and, for controlled observations, an approved non-sensitive test environment or test fixture.
- No data access, tool invocation, state change, or availability-impacting action unless explicitly authorized in writing.

## Workflow

1. **Confirm authorization and baseline.** Record scope, roles, integration assumptions, and ordinary expected behavior. Stop if any boundary or permitted action is unclear. See [LLM application basics and inventory](references/llm-application-basics.md).
2. **Inventory application, agent, tool, and data flows.** Document declared inputs, retrieved content sources, model/agent stages, tool interfaces, identities, and outputs without probing hidden capabilities. See the [coverage worksheet](assets/data-tool-trust-boundary-coverage-worksheet.md).
3. **Map trust boundaries.** Mark where user input, third-party content, retrieved data, model output, and tool requests cross identity or authorization boundaries. See [instruction risks and trust boundaries](references/instruction-risks-trust-boundaries.md).
4. **Observe instruction handling harmlessly.** With the approved fixture, compare an ordinary task to an inert, clearly non-operative instruction-like marker. Observe separation, labeling, and refusal behavior only. Do not request hidden instructions, data, capabilities, or actions. See [safe instruction-handling observation](references/safe-instruction-handling-observation.md) and the [decision matrix](assets/safe-observation-decision-matrix.md).
5. **Review authorization and action boundaries.** Determine from documented behavior whether data access and tool use are explicitly authorized, scoped, and confirmed independently of model output. Do not trigger a tool, retrieve data, or change state to test this. See [data and tool authorization boundaries](references/data-tool-authorization-boundaries.md).
6. **Confirm and preserve evidence safely.** Repeat only the same benign observation, redact content and identifiers, and stop before any sensitive-data exposure or action. See [safe validation and evidence](references/safe-validation-evidence.md) and the [evidence and stop checklist](assets/evidence-stop-checklist.md).
7. **Bound impact and recommend prevention.** State only demonstrated impact, constraints, and unperformed escalation. Map findings to least-privilege, provenance, confirmation, and monitoring controls. See [impact boundaries](references/impact-boundaries.md), [prevention guidance](references/prevention-guidance.md), and the [remediation lookup](assets/remediation-lookup.md).

## Evidence

- Authorization, scope, exclusions, test role, and testing-window record.
- Redacted normal-use baseline and benign controlled-observation comparison.
- Inventory and trust-boundary map, including unverified assumptions.
- Factual observations, false-positive controls, and explicit stop decisions.
- Remediation tied to demonstrated behavior, with no sensitive content or action results.

## Output

```yaml
llm_web_assessment:
  target: authorized application and routes
  authorization: scope reference and testing window
  inventory: application, agent, data, and tool summary
  trust_boundaries: [documented boundary observations]
  observations:
    - area: instruction-handling | data-authorization | tool-authorization
      observation: concise factual description
      demonstrated_impact: bounded consequence or not demonstrated
      confidence: low | medium | high
      false_positive_controls: [checks performed]
      evidence: redacted references
      stop_status: completed | stopped | escalated
      remediation: safe corrective action
  limitations: [excluded or unperformed checks]
```

## Resource Index

- [LLM application basics and inventory](references/llm-application-basics.md)
- [Instruction risks and trust boundaries](references/instruction-risks-trust-boundaries.md)
- [Safe instruction-handling observation](references/safe-instruction-handling-observation.md)
- [Data and tool authorization boundaries](references/data-tool-authorization-boundaries.md)
- [Safe validation and evidence](references/safe-validation-evidence.md)
- [Impact boundaries](references/impact-boundaries.md)
- [Prevention guidance](references/prevention-guidance.md)
- [Data, tool, and trust-boundary coverage worksheet](assets/data-tool-trust-boundary-coverage-worksheet.md)
- [Safe-observation decision matrix](assets/safe-observation-decision-matrix.md)
- [Evidence and stop checklist](assets/evidence-stop-checklist.md)
- [Remediation lookup](assets/remediation-lookup.md)
