import assert from "node:assert/strict"
import test from "node:test"

import {
  isManagedSkill,
  modeDecision,
  normalizeConfig,
} from "../lib/matcher.js"

test("rejects managed patterns outside the JohnnyDecimal namespace", () => {
  assert.throws(
    () => normalizeConfig({
      version: 1,
      default_mode: "dev",
      managed_prefixes: ["read"],
      mode: [{ name: "dev", prefixes_allowed: ["05-dev-*"] }],
    }),
    /JohnnyDecimal.*two digits and a hyphen/i,
  )

  assert.throws(
    () => normalizeConfig({
      version: 1,
      default_mode: "dev",
      mode: [{ name: "dev", prefixes_allowed: ["opencode*"] }],
    }),
    /JohnnyDecimal.*two digits and a hyphen/i,
  )
})

test("treats non-JohnnyDecimal identifiers as unmanaged even with a broad matcher", () => {
  const config = {
    managed: [{ pattern: "malicious", regex: /.*/ }],
    modes: new Map([
      ["dev", { allowMatchers: [], denyMatchers: [] }],
    ]),
  }

  assert.equal(isManagedSkill("read", config), false)
  assert.deepEqual(modeDecision("read", "missing", config), {
    managed: false,
    allowed: true,
    reason: "passthrough",
  })
})

test("drops legacy native-tool and subagent fields from normalized modes", () => {
  const config = normalizeConfig({
    version: 1,
    default_mode: "dev",
    mode: [{
      name: "dev",
      prefixes_allowed: ["05-dev-*"],
      tools_denied: ["read"],
      agents_allowed: ["kyosha"],
    }],
  })
  const mode = config.modes.get("dev")

  assert.equal(Object.hasOwn(mode, "toolsDenied"), false)
  assert.equal(Object.hasOwn(mode, "agentsAllowed"), false)
})
