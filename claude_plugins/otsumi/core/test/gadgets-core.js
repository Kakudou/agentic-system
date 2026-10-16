// Host-free core tests, run under Node: node --test claude_plugins/otsumi/core/test/
import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { readFile } from "node:fs/promises"
import test from "node:test"

import {
  RNG_RANGE,
  claimGadgetInvocation,
  cryptoRandomBelow,
  directive,
  executeGadgetCommand,
  gateSelected,
  newTurnState,
  selectGadgets,
} from "../gadgets.js"
import { ConfigStore, normalizeConfig, parseSimpleYaml } from "../gadgets-config.js"

const CHECKED_IN = new URL(
  "../../../../plugins/response-gadgets-v2/config.yml",
  import.meta.url,
)

function memoryFs(files) {
  let clock = 1
  const mtimes = new Map([...files.keys()].map((path) => [path, clock++]))
  return {
    files,
    read: async (path) => {
      if (!files.has(path)) throw new Error(`ENOENT ${path}`)
      return files.get(path)
    },
    stat: async (path) => {
      if (!files.has(path)) throw new Error(`ENOENT ${path}`)
      return { mtimeMs: mtimes.get(path), size: files.get(path).length }
    },
    write: async (path, text) => {
      files.set(path, text)
      mtimes.set(path, clock++)
    },
  }
}

test("the YAML subset parses the checked-in gadget configuration", async () => {
  const config = normalizeConfig(parseSimpleYaml(await readFile(CHECKED_IN, "utf8")))
  assert.equal(config.primaryAgent, "osho")
  assert.deepEqual(
    config.gadgets.map(({ name, skill }) => [name, skill]),
    [
      ["random-srs", "97-gadget-random-srs"],
      ["random-news", "97-gadget-random-news"],
      ["random-fun-facts", "97-gadget-random-fun-facts"],
    ],
  )
  for (const gadget of config.gadgets) {
    assert.ok(gadget.probability >= 0 && gadget.probability <= 1)
  }
})

test("the YAML subset rejects shapes it does not understand", () => {
  assert.throws(() => parseSimpleYaml("gadgets: [a, b]\n"), /flow collections/)
  assert.throws(() => parseSimpleYaml("  stray: 1\n"), /unexpected indentation/)
  assert.throws(() => parseSimpleYaml("- orphan: 1\n"), /outside a list/)
})

test("a probability write without a host YAML round-trips through the subset", async () => {
  const path = "/virtual/config.yml"
  const fs = memoryFs(new Map([[path, await readFile(CHECKED_IN, "utf8")]]))
  const store = new ConfigStore(path, { fs })
  await store.initialize()
  const before = store.revision

  const result = await store.setProbability("random-news", 0.42)
  assert.deepEqual(result, { changed: true, ok: true })
  assert.equal(store.current.gadgetByName.get("random-news").probability, 0.42)
  assert.notEqual(store.revision, before)

  const reread = normalizeConfig(parseSimpleYaml(fs.files.get(path)))
  assert.equal(reread.gadgetByName.get("random-news").probability, 0.42)
  assert.equal(reread.gadgetByName.get("random-srs").probability, store.current.gadgetByName.get("random-srs").probability)
})

test("a write is block YAML even when the host YAML has a flow-style stringify", async () => {
  const path = "/virtual/config.yml"
  const fs = memoryFs(new Map([[path, await readFile(CHECKED_IN, "utf8")]]))
  // Bun.YAML.stringify writes `{version: 1,gadgets: [{...}]}` on one line.
  const yaml = {
    parse: (text) => parseSimpleYaml(text),
    stringify: () => "{version: 1}",
  }
  const store = new ConfigStore(path, { fs, yaml })
  await store.initialize()
  assert.deepEqual(await store.setProbability("random-srs", 0.3), { changed: true, ok: true })
  const written = fs.files.get(path)
  assert.doesNotMatch(written, /^\{/)
  assert.equal(
    normalizeConfig(parseSimpleYaml(written)).gadgetByName.get("random-srs").probability,
    0.3,
  )
})

test("the revision is the same sha256 prefix Node computes", async () => {
  const path = "/virtual/config.yml"
  const text = await readFile(CHECKED_IN, "utf8")
  const store = new ConfigStore(path, { fs: memoryFs(new Map([[path, text]])) })
  await store.initialize()
  assert.equal(
    store.revision,
    createHash("sha256").update(text).digest("hex").slice(0, 12),
  )
})

test("an invalid edit keeps the last-known-good configuration", async () => {
  const path = "/virtual/config.yml"
  const fs = memoryFs(new Map([[path, await readFile(CHECKED_IN, "utf8")]]))
  const store = new ConfigStore(path, { fs })
  await store.initialize()
  const good = store.current

  await fs.write(path, "version: 2\nprimary_agent: osho\ngadgets:\n  - name: x\n")
  const result = await store.refresh()
  assert.equal(result.ok, false)
  assert.equal(store.current, good)
  assert.match(await executeGadgetCommand("status", store), /DEGRADED/)
})

test("gates are independent and policy runs only for gates that passed", async () => {
  const config = normalizeConfig({
    version: 1,
    primary_agent: "osho",
    gadgets: [
      { name: "always", skill: "97-gadget-always", probability: 1 },
      { name: "never", skill: "97-gadget-never", probability: 0 },
      { name: "denied", skill: "97-gadget-denied", probability: 1 },
    ],
  })
  const asked = []
  const chosen = await selectGadgets(config, {
    randomBelow: () => {
      throw new Error("probability 0 and 1 must not draw")
    },
    skillAllowed: async (skill) => {
      asked.push(skill)
      return skill !== "97-gadget-denied"
    },
  })
  assert.deepEqual(chosen, ["97-gadget-always"])
  assert.deepEqual(asked, ["97-gadget-always", "97-gadget-denied"])

  assert.equal(gateSelected(0.5, () => 499_999), true)
  assert.equal(gateSelected(0.5, () => 500_000), false)
})

test("a selected gadget is claimed at most once per turn", () => {
  const state = newTurnState("turn-1", "dev", ["97-gadget-random-srs"])
  assert.deepEqual(claimGadgetInvocation(state, "97-gadget-random-srs"), { ok: true })
  const second = claimGadgetInvocation(state, "97-gadget-random-srs")
  assert.equal(second.ok, false)
  assert.match(second.reason, /blocked duplicate invocation/)
  // Unselected and manual invocations are untouched.
  assert.deepEqual(claimGadgetInvocation(state, "97-gadget-random-news"), { ok: true })
  assert.deepEqual(claimGadgetInvocation(undefined, "97-gadget-random-news"), { ok: true })
  assert.match(directive("dev", state), /Already invoked this turn/)
})

test("crypto randomness stays inside its bound", () => {
  for (let index = 0; index < 1000; index++) {
    const value = cryptoRandomBelow(RNG_RANGE)
    assert.ok(Number.isInteger(value) && value >= 0 && value < RNG_RANGE)
  }
  assert.throws(() => cryptoRandomBelow(0))
})
