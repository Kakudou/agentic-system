---
name: 12-bbounty-webvuln-command-injection
description: Safely assess authorized server-side OS command injection using minimal differential evidence and strict impact limits.
metadata:
  version: "1.0"
  opencode/slash: "true"
---

# Command Injection Assessment

Assess only explicitly authorized targets and inputs. Use designated test data, preserve availability, and prefer non-executing syntax-boundary observations. Do not run arbitrary commands, enumerate hosts or files, write files, alter state, exfiltrate data, establish persistence, or interact with systems outside scope.

## Prerequisites

- Confirmed scope, permitted test methods, rate limits, and stop contact.
- Target URL, candidate parameter or field, normal application behavior, and test account/data where required.
- An agreed maximum request volume and, before blind or OAST testing, explicit permission for timing or controlled callback observations.

## Workflow

### 1. Establish a controlled baseline

For each candidate, capture multiple ordinary requests and record status, response shape, stable text markers, application errors, and latency. Change one input dimension at a time using a unique inert marker. Treat a difference as a lead, not execution evidence. Use the [technique-selection and confirmation matrix](assets/command_injection_cheatsheet.md) to choose the least-impactful next check and the [evidence and stop-condition checklist](assets/evidence_stop_conditions.md) before sending probes.

### 2. Assess observable inline behavior

When the response visibly changes, first determine whether the change is caused by validation, parsing, reflection, or backend command handling. Use paired, syntax-boundary differential inputs and repeat only stable observations. Read [inline injection assessment](references/inline-injection.md) before this branch. If behavior suggests a Unix-like or Windows command interpreter, read [Unix behavior](references/unix.md) or [Windows behavior](references/windows.md) before selecting a platform-specific confirmation.

### 3. Assess blind behavior only when justified

When output is absent but the input reaches a plausible command sink, choose one authorized observation channel. For timing, measure normal variance and require repeated separated observations under a conservative delay budget. For OAST, use only a unique, controlled callback identifier and observe no data beyond the identifier. Read [blind injection assessment](references/blind-injection.md) before testing; read [out-of-band observation](references/out-of-band.md) when using a callback. Do not use filesystem writes or output redirection as proof.

### 4. Select platform-aware confirmation

Use platform clues from stack traces, documented deployment, error behavior, or a prior safe observation. Do not spray syntax variants across unknown environments. Read [Unix behavior](references/unix.md) for Unix shell parsing considerations or [Windows behavior](references/windows.md) for Windows command-interpreter considerations. The [OS syntax and behavior lookup](assets/command_payloads.md) is a non-runnable lookup for selecting one minimal differential test, not a payload catalog. Read [Unix confirmation constraints](references/unix-payloads.md) or [Windows confirmation constraints](references/windows-payloads.md) only after the platform hypothesis is supported.

### 5. Interpret, validate, and report

Confirm the observation against fresh baselines, rule out caches, retries, asynchronous jobs, WAF behavior, validation branches, and unrelated network traffic. Stop after sufficient minimum-necessary proof or immediately on instability, unexpected output, or any scope concern. Capture only redacted request/response metadata, timing samples, callback logs, and cleanup state. Use the [remediation lookup](assets/remediation_lookup.md) to map the confirmed construction flaw to a fix.

## Validation

- Scope, authorization, target input, rate/impact limits, and stop contact were recorded before testing.
- A baseline and controlled comparison support every claimed observation.
- Timing claims include repeated measurements and normal-variance controls.
- OAST claims use a unique identifier and exclude unrelated traffic and data capture.
- No command output, sensitive data, filesystem changes, or external side effects were required for proof.

## Evidence

- Scope and authorization constraints, target/input identifier, and test-data label.
- Redacted baseline and differential request/response metadata.
- Observation type, timestamps, latency samples or controlled callback metadata, and false-positive analysis.
- Platform hypothesis and the reason it was selected.
- Stop/cleanup status and minimum-necessary remediation guidance.

## Output Format

```yaml
command_injection_report:
  target: string
  timestamp: timestamp
  input: string
  platform_hypothesis: unix | windows | unknown
  observation: inline | blind_timing | oast | not_confirmed
  evidence: [redacted-artifacts]
  false_positive_controls: [strings]
  impact: low | medium | high | critical
  cleanup_status: not_applicable | restored | pending
  remediation: [strings]
```

## Detailed Resources

- [Inline injection assessment](references/inline-injection.md)
- [Blind injection assessment](references/blind-injection.md)
- [Out-of-band observation](references/out-of-band.md)
- [Unix behavior](references/unix.md)
- [Unix confirmation constraints](references/unix-payloads.md)
- [Windows behavior](references/windows.md)
- [Windows confirmation constraints](references/windows-payloads.md)
- [Technique-selection and confirmation matrix](assets/command_injection_cheatsheet.md)
- [OS syntax and behavior lookup](assets/command_payloads.md)
- [Evidence and stop-condition checklist](assets/evidence_stop_conditions.md)
- [Remediation lookup](assets/remediation_lookup.md)
