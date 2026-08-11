import type {
  AppConfig,
} from "../config.ts"

import {
  configuredKnowledgeAssets,
} from "../config.ts"

import type {
  CodeGraphAsset,
  WikiAsset,
} from "../domain/model.ts"

import type {
  KnowledgePort,
  TracePort,
} from "../domain/ports.ts"

type CacheEntry<T> = {
  expiresAt: number
  items: T[]
}

export class KnowledgeAssetResolver {
  private wikiCache:
    CacheEntry<WikiAsset> | null = null

  private codeCache:
    CacheEntry<CodeGraphAsset> | null = null

  private config:
    AppConfig

  private knowledge:
    KnowledgePort

  private trace:
    TracePort

  constructor(
    config:
      AppConfig,

    knowledge:
      KnowledgePort,

    trace:
      TracePort,
  ) {
    this.config = config
    this.knowledge = knowledge
    this.trace = trace
  }

  private cacheTTL() {
    return (
      this.config.knowledge
        .discovery.cacheSeconds *
      1000
    )
  }

  private maxAssets() {
    return (
      this.config.knowledge
        .discovery.maxAssetsPerKind
    )
  }

  private async discoveredWikis():
    Promise<WikiAsset[]> {
    if (
      !this.config.knowledge
        .discovery.enabled
    ) {
      return []
    }

    if (
      this.wikiCache &&
      this.wikiCache.expiresAt >
        Date.now()
    ) {
      return this.wikiCache.items
    }

    try {
      const result =
        await this.knowledge
          .listWikis({
            teamId:
              this.config.memory
                .teamId,

            status:
              "ready",

            limit:
              100,
          })

      const items =
        (
          result &&
          typeof result === "object" &&
          Array.isArray(
            (result as any).items,
          )
        )
          ? (result as any)
              .items as WikiAsset[]
          : []

      this.wikiCache = {
        expiresAt:
          Date.now() +
          this.cacheTTL(),

        items,
      }

      this.trace.write(
        "KNOWLEDGE_WIKIS_DISCOVERED",
        {
          count:
            items.length,

          ids:
            items
              .slice(
                0,
                this.maxAssets(),
              )
              .map(
                (item) =>
                  item.wiki_id,
              ),
        },
      )

      return items
    } catch (error) {
      this.trace.write(
        "KNOWLEDGE_WIKI_DISCOVERY_FAILED",
        {
          error:
            String(error),
        },
      )

      return []
    }
  }

  private async discoveredCodeGraphs():
    Promise<CodeGraphAsset[]> {
    if (
      !this.config.knowledge
        .discovery.enabled
    ) {
      return []
    }

    if (
      this.codeCache &&
      this.codeCache.expiresAt >
        Date.now()
    ) {
      return this.codeCache.items
    }

    try {
      const result =
        await this.knowledge
          .listCodeGraphs({
            teamId:
              this.config.memory
                .teamId,

            status:
              "ready",

            limit:
              100,
          })

      const items =
        (
          result &&
          typeof result === "object" &&
          Array.isArray(
            (result as any).items,
          )
        )
          ? (result as any)
              .items as CodeGraphAsset[]
          : []

      this.codeCache = {
        expiresAt:
          Date.now() +
          this.cacheTTL(),

        items,
      }

      this.trace.write(
        "KNOWLEDGE_CODEGRAPHS_DISCOVERED",
        {
          count:
            items.length,

          ids:
            items
              .slice(
                0,
                this.maxAssets(),
              )
              .map(
                (item) =>
                  item.code_graph_id,
              ),
        },
      )

      return items
    } catch (error) {
      this.trace.write(
        "KNOWLEDGE_CODEGRAPH_DISCOVERY_FAILED",
        {
          error:
            String(error),
        },
      )

      return []
    }
  }

  async wikiIds(
    openCodeAgent?: string,
  ): Promise<string[]> {
    const configured =
      configuredKnowledgeAssets(
        this.config,
        openCodeAgent,
      ).wikiIds

    if (configured.length) {
      return configured.slice(
        0,
        this.maxAssets(),
      )
    }

    const discovered =
      await this
        .discoveredWikis()

    return discovered
      .filter(
        (item) =>
          !item.status ||
          item.status === "ready",
      )
      .map(
        (item) =>
          item.wiki_id,
      )
      .slice(
        0,
        this.maxAssets(),
      )
  }

  async codeGraphIds(
    openCodeAgent?: string,
  ): Promise<string[]> {
    const configured =
      configuredKnowledgeAssets(
        this.config,
        openCodeAgent,
      ).codeGraphIds

    if (configured.length) {
      return configured.slice(
        0,
        this.maxAssets(),
      )
    }

    const discovered =
      await this
        .discoveredCodeGraphs()

    return discovered
      .filter(
        (item) =>
          !item.status ||
          item.status === "ready",
      )
      .map(
        (item) =>
          item.code_graph_id,
      )
      .slice(
        0,
        this.maxAssets(),
      )
  }

  async singleCodeGraph(
    openCodeAgent?: string,
    explicit?: string,
  ): Promise<
    | {
        ok: true
        id: string
      }
    | {
        ok: false
        ids: string[]
        reason: string
      }
  > {
    if (explicit) {
      return {
        ok: true,
        id: explicit,
      }
    }

    const ids =
      await this
        .codeGraphIds(
          openCodeAgent,
        )

    if (ids.length === 1) {
      return {
        ok: true,
        id: ids[0],
      }
    }

    if (!ids.length) {
      return {
        ok: false,
        ids: [],
        reason:
          "No ready CodeGraph asset is configured or discoverable for this Team.",
      }
    }

    return {
      ok: false,
      ids,
      reason:
        "Multiple CodeGraph assets are available; provide code_graph_id explicitly.",
    }
  }

  invalidate() {
    this.wikiCache = null
    this.codeCache = null
  }
}
