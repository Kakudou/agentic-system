// Host-free gadget probability configuration: validation, a last-known-good
// refresh, and serialized probability writes. File access is injected:
//
//   fs.read(path)        -> Promise<string>
//   fs.stat(path)        -> Promise<{ mtimeMs, size }>
//   fs.write(path, text) -> Promise<void> (atomic where the host can manage it)
//
// `yaml` is an optional getter for a host YAML parser ({ parse }), read at
// call time. Without one, the small block-YAML subset this file writes is
// parsed here. Writes always use that block form, whatever the host.

const NAME_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const mutationChains = new Map()

function isJsonPath(path) {
  return /\.json$/i.test(path)
}

async function revisionOf(text) {
  const digest = await globalThis.crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(text),
  )
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 12)
}

function stripComment(line) {
  let quote = null
  for (let index = 0; index < line.length; index++) {
    const char = line[index]
    if (quote) {
      if (char === "\\" && quote === '"') index++
      else if (char === quote) quote = null
    } else if (char === '"' || char === "'") {
      quote = char
    } else if (char === "#" && (index === 0 || /\s/.test(line[index - 1]))) {
      return line.slice(0, index)
    }
  }
  return line
}

function parseScalar(raw) {
  const value = raw.trim()
  if (value === "" || value === "~" || value === "null") return null
  if (value === "true") return true
  if (value === "false") return false
  if (value === "[]") return []
  if (value === "{}") return {}
  if (value.startsWith('"')) return JSON.parse(value)
  if (value.startsWith("'")) {
    if (!value.endsWith("'") || value.length < 2) {
      throw new Error(`unterminated quoted scalar: ${value}`)
    }
    return value.slice(1, -1).replace(/''/g, "'")
  }
  if (/^[[{]/.test(value)) {
    throw new Error(`flow collections are not supported: ${value}`)
  }
  if (/^[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?$/.test(value)) return Number(value)
  return value
}

function splitPair(text, lineNumber) {
  const match = /^([A-Za-z_][A-Za-z0-9_-]*)\s*:(?:\s+(.*))?$/.exec(text)
  if (!match) throw new Error(`line ${lineNumber}: expected 'key: value', got '${text}'`)
  return [match[1], match[2] ?? ""]
}

// The block-YAML subset of the gadget configuration: top-level scalar keys
// and top-level lists of flat mappings. Anything else is rejected, so a file
// outside the subset falls back to the last-known-good configuration.
export function parseSimpleYaml(text) {
  const root = {}
  let listKey = null
  let item = null
  let itemIndent = -1

  const lines = text.split(/\r?\n/)
  for (let index = 0; index < lines.length; index++) {
    const lineNumber = index + 1
    const line = stripComment(lines[index]).replace(/\s+$/, "")
    if (!line.trim() || line.trim() === "---") continue
    if (line.includes("\t")) throw new Error(`line ${lineNumber}: tabs are not allowed`)

    const indent = line.length - line.trimStart().length
    const body = line.trim()

    if (body.startsWith("- ") || body === "-") {
      if (!listKey) throw new Error(`line ${lineNumber}: list item outside a list`)
      item = {}
      itemIndent = indent
      root[listKey].push(item)
      const rest = body.slice(1).trim()
      if (rest) {
        const [key, value] = splitPair(rest, lineNumber)
        item[key] = parseScalar(value)
      }
      continue
    }

    if (indent === 0) {
      const [key, value] = splitPair(body, lineNumber)
      item = null
      if (value === "") {
        listKey = key
        root[key] = []
      } else {
        listKey = null
        root[key] = parseScalar(value)
      }
      continue
    }

    if (item && indent > itemIndent) {
      const [key, value] = splitPair(body, lineNumber)
      item[key] = parseScalar(value)
      continue
    }

    throw new Error(`line ${lineNumber}: unexpected indentation`)
  }

  return root
}

function nonEmptyString(value, field) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`response-gadgets config: ${field} must be a non-empty string`)
  }
  return value.trim()
}

function normalizeGadget(raw, index) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    throw new Error(`response-gadgets config: gadgets[${index}] must be a mapping`)
  }

  const name = nonEmptyString(raw.name, `gadgets[${index}].name`)
  if (!NAME_RE.test(name)) {
    throw new Error(
      `response-gadgets config: gadget name '${name}' must use lowercase kebab-case`,
    )
  }

  const skill = nonEmptyString(raw.skill, `gadgets[${index}].skill`)
  if (
    typeof raw.probability !== "number" ||
    !Number.isFinite(raw.probability) ||
    raw.probability < 0 ||
    raw.probability > 1
  ) {
    throw new Error(
      `response-gadgets config: probability for '${name}' must be a number from 0 through 1`,
    )
  }

  return { name, skill, probability: raw.probability }
}

