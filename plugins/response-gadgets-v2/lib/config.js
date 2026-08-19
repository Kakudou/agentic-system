import { createHash, randomUUID } from "node:crypto"
import { readFile, rename, stat, unlink, writeFile } from "node:fs/promises"
import { basename, dirname, extname, resolve } from "node:path"

const NAME_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const mutationChains = new Map()

function parseYaml(text) {
  const parser = globalThis.Bun?.YAML?.parse
  if (typeof parser !== "function") {
    throw new Error(
      "response-gadgets: Bun.YAML.parse is unavailable. This plugin targets OpenCode V2's Bun runtime.",
    )
  }
  return parser(text)
}

function revisionOf(text) {
  return createHash("sha256").update(text).digest("hex").slice(0, 12)
}

function nonEmptyString(value, field) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`response-gadgets config: ${field} must be a non-empty string`)
  }
  return value.trim()
}

function normalizeModes(raw) {
  if (!Array.isArray(raw) || raw.length === 0) {
    throw new Error("response-gadgets config: modes must be a non-empty list")
  }

  const modes = raw.map((value, index) =>
    nonEmptyString(value, `modes[${index}]`)
  )
  if (new Set(modes).size !== modes.length) {
    throw new Error("response-gadgets config: modes must not contain duplicates")
  }
  return modes
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
  if (typeof raw.require_mode_router !== "boolean") {
    throw new Error("response-gadgets config: require_mode_router must be true or false")
  }

  const modeList = normalizeModes(raw.modes)
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
    requireModeRouter: raw.require_mode_router,
    modeList,
    modes: new Set(modeList),
    gadgets,
    gadgetByName: new Map(gadgets.map((gadget) => [gadget.name, gadget])),
  }
}

function plainConfig(config) {
  return {
    version: config.version,
    primary_agent: config.primaryAgent,
    require_mode_router: config.requireModeRouter,
    modes: [...config.modeList],
    gadgets: config.gadgets.map((gadget) => ({ ...gadget })),
  }
}

function fallbackYaml(config) {
  const quote = (value) => JSON.stringify(value)
  return [
    `version: ${config.version}`,
    `primary_agent: ${quote(config.primary_agent)}`,
    `require_mode_router: ${config.require_mode_router}`,
    "modes:",
    ...config.modes.map((mode) => `  - ${quote(mode)}`),
    "gadgets:",
    ...config.gadgets.flatMap((gadget) => [
      `  - name: ${quote(gadget.name)}`,
      `    skill: ${quote(gadget.skill)}`,
      `    probability: ${gadget.probability}`,
    ]),
    "",
  ].join("\n")
}

function serializeConfig(config, path) {
  const plain = plainConfig(config)
  if (extname(path).toLowerCase() === ".json") {
    return JSON.stringify(plain, null, 2) + "\n"
  }

  const stringify = globalThis.Bun?.YAML?.stringify
  if (typeof stringify === "function") {
    const text = stringify(plain)
    return text.endsWith("\n") ? text : `${text}\n`
  }
  return fallbackYaml(plain)
}

async function atomicWrite(path, text) {
  const temporary = resolve(
    dirname(path),
    `.${basename(path)}.${process.pid}.${randomUUID()}.tmp`,
  )
  try {
    await writeFile(temporary, text, { flag: "wx" })
    await rename(temporary, path)
  } catch (error) {
    await unlink(temporary).catch(() => {})
    throw error
  }
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

export class ConfigManager {
  constructor(path) {
    this.path = resolve(process.cwd(), path)
    this.current = null
    this.revision = null
    this.lastSignature = null
    this.lastError = null
    this.refreshChain = Promise.resolve()
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
        const info = await stat(this.path)
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
          await atomicWrite(this.path, text)
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
      readFile(this.path, "utf8"),
      precomputedSignature ? Promise.resolve(null) : stat(this.path),
    ])
    const config = normalizeConfig(parseYaml(text))
    return {
      config,
      revision: revisionOf(text),
      signature: precomputedSignature ?? `${info.mtimeMs}:${info.size}`,
    }
  }
}
