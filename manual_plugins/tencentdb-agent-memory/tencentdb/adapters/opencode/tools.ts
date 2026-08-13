import type {
  AppConfig,
} from "../../config.ts"

import {
  resolveMemoryScope,
} from "../../config.ts"

import type {
  ContextMode,
} from "../../domain/model.ts"

import {
  wrapLanguageEvidence,
} from "../../domain/policies/language-policy.ts"

import type {
  KnowledgePort,
  MemoryPort,
  TracePort,
} from "../../domain/ports.ts"

import {
  ContextService,
} from "../../application/context-service.ts"

import {
  CaptureService,
} from "../../application/capture-service.ts"

import {
  KnowledgeAssetResolver,
} from "../../application/knowledge-assets.ts"

import {
  RetrievalBudget,
} from "../../application/retrieval-budget.ts"

import {
  TurnStore,
} from "./turn-store.ts"

const STRING_OUTPUT = {
  type:
    "string",
}

function toolResult(
  value: unknown,
) {
  const text =
    typeof value === "string"
      ? value
      : JSON.stringify(
          value,
          null,
          2,
        )

  return {
    output:
      text,

    content:
      text,
  }
}

function presentToolResult(
  value: unknown,
  config: AppConfig,
) {
  return toolResult(
    wrapLanguageEvidence(
      value,
      config.guardrails
        .outputLanguage,
      (
        config.guardrails.enabled &&
        config.guardrails
          .annotateTencentEvidence
      ),
    ),
  )
}


function currentSession(
  toolCtx: any,
  turns: TurnStore,
): string {
  return (
    (
      typeof toolCtx?.sessionID ===
        "string"
        ? toolCtx.sessionID
        : ""
    ) ||
    turns.latestExecutionSession(
      30000,
    ) ||
    "opencode-v2"
  )
}

function currentAgent(
  toolCtx: any,
  turns: TurnStore,
): string {
  const agent =
    toolCtx?.agent

  if (
    typeof agent === "string" &&
    agent.trim()
  ) {
    return agent.trim()
  }

  if (
    agent &&
    typeof agent === "object"
  ) {
    const explicit =
      (
        typeof agent.id ===
          "string"
          ? agent.id
          : ""
      ) ||
      (
        typeof agent.name ===
          "string"
          ? agent.name
          : ""
      )

    if (explicit.trim()) {
      return explicit.trim()
    }
  }

  const sessionID =
    currentSession(
      toolCtx,
      turns,
    )

  return turns.currentAgent(
    sessionID,
  )
}

async function safeOperation(
  trace: TracePort,
  label: string,
  operation:
    () => Promise<unknown>,
): Promise<unknown> {
  try {
    return await operation()
  } catch (error) {
    trace.write(
      "TOOL_OPERATION_FAILED_OPEN",
      {
        label,
        error:
          String(error),
      },
    )

    return {
      available:
        false,

      source:
        label,

      error:
        String(error),

      guidance:
        "Continue the main task without this TencentDB source.",
    }
  }
}

function budgetExceeded(
  snapshot: ReturnType<
    RetrievalBudget["snapshot"]
  >,
) {
  return {
    terminal: true,
    terminal_code:
      "TDAI_TERMINAL_RETRIEVAL_BUDGET_EXHAUSTED",

    message:
      "TencentDB retrieval budget for this model turn is exhausted. Stop retrieval and answer from the evidence already obtained.",

    retrieval:
      snapshot,
  }
}

async function withBudget(
  budget: RetrievalBudget,
  sessionID: string,
  toolName: string,
  operation:
    () => Promise<unknown>,
) {
  const admission =
    budget.consume(
      sessionID,
      toolName,
    )

  if (!admission.allowed) {
    return budgetExceeded(
      admission.snapshot,
    )
  }

  const result =
    await operation()

  return {
    retrieval:
      admission.snapshot,

    result,
  }
}

function isEmptyAtomic(
  value: unknown,
): boolean {
  return Boolean(
    value &&
    typeof value === "object" &&
    Array.isArray(
      (value as any).items,
    ) &&
    (value as any)
      .items.length === 0,
  )
}

export type ToolDependencies = {
  config: AppConfig
  memory: MemoryPort
  knowledge: KnowledgePort
  context: ContextService
  assets: KnowledgeAssetResolver
  capture: CaptureService
  budget: RetrievalBudget
  turns: TurnStore
  trace: TracePort
}



