import assert from "node:assert/strict"
import { mkdtemp, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import test from "node:test"

import plugin from "../index.js"

test("registers the current mutable pre-model context hook", async (t) => {
  const root = await mkdtemp(join(tmpdir(), "response-gadgets-hook-test-"))
  const config = join(root, "config.json")
  await writeFile(config, JSON.stringify({
    version: 1,
    primary_agent: "osho",
    require_mode_router: true,
    modes: ["dev"],
    gadgets: [{
      name: "random-srs",
      skill: "97-gadget-random-srs",
      probability: 0.15,
    }],
  }))

  const priorBun = globalThis.Bun
  globalThis.Bun = { YAML: { parse: JSON.parse } }
  t.after(async () => {
    globalThis.Bun = priorBun
    await rm(root, { recursive: true, force: true })
  })

  const modelHooks = []
  const ctx = {
    options: { config },
    command: {
      async transform(callback) {
        callback({ update() {} })
      },
    },
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
