# Response Gadgets V2

`kakudou.response-gadgets` independently selects optional response appendices once per eligible user turn. Selection happens in the OpenCode V2 `context` hook, remains stable across continuation requests for that turn, and never removes or rewrites native tool definitions.

## Global configuration

[`config.yml`](./config.yml) is the authoritative probability configuration shared by every session and plugin setup:

```yaml
version: 1
primary_agent: osho
gadgets:
  - name: random-srs
    skill: 97-gadget-random-srs
    probability: 0.15
```

The complete checked-in file also defines `random-news` and `random-fun-facts`, both at `0.05`. A probability of `1` always selects its gadget; `0` always suppresses it. Gates between `0` and `1` are evaluated independently.

The mode-router bridge at `Symbol.for('kakudou.mode-router.v2.bridge')` is the sole runtime authority for whether this plugin is enabled in a session. Every context hook, `/gadget` control operation, `otsumi_rng` execution, and gadget-skill execution rechecks that policy. Missing or unresolved identity, a missing/throwing bridge decision, or an explicit denial fails closed before plugin-owned effects.

The plugin reads the probability file at setup and refreshes it on each authorized model context. If a later edit cannot be read or validated, it continues with the last-known-good configuration. Initial setup still fails when no valid configuration has ever been loaded. Legacy `modes` and `require_mode_router` keys are ignored and omitted on the next probability write; they never authorize runtime behavior.

Only `ctx.options.config` remains an option-level override. It selects another configuration path, which is useful for tests or a deliberately separate installation. Legacy `probabilities`, `modes`, `primaryAgent`, and `requireModeRouter` options are not runtime authorities and do not override persisted configuration or mode-router policy.

The host uses `Bun.YAML` for YAML parsing. A custom `.json` path is also serialized as JSON, allowing tests to inject `JSON.parse` as `Bun.YAML.parse`.

## `/gadget` command

```text
/gadget
/gadget status
/gadget reload
/gadget <name> <probability 0..1>
```

- `/gadget` and `/gadget status` report health, configuration path and revision, and every gadget name, skill, and probability.
- `/gadget reload` forces a re-read while preserving the last-known-good configuration on failure.
- `/gadget <name> <probability>` atomically rewrites the shared configuration. Other sessions and plugin setups observe the value on subsequent context turns.
- Unknown names, malformed syntax, and values outside `0..1` return an error without writing the file.

Control turns are never eligible for ambient selection. The plugin replaces the command marker prompt and appends an exact-result system instruction; it does not mutate `event.tools`.
When the plugin is disabled for the current session, all command forms return the same deterministic denial and do not read, reload, or write probability configuration.

## Tests

From this directory:

```sh
node --test test/*.test.js
```