export async function registerTools(
  ctx: any,
  deps: ToolDependencies,
) {
  const present =
    (value: unknown) =>
      presentToolResult(
        value,
        deps.config,
      )

  await ctx.tool.transform(
    (tools: any) => {
      tools.add({
        name:
          "tdai_context",

        codemode:
          false,

        description:
          "PREFERRED FIRST TencentDB retrieval tool. Routes a query to private MemoryCore L0/L1/L2/L3, LLM-Wiki, and/or CodeGraph. " +
          "Use mode=memory for personal/history questions, wiki for internal docs/specs, code for structural repository questions, or auto for normal routing. " +
          "Call directly, never through execute/CodeMode.",

        input: {
          type:
            "object",

          properties: {
            query: {
              type:
                "string",
            },

            mode: {
              type:
                "string",

              enum: [
                "auto",
                "memory",
                "wiki",
                "code",
                "all",
              ],
            },
          },

          required: [
            "query",
          ],

          additionalProperties:
            false,
        },

        output:
          STRING_OUTPUT,

        execute:
          async (
            args: any,
            toolCtx: any,
          ) => {
            const sessionID =
              currentSession(
                toolCtx,
                deps.turns,
              )

            const agent =
              currentAgent(
                toolCtx,
                deps.turns,
              )

            return present(
              await withBudget(
                deps.budget,
                sessionID,
                "tdai_context",
                () =>
                  safeOperation(
                    deps.trace,
                    "tdai_context",
                    () =>
                      deps.context
                        .retrieve({
                          query:
                            String(
                              args.query ??
                              "",
                            ),

                          mode:
                            (
                              args.mode ??
                              "auto"
                            ) as ContextMode,

                          openCodeAgent:
                            agent,

                          sessionID,
                        }),
                  ),
              ),
            )
          },
      })

      tools.add({
        name:
          "tdai_memory_search",

        codemode:
          false,

        description:
          "Direct private-memory lookup for the current OpenCode agent's Tencent Hub agent_id. Searches L1 Atom first and automatically falls back to L0 conversation history. " +
          "For most personal-memory questions prefer tdai_context(mode='memory') because it also exposes L2/L3 progressive context.",

        input: {
          type:
            "object",

          properties: {
            query: {
              type:
                "string",
            },

            limit: {
              type:
                "number",
            },

            type: {
              type:
                "string",
            },
          },

          required: [
            "query",
          ],

          additionalProperties:
            false,
        },

        output:
          STRING_OUTPUT,

        execute:
          async (
            args: any,
            toolCtx: any,
          ) => {
            const sessionID =
              currentSession(
                toolCtx,
                deps.turns,
              )

            const agent =
              currentAgent(
                toolCtx,
                deps.turns,
              )

            return present(
              await withBudget(
                deps.budget,
                sessionID,
                "tdai_memory_search",
                async () => {
                  const scope =
                    resolveMemoryScope(
                      deps.config,
                      agent,
                    )

                  if (!scope) {
                    return {
                      configured:
                        false,
                      terminal:
                        true,
                      terminal_code:
                        "TDAI_TERMINAL_UNMAPPED_AGENT",
                      openCodeAgent:
                        agent ||
                        null,
                    }
                  }

                  const limit =
                    Number(
                      args.limit ??
                      deps.config
                        .retrieval
                        .memoryLimit,
                    )

                  const l1 =
                    await safeOperation(
                      deps.trace,
                      "L1 atomic search",
                      () =>
                        deps.memory
                          .searchAtomic(
                            scope,
                            {
                              query:
                                String(
                                  args.query,
                                ),
                              limit,
                              type:
                                args.type,
                            },
                          ),
                    )

                  if (
                    !isEmptyAtomic(
                      l1,
                    )
                  ) {
                    return {
                      source:
                        "L1 atomic",
                      scope,
                      l1,
                    }
                  }

                  const l0 =
                    await safeOperation(
                      deps.trace,
                      "L0 conversation fallback",
                      () =>
                        deps.memory
                          .searchConversations(
                            scope,
                            {
                              query:
                                String(
                                  args.query,
                                ),
                              limit,
                            },
                          ),
                    )

                  deps.trace.write(
                    "MEMORY_SEARCH_L0_FALLBACK",
                    {
                      sessionID,
                      openCodeAgent:
                        agent,
                    },
                  )

                  return {
                    source:
                      "L0 conversation fallback after empty L1",
                    scope,
                    l1,
                    l0,
                  }
                },
              ),
            )
          },
      })

      tools.add({
        name:
          "tdai_memory_layer",

        codemode:
          false,

        description:
          "Progressive-disclosure access to TencentDB higher memory layers for the current agent. " +
          "Use scenario_list for the L2 index, scenario_read for one L2 Markdown scene, and core_read for the L3 persona/core profile.",

        input: {
          type:
            "object",

          properties: {
            action: {
              type:
                "string",
              enum: [
                "scenario_list",
                "scenario_read",
                "core_read",
              ],
            },

            path: {
              type:
                "string",
            },

            path_prefix: {
              type:
                "string",
            },

            version: {
              type:
                "string",
            },
          },

          required: [
            "action",
          ],

          additionalProperties:
            false,
        },

        output:
          STRING_OUTPUT,

        execute:
          async (
            args: any,
            toolCtx: any,
          ) => {
            const sessionID =
              currentSession(
                toolCtx,
                deps.turns,
              )

            const agent =
              currentAgent(
                toolCtx,
                deps.turns,
              )

            return present(
              await withBudget(
                deps.budget,
                sessionID,
                "tdai_memory_layer",
                async () => {
                  const scope =
                    resolveMemoryScope(
                      deps.config,
                      agent,
                    )

                  if (!scope) {
                    return {
                      configured:
                        false,
                      terminal:
                        true,
                      terminal_code:
                        "TDAI_TERMINAL_UNMAPPED_AGENT",
                    }
                  }

                  if (
                    args.action ===
                    "scenario_list"
                  ) {
                    return safeOperation(
                      deps.trace,
                      "L2 scenario list",
                      () =>
                        deps.memory
                          .listScenarios(
                            scope,
                            {
                              pathPrefix:
                                args.path_prefix,
                            },
                          ),
                    )
                  }

                  if (
                    args.action ===
                    "scenario_read"
                  ) {
                    if (!args.path) {
                      return {
                        error:
                          "path is required for scenario_read",
                      }
                    }

                    return safeOperation(
                      deps.trace,
                      "L2 scenario read",
                      () =>
                        deps.memory
                          .readScenario(
                            scope,
                            {
                              path:
                                String(
                                  args.path,
                                ),

                              version:
                                args.version,
                            },
                          ),
                    )
                  }

                  return safeOperation(
                    deps.trace,
                    "L3 core read",
                    () =>
                      deps.memory
                        .readCore(
                          scope,
                          {
                            version:
                              args.version,
                          },
                        ),
                  )
                },
              ),
            )
          },
      })

      tools.add({
        name:
          "tdai_wiki_search",

        codemode:
          false,

        description:
          "Search Tencent MemoryKnowledge LLM-Wiki for internal documentation, architecture, ADRs, SOPs and ingested knowledge. " +
          "If wiki_id is omitted, searches the configured or auto-discovered ready Wikis for the Team.",

        input: {
          type:
            "object",

          properties: {
            query: {
              type:
                "string",
            },

            wiki_id: {
              type:
                "string",
            },

            limit: {
              type:
                "number",
            },
          },

          required: [
            "query",
          ],

          additionalProperties:
            false,
        },

        output:
          STRING_OUTPUT,

        execute:
          async (
            args: any,
            toolCtx: any,
          ) => {
            const sessionID =
              currentSession(
                toolCtx,
                deps.turns,
              )

            const agent =
              currentAgent(
                toolCtx,
                deps.turns,
              )

            return present(
              await withBudget(
                deps.budget,
                sessionID,
                "tdai_wiki_search",
                async () => {
                  const ids =
                    args.wiki_id
                      ? [
                          String(
                            args.wiki_id,
                          ),
                        ]
                      : await deps.assets
                          .wikiIds(
                            agent,
                          )

                  if (!ids.length) {
                    return {
                      configured:
                        false,
                      source:
                        "wiki",
                      message:
                        "No ready Wiki assets are configured or discoverable.",
                    }
                  }

                  const searches =
                    await Promise.all(
                      ids.map(
                        async (
                          wikiId,
                        ) => ({
                          wiki_id:
                            wikiId,

                          result:
                            await safeOperation(
                              deps.trace,
                              `Wiki ${wikiId}`,
                              () =>
                                deps.knowledge
                                  .searchWiki({
                                    wikiId,
                                    query:
                                      String(
                                        args.query,
                                      ),
                                    limit:
                                      Number(
                                        args.limit ??
                                        deps.config
                                          .retrieval
                                          .knowledgeLimit,
                                      ),
                                  }),
                            ),
                        }),
                      ),
                    )

                  return {
                    source:
                      "LLM-Wiki",
                    searches,
                  }
                },
              ),
            )
          },
      })

      tools.add({
        name:
          "tdai_wiki_read",

        codemode:
          false,

        description:
          "Read processed LLM-Wiki pages by refs returned from Wiki search. Use this to drill down after tdai_wiki_search.",

        input: {
          type:
            "object",

          properties: {
            wiki_id: {
              type:
                "string",
            },

            refs: {
              type:
                "array",
              items: {
                type:
                  "string",
              },
            },
          },

          required: [
            "wiki_id",
            "refs",
          ],

          additionalProperties:
            false,
        },

        output:
          STRING_OUTPUT,

        execute:
          async (
            args: any,
            toolCtx: any,
          ) => {
            const sessionID =
              currentSession(
                toolCtx,
                deps.turns,
              )

            return present(
              await withBudget(
                deps.budget,
                sessionID,
                "tdai_wiki_read",
                () =>
                  safeOperation(
                    deps.trace,
                    "Wiki page read",
                    () =>
                      deps.knowledge
                        .readWikiPages({
                          wikiId:
                            String(
                              args.wiki_id,
                            ),
                          refs:
                            Array.isArray(
                              args.refs,
                            )
                              ? args.refs
                                  .map(
                                    (
                                      item: any,
                                    ) =>
                                      String(
                                        item,
                                      ),
                                  )
                                  .slice(
                                    0,
                                    20,
                                  )
                              : [],
                        }),
                  ),
              ),
            )
          },
      })

      tools.add({
        name:
          "tdai_code_search",

        codemode:
          false,

        description:
          "Search Tencent MemoryKnowledge CodeGraph symbols/files. Prefer this before grep for structural repository discovery. " +
          "If code_graph_id is omitted, searches configured or auto-discovered ready graphs for the Team. Verify exact current working-tree code with normal file tools afterward when necessary.",

        input: {
          type:
            "object",

          properties: {
            query: {
              type:
                "string",
            },

            code_graph_id: {
              type:
                "string",
            },

            kind: {
              type:
                "string",
              enum: [
                "symbol",
                "file",
                "any",
              ],
            },

            limit: {
              type:
                "number",
            },
          },

          required: [
            "query",
          ],

          additionalProperties:
            false,
        },

        output:
          STRING_OUTPUT,

        execute:
          async (
            args: any,
            toolCtx: any,
          ) => {
            const sessionID =
              currentSession(
                toolCtx,
                deps.turns,
              )

            const agent =
              currentAgent(
                toolCtx,
                deps.turns,
              )

            return present(
              await withBudget(
                deps.budget,
                sessionID,
                "tdai_code_search",
                async () => {
                  const ids =
                    args.code_graph_id
                      ? [
                          String(
                            args.code_graph_id,
                          ),
                        ]
                      : await deps.assets
                          .codeGraphIds(
                            agent,
                          )

                  if (!ids.length) {
                    return {
                      configured:
                        false,
                      source:
                        "codegraph",
                      message:
                        "No ready CodeGraph assets are configured or discoverable.",
                    }
                  }

                  const searches =
                    await Promise.all(
                      ids.map(
                        async (
                          codeGraphId,
                        ) => ({
                          code_graph_id:
                            codeGraphId,

                          result:
                            await safeOperation(
                              deps.trace,
                              `CodeGraph ${codeGraphId}`,
                              () =>
                                deps.knowledge
                                  .searchCodeGraph({
                                    codeGraphId,
                                    query:
                                      String(
                                        args.query,
                                      ),

                                    kind:
                                      (
                                        args.kind ??
                                        "any"
                                      ),

                                    limit:
                                      Number(
                                        args.limit ??
                                        Math.min(
                                          20,
                                          deps.config
                                            .retrieval
                                            .knowledgeLimit,
                                        ),
                                      ),
                                  }),
                            ),
                        }),
                      ),
                    )

                  return {
                    source:
                      "CodeGraph",
                    searches,
                  }
                },
              ),
            )
          },
      })

      tools.add({
        name:
          "tdai_code_graph",

        codemode:
          false,

        description:
          "Drill into Tencent CodeGraph after search. Operations: list, explore matching files, callers, callees, impact, node details, or files tree. " +
          "For callers/callees/impact/node/files, code_graph_id is auto-selected only when exactly one graph is available.",

        input: {
          type:
            "object",

          properties: {
            operation: {
              type:
                "string",
              enum: [
                "list",
                "explore",
                "callers",
                "callees",
                "impact",
                "node",
                "files",
              ],
            },

            code_graph_id: {
              type:
                "string",
            },

            query: {
              type:
                "string",
            },

            symbol: {
              type:
                "string",
            },

            limit: {
              type:
                "number",
            },

            depth: {
              type:
                "number",
            },

            include_code: {
              type:
                "boolean",
            },

            file: {
              type:
                "string",
            },

            line: {
              type:
                "number",
            },

            path: {
              type:
                "string",
            },

            pattern: {
              type:
                "string",
            },

            format: {
              type:
                "string",
              enum: [
                "tree",
                "flat",
              ],
            },

            include_metadata: {
              type:
                "boolean",
            },

            max_depth: {
              type:
                "number",
            },

            max_files: {
              type:
                "number",
            },
          },

          required: [
            "operation",
          ],

          additionalProperties:
            false,
        },

        output:
          STRING_OUTPUT,

        execute:
          async (
            args: any,
            toolCtx: any,
          ) => {
            const sessionID =
              currentSession(
                toolCtx,
                deps.turns,
              )

            const agent =
              currentAgent(
                toolCtx,
                deps.turns,
              )

            return present(
              await withBudget(
                deps.budget,
                sessionID,
                "tdai_code_graph",
                async () => {
                  if (
                    args.operation ===
                    "list"
                  ) {
                    const ids =
                      await deps.assets
                        .codeGraphIds(
                          agent,
                        )

                    return {
                      code_graph_ids:
                        ids,
                    }
                  }

                  const resolved =
                    await deps.assets
                      .singleCodeGraph(
                        agent,
                        args.code_graph_id
                          ? String(
                              args.code_graph_id,
                            )
                          : undefined,
                      )

                  if (!resolved.ok) {
                    return {
                      configured:
                        false,
                      reason:
                        resolved.reason,
                      code_graph_ids:
                        resolved.ids,
                    }
                  }

                  const codeGraphId =
                    resolved.id

                  if (
                    args.operation ===
                    "explore"
                  ) {
                    if (!args.query) {
                      return {
                        error:
                          "query is required for explore",
                      }
                    }

                    return safeOperation(
                      deps.trace,
                      "CodeGraph explore",
                      () =>
                        deps.knowledge
                          .exploreCodeGraph({
                            codeGraphId,
                            query:
                              String(
                                args.query,
                              ),
                            maxFiles:
                              args.max_files,
                          }),
                    )
                  }

                  if (
                    args.operation ===
                    "callers"
                  ) {
                    if (!args.symbol) {
                      return {
                        error:
                          "symbol is required for callers",
                      }
                    }

                    return safeOperation(
                      deps.trace,
                      "CodeGraph callers",
                      () =>
                        deps.knowledge
                          .callers({
                            codeGraphId,
                            symbol:
                              String(
                                args.symbol,
                              ),
                            limit:
                              args.limit,
                          }),
                    )
                  }

                  if (
                    args.operation ===
                    "callees"
                  ) {
                    if (!args.symbol) {
                      return {
                        error:
                          "symbol is required for callees",
                      }
                    }

                    return safeOperation(
                      deps.trace,
                      "CodeGraph callees",
                      () =>
                        deps.knowledge
                          .callees({
                            codeGraphId,
                            symbol:
                              String(
                                args.symbol,
                              ),
                            limit:
                              args.limit,
                          }),
                    )
                  }

                  if (
                    args.operation ===
                    "impact"
                  ) {
                    if (!args.symbol) {
                      return {
                        error:
                          "symbol is required for impact",
                      }
                    }

                    return safeOperation(
                      deps.trace,
                      "CodeGraph impact",
                      () =>
                        deps.knowledge
                          .impact({
                            codeGraphId,
                            symbol:
                              String(
                                args.symbol,
                              ),
                            depth:
                              args.depth,
                          }),
                    )
                  }

                  if (
                    args.operation ===
                    "node"
                  ) {
                    if (!args.symbol) {
                      return {
                        error:
                          "symbol is required for node",
                      }
                    }

                    return safeOperation(
                      deps.trace,
                      "CodeGraph node",
                      () =>
                        deps.knowledge
                          .node({
                            codeGraphId,
                            symbol:
                              String(
                                args.symbol,
                              ),
                            includeCode:
                              args.include_code,
                            file:
                              args.file,
                            line:
                              args.line,
                          }),
                    )
                  }

                  return safeOperation(
                    deps.trace,
                    "CodeGraph files",
                    () =>
                      deps.knowledge
                        .files({
                          codeGraphId,
                          path:
                            args.path,
                          pattern:
                            args.pattern,
                          format:
                            args.format,
                          includeMetadata:
                            args.include_metadata,
                          maxDepth:
                            args.max_depth,
                        }),
                  )
                },
              ),
            )
          },
      })

      tools.add({
        name:
          "tdai_memory_health",

        codemode:
          false,

        description:
          "Inspect TencentDB OpenCode adapter configuration, current per-agent scope, retrieval budget, MemoryCore health, Knowledge asset discovery, and circuit state.",

        input: {
          type:
            "object",
          properties: {},
          additionalProperties:
            false,
        },

        output:
          STRING_OUTPUT,

        execute:
          async (
            _args: any,
            toolCtx: any,
          ) => {
            const sessionID =
              currentSession(
                toolCtx,
                deps.turns,
              )

            const agent =
              currentAgent(
                toolCtx,
                deps.turns,
              )

            const scope =
              resolveMemoryScope(
                deps.config,
                agent,
              )

            const [
              memoryHealth,
              wikiIds,
              codeGraphIds,
            ] =
              await Promise.all([
                safeOperation(
                  deps.trace,
                  "MemoryCore health",
                  () =>
                    deps.memory
                      .health(),
                ),

                deps.assets
                  .wikiIds(agent),

                deps.assets
                  .codeGraphIds(
                    agent,
                  ),
              ])

            return present({
              adapter:
                "v3.0-ddd",

              opencode_agent:
                agent ||
                null,

              memory_scope:
                scope,

              retrieval_budget:
                deps.budget
                  .snapshot(
                    sessionID,
                  ),

              turn_store:
                deps.turns.stats(),

              knowledge: {
                url:
                  deps.config
                    .knowledge.url,

                wiki_ids:
                  wikiIds,

                code_graph_ids:
                  codeGraphIds,
              },

              memory_core:
                memoryHealth,

              trace_file:
                deps.config.traceFile,
            })
          },
      })

      if (
        deps.config.exposeAdminTools
      ) {
        tools.add({
          name:
            "tdai_capture",

          codemode:
            false,

          description:
            "ADMIN/DIAGNOSTIC ONLY. Manually capture a completed turn into the current OpenCode agent's Tencent Hub memory. Normal capture is automatic.",

          input: {
            type:
              "object",

            properties: {
              user_content: {
                type:
                  "string",
              },

              assistant_content: {
                type:
                  "string",
              },

              session_id: {
                type:
                  "string",
              },
            },

            required: [
              "user_content",
              "assistant_content",
            ],

            additionalProperties:
              false,
          },

          output:
            STRING_OUTPUT,

          execute:
            async (
              args: any,
              toolCtx: any,
            ) => {
              const sessionID =
                args.session_id ??
                currentSession(
                  toolCtx,
                  deps.turns,
                )

              const agent =
                currentAgent(
                  toolCtx,
                  deps.turns,
                )

              const ok =
                await deps.capture
                  .capture({
                    sessionID:
                      String(
                        sessionID,
                      ),
                    generation:
                      Date.now(),
                    openCodeAgent:
                      agent,
                    userText:
                      String(
                        args.user_content,
                      ),
                    assistantText:
                      String(
                        args.assistant_content,
                      ),
                    assistantMessageIDs:
                      [],
                  })

              return present({
                captured:
                  ok,
              })
            },
        })
      }
    },
  )

  deps.trace.write(
    "TOOLS_INSTALLED",
    {
      tools: [
        "tdai_context",
        "tdai_memory_search",
        "tdai_memory_layer",
        "tdai_wiki_search",
        "tdai_wiki_read",
        "tdai_code_search",
        "tdai_code_graph",
        "tdai_memory_health",
        ...(deps.config
          .exposeAdminTools
          ? [
              "tdai_capture",
            ]
          : []),
      ],
    },
  )
}
