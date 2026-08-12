---
name: 12-bbounty-webvuln-crosssite-scripting
description: Cross-site scripting detection and exploitation. Reflected, stored, DOM-XSS, event handler injection, attribute splitting, SVG/JS vectors, context-aware payloads, and filter bypass.
metadata:
  version: 1.0
  opencode/slash: "true"
---

# Cross-Site Scripting (XSS)

## Overview

Detect and exploit XSS vulnerabilities across all variants. Tests reflected, stored, and DOM-based XSS with context-aware payloads, filter bypasses, and automated vector testing.

## Prerequisites

- Target URL(s) with known parameters or endpoints
- Recon data (parameters, endpoints, JS files)

## Execution Workflow

### Step 1: Reflected XSS Testing

1. Establish an ordinary response baseline for each in-scope input.
2. Submit a unique reflection marker and locate it in the raw response and rendered DOM.
3. Identify the exact output context and transformations before selecting a probe.
4. Use the smallest authorized-test probe appropriate to that context, then confirm browser execution rather than treating reflection as a finding.

Read [reflected XSS testing](references/reflected.md) for the complete workflow. Use the [context-indexed test matrix](assets/xss_cheatsheet.md) and [authorized-test probe catalog](assets/payload_catalog.md) only after identifying the context.

### Step 2: Stored XSS Testing

1. Inventory data-entry points and possible viewer-facing exit points separately.
2. Map each entry to exits using unique inert markers and record role, state, delay, and cleanup method.
3. Establish persistence across requests before classifying behavior as stored.
4. Determine the context at each confirmed exit, test one non-destructive context-specific proof, then remove test data.

Read [stored XSS testing](references/stored.md) for entry-to-exit mapping, role coverage, and false-positive controls. Use the [stored-XSS operational cheat sheet](assets/stored_xss_cheatsheet.md) to track state and evidence.

### Step 3: DOM-XSS Detection

1. Map attacker-controlled client-side sources to dangerous DOM or JavaScript execution sinks.
2. Inspect both static code and runtime behavior; a source or sink alone is not a finding.
3. Trace each candidate flow, select a benign source-specific probe, and confirm the result in a clean browser profile.
4. Review relevant third-party libraries and framework behavior when they participate in the flow.

Read [DOM-based XSS testing](references/dom.md) for source/sink taxonomy, DOM Invader guidance, and dependency-specific flows. Use the DOM sections of the [test matrix](assets/xss_cheatsheet.md) for triage.

### Step 4: Context-Aware Payloads

Determine whether data reaches an HTML text node, quoted or unquoted attribute, URL attribute, JavaScript string or template literal, JSON consumed by client code, or a client-side template. Test the escaping boundary for that exact context before choosing a proof.

Read [context selection and escaping](references/contexts.md). The [authorized-test probe catalog](assets/payload_catalog.md) is organized by context and records each probe's preconditions and expected observation.

### Step 5: Filter Bypass Testing

Only assess filters after proving a source-to-context path and documenting how the application transforms input. Compare small markers through each transformation stage; test only techniques relevant to the observed constraint; confirm browser behavior rather than assuming a preserved string bypasses anything.

Read [filter analysis](references/filters.md). If a policy affects execution, read [CSP assessment](references/csp.md). The [test matrix](assets/xss_cheatsheet.md) identifies when event-handler or SVG-style context probes are relevant.

## Validation

- Verify XSS is not from cache (clear cookies, test fresh)
- Confirm payload execution in browser
- Check for multiple vectors (reflected, stored, DOM)
- Validate context awareness (HTML, attribute, JavaScript, text, JSON)
- Test filter bypasses for coverage

## Evidence

- HTTP request/response captures
- Screenshot of payload execution
- Terminal output for commands
- Structured finding records
- Reproduction steps

## Output Format

```yaml
xss_findings:
  target: string
  timestamp: timestamp
  findings:
    - id: string
      type: reflected | stored | dom
      vector: string
      payload: string
      context: html | attribute | javascript | text | json
      evidence: string
      severity: low | medium | high
```

## Detailed Resources

Read only the resource needed for the active test. All example probes are for authorized testing and use non-destructive browser confirmation.

- [Reflected XSS testing](references/reflected.md)
- [Stored XSS testing](references/stored.md)
- [DOM-based XSS testing](references/dom.md)
- [Context selection and escaping](references/contexts.md)
- [Filter analysis](references/filters.md)
- [CSP assessment](references/csp.md)
- [Exploitation and impact assessment](references/exploitation-and-impact.md)
- [Context-indexed XSS cheat sheet](assets/xss_cheatsheet.md)
- [Minimal authorized-test probe catalog](assets/payload_catalog.md)
- [Stored-XSS operational cheat sheet](assets/stored_xss_cheatsheet.md)
