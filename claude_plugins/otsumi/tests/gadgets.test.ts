import { expect, test } from 'claude-code/testing'
import type { On } from 'claude-code'

const CONFIG_TAIL = '/plugins/response-gadgets-v2/config.yml'
let clock = 1

function configText(probabilities: { srs: number; news: number; facts: number }): string {
  return [
    'version: 1',
    'primary_agent: osho',
    'gadgets:',
    '  - name: random-srs',
    '    skill: 97-gadget-random-srs',
    `    probability: ${probabilities.srs}`,
    '  - name: random-news',
    '    skill: 97-gadget-random-news',
    `    probability: ${probabilities.news}`,
    '  - name: random-fun-facts',
    '    skill: 97-gadget-random-fun-facts',
    `    probability: ${probabilities.facts}`,
    '',
  ].join('\n')
}

// The engine beneath the plugin: an in-memory shared config file, one
// session, and records of what the plugin registered and submitted.
function harness(on: On, sessionID: string, initial: string) {
  const file = { text: initial, mtimeMs: clock++ }
  const seen = {
    commands: [] as string[],
    tools: [] as string[],
    contexts: [] as (readonly string[] | undefined)[],
    skillRuns: 0,
    writes: [] as string[],
  }

  on('session.start', ($, e) => ({ cwd: e.cwd }))
  on('session.id', () => ({ value: sessionID }))
  on('command.register', ($, e) => {
    seen.commands.push(e.name)
    return { value: { command: e.name } }
  })
  on('tool.register', ($, e) => {
    seen.tools.push(e.name)
    return { value: { tool: `mcp__otsumi__${e.name}` } }
  })
  on('fs.stat', ($, e) => {
    if (e.path.endsWith(CONFIG_TAIL)) {
      return { value: { kind: 'file' as const, size: file.text.length, mtimeMs: file.mtimeMs, isLink: false } }
    }
    return { value: { kind: 'dir' as const, size: 0, mtimeMs: 0, isLink: false, realPath: e.path } }
  })
  on('fs.read', ($, e) => {
    if (!e.path.endsWith(CONFIG_TAIL)) throw new Error(`ENOENT ${e.path}`)
    return { value: file.text }
  })
  on('fs.write', ($, e) => {
    seen.writes.push(e.path)
    file.text = e.text
    file.mtimeMs = clock++
    return { value: undefined }
  })
  on('prompt.submit', ($, e) => {
    seen.contexts.push(e.context)
    return { text: e.text, context: e.context }
  })
  on('tool.call', { tool: 'Skill' }, () => {
    seen.skillRuns++
    return { result: { success: true, commandName: 'gadget' } }
  })

  return { file, seen }
}

const PERSON = { kind: 'composer' } as const

test('session start registers /gadget and otsumi_rng', async ($, on) => {
  const { seen } = harness(on, 'session-register', configText({ srs: 0, news: 0, facts: 0 }))
  await $.session.start({ cwd: '/work', surface: null, isInteractive: true })
  expect(seen.commands).toEqual(['gadget'])
  expect(seen.tools).toEqual(['otsumi_rng'])
})

test('/gadget reports and updates the shared probabilities', async ($, on) => {
  const { file, seen } = harness(on, 'session-command', configText({ srs: 0.15, news: 0.05, facts: 0.05 }))
  const presentation = { isFullscreen: false, columns: 80 }

  const status = await $.command.run({ command: 'gadget', args: 'status', origin: PERSON, presentation })
  expect(status.text).toContain('Response Gadgets: HEALTHY')
  expect(status.text).toContain('random-srs -> 97-gadget-random-srs probability=0.15')

  const updated = await $.command.run({ command: 'gadget', args: 'random-news 0.5', origin: PERSON, presentation })
  expect(updated.text).toContain('Gadget probability updated: random-news = 0.5')
  expect(seen.writes.length).toBe(1)
  expect(file.text).toContain('probability: 0.5')

  const invalid = await $.command.run({ command: 'gadget', args: 'random-news 2', origin: PERSON, presentation })
  expect(invalid.text).toContain("Invalid probability '2'")
  expect(seen.writes.length).toBe(1)
})

test('a person prompt carries the directive once, and a selected gadget runs at most once', async ($, on) => {
  const { seen } = harness(on, 'session-turn', configText({ srs: 1, news: 0, facts: 0 }))

  await $.prompt.submit({ text: 'explain tcp slow start', wait: false, origin: PERSON })
  const context = seen.contexts[0] ?? []
  expect(context.length).toBe(1)
  expect(context[0]).toContain('<response-gadget-runtime mode="dev">')
  expect(context[0]).toContain('- 97-gadget-random-srs')
  expect(context[0]).not.toContain('97-gadget-random-news')

  const first = await $.tool.call({ tool: 'Skill', skill: '97-gadget-random-srs' })
  expect(first.deny).toBeUndefined()
  // A plugin's refusal reaches the model as an error result carrying this text.
  const second = await $.tool.call({ tool: 'Skill', skill: '97-gadget-random-srs' })
  expect(second.deny).toContain('blocked duplicate invocation')
  expect(seen.skillRuns).toBe(1)

  // Unselected and ordinary skills are untouched.
  await $.tool.call({ tool: 'Skill', skill: '97-gadget-random-news' })
  await $.tool.call({ tool: 'Skill', skill: '04-git-commit' })
  expect(seen.skillRuns).toBe(3)
})

test('control, hidden, and non-person prompts are never decorated', async ($, on) => {
  const { seen } = harness(on, 'session-skip', configText({ srs: 1, news: 1, facts: 1 }))

  await $.prompt.submit({ text: '/mode status', wait: false, origin: PERSON })
  await $.prompt.submit({ text: 'background done', wait: false, origin: { kind: 'task-notification' } })
  expect(seen.contexts).toEqual([undefined, undefined])

  // The same session's next person-typed prompt is decorated as usual.
  await $.prompt.submit({ text: 'hello', wait: false, origin: PERSON })
  expect(seen.contexts[2]?.[0]).toContain('97-gadget-random-fun-facts')
})

test('otsumi_rng answers one of the options and refuses invalid input', async ($, on) => {
  harness(on, 'session-rng', configText({ srs: 0, news: 0, facts: 0 }))
  await $.session.start({ cwd: '/work', surface: null, isInteractive: true })

  const picked = await $.tool.call({ tool: 'mcp__otsumi__otsumi_rng', options: ['cybersecurity', 'france'], weights: [0.5, 0.5] })
  expect(['cybersecurity', 'france']).toContain(picked.result)

  const refused = await $.tool.call({ tool: 'mcp__otsumi__otsumi_rng', options: [] })
  expect(refused.deny).toContain('options must be a non-empty array')
})
