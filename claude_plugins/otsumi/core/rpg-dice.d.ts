export interface RpgDiceInput {
  count: number
  sides: number
  purpose: string
}
export interface RpgDiceReceipt {
  receipt: string
  notation: string
  purpose: string
  faces: number[]
  total: number
  ones: number
  provider: string
  hits_5_6?: number
  natural?: number
}
export const RPG_DICE: {
  readonly name: string
  readonly description: string
  readonly inputSchema: Record<string, unknown>
}
export function rollDice(input: RpgDiceInput, randomBelow: (n: number) => number): RpgDiceReceipt
