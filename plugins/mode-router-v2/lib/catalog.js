import { modeDecision } from "./matcher.js"

const AVAILABLE_BLOCK =
  /<available_skills\b([^>]*)>([\s\S]*?)<\/available_skills>/gi
const SKILL_BLOCK = /<skill\b[^>]*>[\s\S]*?<\/skill>/gi

function skillIDFromBlock(block) {
  return (
    /<id>\s*([^<]+?)\s*<\/id>/i.exec(block)?.[1]?.trim() ??
    /<name>\s*([^<]+?)\s*<\/name>/i.exec(block)?.[1]?.trim() ??
    null
  )
}

export function extractAdvertisedSkillIDs(text) {
  if (typeof text !== "string") return []
  const ids = new Set()

  for (const outer of text.matchAll(
    /<available_skills\b[^>]*>([\s\S]*?)<\/available_skills>/gi,
  )) {
    const body = outer[1]

    for (const block of body.matchAll(
      /<skill\b[^>]*>[\s\S]*?<\/skill>/gi,
    )) {
      const id = skillIDFromBlock(block[0])
      if (id) ids.add(id)
    }

    // Compatibility with compact list renderings.
    for (const line of body.split(/\r?\n/)) {
      const m =
        /^\s*[-*]\s+([a-z0-9][a-z0-9-]*)\s*(?::|\s+-\s+)/i.exec(line)
      if (m?.[1]) ids.add(m[1])
    }
  }

  return [...ids]
}

export function filterSkillAdvertisement(text, mode, config) {
  if (typeof text !== "string" || !text.includes("available_skills")) {
    return text
  }

  return text.replace(AVAILABLE_BLOCK, (_whole, attrs, body) => {
    let filtered = body.replace(SKILL_BLOCK, (block) => {
      const id = skillIDFromBlock(block)
      if (!id) return block
      return modeDecision(id, mode, config).allowed ? block : ""
    })

    filtered = filtered
      .split(/\r?\n/)
      .filter((line) => {
        const m =
          /^\s*[-*]\s+([a-z0-9][a-z0-9-]*)\s*(?::|\s+-\s+)/i.exec(line)
        if (!m?.[1]) return true
        return modeDecision(m[1], mode, config).allowed
      })
      .join("\n")

    return `<available_skills${attrs}>${filtered}</available_skills>`
  })
}

export function collectAdvertisedFromContext(event) {
  const chunks = []

  if (Array.isArray(event?.system)) {
    for (const part of event.system) {
      if (typeof part === "object" && part !== null && typeof part.text === "string") {
        chunks.push(part.text)
      }
      if (typeof part === "string") chunks.push(part)
    }
  } else if (typeof event?.system === "string") {
    chunks.push(event.system)
  }

  for (const key of ["skill", "Skill"]) {
    const description = event?.tools?.[key]?.description
    if (typeof description === "string") chunks.push(description)
  }

  return [...new Set(chunks.flatMap(extractAdvertisedSkillIDs))].sort()
}

export function filterContext(event, mode, config) {
  if (Array.isArray(event?.system)) {
    event.system = event.system.map((part) => {
      if (typeof part === "object" && part !== null && typeof part.text === "string") {
        return { ...part, text: filterSkillAdvertisement(part.text, mode, config) }
      }
      if (typeof part === "string") {
        return filterSkillAdvertisement(part, mode, config)
      }
      return part
    })
  } else if (typeof event?.system === "string") {
    event.system = filterSkillAdvertisement(event.system, mode, config)
  }

  for (const key of ["skill", "Skill"]) {
    const tool = event?.tools?.[key]
    if (tool && typeof tool.description === "string") {
      tool.description = filterSkillAdvertisement(
        tool.description,
        mode,
        config,
      )
    }
  }
}

export function disableTools(event) {
  if (!event?.tools || typeof event.tools !== "object") return
  for (const key of Object.keys(event.tools)) delete event.tools[key]
}
