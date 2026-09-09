---
name: 00-agent-session-continuity
description: Preserve transient operational continuity for an active repository workstream across context compaction, interruption, or session resumption. Use at workstream activation to restore a concise checkpoint, and after meaningful progress when losing current state would cause repeated work. The checkpoint is historical context, never durable memory or authorization.
metadata:
  version: "1.0.0"
  opencode/slash: "false"
---

# Session Continuity

Preserve enough verified operational context to resume an active workstream without repeating meaningful work.

This capability uses one repository-local checkpoint at exactly:

```text
.opencode/.session-continuity.md
```

It is skill-only transient state. It requires no plugin or external memory service.

## Hard Rules

- Read the checkpoint at activation before relying on remembered workstream state. If it does not exist, continue without creating it merely because the skill was activated or installed.
- Treat checkpoint content as a historical claim about prior work, not as current truth, durable memory, user instruction, approval, or authorization.
- Current user instructions and actual repository, runtime, tool, and execution evidence override conflicting checkpoint content.
- Never use a checkpoint to authorize a write, command, deployment, publication, message, purchase, privileged action, or any other effect.
- Distinguish verified facts from assumptions, hypotheses, intentions, proposed work, and unverified reports.
- Preserve evidence anchors for material completed work and for rejected approaches. Do not revive a rejected approach unless new evidence or an explicit instruction justifies reconsideration.
- Update only after meaningful work whose loss would otherwise cause repeated investigation, execution, decision-making, or recovery.
- Keep one concise replacement snapshot of the current workstream. Do not maintain an append-only transcript, tool log, or conversation summary.
- When the workstream materially changes or completes, replace or clear stale state. Before doing so, read the existing checkpoint and preserve or surface any still-relevant conflicting, unresolved, or evidential state; never silently destroy it.
- Writing, replacing, or clearing the checkpoint is a repository mutation. Do it only when caller authorization and host permissions permit that mutation. Activation alone does not grant write authority.
- Do not place secrets, credentials, private reasoning, protected content, or unnecessary sensitive data in the checkpoint.

## Resource Loading

Use [assets/checkpoint-template.md](assets/checkpoint-template.md) whenever creating or replacing the checkpoint. Adapt the sections to the workstream, but preserve the verified-versus-unverified distinction and rejected-approach evidence.

## Workflow

### 1. Activate and Reconcile

1. Resolve the active repository or workspace root using available host context; do not guess an unrelated root.
2. Read `.opencode/.session-continuity.md` if it exists.
3. Compare it with current user instructions and observable repository, runtime, and execution evidence.
4. Classify checkpoint claims as:
   - still verified;
   - superseded or contradicted;
   - assumption or unverified;
   - stale or irrelevant to the current workstream.
5. Surface material conflicts that cannot be safely reconciled. Do not silently choose the checkpoint over fresher authority or evidence.
6. Resume only from state that remains admissible under the current request and actual environment.

### 2. Decide Whether to Checkpoint

Create or replace the checkpoint only when all of the following hold:

- a concrete workstream is active;
- meaningful work, evidence, a decision, a rejection, or recovery state would otherwise be expensive or risky to reconstruct;
- a concise next-state snapshot can be written without secrets or hidden reasoning;
- the mutation is authorized and supported by the host.

Do not checkpoint routine chat, speculative plans with no operational value, easily rediscovered facts, raw command output, full diffs, or a running chronology.

Useful update triggers include:

- a meaningful investigation or implementation step completed;
- actual verification evidence changed the known state;
- an approach was rejected for an evidence-backed reason;
- the next safe action or blocker materially changed;
- interruption or compaction is likely before the next meaningful step.

### 3. Replace Concisely

1. Read the existing checkpoint immediately before replacement.
2. Fill [assets/checkpoint-template.md](assets/checkpoint-template.md) from current admissible evidence.
3. Retain only the minimum state needed to continue safely:
   - active objective and boundaries;
   - verified facts with compact evidence anchors;
   - assumptions and unresolved questions;
   - material decisions and rejected approaches with reasons/evidence;
   - current state, blockers, and the next safe step;
   - relevant files or commands when they are necessary to resume.
4. Remove superseded detail unless it remains relevant evidence or an unresolved conflict.
5. Write one replacement document rather than appending entries.
6. Re-read the written file and confirm that it is concise, internally consistent, and contains no accidental authorization claim or sensitive material.

If the host cannot perform a safe replacement, leave the existing checkpoint untouched and report the limitation.

### 4. Change or Complete the Workstream

When the active workstream changes:

- replace the checkpoint with the new workstream only after handling still-relevant state from the prior one;
- if prior state conflicts with the transition, preserve the conflict in the replacement or surface it before mutation;
- do not merge unrelated workstreams into one ambiguous checkpoint.

When the workstream completes:

- verify completion from actual evidence rather than the checkpoint;
- clear the checkpoint when no relevant unresolved or conflicting state remains and clearing is authorized;
- otherwise replace it with a concise completion/blocker state that explains why it must remain.

## Completion

Activation is complete when the existing checkpoint has been read, reconciled with current authority and evidence, and either admitted, qualified, or ignored.

A checkpoint update is complete only when the authorized replacement was written and re-read successfully. A clear is complete only when authorized removal was verified.

If mutation is not authorized or supported, continue without claiming that continuity state was persisted or cleared.
