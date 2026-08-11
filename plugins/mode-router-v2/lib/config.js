import { createHash } from "node:crypto"
import { readFile, stat } from "node:fs/promises"
import { resolve } from "node:path"
import { normalizeConfig } from "./matcher.js"

function parseYaml(text) {
  const parser = globalThis.Bun?.YAML?.parse
  if (typeof parser !== "function") {
    throw new Error(
      "mode-router: Bun.YAML.parse is unavailable. This plugin targets OpenCode2's Bun runtime.",
    )
  }
  return parser(text)
}

function revisionOf(text) {
  return createHash("sha256").update(text).digest("hex").slice(0, 12)
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
    this.current = result.config
    this.revision = result.revision
    this.lastSignature = result.signature
    this.lastError = null
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
        this.current = result.config
        this.revision = result.revision
        this.lastSignature = result.signature
        this.lastError = null
        return { changed: true, ok: true }
      } catch (error) {
        // Last-known-good behavior: never replace a working policy with a broken edit.
        this.lastError = error instanceof Error ? error.message : String(error)
        return { changed: false, ok: false, error: this.lastError }
      }
    })

    return this.refreshChain
  }

  async #readAndValidate(precomputedSignature = null) {
    const [text, info] = await Promise.all([
      readFile(this.path, "utf8"),
      precomputedSignature ? Promise.resolve(null) : stat(this.path),
    ])

    const raw = parseYaml(text)
    const config = normalizeConfig(raw)
    return {
      config,
      revision: revisionOf(text),
      signature:
        precomputedSignature ?? `${info.mtimeMs}:${info.size}`,
    }
  }
}
