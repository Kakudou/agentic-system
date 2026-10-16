import { randomUUID } from "node:crypto"
import { readFile, rename, stat, unlink, writeFile } from "node:fs/promises"
import { basename, dirname, resolve } from "node:path"
import {
  ConfigStore,
  normalizeConfig,
} from "../../../claude_plugins/otsumi/core/gadgets-config.js"

// The validation, refresh, and write logic is the host-free core shared with
// the Claude Code mod; this file only supplies Node file access and Bun.YAML.

export { normalizeConfig }

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

const nodeFs = {
  read: (path) => readFile(path, "utf8"),
  stat: async (path) => {
    const info = await stat(path)
    return { mtimeMs: info.mtimeMs, size: info.size }
  },
  write: atomicWrite,
}

export class ConfigManager extends ConfigStore {
  constructor(path) {
    super(resolve(process.cwd(), path), {
      fs: nodeFs,
      // Read at call time: OpenCode V2 runs plugins under Bun, whose YAML
      // implementation is preferred over the core's subset parser.
      yaml: () => globalThis.Bun?.YAML,
    })
  }
}
