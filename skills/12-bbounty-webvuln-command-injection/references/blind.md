# Blind Observation Triage

## Purpose and Preconditions

Use as a short triage reference when output is absent. Read the full [blind injection assessment](blind-injection.md) before sending any timing or callback comparison. Confirm the engagement permits the selected observation channel.

## Selection

- Prefer an inline parser-boundary observation when available.
- Use timing only when normal latency is stable and a bounded delay is approved.
- Use a controlled callback only when timing is unsuitable and outbound interaction is explicitly permitted.
- Do not use local or web-root file artifacts, command output, or data-bearing callbacks.

## Evidence and Stop Conditions

Record baseline variance, paired comparison order, identifiers, timestamps, and confounders. Stop for elevated errors, latency impact, duplicate/unexpected callbacks, unrelated target traffic, or ambiguity that cannot be resolved safely.

## Source

- PortSwigger: <https://portswigger.net/web-security/os-command-injection>
