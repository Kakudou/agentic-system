import type {
  AgentKnowledgeAssets,
  MemoryScope,
} from "./domain/model.ts"

export type PluginOptions = {
  gateway?: {
    url?: string
    apiKey?: string
  }

  memory?: {
    instanceId?: string
    teamId?: string
    userId?: string
    taskId?: string

    /*
     * Fallback Tencent Hub agent_id for unmapped OpenCode agents.
     * Remove it if you want unmapped agents to have no long-term memory.
     */
    defaultAgentId?: string

    /*
     * OpenCode agent name -> Tencent Hub agent_id.
     *
     * `.opencode/agents/toto.md` resolves as OpenCode agent `toto`.
     */
    agents?: Record<string, string>
  }

  knowledge?: {
    /*
     * MemoryKnowledge public base URL INCLUDING /v3.
     * Local server_team compose normally exposes it on host port 8424.
     */
    url?: string
    apiKey?: string

    discovery?: {
      enabled?: boolean
      cacheSeconds?: number
      maxAssetsPerKind?: number
    }

    defaultWikiIds?: string[]
    defaultCodeGraphIds?: string[]

    /*
     * Optional OpenCode-agent-specific asset visibility.
     * Values are merged with the defaults above.
     */
    agents?: Record<
      string,
      {
        wikiIds?: string[]
        codeGraphIds?: string[]
      }
    >
  }

  retrieval?: {
    budgetPerTurn?: number
    memoryLimit?: number
    knowledgeLimit?: number
    scenarioIndexLimit?: number
  }

  dream?: {
    enabled?: boolean
    pathPrefix?: string
    maxCommitChars?: number

    sample?: {
      atomicPool?: number
      conversationPool?: number
      atoms?: number
      conversations?: number
      scenarios?: number
      includeCore?: boolean
      sourceMaxChars?: number
      scenarioMaxChars?: number
      coreMaxChars?: number
    }
  }

  guardrails?:
    | boolean
    | {
        enabled?: boolean

        /*
         * Hard turn-aware block for public web retrieval only when the
         * current prompt is clearly a personal-memory question.
         */
        blockPublicWebOnPersonalMemory?: boolean

        /*
         * User-visible language for answers that use TencentDB evidence.
         * Default: English.
         */
        outputLanguage?: string

        /*
         * Wrap tdai_* evidence with a compact model-visible language
         * directive. Particularly useful when Tencent extraction/Wiki
         * content was generated in Chinese.
         */
        annotateTencentEvidence?: boolean
      }

  exposeAdminTools?: boolean
  traceFile?: string

  timeouts?: {
    gatewayMs?: number
    captureMs?: number
    knowledgeMs?: number
  }

  circuit?: {
    failureThreshold?: number
    openSeconds?: number
  }
}

export type AppConfig = {
  gateway: {
    url: string
    apiKey: string
  }

  memory: {
    instanceId: string
    teamId: string
    userId: string
    taskId?: string
    defaultAgentId: string
    agents: Record<string, string>
  }

  knowledge: {
    url: string
    apiKey: string
    discovery: {
      enabled: boolean
      cacheSeconds: number
      maxAssetsPerKind: number
    }
    defaultWikiIds: string[]
    defaultCodeGraphIds: string[]
    agents: Record<string, AgentKnowledgeAssets>
  }

  retrieval: {
    budgetPerTurn: number
    memoryLimit: number
    knowledgeLimit: number
    scenarioIndexLimit: number
  }

  dream: {
    enabled: boolean
    pathPrefix: string
    maxCommitChars: number
    sample: {
      atomicPool: number
      conversationPool: number
      atoms: number
      conversations: number
      scenarios: number
      includeCore: boolean
      sourceMaxChars: number
      scenarioMaxChars: number
      coreMaxChars: number
    }
  }

  guardrails: {
    enabled: boolean
    blockPublicWebOnPersonalMemory: boolean
    outputLanguage: string
    annotateTencentEvidence: boolean
  }

  exposeAdminTools: boolean
  traceFile: string

  timeouts: {
    gatewayMs: number
    captureMs: number
    knowledgeMs: number
  }

  circuit: {
    failureThreshold: number
    openSeconds: number
  }
}

