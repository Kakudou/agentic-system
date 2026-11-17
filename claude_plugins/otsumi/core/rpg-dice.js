// Ōtsumi RPG dice engine — portable host-free core.
// Both OpenCode V2 and Claude Code invoke it in-process; no service or MCP server.
// The host provides an unbiased cryptographic randomBelow(n) implementation.

export const RPG_DICE = Object.freeze({
  name: 'rpg_dice',
  description: 'Roll genuine independent RPG dice locally and return an audit receipt. Use only after pre-roll resource choices. Returns all faces and totals; Shadowrun hits and ones are reported without making an edition-dependent glitch ruling. No state or files are modified.',
  inputSchema: {
    type: 'object',
    properties: {
      count: { type: 'integer', minimum: 1, maximum: 200 },
      sides: { type: 'integer', minimum: 2, maximum: 1000 },
      purpose: { type: 'string', minLength: 1, maxLength: 120 },
    },
    required: ['count', 'sides', 'purpose'],
    additionalProperties: false,
  },
})

function requireCount(value, minimum, maximum, name) {
  if (!Number.isSafeInteger(value) || value < minimum || value > maximum) {
    throw new TypeError(`rpg_dice: ${name} must be an integer from ${minimum} through ${maximum}`)
  }
}

export function rollDice(input, randomBelow) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new TypeError('rpg_dice: expected object')
  if (typeof randomBelow !== 'function') throw new TypeError('rpg_dice: secure RNG unavailable')
  const { count, sides, purpose } = input
  requireCount(count, 1, 200, 'count')
  requireCount(sides, 2, 1000, 'sides')
  if (typeof purpose !== 'string' || !purpose.trim() || purpose.length > 120) throw new TypeError('rpg_dice: purpose must be 1–120 characters')
  const faces = []
  for (let index = 0; index < count; index++) {
    const draw = randomBelow(sides)
    if (!Number.isSafeInteger(draw) || draw < 0 || draw >= sides) throw new TypeError('rpg_dice: host returned an invalid random integer')
    faces.push(draw + 1)
  }
  // UUID-like receipt is random, not calculated from narrative data; it is an identifier,
  // not a cryptographic proof or signature, and doesn't provide verifiable randomness.
  const idParts = Array.from({ length: 4 }, () => {
    const draw = randomBelow(65536)
    if (!Number.isSafeInteger(draw) || draw < 0 || draw >= 65536) throw new TypeError('rpg_dice: invalid receipt entropy')
    return draw.toString(16).padStart(4, '0')
  })
  const result = {
    receipt: `roll-${idParts.join('')}`,
    notation: `${count}d${sides}`,
    purpose: purpose.trim(),
    faces,
    total: faces.reduce((a, b) => a + b, 0),
    ones: faces.filter(x => x === 1).length,
    provider: 'host-csprng',
  }
  if (sides === 6) {
    result.hits_5_6 = faces.filter(x => x >= 5).length
  }
  if (sides === 20 && count === 1) {
    result.natural = faces[0]
  }
  return result
}
