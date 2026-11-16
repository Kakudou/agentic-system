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
    if (!sessionID) return null
    const stored = this.sessions.get(sessionID)?.mode
    return stored && config.modes.has(stored) ? stored : null
  }

  async set(sessionID, mode) {
    if (!sessionID) throw new Error("mode-router: missing session ID")

    this.sessions.set(sessionID, {
      mode,
      updatedAt: Date.now(),
    })

    // A failed flush rejects for its own caller only; the chain itself stays
    // healthy so later writes still run.
    const write = this.writeChain.then(() => this.#flush())
    this.writeChain = write.catch(() => {})
    await write
  }

  #prune() {
    // Prevent unbounded state accumulation on long-running installations.
    if (this.sessions.size > 10000) {
      const oldest = [...this.sessions.entries()]
        .sort((a, b) => a[1].updatedAt - b[1].updatedAt)
        .slice(0, this.sessions.size - 8000)

      for (const [id] of oldest) this.sessions.delete(id)
    }
  }

  // Read the current file so entries written by other processes survive this
  // flush. Returns null when there is no file. A corrupt file is moved aside
  // to `<file>.corrupt-<timestamp>` instead of being silently overwritten.
  async #readDiskSessions() {
    let text
    try {
      text = await readFile(this.file, "utf8")
    } catch (error) {
      if (error?.code === "ENOENT") return null
      throw error
    }

    let data
    try {
      data = JSON.parse(text)
      if (!data || typeof data !== "object" || Array.isArray(data)) {
        throw new Error("state root is not an object")
      }
      if (
        data.sessions != null &&
        (typeof data.sessions !== "object" || Array.isArray(data.sessions))
      ) {
        throw new Error("state sessions is not an object")
      }
    } catch (error) {
      const backup = `${this.file}.corrupt-${Date.now()}`
      await rename(this.file, backup)
      console.error(
        `[kakudou.mode-router] corrupt session state moved to ${backup}:`,
        error,
      )
      return null
    }

    const sessions = new Map()
    for (const [id, value] of Object.entries(data.sessions ?? {})) {
      if (typeof value?.mode !== "string") continue
      const updatedAt = Number(value.updatedAt)
      sessions.set(id, {
        mode: value.mode,
        updatedAt: Number.isFinite(updatedAt) ? updatedAt : 0,
      })
    }
    return sessions
  }

  async #flush() {
    await mkdir(dirname(this.file), { recursive: true })

    // Merge per session: the newer updatedAt wins (this process wins ties);
    // sessions this process does not know about are kept.
    const disk = await this.#readDiskSessions()
    if (disk) {
      for (const [id, entry] of disk) {
        const known = this.sessions.get(id)
        if (!known || entry.updatedAt > known.updatedAt) {
          this.sessions.set(id, entry)
        }
      }
    }
    this.#prune()

    const payload = {
      version: 1,
      sessions: Object.fromEntries(this.sessions),
    }

    const tmp = `${this.file}.${process.pid}.${Date.now()}.tmp`
    await writeFile(tmp, JSON.stringify(payload, null, 2) + "\n", "utf8")
    await rename(tmp, this.file)
  }
}