function asString(
  value: unknown,
  fallback = "",
): string {
  return (
    typeof value === "string" &&
    value.trim()
  )
    ? value.trim()
    : fallback
}

function asPositiveInt(
  value: unknown,
  fallback: number,
  minimum = 1,
): number {
  const parsed =
    typeof value === "number"
      ? value
      : Number(value)

  return (
    Number.isFinite(parsed) &&
    parsed >= minimum
  )
    ? Math.floor(parsed)
    : fallback
}

function asNonNegativeInt(
  value: unknown,
  fallback: number,
): number {
  const parsed =
    typeof value === "number"
      ? value
      : Number(value)

  return (
    Number.isFinite(parsed) &&
    parsed >= 0
  )
    ? Math.floor(parsed)
    : fallback
}

function boolFromEnv(
  value: string | undefined,
  fallback: boolean,
): boolean {
  if (value == null) {
    return fallback
  }

  if (/^(?:1|true|yes|on)$/i.test(value)) {
    return true
  }

  if (/^(?:0|false|no|off)$/i.test(value)) {
    return false
  }

  return fallback
}

function stringArray(
  value: unknown,
): string[] {
  if (!Array.isArray(value)) {
    return []
  }

  return [
    ...new Set(
      value
        .map((item) => asString(item))
        .filter(Boolean),
    ),
  ]
}

