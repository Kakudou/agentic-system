---
name: 12-bbounty-hunting-hypothesis-generation
description: Synthesize authorized, provenance-labeled observations into bounded security hypotheses. Planning only; no scanning, payloads, exploitation, or active testing.
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Authorized Hypothesis Generation

Turn admitted observations into falsifiable security hypotheses. A technology fingerprint, generic weakness pattern, or prior report is context, not evidence of a vulnerability. This skill plans and hands off work; it does not discover targets, send traffic, test, or validate a finding.

## Scope And Evidence

Require written authorization, an in-scope asset boundary, exclusions, permitted data and account handling, and provenance-labeled observations. Stop and request clarification when any material boundary is missing or contradictory. Use [scope and admitted evidence](references/scope-and-evidence.md) and the [scope/stop checklist](assets/scope-stop-checklist.md).

## Observe Before Inferring

Normalize each supplied technology or behavior observation into its source, asset, time, confidence, and alternative explanations. Technology can suggest questions, but behavior and control-relevant observations determine whether a hypothesis is warranted. Use [technology and behavior observations](references/tech-mapping.md) and [pattern interpretation](references/pattern-matching.md).

## Frame Bounded Hypotheses

Write one hypothesis per claimed security property: observation, inference, affected in-scope asset, expected distinguishing evidence, impact condition, and disconfirming result. Keep framework and configuration context conditional rather than treating it as a finding. Use [hypothesis framing](references/framework-weaknesses.md) and the [observation-to-hypothesis worksheet](assets/observation-hypothesis-worksheet.md).

## Control Confidence And Bias

Separate facts from assumptions. Record confidence in the observation and inference independently, name plausible benign explanations, and lower confidence for stale, indirect, single-source, or ambiguous evidence. Do not inflate confidence from familiar technologies or vulnerability labels. Use [confidence and bias controls](references/pattern-matching.md) and the [confidence/assumption matrix](assets/confidence-assumption-matrix.md).

## Plan A Safe Handoff

Only propose the minimum authorized, non-destructive validation needed to distinguish the hypothesis from normal behavior. Declare stop conditions for scope uncertainty, unexpected sensitive data, degradation, authorization anomalies, and third-party interaction. Escalation needs renewed authorization. Use [safe validation and ethics](references/validation-ethics.md) and the [planning handoff template](assets/planning-handoff-template.md).

## Prerequisites

- Written authorization, in-scope assets, exclusions, and handling constraints
- Supplied observations with source and collection context
- A named recipient for a bounded planning handoff or scope question

## Evidence

- Scope-admission decision and authorization reference
- Observation inventory with provenance, asset, time, and confidence
- Falsifiable hypothesis with assumptions and alternative explanations
- Stop conditions and authorized validation handoff, if one is appropriate

## Output

Return either a scope question or a hypothesis packet. A packet contains the admitted boundary, evidence inventory, hypotheses, confidence and assumptions, disconfirming evidence, stop conditions, and a planning-only handoff. It must not claim validation or a vulnerability.

## Supplemental Index

- [Scope and admitted evidence](references/scope-and-evidence.md)
- [Technology and behavior observations](references/tech-mapping.md)
- [Pattern interpretation](references/pattern-matching.md)
- [Hypothesis framing](references/framework-weaknesses.md)
- [Configuration interpretation](references/misconfiguration-patterns.md)
- [Safe validation and ethics](references/validation-ethics.md)
- [Observation-to-hypothesis worksheet](assets/observation-hypothesis-worksheet.md)
- [Confidence/assumption matrix](assets/confidence-assumption-matrix.md)
- [Scope/stop checklist](assets/scope-stop-checklist.md)
- [Planning handoff template](assets/planning-handoff-template.md)
