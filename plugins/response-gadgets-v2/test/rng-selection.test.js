import assert from "node:assert/strict"
import test from "node:test"

import { weightedSelection } from "../index.js"

const draw = (value) => () => value

test("uniform selection covers the full draw range", () => {
  assert.equal(weightedSelection(["a", "b"], undefined, draw(0)), "a")
  assert.equal(weightedSelection(["a", "b"], undefined, draw(999999)), "b")
  assert.equal(weightedSelection(["a", "b", "c"], undefined, draw(0)), "a")
  assert.equal(weightedSelection(["a", "b", "c"], undefined, draw(499999)), "b")
  assert.equal(weightedSelection(["a", "b", "c"], undefined, draw(999999)), "c")
  assert.equal(weightedSelection(["solo"], undefined, draw(123456)), "solo")
})

test("weighted selection honors the configured split", () => {
  assert.equal(weightedSelection(["japanese", "german"], [0.6, 0.4], draw(0)), "japanese")
  assert.equal(weightedSelection(["japanese", "german"], [0.6, 0.4], draw(299999)), "japanese")
  assert.equal(weightedSelection(["japanese", "german"], [0.6, 0.4], draw(700000)), "german")
  assert.equal(weightedSelection(["japanese", "german"], [0.6, 0.4], draw(999999)), "german")
  // Raw magnitudes behave the same as normalized weights.
  assert.equal(weightedSelection(["japanese", "german"], [6, 4], draw(599999)), "japanese")
  assert.equal(weightedSelection(["japanese", "german"], [6, 4], draw(600000)), "german")
})

test("invalid input rejects without selecting", () => {
  assert.throws(() => weightedSelection([], undefined, draw(1)), /non-empty/)
  assert.throws(() => weightedSelection("nope", undefined, draw(1)), /non-empty/)
  assert.throws(() => weightedSelection(["", "b"], undefined, draw(1)), /non-empty string/)
  assert.throws(() => weightedSelection([null], undefined, draw(1)), /non-empty string/)
  assert.throws(() => weightedSelection(["a", "b"], [1], draw(1)), /matching the options length/)
  assert.throws(() => weightedSelection(["a", "b"], [0, 1], draw(1)), /greater than zero/)
  assert.throws(() => weightedSelection(["a", "b"], [-1, 1], draw(1)), /greater than zero/)
  assert.throws(() => weightedSelection(["a", "b"], [NaN, 1], draw(1)), /greater than zero/)
  assert.throws(() => weightedSelection(["a", "b"], undefined, draw(1000000)), /integer in \[0, 1000000\)/)
  assert.throws(() => weightedSelection(["a", "b"], undefined, draw(-1)), /integer in \[0, 1000000\)/)
  assert.throws(() => weightedSelection(["a", "b"], undefined, draw(0.5)), /integer in \[0, 1000000\)/)
})

test("real host randomness approximates the configured split", () => {
  const n = 20_000
  let japanese = 0
  for (let i = 0; i < n; i++) {
    if (weightedSelection(["japanese", "german"], [0.6, 0.4]) === "japanese") japanese += 1
  }
  const share = japanese / n
  assert.ok(share >= 0.57 && share <= 0.63, `60/40 split drifted: ${share}`)

  let a = 0
  let b = 0
  let c = 0
  for (let i = 0; i < n; i++) {
    const pick = weightedSelection(["a", "b", "c"])
    if (pick === "a") a += 1
    else if (pick === "b") b += 1
    else c += 1
  }
  for (const [label, count] of [["a", a], ["b", b], ["c", c]]) {
    const uniformShare = count / n
    assert.ok(
      uniformShare >= 0.3 && uniformShare <= 0.37,
      `uniform share for '${label}' drifted: ${uniformShare}`,
    )
  }
})
