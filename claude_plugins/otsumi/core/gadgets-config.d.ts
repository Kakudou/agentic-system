// Types for the host-free gadget configuration (gadgets-config.js).

import type { GadgetConfig, GadgetStore } from "./gadgets.js"

export interface GadgetFs {
  read(path: string): Promise<string>
  stat(path: string): Promise<{ mtimeMs: number; size: number }>
  write(path: string, text: string): Promise<void>
}

export interface HostYaml {
  parse?: (text: string) => unknown
}

export function parseSimpleYaml(text: string): Record<string, unknown>
export function normalizeConfig(raw: unknown): GadgetConfig

export class ConfigStore implements GadgetStore {
  constructor(
    path: string,
    options?: { fs?: GadgetFs; yaml?: HostYaml | (() => HostYaml | undefined) },
  )
  path: string
  current: GadgetConfig
  revision: string | null
  lastError: string | null
  useFs(fs: GadgetFs): void
  initialize(): Promise<GadgetConfig>
  refresh(options?: { force?: boolean }): Promise<{ changed: boolean; ok: boolean; error?: string }>
  setProbability(name: string, probability: number): Promise<{ changed: boolean; ok: boolean; error?: string }>
}