export function loadConfig(
  rawOptions: unknown,
): AppConfig {
  const options =
    (
      rawOptions &&
      typeof rawOptions === "object"
    )
      ? rawOptions as PluginOptions
      : {}

  const gateway =
    options.gateway ?? {}

  const memory =
    options.memory ?? {}

  const knowledge =
    options.knowledge ?? {}

  const retrieval =
    options.retrieval ?? {}

  const dream =
    options.dream ?? {}

  const dreamSample =
    dream.sample ?? {}

  const timeouts =
    options.timeouts ?? {}

  const circuit =
    options.circuit ?? {}

  const envGatewayURL =
    process.env.TDAI_GATEWAY_URL ??
    "http://127.0.0.1:8420"

  const envKnowledgeURL =
    process.env.TDAI_KNOWLEDGE_URL ??
    "http://127.0.0.1:8424/v3"

  const agents:
    Record<string, string> = {}

  if (
    memory.agents &&
    typeof memory.agents === "object"
  ) {
    for (
      const [
        openCodeAgent,
        tencentAgentID,
      ] of Object.entries(memory.agents)
    ) {
      const name =
        asString(openCodeAgent)

      const id =
        asString(tencentAgentID)

      if (name && id) {
        agents[name] = id
      }
    }
  }

  const knowledgeAgents:
    Record<string, AgentKnowledgeAssets> = {}

  if (
    knowledge.agents &&
    typeof knowledge.agents === "object"
  ) {
    for (
      const [
        openCodeAgent,
        assets,
      ] of Object.entries(knowledge.agents)
    ) {
      if (
        !assets ||
        typeof assets !== "object"
      ) {
        continue
      }

      knowledgeAgents[openCodeAgent] = {
        wikiIds:
          stringArray(assets.wikiIds),

        codeGraphIds:
          stringArray(
            assets.codeGraphIds,
          ),
      }
    }
  }

  let guardrailsEnabled =
    boolFromEnv(
      process.env.TDAI_MEMORY_GUARDRAILS,
      true,
    )

  let blockPublicWeb =
    true

  let outputLanguage =
    asString(
      process.env.TDAI_OUTPUT_LANGUAGE,
      "English",
    )

  let annotateTencentEvidence =
    boolFromEnv(
      process.env.TDAI_ANNOTATE_TENCENT_EVIDENCE,
      true,
    )

  if (
    typeof options.guardrails ===
      "boolean"
  ) {
    guardrailsEnabled =
      options.guardrails

    blockPublicWeb =
      options.guardrails
  } else if (
    options.guardrails &&
    typeof options.guardrails ===
      "object"
  ) {
    if (
      typeof options.guardrails.enabled ===
        "boolean"
    ) {
      guardrailsEnabled =
        options.guardrails.enabled
    }

    if (
      typeof options.guardrails.blockPublicWebOnPersonalMemory ===
        "boolean"
    ) {
      blockPublicWeb =
        options.guardrails
          .blockPublicWebOnPersonalMemory
    }

    outputLanguage =
      asString(
        options.guardrails.outputLanguage,
        outputLanguage,
      )

    if (
      typeof options.guardrails.annotateTencentEvidence ===
        "boolean"
    ) {
      annotateTencentEvidence =
        options.guardrails
          .annotateTencentEvidence
    }
  }

  return {
    gateway: {
      url:
        asString(
          gateway.url,
          envGatewayURL,
        ).replace(/\/+$/, ""),

      apiKey:
        asString(
          gateway.apiKey,
          process.env.TDAI_GATEWAY_API_KEY ??
          "",
        ),
    },

    memory: {
      instanceId:
        asString(
          memory.instanceId,
          process.env.TDAI_MEMORY_INSTANCE_ID ??
          "default",
        ),

      teamId:
        asString(
          memory.teamId,
          process.env.TDAI_MEMORY_TEAM_ID ??
          "",
        ),

      userId:
        asString(
          memory.userId,
          process.env.TDAI_MEMORY_USER_ID ??
          "",
        ),

      taskId:
        asString(
          memory.taskId,
          process.env.TDAI_MEMORY_TASK_ID ??
          "",
        ) || undefined,

      defaultAgentId:
        asString(
          memory.defaultAgentId,
          process.env.TDAI_MEMORY_AGENT_ID ??
          "",
        ),

      agents,
    },

    knowledge: {
      url:
        asString(
          knowledge.url,
          envKnowledgeURL,
        ).replace(/\/+$/, ""),

      apiKey:
        asString(
          knowledge.apiKey,
          process.env.TDAI_KNOWLEDGE_API_KEY ??
          "",
        ),

      discovery: {
        enabled:
          typeof knowledge.discovery?.enabled ===
            "boolean"
            ? knowledge.discovery.enabled
            : true,

        cacheSeconds:
          asPositiveInt(
            knowledge.discovery?.cacheSeconds,
            60,
          ),

        maxAssetsPerKind:
          asPositiveInt(
            knowledge.discovery?.maxAssetsPerKind,
            4,
          ),
      },

      defaultWikiIds:
        stringArray(
          knowledge.defaultWikiIds,
        ),

      defaultCodeGraphIds:
        stringArray(
          knowledge.defaultCodeGraphIds,
        ),

      agents:
        knowledgeAgents,
    },

    retrieval: {
      budgetPerTurn:
        asPositiveInt(
          retrieval.budgetPerTurn,
          3,
        ),

      memoryLimit:
        asPositiveInt(
          retrieval.memoryLimit,
          5,
        ),

      knowledgeLimit:
        asPositiveInt(
          retrieval.knowledgeLimit,
          10,
        ),

      scenarioIndexLimit:
        asPositiveInt(
          retrieval.scenarioIndexLimit,
          20,
        ),
    },

    dream: {
      enabled:
        typeof dream.enabled ===
          "boolean"
          ? dream.enabled
          : true,

      pathPrefix:
        asString(
          dream.pathPrefix,
          "Dreams",
        )
          .replace(/^\/+|\/+$/g, "") ||
        "Dreams",

      maxCommitChars:
        asPositiveInt(
          dream.maxCommitChars,
          8000,
          1000,
        ),

      sample: {
        atomicPool:
          asPositiveInt(
            dreamSample.atomicPool,
            12,
          ),

        conversationPool:
          asPositiveInt(
            dreamSample.conversationPool,
            8,
          ),

        atoms:
          asNonNegativeInt(
            dreamSample.atoms,
            3,
          ),

        conversations:
          asNonNegativeInt(
            dreamSample.conversations,
            2,
          ),

        scenarios:
          asNonNegativeInt(
            dreamSample.scenarios,
            1,
          ),

        includeCore:
          typeof dreamSample.includeCore ===
            "boolean"
            ? dreamSample.includeCore
            : true,

        sourceMaxChars:
          asPositiveInt(
            dreamSample.sourceMaxChars,
            1400,
            256,
          ),

        scenarioMaxChars:
          asPositiveInt(
            dreamSample.scenarioMaxChars,
            2200,
            256,
          ),

        coreMaxChars:
          asPositiveInt(
            dreamSample.coreMaxChars,
            2200,
            256,
          ),
      },
    },

    guardrails: {
      enabled:
        guardrailsEnabled,

      blockPublicWebOnPersonalMemory:
        blockPublicWeb,

      outputLanguage,

      annotateTencentEvidence,
    },

    exposeAdminTools:
      typeof options.exposeAdminTools ===
        "boolean"
        ? options.exposeAdminTools
        : boolFromEnv(
            process.env.TDAI_EXPOSE_ADMIN_TOOLS,
            false,
          ),

    traceFile:
      asString(
        options.traceFile,
        process.env.TDAI_OPENCODE_TRACE_FILE ??
        "/tmp/tencentdb-opencode-v3.log",
      ),

    timeouts: {
      gatewayMs:
        asPositiveInt(
          timeouts.gatewayMs,
          5000,
          100,
        ),

      captureMs:
        asPositiveInt(
          timeouts.captureMs,
          10000,
          100,
        ),

      knowledgeMs:
        asPositiveInt(
          timeouts.knowledgeMs,
          10000,
          100,
        ),
    },

    circuit: {
      failureThreshold:
        asPositiveInt(
          circuit.failureThreshold,
          5,
        ),

      openSeconds:
        asPositiveInt(
          circuit.openSeconds,
          60,
        ),
    },
  }
}

