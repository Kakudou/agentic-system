// Claude Code adapter for the Ōtsumi response gadgets.
//
// The selection, directive, /gadget command, and at-most-once guard are the
// host-free core shared with the OpenCode V2 plugin
// (plugins/response-gadgets-v2). This file maps them onto Claude Code mod
// events:
//
//   prompt.submit          one selection per person-typed prompt; the
//                          directive rides as model-only context
//   tool.call (Skill)      at-most-once execution of a selected gadget
//   tool.call (otsumi_rng) host-side randomness for the gadget skills
//   command.run (gadget)   the deterministic /gadget control command

import type { EngineInterface, On } from 'claude-code'

import {
  RNG_TOOL,
  claimGadgetInvocation,
  cryptoRandomBelow,
  directive,
  executeGadgetCommand,
  isControlTurn,
  isGadgetSkill,
  newTurnState,
  rememberTurn,
  selectGadgets,
  weightedSelection,
} from '../core/gadgets.js'
import type { TurnState } from '../core/gadgets.js'
import { ConfigStore } from '../core/gadgets-config.js'
import type { GadgetFs } from '../core/gadgets-config.js'

const RNG_TOOL_ID = 'mcp__otsumi__otsumi_rng'
// The probability file both harnesses share, relative to this plugin's root.
const SHARED_CONFIG = '../../plugins/response-gadgets-v2/config.yml'
// Prompts a person sent, rather than notifications, peers, schedules, or plugins.
const PERSON_ORIGINS = new Set(['composer', 'bridge'])

// Claude Code has no Ōtsumi mode-router yet, so every session runs the
// general development policy: gadgets enabled, gadget skills allowed. A
// Claude Code port of the mode-router replaces this seam.
const POLICY = {
  mode: 'dev',
  skillAllowed: async (_skill: string) => true,
}

let store: ConfigStore | undefined
const turns = new Map<string, TurnState>()

function fsOf($: EngineInterface): GadgetFs {
  return {
    read: path => $.fs.read(path),
    stat: async path => {
      const info = await $.fs.stat(path)
      return { mtimeMs: info.mtimeMs, size: info.size }
    },
    write: (path, text) => $.fs.write(path, text),
  }
}

function normalize(path: string): string {
  const parts: string[] = []
  for (const part of path.split('/')) {
    if (part === '' || part === '.') continue
    if (part === '..') parts.pop()
    else parts.push(part)
  }
  return `/${parts.join('/')}`
}

async function storeFor($: EngineInterface): Promise<ConfigStore> {
  if (store) {
    store.useFs(fsOf($))
    return store
  }
  // A plugin folder may be a link (a hot-reload mods folder): resolve it so
  // the shared file is found beside the repository copy.
  const root = (await $.fs.stat($.plugin.root, { resolve: true })).realPath ?? $.plugin.root
  const loaded = new ConfigStore(normalize(`${root}/${SHARED_CONFIG}`), { fs: fsOf($) })
  await loaded.initialize()
  store = loaded
  return loaded
}

function errorText(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
}

export function registerGadgets(on: On): void {
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'gadget',
      description:
        'Inspect or change global response-gadget probabilities: /gadget [status|reload|<name> <0..1>]',
      argumentHint: '[status|reload|<name> <0..1>]',
    })
    await $.tool.register({
      name: RNG_TOOL.name,
      description: RNG_TOOL.description,
      inputSchema: RNG_TOOL.inputSchema,
      isDeferred: false,
    })
    return next(e)
  })

  // Runs at once with no model turn; the transcript shows the exact result.
  on('command.run', { command: 'gadget' }, async ($, e) => {
    try {
      const action = e.args.replace(/"/g, '').trim()
      return { text: await executeGadgetCommand(action, await storeFor($)) }
    } catch (error) {
      return { text: `response-gadgets: ${errorText(error)}` }
    }
  })

  on('prompt.submit', async ($, e, next) => {
    // A slash command, a hidden prompt, or anything a person did not send is
    // never decorated. Optional behavior never blocks the prompt itself.
    if (e.command || e.isMeta || !PERSON_ORIGINS.has(e.origin.kind)) return next(e)
    if (isControlTurn(e.text)) return next(e)

    let state: TurnState
    try {
      const current = await storeFor($)
      await current.refresh()
      const chosen = await selectGadgets(current.current, {
        randomBelow: cryptoRandomBelow,
        skillAllowed: POLICY.skillAllowed,
      })
      state = newTurnState(`prompt:${Date.now()}`, POLICY.mode, chosen)
      rememberTurn(turns, await $.session.id(), state)
    } catch (error) {
      $.ui.log(`response-gadgets: selection skipped: ${errorText(error)}`)
      return next(e)
    }

    if (!state.selected.length) return next(e)
    return next({ ...e, context: [...(e.context ?? []), directive(POLICY.mode, state)] })
  })

  on('tool.call', { tool: 'Skill' }, async ($, e, next) => {
    if (!isGadgetSkill(e.skill)) return next(e)
    // Claimed before execution: a failed gadget is terminal for its turn.
    const claim = claimGadgetInvocation(turns.get(await $.session.id()), e.skill)
    return claim.ok ? next(e) : { deny: claim.reason }
  }).catch(($, e, next) =>
    next.called || !isGadgetSkill(e.skill)
      ? next(e)
      : { deny: 'response-gadgets: the gadget guard failed' },
  )

  on('tool.call', { tool: RNG_TOOL_ID }, async ($, e) => {
    const input = e as unknown as { options?: unknown; weights?: unknown }
    try {
      return { result: weightedSelection(input.options, input.weights) }
    } catch (error) {
      return { deny: errorText(error) }
    }
  })
}
