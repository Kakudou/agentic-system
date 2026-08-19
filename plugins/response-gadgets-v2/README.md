# Response Gadgets V2

`kakudou.response-gadgets` independently selects optional response appendices once per eligible user turn. Selection happens in the OpenCode V2 `context` hook, remains stable across continuation requests for that turn, and never removes or rewrites native tool definitions.

## Global configuration

[`config.yml`](./config.yml) is the authoritative configuration shared by every session and plugin setup:

```yaml
version: 1
primary_agent: osho
require_mode_router: true
modes:
  - dev
  - dev-python
  - video-edit
gadgets:
  - name: random-srs
    skill: 97-gadget-random-srs
    probability: 0.15
```

The complete checked-in file also defines `random-news` and `random-fun-facts`, both at `0.05`. A probability of `1` always selects its gadget; `0` always suppresses it. Gates between `0` and `1` are evaluated independently.

The plugin reads the file at setup and refreshes it on every model context. If a later edit cannot be read or validated, it continues with the last-known-good configuration. Initial setup still fails when no valid configuration has ever been loaded.

Only `ctx.options.config` remains an option-level override. It selects another configuration path, which is useful for tests or a deliberately separate installation. Legacy `probabilities`, `modes`, `primaryAgent`, and `requireModeRouter` options are not runtime authorities and do not override values persisted by `/gadget`.

The host uses `Bun.YAML` for YAML parsing. A custom `.json` path is also serialized as JSON, allowing tests to inject `JSON.parse` as `Bun.YAML.parse`.

## `/gadget` command

```text
/gadget
/gadget status
/gadget reload
/gadget <name> <probability 0..1>
```

- `/gadget` and `/gadget status` report health, configuration path and revision, allowed modes, and every gadget name, skill, and probability.
- `/gadget reload` forces a re-read while preserving the last-known-good configuration on failure.
- `/gadget <name> <probability>` atomically rewrites the shared configuration. Other sessions and plugin setups observe the value on subsequent context turns.
- Unknown names, malformed syntax, and values outside `0..1` return an error without writing the file.

Control turns are never eligible for ambient selection. The plugin replaces the command marker prompt and appends an exact-result system instruction; it does not mutate `event.tools`.

## Tests

From this directory:

```sh
node --test test/*.test.js
```