export function resolveMemoryScope(
  config: AppConfig,
  openCodeAgent?: string,
): MemoryScope | null {
  const name =
    asString(openCodeAgent)

  const agentId =
    (
      name &&
      config.memory.agents[name]
    ) ||
    config.memory.defaultAgentId

  if (
    !config.memory.instanceId ||
    !config.memory.teamId ||
    !config.memory.userId ||
    !agentId
  ) {
    return null
  }

  return {
    instanceId:
      config.memory.instanceId,

    teamId:
      config.memory.teamId,

    agentId,

    userId:
      config.memory.userId,

    ...(config.memory.taskId
      ? {
          taskId:
            config.memory.taskId,
        }
      : {}),
  }
}

export function configuredKnowledgeAssets(
  config: AppConfig,
  openCodeAgent?: string,
): AgentKnowledgeAssets {
  const specific =
    (
      openCodeAgent
        ? config.knowledge.agents[
            openCodeAgent
          ]
        : undefined
    ) ?? {
      wikiIds: [],
      codeGraphIds: [],
    }

  return {
    wikiIds: [
      ...new Set([
        ...config.knowledge.defaultWikiIds,
        ...specific.wikiIds,
      ]),
    ],

    codeGraphIds: [
      ...new Set([
        ...config.knowledge
          .defaultCodeGraphIds,
        ...specific.codeGraphIds,
      ]),
    ],
  }
}

export function configuredOpenCodeAgents(
  config: AppConfig,
): string[] {
  return [
    ...new Set([
      "build",
      ...Object.keys(
        config.memory.agents,
      ),
      ...Object.keys(
        config.knowledge.agents,
      ),
    ]),
  ]
}
