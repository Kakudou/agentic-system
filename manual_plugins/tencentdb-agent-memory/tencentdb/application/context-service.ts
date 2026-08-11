import type {
  AppConfig,
} from "../config.ts"

import {
  resolveMemoryScope,
} from "../config.ts"

import {
  classifyQueryIntent,
  routesForMode,
} from "../domain/policies/query-router.ts"

import type {
  ContextMode,
} from "../domain/model.ts"

import type {
  KnowledgePort,
  MemoryPort,
  TracePort,
} from "../domain/ports.ts"

import {
  KnowledgeAssetResolver,
} from "./knowledge-assets.ts"

function compactScenarioIndex(
  value: unknown,
  limit: number,
): unknown {
  if (
    !value ||
    typeof value !== "object"
  ) {
    return value
  }

  const entries =
    (value as any).entries

  if (!Array.isArray(entries)) {
    return value
  }

  return {
    ...value as any,

    entries:
      entries.slice(
        0,
        limit,
      ),

    truncated:
      entries.length >
      limit,
  }
}

function dataHasContent(
  value: unknown,
): boolean {
  if (value == null) {
    return false
  }

  if (
    typeof value === "string"
  ) {
    return Boolean(
      value.trim(),
    )
  }

  if (Array.isArray(value)) {
    return value.length > 0
  }

  if (
    typeof value !== "object"
  ) {
    return true
  }

  const record =
    value as Record<
      string,
      unknown
    >

  if (
    record.unavailable === true
  ) {
    return false
  }

  for (
    const key of [
      "items",
      "messages",
      "entries",
      "results",
      "hits",
    ]
  ) {
    if (
      Array.isArray(record[key]) &&
      (
        record[key] as unknown[]
      ).length
    ) {
      return true
    }
  }

  for (
    const key of [
      "content",
      "text",
      "summary",
    ]
  ) {
    if (
      typeof record[key] ===
        "string" &&
      (
        record[key] as string
      ).trim()
    ) {
      return true
    }
  }

  /*
   * Unknown non-empty objects returned by Knowledge are considered
   * meaningful because its search response shape is intentionally
   * service-defined rather than fully described in the OpenAPI schema.
   */
  return Object.keys(record).length > 0
}

async function settled(
  label: string,
  operation:
    () => Promise<unknown>,
): Promise<unknown> {
  try {
    return await operation()
  } catch (error) {
    return {
      unavailable: true,
      source: label,
      error:
        String(error),
    }
  }
}

export class ContextService {
  private config:
    AppConfig

  private memory:
    MemoryPort

  private knowledge:
    KnowledgePort

  private assets:
    KnowledgeAssetResolver

  private trace:
    TracePort

  constructor(
    config:
      AppConfig,

    memory:
      MemoryPort,

    knowledge:
      KnowledgePort,

    assets:
      KnowledgeAssetResolver,

    trace:
      TracePort,
  ) {
    this.config = config
    this.memory = memory
    this.knowledge = knowledge
    this.assets = assets
    this.trace = trace
  }

  async memoryContext(
    query: string,
    openCodeAgent: string,
    sessionID?: string,
  ) {
    const scope =
      resolveMemoryScope(
        this.config,
        openCodeAgent,
      )

    if (!scope) {
      return {
        configured: false,
        source:
          "memory",
        reason:
          "No TencentDB agent_id is mapped for the current OpenCode agent.",
      }
    }

    const limit =
      this.config.retrieval
        .memoryLimit

    const [
      atomic,
      conversations,
      scenarios,
      core,
    ] =
      await Promise.all([
        settled(
          "L1 atomic",
          () =>
            this.memory
              .searchAtomic(
                scope,
                {
                  query,
                  limit,
                },
              ),
        ),

        settled(
          "L0 conversation",
          () =>
            this.memory
              .searchConversations(
                scope,
                {
                  query,
                  limit,

                  ...(sessionID
                    ? {
                        sessionID,
                      }
                    : {}),
                },
              ),
        ),

        settled(
          "L2 scenario index",
          () =>
            this.memory
              .listScenarios(
                scope,
              ),
        ),

        settled(
          "L3 core",
          () =>
            this.memory
              .readCore(
                scope,
              ),
        ),
      ])

    const compactScenarios =
      compactScenarioIndex(
        scenarios,
        this.config.retrieval
          .scenarioIndexLimit,
      )

    const found =
      [
        atomic,
        conversations,
        compactScenarios,
        core,
      ].some(dataHasContent)

    return {
      configured: true,

      source:
        "memory",

      scope: {
        team_id:
          scope.teamId,

        agent_id:
          scope.agentId,

        user_id:
          scope.userId,

        ...(scope.taskId
          ? {
              task_id:
                scope.taskId,
            }
          : {}),
      },

      found,

      l1_atomic:
        atomic,

      l0_conversation:
        conversations,

      l2_scenario_index:
        compactScenarios,

      l3_core:
        core,
    }
  }

