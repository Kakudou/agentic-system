import { randomInt } from 'node:crypto'
import { rollDice, RPG_DICE } from './generated/rpg-dice.js'

const BRIDGE_KEY = Symbol.for('kakudou.mode-router.v2.bridge')
const PLUGIN_ID = 'kakudou.rpg-dice'

// Explicitly fail closed if the authoritative mode router is missing or
// cannot positively identify a gamemaster session and allow this plugin.
export async function authorizeRoll(context) {
  const bridge = globalThis[BRIDGE_KEY]
  if (!bridge?.resolveRequest || !bridge?.pluginDecisionFor) throw new Error('rpg-dice: mode-router unavailable')
  let identity
  try { identity = bridge.resolveRequest(context) } catch { throw new Error('rpg-dice: session identity unavailable') }
  if (typeof identity?.sessionID !== 'string' || !identity.sessionID) throw new Error('rpg-dice: session identity unavailable')
  let decision
  try { decision = await bridge.pluginDecisionFor(identity.sessionID, PLUGIN_ID) } catch { throw new Error('rpg-dice: mode decision unavailable') }
  if (decision?.managed !== true || decision?.enabled !== true || decision?.mode !== 'gamemaster') {
    throw new Error('rpg-dice: only enabled in gamemaster mode')
  }
  return identity
}

export default {
  id: PLUGIN_ID,
  async setup(ctx) {
    await ctx.tool.transform((editor) => {
      editor.add({
        name: RPG_DICE.name,
        description: RPG_DICE.description,
        input: RPG_DICE.inputSchema,
        output: { type: 'string' },
        options: { codemode: false },
        execute: async (args, toolContext) => {
          await authorizeRoll(toolContext)
          const receipt = rollDice(args, randomInt)
          const output = JSON.stringify(receipt)
          return { output, content: output }
        },
      })
    })
  },
}
