import type {
  MemoryScope,
} from "../../domain/model.ts"

import type {
  MemoryPort,
} from "../../domain/ports.ts"

import type {
  AppConfig,
} from "../../config.ts"

import {
  HttpJsonClient,
} from "./http-client.ts"

function isolationBody(
  scope: MemoryScope,
) {
  return {
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
  }
}

export class TencentMemoryV3Client
  implements MemoryPort {
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
        config.gateway.url,
        config.timeouts.gatewayMs,
        config.circuit.failureThreshold,
        config.circuit.openSeconds *
          1000,
        (
          path,
          body,
        ) => {
          const headers:
            Record<string, string> = {}

          if (
            config.gateway.apiKey
          ) {
            headers.Authorization =
              `Bearer ${config.gateway.apiKey}`
          }

          if (path !== "/health") {
            headers[
              "x-tdai-service-id"
            ] =
              config.memory.instanceId
          }

          if (
            body &&
            typeof body === "object"
          ) {
            const record =
              body as Record<
                string,
                unknown
              >

            const teamID =
              typeof record.team_id ===
                "string"
                ? record.team_id
                : ""

            const agentID =
              typeof record.agent_id ===
                "string"
                ? record.agent_id
                : ""

            const userID =
              typeof record.user_id ===
                "string"
                ? record.user_id
                : ""

            const taskID =
              typeof record.task_id ===
                "string"
                ? record.task_id
                : ""

            if (teamID) {
              headers[
                "x-tdai-team-id"
              ] = teamID
            }

            if (agentID) {
              headers[
                "x-tdai-agent-id"
              ] = agentID
            }

            if (userID) {
              headers[
                "x-tdai-user-id"
              ] = userID
            }

            if (taskID) {
              headers[
                "x-tdai-task-id"
              ] = taskID
            }
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

  health() {
    return this.http.request(
      "/health",
      {
        method:
          "GET",
      },
    )
  }

  captureTurn(
    input: {
      scope: MemoryScope
      sessionID: string
      userText: string
      assistantText: string
    },
  ) {
    return this.http.request(
      "/v3/conversation/add",
      {
        timeoutMs:
          this.config.timeouts
            .captureMs,

        body: {
          ...isolationBody(
            input.scope,
          ),

          session_id:
            input.sessionID,

          messages: [
            {
              role:
                "user",

              content:
                input.userText,
            },
            {
              role:
                "assistant",

              content:
                input.assistantText,
            },
          ],
        },
      },
    )
  }

  queryAtomic(
    scope: MemoryScope,
    input?: {
      limit?: number
      offset?: number
      type?: string
    },
  ) {
    return this.http.request(
      "/v3/atomic/query",
      {
        body: {
          ...isolationBody(
            scope,
          ),

          ...(input?.limit
            ? {
                limit:
                  input.limit,
              }
            : {}),

          ...(typeof input?.offset ===
            "number"
            ? {
                offset:
                  input.offset,
              }
            : {}),

          ...(input?.type
            ? {
                type:
                  input.type,
              }
            : {}),
        },
      },
    )
  }

  searchAtomic(
    scope: MemoryScope,
    input: {
      query: string
      limit?: number
      type?: string
    },
  ) {
    return this.http.request(
      "/v3/atomic/search",
      {
        body: {
          ...isolationBody(
            scope,
          ),

          query:
            input.query,

          ...(input.limit
            ? {
                limit:
                  input.limit,
              }
            : {}),

          ...(input.type
            ? {
                type:
                  input.type,
              }
            : {}),
        },
      },
    )
  }

  queryConversations(
    scope: MemoryScope,
    input?: {
      sessionID?: string
      limit?: number
      offset?: number
    },
  ) {
    return this.http.request(
      "/v3/conversation/query",
      {
        body: {
          ...isolationBody(
            scope,
          ),

          ...(input?.sessionID
            ? {
                session_id:
                  input.sessionID,
              }
            : {}),

          ...(input?.limit
            ? {
                limit:
                  input.limit,
              }
            : {}),

          ...(typeof input?.offset ===
            "number"
            ? {
                offset:
                  input.offset,
              }
            : {}),
        },
      },
    )
  }

  searchConversations(
    scope: MemoryScope,
    input: {
      query: string
      limit?: number
      sessionID?: string
    },
  ) {
    return this.http.request(
      "/v3/conversation/search",
      {
        body: {
          ...isolationBody(
            scope,
          ),

          query:
            input.query,

          ...(input.limit
            ? {
                limit:
                  input.limit,
              }
            : {}),

          ...(input.sessionID
            ? {
                session_id:
                  input.sessionID,
              }
            : {}),
        },
      },
    )
  }

  listScenarios(
    scope: MemoryScope,
    input?: {
      pathPrefix?: string
    },
  ) {
    return this.http.request(
      "/v3/scenario/ls",
      {
        body: {
          ...isolationBody(
            scope,
          ),

          ...(input?.pathPrefix
            ? {
                path_prefix:
                  input.pathPrefix,
              }
            : {}),
        },
      },
    )
  }

  readScenario(
    scope: MemoryScope,
    input: {
      path: string
      version?: string
    },
  ) {
    return this.http.request(
      "/v3/scenario/read",
      {
        body: {
          ...isolationBody(
            scope,
          ),

          path:
            input.path,

          ...(input.version
            ? {
                version:
                  input.version,
              }
            : {}),
        },
      },
    )
  }

  writeScenario(
    scope: MemoryScope,
    input: {
      path: string
      content: string
      summary?: string
    },
  ) {
    return this.http.request(
      "/v3/scenario/write",
      {
        body: {
          ...isolationBody(
            scope,
          ),

          path:
            input.path,

          content:
            input.content,

          ...(input.summary
            ? {
                summary:
                  input.summary,
              }
            : {}),
        },
      },
    )
  }

  readCore(
    scope: MemoryScope,
    input?: {
      version?: string
    },
  ) {
    return this.http.request(
      "/v3/core/read",
      {
        body: {
          ...isolationBody(
            scope,
          ),

          ...(input?.version
            ? {
                version:
                  input.version,
              }
            : {}),
        },
      },
    )
  }
}
