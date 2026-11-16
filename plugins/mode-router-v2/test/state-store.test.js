import assert from "node:assert/strict"
import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import test from "node:test"

import { SessionModeStore } from "../lib/state.js"

const pause = (ms = 5) => new Promise((resolve) => setTimeout(resolve, ms))

async function storesOn(t, count = 2) {
  const root = await mkdtemp(join(tmpdir(), "mode-router-state-store-test-"))
  t.after(() => rm(root, { recursive: true, force: true }))
  const file = join(root, "state", "modes-state.json")
  const stores = []
  for (let index = 0; index < count; index += 1) {
    const store = new SessionModeStore(join(root, "modes.yml"))
    store.file = file
    stores.push(store)
  }
  return { root, file, stores }
}

async function readState(file) {
  return JSON.parse(await readFile(file, "utf8"))
}

test("two store instances on one file keep each other's sessions", async (t) => {
  const { file, stores: [a, b] } = await storesOn(t)
  await a.load()
  await b.load()

  await a.set("session-a", "chatbot")
  await b.set("session-b", "gamemaster")

  const payload = await readState(file)
  assert.equal(payload.sessions["session-a"]?.mode, "chatbot")
  assert.equal(payload.sessions["session-b"]?.mode, "gamemaster")
  assert.equal(typeof payload.sessions["session-a"]?.updatedAt, "number")
  assert.equal(typeof payload.sessions["session-b"]?.updatedAt, "number")
})

test("the newest updatedAt wins when two instances write the same session", async (t) => {
  const { file, stores: [a, b] } = await storesOn(t)
  await a.load()
  await b.load()

  await a.set("shared", "chatbot")
  await pause()
  await b.set("shared", "gamemaster")
  await pause()
  // A still holds its older in-memory value; its next flush must not revert B.
  await a.set("unrelated", "dev")

  const payload = await readState(file)
  assert.equal(payload.sessions.shared?.mode, "gamemaster")
  assert.equal(payload.sessions.unrelated?.mode, "dev")

  await pause()
  await a.set("shared", "dev")
  assert.equal((await readState(file)).sessions.shared?.mode, "dev")
})

test("a corrupt state file is preserved as .corrupt-* and replaced by valid JSON", async (t) => {
  const { file, stores: [store] } = await storesOn(t, 1)
  const corrupt = '{"version":1,"sessions":{"lost":'
  await mkdir(join(file, ".."), { recursive: true })
  await writeFile(file, corrupt)

  const errors = []
  const priorError = console.error
  console.error = (...args) => errors.push(args)
  try {
    await store.load()
    await store.set("after-corruption", "chatbot")
  } finally {
    console.error = priorError
  }

  const dir = join(file, "..")
  const backups = (await readdir(dir)).filter((name) =>
    name.startsWith("modes-state.json.corrupt-"),
  )
  assert.equal(backups.length, 1, `no .corrupt-* backup in ${await readdir(dir)}`)
  assert.equal(await readFile(join(dir, backups[0]), "utf8"), corrupt)
  assert.equal((await readState(file)).sessions["after-corruption"]?.mode, "chatbot")
})

test("a failed write rejects for its caller without poisoning later writes", async (t) => {
  const { file, stores: [store] } = await storesOn(t, 1)
  await store.load()

  // Injected failure: the state path is a non-empty directory, so the write
  // cannot replace it.
  await mkdir(join(file, "blocker"), { recursive: true })
  const errors = []
  const priorError = console.error
  console.error = (...args) => errors.push(args)
  try {
    await assert.rejects(() => store.set("first", "chatbot"))
  } finally {
    console.error = priorError
  }

  await rm(file, { recursive: true, force: true })
  await store.set("second", "gamemaster")

  const payload = await readState(file)
  assert.equal(payload.sessions.second?.mode, "gamemaster")
})
