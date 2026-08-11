import { createHash } from "node:crypto"
import { mkdir, readFile, rename, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { homedir } from "node:os"

function statePath(configPath) {
  const key = createHash("sha256")
    .update(`${process.cwd()}\0${configPath}`)
    .digest("hex")
    .slice(0, 20)

  return join(
    homedir(),
    ".cache",
    "opencode",
    "mode-router-v2",
    `${key}.json`,
  )
}

export class SessionModeStore {
  constructor(configPath) {
    this.file = statePath(configPath)
    this.sessions = new Map()
    this.writeChain = Promise.resolve()
  }

  async load() {
    try {
      const data = JSON.parse(await readFile(this.file, "utf8"))
      if (!data || typeof data !== "object" || !data.sessions) return
      for (const [id, value] of Object.entries(data.sessions)) {
        if (typeof value?.mode === "string") {
          this.sessions.set(id, {
            mode: value.mode,
            updatedAt: Number(value.updatedAt) || Date.now(),
          })
        }
      }
    } catch (error) {
      if (error?.code !== "ENOENT") {
        console.error("[kakudou.mode-router] failed reading session state:", error)
      }
    }
  }

  get(sessionID, config) {
    const stored = this.sessions.get(sessionID)?.mode
    if (stored && config.modes.has(stored)) return stored
    return config.defaultMode
  }

  async ensureValid(sessionID, config) {
    const stored = this.sessions.get(sessionID)?.mode
    if (stored && config.modes.has(stored)) return stored

    if (sessionID) {
      await this.set(sessionID, config.defaultMode)
    }
    return config.defaultMode
  }

  async set(sessionID, mode) {
    if (!sessionID) throw new Error("mode-router: missing session ID")

    this.sessions.set(sessionID, {
      mode,
      updatedAt: Date.now(),
    })

    // Prevent unbounded state accumulation on long-running installations.
    if (this.sessions.size > 10000) {
      const oldest = [...this.sessions.entries()]
        .sort((a, b) => a[1].updatedAt - b[1].updatedAt)
        .slice(0, this.sessions.size - 8000)

      for (const [id] of oldest) this.sessions.delete(id)
    }

    this.writeChain = this.writeChain.then(() => this.#flush())
    await this.writeChain
  }

  async #flush() {
    await mkdir(dirname(this.file), { recursive: true })

    const payload = {
      version: 1,
      sessions: Object.fromEntries(this.sessions),
    }

    const tmp = `${this.file}.${process.pid}.${Date.now()}.tmp`
    await writeFile(tmp, JSON.stringify(payload, null, 2) + "\n", "utf8")
    await rename(tmp, this.file)
  }
}
