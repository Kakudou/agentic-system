// Ōtsumi runtime for Claude Code. Each feature is a Claude Code adapter over
// a host-free core it shares with the OpenCode V2 plugins in plugins/.
import type { Register } from 'claude-code'

import { registerGadgets } from './gadgets'

export const register: Register = on => {
  registerGadgets(on)
}
