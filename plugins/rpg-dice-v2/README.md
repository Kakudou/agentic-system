# Ōtsumi RPG Dice — native OpenCode 2 / Claude plugin

This is a **V2 OpenCode local plugin**, just like `mode-router-v2`, **not an MCP server**. The authoritative tiny host-free dice core lives at `claude_plugins/otsumi/core/rpg-dice.js`; OpenCode imports the generated plugin-local runtime copy at `generated/rpg-dice.js` so the plugin also resolves when loaded through the OpenCode config symlink. The pre-existing Claude Code in-process plugin contains the `hooks/rpg-dice.ts` adapter. There is no process, network call, database, persisted state, or script command during play.

## Core synchronization

Run `npm run generate:core` after changing the canonical core, and use `npm run check:core` to verify that the plugin-local copy is current. `npm test` performs this check before running the Node tests.

## OpenCode 2

1. Keep this `plugins/rpg-dice-v2` directory next to the mode router and ensure your existing OpenCode V2 plugin loader discovers it.
2. Activate `/mode gamemaster`. The mode-router's `managed_plugins` allowlist enables `kakudou.rpg-dice` **only** for `gamemaster` mode; dev and chatbot fail closed.
3. Agent Fuhyō calls `rpg_dice({ count: 9, sides: 6, purpose: 'Perception + Intuition' })` after obtaining any player-controlled Edge decisions. The plug-in returns JSON in its tool result.

## Claude Code

The existing `claude_plugins/otsumi/hooks/register.ts` registers the same `rpg_dice` tool through Claude's native hook module API, using `hooks/rpg-dice.ts`. Start Claude with the existing `--plugin-dir claude_plugins/otsumi` option. Claude assigns a conventional internal tool label `mcp__otsumi__rpg_dice`; **the label does not mean a separate MCP server** and no external MCP config is involved. Since the Claude port has no mode router yet, agent instructions restrict its use to RPG sessions; Claude plugin API does not enforce gamemaster mode like OpenCode.

## Output

Example *schema only* — these faces are illustrative, NOT a real invocation receipt:

```json
{"receipt":"roll-abc0123400ffbeef","notation":"4d6","purpose":"Stealth + Agility","faces":[1,5,2,6],"total":14,"ones":1,"provider":"host-csprng","hits_5_6":2}
```

For a `1d20`, the result also includes `natural`. The plugin never calculates rule-dependent success, opposed roll outcomes, glitches, Edge spending or intrusion costs. Those belong to game-specific Markdown skills, with the receipt in `mechanics.md` and state changes committed by Fuhyō. The receipt ID is unique *with overwhelming probability*, not a cryptographic proof; write it verbatim into the journal alongside faces.

## Security and constraints

- A secure CSPRNG is used in both hosts: OpenCode calls Node `crypto.randomInt()`, Claude uses the already existing host WebCrypto rejection sampler. Both produce unbiased integer dice faces.
- Count 1–200, sides 2–1000, purpose nonempty and ≤120 characters; input and RNG draws validated.
- No dice are rolled if the OpenCode mode bridge fails authentication. An error must never be converted into an invented result.
- Claude tool callable by the model regardless of RPG mode until a Claude mode router is ported; this is a host limitation.
- No automatic persistence: Fuhyō writes receipts through existing authorized file tools.

## Test

```sh
cd plugins/rpg-dice-v2 && npm test
cd ../mode-router-v2 && npm test
```

The tests exercise the core and mode policy; no full OpenCode or Claude host end-to-end invocation was available in this environment.
