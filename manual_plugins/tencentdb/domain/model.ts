export type MemoryScope = {
  instanceId: string
  teamId: string
  agentId: string
  userId: string
  taskId?: string
}

export type CompletedTurn = {
  sessionID: string
  generation: number
  openCodeAgent: string
  userText: string
  assistantText: string
  assistantMessageIDs: string[]
}

export type TurnState = {
  sessionID: string
  generation: number
  openCodeAgent: string
  userText: string
  assistantText: string
  sawTextDelta: boolean
  assistantMessageIDs: Set<string>
  startedAt: number
}

export type QueryIntent =
  | "personal-memory"
  | "wiki"
  | "code"
  | "mixed"

export type ContextMode =
  | "auto"
  | "memory"
  | "wiki"
  | "code"
  | "all"

export type AgentKnowledgeAssets = {
  wikiIds: string[]
  codeGraphIds: string[]
}

export type RetrievalBudgetSnapshot = {
  used: number
  limit: number
  remaining: number
  exhausted: boolean
  calls: string[]
}

export type ApiEnvelope<T = unknown> = {
  code: number
  message: string
  request_id?: string
  data: T
}

export type WikiAsset = {
  wiki_id: string
  team_id?: string
  name?: string
  summary?: string | null
  status?: string
}

export type CodeGraphAsset = {
  code_graph_id: string
  team_id?: string
  repo_name?: string
  repo_url?: string
  branch?: string
  status?: string
  summary?: string | null
}
