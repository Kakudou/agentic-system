import assert from "node:assert/strict"
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import test from "node:test"

import plugin from "../index.js"

const bridgeKey = Symbol.for("kakudou.mode-router.v2.bridge")

async function* emptyEvents() {}

const proposal = {
  title: "A smaller status view",
  desire: "I want a compact status view.",
  rationale: "Fixture rationale.",
  changes: "Fixture changes.",
  requiredEffects: "Fixture effects.",
  risks: "Fixture risks.",
  successEvidence: "Fixture evidence.",
}

test("a failed progression write rejects for its caller without poisoning later writes", { concurrency: false }, async (t) => {
  const root = await mkdtemp(join(tmpdir(), "otsumi-progression-write-chain-test-"))
  const stateFile = join(root, "state.json")
  await writeFile(stateFile, JSON.stringify({
    version: 2,
    identity: "otsumi",
    level: 2,
    xp: 42,
    pendingEvolution: {
      level: 2,
      unlockedAt: "2026-01-01T00:00:00.000Z",
      announcementDelivered: true,
      announcedAt: "2026-01-01T00:00:01.000Z",
      proposal: null,
      rejections: [],
    },
    evolutions: [],
    updatedAt: "2026-01-01T00:00:01.000Z",
  }))

  globalThis[bridgeKey] = {
    async pluginDecisionFor(_sessionID, pluginID) {
      return {
        mode: "dev",
        managed: pluginID === "kakudou.otsumi-progression",
        enabled: pluginID === "kakudou.otsumi-progression",
        reason: "allow",
      }
    },
    agentFor() {
      return "osho"
    },
  }

  const tools = new Map()
  const cleanup = await plugin.setup({
    options: { stateFile },
    command: { async transform(callback) { await callback({ add() {} }) } },
    event: { subscribe: () => emptyEvents() },
    session: { async hook() {}, async get() { return { data: {} } }, async prompt() {} },
    tool: {
      async transform(callback) {
        await callback({ add(definition) { tools.set(definition.name, definition) } })
      },
      async hook() {},
    },
  })

  t.after(async () => {
    await cleanup()
    delete globalThis[bridgeKey]
    await rm(root, { recursive: true, force: true })
  })

  const toolCtx = { sessionID: "s1", agent: "osho" }

  // Injected failure: the state path becomes a non-empty directory.
  await rm(stateFile)
  await mkdir(join(stateFile, "blocker"), { recursive: true })
  const priorError = console.error
  console.error = () => {}
  try {
    await assert.rejects(() => tools.get("otsumi_progression_propose").execute(proposal, toolCtx))
  } finally {
    console.error = priorError
  }

  await rm(stateFile, { recursive: true, force: true })
  await tools.get("otsumi_progression_reject").execute({ reason: "second write" }, toolCtx)

  const persisted = JSON.parse(await readFile(stateFile, "utf8"))
  assert.equal(persisted.pendingEvolution.rejections.length, 1)
  assert.equal(persisted.pendingEvolution.rejections[0].reason, "second write")
})
