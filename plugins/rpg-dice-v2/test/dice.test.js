import { test } from 'node:test'
import assert from 'node:assert/strict'
import { rollDice } from '../generated/rpg-dice.js'
import { authorizeRoll } from '../index.js'

const testDraw = n => n - 1

test('shadowrun six-sided dice counts exact faces, hits and ones, and returns a receipt', () => {
  const draws = [0, 4, 5, 2, 1, 5, 8, 9, 10, 11]
  const roll = rollDice({ count: 6, sides: 6, purpose: 'Stealth + Agility' }, n => draws.shift() % n)
  assert.deepEqual(roll.faces, [1, 5, 6, 3, 2, 6])
  assert.equal(roll.hits_5_6, 3)
  assert.equal(roll.ones, 1)
  assert.equal(roll.total, 23)
  assert.match(roll.receipt, /^roll-[0-9a-f]{16}$/)
})

test('Cypher d20 exposes the natural die without declaring game outcome', () => {
  const receipt = rollDice({ count: 1, sides: 20, purpose: 'Might task' }, n => n - 1)
  assert.equal(receipt.natural, 20)
  assert.equal(receipt.total, 20)
  assert.equal(receipt.hits_5_6, undefined)
})

test('rejects invalid pools and out-of-range host entropy', () => {
  for (const count of [-1, 0, 201, 1.1, '2', NaN]) {
    assert.throws(() => rollDice({ count, sides: 6, purpose: 'check' }, testDraw))
  }
  assert.throws(() => rollDice({ count: 1, sides: 1, purpose: 'check' }, testDraw))
  assert.throws(() => rollDice({ count: 1, sides: 6, purpose: 'check' }, () => 6))
})

test('without router, the OpenCode V2 plugin fails closed', async () => {
  const key = Symbol.for('kakudou.mode-router.v2.bridge')
  const previous = globalThis[key]
  delete globalThis[key]
  try { await assert.rejects(() => authorizeRoll({}), /mode-router unavailable/) }
  finally { if (previous !== undefined) globalThis[key] = previous }
})

test('mode router must explicitly authorize gamemaster', async () => {
  const key = Symbol.for('kakudou.mode-router.v2.bridge')
  const prior = globalThis[key]
  globalThis[key] = {
    resolveRequest: () => ({ sessionID: 's1' }),
    pluginDecisionFor: async (s, id) => ({ managed: true, enabled: true, mode: 'gamemaster' }),
  }
  try {
    assert.equal((await authorizeRoll({})).sessionID, 's1')
    globalThis[key].pluginDecisionFor = async () => ({ managed: true, enabled: false, mode: 'dev' })
    await assert.rejects(() => authorizeRoll({}), /only enabled/)
  } finally { if (prior === undefined) delete globalThis[key]; else globalThis[key] = prior }
})
