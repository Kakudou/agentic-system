---
name: 12-bbounty-recon-techno-fingerprinting
description: Record authorized, low-impact observations about a web target's exposed technology layers without probing, fingerprint catalogs, or exploitation.
metadata:
  version: 2.0
  opencode/slash: "true"
---

# Technology Observation

## Purpose

Create a bounded, evidence-backed technology observation for an explicitly authorized web target. This skill supports recon prioritization; it does not establish a product version, security control coverage, vulnerability, or permission to test further.

## Prerequisites

- Written program scope and rules of engagement identify the target and allow the intended observation.
- A defined time window, rate limit, and stop contact are available.
- The operator can preserve the source, time, request context, and any redactions needed for each observation.

## Workflow

1. Confirm the exact host, authorized paths, observation method, limits, and stop conditions. Use the [scope and stop checklist](assets/scope-stop-checklist.md). If authorization, scope, or a limit is unclear, stop.
2. Gather only permitted evidence from public documentation, passive third-party records, or ordinary user-facing responses already allowed by the program. Do not vary inputs, enumerate endpoints, fetch unlinked assets, automate JavaScript inspection, or use detection tools unless separately authorized. See [permitted evidence and capture](references/confidence-validation.md).
3. Classify each observation by layer, without naming a technology beyond what the evidence supports:
   - [Transport and server signals](references/transport-server-signals.md)
   - [Client and framework signals](references/client-framework-signals.md)
   - [Infrastructure, CDN, and edge signals](references/infrastructure-cdn-signals.md)
4. Record the source, observation, interpretation, limitations, and confidence in the [technology-evidence worksheet](assets/technology-evidence-worksheet.md). Keep raw captures minimal and redact tokens, identifiers, and personal data.
5. Compare independent signals. Downgrade or mark unknown when signals conflict, could originate at a proxy, cache, build tool, or third party, or lack a stable source. Apply the [confidence and conflict matrix](assets/confidence-conflict-matrix.md) and [validation guidance](references/confidence-validation.md).
6. Produce a bounded observation report using the output below. Transfer only supported hypotheses and evidence gaps through the [recon handoff template](assets/recon-handoff-template.md). A handoff does not authorize active validation.

## Evidence

- Program scope and observation constraints.
- Source URLs or request context, collection timestamp, and minimally necessary preserved response or public record.
- Per-layer interpretation, confidence, alternative explanations, and conflicts.
- Redaction note where content could expose credentials, session material, internal hostnames, or personal data.

## Output

```yaml
technology_observation:
  target: "https://authorized.example"
  scope_reference: "program scope or authorization reference"
  collected_at_utc: "YYYY-MM-DDTHH:MM:SSZ"
  limits: "passive or separately authorized low-impact observation only"
  observations:
    - layer: "transport-server|client-framework|infrastructure-edge"
      claim: "bounded description of what was observed"
      confidence: "high|moderate|low|unknown"
      evidence: "source locator and preserved-capture reference"
      alternatives: "proxy, cache, build artifact, third party, or unknown"
  conflicts: []
  exclusions: "what was not tested or cannot be concluded"
  handoff: "optional recon handoff reference"
```

## Supplemental Index

- [Transport and server signals](references/transport-server-signals.md)
- [Client and framework signals](references/client-framework-signals.md)
- [Infrastructure, CDN, and edge signals](references/infrastructure-cdn-signals.md)
- [Confidence and validation](references/confidence-validation.md)
- [Recon handoff](references/recon-handoff.md)
- [Operational assets](assets/)