export function normalizeConfig(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    throw new Error("response-gadgets config: YAML root must be a mapping")
  }

  const version = Number(raw.version)
  if (version !== 1) {
    throw new Error(`response-gadgets config: unsupported version '${raw.version}'`)
  }

  const primaryAgent = nonEmptyString(raw.primary_agent, "primary_agent")
  if (!Array.isArray(raw.gadgets) || raw.gadgets.length === 0) {
    throw new Error("response-gadgets config: gadgets must be a non-empty list")
  }
  const gadgets = raw.gadgets.map(normalizeGadget)
  const names = gadgets.map(({ name }) => name)
  const skills = gadgets.map(({ skill }) => skill)
  if (new Set(names).size !== names.length) {
    throw new Error("response-gadgets config: gadget names must be unique")
  }
  if (new Set(skills).size !== skills.length) {
    throw new Error("response-gadgets config: gadget skills must be unique")
  }

  return {
    version,
    primaryAgent,
    gadgets,
    gadgetByName: new Map(gadgets.map((gadget) => [gadget.name, gadget])),
  }
}

function plainConfig(config) {
  return {
    version: config.version,
    primary_agent: config.primaryAgent,
    gadgets: config.gadgets.map((gadget) => ({ ...gadget })),
  }
}

function blockYaml(config) {
  const quote = (value) => JSON.stringify(value)
  return [
    `version: ${config.version}`,
    `primary_agent: ${quote(config.primary_agent)}`,
    "gadgets:",
    ...config.gadgets.flatMap((gadget) => [
      `  - name: ${quote(gadget.name)}`,
      `    skill: ${quote(gadget.skill)}`,
      `    probability: ${gadget.probability}`,
    ]),
    "",
  ].join("\n")
}

function parseConfigText(text, path, yaml) {
  const parse = yaml?.parse
  if (typeof parse === "function") return parse(text)
  return isJsonPath(path) ? JSON.parse(text) : parseSimpleYaml(text)
}

// One on-disk form for every harness: block YAML that any YAML reader and
// the subset parser above both read. A host stringify is deliberately not
// used (Bun.YAML.stringify writes single-line flow style, which a host
// without a full YAML parser could not read back).
function serializeConfig(config, path) {
  const plain = plainConfig(config)
  if (isJsonPath(path)) {
    return JSON.stringify(plain, null, 2) + "\n"
  }
  return blockYaml(plain)
}

async function withMutationLock(path, operation) {
  const previous = mutationChains.get(path) ?? Promise.resolve()
  const current = previous.catch(() => {}).then(operation)
  mutationChains.set(path, current)
  try {
    return await current
  } finally {
    if (mutationChains.get(path) === current) mutationChains.delete(path)
  }
}

export class ConfigStore {
  constructor(path, { fs, yaml } = {}) {
    this.path = path
    this.fs = fs
    this.yaml = typeof yaml === "function" ? yaml : () => yaml
    this.current = null
    this.revision = null
    this.lastSignature = null
    this.lastError = null
    this.refreshChain = Promise.resolve()
  }

  // Hosts whose file access is bound to one dispatch rebind it per call.
  useFs(fs) {
    this.fs = fs
  }

  async initialize() {
    const result = await this.#readAndValidate()
    this.#adopt(result)
    return this.current
  }

  async refresh({ force = false } = {}) {
    this.refreshChain = this.refreshChain.then(async () => {
      let signature
      try {
        const info = await this.fs.stat(this.path)
        signature = `${info.mtimeMs}:${info.size}`
      } catch (error) {
        this.lastError = `cannot stat ${this.path}: ${error.message}`
        return { changed: false, ok: false, error: this.lastError }
      }

      if (!force && signature === this.lastSignature) {
        return { changed: false, ok: true }
      }

      try {
        const result = await this.#readAndValidate(signature)
        this.#adopt(result)
        return { changed: true, ok: true }
      } catch (error) {
        this.lastError = error instanceof Error ? error.message : String(error)
        return { changed: false, ok: false, error: this.lastError }
      }
    })
    return this.refreshChain
  }

  async setProbability(name, probability) {
    this.refreshChain = this.refreshChain.then(() =>
      withMutationLock(this.path, async () => {
        try {
          // Re-read under the path-wide lock so concurrent plugin setups never
          // overwrite a newer interactive value with stale in-memory state.
          const latest = await this.#readAndValidate()
          const gadget = latest.config.gadgetByName.get(name)
          if (!gadget) {
            throw new Error(`unknown gadget '${name}' in the current configuration`)
          }

          const updated = normalizeConfig(plainConfig(latest.config))
          updated.gadgetByName.get(name).probability = probability
          const text = serializeConfig(updated, this.path)
          await this.fs.write(this.path, text)
          const result = await this.#readAndValidate()
          this.#adopt(result)
          return { changed: true, ok: true }
        } catch (error) {
          this.lastError = error instanceof Error ? error.message : String(error)
          return { changed: false, ok: false, error: this.lastError }
        }
      })
    )
    return this.refreshChain
  }

  #adopt(result) {
    this.current = result.config
    this.revision = result.revision
    this.lastSignature = result.signature
    this.lastError = null
  }

  async #readAndValidate(precomputedSignature = null) {
    const [text, info] = await Promise.all([
      this.fs.read(this.path),
      precomputedSignature ? Promise.resolve(null) : this.fs.stat(this.path),
    ])
    const config = normalizeConfig(parseConfigText(text, this.path, this.yaml()))
    return {
      config,
      revision: await revisionOf(text),
      signature: precomputedSignature ?? `${info.mtimeMs}:${info.size}`,
    }
  }
}
