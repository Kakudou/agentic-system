import {
  appendFileSync,
  writeFileSync,
} from "node:fs"

import type {
  TracePort,
} from "../../domain/ports.ts"

export class FileTrace
  implements TracePort {
  readonly path: string

  constructor(
    path: string,
  ) {
    this.path = path
  }

  reset() {
    try {
      writeFileSync(
        this.path,
        "",
      )
    } catch {
      // Diagnostics are never allowed to break OpenCode.
    }
  }

  write(
    label: string,
    data?: unknown,
  ) {
    try {
      appendFileSync(
        this.path,
        [
          new Date()
            .toISOString(),
          label,
          data === undefined
            ? ""
            : JSON.stringify(data),
          "\n",
        ].join(" "),
      )
    } catch {
      // Same rule: observability is fail-open.
    }
  }
}
