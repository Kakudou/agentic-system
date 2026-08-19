import assert from "node:assert/strict"
import { mkdtemp, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import test from "node:test"

import plugin from "../index.js"

async function* emptyEvents() {}

test("registers the current mutable pre-model context hook directly", async (t) => {
  const root = await mkdtemp(join(tmpdir(), "otsumi-progression-hook-test-"))
  t.after(() => rm(root, { recursive: true, force: true }))

  const modelHooks = []
  const commands = []
  const tools = []
  const ctx = {
    options: {
      stateFile: join(root, "state.json"),
    },
    event: {
      subscribe: () => emptyEvents(),
    },
    command: {
      async transform(callback) {
        callback({
          update(name, mutate) {
            const command = {}
            mutate(command)
            commands.push({ name, command })
          },
        })
      },
    },
    session: {
      async hook(name) {
        modelHooks.push(name)
      },
    },
    tool: {
      async transform(callback) {
        callback({
          add(definition) {
            tools.push(definition)
          },
        })
      },
      async hook() {},
    },
  }

  const cleanup = await plugin.setup(ctx)
  t.after(cleanup)

  assert.deepEqual(modelHooks, ["context"])
  assert.deepEqual(commands, [
    {
      name: "otsumi",
      command: {
        description: "Inspect Ōtsumi's read-only GameMaster/PNJ progression sheet: /otsumi [status]",
        template: '<otsumi-progression-command action="$ARGUMENTS" />',
      },
    },
  ])
  assert.equal(tools.length, 4)
  for (const tool of tools) {
    assert.deepEqual(
      {
        nestedCodemode: tool.options?.codemode,
        hasTopLevelCodemode: Object.hasOwn(tool, "codemode"),
      },
      {
        nestedCodemode: false,
        hasTopLevelCodemode: false,
      },
      `${tool.name} must register codemode=false only in options`,
    )
  }
})
