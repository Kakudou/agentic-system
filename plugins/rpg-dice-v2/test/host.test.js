import { test } from 'node:test'
import assert from 'node:assert/strict'
import plugin from '../index.js'

const key = Symbol.for('kakudou.mode-router.v2.bridge')

test('OpenCode V2 registration adds a native tool; no MCP process', async () => {
  const registered = []
  await plugin.setup({ tool: { transform: async cb => cb({ add: entry => registered.push(entry) }) } })
  assert.equal(registered.length, 1)
  assert.equal(registered[0].name, 'rpg_dice')
  assert.equal(registered[0].options.codemode, false)
  assert.equal(registered[0].input.required.join(','), 'count,sides,purpose')
  const previous = globalThis[key]
  globalThis[key] = {
    resolveRequest: () => ({ sessionID: 'case-id' }),
    pluginDecisionFor: async () => ({ managed: true, enabled: true, mode: 'gamemaster' }),
  }
  try {
    const response = await registered[0].execute({ count: 4, sides: 6, purpose: 'Shadowrun opposed test' }, {})
    const receipt = JSON.parse(response.output)
    assert.equal(receipt.notation, '4d6')
    assert.equal(receipt.faces.length, 4)
    assert.ok(receipt.faces.every(n => n >= 1 && n <= 6))
    assert.equal(receipt.hits_5_6, receipt.faces.filter(n => n >= 5).length)
    assert.equal(response.content, response.output)
    globalThis[key].pluginDecisionFor = async () => ({ managed: true, enabled: false, mode: 'dev' })
    await assert.rejects(() => registered[0].execute({ count: 1, sides: 20, purpose: 'Cypher check' }, {}), /only enabled/)
  } finally { if (previous === undefined) delete globalThis[key]; else globalThis[key] = previous }
})
