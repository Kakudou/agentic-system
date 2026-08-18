import assert from "node:assert/strict"
import test from "node:test"

import { RequestIdentityTracker } from "../lib/identity.js"

function inboxEvent(type, { sessionID, inboxID, itemType = "user", text, agent }) {
  return {
    type,
    data: {
      sessionID,
      inboxID,
      item: {
        type: itemType,
        payload: { text, agent },
      },
    },
  }
}

for (const type of ["session.inbox.enqueued", "session.inbox.delivered"]) {
  test(`captures user identity from ${type}`, () => {
    const tracker = new RequestIdentityTracker()
    tracker.observe(inboxEvent(type, {
      sessionID: "session-current",
      inboxID: `inbox-${type}`,
      text: "current user text",
      agent: "osho",
    }))

    const identity = tracker.resolve({
      messages: [{ role: "user", content: "current user text" }],
    })

    assert.equal(identity.sessionID, "session-current")
    assert.equal(identity.agent, "osho")
    assert.equal(identity.inputText, "current user text")
    assert.equal(typeof identity.inputAt, "number")
    assert.equal(identity.source, "event-correlation")
  })
}

test("preserves raw slash input from the inbox when the context contains expanded text", () => {
  const tracker = new RequestIdentityTracker()
  tracker.observe(inboxEvent("session.inbox.enqueued", {
    sessionID: "session-slash",
    inboxID: "inbox-slash",
    text: "/05-dev-code-review inspect this",
    agent: "osho",
  }))

  const identity = tracker.resolve({
    messages: [{ role: "user", content: "<expanded-skill>inspect this</expanded-skill>" }],
  })

  assert.equal(identity.sessionID, "session-slash")
  assert.equal(identity.agent, "osho")
  assert.equal(identity.inputText, "/05-dev-code-review inspect this")
  assert.equal(identity.source, "event-slash-correlation")
})

test("ignores non-user inbox items even when their payload looks like user input", () => {
  const tracker = new RequestIdentityTracker()
  tracker.observe(inboxEvent("session.inbox.enqueued", {
    sessionID: "session-system",
    inboxID: "inbox-system",
    itemType: "system",
    text: "/mode dev-python",
    agent: "osho",
  }))

  assert.equal(tracker.agentFor("session-system"), null)
  assert.deepEqual(
    tracker.resolve({ messages: [{ role: "user", content: "/mode dev-python" }] }),
    {
      sessionID: null,
      agent: null,
      inputText: "/mode dev-python",
      inputAt: null,
      source: "unresolved",
    },
  )
})
