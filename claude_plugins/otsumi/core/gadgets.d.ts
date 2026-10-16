// Types for the host-free gadget core (gadgets.js), for TypeScript hosts.

export interface Gadget {
  name: string
  skill: string
  probability: number
}

export interface GadgetConfig {
  version: number
  primaryAgent: string
  gadgets: Gadget[]
  gadgetByName: Map<string, Gadget>
}

export interface TurnState {
  turnKey: string
  mode: string
  selected: string[]
  invoked: Set<string>
  updatedAt: number
}

export interface GadgetStore {
  path: string
  current: GadgetConfig
  revision: string | null
  lastError: string | null
  refresh(options?: { force?: boolean }): Promise<{ changed: boolean; ok: boolean; error?: string }>
  setProbability(name: string, probability: number): Promise<{ changed: boolean; ok: boolean; error?: string }>
}

export const RNG_RANGE: number
export const GADGET_SKILL_PREFIX: string
export const MAX_TRACKED_TURNS: number
export const RNG_TOOL: {
  name: string
  description: string
  inputSchema: Record<string, unknown>
}

export function cryptoRandomBelow(bound: number): number
export function weightedSelection(options: unknown, weights?: unknown, draw?: () => number): string
export function isGadgetSkill(skill: unknown): skill is string
export function isControlTurn(text: string): boolean
export function gateSelected(probability: number, randomBelow: (bound: number) => number): boolean
export function selectGadgets(
  config: GadgetConfig,
  policy: {
    randomBelow: (bound: number) => number
    skillAllowed: (skill: string) => Promise<boolean>
  },
): Promise<string[]>
export function newTurnState(turnKey: string, mode: string, selected: string[]): TurnState
export function rememberTurn(turns: Map<string, TurnState>, sessionID: string, state: TurnState): void
export function claimGadgetInvocation(
  state: TurnState | undefined,
  skill: string,
): { ok: true } | { ok: false; reason: string }
export function directive(mode: string, state: TurnState): string
export function buildStatus(store: GadgetStore): string
export function invalidProbability(value: unknown): string | null
export function executeGadgetCommand(action: string, store: GadgetStore): Promise<string>
