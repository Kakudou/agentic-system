import assert from "node:assert/strict"
import test from "node:test"

import {
  buildModeList,
  buildStatus,
  explicitSkillSlash,
  replaceModeCommandPrompt,
  requestedModeAction,
} from "../lib/runtime.js"
import { normalizeConfig } from "../lib/matcher.js"

test("extracts a mode action from the existing XML command marker", () => {
  const event = {
    messages: [{ role: "user", content: '<opencode-mode-router action="dev-python" />' }],
  }

  assert.equal(requestedModeAction(event, "/mode ignored"), "dev-python")
})

test("extracts a mode action from an admitted raw /mode command", () => {
  assert.equal(requestedModeAction({ messages: [] }, "/mode dev-python"), "dev-python")
})

test("treats a raw /mode command without arguments as status", () => {
  assert.equal(requestedModeAction({ messages: [] }, "/mode"), "")
})

test("does not treat ordinary prose mentioning /mode as a command", () => {
  assert.equal(
    requestedModeAction({ messages: [] }, "Please explain how /mode dev-python works."),
    null,
  )
})

test("ignores historical mode markers and stale admitted commands behind a newer user message", () => {
  const event = {
    messages: [
      { role: "user", content: '<opencode-mode-router action="dev-python" />' },
      { role: "assistant", content: "Mode switched to: dev-python" },
      { role: "user", content: "continue with the ordinary request" },
    ],
  }

  assert.equal(requestedModeAction(event, "/mode dev-python"), null)
})

test("uses a current raw mode command without rewriting an older marker", () => {
  const historicalMarker = '<opencode-mode-router action="dev-python" />'
  const event = {
    messages: [
      { role: "user", content: historicalMarker },
      { role: "assistant", content: "Mode switched to: dev-python" },
      { role: "user", content: "/mode status" },
    ],
  }

  assert.equal(requestedModeAction(event, "/mode status"), "status")
  assert.equal(replaceModeCommandPrompt(event, "CURRENT STATUS"), true)
  assert.equal(event.messages[0].content, historicalMarker)
  assert.match(event.messages[2].content, /CURRENT STATUS/)
})

test("recognizes only JohnnyDecimal explicit skill slashes", () => {
  assert.equal(explicitSkillSlash("/05-dev-code-review inspect"), "05-dev-code-review")
  assert.equal(explicitSkillSlash("/opencode inspect"), null)
  assert.equal(explicitSkillSlash("/mode status"), null)
  assert.equal(explicitSkillSlash("/read path"), null)
})

test("status and mode list state that native tools and harness subagents are untouched", () => {
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
  const status = buildStatus({
    mode: "dev",
    agent: "osho",
    advertised: ["05-dev-code-review", "opencode"],
    config,
    configPath: "/tmp/modes.yml",
    revision: "abc123",
    configError: null,
  })
  const list = buildModeList(config)

  assert.match(status, /Native tools .*untouched/i)
  assert.match(status, /Harness subagents .*untouched/i)
  assert.doesNotMatch(status, /TOOLS DENIED|mode tool surface|mode subagent guard/)
  assert.doesNotMatch(list, /tools denied|subagents:/i)
  assert.match(list, /Native tools and harness subagents are untouched/i)
})