  async wikiContext(
    query: string,
    openCodeAgent: string,
  ) {
    const wikiIds =
      await this.assets
        .wikiIds(
          openCodeAgent,
        )

    if (!wikiIds.length) {
      return {
        configured: false,
        source:
          "wiki",
        reason:
          "No ready Wiki assets are configured or discoverable.",
      }
    }

    const searches =
      await Promise.all(
        wikiIds.map(
          async (
            wikiId,
          ) => ({
            wiki_id:
              wikiId,

            result:
              await settled(
                `Wiki ${wikiId}`,
                () =>
                  this.knowledge
                    .searchWiki({
                      wikiId,
                      query,
                      limit:
                        this.config
                          .retrieval
                          .knowledgeLimit,
                    }),
              ),
          }),
        ),
      )

    return {
      configured: true,
      source:
        "wiki",
      wiki_ids:
        wikiIds,
      found:
        searches.some(
          (item) =>
            dataHasContent(
              item.result,
            ),
        ),
      searches,
    }
  }

  async codeContext(
    query: string,
    openCodeAgent: string,
  ) {
    const codeGraphIds =
      await this.assets
        .codeGraphIds(
          openCodeAgent,
        )

    if (!codeGraphIds.length) {
      return {
        configured: false,
        source:
          "code",
        reason:
          "No ready CodeGraph assets are configured or discoverable.",
      }
    }

    const searches =
      await Promise.all(
        codeGraphIds.map(
          async (
            codeGraphId,
          ) => ({
            code_graph_id:
              codeGraphId,

            result:
              await settled(
                `CodeGraph ${codeGraphId}`,
                () =>
                  this.knowledge
                    .searchCodeGraph({
                      codeGraphId,
                      query,
                      kind:
                        "any",
                      limit:
                        Math.min(
                          20,
                          this.config
                            .retrieval
                            .knowledgeLimit,
                        ),
                    }),
              ),
          }),
        ),
      )

    return {
      configured: true,
      source:
        "code",
      code_graph_ids:
        codeGraphIds,
      found:
        searches.some(
          (item) =>
            dataHasContent(
              item.result,
            ),
        ),
      searches,
    }
  }

  async retrieve(
    input: {
      query: string
      mode: ContextMode
      openCodeAgent: string
      sessionID?: string
    },
  ) {
    const intent =
      classifyQueryIntent(
        input.query,
      )

    const routes =
      routesForMode(
        input.query,
        input.mode,
      )

    const results:
      Record<string, unknown> = {}

    await Promise.all(
      routes.map(
        async (route) => {
          if (route === "memory") {
            results.memory =
              await this
                .memoryContext(
                  input.query,
                  input.openCodeAgent,
                  input.sessionID,
                )

            return
          }

          if (route === "wiki") {
            results.wiki =
              await this
                .wikiContext(
                  input.query,
                  input.openCodeAgent,
                )

            return
          }

          results.code =
            await this
              .codeContext(
                input.query,
                input.openCodeAgent,
              )
        },
      ),
    )

    const found =
      Object.values(results)
        .some(
          (value) =>
            (
              value &&
              typeof value ===
                "object" &&
              (value as any)
                .found === true
            ),
        )

    const terminal =
      intent ===
        "personal-memory" &&
      !found

    const response = {
      routing: {
        intent,
        mode:
          input.mode,
        routes,
      },

      found,

      /*
       * This is deliberately machine-readable. The agent policy says
       * TDAI_TERMINAL means: stop retrieval and answer from available
       * evidence instead of escaping to the public web.
       */
      terminal,

      terminal_code:
        terminal
          ? "TDAI_TERMINAL_PERSONAL_MEMORY_NOT_FOUND"
          : null,

      results,
    }

    this.trace.write(
      "CONTEXT_RETRIEVED",
      {
        openCodeAgent:
          input.openCodeAgent,

        intent,
        routes,
        found,
        terminal,
      },
    )

    return response
  }
}
