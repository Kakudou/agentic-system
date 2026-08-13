---
name: 00-agent-dream
description: Run one stochastic offline dream cycle for every callable custom archetype subagent using its own TencentDB memory.
metadata:
  version: "1.0"
  opencode/slash: "true"
  opencode/autoinvoke: "false"
---

# TDAI Dream Protocol

This skill is **only** for explicit `/dream` execution.

It has two execution roles:

- **ORCHESTRATOR role**: the normal `/dream` invocation.
- **WORKER role**: a subagent whose prompt contains the exact marker `TDAI_DREAM_WORKER`.

Never mix the two execution roles.

## Safety invariants

- The configured TencentDB memory plugin remains the authority for identity and memory isolation.
- Every dream execution MUST first call `tdai_dream_begin` with protocol `TDAI_DREAM_SKILL_V1`. This suppresses normal conversation capture for that execution.
- The 60/30/10 outcome is decided only by `tdai_dream_roll`, never by the model.
- A `nothing` outcome performs no TencentDB retrieval and no memory mutation.
- A `dream` or `nightmare` calls `tdai_dream_sample` exactly once and `tdai_dream_commit` at most once.
- Do not use normal Tencent retrieval, Wiki, CodeGraph, web search, web fetch, file edits, or project work during a worker dream.
- Never turn imagined material into factual history.
- Never let dream-derived material override contradictory L0/L1 evidence.
- After `tdai_dream_commit` returns a terminal result, stop immediately.

# ORCHESTRATOR role

Use this role unless the current subagent prompt contains `TDAI_DREAM_WORKER`.

1. **First tool call:**

   `tdai_dream_begin({ role: "orchestrator", protocol: "TDAI_DREAM_SKILL_V1" })`

2. Use the **native OpenCode subagent roster already advertised in your context/tooling**. Do **not** inspect `~/.config/opencode/agents`, use `glob`, use `read`, or use shell commands to discover agents.

3. Select every callable **custom archetype** agent exactly once.

   Exclude OpenCode built-in/maintenance utility agents such as:

   - `general`
   - `explore`
   - `scout`
   - `compaction`
   - `title`
   - `summary`

   Also exclude any agent that cannot be invoked as a subagent. Do not invent missing agent IDs.

4. Spawn the selected archetypes **sequentially**. Give each exactly this intent, substituting its actual agent ID:

   ```text
   TDAI_DREAM_WORKER
   Target archetype: <agent-id>

   Explicitly load `00-agent-dream` and execute ONLY its WORKER role for yourself.
   Your first dream-protocol tool call must be:
   tdai_dream_begin({role:"worker", protocol:"TDAI_DREAM_SKILL_V1"})

   Then call tdai_dream_roll({}) exactly once.

   Do not spawn subagents.
   Do not perform project work.
   Return only the compact DREAM_RESULT requested by the skill.
   ```

5. Do not retrieve or inspect the workers' Tencent memories yourself. Each worker owns its own memory scope.

6. After all callable archetypes finish, return only a compact roster summary such as:

   ```text
   DREAM_RUN
   architect: nothing
   agent1: dream committed
   reviewer: nightmare committed
   ```

   Do not reproduce the full dream narratives in the orchestrator output.

# WORKER role

Use this role only when the current prompt contains `TDAI_DREAM_WORKER`.

## 1. Begin the dream execution

Your first dream-protocol tool call MUST be:

`tdai_dream_begin({ role: "worker", protocol: "TDAI_DREAM_SKILL_V1" })`

If it returns a terminal error, stop and return that status.

## 2. Roll the outcome

Call exactly once:

```text
tdai_dream_roll({})
```

The plugin uses cryptographic runtime randomness and caches the first result for this execution. Calling the tool again returns the same result; it never rerolls.

Interpret the resulting `roll` exactly:

- `0..59` → **nothing** (60%)
- `60..89` → **dream** (30%)
- `90..99` → **nightmare** (10%)

Never reroll.

### If outcome is `nothing`

Do not call TencentDB memory tools. Do not call `tdai_dream_sample`. Do not commit anything.

Return exactly one compact line:

```text
DREAM_RESULT outcome=nothing roll=<roll> mutation=0
```

Then stop.

## 3. Obtain one bounded memory sample

For `dream` or `nightmare`, call exactly once:

```text
tdai_dream_sample({})
```

This sample is immutable for this execution. It intentionally contains only a small subset of your own TencentDB memory. Prior Dream L2 candidates are excluded by the plugin.

If the sample is empty/terminal, do not invent memories and do not commit. Return:

```text
DREAM_RESULT outcome=<dream|nightmare> roll=<roll> mutation=0 reason=no-memory-sample
```

Then stop.

## 4. Create the seed

Use the returned entropy only as a creative stimulus. Without external lookup, produce **one short surreal seed**: preferably 1–5 words or one very short sentence.

The seed is not factual evidence and must not introduce a claim about the user.

Examples of form only (do not reuse automatically):

- `glass lighthouse`
- `mercury rain over a silent cathedral`
- `a key remembering the wrong door`

## 5. Dream

Use only the bounded TencentDB sample plus your own archetype/personality.

### For a DREAM

Create one associative reflection that:

- connects at most a few sampled fragments;
- may form a metaphor, unexpected relationship, or possible abstraction;
- remains clearly speculative;
- does not invent an event and then claim it happened;
- does not invert known preferences or facts.

Produce exactly **one possible association** that may be worth preserving.

### For a NIGHTMARE

Create one counterfactual stress-test that asks things such as:

- Which assumption could fail?
- Which unresolved tension could become dangerous?
- Which previously successful pattern might break under different conditions?

A nightmare may imagine a failure mode, but MUST NOT fabricate historical trauma, incidents, preferences, or actions and then present them as remembered facts.

Produce exactly **one possible failure pattern** that may be worth preserving.

## 6. Commit exactly one candidate

Call exactly once:

```text
tdai_dream_commit({
  sample_id: "<sample.sampleId>",
  title: "<short title>",
  seed: "<the seed you created>",
  dream: "<bounded dream/nightmare narrative>",
  association: "<one association or one failure pattern>",
  grounding: "<short statement distinguishing supported memory evidence from speculation>"
})
```

The plugin, not you, chooses the L2 path and adds provenance/low-authority warnings. It mechanically allows only one successful mutation for this dream execution.

Do not call any other memory mutation tool.

## 7. Stop

If commit succeeds, return exactly one compact line:

```text
DREAM_RESULT outcome=<dream|nightmare> roll=<roll> mutation=1 path=<returned-path>
```

If commit fails, return:

```text
DREAM_RESULT outcome=<dream|nightmare> roll=<roll> mutation=0 reason=<terminal-code>
```

Do not retry after a terminal result.
