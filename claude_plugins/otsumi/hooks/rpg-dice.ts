// Claude Code in-process mod adapter over the same host-free dice core.
// The host happens to prefix custom tools with mcp__, but this does NOT
// run, install, or call an MCP server.
import type { On } from 'claude-code'
import { cryptoRandomBelow } from '../core/gadgets.js'
import { RPG_DICE, rollDice } from '../core/rpg-dice.js'

export function registerRpgDice(on: On): void {
  on('session.start', async ($, e, next) => {
    await $.tool.register({
      name: RPG_DICE.name,
      description: RPG_DICE.description,
      inputSchema: RPG_DICE.inputSchema,
      isDeferred: false,
    })
    return next(e)
  })
  on('tool.call', { tool: /^mcp__otsumi__rpg_dice$/ }, async ($, e) => {
    try {
      const input = e as unknown as { count: number; sides: number; purpose: string }
      return { result: JSON.stringify(rollDice(input, cryptoRandomBelow)) }
    } catch (error) {
      return { deny: error instanceof Error ? error.message : String(error) }
    }
  })
}
