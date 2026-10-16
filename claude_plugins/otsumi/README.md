# Ōtsumi for Claude Code

A Claude Code mod (in-process hooks module) that brings the Ōtsumi runtime plugins to Claude Code. Each feature is a thin Claude Code adapter over a **host-free core** that the OpenCode V2 plugin in [`plugins/`](../../plugins/) imports too, so behavior is written once.

| Feature | Core | Claude Code adapter | OpenCode V2 adapter |
| --- | --- | --- | --- |
| Response gadgets | [`core/gadgets.js`](core/gadgets.js), [`core/gadgets-config.js`](core/gadgets-config.js) | [`hooks/gadgets.ts`](hooks/gadgets.ts) | [`plugins/response-gadgets-v2`](../../plugins/response-gadgets-v2/) |
| Mode router | not yet ported | — | [`plugins/mode-router-v2`](../../plugins/mode-router-v2/) |
| Progression | not yet ported | — | [`plugins/otsumi-progression-v2`](../../plugins/otsumi-progression-v2/) |

The core lives inside this plugin folder because a Claude Code hooks module may only import files of its own plugin; the OpenCode plugin imports it from here. Keep `core/` free of Node and host APIs: a hooks module has neither, so hosts inject randomness, policy, and file access.

This folder sits outside `plugins/` on purpose: OpenCode auto-loads every directory there as an OpenCode plugin.

## Response gadgets on Claude Code

| OpenCode V2 | Claude Code |
| --- | --- |
| `context` hook selects once per user turn, cached across continuations | `prompt.submit` selects once per person-typed prompt; the directive rides as model-only `context` |
| `execute.before` on the `skill` tool | `tool.call` on `Skill`, failing closed for gadget skills |
| `otsumi_rng` tool | `mcp__otsumi__otsumi_rng`, registered with its schema in the prompt |
| `/gadget` rewrites the prompt and asks the model to echo the result | `/gadget` answers at once, with no model turn |
| mode-router bridge decides enablement and skill policy | no mode router yet: every session uses the `dev` policy |

Both harnesses read and write the same [`config.yml`](../../plugins/response-gadgets-v2/config.yml), so a `/gadget <name> <p>` in one applies to the other. Writes always use plain block YAML, which both Bun's YAML and the core's subset parser read. OpenCode writes through an atomic rename; Claude Code's `$.fs.write` is a plain write.

## Develop and test

```sh
# from the repository root
node --test claude_plugins/otsumi/core/test/          # host-free core
claude plugin validate claude_plugins/otsumi          # manifest and hooks module
claude plugin test claude_plugins/otsumi              # Claude Code adapter
(cd plugins/response-gadgets-v2 && npm test)          # OpenCode V2 adapter
```

Run it for one session with `claude --plugin-dir claude_plugins/otsumi`, or for every session by naming the folder in `CLAUDE_CODE_PLUGIN_DIRS` (the `env` block of `~/.claude/settings.json`). Both watch the folder and reload on save.
