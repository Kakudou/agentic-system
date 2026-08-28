import type {
  CodeGraphAsset,
  CodeGraphKind,
  MemoryScope,
  WikiAsset,
} from "./model.ts"

export interface TracePort {
  write(label: string, data?: unknown): void
}

export interface MemoryPort {
  health(): Promise<unknown>

  captureTurn(input: {
    scope: MemoryScope
    sessionID: string
    userText: string
    assistantText: string
  }): Promise<unknown>

  queryAtomic(
    scope: MemoryScope,
    input?: {
      limit?: number
      offset?: number
      type?: string
    },
  ): Promise<unknown>

  searchAtomic(
    scope: MemoryScope,
    input: {
      query: string
      limit?: number
      type?: string
    },
  ): Promise<unknown>

  queryConversations(
    scope: MemoryScope,
    input?: {
      sessionID?: string
      limit?: number
      offset?: number
    },
  ): Promise<unknown>

  searchConversations(
    scope: MemoryScope,
    input: {
      query: string
      limit?: number
      sessionID?: string
    },
  ): Promise<unknown>

  listScenarios(
    scope: MemoryScope,
    input?: {
      pathPrefix?: string
    },
  ): Promise<unknown>

  readScenario(
    scope: MemoryScope,
    input: {
      path: string
      version?: string
    },
  ): Promise<unknown>

  writeScenario(
    scope: MemoryScope,
    input: {
      path: string
      content: string
      summary?: string
    },
  ): Promise<unknown>

  readCore(
    scope: MemoryScope,
    input?: {
      version?: string
    },
  ): Promise<unknown>
}

export interface KnowledgePort {
  listWikis(input: {
    teamId: string
    status?: string
    limit?: number
    offset?: number
  }): Promise<{ items?: WikiAsset[]; total?: number } | unknown>

  searchWiki(input: {
    wikiId: string
    query: string
    limit?: number
  }): Promise<unknown>

  readWikiPages(input: {
    wikiId: string
    refs: string[]
  }): Promise<unknown>

  wikiGraph(input: {
    wikiId: string
  }): Promise<unknown>

  listCodeGraphs(input: {
    teamId: string
    status?: string
    limit?: number
    offset?: number
  }): Promise<{ items?: CodeGraphAsset[]; total?: number } | unknown>

  searchCodeGraph(input: {
    codeGraphId: string
    query: string
    kind?: CodeGraphKind
    limit?: number
  }): Promise<unknown>

  exploreCodeGraph(input: {
    codeGraphId: string
    query: string
    maxFiles?: number
  }): Promise<unknown>

  callers(input: {
    codeGraphId: string
    symbol: string
    limit?: number
  }): Promise<unknown>

  callees(input: {
    codeGraphId: string
    symbol: string
    limit?: number
  }): Promise<unknown>

  impact(input: {
    codeGraphId: string
    symbol: string
    depth?: number
  }): Promise<unknown>

  node(input: {
    codeGraphId: string
    symbol: string
    includeCode?: boolean
    file?: string
    line?: number
  }): Promise<unknown>

  files(input: {
    codeGraphId: string
    path?: string
    pattern?: string
    format?: "tree" | "flat"
    includeMetadata?: boolean
    maxDepth?: number
  }): Promise<unknown>
}
