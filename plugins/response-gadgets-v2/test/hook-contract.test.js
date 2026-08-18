import assert from "node:assert/strict"
import test from "node:test"

import plugin from "../index.js"

test("registers the current mutable pre-model context hook", async () => {
  const modelHooks = []
  const ctx = {
    session: {
      async hook(name) {
        modelHooks.push(name)
      },
    },
    tool: {
      async hook() {},
    },
  }

  await plugin.setup(ctx)

  assert.deepEqual(modelHooks, ["context"])
})
