import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

import * as matcher from "../lib/matcher.js"

const MANAGED_PLUGIN_IDS = [
  "kakudou.response-gadgets",
  "kakudou.otsumi-progression",
  "kakudou.tencentdb-memory",
]

function versionTwoConfig() {
  return {
    version: 2,
    default_mode: "dev",
    managed_plugins: MANAGED_PLUGIN_IDS,
    managed_prefixes: [],
    mode: [
      {
        name: "dev",
        prefixes_allowed: ["05-dev-*"],
        plugins: MANAGED_PLUGIN_IDS,
      },
      {
        name: "dev-python",
        extends: "dev",
        prefixes_allowed: ["06-python-*"],
      },
      {
        name: "chatbot",
        prefixes_allowed: ["09-rp-*"],
      },
      {
        name: "gamemaster",
        prefixes_allowed: ["10-rpg-*"],
      },
    ],
  }
}

function yamlModeBlock(text, name) {
  const marker = `  - name: ${name}`
  const start = text.indexOf(marker)
  assert.notEqual(start, -1, `missing ${name} mode in modes.yml`)
  const remainder = text.slice(start + marker.length)
  const next = remainder.search(/^  - name: /m)
  return next === -1 ? remainder : remainder.slice(0, next)
}

function yamlList(text, key, itemIndent) {
  const heading = new RegExp(`^${" ".repeat(itemIndent - 2)}${key}:\\s*$`, "m")
  const match = heading.exec(text)
  if (!match) return null
  const tail = text.slice(match.index + match[0].length)
  const values = []
  const item = new RegExp(`^${" ".repeat(itemIndent)}-\\s+["']?([^"'\\n]+?)["']?\\s*$`)
  for (const line of tail.split(/\r?\n/).slice(1)) {
    const found = item.exec(line)
    if (found) {
      values.push(found[1].trim())
      continue
    }
    if (line.trim() && line.length - line.trimStart().length < itemIndent) break
  }
  return values
}

test("canonical modes.yml declares the exact version 2 managed plugin policy", async () => {
  const text = await readFile(new URL("../modes.yml", import.meta.url), "utf8")

  assert.match(text, /^version:\s*2\s*$/m)
  assert.deepEqual(yamlList(text, "managed_plugins", 2), MANAGED_PLUGIN_IDS)

  const dev = yamlModeBlock(text, "dev")
  assert.deepEqual(yamlList(dev, "plugins", 6), MANAGED_PLUGIN_IDS)

  const devPython = yamlModeBlock(text, "dev-python")
  assert.match(devPython, /^    extends:\s*dev\s*$/m)
  assert.equal(yamlList(devPython, "plugins", 6), null)

  for (const name of ["chatbot", "gamemaster"]) {
    assert.equal(
      yamlList(yamlModeBlock(text, name), "plugins", 6),
      null,
      `${name} must omit the plugin allowlist and therefore disable managed plugins`,
    )
  }
})

test("version 2 plugin allow rules inherit through extends without changing skill rules", () => {
  assert.equal(typeof matcher.pluginDecision, "function")
  const v2 = matcher.normalizeConfig(versionTwoConfig())
  const v1 = matcher.normalizeConfig({
    ...versionTwoConfig(),
    version: 1,
    managed_plugins: undefined,
    mode: versionTwoConfig().mode.map(({ plugins: _plugins, ...mode }) => mode),
  })

  assert.deepEqual(
    matcher.modeDecision("05-dev-code-review", "dev-python", v2),
    matcher.modeDecision("05-dev-code-review", "dev-python", v1),
  )
  assert.deepEqual(
    matcher.modeDecision("09-rp-chatbot-dialogue", "chatbot", v2),
    matcher.modeDecision("09-rp-chatbot-dialogue", "chatbot", v1),
  )

  for (const pluginID of MANAGED_PLUGIN_IDS) {
    const dev = matcher.pluginDecision(pluginID, "dev", v2)
    const inherited = matcher.pluginDecision(pluginID, "dev-python", v2)
    const chatbot = matcher.pluginDecision(pluginID, "chatbot", v2)
    const gamemaster = matcher.pluginDecision(pluginID, "gamemaster", v2)

    assert.deepEqual(
      { mode: dev.mode, managed: dev.managed, enabled: dev.enabled },
      { mode: "dev", managed: true, enabled: true },
    )
    assert.equal(typeof dev.reason, "string")
    assert.deepEqual(
      { mode: inherited.mode, managed: inherited.managed, enabled: inherited.enabled },
      { mode: "dev-python", managed: true, enabled: true },
    )
    assert.equal(typeof inherited.reason, "string")
    assert.deepEqual(
      { mode: chatbot.mode, managed: chatbot.managed, enabled: chatbot.enabled },
      { mode: "chatbot", managed: true, enabled: false },
    )
    assert.equal(typeof chatbot.reason, "string")
    assert.deepEqual(
      { mode: gamemaster.mode, managed: gamemaster.managed, enabled: gamemaster.enabled },
      { mode: "gamemaster", managed: true, enabled: false },
    )
    assert.equal(typeof gamemaster.reason, "string")
  }
})

test("managed plugins fail closed for unknown mode or unavailable config while unmanaged IDs pass through", () => {
  assert.equal(typeof matcher.pluginDecision, "function")
  const config = matcher.normalizeConfig(versionTwoConfig())

  for (const pluginID of MANAGED_PLUGIN_IDS) {
    for (const mode of [null, "unknown-mode"]) {
      const decision = matcher.pluginDecision(pluginID, mode, config)
      assert.equal(decision.mode, mode)
      assert.equal(decision.managed, true)
      assert.equal(decision.enabled, false)
      assert.equal(typeof decision.reason, "string")
    }

    const noConfig = matcher.pluginDecision(pluginID, "dev", null)
    assert.equal(noConfig.mode, "dev")
    assert.equal(noConfig.managed, true)
    assert.equal(noConfig.enabled, false)
    assert.equal(typeof noConfig.reason, "string")
  }

  const passthrough = matcher.pluginDecision("example.unmanaged-plugin", null, null)
  assert.deepEqual(
    {
      mode: passthrough.mode,
      managed: passthrough.managed,
      enabled: passthrough.enabled,
      reason: passthrough.reason,
    },
    { mode: null, managed: false, enabled: true, reason: "passthrough" },
  )
})

test("version 1 remains skill-compatible but cannot silently enable known managed plugin effects", () => {
  assert.equal(typeof matcher.pluginDecision, "function")
  const config = matcher.normalizeConfig({
    version: 1,
    default_mode: "dev",
    managed_prefixes: ["05-dev-*"],
    mode: [{ name: "dev", prefixes_allowed: ["05-dev-*"] }],
  })

  assert.equal(matcher.modeDecision("05-dev-code-review", "dev", config).allowed, true)
  for (const pluginID of MANAGED_PLUGIN_IDS) {
    const decision = matcher.pluginDecision(pluginID, "dev", config)
    assert.equal(decision.mode, "dev")
    assert.equal(decision.managed, true)
    assert.equal(decision.enabled, false)
    assert.equal(typeof decision.reason, "string")
  }
})
