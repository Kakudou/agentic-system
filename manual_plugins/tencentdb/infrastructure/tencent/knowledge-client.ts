import type {
  KnowledgePort,
} from "../../domain/ports.ts"

import type {
  AppConfig,
} from "../../config.ts"

import {
  HttpJsonClient,
} from "./http-client.ts"

export class TencentKnowledgeClient
  implements KnowledgePort {
  private readonly http:
    HttpJsonClient

  private config:
    AppConfig

  constructor(
    config:
      AppConfig,
  ) {
    this.config = config

    this.http =
      new HttpJsonClient(
        config.knowledge.url,
        config.timeouts.knowledgeMs,
        config.circuit.failureThreshold,
        config.circuit.openSeconds *
          1000,
        () => {
          const headers:
            Record<string, string> = {
              "x-tdai-service-id":
                config.memory.instanceId,
          }

          if (
            config.knowledge.apiKey
          ) {
            headers.Authorization =
              `Bearer ${config.knowledge.apiKey}`
          }

          return headers
        },
      )
  }

  circuitStatus() {
    return this.http
      .breaker
      .snapshot()
  }

  listWikis(
    input: {
      teamId: string
      status?: string
      limit?: number
      offset?: number
    },
  ) {
    return this.http.request(
      "/wiki/list",
      {
        body: {
          team_id:
            input.teamId,

          ...(input.status
            ? {
                status:
                  input.status,
              }
            : {}),

          limit:
            input.limit ?? 100,

          offset:
            input.offset ?? 0,
        },
      },
    )
  }

  searchWiki(
    input: {
      wikiId: string
      query: string
      limit?: number
    },
  ) {
    return this.http.request(
      "/wiki/search",
      {
        body: {
          wiki_id:
            input.wikiId,

          query:
            input.query,

          limit:
            input.limit ?? 20,
        },
      },
    )
  }

  readWikiPages(
    input: {
      wikiId: string
      refs: string[]
    },
  ) {
    return this.http.request(
      "/wiki/page/read",
      {
        body: {
          wiki_id:
            input.wikiId,

          refs:
            input.refs,
        },
      },
    )
  }

  wikiGraph(
    input: {
      wikiId: string
    },
  ) {
    return this.http.request(
      "/wiki/graph",
      {
        body: {
          wiki_id:
            input.wikiId,
        },
      },
    )
  }

  listCodeGraphs(
    input: {
      teamId: string
      status?: string
      limit?: number
      offset?: number
    },
  ) {
    return this.http.request(
      "/code-graph/list",
      {
        body: {
          team_id:
            input.teamId,

          ...(input.status
            ? {
                status:
                  input.status,
              }
            : {}),

          limit:
            input.limit ?? 100,

          offset:
            input.offset ?? 0,
        },
      },
    )
  }

  searchCodeGraph(
    input: {
      codeGraphId: string
      query: string
      kind?: "symbol" | "file" | "any"
      limit?: number
    },
  ) {
    return this.http.request(
      "/code-graph/search",
      {
        body: {
          code_graph_id:
            input.codeGraphId,

          query:
            input.query,

          kind:
            input.kind ?? "any",

          limit:
            input.limit ?? 10,
        },
      },
    )
  }

  exploreCodeGraph(
    input: {
      codeGraphId: string
      query: string
      maxFiles?: number
    },
  ) {
    return this.http.request(
      "/code-graph/explore",
      {
        body: {
          code_graph_id:
            input.codeGraphId,

          query:
            input.query,

          maxFiles:
            input.maxFiles ?? 12,
        },
      },
    )
  }

  callers(
    input: {
      codeGraphId: string
      symbol: string
      limit?: number
    },
  ) {
    return this.http.request(
      "/code-graph/callers",
      {
        body: {
          code_graph_id:
            input.codeGraphId,

          symbol:
            input.symbol,

          limit:
            input.limit ?? 20,
        },
      },
    )
  }

  callees(
    input: {
      codeGraphId: string
      symbol: string
      limit?: number
    },
  ) {
    return this.http.request(
      "/code-graph/callees",
      {
        body: {
          code_graph_id:
            input.codeGraphId,

          symbol:
            input.symbol,

          limit:
            input.limit ?? 20,
        },
      },
    )
  }

  impact(
    input: {
      codeGraphId: string
      symbol: string
      depth?: number
    },
  ) {
    return this.http.request(
      "/code-graph/impact",
      {
        body: {
          code_graph_id:
            input.codeGraphId,

          symbol:
            input.symbol,

          depth:
            input.depth ?? 2,
        },
      },
    )
  }

  node(
    input: {
      codeGraphId: string
      symbol: string
      includeCode?: boolean
      file?: string
      line?: number
    },
  ) {
    return this.http.request(
      "/code-graph/node",
      {
        body: {
          code_graph_id:
            input.codeGraphId,

          symbol:
            input.symbol,

          includeCode:
            input.includeCode ??
            false,

          ...(input.file
            ? {
                file:
                  input.file,
              }
            : {}),

          ...(input.line
            ? {
                line:
                  input.line,
              }
            : {}),
        },
      },
    )
  }

  files(
    input: {
      codeGraphId: string
      path?: string
      pattern?: string
      format?: "tree" | "flat"
      includeMetadata?: boolean
      maxDepth?: number
    },
  ) {
    return this.http.request(
      "/code-graph/files",
      {
        body: {
          code_graph_id:
            input.codeGraphId,

          ...(input.path
            ? {
                path:
                  input.path,
              }
            : {}),

          ...(input.pattern
            ? {
                pattern:
                  input.pattern,
              }
            : {}),

          format:
            input.format ??
            "tree",

          includeMetadata:
            input.includeMetadata ??
            true,

          ...(input.maxDepth
            ? {
                maxDepth:
                  input.maxDepth,
              }
            : {}),
        },
      },
    )
  }
}
