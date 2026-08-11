const MODE_NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

function unique(values) {
  return [...new Set(values)]
}

function asStringArray(value, field, modeName) {
  if (value == null) return []
  const list = Array.isArray(value) ? value : [value]
  return list.map((item) => {
    if (typeof item !== "string" || !item.trim()) {
      throw new Error(
        `mode-router config: ${field} for '${modeName}' must contain non-empty strings`,
      )
    }
    return item.trim()
  })
}

export function compileGlob(pattern) {
  if (typeof pattern !== "string" || !pattern.trim()) {
    throw new Error("mode-router config: empty pattern")
  }

  pattern = pattern.trim()
  if (pattern === "*") {
    throw new Error(
      "mode-router config: bare '*' is forbidden; the router must not accidentally own every skill",
    )
  }

  let source = "^"
  for (const char of pattern) {
    if (char === "*") source += ".*"
    else if (char === "?") source += "."
    else source += char.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  }
  source += "$"
  return new RegExp(source)
}

function normalizeMode(entry) {
  if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
    throw new Error("mode-router config: every mode entry must be an object")
  }

  const name = String(entry.name ?? "").trim()
  if (!MODE_NAME.test(name)) {
    throw new Error(
      `mode-router config: invalid mode name '${name}'. Use lowercase kebab-case.`,
    )
  }

  const aliases = asStringArray(entry.aliases, "aliases", name)
  for (const alias of aliases) {
    if (!MODE_NAME.test(alias)) {
      throw new Error(
        `mode-router config: invalid alias '${alias}' for '${name}'`,
      )
    }
  }

  return {
    name,
    description:
      typeof entry.description === "string" ? entry.description.trim() : "",
    aliases,
    extends: asStringArray(entry.extends, "extends", name),
    allow: asStringArray(entry.prefixes_allowed, "prefixes_allowed", name),
    deny: asStringArray(entry.prefixes_denied, "prefixes_denied", name),
  }
}

export function normalizeConfig(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    throw new Error("mode-router config: YAML root must be a mapping")
  }

  const version = Number(raw.version ?? 1)
  if (version !== 1) {
    throw new Error(`mode-router config: unsupported version '${raw.version}'`)
  }

  const entries = raw.mode ?? raw.modes
  if (!Array.isArray(entries) || entries.length === 0) {
    throw new Error(
      "mode-router config: define at least one mode under 'mode:' (or 'modes:')",
    )
  }

  const declared = entries.map(normalizeMode)
  const byName = new Map()

  for (const item of declared) {
    if (byName.has(item.name)) {
      throw new Error(`mode-router config: duplicate mode '${item.name}'`)
    }
    byName.set(item.name, item)
  }

  const aliases = new Map()
  for (const item of declared) {
    for (const alias of item.aliases) {
      if (byName.has(alias) || aliases.has(alias)) {
        throw new Error(
          `mode-router config: alias '${alias}' collides with another mode or alias`,
        )
      }
      aliases.set(alias, item.name)
    }
  }

  const resolving = new Set()
  const resolved = new Map()

  const resolveOne = (name) => {
    if (resolved.has(name)) return resolved.get(name)
    const item = byName.get(name)
    if (!item) {
      throw new Error(`mode-router config: unknown inherited mode '${name}'`)
    }
    if (resolving.has(name)) {
      throw new Error(`mode-router config: inheritance cycle at '${name}'`)
    }

    resolving.add(name)

    let allow = []
    let deny = []
    for (const parentNameRaw of item.extends) {
      const parentName = aliases.get(parentNameRaw) ?? parentNameRaw
      const parent = resolveOne(parentName)
      allow.push(...parent.allow)
      deny.push(...parent.deny)
    }

    allow.push(...item.allow)
    deny.push(...item.deny)

    const effective = {
      ...item,
      allow: unique(allow),
      deny: unique(deny),
    }

    resolving.delete(name)
    resolved.set(name, effective)
    return effective
  }

  for (const name of byName.keys()) resolveOne(name)

  const defaultModeRaw = String(raw.default_mode ?? declared[0].name).trim()
  const defaultMode = aliases.get(defaultModeRaw) ?? defaultModeRaw
  if (!resolved.has(defaultMode)) {
    throw new Error(
      `mode-router config: default_mode '${defaultModeRaw}' does not exist`,
    )
  }

  const explicitManaged = asStringArray(
    raw.managed_prefixes,
    "managed_prefixes",
    "<root>",
  )

  const allPatterns = unique([
    ...explicitManaged,
    ...[...resolved.values()].flatMap((m) => [...m.allow, ...m.deny]),
  ])

  if (allPatterns.length === 0) {
    throw new Error(
      "mode-router config: no managed patterns exist; add prefixes_allowed/prefixes_denied",
    )
  }

  const managed = allPatterns.map((pattern) => ({
    pattern,
    regex: compileGlob(pattern),
  }))

  const modes = new Map()
  for (const [name, item] of resolved.entries()) {
    modes.set(name, {
      ...item,
      allowMatchers: item.allow.map((pattern) => ({
        pattern,
        regex: compileGlob(pattern),
      })),
      denyMatchers: item.deny.map((pattern) => ({
        pattern,
        regex: compileGlob(pattern),
      })),
    })
  }

  return {
    version,
    defaultMode,
    modes,
    aliases,
    managed,
    managedPatterns: allPatterns,
  }
}

export function resolveModeName(input, config) {
  const name = String(input ?? "").trim()
  if (!name) return null
  if (config.modes.has(name)) return name
  return config.aliases.get(name) ?? null
}

export function isManagedSkill(skillID, config) {
  if (typeof skillID !== "string") return false
  return config.managed.some(({ regex }) => regex.test(skillID))
}

export function modeDecision(skillID, modeName, config) {
  if (!isManagedSkill(skillID, config)) {
    return { managed: false, allowed: true, reason: "passthrough" }
  }

  const mode = config.modes.get(modeName)
  if (!mode) {
    return { managed: true, allowed: false, reason: "invalid-mode" }
  }

  const denied = mode.denyMatchers.find(({ regex }) => regex.test(skillID))
  if (denied) {
    return {
      managed: true,
      allowed: false,
      reason: "explicit-deny",
      pattern: denied.pattern,
    }
  }

  const allowed = mode.allowMatchers.find(({ regex }) => regex.test(skillID))
  if (allowed) {
    return {
      managed: true,
      allowed: true,
      reason: "allow",
      pattern: allowed.pattern,
    }
  }

  return { managed: true, allowed: false, reason: "not-allowed-in-mode" }
}
